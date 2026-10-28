// Renders the raster brand assets from their SVG/HTML sources with the local
// Chrome (playwright-core, no bundled browser):
//   src/app/icon.svg      -> public/apple-touch-icon.png (180), public/icon-512.png
//   scripts/brand/og.html -> public/opengraph-image.png (1200×630)
// Run: node scripts/render-brand-assets.mjs
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const at = (...parts) => path.join(root, ...parts);

const browser = await chromium.launch({ channel: 'chrome', headless: true });

async function render(url, out, width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: out, omitBackground: true });
  await page.close();
  console.log(`rendered ${path.relative(root, out)} (${width}×${height})`);
}

// The SVG has no width/height, so opened directly it fills the viewport.
const icon = `file://${at('src/app/icon.svg')}`;
await render(icon, at('public/apple-touch-icon.png'), 180, 180);
await render(icon, at('public/icon-512.png'), 512, 512);
await render(`file://${at('scripts/brand/og.html')}`, at('public/opengraph-image.png'), 1200, 630);

await browser.close();
