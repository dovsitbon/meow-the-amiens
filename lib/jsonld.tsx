import type { Metadata } from "next";
import site from "@/data/site.json";
import { week } from "@/lib/hours";
import { families } from "@/lib/carte";
import { getDict, locales, ogLocale, defaultLocale, type Locale, type PagePath } from "@/lib/i18n";

/** Métadonnées d'une page : titre, description, canonique, hreflang, Open Graph. */
export function pageMeta(lang: Locale, path: PagePath, title: string, description: string): Metadata {
  const url = `/${lang}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])), "x-default": `/${defaultLocale}${path}` },
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: getDict(lang).meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Fiche établissement (CafeOrCoffeeShop) : adresse, horaires, note Google datée, carte. */
export function businessJsonLd(lang: Locale) {
  const d = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@type": ["CafeOrCoffeeShop", "FoodEstablishment"],
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.nameStyled,
    description: d.meta.homeDesc,
    url: `${site.url}/${lang}`,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/icon.svg`,
    telephone: site.phoneIntl.replace(/\s/g, ""),
    priceRange: "6–8 €",
    servesCuisine: ["Bubble tea", "Matcha", "Thé", "Desserts"],
    acceptsReservations: false,
    hasMenu: `${site.url}/${lang}/carte`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    hasMap: site.maps,
    sameAs: [site.instagram, site.uberEats],
    openingHoursSpecification: week.filter((s) => s.open).map((s) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAY[s.day], opens: s.open, closes: s.close })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
      worstRating: 1,
      description: `Google, ${site.rating.checked}`,
    },
  };
}

/** Carte au format schema.org Menu. */
export function menuJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: getDict(lang).carte.title,
    url: `${site.url}/${lang}/carte`,
    inLanguage: lang,
    hasMenuSection: families.map((f) => ({
      "@type": "MenuSection",
      name: f[lang].name,
      hasMenuItem: f.items.map((i) => ({
        "@type": "MenuItem",
        name: i[lang].name,
        description: i[lang].desc,
        ...(i.price !== null ? { offers: { "@type": "Offer", price: i.price.toFixed(2), priceCurrency: "EUR" } } : {}),
      })),
    })),
  };
}

export function faqJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getDict(lang).faq.items.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
  };
}

export const JsonLd = ({ data }: { data: object }) => <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
