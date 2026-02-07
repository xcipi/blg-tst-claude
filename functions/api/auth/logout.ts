interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const cookie = context.request.headers.get('Cookie');
    const sessionId = cookie?.match(/session=([^;]+)/)?.[1];

    if (sessionId) {
      await context.env.DB.prepare('DELETE FROM sessions WHERE id = ?')
        .bind(sessionId)
        .run();
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/',
        'Set-Cookie': 'session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
