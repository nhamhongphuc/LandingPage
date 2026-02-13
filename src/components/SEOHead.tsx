import type { PageMeta } from "@/types";

interface SEOHeadProps {
  meta: PageMeta;
}

/**
 * SEOHead — renders <title> and <meta> tags inside <head> using
 * React 18's native support for hoisting <title>/<meta> to <head>.
 *
 * For SSR, these are rendered into the HTML string directly.
 * For CSR hydration, React will reconcile them.
 */
export default function SEOHead({ meta }: SEOHeadProps) {
  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      <meta name="author" content="Thành Tín" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {meta.ogTitle && <meta property="og:title" content={meta.ogTitle} />}
      {meta.ogDescription && (
        <meta property="og:description" content={meta.ogDescription} />
      )}
      {meta.ogUrl && <meta property="og:url" content={meta.ogUrl} />}
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {meta.ogTitle && <meta name="twitter:title" content={meta.ogTitle} />}
      {meta.ogDescription && (
        <meta name="twitter:description" content={meta.ogDescription} />
      )}

      {/* Canonical */}
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}
    </>
  );
}
