import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('./dmacht-social-source.svg', import.meta.url));
const output = fileURLToPath(new URL('../public/brand/dmacht-social.png', import.meta.url));
await sharp(source, { density: 144 }).resize(1200, 630).png({ compressionLevel: 9 }).toFile(output);
const { width, height } = await sharp(output).metadata();
if (width !== 1200 || height !== 630) throw new Error('Unexpected social image dimensions');
console.log(`Created ${output}: ${width} × ${height}`);
