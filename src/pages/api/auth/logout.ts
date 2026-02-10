import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  try {
    const cookie = request.headers.get('Cookie');
    const sessionId = cookie?.match(/session=([^;]+)/)?.[1];

    // Delete session from D1
    if (sessionId) {
      const runtime = locals.runtime as any;
      await runtime.env.DB.prepare('DELETE FROM sessions WHERE id = ?')
        .bind(sessionId)
        .run();
    }

    // Clear our session cookie
    cookies.delete('session', { path: '/' });

    // Redirect to Cloudflare Access logout to clear CF Access session
    // This ensures complete logout from both our app AND CF Access
    const cfAccessLogoutUrl = 'https://skipi.cloudflareaccess.com/cdn-cgi/access/logout';
    const returnUrl = new URL(request.url).origin; // Return to homepage after CF logout
    
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `${cfAccessLogoutUrl}?returnTo=${encodeURIComponent(returnUrl)}`
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/' }
    });
  }
};
