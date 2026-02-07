interface Env {
  DB: D1Database;
}

// Helper to check auth
async function isAuthenticated(request: Request, env: Env): Promise<boolean> {
  const cookie = request.headers.get('Cookie');
  const sessionId = cookie?.match(/session=([^;]+)/)?.[1];

  if (!sessionId) return false;

  const session = await env.DB.prepare(
    'SELECT * FROM sessions WHERE id = ? AND expires_at > datetime("now")'
  ).bind(sessionId).first();

  return !!session;
}

// DELETE - Delete bookmark (auth required)
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const authenticated = await isAuthenticated(context.request, context.env);
    
    if (!authenticated) {
      return new Response('Unauthorized', { status: 401 });
    }

    const id = context.params.id as string;

    await context.env.DB.prepare('DELETE FROM bookmarks WHERE id = ?')
      .bind(id)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Delete bookmark error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

// PUT - Update bookmark (auth required)
export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    const authenticated = await isAuthenticated(context.request, context.env);
    
    if (!authenticated) {
      return new Response('Unauthorized', { status: 401 });
    }

    const id = context.params.id as string;
    const data = await context.request.json();
    const { title, url, tags, isPrivate } = data;

    await context.env.DB.prepare(
      'UPDATE bookmarks SET title = ?, url = ?, tags = ?, is_private = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(title, url, JSON.stringify(tags), isPrivate ? 1 : 0, id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Update bookmark error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
