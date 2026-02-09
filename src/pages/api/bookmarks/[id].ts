import type { APIRoute } from 'astro';

export const PUT: APIRoute = async ({ params, request, locals }) => {
  try {
    const runtime = locals.runtime as any;
    const id = params.id;
    const data = await request.json() as {
      title: string;
      url: string;
      tags: string[];
      isPrivate: boolean;
    };

    const { title, url, tags, isPrivate } = data;

    await runtime.env.DB.prepare(
      'UPDATE bookmarks SET title = ?, url = ?, tags = ?, is_private = ? WHERE id = ?'
    ).bind(title, url, JSON.stringify(tags), isPrivate ? 1 : 0, id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Update bookmark error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update bookmark' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  try {
    const runtime = locals.runtime as any;
    const id = params.id;

    await runtime.env.DB.prepare('DELETE FROM bookmarks WHERE id = ?')
      .bind(id)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Delete bookmark error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete bookmark' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
