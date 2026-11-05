import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import { getDict, isLocale, fill, type Locale } from "@/lib/i18n";
import { img } from "@/lib/media";
import { euro, formatDay, telLink, waLink } from "@/lib/format";
import { families, popular, toppings } from "@/lib/carte";
import { currentConcours, currentNouveautes } from "@/lib/annonces";
import { JsonLd, faqJsonLd, pageMeta } from "@/lib/jsonld";
import { Reveal } from "@/components/Reveal";
import { Rating } from "@/components/Rating";
import { OpenStatus } from "@/components/OpenStatus";
import { OrderButton } from "@/components/OrderButton";
import { Composer } from "@/components/Composer";
import { GroupForm } from "@/components/GroupForm";
import { MapEmbed } from "@/components/MapEmbed";
import { HoursList } from "@/components/Footer";
import { Badge } from "@/components/Logo";
import { IconArrow, IconInstagram, IconPhone, IconPin, IconPlus, IconWhatsapp, serviceIcons } from "@/components/icons";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDict(lang);
  return pageMeta(lang, "", d.meta.homeTitle, d.meta.homeDesc);
}

const TILE_BG = ["bg-cream-deep", "bg-sakura-soft", "bg-matcha-soft", "bg-cream-deep", "bg-sakura-soft", "bg-matcha-soft"];
const GALLERY = [
  "boissons/the-au-lait-chat",
  "boissons/creme-brulee-serie",
  "boissons/matcha-fraise",
  "desserts/mochis-soda",
  "boissons/oreo-cheese",
  "boissons/trio-plateau",
  "boutique/nono-enseigne",
  "boissons/trio-fruits-lait",
  "nouveautes/nuage-oreo-jasmin",
];

