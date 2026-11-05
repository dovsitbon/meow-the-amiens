// Génère CONTENU.md (tous les textes FR / EN + la carte) pour validation par Meow Thé.
//   npm run contenu
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = (p) => JSON.parse(readFileSync(path.join(ROOT, p), "utf8"));
const fr = read("locales/fr.json");
const en = read("locales/en.json");
const carte = read("data/carte.json");
const news = read("data/nouveautes.json");
const annonces = read("data/annonces.json");
const horaires = read("data/horaires.json");

const out = [];
const h = (n, t) => out.push(`\n${"#".repeat(n)} ${t}\n`);
const row = (label, a, b) => out.push(`| ${label} | ${String(a).replace(/\n/g, " ").replace(/\|/g, "/")} | ${String(b).replace(/\n/g, " ").replace(/\|/g, "/")} |`);
const table = () => out.push("| Clé | Français | English |", "|---|---|---|");
const price = (p) => (p === null ? "à remplir" : `${p.toFixed(2).replace(".", ",")} €`);

out.push("# Meow Thé – contenu du site (à valider)");
out.push("\nTous les textes du site en français et en anglais, puis la carte. Les textes viennent de `locales/fr.json` et `locales/en.json`, la carte de `data/carte.json` : corrigez ici, on reporte. Fichier régénéré par `npm run contenu`.");
out.push("\n**À valider en priorité :** les prix (relevés sur Uber Eats le 5 novembre 2026, peut-être différents en boutique), les prix « à remplir », le vouvoiement, la mention de Nono le chat, et l'acceptation des précommandes WhatsApp.");

function walk(prefix, a, b) {
  if (typeof a === "string") return row(prefix, a, b ?? "");
  if (Array.isArray(a)) return a.forEach((x, i) => walk(`${prefix}[${i + 1}]`, x, b?.[i]));
  for (const k of Object.keys(a)) walk(prefix ? `${prefix}.${k}` : k, a[k], b?.[k]);
}

h(2, "1. Textes du site");
for (const section of Object.keys(fr)) {
  if (section === "a11y") continue;
  h(3, section);
  table();
  walk("", fr[section], en[section]);
}

h(2, "2. Bandeau d'infos (data/annonces.json)");
table();
for (const a of annonces.items) row(`${a.id} (${a.from ?? "…"} → ${a.to ?? "…"})`, a.fr, a.en);

h(2, "3. Nouveautés du moment (data/nouveautes.json)");
out.push("| Boisson | Prix | Jusqu'au | Français | English |", "|---|---|---|---|---|");
for (const n of news.items) out.push(`| ${n.fr.name} / ${n.en.name} | ${price(n.price)} | ${n.until ?? "—"} | ${n.fr.desc} | ${n.en.desc} |`);

h(2, "4. Horaires (data/horaires.json)");
const days = fr.days;
for (const d of [1, 2, 3, 4, 5, 6, 0]) {
  const s = horaires.week.find((x) => x.day === d);
  out.push(`- ${days[d]} : ${s.open ? `${s.open} – ${s.close}` : "fermé"}`);
}

h(2, "5. La carte (data/carte.json)");
out.push(`Source : ${carte.source}. Prix « à remplir » = prix inconnu, affiché « Prix en boutique » sur le site.`);
for (const f of carte.families) {
  h(3, `${f.fr.name} / ${f.en.name}`);
  out.push(`${f.fr.short} — ${f.fr.note}\n`);
  out.push("| Boisson | Prix | Description FR | Description EN |", "|---|---|---|---|");
  for (const i of f.items) out.push(`| ${i.fr.name}${i.en.name !== i.fr.name ? ` / ${i.en.name}` : ""}${i.popular ? " ★" : ""} | ${price(i.price)} | ${i.fr.desc} | ${i.en.desc} |`);
}
h(3, "Toppings");
out.push(carte.toppings.map((t) => `- ${t.fr} / ${t.en} : ${price(t.price)}`).join("\n"));
out.push("\n★ = mis en avant dans « Les préférées d'Amiens » (les plus commandées sur Uber Eats).");

writeFileSync(path.join(ROOT, "CONTENU.md"), out.join("\n") + "\n");
console.log("CONTENU.md écrit");
