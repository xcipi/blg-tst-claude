globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate, d as createAstro, b as renderComponent } from '../chunks/astro/server_DjvQ9r3T.mjs';
import { $ as $$Layout, a as $$NavBar, b as $$Footer } from '../chunks/Footer_ZFd_tFYe.mjs';
import { g as getCollection } from '../chunks/_astro_content_D7JtjPnq.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { title, excerpt, tags, date, readTime, slug } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/blog/${slug}`, "href")} class="block bg-terminal-card border border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-all group"> <div class="flex flex-wrap gap-2 mb-4"> ${tags.map((tag) => renderTemplate`<span class="px-3 py-1 rounded-full text-xs font-mono border bg-gray-900 text-emerald-500 border-gray-800 hover:border-emerald-500"> ${tag} </span>`)} </div> <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-500 transition-colors"> ${title} </h3> <p class="text-gray-400 mb-4 line-clamp-2"> ${excerpt} </p> <div class="flex items-center gap-4 text-sm text-gray-500 font-mono"> <span class="flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect> <line x1="16" x2="16" y1="2" y2="6"></line> <line x1="8" x2="8" y1="2" y2="6"></line> <line x1="3" x2="21" y1="10" y2="10"></line> </svg> ${date} </span> <span class="flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10"></circle> <polyline points="12 6 12 12 16 14"></polyline> </svg> ${readTime} </span> </div> </a>`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/components/BlogCard.astro", void 0);

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
