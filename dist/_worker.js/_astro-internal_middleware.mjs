globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as defineMiddleware, s as sequence } from './chunks/index_Bqvxfi5s.mjs';
import './chunks/astro-designed-error-pages_CGourQNh.mjs';

const CF_ACCESS_TEAM_DOMAIN = "skipi.cloudflareaccess.com";
const CF_ACCESS_AUD = "ab34bdf31dfb13c031fdab46abe99956d7c80a3f7e25874762f6671c5b907483";
async function validateCFAccessToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { valid: false };
    }
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1e3);
    if (payload.exp && payload.exp < now) {
      console.log("CF Access token expired");
      return { valid: false };
    }
    if (payload.iss !== `https://${CF_ACCESS_TEAM_DOMAIN}`) {
      console.log("Invalid issuer");
      return { valid: false };
    }
    if (!payload.aud || !payload.aud.includes(CF_ACCESS_AUD)) {
      console.log("Invalid audience");
      return { valid: false };
    }
    const email = payload.email || payload.sub;
    return { valid: true, email };
  } catch (error) {
    console.error("Error validating CF Access token:", error);
    return { valid: false };
  }
}
const onRequest$1 = defineMiddleware(async (context, next) => {
  const runtime = context.locals.runtime;
  let isAuthenticated = false;
  let username = "";
  const cfAccessJwt = context.request.headers.get("Cf-Access-Jwt-Assertion");
  if (cfAccessJwt && runtime?.env?.DB) {
    const validation = await validateCFAccessToken(cfAccessJwt);
    if (validation.valid && validation.email) {
      try {
        const existingSession = await runtime.env.DB.prepare(
          'SELECT * FROM sessions WHERE user_id = ? AND expires_at > datetime("now")'
        ).bind(validation.email).first();
        let sessionId;
        if (existingSession) {
          sessionId = existingSession.id;
        } else {
          sessionId = crypto.randomUUID();
          const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1e3);
          await runtime.env.DB.prepare(
            "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)"
          ).bind(sessionId, validation.email, expiresAt.toISOString()).run();
        }
        context.cookies.set("session", sessionId, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: 86400
          // 24 hours
        });
        isAuthenticated = true;
        username = validation.email;
        console.log("SSO: Auto-authenticated via CF Access:", validation.email);
      } catch (error) {
        console.error("Error creating SSO session:", error);
      }
    }
  }
  if (!isAuthenticated) {
    const cookie = context.request.headers.get("Cookie");
    const sessionId = cookie?.match(/session=([^;]+)/)?.[1];
    if (sessionId && runtime?.env?.DB) {
      try {
        const session = await runtime.env.DB.prepare(
          'SELECT * FROM sessions WHERE id = ? AND expires_at > datetime("now")'
        ).bind(sessionId).first();
        if (session) {
          isAuthenticated = true;
          username = session.user_id;
        }
      } catch (e) {
        console.error("Session check error:", e);
      }
    }
  }
  context.locals.isAuthenticated = isAuthenticated;
  context.locals.username = username;
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
