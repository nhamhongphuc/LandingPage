import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    // Shared build options
    minify: "esbuild",
    sourcemap: false,
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
