globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as decodeKey } from './chunks/astro/server_BMvcBqdl.mjs';
import './chunks/astro-designed-error-pages_DUk3BI1p.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_BY7_EkYM.mjs';

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

const manifest = deserializeManifest({"hrefRoot":"file:///home/skipi/Projects/blog/blg-tst-claude/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.CibcJ-Dx.css"},{"type":"inline","content":".markdown-content{--tw-text-opacity: 1;color:rgb(209 213 219 / var(--tw-text-opacity, 1))}.markdown-content h2{margin-top:2rem;margin-bottom:1rem;font-size:1.5rem;line-height:2rem;font-weight:700;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.markdown-content h3{margin-top:1.5rem;margin-bottom:.75rem;font-size:1.25rem;line-height:1.75rem;font-weight:700;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.markdown-content p{margin-bottom:1rem;line-height:1.625}.markdown-content ul,.markdown-content ol{margin-bottom:1.5rem}.markdown-content ul>:not([hidden])~:not([hidden]),.markdown-content ol>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.markdown-content li{margin-left:1rem}.markdown-content ul li{list-style-type:disc}.markdown-content code{border-radius:.25rem;--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1));padding:.25rem .5rem;font-family:JetBrains Mono,monospace;font-size:.875rem;line-height:1.25rem;--tw-text-opacity: 1;color:rgb(52 211 153 / var(--tw-text-opacity, 1))}.markdown-content pre{margin-top:1.5rem;margin-bottom:1.5rem;overflow-x:auto;border-radius:.5rem;border-width:1px;--tw-border-opacity: 1;border-color:rgb(31 41 55 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1));padding:1rem}.markdown-content pre code{background-color:transparent;padding:0;--tw-text-opacity: 1;color:rgb(16 185 129 / var(--tw-text-opacity, 1))}.markdown-content strong{font-weight:700;--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.markdown-content a{--tw-text-opacity: 1;color:rgb(16 185 129 / var(--tw-text-opacity, 1))}.markdown-content a:hover{text-decoration-line:underline}.markdown-content blockquote{margin-top:1.5rem;margin-bottom:1.5rem;border-left-width:4px;--tw-border-opacity: 1;border-color:rgb(16 185 129 / var(--tw-border-opacity, 1));padding-left:1rem;font-style:italic}\n"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.CibcJ-Dx.css"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.CibcJ-Dx.css"}],"routeData":{"route":"/bookmarks","isIndex":false,"type":"page","pattern":"^\\/bookmarks\\/?$","segments":[[{"content":"bookmarks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bookmarks.astro","pathname":"/bookmarks","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.CibcJ-Dx.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.CibcJ-Dx.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/skipi/Projects/blog/blg-tst-claude/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/home/skipi/Projects/blog/blg-tst-claude/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/skipi/Projects/blog/blg-tst-claude/src/pages/bookmarks.astro",{"propagation":"none","containsHead":true}],["/home/skipi/Projects/blog/blg-tst-claude/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/skipi/Projects/blog/blg-tst-claude/src/pages/login.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:src/pages/bookmarks@_@astro":"pages/bookmarks.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/kubernetes-production-checklist.md?astroContentCollectionEntry=true":"chunks/kubernetes-production-checklist_BnqxFrn5.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/neovim-setup.md?astroContentCollectionEntry=true":"chunks/neovim-setup_eEbBkcb8.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/typescript-patterns-2026.md?astroContentCollectionEntry=true":"chunks/typescript-patterns-2026_C_nCCPFz.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/kubernetes-production-checklist.md?astroPropagatedAssets":"chunks/kubernetes-production-checklist_C9_O6qO7.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/neovim-setup.md?astroPropagatedAssets":"chunks/neovim-setup_DKBfV_eP.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/typescript-patterns-2026.md?astroPropagatedAssets":"chunks/typescript-patterns-2026_Bo_fwA1c.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_Dno0vHp6.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_tqJQiZwR.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/kubernetes-production-checklist.md":"chunks/kubernetes-production-checklist_Cvyx40cG.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/neovim-setup.md":"chunks/neovim-setup_UMqBw9wu.mjs","/home/skipi/Projects/blog/blg-tst-claude/src/content/blog/typescript-patterns-2026.md":"chunks/typescript-patterns-2026_4ZoiJD1V.mjs","\u0000@astrojs-manifest":"manifest_BF6F1cEb.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.CibcJ-Dx.css","/favicon.svg","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/index.js","/_worker.js/renderers.mjs","/_worker.js/_astro/_slug_.CibcJ-Dx.css","/_worker.js/chunks/BlogCard_Cjc6rQ-F.mjs","/_worker.js/chunks/Footer_reipK9V3.mjs","/_worker.js/chunks/_astro_asset-imports_Dno0vHp6.mjs","/_worker.js/chunks/_astro_content_DVMk-veL.mjs","/_worker.js/chunks/_astro_data-layer-content_tqJQiZwR.mjs","/_worker.js/chunks/astro-designed-error-pages_DUk3BI1p.mjs","/_worker.js/chunks/astro_DSavd_ex.mjs","/_worker.js/chunks/index_Bot0C9b5.mjs","/_worker.js/chunks/kubernetes-production-checklist_BnqxFrn5.mjs","/_worker.js/chunks/kubernetes-production-checklist_C9_O6qO7.mjs","/_worker.js/chunks/kubernetes-production-checklist_Cvyx40cG.mjs","/_worker.js/chunks/neovim-setup_DKBfV_eP.mjs","/_worker.js/chunks/neovim-setup_UMqBw9wu.mjs","/_worker.js/chunks/neovim-setup_eEbBkcb8.mjs","/_worker.js/chunks/noop-middleware_BY7_EkYM.mjs","/_worker.js/chunks/parse_DqSI_75p.mjs","/_worker.js/chunks/typescript-patterns-2026_4ZoiJD1V.mjs","/_worker.js/chunks/typescript-patterns-2026_Bo_fwA1c.mjs","/_worker.js/chunks/typescript-patterns-2026_C_nCCPFz.mjs","/_worker.js/pages/_image.astro.mjs","/_worker.js/pages/blog.astro.mjs","/_worker.js/pages/bookmarks.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/login.astro.mjs","/_worker.js/chunks/astro/assets-service_Cdp88OxU.mjs","/_worker.js/chunks/astro/env-setup_nxDOIah1.mjs","/_worker.js/chunks/astro/server_BMvcBqdl.mjs","/_worker.js/pages/blog/_slug_.astro.mjs"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"bPsXULuLplf0sx32CDXyDtg2aqLpDoJX3W8ooQp5JQY=","experimentalEnvGetSecretEnabled":false});

export { manifest };
