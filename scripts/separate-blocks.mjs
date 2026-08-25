// Colour-separates a flat four-ink woodblock illustration into per-ink layers
// (red / navy / brass / keyblock) so the site can "print" it block by block.
//
//   node scripts/separate-blocks.mjs <input.png> <outDir> <baseName> [maxWidth]
//
// Each pixel is assigned to the nearest ink (or paper), then each ink is written
// as its own palette PNG filled with the exact brand colour, plus a
// composite for fallbacks. Paper pixels become transparent everywhere.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [input, outDir, base, maxWidthArg] = process.argv.slice(2);
if (!input || !outDir || !base) {
  console.error('usage: separate-blocks.mjs <input> <outDir> <baseName> [maxWidth]');
  process.exit(1);
}
const maxWidth = Number(maxWidthArg || 1800);

const INKS = {
  red: [200, 16, 46],
  navy: [10, 49, 97],
  brass: [184, 149, 42],
  key: [17, 17, 17],
};
const PAPER = [255, 255, 255];

const src = sharp(input).resize({ width: maxWidth, withoutEnlargement: true });
const { data, info } = await src.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const n = width * height;

// Perceptual-ish distance with a bias so light pixels go to paper and
// anti-aliased dark edges go to the keyblock (keeps lines crisp).
function nearest(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum > 225) return 'paper';
  let best = 'paper';
  let bestD = dist([r, g, b], PAPER) * 1.15;
  for (const [name, c] of Object.entries(INKS)) {
    let d = dist([r, g, b], c);
    if (name === 'key') d *= 0.9; // favour the keyblock on dark edge pixels
    if (d < bestD) {
      bestD = d;
      best = name;
    }
  }
  return best;
}
function dist(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr * 0.3 + dg * dg * 0.59 + db * db * 0.11;
}

const layers = Object.fromEntries(
  Object.keys(INKS).map((k) => [k, Buffer.alloc(n * 4, 0)]),
);
const composite = Buffer.alloc(n * 4, 0);
const counts = { paper: 0, red: 0, navy: 0, brass: 0, key: 0 };

for (let i = 0; i < n; i++) {
  const o = i * 4;
  const cls = nearest(data[o], data[o + 1], data[o + 2]);
  counts[cls]++;
  if (cls === 'paper') continue;
  const c = INKS[cls];
  const L = layers[cls];
  L[o] = c[0];
  L[o + 1] = c[1];
  L[o + 2] = c[2];
  L[o + 3] = 255;
  composite[o] = c[0];
  composite[o + 1] = c[1];
  composite[o + 2] = c[2];
  composite[o + 3] = 255;
}

mkdirSync(outDir, { recursive: true });
const write = async (buf, name) => {
  const img = sharp(buf, { raw: { width, height, channels: 4 } });
  await img.clone().png({ compressionLevel: 9, palette: true }).toFile(join(outDir, `${name}.png`));
};
for (const [k, buf] of Object.entries(layers)) await write(buf, `${base}-${k}`);
await write(composite, `${base}-composite`);

console.log(JSON.stringify({ width, height, counts }, null, 0));
