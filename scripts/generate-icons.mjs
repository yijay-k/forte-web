/**
 * Renders the app icons from the Forte mark.
 *
 *   node scripts/generate-icons.mjs
 *
 * The mark is three rising bars — quiet, loud, mid — and its geometry is the
 * same one `components/brand/forte-mark.tsx` draws: bars 4 wide with 3 between
 * them, heights 11 / 22 / 15, sitting on a shared baseline. Keeping the numbers
 * here in the same ratios means the favicon and the in-app logo cannot drift.
 *
 * Output is committed, so this only needs re-running when the mark changes.
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..", "app");

const INK = "#161513";
const PAPER = "#FDFBEA";

// Ratios lifted straight from the component.
const BAR_W = 4;
const GAP = 3;
const HEIGHTS = [11, 22, 15];
const MARK_W = BAR_W * 3 + GAP * 2; // 18
const MARK_H = Math.max(...HEIGHTS); // 22

/**
 * @param size    canvas edge in px
 * @param scale   mark height as a fraction of the canvas
 */
function markSvg(size, scale = 0.47) {
  const h = size * scale;
  const k = h / MARK_H;
  const w = MARK_W * k;
  const x0 = (size - w) / 2;
  const baseline = (size + h) / 2;
  const barW = BAR_W * k;
  const r = barW / 2; // `rounded-hair` on a 4px bar is a full cap

  const bars = HEIGHTS.map((bh, i) => {
    const x = x0 + i * (barW + GAP * k);
    const barH = bh * k;
    return `<rect x="${x.toFixed(2)}" y="${(baseline - barH).toFixed(2)}" width="${barW.toFixed(2)}" height="${barH.toFixed(2)}" rx="${r.toFixed(2)}" fill="${INK}"/>`;
  }).join("");

  // Heavier than the app's 1.5px card border, deliberately. A browser scales
  // this file down to 16px for the tab strip, and a proportionally-correct
  // hairline disappears entirely at that size — taking the card shape, which is
  // the recognisable part of the brand, with it.
  const stroke = size * 0.016;
  const radius = size * 0.22;
  const inset = stroke / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect x="${inset}" y="${inset}" width="${size - stroke}" height="${size - stroke}" rx="${radius}" fill="${PAPER}" stroke="${INK}" stroke-width="${stroke}"/>
  ${bars}
</svg>`;
}

const targets = [
  { file: "icon.png", size: 512 },
  { file: "apple-icon.png", size: 180 },
];

for (const { file, size } of targets) {
  const png = await sharp(Buffer.from(markSvg(size))).png().toBuffer();
  writeFileSync(join(APP, file), png);
  console.log(`wrote app/${file}  ${size}x${size}  ${png.length} bytes`);
}
