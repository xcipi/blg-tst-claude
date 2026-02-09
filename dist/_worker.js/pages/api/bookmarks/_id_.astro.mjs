globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../../renderers.mjs';

const PUT = async ({ params, request, locals }) => {
  try {
    const runtime = locals.runtime;
    const id = params.id;
    const data = await request.json();
    const { title, url, tags, isPrivate } = data;
    await runtime.env.DB.prepare(
      "UPDATE bookmarks SET title = ?, url = ?, tags = ?, is_private = ? WHERE id = ?"
    ).bind(title, url, JSON.stringify(tags), isPrivate ? 1 : 0, id).run();
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Update bookmark error:", error);
    return new Response(JSON.stringify({ error: "Failed to update bookmark" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const DELETE = async ({ params, locals }) => {
  try {
    const runtime = locals.runtime;
    const id = params.id;
    await runtime.env.DB.prepare("DELETE FROM bookmarks WHERE id = ?").bind(id).run();
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Delete bookmark error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete bookmark" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
