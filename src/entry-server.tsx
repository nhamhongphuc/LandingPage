import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "@/App";
import type { PageMeta, PreloadedState } from "@/types";

// Re-export siteData so the prerender script can access it from this bundle
export { defaultMeta } from "@/utils/siteData";

/**
 * Generate proper HTML <head> tags from PageMeta.
 * These are injected into the <!--ssr-head--> placeholder in index.html
 * so they appear in the real <head> for SEO crawlers.
 */
export function renderHeadTags(meta: PageMeta): string {
  const tags: string[] = [];

  // Core SEO
  tags.push(`<title>${escapeHtml(meta.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeAttr(meta.description)}" />`);
  if (meta.keywords) tags.push(`<meta name="keywords" content="${escapeAttr(meta.keywords)}" />`);
  tags.push(`<meta name="author" content="Thành Tín" />`);
  tags.push(`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`);

  // Canonical — always emit (critical for dedup)
  const canonicalUrl = meta.canonical || meta.ogUrl || "";
  if (canonicalUrl) tags.push(`<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`);

  // Open Graph
  tags.push(`<meta property="og:type" content="website" />`);
  tags.push(`<meta property="og:site_name" content="Thành Tín" />`);
  tags.push(`<meta property="og:locale" content="vi_VN" />`);
  if (meta.ogTitle) tags.push(`<meta property="og:title" content="${escapeAttr(meta.ogTitle)}" />`);
  if (meta.ogDescription) tags.push(`<meta property="og:description" content="${escapeAttr(meta.ogDescription)}" />`);
  if (meta.ogUrl) tags.push(`<meta property="og:url" content="${escapeAttr(meta.ogUrl)}" />`);
  if (meta.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeAttr(meta.ogImage)}" />`);
    tags.push(`<meta property="og:image:width" content="1200" />`);
    tags.push(`<meta property="og:image:height" content="630" />`);
    tags.push(`<meta property="og:image:alt" content="${escapeAttr(meta.ogTitle || meta.title)}" />`);
  }

  // Twitter Card
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (meta.ogTitle) tags.push(`<meta name="twitter:title" content="${escapeAttr(meta.ogTitle)}" />`);
  if (meta.ogDescription) tags.push(`<meta name="twitter:description" content="${escapeAttr(meta.ogDescription)}" />`);
  if (meta.ogImage) tags.push(`<meta name="twitter:image" content="${escapeAttr(meta.ogImage)}" />`);

  return tags.join("\n    ");
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Server entry point.
 *
 * Called by the Fastify SSR handler (or the prerender script) to render
 * the full React app to an HTML string for any given URL.
 *
 * @param url            - The request URL path (e.g. "/")
 * @param preloadedState - Data fetched on the server to pass to components
 * @returns              - The rendered HTML string of the React tree
 */
export function render(url: string, preloadedState: PreloadedState): string {
  return renderToString(
    <StaticRouter location={url}>
      <App preloadedState={preloadedState} />
    </StaticRouter>
  );
}
