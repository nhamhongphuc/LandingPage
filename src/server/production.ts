import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyCompress from "@fastify/compress";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

/**
 * Production-only SSR server.
 * This file is the entry point when running `npm start` after `npm run build`.
 * It does NOT include Vite dev server logic.
 */
async function startProductionServer() {
  const app = Fastify({ logger: true });

  // Gzip + Brotli compression
  await app.register(fastifyCompress, {
    global: true,
    encodings: ["br", "gzip", "deflate"],
  });

  // Serve built client assets (JS, CSS, images)
  await app.register(fastifyStatic, {
    root: resolve(__dirname, "../client"),
    prefix: "/",
    decorateReply: true,
  });

  // Also serve public/ assets (logos, robots.txt, sitemap, etc.)
  await app.register(fastifyStatic, {
    root: resolve(__dirname, "../../public"),
    prefix: "/",
    decorateReply: false,
  });

  // Read the pre-built HTML template once at startup
  const template = readFileSync(
    resolve(__dirname, "../client/index.html"),
    "utf-8"
  );

  // Import the pre-built SSR render function
  // @ts-ignore — this module only exists after `npm run build`
  const { render, renderHeadTags } = await import("./entry-server.js");
  const { defaultMeta } = await import("../utils/siteData.js" as string);

  // SSR catch-all route
  app.get("*", async (request, reply) => {
    try {
      const preloadedState = {
        meta: defaultMeta,
        timestamp: Date.now(),
      };

      const appHtml = render(request.url, preloadedState);
      const headTags = renderHeadTags(defaultMeta);

      let html = template.replace("<!--ssr-head-->", headTags);
      html = html.replace("<!--ssr-outlet-->", appHtml);

      const stateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
        preloadedState
      ).replace(/</g, "\\u003c")}</script>`;
      html = html.replace("<!--ssr-state-->", stateScript);

      reply.status(200).header("Content-Type", "text/html").send(html);
    } catch (error) {
      app.log.error(error);
      reply.status(500).send("Internal Server Error");
    }
  });

  await app.listen({ port: PORT, host: HOST });
  app.log.info(`🚀 Production SSR server at http://localhost:${PORT}`);
}

startProductionServer();
