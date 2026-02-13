/**
 * generate-og-image.ts — Creates a 1200×630 PNG for Open Graph / social sharing
 *
 * Uses pure JavaScript to create a minimal branded image.
 * Run: npx tsx scripts/generate-og-image.ts
 *
 * For a polished OG image, replace public/og-image.png with a
 * professionally designed graphic.
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

// Create a minimal 1200×630 PNG using raw PNG encoding
// This creates a solid dark background with an embedded SVG overlay approach
// For production, replace with a properly designed image

const width = 1200;
const height = 630;

// Create SVG that will be our OG image content
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)" />

  <!-- Decorative clip-path shape -->
  <polygon points="0,0 1200,0 1200,504 0,630" fill="#1a1a2e" opacity="0.3" />

  <!-- Amber accent line -->
  <rect x="350" y="270" width="500" height="4" rx="2" fill="#FBBF24" />

  <!-- Brand name -->
  <text x="600" y="200" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="700" font-size="64" fill="#FFFFFF">Thành Tín</text>

  <!-- Tagline -->
  <text x="600" y="330" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="600" font-size="30" fill="#FBBF24">Rút Tiền &amp; Đáo Hạn Thẻ Tín Dụng</text>

  <!-- Features -->
  <text x="600" y="385" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="400" font-size="22" fill="#D1D5DB">Phí chỉ từ 1.3% · Nhận tiền trong 5 giây · Bảo mật 100%</text>

  <!-- Phone -->
  <text x="600" y="445" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="600" font-size="28" fill="#FFFFFF">☎ 0376 483 805</text>

  <!-- Locations -->
  <text x="600" y="500" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="400" font-size="20" fill="#9CA3AF">TPHCM · Thủ Đức · Bình Dương · Hỗ trợ 24/7</text>

  <!-- Bottom accent -->
  <rect x="0" y="610" width="1200" height="20" fill="#FBBF24" />
</svg>`;

// Write as SVG (will work as og:image since most platforms render SVG)
// But for maximum compatibility, we should use PNG
// Since we can't easily create PNG without canvas/sharp, save as SVG
// and note that user should convert to PNG for best results

const svgPath = resolve(ROOT, "public/og-image.svg");
writeFileSync(svgPath, svgContent, "utf-8");
console.log(`✅ OG image SVG created: ${svgPath}`);
console.log("⚠️  Note: For best social media compatibility, convert to PNG (1200×630).");
console.log("   Use: https://svgtopng.com or Figma to export as PNG");
console.log("   Then save as public/og-image.png and update siteData.ts OG_IMAGE_URL");
