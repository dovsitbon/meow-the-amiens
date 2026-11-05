// Affichette A5 imprimable pour la boutique, avec QR code vers le site.
//   node scripts/affichette.mjs  → print/affichette-a5.html, puis impression PDF (Edge/Chrome headless) → print/affichette-a5.pdf
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import QRCode from "qrcode";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(readFileSync(path.join(ROOT, "data/site.json"), "utf8"));
const url = `${site.url}/fr`;
const qr = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#241c17", light: "#0000" } });
const font = (f) => pathToFileURL(path.join(ROOT, "app/fonts", f)).href;
const photo = pathToFileURL(path.join(ROOT, "public/media/hero/brown-sugar-boba.jpg")).href;

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Meow Thé – affichette A5</title>
<style>
@font-face{font-family:Fredoka;src:url(${font("fredoka-latin-wght-normal.woff2")});font-weight:300 700}
@font-face{font-family:Nunito;src:url(${font("nunito-latin-wght-normal.woff2")});font-weight:200 1000}
@page{size:A5;margin:0}
*{box-sizing:border-box;margin:0}
html,body{width:148mm;height:210mm;background:#f6ede1;color:#241c17;font-family:Nunito,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:148mm;height:210mm;padding:11mm 11mm 9mm;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:3mm}
.top svg{width:13mm;height:13mm}
.word{font-family:Fredoka;font-weight:600;font-size:9mm;line-height:1}
.photo{margin-top:7mm;height:66mm;border-radius:7mm;overflow:hidden}
.photo img{width:100%;height:100%;object-fit:cover;object-position:50% 88%}
h1{font-family:Fredoka;font-weight:600;font-size:11mm;line-height:1.02;margin-top:7mm;letter-spacing:-.01em}
.lead{font-size:4.1mm;line-height:1.45;margin-top:3mm;color:#54473d}
.qrrow{display:flex;gap:6mm;align-items:center;margin-top:auto;background:#fffaf3;border-radius:6mm;padding:5mm}
.qr{width:34mm;height:34mm;flex:none}
.qr svg{width:100%;height:100%}
.qrrow strong{font-family:Fredoka;font-weight:600;font-size:6mm;display:block;line-height:1.1}
.qrrow p{font-size:3.6mm;line-height:1.45;margin-top:1.5mm;color:#54473d}
.url{font-weight:800;color:#241c17!important}
.foot{display:flex;justify-content:space-between;margin-top:5mm;font-size:3.3mm;line-height:1.4}
.foot b{font-weight:800}
</style></head><body><div class="page">
<div class="top">
<svg viewBox="0 0 64 64" fill="none" stroke="#241c17" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M32 3a29 29 0 1 1 0 58a29 29 0 1 1 0-58"/><path d="M22 22 24.5 13 29 17.5M35 17.5 39.5 13 42 22M22 31V22M29 17.5h6M42 22v9M21 31h22l-3.4 21q-.3 2-2.3 2H26.7q-2 0-2.3-2Z"/><path d="M22.8 40q2.5-2 5 0t5 0t5 0t3.9 0"/><path d="M30.5 26.6q1.5 1.6 3 0" stroke-width="1.8"/><circle cx="28" cy="24" r="1.3" fill="#241c17" stroke="none"/><circle cx="36" cy="24" r="1.3" fill="#241c17" stroke="none"/></svg>
<span class="word">meöw thé</span>
</div>
<div class="photo"><img src="${photo}" alt=""></div>
<h1>Notre site est en ligne&nbsp;!</h1>
<p class="lead">La carte et les prix, les nouveautés, et votre bubble tea à composer puis à commander à emporter sur WhatsApp.</p>
<div class="qrrow">
<div class="qr">${qr}</div>
<div><strong>Scannez, choisissez, venez le chercher.</strong><p>Commandes groupées pour les anniversaires et le bureau.<br><span class="url">${url.replace("https://", "")}</span></p></div>
</div>
<div class="foot"><div><b>1 rue de Beauvais, Amiens</b><br>06 67 10 75 30 · ${site.instagramHandle}</div><div style="text-align:right"><b>Mar.–sam. 12 h – 19 h 45</b><br>Dim. 13 h – 18 h 45 · fermé lundi</div></div>
</div></body></html>`;

mkdirSync(path.join(ROOT, "print"), { recursive: true });
writeFileSync(path.join(ROOT, "print/affichette-a5.html"), html);
console.log("print/affichette-a5.html →", url);
