import { proxyToExpressApi } from "~/lib/expressProxy.server";

/** Proxy /api/* to Express (Vercel + React Router). */
export async function loader({ request }) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return null;
  }
  return proxyToExpressApi(request);
}

export async function action({ request }) {
  return proxyToExpressApi(request);
}
