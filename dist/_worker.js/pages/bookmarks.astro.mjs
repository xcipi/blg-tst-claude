globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                  */
import { c as createComponent, m as maybeRenderHead, r as renderTemplate, a as addAttribute, b as createAstro, d as renderComponent } from '../chunks/astro/server_BMvcBqdl.mjs';
import { $ as $$Layout, a as $$NavBar, b as $$Footer } from '../chunks/Footer_reipK9V3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$BookmarkCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BookmarkCard;
  const { title, url, tags, date, isPrivate } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-terminal-card border border-gray-800 rounded-lg p-4 hover:border-emerald-500 transition-all"> <div class="flex items-start justify-between mb-2"> <h4 class="text-white font-semibold flex-1">${title}</h4> ${isPrivate ? renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500 flex-shrink-0"> <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect> <path d="M7 11V7a5 5 0 0 1 10 0v4"></path> </svg>` : renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500 flex-shrink-0"> <circle cx="12" cy="12" r="10"></circle> <circle cx="12" cy="10" r="3"></circle> <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path> </svg>`} </div> <a${addAttribute(url, "href")} target="_blank" rel="noopener noreferrer" class="text-emerald-500 text-sm hover:underline mb-3 block font-mono"> ${url} </a> <div class="flex flex-wrap gap-2 mb-3"> ${tags.map((tag) => renderTemplate`<span class="text-xs text-emerald-500 font-mono">
#${tag} </span>`)} </div> <div class="flex items-center gap-1 text-xs text-gray-500 font-mono"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect> <line x1="16" x2="16" y1="2" y2="6"></line> <line x1="8" x2="8" y1="2" y2="6"></line> <line x1="3" x2="21" y1="10" y2="10"></line> </svg> ${date} </div> </div>`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/components/BookmarkCard.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Bookmarks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Bookmarks;
  const runtime = Astro2.locals.runtime;
  let bookmarks = [];
  let error = null;
  try {
    if (runtime?.env?.DB) {
      const result = await runtime.env.DB.prepare(
        "SELECT * FROM bookmarks WHERE is_private = 0 ORDER BY created_at DESC"
      ).all();
      bookmarks = result.results.map((row) => ({
        id: row.id,
        title: row.title,
        url: row.url,
        tags: JSON.parse(row.tags),
        date: new Date(row.created_at).toISOString().split("T")[0],
        isPrivate: row.is_private === 1
      }));
    }
  } catch (e) {
    error = "Chyba pri na\u010D\xEDtan\xED bookmarkov";
    console.error(e);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Bookmarky - sec.blog" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "currentPath": Astro2.url.pathname })} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 px-4"> <div class="max-w-7xl mx-auto"> <div class="mb-8"> <div class="text-emerald-500 font-mono text-sm mb-4">$ cat ~/bookmarks</div> <h1 class="text-4xl font-bold text-white mb-2">Bookmarky</h1> <p class="text-gray-400">Zaujímavé odkazy z internetu</p> </div> ${error ? renderTemplate`<div class="bg-red-900/20 border border-red-500 rounded-lg p-4 text-center"> <p class="text-red-400 font-mono">${error}</p> <p class="text-gray-400 text-sm mt-2">Databáza nie je dostupná. Spusti: wrangler d1 create sec-blog-db</p> </div>` : bookmarks.length === 0 ? renderTemplate`<div class="text-center py-16"> <p class="text-gray-400 font-mono text-lg">Zatiaľ žiadne bookmarky.</p> <p class="text-gray-500 text-sm mt-2">Pridaj prvý bookmark cez admin panel.</p> </div>` : renderTemplate`<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"> ${bookmarks.map((bookmark) => renderTemplate`${renderComponent($$result2, "BookmarkCard", $$BookmarkCard, { "title": bookmark.title, "url": bookmark.url, "tags": bookmark.tags, "date": bookmark.date, "isPrivate": bookmark.isPrivate })}`)} </div>`} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/pages/bookmarks.astro", void 0);

const $$file = "/home/skipi/Projects/blog/blg-tst-claude/src/pages/bookmarks.astro";
const $$url = "/bookmarks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Bookmarks,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
