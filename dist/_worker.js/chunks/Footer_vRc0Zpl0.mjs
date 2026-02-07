globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, d as addAttribute, k as renderHead, l as renderSlot, a as renderTemplate, b as createAstro, m as maybeRenderHead } from './astro/server_D0EvRT28.mjs';
/* empty css                          */

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
  return renderTemplate`${maybeRenderHead()}<nav class="fixed top-0 left-0 right-0 z-50 bg-terminal-bg border-b border-gray-800"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex items-center justify-between h-16"> <div class="flex items-center gap-2"> <span class="text-emerald-500 font-mono text-lg font-bold">&gt; sec.blog</span> </div> <div class="flex items-center gap-2"> <a href="/"${addAttribute(`flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-all ${currentPath === "/" ? "bg-emerald-500 text-black font-bold" : "text-gray-400 hover:text-emerald-500 hover:bg-gray-900"}`, "class")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline points="9 18 15 12 9 6"></polyline> </svg>
~/home
</a> <a href="/blog"${addAttribute(`flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-all ${currentPath.startsWith("/blog") ? "bg-emerald-500 text-black font-bold" : "text-gray-400 hover:text-emerald-500 hover:bg-gray-900"}`, "class")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path> <polyline points="14 2 14 8 20 8"></polyline> </svg>
~/blog
</a> <a href="/bookmarks"${addAttribute(`flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-all ${currentPath === "/bookmarks" ? "bg-emerald-500 text-black font-bold" : "text-gray-400 hover:text-emerald-500 hover:bg-gray-900"}`, "class")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path> </svg>
~/bookmarks
</a> <a href="/login"${addAttribute(`flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-all ${currentPath === "/login" ? "bg-emerald-500 text-black font-bold" : "text-gray-400 hover:text-emerald-500 hover:bg-gray-900"}`, "class")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path> <polyline points="10 17 15 12 10 7"></polyline> <line x1="15" x2="3" y1="12" y2="12"></line> </svg>
login
</a> </div> </div> </div> </nav>`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/components/NavBar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-gray-800 bg-terminal-bg py-8"> <div class="max-w-7xl mx-auto px-4 text-center"> <p class="text-emerald-500 font-mono text-sm">
$ echo "© ${currentYear} — built with passion"
</p> </div> </footer>`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/components/Footer.astro", void 0);

export { $$Layout as $, $$NavBar as a, $$Footer as b };
