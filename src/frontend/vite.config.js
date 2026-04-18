import { fileURLToPath, URL } from "url";
import { execSync } from "child_process";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";

// Vite plugin: run pnpm bindgen from project root before every build
// so frontend actor declarations always stay in sync with the backend.
function bindgenPlugin() {
  return {
    name: "bindgen",
    buildStart() {
      const projectRoot = path.resolve(fileURLToPath(import.meta.url), "../../..");
      console.log("[bindgen] Regenerating frontend bindings from backend interface...");
      try {
        execSync("pnpm bindgen", { cwd: projectRoot, stdio: "inherit" });
        console.log("[bindgen] Bindings regenerated successfully.");
      } catch (err) {
        console.error("[bindgen] Failed to regenerate bindings:", err.message);
        throw err;
      }
    },
  };
}

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : `https://identity.internetcomputer.org/`;

process.env.II_URL = process.env.II_URL || ii_url;
process.env.STORAGE_GATEWAY_URL =
  process.env.STORAGE_GATEWAY_URL || "https://blob.caffeine.ai";

export default defineConfig({
  logLevel: "error",
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    bindgenPlugin(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"]
  },
});
