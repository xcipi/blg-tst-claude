globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                 */
import { c as createComponent, e as renderComponent, r as renderTemplate, d as createAstro, m as maybeRenderHead } from '../chunks/astro/server_DwOUwrH7.mjs';
import { b as $$Layout, $ as $$NavBar, a as $$Footer } from '../chunks/Footer_CKOy8880.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const error = Astro2.url.searchParams.get("error");
  const errorMessages = {
    missing: "Vypl\u0148 username a heslo",
    invalid: "Nespr\xE1vne prihlasovacie \xFAdaje",
    server: "Serverov\xE1 chyba, sk\xFAs to znova"
  };
  const errorMessage = error ? errorMessages[error] : null;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Login - sec.blog" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "currentPath": Astro2.url.pathname })} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center"> <div class="max-w-md w-full"> <div class="mb-8 text-center"> <div class="text-emerald-500 font-mono text-sm mb-4">$ sudo login</div> <h1 class="text-3xl font-bold text-white mb-2">Admin Login</h1> <p class="text-gray-400">Prihlásenie pre správcu obsahu</p> </div> ${errorMessage && renderTemplate`<div class="mb-6 bg-red-900/20 border border-red-500 rounded-lg p-4 text-center"> <p class="text-red-400 font-mono text-sm">${errorMessage}</p> </div>`} <div class="bg-terminal-card border border-gray-800 rounded-lg p-8"> <form method="POST" action="/api/auth/login" class="space-y-4"> <div> <label class="block text-gray-400 font-mono text-sm mb-2">Username</label> <input type="text" name="username" required autocomplete="username" class="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none" placeholder="admin"> </div> <div> <label class="block text-gray-400 font-mono text-sm mb-2">Password</label> <input type="password" name="password" required autocomplete="current-password" class="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none" placeholder="••••••••"> </div> <button type="submit" class="w-full bg-emerald-500 text-black py-3 rounded font-mono font-bold hover:bg-emerald-400 transition-all">
Login →
</button> </form> <div class="mt-6 pt-6 border-t border-gray-800"> <p class="text-gray-500 text-xs font-mono text-center">
Default credentials: admin / admin123
</p> </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/pages/login.astro", void 0);

const $$file = "/home/skipi/Projects/blog/blg-tst-claude/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
