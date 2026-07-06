import type { AppLoadContext, EntryContext } from "react-router";
import { handleRequest as vercelHandleRequest } from "@vercel/react-router/entry.server";

import { handleStaticAssetRequest } from "~/lib/staticAssets.server";
import { proxyToExpressApi } from "~/lib/expressProxy.server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/api")) {
    return proxyToExpressApi(request);
  }

  const staticResponse = await handleStaticAssetRequest(request);
  if (staticResponse) return staticResponse;

  return vercelHandleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    routerContext,
    loadContext
  );
}
