import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    if (!username || !password) {
      return new Response(null, {
        status: 302,
        headers: { 'Location': '/login?error=missing' }
      });
    }

    const runtime = locals.runtime as any;
    const ADMIN_USERNAME = runtime?.env?.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = runtime?.env?.ADMIN_PASSWORD || 'admin123';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await runtime.env.DB.prepare(
        'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
      ).bind(sessionId, username, expiresAt.toISOString()).run();

      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/admin',
          'Set-Cookie': `session=${sessionId}; HttpOnly; Secure; SameSite=Lax; Max-Age=86400; Path=/`
        }
      });
    }

    return new Response(null, {
      status: 302,
      headers: { 'Location': '/login?error=invalid' }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/login?error=server' }
    });
  }
};