function SectionHead({ kicker, title, text, id, center = false }: { kicker?: string; title: string; text?: string; id: string; center?: boolean }) {
  return (
    <Reveal className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {kicker ? <p className="kicker mb-3">{kicker}</p> : null}
      <h2 id={id} className="text-[clamp(2.1rem,5vw,3.4rem)]">
        {title}
      </h2>
      {text ? <p className="mt-4 text-[1.1rem] text-muted">{text}</p> : null}
    </Reveal>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang: Locale = l;
  const d = getDict(lang);
  const hero = img("/media/hero/brown-sugar-boba.jpg");
  const news = currentNouveautes();
  const concours = currentConcours();
  const favs = popular();
  const tiles = families.filter((f) => f.id !== "lattes");
  const toppingList = toppings.map((t) => ({ id: t.id, label: t[lang] }));
  const status = { ...d.status };

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section aria-labelledby="hero-title" className="container-x grid items-center gap-6 pt-3 pb-14 md:pt-8 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-16">
        <div className="relative order-1 lg:order-2">
          <div className="relative h-[42svh] min-h-64 overflow-hidden rounded-[32px] bg-cream-deep sm:h-[52svh] lg:aspect-[4/5] lg:h-auto lg:rounded-[36px]">
            <Image src={hero.src} width={hero.width} height={hero.height} alt={d.hero.alt} priority fetchPriority="high" sizes="(min-width: 1024px) 46vw, 100vw" quality={80} className="size-full object-cover object-[50%_62%]" />
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-full bg-paper py-1.5 pr-5 pl-1.5 shadow-[0_8px_24px_rgba(36,28,23,0.12)] sm:left-8 sm:py-2 sm:pl-2">
            <span className="grid size-11 place-items-center rounded-full bg-sakura">
              <Badge className="size-8" />
            </span>
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] font-semibold">Brown sugar boba milk</span>
              <span className="block text-[0.9rem] text-muted">{euro(7, lang)}</span>
            </span>
          </div>
        </div>

        <div className="order-2 pt-4 lg:order-1 lg:pt-0">
          <p className="kicker mb-4 text-[0.85rem] tracking-[0.08em] uppercase">{d.hero.eyebrow}</p>
          <h1 id="hero-title" className="text-[clamp(2.9rem,7.4vw,5.6rem)] leading-[0.98]">
            {d.hero.title}
          </h1>
          <p className="mt-6 max-w-md text-[1.15rem] text-muted">{d.hero.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <OrderButton label={d.order.cta} />
            <Link href={`/${lang}/carte`} className="btn btn-line">
              {d.hero.ctaMenu}
            </Link>
          </div>
          <div className="mt-7 flex flex-col gap-2.5 text-[0.98rem]">
            <Rating d={d} lang={lang} />
            <OpenStatus l={status} lang={lang} />
          </div>
        </div>
      </section>

      {/* ───────── Tuiles de catégories ───────── */}
      <section aria-labelledby="tiles-title" className="pb-16 md:pb-24">
        <div className="container-x">
          <h2 id="tiles-title" className="mb-6 text-[clamp(1.7rem,3.5vw,2.3rem)]">
            {d.tiles.title}
          </h2>
        </div>
        <ul className="no-scrollbar container-x flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {tiles.map((f, i) => {
            const im = img(f.image);
            return (
              <li key={f.id} className="w-[44vw] max-w-56 shrink-0 snap-start md:w-auto md:max-w-none">
                <Link href={`/${lang}/carte#${f.id}`} className={`tile group block h-full overflow-hidden rounded-[26px] ${TILE_BG[i]} p-2.5`}>
                  <div className="aspect-square overflow-hidden rounded-[20px]">
                    <Image src={im.src} width={im.width} height={im.height} alt="" sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 44vw" quality={70} className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="px-2 pt-3 pb-2">
                    <h3 className="flex items-center gap-2 text-[1.2rem]">
                      {f[lang].name}
                      <span className="pearl ms-auto text-ink" aria-hidden="true" />
                    </h3>
                    <p className="mt-1 text-[0.88rem] leading-snug text-muted">{f[lang].short}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ───────── Services ───────── */}
      <section aria-labelledby="services-title" className="bg-paper">
        <div className="container-x py-10 md:py-12">
          <h2 id="services-title" className="sr-only">
            {d.services.title}
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {d.services.items.map((s) => {
              const Icon = serviceIcons[s.id as keyof typeof serviceIcons];
              const href = s.id === "delivery" ? site.uberEats : s.id === "phone" ? telLink : s.id === "takeaway" ? "#compose" : "#infos";
              return (
                <li key={s.id}>
                  <a href={href} {...(s.id === "delivery" ? { target: "_blank", rel: "noopener" } : {})} className="group flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:text-left">
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-cream transition-transform group-hover:-translate-y-1">
                      <Icon className="size-7" />
                    </span>
                    <span>
                      <span className="block font-[family-name:var(--font-display)] text-[1.2rem] font-semibold">{s.title}</span>
                      <span className="block text-[0.95rem] text-muted">{s.text}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────── Nouveautés ───────── */}
      <section id="nouveautes" aria-labelledby="news-title" className="container-x py-20 md:py-28">
        <SectionHead id="news-title" kicker={d.news.kicker} title={d.news.title} />
        {concours ? (
          <a href={concours.link} target="_blank" rel="noopener" className="mb-8 flex items-center gap-4 rounded-[24px] bg-sakura p-5">
            <strong className="font-[family-name:var(--font-display)] text-[1.2rem]">{concours[lang].title}</strong>
            <span>{concours[lang].text}</span>
          </a>
        ) : null}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((n, i) => {
            const im = img(n.image);
            return (
              <Reveal as="li" key={n.id} delay={i * 0.06} className="card-hover flex flex-col overflow-hidden rounded-[28px] bg-paper">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={im.src} width={im.width} height={im.height} alt={n[lang].name} sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw" quality={70} className="size-full object-cover" />
                  <span className="absolute top-3 left-3 rounded-full bg-paper px-3 py-1 text-[0.8rem] font-bold">{n.tag[lang]}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[1.35rem]">{n[lang].name}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] text-muted">{n[lang].desc}</p>
                  <p className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[0.9rem]">
                    <span className={n.price !== null ? "font-[family-name:var(--font-display)] text-[1.25rem] font-semibold" : "font-bold"}>{n.price !== null ? euro(n.price, lang) : d.news.priceShop}</span>
                    <span className="text-muted">{n.until ? fill(d.news.until, { date: formatDay(n.until, lang) }) : d.news.always}</span>
                  </p>
                  <a href={waLink(fill(d.news.orderMsg, { name: n[lang].name }))} target="_blank" rel="noopener" className="btn btn-line mt-4 min-h-11">
                    <span className="pearl" aria-hidden="true" />
                    {d.news.order}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ───────── Blocs alternés ───────── */}
      <section aria-label={d.blocks.custom.title} className="container-x grid gap-16 pb-20 md:gap-24 md:pb-28">
        {(
          [
            { k: "custom", image: "/media/boissons/brown-sugar-versage.jpg", href: "#compose", bg: "bg-sakura-soft" },
            { k: "fruits", image: "/media/boissons/trio-plateau.jpg", href: `/${lang}/carte#fruits`, bg: "bg-matcha-soft" },
          ] as const
        ).map((b, i) => {
          const im = img(b.image);
          const t = d.blocks[b.k];
          return (
            <div key={b.k} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <Reveal className={`overflow-hidden rounded-[36px] ${b.bg} ${i % 2 ? "md:order-2" : ""}`}>
                <Image src={im.src} width={im.width} height={im.height} alt={t.alt} sizes="(min-width: 768px) 46vw, 92vw" quality={70} className="aspect-[5/4] size-full object-cover" />
              </Reveal>
              <Reveal delay={0.08} className="max-w-md">
                <h2 className="text-[clamp(2rem,4.5vw,3.1rem)]">{t.title}</h2>
                <p className="mt-4 text-[1.1rem] text-muted">{t.text}</p>
                <Link href={b.href} className="btn btn-ink mt-7">
                  <span className="pearl" aria-hidden="true" />
                  {t.cta}
                </Link>
              </Reveal>
            </div>
          );
        })}
      </section>

      {/* ───────── Les préférées ───────── */}
      <section aria-labelledby="fav-title" className="bg-ink text-cream">
        <div className="container-x grid gap-10 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div>
            <h2 id="fav-title" className="text-[clamp(2.1rem,5vw,3.4rem)]">
              {d.favorites.title}
            </h2>
            <p className="mt-4 max-w-sm text-cream/80">{d.favorites.text}</p>
            <Link href={`/${lang}/carte`} className="btn btn-paper mt-7">
              {d.favorites.cta}
              <IconArrow className="size-5" />
            </Link>
          </div>
          <ul className="grid content-start gap-x-10 sm:grid-cols-2">
            {favs.map((f) => (
              <li key={f.id} className="border-b border-cream/15">
                <Link href={`/${lang}/carte#${f.family}`} className="flex items-baseline gap-3 py-4 hover:text-sakura">
                  <span className="font-[family-name:var(--font-display)] text-[1.15rem] font-medium">{f[lang].name}</span>
                  <span className="flex-1 translate-y-[-0.3em] border-b border-dotted border-cream/30" aria-hidden="true" />
                  <span className="tabular-nums">{f.price !== null ? euro(f.price, lang) : ""}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Compose ton bubble tea ───────── */}
      <section id="compose" aria-labelledby="compose-title" className="container-x py-20 md:py-28">
        <SectionHead id="compose-title" kicker={d.compose.kicker} title={d.compose.title} text={d.compose.text} />
        <Composer l={d.compose} lang={lang} toppings={toppingList} />
      </section>

      {/* ───────── Commande groupée ───────── */}
      <section id="groupe" aria-labelledby="group-title" className="bg-cream-deep">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <p className="kicker mb-3">{d.group.kicker}</p>
            <h2 id="group-title" className="text-[clamp(2.1rem,5vw,3.4rem)]">
              {d.group.title}
            </h2>
            <p className="mt-4 text-[1.1rem] text-muted">{d.group.text}</p>
            <ul className="mt-6 space-y-2.5">
              {d.group.points.map((p) => (
                <li key={p} className="flex items-center gap-3 font-semibold">
                  <span className="pearl text-caramel" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 hidden overflow-hidden rounded-[28px] lg:block">
              {(() => {
                const im = img("/media/boissons/creme-brulee-serie.jpg");
                return <Image src={im.src} width={im.width} height={im.height} alt={d.gallery.alts["creme-brulee-serie"]} sizes="34vw" quality={70} className="aspect-[4/3] w-full object-cover" />;
              })()}
            </div>
          </div>
          <GroupForm l={d.group} lang={lang} />
        </div>
      </section>

      {/* ───────── L'esprit Meow ───────── */}
      <section aria-labelledby="spirit-title" className="container-x grid items-center gap-10 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <Reveal className="overflow-hidden rounded-[36px]">
          {(() => {
            const im = img("/media/boutique/nono-enseigne.jpg");
            return <Image src={im.src} width={im.width} height={im.height} alt={d.spirit.alt} sizes="(min-width: 768px) 46vw, 92vw" quality={70} className="aspect-[4/5] w-full object-cover" />;
          })()}
        </Reveal>
        <Reveal delay={0.08}>
          <p className="kicker mb-3">{d.spirit.kicker}</p>
          <h2 id="spirit-title" className="text-[clamp(2.1rem,5vw,3.4rem)]">
            {d.spirit.title}
          </h2>
          <p className="mt-5 text-[1.1rem] text-muted">{d.spirit.text}</p>
          <p className="mt-3 text-[0.95rem] text-muted italic">{d.spirit.more}</p>
          <a href={site.instagram} target="_blank" rel="noopener" className="btn btn-line mt-7">
            <IconInstagram className="size-5" />
            {d.spirit.cta}
          </a>
        </Reveal>
      </section>

      {/* ───────── Galerie Instagram ───────── */}
      <section aria-labelledby="gallery-title" className="container-x pb-20 md:pb-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="gallery-title" className="text-[clamp(2.1rem,5vw,3.4rem)]">
              {d.gallery.title}
            </h2>
            <p className="mt-2 font-semibold text-muted">{site.instagramHandle}</p>
          </div>
          <a href={site.instagram} target="_blank" rel="noopener" className="btn btn-ink">
            <IconInstagram className="size-5" />
            {d.gallery.follow}
          </a>
        </div>
        <ul className="grid grid-cols-3 gap-2 md:gap-3">
          {GALLERY.map((g) => {
            const im = img(`/media/${g}.jpg`);
            const key = g.split("/")[1] as keyof typeof d.gallery.alts;
            return (
              <li key={g}>
                <a href={site.instagram} target="_blank" rel="noopener" className="group block overflow-hidden rounded-[14px] md:rounded-[22px]">
                  <Image src={im.src} width={im.width} height={im.height} alt={d.gallery.alts[key]} sizes="(min-width: 1200px) 400px, 32vw" quality={65} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ───────── Infos pratiques ───────── */}
      <section id="infos" aria-labelledby="infos-title" className="bg-paper">
        <div className="container-x grid gap-10 py-20 md:py-28 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 id="infos-title" className="text-[clamp(2.1rem,5vw,3.4rem)]">
              {d.infos.title}
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-[1.2rem]">{d.infos.address}</h3>
                <address className="not-italic">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </address>
                <a href={site.maps} target="_blank" rel="noopener" className="link-u mt-2 inline-flex min-h-11 items-center gap-2 font-bold">
                  <IconPin className="size-5" />
                  {d.infos.directions}
                </a>
                <h3 className="mt-6 mb-2 text-[1.2rem]">{d.infos.access}</h3>
                <p className="text-muted">{d.infos.accessText}</p>
              </div>
              <div>
                <h3 className="mb-2 text-[1.2rem]">{d.infos.hours}</h3>
                <OpenStatus l={status} lang={lang} className="mb-3 text-[0.95rem]" />
                <HoursList d={d} lang={lang} />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={telLink} className="btn btn-ink">
                <IconPhone className="size-5" />
                {lang === "fr" ? site.phone : site.phoneIntl}
              </a>
              <a href={waLink(d.float.msg)} target="_blank" rel="noopener" className="btn btn-line">
                <IconWhatsapp className="size-5" />
                {d.infos.whatsapp}
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_0.6fr] lg:grid-cols-1 xl:grid-cols-[1fr_0.55fr]">
            <div className="aspect-[4/3] overflow-hidden rounded-[28px] sm:aspect-auto sm:min-h-80">
              <MapEmbed src={site.mapsEmbed} title={d.infos.mapTitle} label={d.infos.mapLoad} />
            </div>
            {/* Emplacement : photo de la façade, à prendre sur place → public/media/boutique/facade.jpg */}
            <div className="grid min-h-48 place-items-center rounded-[28px] border-2 border-dashed border-line p-6 text-center text-muted">
              <span className="flex flex-col items-center gap-2">
                <Badge className="size-10 text-taupe" />
                {d.infos.photosSoon}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section aria-labelledby="faq-title" className="container-x py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 id="faq-title" className="text-[clamp(2.1rem,5vw,3.4rem)]">
            {d.faq.title}
          </h2>
          <div className="divide-y divide-line border-y border-line">
            {d.faq.items.map((x) => (
              <details key={x.q} className="group">
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 font-[family-name:var(--font-display)] text-[1.25rem] font-medium">
                  {x.q}
                  <IconPlus className="faq-plus size-6 shrink-0 transition-transform" />
                </summary>
                <p className="pb-5 text-muted">{x.a}</p>
              </details>
            ))}
          </div>
        </div>
        <JsonLd data={faqJsonLd(lang)} />
      </section>
    </>
  );
}
