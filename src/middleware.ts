import { defineMiddleware } from 'astro:middleware';

// Cloudflare Access configuration
const CF_ACCESS_TEAM_DOMAIN = 'skipi.cloudflareaccess.com';
const CF_ACCESS_AUD = 'ab34bdf31dfb13c031fdab46abe99956d7c80a3f7e25874762f6671c5b907483';

// Helper: Validate Cloudflare Access JWT
async function validateCFAccessToken(token: string): Promise<{ valid: boolean; email?: string }> {
  try {
    // Decode JWT without verification first to get the header
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false };
    }

    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      console.log('CF Access token expired');
      return { valid: false };
    }

    // Verify issuer
    if (payload.iss !== `https://${CF_ACCESS_TEAM_DOMAIN}`) {
      console.log('Invalid issuer');
      return { valid: false };
    }

    // Verify audience (AUD tag)
    if (!payload.aud || !payload.aud.includes(CF_ACCESS_AUD)) {
      console.log('Invalid audience');
      return { valid: false };
    }

    // Extract email from token
    const email = payload.email || payload.sub;

    // TODO: For production, verify signature against CF Access public keys
    // Fetch keys from: https://skipi.cloudflareaccess.com/cdn-cgi/access/certs
    // For now, we trust the token if basic checks pass (CF Access already validated it)

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
