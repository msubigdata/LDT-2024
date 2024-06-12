import { resolve } from "node:path";

import { defineConfig, loadEnv } from "vite";

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";

import type { ServerOptions } from "vite";

const configureProxy = (mode: string): ServerOptions | undefined => {
  const env = loadEnv(mode, process.cwd(), "");

  const url = env.VITE_DEV_BACKEND_URL;

  if (mode !== "development") {
    console.info(`\x1b[34m\nskipping proxy setup in production mode\n\x1b[0m`);
    return;
  }

  if (!url) {
    console.info(`\x1b[33m\nskipping proxy setup because VITE_DEV_BACKEND_URL is not set\n\x1b[0m`);
    return;
  }

  console.info(`\x1b[32m\nsetting up proxy for ${url}\n\x1b[0m`);

  return {
    proxy: {
      "/api": {
        target: url,
        changeOrigin: true,
      },
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: configureProxy(mode),
  plugins: [
    react(),
    TanStackRouterVite({
      generatedRouteTree: "./src/generated/routes.ts",
      quoteStyle: "double",
      semicolons: true,
    }),
  ],
}));
