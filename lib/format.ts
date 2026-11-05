import site from "@/data/site.json";
import { intlLocale, type Locale } from "@/lib/locales";

export const euro = (n: number, lang: Locale) =>
  new Intl.NumberFormat(intlLocale[lang], { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(n);

export const waLink = (text?: string) => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const telLink = `tel:${site.phoneIntl.replace(/\s/g, "")}`;

export function formatDay(iso: string, lang: Locale, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale[lang], { ...opts, timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d || 1)));
}

export const rating = (lang: Locale) => site.rating.value.toLocaleString(intlLocale[lang], { minimumFractionDigits: 1 });
