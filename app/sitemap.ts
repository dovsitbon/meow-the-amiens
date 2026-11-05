import type { MetadataRoute } from "next";
import site from "@/data/site.json";
import { defaultLocale, locales, PAGES } from "@/lib/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.filter((p) => p !== "/mentions-legales").flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? (lang === defaultLocale ? 1 : 0.8) : lang === defaultLocale ? 0.9 : 0.7,
      alternates: { languages: { ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])), "x-default": `${site.url}/${defaultLocale}${path}` } },
    })),
  );
}
