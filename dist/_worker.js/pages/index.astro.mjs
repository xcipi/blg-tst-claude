globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate, b as renderComponent } from '../chunks/astro/server_DjvQ9r3T.mjs';
import { $ as $$Layout, a as $$NavBar, b as $$Footer } from '../chunks/Footer_ZFd_tFYe.mjs';
import { g as getCollection } from '../chunks/_astro_content_D7JtjPnq.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$CertificationsShowcase = createComponent(($$result, $$props, $$slots) => {
  const topCerts = [
    {
      name: "CCSM",
      fullName: "Check Point Certified Security Master",
      year: "2023",
      expires: "2026",
      url: "https://www.credly.com/earner/earned/badge/3457cc79-0116-4dfa-9f55-4d911c3531a4",
      badgeImage: "https://images.credly.com/size/340x340/images/e1db35be-2f90-4435-bf0f-ac69f3ffbdfc/blob"
    },
    {
      name: "CCNP Security",
      fullName: "Cisco Certified Network Professional Security",
      year: "2014",
      expires: "2027",
      url: "https://www.credly.com/earner/earned/badge/71cfdc40-c5bd-4d02-8e80-3151f275d26b",
      badgeImage: "https://images.credly.com/size/340x340/images/cd769843-4907-4d1a-9702-0512eb87ae6e/cisco_ccnp_security.png"
    },
    {
      name: "CCTE R81",
      fullName: "Check Point Certified Troubleshooting Expert",
      year: "2025",
      expires: "2027",
      url: "https://www.credly.com/earner/earned/badge/95a75c3b-9e01-40ea-9f68-e30c391ac943",
      badgeImage: "https://images.credly.com/size/340x340/images/54493e06-3286-4dfc-b0fc-80f3846db491/blob"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="mb-16 py-8 border-t border-b border-gray-800"> <div class="mb-6"> <div class="text-emerald-500 font-mono text-sm mb-2">$ ls ~/certifications/</div> </div> <div class="flex flex-wrap gap-4"> ${topCerts.map((cert) => renderTemplate`<a${addAttribute(cert.url, "href")} target="_blank" rel="noopener noreferrer" class="group flex flex-col items-center p-3 bg-[#111111] border border-gray-800 rounded-lg hover:border-emerald-500 transition-all hover:scale-105"${addAttribute(cert.name, "title")}> <div class="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-white mb-2"> <img${addAttribute(cert.badgeImage, "src")}${addAttribute(cert.name, "alt")} class="w-full h-full object-cover"> </div> <div class="text-gray-500 text-xs font-mono text-center"> ${cert.year} - ${cert.expires} </div> </a>`)} </div> <div class="mt-4"> <a href="https://www.credly.com/users/skipi" target="_blank" rel="noopener noreferrer" class="text-emerald-500 text-sm font-mono hover:underline inline-flex items-center gap-1">
view all on credly
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path> <polyline points="15 3 21 3 21 9"></polyline> <line x1="10" y1="14" x2="21" y2="3"></line> </svg> </a> </div> </div> <div class="text-center mt-4"> <a href="https://www.credly.com/users/skipi" target="_blank" rel="noopener noreferrer" class="text-emerald-500 text-sm font-mono hover:underline inline-flex items-center gap-1">
view all on credly
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path> <polyline points="15 3 21 3 21 9"></polyline> <line x1="10" y1="14" x2="21" y2="3"></line> </svg> </a> </div> `;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/components/CertificationsShowcase.astro", void 0);

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allBlogPosts = await getCollection("blog");
  const blogPosts = allBlogPosts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()).slice(0, 3).map((post) => ({
    title: post.data.title,
    excerpt: post.data.excerpt,
    slug: post.slug,
    date: post.data.date,
    readTime: post.data.readTime,
    tags: post.data.tags
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "sec.blog - IT profesion\xE1l p\xED\u0161em o veciach, ktor\xE9 ma bavia", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "currentPath": "/", "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<main class="min-h-screen pt-24 pb-16 px-4" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto" data-astro-cid-j7pv25f6> <!-- Hero Section --> <div class="mb-16" data-astro-cid-j7pv25f6> <div class="text-emerald-500 font-mono text-sm mb-8" data-astro-cid-j7pv25f6>$ whoami</div> <h1 class="text-5xl md:text-7xl font-bold mb-6" data-astro-cid-j7pv25f6> <span class="text-emerald-500 font-mono" data-astro-cid-j7pv25f6>cybersec nerd</span> <br data-astro-cid-j7pv25f6> <span class="text-white" data-astro-cid-j7pv25f6>píšem o veciach,</span> <br data-astro-cid-j7pv25f6> <span class="text-white" data-astro-cid-j7pv25f6>ktoré ma bavia</span> </h1> <p class="text-gray-400 text-lg mb-8 max-w-2xl" data-astro-cid-j7pv25f6>
Blog o IT, cybersec a všetkom zaujímavom. Zbierka bookmarkov a myšlienok z digitálneho sveta.
</p> <div class="flex flex-wrap gap-4" data-astro-cid-j7pv25f6> <a href="/blog" class="bg-emerald-500 text-black px-6 py-3 rounded font-mono font-bold hover:bg-emerald-400 transition-all inline-flex items-center gap-2" data-astro-cid-j7pv25f6>
Čítať blog
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <polyline points="9 18 15 12 9 6" data-astro-cid-j7pv25f6></polyline> </svg> </a> <a href="/bookmarks" class="border border-gray-800 text-gray-400 px-6 py-3 rounded font-mono hover:border-emerald-500 hover:text-emerald-500 transition-all" data-astro-cid-j7pv25f6>
Bookmarky
</a> </div> </div> <!-- Certifications Showcase --> ${renderComponent($$result2, "CertificationsShowcase", $$CertificationsShowcase, { "data-astro-cid-j7pv25f6": true })} <!-- Latest Posts --> <div data-astro-cid-j7pv25f6> <div class="flex items-center justify-between mb-6" data-astro-cid-j7pv25f6> <h2 class="text-2xl font-bold text-white flex items-center gap-2" data-astro-cid-j7pv25f6> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-emerald-500" data-astro-cid-j7pv25f6> <polyline points="9 18 15 12 9 6" data-astro-cid-j7pv25f6></polyline> </svg>
Posledné články
</h2> <a href="/blog" class="text-emerald-500 font-mono text-sm hover:underline inline-flex items-center gap-1" data-astro-cid-j7pv25f6>
všetky
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <polyline points="9 18 15 12 9 6" data-astro-cid-j7pv25f6></polyline> </svg> </a> </div> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-astro-cid-j7pv25f6> ${blogPosts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="bg-[#111111] border border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-all group" data-astro-cid-j7pv25f6> <div class="flex flex-wrap gap-2 mb-4" data-astro-cid-j7pv25f6> ${post.tags.map((tag) => renderTemplate`<span class="px-3 py-1 rounded-full text-xs font-mono bg-gray-900 text-emerald-500 border border-gray-800" data-astro-cid-j7pv25f6> ${tag} </span>`)} </div> <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-500 transition-colors" data-astro-cid-j7pv25f6> ${post.title} </h3> <p class="text-gray-400 mb-4 line-clamp-2" data-astro-cid-j7pv25f6> ${post.excerpt} </p> <div class="flex items-center gap-4 text-sm text-gray-500 font-mono" data-astro-cid-j7pv25f6> <span class="flex items-center gap-1" data-astro-cid-j7pv25f6> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-astro-cid-j7pv25f6></rect> <line x1="16" y1="2" x2="16" y2="6" data-astro-cid-j7pv25f6></line> <line x1="8" y1="2" x2="8" y2="6" data-astro-cid-j7pv25f6></line> <line x1="3" y1="10" x2="21" y2="10" data-astro-cid-j7pv25f6></line> </svg> ${new Date(post.date).toISOString().split("T")[0]} </span> <span class="flex items-center gap-1" data-astro-cid-j7pv25f6> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-j7pv25f6> <circle cx="12" cy="12" r="10" data-astro-cid-j7pv25f6></circle> <polyline points="12 6 12 12 16 14" data-astro-cid-j7pv25f6></polyline> </svg> ${post.readTime} </span> </div> </a>`)} </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-j7pv25f6": true })} ` })} `;
}, "/home/skipi/Projects/blog/blg-tst-claude/src/pages/index.astro", void 0);

const $$file = "/home/skipi/Projects/blog/blg-tst-claude/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
