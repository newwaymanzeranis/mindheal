import path from "node:path";
import { fileURLToPath } from "node:url";

import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const appDirectory = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "~": path.resolve(appDirectory, "app"),
    },
  },
  build: {
    rollupOptions: {
      ...(isSsrBuild ? { input: "./server/app.js" } : {}),
      external: ["nodemailer"],
    },
  },
  ssr: {
    external: ["nodemailer"],
  },
  server: {
    // 5173 is often taken by other Vite apps; use a dedicated port for Mind Heal
    port: 5175,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
}));
