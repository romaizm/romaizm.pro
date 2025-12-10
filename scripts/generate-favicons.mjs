import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// PNG version for apple-touch-icon (180x180)
const svg180 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <defs>
    <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4"/>
      <stop offset="100%" style="stop-color:#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" rx="36" fill="#0a0a0a"/>
  <text x="24" y="130" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="112" font-weight="700" fill="#ffffff">R</text>
  <circle cx="135" cy="112" r="22" fill="url(#dotGradient)"/>
</svg>`;

// Generate apple-touch-icon.png (180x180)
await sharp(Buffer.from(svg180))
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'));

console.log('Created apple-touch-icon.png');

// PNG version for favicon.ico (48x48)
const svg48 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <defs>
    <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4"/>
      <stop offset="100%" style="stop-color:#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="48" height="48" rx="8" fill="#0a0a0a"/>
  <text x="6" y="35" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="30" font-weight="700" fill="#ffffff">R</text>
  <circle cx="36" cy="30" r="6" fill="url(#dotGradient)"/>
</svg>`;

// Generate favicon as PNG first, then we'll use it as ico
await sharp(Buffer.from(svg48))
  .resize(48, 48)
  .png()
  .toFile(join(publicDir, 'favicon.png'));

console.log('Created favicon.png');

// For favicon.ico, we'll create multiple sizes
const sizes = [16, 32, 48];
const buffers = [];

for (const size of sizes) {
  const svgScaled = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#06b6d4"/>
        <stop offset="100%" style="stop-color:#ec4899"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${Math.round(size/5)}" fill="#0a0a0a"/>
    <text x="${Math.round(size*0.125)}" y="${Math.round(size*0.73)}" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="${Math.round(size*0.625)}" font-weight="700" fill="#ffffff">R</text>
    <circle cx="${Math.round(size*0.75)}" cy="${Math.round(size*0.625)}" r="${Math.round(size*0.125)}" fill="url(#dotGradient)"/>
  </svg>`;

  const buffer = await sharp(Buffer.from(svgScaled))
    .resize(size, size)
    .png()
    .toBuffer();
  buffers.push({ size, buffer });
}

// Create ICO file manually (simplified - just use 32x32 PNG renamed to ico for now)
// Modern browsers prefer SVG anyway
const ico32 = await sharp(Buffer.from(svg48))
  .resize(32, 32)
  .png()
  .toBuffer();

// Write as favicon.ico (browsers will handle PNG in ICO container)
writeFileSync(join(publicDir, 'favicon.ico'), ico32);

console.log('Created favicon.ico (32x32 PNG)');
console.log('Done! Favicon files generated.');
