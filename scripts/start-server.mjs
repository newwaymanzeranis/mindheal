import { createServer } from "node:http";

import handler from "../build/server/nodejs_eyJydW50aW1lIjoibm9kZWpzIn0/index.js";

const port = Number(process.env.PORT) || 3000;

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${port}`);
  const init = { method: req.method, headers: req.headers };

  if (req.method !== "GET" && req.method !== "HEAD") {
  // @ts-expect-error duplex required for streaming body in Node 18+
    init.body = req;
    init.duplex = "half";
  }

  const response = await handler(new Request(url, init));
  res.writeHead(response.status, Object.fromEntries(response.headers));

  if (response.body) {
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }

  res.end();
}).listen(port, () => {
  console.log(`[mind-heal] http://localhost:${port}`);
});
