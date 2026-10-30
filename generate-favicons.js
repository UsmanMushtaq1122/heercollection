const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_IMAGE = 'C:/Users/BHULLAR BROTHER\'s/.gemini/antigravity/brain/682948b2-33be-4ee9-818c-afeb65167e2d/.user_uploaded/media_1793375977818_ba19b1f9.png';
const APP_DIR = path.join(__dirname, 'src', 'app');
const PUBLIC_DIR = path.join(__dirname, 'public');

/**
 * Builds a standard Windows/Browser ICO container from raw PNG buffers.
 * Each entry: { width, height, buffer }
 */
function buildIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4); // count

  const dirEntrySize = 16;
  const dirSize = dirEntrySize * pngBuffers.length;
  let currentOffset = 6 + dirSize;

  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color palette (0 for truecolor/PNG)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset
    entries.push(entry);
    currentOffset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(b => b.buffer)]);
}

async function renderPng(size, sharpen = false) {
  let pipeline = sharp(SOURCE_IMAGE).resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    kernel: sharp.kernel.lanczos3,
  });

  if (sharpen) {
    pipeline = pipeline.sharpen({ sigma: 0.8, m1: 0.7, m2: 2.0 });
  }

  return await pipeline.png().toBuffer();
}

async function main() {
  console.log('Generating favicon assets from source logo...');

  // 1. Generate PNG sizes
  const [png16, png32, png48, png180, png192, png512] = await Promise.all([
    renderPng(16, true),
    renderPng(32, true),
    renderPng(48, true),
    renderPng(180, false),
    renderPng(192, false),
    renderPng(512, false),
  ]);

  // 2. Generate multi-resolution ICO (16, 32, 48)
  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  // 3. Write ICO files
  fs.writeFileSync(path.join(APP_DIR, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
  console.log('✓ Created src/app/favicon.ico and public/favicon.ico');

  // 4. Write Next.js App Router file-based metadata assets
  fs.writeFileSync(path.join(APP_DIR, 'icon.png'), png512);
  fs.writeFileSync(path.join(APP_DIR, 'apple-icon.png'), png180);
  console.log('✓ Created src/app/icon.png (512x512) and src/app/apple-icon.png (180x180)');

  // 5. Write static assets in public/
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.png'), png48);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-48x48.png'), png48);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon.png'), png512);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-512.png'), png512);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), png180);
  console.log('✓ Created public static favicon assets (favicon.png, icon.png, apple-touch-icon.png, etc.)');

  // 6. Write site.webmanifest
  const manifest = {
    name: 'Heer Collection',
    short_name: 'Heer Collection',
    description: "Discover exquisite luxury women's fashion at Heer Collection.",
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F5F2',
    theme_color: '#111111',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
  fs.writeFileSync(path.join(PUBLIC_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('✓ Created public/site.webmanifest');
}

main().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});

