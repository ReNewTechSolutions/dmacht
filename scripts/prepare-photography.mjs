import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

// Usage: node scripts/prepare-photography.mjs /path/to/approved-collage.png
// Approved reference crops deliberately exclude captions and questionable equipment logos.
const reference = process.argv[2];
if (!reference) throw new Error('Provide the approved photographic collage path');
const output = resolve('public/brand/photography');
await mkdir(output, { recursive: true });
const crops = [
  ['dee-service', reference, { left: 74, top: 0, width: 842, height: 455 }],
  ['pcb-repair', reference, { left: 0, top: 463, width: 409, height: 196 }],
  ['printhead-nozzle', reference, { left: 420, top: 463, width: 368, height: 196 }],
  ['ink-fluids', reference, { left: 800, top: 463, width: 367, height: 196 }],
  ['spare-parts', reference, { left: 1180, top: 463, width: 356, height: 196 }],
  ['bottle-coding', reference, { left: 1041, top: 716, width: 495, height: 252 }],
  ['diagnostics', 'public/brand/pcb-workbench-v2.png', { left: 0, top: 0, width: 1090, height: 1024 }],
  ['pumps-filters', 'public/brand/parts-bench-v2.png', { left: 0, top: 450, width: 820, height: 574 }],
  ['electronics-controls', 'public/brand/parts-bench-v2.png', { left: 820, top: 444, width: 376, height: 355 }],
  ['parts-bench', 'public/brand/parts-bench-v2.png'],
  ['dee-hero', 'public/brand/dee-hero-v3.png'],
];
for (const [name, source, crop] of crops) {
  let image = sharp(source);
  if (crop) image = image.extract(crop);
  const result = await image.resize({ width: name === 'dee-hero' ? 1600 : 1200, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`${output}/${name}.webp`);
  console.log(`${name}: ${result.width} × ${result.height}, ${Math.round(result.size / 1024)} KB`);
}
