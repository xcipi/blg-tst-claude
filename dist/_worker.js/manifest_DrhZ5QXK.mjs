globalThis.process ??= {}; globalThis.process.env ??= {};
import { h as decodeKey } from './chunks/astro/server_DwOUwrH7.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Cp2yYlvZ.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/skipi/Projects/blog/blg-tst-claude/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const c=document.getElementById(\"bookmark-modal\"),l=document.getElementById(\"bookmark-form\"),s=document.getElementById(\"modal-title\"),i=document.getElementById(\"bookmark-id\"),m=document.getElementById(\"bookmark-title\"),u=document.getElementById(\"bookmark-url\"),k=document.getElementById(\"bookmark-tags\"),b=document.getElementById(\"bookmark-private\");document.getElementById(\"add-bookmark-btn\")?.addEventListener(\"click\",()=>{s.textContent=\"Pridať bookmark\",l.reset(),i.value=\"\",c?.classList.remove(\"hidden\")});document.querySelectorAll(\".edit-btn\").forEach(t=>{t.addEventListener(\"click\",()=>{const e=t.getAttribute(\"data-id\"),a=t.getAttribute(\"data-title\"),o=t.getAttribute(\"data-url\"),n=t.getAttribute(\"data-tags\"),d=t.getAttribute(\"data-private\")===\"true\";s.textContent=\"Upraviť bookmark\",i.value=e||\"\",m.value=a||\"\",u.value=o||\"\",k.value=n||\"\",b.checked=d,c?.classList.remove(\"hidden\")})});function g(){c?.classList.add(\"hidden\"),l.reset()}document.getElementById(\"close-modal\")?.addEventListener(\"click\",g);document.getElementById(\"cancel-btn\")?.addEventListener(\"click\",g);l?.addEventListener(\"submit\",async t=>{t.preventDefault();const e=i.value,a=m.value,o=u.value,n=k.value.split(\",\").map(r=>r.trim()).filter(Boolean),d=b.checked,p={title:a,url:o,tags:n,isPrivate:d};try{(await fetch(e?`/api/bookmarks/${e}`:\"/api/bookmarks\",{method:e?\"PUT\":\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(p)})).ok?window.location.reload():alert(\"Chyba pri ukladaní bookmarku\")}catch(r){console.error(\"Error:\",r),alert(\"Chyba pri ukladaní bookmarku\")}});document.querySelectorAll(\".delete-btn\").forEach(t=>{t.addEventListener(\"click\",async()=>{const e=t.getAttribute(\"data-id\"),a=t.getAttribute(\"data-title\");if(confirm(`Naozaj chceš zmazať \"${a}\"?`))try{(await fetch(`/api/bookmarks/${e}`,{method:\"DELETE\"})).ok?window.location.reload():alert(\"Chyba pri mazaní bookmarku\")}catch(o){console.error(\"Error:\",o),alert(\"Chyba pri mazaní bookmarku\")}})});\n"}],"styles":[{"type":"external","src":"/_astro/index.DFQfaIAH.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",()=>{const a=document.querySelectorAll(\".tag-filter\"),r=document.querySelectorAll(\".blog-post\");a.forEach(t=>{t.addEventListener(\"click\",()=>{const l=t.getAttribute(\"data-tag\");a.forEach(e=>{e.classList.remove(\"bg-emerald-500\",\"text-black\",\"border-emerald-500\",\"font-bold\",\"active\"),e.classList.add(\"bg-gray-900\",\"text-emerald-500\",\"border-gray-800\")}),t.classList.remove(\"bg-gray-900\",\"text-emerald-500\",\"border-gray-800\"),t.classList.add(\"bg-emerald-500\",\"text-black\",\"border-emerald-500\",\"font-bold\",\"active\"),r.forEach(e=>{const d=e.getAttribute(\"data-tags\").split(\",\");l===\"all\"||d.includes(l)?e.style.display=\"block\":e.style.display=\"none\"})})})});\n"}],"styles":[{"type":"external","src":"/_astro/index.DFQfaIAH.css"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",()=>{const l=document.querySelectorAll(\".privacy-filter\"),c=document.querySelectorAll(\".tag-filter\"),s=document.querySelectorAll(\".bookmark-item\");let t=\"all\",r=\"all\";function d(){s.forEach(e=>{const a=e.getAttribute(\"data-privacy\"),o=e.getAttribute(\"data-tags\")?.split(\",\")||[],i=t===\"all\"||a===t,g=r===\"all\"||o.includes(r);i&&g?e.style.display=\"block\":e.style.display=\"none\"})}l.forEach(e=>{e.addEventListener(\"click\",()=>{t=e.getAttribute(\"data-privacy\")||\"all\",l.forEach(a=>{a.classList.remove(\"bg-emerald-500\",\"text-black\",\"border-emerald-500\",\"font-bold\",\"active\"),a.classList.add(\"bg-gray-900\",\"text-emerald-500\",\"border-gray-800\")}),e.classList.remove(\"bg-gray-900\",\"text-emerald-500\",\"border-gray-800\"),e.classList.add(\"bg-emerald-500\",\"text-black\",\"border-emerald-500\",\"font-bold\",\"active\"),d()})}),c.forEach(e=>{e.addEventListener(\"click\",()=>{r=e.getAttribute(\"data-tag\")||\"all\",c.forEach(a=>{a.classList.remove(\"bg-emerald-500\",\"text-black\",\"border-emerald-500\",\"font-bold\",\"active\"),a.classList.add(\"bg-gray-900\",\"text-emerald-500\",\"border-gray-800\")}),e.classList.remove(\"bg-gray-900\",\"text-emerald-500\",\"border-gray-800\"),e.classList.add(\"bg-emerald-500\",\"text-black\",\"border-emerald-500\",\"font-bold\",\"active\"),d()})})});\n"}],"styles":[{"type":"external","src":"/_astro/index.DFQfaIAH.css"}],"routeData":{"route":"/bookmarks","isIndex":false,"type":"page","pattern":"^\\/bookmarks\\/?$","segments":[[{"content":"bookmarks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bookmarks.astro","pathname":"/bookmarks","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DFQfaIAH.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DFQfaIAH.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/skipi/Projects/blog/blg-tst-claude/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["/home/skipi/Projects/blog/blg-tst-claude/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/home/skipi/Projects/blog/blg-tst-claude/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/skipi/Projects/blog/blg-tst-claude/src/pages/bookmarks.astro",{"propagation":"none","containsHead":true}],["/home/skipi/Projects/blog/blg-tst-claude/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/skipi/Projects/blog/blg-tst-claude/src/pages/login.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/bookmarks@_@astro":"pages/bookmarks.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/kubernetes-production-checklist.md?astroContentCollectionEntry=true":"chunks/kubernetes-production-checklist_BnqxFrn5.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/neovim-setup.md?astroContentCollectionEntry=true":"chunks/neovim-setup_eEbBkcb8.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/typescript-patterns-2026.md?astroContentCollectionEntry=true":"chunks/typescript-patterns-2026_C_nCCPFz.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/kubernetes-production-checklist.md?astroPropagatedAssets":"chunks/kubernetes-production-checklist_B15fzbbn.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/neovim-setup.md?astroPropagatedAssets":"chunks/neovim-setup_WjAEu4W7.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/typescript-patterns-2026.md?astroPropagatedAssets":"chunks/typescript-patterns-2026_cBCy418G.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_Dno0vHp6.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_tqJQiZwR.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/kubernetes-production-checklist.md":"chunks/kubernetes-production-checklist_8tD5AZ3x.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/neovim-setup.md":"chunks/neovim-setup_zZEcU8Mp.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/typescript-patterns-2026.md":"chunks/typescript-patterns-2026_Civ3AfFi.mjs","\u0000@astrojs-manifest":"manifest_DrhZ5QXK.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.DUfLi39A.js","/astro/hoisted.js?q=1":"_astro/hoisted.khoxTXjy.js","/astro/hoisted.js?q=2":"_astro/hoisted.BUEGODsi.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.DFQfaIAH.css","/favicon.svg","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_noop-middleware.mjs","/_worker.js/index.js","/_worker.js/renderers.mjs","/_worker.js/_astro/index.DFQfaIAH.css","/_worker.js/chunks/BlogCard_CMQdmXUD.mjs","/_worker.js/chunks/Footer_CKOy8880.mjs","/_worker.js/chunks/_astro_asset-imports_Dno0vHp6.mjs","/_worker.js/chunks/_astro_content_CccCGBNX.mjs","/_worker.js/chunks/_astro_data-layer-content_tqJQiZwR.mjs","/_worker.js/chunks/astro-designed-error-pages_Cp2yYlvZ.mjs","/_worker.js/chunks/astro_CUenO3yu.mjs","/_worker.js/chunks/kubernetes-production-checklist_8tD5AZ3x.mjs","/_worker.js/chunks/kubernetes-production-checklist_B15fzbbn.mjs","/_worker.js/chunks/kubernetes-production-checklist_BnqxFrn5.mjs","/_worker.js/chunks/neovim-setup_WjAEu4W7.mjs","/_worker.js/chunks/neovim-setup_eEbBkcb8.mjs","/_worker.js/chunks/neovim-setup_zZEcU8Mp.mjs","/_worker.js/chunks/parse_DqSI_75p.mjs","/_worker.js/chunks/typescript-patterns-2026_C_nCCPFz.mjs","/_worker.js/chunks/typescript-patterns-2026_Civ3AfFi.mjs","/_worker.js/chunks/typescript-patterns-2026_cBCy418G.mjs","/_worker.js/pages/_image.astro.mjs","/_worker.js/pages/admin.astro.mjs","/_worker.js/pages/blog.astro.mjs","/_worker.js/pages/bookmarks.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/login.astro.mjs","/_worker.js/chunks/astro/assets-service_BhN9Nkee.mjs","/_worker.js/chunks/astro/server_DwOUwrH7.mjs","/_worker.js/pages/blog/_slug_.astro.mjs"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"vx9JbM1osmsgDZee5XZPXmEEZpiJZWQHf6CW3eFItrM=","experimentalEnvGetSecretEnabled":false});

export { manifest };
