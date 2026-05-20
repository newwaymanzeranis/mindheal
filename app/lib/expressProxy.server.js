import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { config } from "dotenv";

import app from "../../server/src/app.js";

// Local dev only — on Vercel use dashboard env vars (DATABASE_URL, etc.)
if (!process.env.VERCEL) {
  const appDir = path.dirname(fileURLToPath(import.meta.url));
  config({ path: path.resolve(appDir, "../../server/.env") });
}

const globalKey = "__mindHealExpressServer";

/**
 * Run the Express API in-process (localhost) and proxy Fetch requests to it.
 * Works on Vercel Node SSR where the `api/` folder is ignored by React Router.
 */
async function getServerPort() {
  if (globalThis[globalKey]?.port) {
    return globalThis[globalKey].port;
  }

  const server = http.createServer(app);

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const port = server.address().port;
  globalThis[globalKey] = { server, port };
  return port;
}

/**
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export async function proxyToExpressApi(request) {
  const port = await getServerPort();
  const url = new URL(request.url);
  const target = `http://127.0.0.1:${port}${url.pathname}${url.search}`;

  const init = {
    method: request.method,
    headers: request.headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD" && request.body) {
    init.body = request.body;
    // @ts-expect-error duplex required for streaming body in Node 18+
    init.duplex = "half";
  }

  return fetch(target, init);
}
