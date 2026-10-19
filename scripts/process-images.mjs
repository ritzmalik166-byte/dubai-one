import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const src = process.argv[2];
const out = path.resolve('public/images');
await mkdir(out, { recursive: true });

for (const file of await readdir(src)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = file.replace(/\.(jpe?g|png)$/i, '');
  await sharp(path.join(src, file))
    .resize({ width: 2200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(out, `${name}.webp`));
  console.log('ok', name);
}
