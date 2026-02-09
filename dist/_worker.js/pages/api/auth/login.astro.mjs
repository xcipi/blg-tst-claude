globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, locals }) => {
  try {
    const formData = await request.formData();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    if (!username || !password) {
      return new Response(null, {
        status: 302,
        headers: { "Location": "/login?error=missing" }
      });
    }
    const runtime = locals.runtime;
    const ADMIN_USERNAME = runtime?.env?.ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = runtime?.env?.ADMIN_PASSWORD || "admin123";
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const sessionId = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1e3);
      await runtime.env.DB.prepare(
        "INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)"
      ).bind(sessionId, username, expiresAt.toISOString()).run();
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/admin",
          "Set-Cookie": `session=${sessionId}; HttpOnly; Secure; SameSite=Lax; Max-Age=86400; Path=/`
        }
      });
    }
    return new Response(null, {
      status: 302,
      headers: { "Location": "/login?error=invalid" }
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(null, {
      status: 302,
      headers: { "Location": "/login?error=server" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
