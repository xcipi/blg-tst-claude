interface Env {
  DB: D1Database;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const formData = await context.request.formData();
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();

    if (!username || !password) {
      return new Response(null, {
        status: 302,
        headers: { 'Location': '/login?error=missing' }
      });
    }

    // Get credentials from ENV (with fallback for development)
    const ADMIN_USERNAME = context.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = context.env.ADMIN_PASSWORD || 'admin123';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create session
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await context.env.DB.prepare(
        'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
      ).bind(sessionId, username, expiresAt.toISOString()).run();

      // Set cookie
      return new Response(null, {
        status: 302,
        headers: {
          'Location': '/admin',
          'Set-Cookie': `session=${sessionId}; HttpOnly; Secure; SameSite=Lax; Max-Age=86400; Path=/`
        }
      });
    }

    // Invalid credentials
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/login?error=invalid'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(null, {
      status: 302,
      headers: { 'Location': '/login?error=server' }
    });
  }
};
