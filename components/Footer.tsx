import Link from "next/link";
import site from "@/data/site.json";
import { Badge, Wordmark } from "@/components/Logo";
import { IconInstagram, IconPhone, IconWhatsapp } from "@/components/icons";
import { fill, type Dict } from "@/lib/i18n";
import { formatDay, telLink, waLink } from "@/lib/format";
import { week } from "@/lib/hours";
import type { Locale } from "@/lib/locales";

export const hourText = (lang: Locale, open: string, close: string) => (lang === "fr" ? `${open.replace(":", " h ")} – ${close.replace(":", " h ")}` : `${open} – ${close}`);

/** Horaires du lundi au dimanche (data/horaires.json). */
export function HoursList({ d, lang, className = "", mutedClass = "text-muted" }: { d: Dict; lang: Locale; className?: string; mutedClass?: string }) {
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <dl className={`grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 ${className}`}>
      {order.map((n) => {
        const s = week.find((x) => x.day === n)!;
        return (
          <div key={n} className="contents">
            <dt>{d.days[n]}</dt>
            <dd className={`text-right tabular-nums ${s.open ? "" : mutedClass}`}>{s.open && s.close ? hourText(lang, s.open, s.close) : d.infos.closed}</dd>
          </div>
        );
      })}
    </dl>
  );
}

export function Footer({ d, lang }: { d: Dict; lang: Locale }) {
  return (
    <footer className="bg-ink pb-24 text-cream sm:pb-0">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Link href={`/${lang}`} className="inline-flex items-center gap-3" aria-label={d.a11y.home}>
            <Badge className="size-14" />
            <Wordmark className="text-[2rem]" />
          </Link>
          <p className="mt-4 max-w-xs text-cream/80">{d.footer.tagline}</p>
          <address className="mt-4 not-italic">
            <a href={site.maps} target="_blank" rel="noopener" className="hover:underline">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </a>
          </address>
        </div>
        <div>
          <h2 className="mb-3 text-[1.15rem]">{d.footer.hours}</h2>
          <HoursList d={d} lang={lang} className="max-w-64 text-[0.95rem]" mutedClass="text-cream/65" />
        </div>
        <div>
          <h2 className="mb-3 text-[1.15rem]">{d.footer.contact}</h2>
          <ul>
            <li>
              <a href={telLink} className="inline-flex min-h-11 items-center gap-2.5 hover:underline">
                <IconPhone className="size-5" /> {lang === "fr" ? site.phone : site.phoneIntl}
              </a>
            </li>
            <li>
              <a href={waLink(d.float.msg)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2.5 hover:underline">
                <IconWhatsapp className="size-5" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2.5 hover:underline">
                <IconInstagram className="size-5" /> {site.instagramHandle}
              </a>
            </li>
            <li>
              <a href={site.uberEats} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2.5 hover:underline">
                <span className="grid size-5 place-items-center text-[0.7rem] font-black" aria-hidden="true">
                  UE
                </span>
                Uber Eats
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-[0.85rem] text-cream/70">
          <p>
            © {new Date().getFullYear()} {site.name}. {d.footer.rights} {fill(d.footer.ratingNote, { date: formatDay(site.rating.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}
          </p>
          <Link href={`/${lang}/mentions-legales`} className="inline-flex min-h-11 items-center hover:underline">
            {d.footer.legal}
          </Link>
        </div>
      </div>
    </footer>
  );
}
