globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, e as addAttribute, f as renderHead, g as renderSlot, r as renderTemplate, d as createAstro, m as maybeRenderHead, b as renderComponent, F as Fragment } from './astro/server_DjvQ9r3T.mjs';
/* empty css                         */

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Blog o IT, DevOps, programovan\xED a v\u0161etkom zauj\xEDmavom." } = Astro2.props;
  return renderTemplate`<html lang="sk"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$NavBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NavBar;
  const { currentPath } = Astro2.props;
  const isAuthenticated = Astro2.locals.isAuthenticated || false;
  const username = Astro2.locals.username || "";
  return renderTemplate`${maybeRenderHead()}<nav class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-gray-800"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex items-center justify-between h-16"> <div class="flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-500"> <polyline points="9 18 15 12 9 6"></polyline> </svg> <a href="/" class="text-emerald-500 font-mono text-lg
        font-bold">[skipi].sec.blog</a> </div> <div class="flex items-center gap-2"> <a href="/"${addAttribute(`px-4 py-2 rounded font-mono text-sm transition-all ${currentPath === "/" ? "bg-emerald-500 text-black font-bold" : "text-gray-400 hover:text-emerald-500 hover:bg-gray-900"}`, "class")}>
~/home
</a> <a href="/blog"${addAttribute(`px-4 py-2 rounded font-mono text-sm transition-all ${currentPath.startsWith("/blog") ? "bg-emerald-500 text-black font-bold" : "text-gray-400 hover:text-emerald-500 hover:bg-gray-900"}`, "class")}>
~/blog
</a> <a href="/bookmarks"${addAttribute(`px-4 py-2 rounded font-mono text-sm transition-all ${currentPath === "/bookmarks" ? "bg-emerald-500 text-black font-bold" : "text-gray-400 hover:text-emerald-500 hover:bg-gray-900"}`, "class")}>
~/bookmarks
</a> ${isAuthenticated ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a href="/admin"${addAttribute(`px-4 py-2 rounded font-mono text-sm transition-all ${currentPath === "/admin" ? "bg-emerald-500 text-black font-bold" : "text-gray-400 hover:text-emerald-500 hover:bg-gray-900"}`, "class")}>
~/admin
</a> <span class="text-emerald-500 text-xs font-mono px-2">
[${username}]
</span> ` })}` : renderTemplate`<a href="/login"${addAttribute(`px-4 py-2 rounded font-mono text-sm transition-all ${currentPath === "/login" ? "bg-emerald-500 text-black font-bold" : "text-gray-400 hover:text-emerald-500 hover:bg-gray-900"}`, "class")}>
login
</a>`} </div> </div> </div> </nav>`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/components/NavBar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const allCerts = [
    {
      name: "",
      url: "https://www.credly.com/earner/earned/badge/3457cc79-0116-4dfa-9f55-4d911c3531a4",
      badgeImage: "https://images.credly.com/size/340x340/images/e1db35be-2f90-4435-bf0f-ac69f3ffbdfc/blob"
    },
    {
      name: "",
      url: "https://www.credly.com/earner/earned/badge/71cfdc40-c5bd-4d02-8e80-3151f275d26b",
      badgeImage: "https://images.credly.com/size/340x340/images/cd769843-4907-4d1a-9702-0512eb87ae6e/cisco_ccnp_security.png"
    },
    {
      name: "",
      url: "https://www.credly.com/earner/earned/badge/95a75c3b-9e01-40ea-9f68-e30c391ac943",
      badgeImage: "https://images.credly.com/size/340x340/images/54493e06-3286-4dfc-b0fc-80f3846db491/blob"
    },
    {
      name: "",
      url: "https://www.credly.com/earner/earned/badge/bb642c39-3f1b-4d98-9c02-e28ec4542c0b",
      badgeImage: "https://images.credly.com/size/340x340/images/683783d8-eaac-4c37-a14d-11bd8a36321d/ccna_600.png"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-gray-800 bg-[#0a0a0a] py-8"> <div class="max-w-7xl mx-auto px-4"> <!-- Certification Badges --> <div class="flex flex-wrap gap-2 mb-6 opacity-60 hover:opacity-100 transition-opacity"> ${allCerts.map((cert) => renderTemplate`<a${addAttribute(cert.url, "href")} target="_blank" rel="noopener noreferrer" class="group flex items-center gap-2 px-2 py-2 bg-gray-900 border border-gray-800 rounded hover:border-emerald-500 transition-all"${addAttribute(cert.name, "title")}> <div class="w-8 h-8 flex-shrink-0 rounded overflow-hidden bg-white"> <img${addAttribute(cert.badgeImage, "src")}${addAttribute(cert.name, "alt")} class="w-full h-full object-cover group-hover:scale-110 transition-transform"> </div> <span class="text-xs text-gray-500 font-mono group-hover:text-emerald-500 transition-colors"> ${cert.name} </span> </a>`)} </div> <!-- Copyright --> <div class="text-center"> <p class="text-emerald-500 font-mono text-sm">
$ echo "© 2026 – built with passion"
</p> </div> </div> </footer>`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/components/Footer.astro", void 0);

export { $$Layout as $, $$NavBar as a, $$Footer as b };
