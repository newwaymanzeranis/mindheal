import { readFileSync } from "node:fs";
import { join } from "node:path";

import { buildRobotsResponse } from "~/lib/robots.server";
import { buildSitemapResponse } from "~/lib/sitemap.server";

const SW_JS = `// Empty service worker — prevents 404 noise from crawlers probing /sw.js
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
`;

function readPublicFile(name) {
  try {
    return readFileSync(join(process.cwd(), "public", name), "utf8");
  } catch {
    return null;
  }
}

const STATIC_ASSET_HANDLERS = {
  "/sitemap.xml": (request) => buildSitemapResponse(request),
  "/sitemap.xml/": (request) => buildSitemapResponse(request),
  "/robots.txt": (request) => buildRobotsResponse(request),
  "/robots.txt/": (request) => buildRobotsResponse(request),
  "/sw.js": () =>
    new Response(readPublicFile("sw.js") ?? SW_JS, {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    }),
  "/sw.js/": () =>
    new Response(readPublicFile("sw.js") ?? SW_JS, {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    }),
};

export function handleStaticAssetRequest(request) {
  const { pathname } = new URL(request.url);
  const handler = STATIC_ASSET_HANDLERS[pathname];
  return handler ? handler(request) : null;
}
