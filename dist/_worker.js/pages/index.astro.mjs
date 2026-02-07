globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                  */
import { c as createComponent, e as renderComponent, r as renderTemplate, d as createAstro, m as maybeRenderHead } from '../chunks/astro/server_DwOUwrH7.mjs';
import { $ as $$Layout, a as $$NavBar, b as $$Footer } from '../chunks/Footer_DLnRzgEs.mjs';
import { $ as $$BlogCard } from '../chunks/BlogCard_CMQdmXUD.mjs';
import { g as getCollection } from '../chunks/_astro_content_CccCGBNX.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const allPosts = await getCollection("blog");
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  ).slice(0, 3);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "sec.blog - IT profesion\xE1l" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "currentPath": Astro2.url.pathname })} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 px-4"> <div class="max-w-7xl mx-auto"> <!-- Hero --> <div class="mb-16"> <div class="text-emerald-500 font-mono text-sm mb-8">$ whoami</div> <h1 class="text-5xl md:text-7xl font-bold mb-6"> <span class="text-emerald-500 font-mono">IT profesionál</span> <br> <span class="text-white">píšem o veciach,</span> <br> <span class="text-white">ktoré ma bavia</span> </h1> <p class="text-gray-400 text-lg mb-8 max-w-2xl">
Blog o IT, DevOps, programovaní a všetkom zaujímavom. Zbierka bookmarkov a myšlienok z digitálneho sveta.
</p> <div class="flex flex-wrap gap-4"> <a href="/blog" class="bg-emerald-500 text-black px-6 py-3 rounded font-mono font-bold hover:bg-emerald-400 transition-all flex items-center gap-2">
Čítať blog
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline points="9 18 15 12 9 6"></polyline> </svg> </a> <a href="/bookmarks" class="border border-gray-800 text-gray-400 px-6 py-3 rounded font-mono hover:border-emerald-500 hover:text-emerald-500 transition-all">
Bookmarky
</a> </div> </div> <!-- Latest Posts --> <div> <div class="flex items-center justify-between mb-6"> <h2 class="text-2xl font-bold text-white flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"> <polyline points="9 18 15 12 9 6"></polyline> </svg>
Posledné články
</h2> <a href="/blog" class="text-emerald-500 font-mono text-sm hover:underline flex items-center gap-1">
všetky
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline points="9 18 15 12 9 6"></polyline> </svg> </a> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> ${sortedPosts.map((post) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "title": post.data.title, "excerpt": post.data.excerpt, "tags": post.data.tags, "date": post.data.date, "readTime": post.data.readTime, "slug": post.slug })}`)} </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/pages/index.astro", void 0);

const $$file = "/home/skipi/Projects/blog/blg-tst-claude/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
