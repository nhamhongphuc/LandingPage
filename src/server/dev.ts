import { createServer } from "http";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "../..");

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

/**
 * Development SSR server.
 *
 * Uses a plain Node.js HTTP server + Vite dev middleware.
 * Vite handles: HMR websocket, module transforms, static files from public/.
 * For non-asset requests (HTML pages), we do SSR with React.
 */
async function startDevServer() {
  // 1. Create Vite dev server in middleware mode
  const vite = await createViteServer({
    root: ROOT,
    server: { middlewareMode: true },
    appType: "custom",
  });

  // 2. Create a plain Node.js HTTP server
  const server = createServer((req, res) => {
    // Let Vite middleware handle the request first
    // (static files, HMR, module requests like /@vite/client, /src/*.tsx, etc.)
    vite.middlewares(req, res, async () => {
      // If Vite didn't handle it, it's an SSR page request
      const url = req.url || "/";

      try {
        // Read & transform the HTML template
        let template = readFileSync(resolve(ROOT, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);

        // Load the SSR entry module (Vite transforms + HMR-aware)
        const { render, renderHeadTags } = await vite.ssrLoadModule("/src/entry-server.tsx");

        // Load site data (HMR-aware)
        const { defaultMeta } = await vite.ssrLoadModule(
          "/src/utils/siteData.ts"
        );

        // Build the preloaded state
        const preloadedState = {
          meta: defaultMeta,
          timestamp: Date.now(),
        };

        // Render the React app to HTML
        const appHtml = render(url, preloadedState);

        // Generate proper <head> meta tags
        const headTags = renderHeadTags(defaultMeta);

        // Inject SSR content + head tags + state into the template
        let html = template.replace("<!--ssr-head-->", headTags);
        html = html.replace("<!--ssr-outlet-->", appHtml);

        const stateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
          preloadedState
        ).replace(/</g, "\\u003c")}</script>`;
        html = html.replace("<!--ssr-state-->", stateScript);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      } catch (error) {
        // Let Vite fix SSR stack traces
        if (error instanceof Error) {
          vite.ssrFixStacktrace(error);
          console.error(error.stack);
        }
        res.writeHead(500);
        res.end("Internal Server Error");
      }
    });
  });

  server.listen(PORT, HOST, () => {
    console.log(`🚀 Dev SSR server running at http://localhost:${PORT}`);
  });
}

startDevServer();
