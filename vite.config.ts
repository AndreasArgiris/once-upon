/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type ProxyOptions } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Forwards /api/<name>/* to an AI service, adding the headers (like the API key) that must stay server-side. */
function apiProxy(prefix: string, target: string, headers: Record<string, string>): ProxyOptions {
  return {
    target,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
    headers,
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // The browser calls these paths; the dev/preview server attaches the keys.
  const apiProxies: Record<string, ProxyOptions> = {
    "/api/gemini": apiProxy("/api/gemini", "https://generativelanguage.googleapis.com/v1beta/openai", {
      Authorization: `Bearer ${env.GEMINI_API_KEY ?? ""}`,
    }),
    "/api/openrouter": apiProxy("/api/openrouter", "https://openrouter.ai/api/v1", {
      Authorization: `Bearer ${env.OPENROUTER_API_KEY ?? ""}`,
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "OnceUpon",
    }),
  };

  return {
    plugins: [react(), tailwindcss()],
    server: { proxy: apiProxies },
    preview: { proxy: apiProxies },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/test/setup.ts"],
    },
  };
});
