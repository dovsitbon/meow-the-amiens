// Trie les visuels Instagram (assets/raw/) dans assets/<catégorie>/ avec des noms lisibles,
// puis les prépare pour le web dans public/media/<catégorie>/ (next/image sert ensuite AVIF/WebP à la bonne taille).
//   npm run media
//
// Écartées : 01 (influenceuse, texte incrusté), 02 (affiche texte, même boisson que 16), 03 (affiche « Top 5 »),
// 06 (annonce texte), 07 (couverture 720 px, texte), 08 (annonce « ouvert dimanche »), 28 (logo en double),
// 04 (texte « Merry Christmas » : gardée en réserve), 10 et 18 (couvertures 720 px, doublons de 11 et du matcha).
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = readdirSync(path.join(ROOT, "assets/raw"));
const raw = (n) => {
  const f = RAW.find((x) => x.startsWith(`meow-the_${n}`));
  if (!f) throw new Error(`introuvable : ${n}`);
  return path.join(ROOT, "assets/raw", f);
};

// [n° Instagram, catégorie, nom, recadrage { left, top, width, height } en fraction de l'image]
const PICKS = [
  ["19", "hero", "brown-sugar-boba"],
  ["23", "boissons", "brown-sugar-comptoir"],
  ["14", "boissons", "brown-sugar-versage", { left: 0, top: 0.55, width: 1, height: 0.45 }],
  ["17", "boissons", "creme-brulee-serie", { left: 0, top: 0.25, width: 1, height: 0.75 }],
  ["20", "boissons", "oreo-cheese", { left: 0, top: 0.24, width: 1, height: 0.76 }],
  ["22", "boissons", "the-au-lait-chat"],
  ["13", "boissons", "matcha-fraise"],
  ["16", "boissons", "the-pasteque"],
  ["21", "boissons", "trio-fruits-lait"],
  ["26", "boissons", "trio-plateau"],
  ["09", "nouveautes", "nuage-oreo-jasmin"],
  ["05", "nouveautes", "lait-marron-chantilly", { left: 0.075, top: 0.36, width: 0.535, height: 0.64 }],
  ["12", "desserts", "pudding-sakura"],
  ["11", "desserts", "pudding-matcha"],
  ["15", "desserts", "mochis-soda", { left: 0, top: 0.2, width: 1, height: 0.8 }],
  ["24", "boutique", "nono-enseigne"],
  ["25", "boutique", "comptoir"],
  ["27", "boutique", "chats-en-bois"],
];

const sizes = {};
for (const [n, cat, name, crop] of PICKS) {
  const file = raw(n);
  await mkdir(path.join(ROOT, "assets", cat), { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  await copyFile(file, path.join(ROOT, "assets", cat, `${name}.jpg`));
  let pipe = sharp(file).rotate();
  if (crop) {
    const m = await sharp(file).metadata();
    pipe = pipe.extract({
      left: Math.round(crop.left * m.width),
      top: Math.round(crop.top * m.height),
      width: Math.round(crop.width * m.width),
      height: Math.round(crop.height * m.height),
    });
  }
  const max = cat === "hero" ? 1800 : 1400;
  const info = await pipe
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
  sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
}

// Galerie : copies de sélection (même fichiers web)
await mkdir(path.join(ROOT, "assets/galerie"), { recursive: true });
for (const n of ["22", "17", "13", "15", "20", "26", "24", "21", "09"]) await copyFile(raw(n), path.join(ROOT, "assets/galerie", path.basename(raw(n))));

// Image de partage 1200 × 630
await sharp(raw("21")).resize(1200, 630, { fit: "cover", position: "centre" }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${PICKS.length} images prêtes`);
