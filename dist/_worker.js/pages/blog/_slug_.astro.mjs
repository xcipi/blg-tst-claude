globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                     */
import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_D0EvRT28.mjs';
import { $ as $$Layout, a as $$NavBar, b as $$Footer } from '../../chunks/Footer_vRc0Zpl0.mjs';
import { g as getCollection } from '../../chunks/_astro_content_Dz5VGe7N.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { post } = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.data.title} - sec.blog`, "description": post.data.excerpt }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "currentPath": Astro2.url.pathname })} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 px-4"> <div class="max-w-4xl mx-auto"> <div class="mb-8"> <div class="text-emerald-500 font-mono text-sm mb-4">
$ cat ~/blog/${post.slug}.md
</div> <div class="flex flex-wrap gap-2 mb-4"> ${post.data.tags.map((tag) => renderTemplate`<span class="px-3 py-1 rounded-full text-xs font-mono border bg-gray-900 text-emerald-500 border-gray-800"> ${tag} </span>`)} </div> <h1 class="text-4xl md:text-5xl font-bold text-white mb-4"> ${post.data.title} </h1> <div class="flex items-center gap-4 text-sm text-gray-500 font-mono mb-8"> <span class="flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect> <line x1="16" x2="16" y1="2" y2="6"></line> <line x1="8" x2="8" y1="2" y2="6"></line> <line x1="3" x2="21" y1="10" y2="10"></line> </svg> ${post.data.date} </span> <span class="flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10"></circle> <polyline points="12 6 12 12 16 14"></polyline> </svg> ${post.data.readTime} </span> </div> </div> <!-- Article Content --> <article class="prose prose-invert prose-emerald max-w-none markdown-content"> ${renderComponent($$result2, "Content", Content, {})} </article> <!-- Back button --> <a href="/blog" class="mt-12 text-emerald-500 font-mono hover:underline flex items-center gap-2 inline-flex"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotate-180"> <polyline points="9 18 15 12 9 6"></polyline> </svg>
späť na články
</a> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })} `;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/pages/blog/[slug].astro", void 0);

const $$file = "/home/skipi/Projects/blog/blg-tst-claude/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
