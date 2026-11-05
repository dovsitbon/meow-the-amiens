import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import "../globals.css";
import site from "@/data/site.json";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { currentAnnonce } from "@/lib/annonces";
import { waLink, telLink } from "@/lib/format";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { INFOBAR_KEY, INTRO_KEY } from "@/lib/keys";
import { Infobar } from "@/components/Infobar";
import { IconWhatsapp } from "@/components/icons";
import { JsonLd, businessJsonLd } from "@/lib/jsonld";

// Polices servies en local (app/fonts, issues de @fontsource) : aucun appel à Google Fonts.
const fredoka = localFont({ src: "../fonts/fredoka-latin-wght-normal.woff2", weight: "300 700", variable: "--font-fredoka", display: "swap" });
const nunito = localFont({ src: "../fonts/nunito-latin-wght-normal.woff2", weight: "200 1000", variable: "--font-nunito", display: "swap" });

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    formatDetection: { telephone: false },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

export const viewport: Viewport = { themeColor: "#f6ede1", width: "device-width", initialScale: 1 };

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  const annonce = currentAnnonce();

  // Avant le premier rendu : intro déjà vue cette session, bandeau déjà fermé pour cette annonce
  const boot = `document.documentElement.classList.add("js");try{if(sessionStorage.getItem("${INTRO_KEY}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-seen");if(localStorage.getItem("${INFOBAR_KEY}")===${JSON.stringify(annonce?.id ?? "")})document.documentElement.classList.add("infobar-closed")}catch(e){}`;

  return (
    <html lang={lang} className={`${fredoka.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <JsonLd data={businessJsonLd(lang)} />
      </head>
      <body>
        <a href="#main" className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          {d.a11y.skip}
        </a>
        <Intro skipLabel={d.intro.skip} />
        {annonce ? <Infobar id={annonce.id} text={annonce[lang]} href={annonce.link ? `/${lang}#${annonce.link}` : null} more={d.infobar.more} closeLabel={d.infobar.close} /> : null}
        <Header lang={lang} l={{ a11y: d.a11y, nav: d.nav, order: d.order }} uber={site.uberEats} tel={telLink} instagram={site.instagram} />
        <main id="main">{children}</main>
        <Footer d={d} lang={lang} />
        <a
          href={waLink(d.float.msg)}
          target="_blank"
          rel="noopener"
          aria-label={d.float.whatsapp}
          className="no-print fixed right-4 bottom-[5.5rem] z-30 grid size-14 place-items-center rounded-full bg-[#1f7a4d] text-white shadow-[0_6px_20px_rgba(36,28,23,0.22)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
        >
          <IconWhatsapp className="size-7" />
        </a>
      </body>
    </html>
  );
}
