import type { APIRoute } from 'astro';

// Proxy pre feedback.shadowguide.eu Worker.
//
// Blog (waf.shadowguide.eu) a Worker (feedback.shadowguide.eu) su samostatne
// CF Access aplikacie, takze CF_Authorization cookie z blogu sa do Worker
// domeny nikdy nedostane (iny hostname = iny cookie scope). Riesenie: browser
// vola tento same-origin route (cookie zafunguje normalne cez blogov vlastny
// CF Access), a tento route sa autentifikuje voci Workeru server-to-server
// cez CF Access Service Token (rovnaky pattern ako Tunnel<->Ollama, pozri
// architektura-a-security-v1.3.md). Worker overi Service-Auth JWT (rovnaka
// AUD, iny "sub" - service token misto human emailu) a prevezme identitu
// pouzivatela z X-Verified-Access-Email, ktoru sme uz sami overili vlastnym
// middlewarom (locals.isAuthenticated/username).
const WORKER_URL = 'https://feedback.shadowguide.eu/api/feedback';

export const POST: APIRoute = async ({ request, locals }) => {
  if (!locals.isAuthenticated || !locals.username) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const contentType = request.headers.get('Content-Type') ?? '';
  if (!contentType.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const runtime = locals.runtime as any;
  const clientId = runtime?.env?.CF_ACCESS_SERVICE_CLIENT_ID;
  const clientSecret = runtime?.env?.CF_ACCESS_SERVICE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Feedback proxy: missing CF_ACCESS_SERVICE_CLIENT_ID/SECRET secret');
    return new Response(JSON.stringify({ error: 'Feedback service misconfigured' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let upstream: Response;
  try {
    upstream = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Access-Client-Id': clientId,
        'CF-Access-Client-Secret': clientSecret,
        'X-Verified-Access-Email': locals.username,
        // Explicit forward: a Worker->Worker fetch does not auto-carry the
        // visitor's real IP, Cloudflare only honors it if set explicitly.
        'CF-Connecting-IP': request.headers.get('CF-Connecting-IP') ?? '',
        'User-Agent': request.headers.get('User-Agent') ?? '',
      },
      body: rawBody,
    });
  } catch (err) {
    console.error('Feedback proxy: upstream fetch failed:', String(err));
    return new Response(JSON.stringify({ error: 'Feedback service unavailable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const responseBody = await upstream.text();
  return new Response(responseBody, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
