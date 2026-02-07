globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                 */
import { c as createComponent, e as renderComponent, r as renderTemplate, d as createAstro, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DwOUwrH7.mjs';
import { $ as $$NavBar, a as $$Footer, b as $$Layout } from '../chunks/Footer_CKOy8880.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const runtime = Astro2.locals.runtime;
  let isAuthenticated = false;
  let username = "";
  try {
    const cookie = Astro2.request.headers.get("Cookie");
    const sessionId = cookie?.match(/session=([^;]+)/)?.[1];
    if (sessionId && runtime?.env?.DB) {
      const session = await runtime.env.DB.prepare(
        'SELECT * FROM sessions WHERE id = ? AND expires_at > datetime("now")'
      ).bind(sessionId).first();
      if (session) {
        isAuthenticated = true;
        username = session.user_id;
      }
    }
  } catch (e) {
    console.error("Auth check error:", e);
  }
  if (!isAuthenticated) {
    return Astro2.redirect("/login");
  }
  let bookmarks = [];
  try {
    if (runtime?.env?.DB) {
      const result = await runtime.env.DB.prepare(
        "SELECT * FROM bookmarks ORDER BY created_at DESC"
      ).all();
      bookmarks = result.results.map((row) => ({
        id: row.id,
        title: row.title,
        url: row.url,
        tags: JSON.parse(row.tags),
        isPrivate: row.is_private === 1,
        createdAt: new Date(row.created_at).toISOString().split("T")[0]
      }));
    }
  } catch (e) {
    console.error("Fetch bookmarks error:", e);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Dashboard - sec.blog" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "currentPath": Astro2.url.pathname })} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 px-4"> <div class="max-w-7xl mx-auto">  <div class="flex items-center justify-between mb-8"> <div> <div class="text-emerald-500 font-mono text-sm mb-2">$ sudo su ${username}</div> <h1 class="text-4xl font-bold text-white">Admin Dashboard</h1> </div> <form method="POST" action="/api/auth/logout"> <button type="submit" class="border border-gray-800 text-gray-400 px-4 py-2 rounded font-mono hover:border-red-500 hover:text-red-500 transition-all">
Logout
</button> </form> </div>  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"> <div class="bg-terminal-card border border-gray-800 rounded-lg p-6"> <div class="text-emerald-500 text-3xl font-bold mb-2">${bookmarks.length}</div> <div class="text-gray-400 text-sm">Celkom bookmarkov</div> </div> <div class="bg-terminal-card border border-gray-800 rounded-lg p-6"> <div class="text-emerald-500 text-3xl font-bold mb-2"> ${bookmarks.filter((b) => !b.isPrivate).length} </div> <div class="text-gray-400 text-sm">Verejné</div> </div> <div class="bg-terminal-card border border-gray-800 rounded-lg p-6"> <div class="text-emerald-500 text-3xl font-bold mb-2"> ${bookmarks.filter((b) => b.isPrivate).length} </div> <div class="text-gray-400 text-sm">Súkromné</div> </div> </div>  <div class="mb-6"> <button id="add-bookmark-btn" class="bg-emerald-500 text-black px-6 py-3 rounded font-mono font-bold hover:bg-emerald-400 transition-all flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="12" y1="5" x2="12" y2="19"></line> <line x1="5" y1="12" x2="19" y2="12"></line> </svg>
Pridať bookmark
</button> </div>  <div class="bg-terminal-card border border-gray-800 rounded-lg overflow-hidden"> <table class="w-full"> <thead class="bg-gray-900 border-b border-gray-800"> <tr> <th class="text-left px-6 py-3 text-emerald-500 font-mono text-sm">Title</th> <th class="text-left px-6 py-3 text-emerald-500 font-mono text-sm">URL</th> <th class="text-left px-6 py-3 text-emerald-500 font-mono text-sm">Tags</th> <th class="text-center px-6 py-3 text-emerald-500 font-mono text-sm">Privacy</th> <th class="text-right px-6 py-3 text-emerald-500 font-mono text-sm">Actions</th> </tr> </thead> <tbody> ${bookmarks.length === 0 ? renderTemplate`<tr> <td colspan="5" class="px-6 py-8 text-center text-gray-400">
Žiadne bookmarky. Pridaj prvý!
</td> </tr>` : bookmarks.map((bookmark) => renderTemplate`<tr class="border-b border-gray-800 hover:bg-gray-900 transition-colors"> <td class="px-6 py-4 text-white font-semibold">${bookmark.title}</td> <td class="px-6 py-4"> <a${addAttribute(bookmark.url.startsWith("http") ? bookmark.url : `https://${bookmark.url}`, "href")} target="_blank" rel="noopener noreferrer" class="text-emerald-500 hover:underline text-sm font-mono"> ${bookmark.url} </a> </td> <td class="px-6 py-4"> <div class="flex flex-wrap gap-1"> ${bookmark.tags.map((tag) => renderTemplate`<span class="text-xs text-emerald-500 font-mono">#${tag}</span>`)} </div> </td> <td class="px-6 py-4 text-center"> ${bookmark.isPrivate ? renderTemplate`<span class="text-red-500 text-sm">🔒 Private</span>` : renderTemplate`<span class="text-emerald-500 text-sm">🌐 Public</span>`} </td> <td class="px-6 py-4"> <div class="flex items-center justify-end gap-2"> <button class="edit-btn text-gray-400 hover:text-emerald-500 transition-colors p-1"${addAttribute(bookmark.id, "data-id")}${addAttribute(bookmark.title, "data-title")}${addAttribute(bookmark.url, "data-url")}${addAttribute(bookmark.tags.join(", "), "data-tags")}${addAttribute(bookmark.isPrivate, "data-private")}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path> </svg> </button> <button class="delete-btn text-gray-400 hover:text-red-500 transition-colors p-1"${addAttribute(bookmark.id, "data-id")}${addAttribute(bookmark.title, "data-title")}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <polyline points="3 6 5 6 21 6"></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path> </svg> </button> </div> </td> </tr>`)} </tbody> </table> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} <div id="bookmark-modal" class="hidden fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"> <div class="bg-terminal-card border border-gray-800 rounded-lg max-w-2xl w-full p-8"> <div class="flex items-center justify-between mb-6"> <h2 id="modal-title" class="text-2xl font-bold text-white">Pridať bookmark</h2> <button id="close-modal" class="text-gray-400 hover:text-white transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg> </button> </div> <form id="bookmark-form" class="space-y-4"> <input type="hidden" id="bookmark-id"> <div> <label class="block text-gray-400 font-mono text-sm mb-2">Title *</label> <input type="text" id="bookmark-title" required class="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none" placeholder="Názov bookmarku"> </div> <div> <label class="block text-gray-400 font-mono text-sm mb-2">URL *</label> <input type="text" id="bookmark-url" required class="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none" placeholder="example.com alebo https://example.com"> </div> <div> <label class="block text-gray-400 font-mono text-sm mb-2">Tags (oddelené čiarkou) *</label> <input type="text" id="bookmark-tags" required class="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none" placeholder="javascript, react, frontend"> </div> <div class="flex items-center gap-3"> <input type="checkbox" id="bookmark-private" class="w-4 h-4 bg-gray-900 border-gray-800 rounded focus:ring-emerald-500"> <label for="bookmark-private" class="text-gray-400 font-mono text-sm">Súkromný bookmark 🔒</label> </div> <div class="flex gap-3 pt-4"> <button type="submit" class="bg-emerald-500 text-black px-6 py-2 rounded font-mono font-bold hover:bg-emerald-400 transition-all">
Uložiť
</button> <button type="button" id="cancel-btn" class="border border-gray-800 text-gray-400 px-6 py-2 rounded font-mono hover:border-emerald-500 hover:text-emerald-500 transition-all">
Zrušiť
</button> </div> </form> </div> </div> ` })}  `;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/pages/admin/index.astro", void 0);

const $$file = "/home/skipi/Projects/blog/blg-tst-claude/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
