/**
 * prerender.ts — Static Site Generation (SSG) for GitHub Pages
 *
 * This script runs AFTER `vite build` (client + server) and:
 * 1. Loads the built SSR entry (render function + defaultMeta)
 * 2. Renders the React app to a full HTML string
 * 3. Injects it into the built index.html template
 * 4. Writes the final pre-rendered HTML to dist/client/index.html
 * 5. Copies CNAME for GitHub Pages custom domain
 * 6. Creates a 404.html fallback (SPA routing support on GitHub Pages)
 *
 * The result in dist/client/ is a fully static, deployable site.
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

async function prerender() {
  console.log("🔨 Pre-rendering HTML for GitHub Pages...\n");

  const clientDir = resolve(ROOT, "dist/client");
  const serverDir = resolve(ROOT, "dist/server");

  // 1. Read the Vite-built HTML template
  const templatePath = resolve(clientDir, "index.html");
  if (!existsSync(templatePath)) {
    console.error("❌ dist/client/index.html not found. Run `npm run build:client` first.");
    process.exit(1);
  }
  let template = readFileSync(templatePath, "utf-8");

  // 2. Load the built SSR entry (contains both render() and defaultMeta)
  const ssrEntryPath = resolve(serverDir, "entry-server.js");
  if (!existsSync(ssrEntryPath)) {
    console.error("❌ dist/server/entry-server.js not found. Run `npm run build:server` first.");
    process.exit(1);
  }
  const { render, renderHeadTags, defaultMeta } = await import(pathToFileURL(ssrEntryPath).href);

  // 3. Build preloaded state
  const preloadedState = {
    meta: defaultMeta,
    timestamp: Date.now(),
  };

  // 4. Render the React app to HTML
  const appHtml = render("/", preloadedState);

  // 5. Generate proper <head> meta tags
  const headTags = renderHeadTags(defaultMeta);

  // 6. Inject into template
  let html = template.replace("<!--ssr-head-->", headTags);
  html = html.replace("<!--ssr-outlet-->", appHtml);

  // 6b. Inline CSS to eliminate render-blocking stylesheet request
  const cssLinkMatch = html.match(
    /<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/[^"]+\.css)">/
  );
  if (cssLinkMatch) {
    const cssHref = cssLinkMatch[1]; // e.g. /assets/index-B43fXy8O.css
    const cssFilePath = resolve(clientDir, cssHref.slice(1)); // remove leading /
    if (existsSync(cssFilePath)) {
      const cssContent = readFileSync(cssFilePath, "utf-8");
      // Extract font URLs from CSS for preloading
      const fontUrls: string[] = [];
      const fontUrlRegex = /url\((\/assets\/inter-(?:latin|vietnamese)-(?:400|700)-normal-[^)]+\.woff2)\)/g;
      let fontMatch;
      while ((fontMatch = fontUrlRegex.exec(cssContent)) !== null) {
        fontUrls.push(fontMatch[1]);
      }
      const fontPreloads = fontUrls
        .map((u) => `<link rel="preload" as="font" type="font/woff2" href="${u}" crossorigin />`)
        .join("\n    ");
      html = html.replace(
        cssLinkMatch[0],
        `${fontPreloads}\n    <style>${cssContent}</style>`
      );
      console.log(`  ✅ Inlined CSS (${(cssContent.length / 1024).toFixed(1)} KiB) — eliminated render-blocking request`);
      console.log(`  ✅ Added ${fontUrls.length} font preload hints`);
    }
  }

  const stateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
    preloadedState
  ).replace(/</g, "\\u003c")}</script>`;
  html = html.replace("<!--ssr-state-->", stateScript);

  // 6. Write the final pre-rendered index.html
  writeFileSync(templatePath, html, "utf-8");
  console.log("  ✅ dist/client/index.html — pre-rendered with full SSR content");

  // 7. Create 404.html (copy of index.html for SPA routing on GitHub Pages)
  const notFoundPath = resolve(clientDir, "404.html");
  writeFileSync(notFoundPath, html, "utf-8");
  console.log("  ✅ dist/client/404.html — SPA fallback for client-side routing");

  // 8. Copy CNAME if it exists (for GitHub Pages custom domain)
  const cnameSrc = resolve(ROOT, "CNAME");
  if (existsSync(cnameSrc)) {
    copyFileSync(cnameSrc, resolve(clientDir, "CNAME"));
    console.log("  ✅ dist/client/CNAME — custom domain preserved");
  }

  console.log("\n🎉 Pre-render complete! Deploy dist/client/ to GitHub Pages.");
}

prerender().catch((err) => {
  console.error("❌ Pre-render failed:", err);
  process.exit(1);
});
