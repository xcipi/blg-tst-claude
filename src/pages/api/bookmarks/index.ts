import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const runtime = locals.runtime as any;
    const result = await runtime.env.DB.prepare(
      'SELECT * FROM bookmarks ORDER BY created_at DESC'
    ).all();

    return new Response(JSON.stringify(result.results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch bookmarks' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtime = locals.runtime as any;
    const data = await request.json() as {
      title: string;
      url: string;
      tags: string[];
      isPrivate: boolean;
    };

    const { title, url, tags, isPrivate } = data;

    await runtime.env.DB.prepare(
      'INSERT INTO bookmarks (title, url, tags, is_private) VALUES (?, ?, ?, ?)'
    ).bind(title, url, JSON.stringify(tags), isPrivate ? 1 : 0).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Create bookmark error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create bookmark' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
