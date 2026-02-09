globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, locals, cookies }) => {
  try {
    const cookie = request.headers.get("Cookie");
    const sessionId = cookie?.match(/session=([^;]+)/)?.[1];
    if (sessionId) {
      const runtime = locals.runtime;
      await runtime.env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(sessionId).run();
    }
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/",
        "Set-Cookie": "session=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/"
      }
    });
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(null, {
      status: 302,
      headers: { "Location": "/" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
