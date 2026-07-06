import { createRequestHandler } from "react-router";

import { proxyToExpressApi } from "~/lib/expressProxy.server";
import { buildRobotsResponse } from "~/lib/robots.server";
import { buildSitemapResponse } from "~/lib/sitemap.server";

// @ts-expect-error virtual module provided by React Router at build time
import * as build from "virtual:react-router/server-build";

const reactRouterHandler = createRequestHandler(build, process.env.NODE_ENV);

/**
 * Vercel invokes this before React Router route matching.
 * Needed because URLs with dots (sitemap.xml, robots.txt) do not match reliably.
 */
export default async function handler(request) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/api")) {
    return proxyToExpressApi(request);
  }

  if (pathname === "/sitemap.xml" || pathname === "/sitemap.xml/") {
    return buildSitemapResponse(request);
  }

  if (pathname === "/robots.txt" || pathname === "/robots.txt/") {
    return buildRobotsResponse(request);
  }

  return reactRouterHandler(request);
}
