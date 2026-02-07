globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                  */
import { c as createComponent, e as renderComponent, r as renderTemplate, d as createAstro, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DwOUwrH7.mjs';
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
  );
  const allTags = ["all", ...new Set(sortedPosts.flatMap((post) => post.data.tags))];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog - sec.blog" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "currentPath": Astro2.url.pathname })} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 px-4"> <div class="max-w-7xl mx-auto"> <div class="mb-8"> <div class="text-emerald-500 font-mono text-sm mb-4">$ ls ~/blog/</div> <h1 class="text-4xl font-bold text-white mb-2">Články</h1> </div> <!-- Tags Filter --> <div class="mb-8 overflow-x-auto pb-2"> <div class="flex gap-2 min-w-max" id="tag-filters"> ${allTags.map((tag, i) => renderTemplate`<button${addAttribute(tag, "data-tag")}${addAttribute(`tag-filter px-3 py-1 rounded-full text-xs font-mono border transition-all ${i === 0 ? "bg-emerald-500 text-black border-emerald-500 font-bold active" : "bg-gray-900 text-emerald-500 border-gray-800 hover:border-emerald-500"}`, "class")}> ${tag} </button>`)} </div> </div> <!-- Blog Posts Grid --> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="blog-grid"> ${sortedPosts.map((post) => renderTemplate`<div class="blog-post"${addAttribute(post.data.tags.join(","), "data-tags")}> ${renderComponent($$result2, "BlogCard", $$BlogCard, { "title": post.data.title, "excerpt": post.data.excerpt, "tags": post.data.tags, "date": post.data.date, "readTime": post.data.readTime, "slug": post.slug })} </div>`)} </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} `;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/pages/blog/index.astro", void 0);

const $$file = "/home/skipi/Projects/blog/blg-tst-claude/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
