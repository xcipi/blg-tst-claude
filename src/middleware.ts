import { defineMiddleware } from 'astro:middleware';
import { jwtVerify, createRemoteJWKSet } from 'jose';

// Cloudflare Access configuration
const CF_ACCESS_TEAM_DOMAIN = 'skipi.cloudflareaccess.com';
const CF_ACCESS_AUD = 'ab34bdf31dfb13c031fdab46abe99956d7c80a3f7e25874762f6671c5b907483';

// JWKS client is cheap to construct (jose caches keys internally by URL) and
// avoids re-parsing the JWKS URL string on every request.
const JWKS = createRemoteJWKSet(
  new URL(`https://${CF_ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`)
);

// Helper: Validate Cloudflare Access JWT
//
// SECURITY: this MUST cryptographically verify the JWT signature against
// Cloudflare's published JWKS, not just decode+inspect the unsigned claims.
// This file previously used atob() to decode the payload and checked only
// iss/aud/exp without ever verifying the signature - since CF_ACCESS_AUD
// above is a public, non-secret value (visible in this open-source repo),
// anyone could have crafted an arbitrary JWT with any email and a matching
// aud/iss/exp and been treated as an authenticated user by this middleware,
// on any route Cloudflare Access itself doesn't gate at the edge (this repo's
// /api/* routes are not edge-protected - see api/feedback.ts and
// api/auth/login.ts). Fixed 2026-09-27 to mirror the Worker's own (correct)
// verifyAccessJWT() in blog-pipeline/worker/src/auth.ts.
async function validateCFAccessToken(token: string): Promise<{ valid: boolean; email?: string }> {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://${CF_ACCESS_TEAM_DOMAIN}`,
      audience: CF_ACCESS_AUD,
    });

    const email = (payload.email as string | undefined) ?? (payload.sub as string | undefined);
    if (!email) {
      return { valid: false };
    }

    return { valid: true, email };
  } catch (error) {
    console.error('Error validating CF Access token:', error);
    return { valid: false };
  }
}

export const onRequest = defineMiddleware(async (context, next) => {
  const runtime = context.locals.runtime as any;
  
  let isAuthenticated = false;
  let username = '';

  // 1. Check for Cloudflare Access JWT (SSO)
  const cfAccessJwt = context.request.headers.get('Cf-Access-Jwt-Assertion');
  
  if (cfAccessJwt && runtime?.env?.DB) {
    const validation = await validateCFAccessToken(cfAccessJwt);
    
    if (validation.valid && validation.email) {
      // Valid CF Access token - create session automatically
      try {
        // Check if session already exists for this user
        const existingSession = await runtime.env.DB.prepare(
          'SELECT * FROM sessions WHERE user_id = ? AND expires_at > datetime("now")'
        ).bind(validation.email).first();

        let sessionId: string;

        if (existingSession) {
          // Reuse existing session
          sessionId = existingSession.id as string;
        } else {
          // Create new session
          sessionId = crypto.randomUUID();
          const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

          await runtime.env.DB.prepare(
            'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
          ).bind(sessionId, validation.email, expiresAt.toISOString()).run();
        }

        // Set session cookie
        context.cookies.set('session', sessionId, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 86400 // 24 hours
        });

        isAuthenticated = true;
        username = validation.email;
        
        console.log('SSO: Auto-authenticated via CF Access:', validation.email);
      } catch (error) {
        console.error('Error creating SSO session:', error);
      }
    }
  }

  // 2. Fallback: Check existing session cookie (manual login or previous SSO)
  if (!isAuthenticated) {
    const cookie = context.request.headers.get('Cookie');
    const sessionId = cookie?.match(/session=([^;]+)/)?.[1];

    if (sessionId && runtime?.env?.DB) {
      try {
        const session = await runtime.env.DB.prepare(
          'SELECT * FROM sessions WHERE id = ? AND expires_at > datetime("now")'
        ).bind(sessionId).first();

        if (session) {
          isAuthenticated = true;
          username = session.user_id as string;
        }
      } catch (e) {
        console.error('Session check error:', e);
      }
    }
  }

  // Add to locals for pages to use
  context.locals.isAuthenticated = isAuthenticated;
  context.locals.username = username;

  return next();
});
