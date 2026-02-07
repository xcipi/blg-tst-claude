globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, m as maybeRenderHead, a as addAttribute, r as renderTemplate, b as createAstro } from './astro/server_BMvcBqdl.mjs';

const $$Astro = createAstro();
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { title, excerpt, tags, date, readTime, slug } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/blog/${slug}`, "href")} class="block bg-terminal-card border border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-all group"> <div class="flex flex-wrap gap-2 mb-4"> ${tags.map((tag) => renderTemplate`<span class="px-3 py-1 rounded-full text-xs font-mono border bg-gray-900 text-emerald-500 border-gray-800 hover:border-emerald-500"> ${tag} </span>`)} </div> <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-500 transition-colors"> ${title} </h3> <p class="text-gray-400 mb-4 line-clamp-2"> ${excerpt} </p> <div class="flex items-center gap-4 text-sm text-gray-500 font-mono"> <span class="flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect> <line x1="16" x2="16" y1="2" y2="6"></line> <line x1="8" x2="8" y1="2" y2="6"></line> <line x1="3" x2="21" y1="10" y2="10"></line> </svg> ${date} </span> <span class="flex items-center gap-1"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10"></circle> <polyline points="12 6 12 12 16 14"></polyline> </svg> ${readTime} </span> </div> </a>`;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/components/BlogCard.astro", void 0);

export { $$BlogCard as $ };
