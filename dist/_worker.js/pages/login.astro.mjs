globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                 */
import { c as createComponent, b as renderComponent, r as renderTemplate, d as createAstro, m as maybeRenderHead } from '../chunks/astro/server_DjvQ9r3T.mjs';
import { $ as $$Layout, a as $$NavBar, b as $$Footer } from '../chunks/Footer_ZFd_tFYe.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const isAuthenticated = Astro2.locals.isAuthenticated || false;
  if (isAuthenticated) {
    return Astro2.redirect("/admin");
  }
  const url = new URL(Astro2.request.url);
  const error = url.searchParams.get("error");
  let errorMessage = "";
  if (error === "missing") {
    errorMessage = "Pros\xEDm vypl\u0148 v\u0161etky polia";
  } else if (error === "invalid") {
    errorMessage = "Nespr\xE1vne prihlasovacie \xFAdaje";
  } else if (error === "server") {
    errorMessage = "Chyba servera, sk\xFAs to znova";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login - Admin Dashboard" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "currentPath": "/login" })} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center"> <div class="max-w-md w-full"> <div class="mb-8 text-center"> <div class="text-emerald-500 font-mono text-sm mb-4">$ sudo login</div> <h1 class="text-3xl font-bold text-white mb-2">Admin Login</h1> <p class="text-gray-400">Prihlásenie pre správcu obsahu</p> </div> ${errorMessage && renderTemplate`<div class="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded mb-6 font-mono text-sm"> ${errorMessage} </div>`} <div class="bg-[#111111] border border-gray-800 rounded-lg p-8"> <form action="/api/auth/login" method="POST" class="space-y-4"> <div> <label class="block text-gray-400 font-mono text-sm mb-2">Username</label> <input type="text" name="username" class="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none" placeholder="admin" required> </div> <div> <label class="block text-gray-400 font-mono text-sm mb-2">Password</label> <input type="password" name="password" class="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none" placeholder="••••••••" required> </div> <button type="submit" class="w-full bg-emerald-500 text-black py-3 rounded font-mono font-bold hover:bg-emerald-400 transition-all">
Login →
</button> </form> <div class="mt-6 pt-6 border-t border-gray-800"> <p class="text-gray-500 text-xs font-mono text-center">
💡 Tip: Cloudflare Access chráni tento endpoint
</p> </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/pages/login.astro", void 0);

const $$file = "/home/skipi/Projects/blog/blg-tst-claude/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
