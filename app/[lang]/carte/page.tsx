import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { img } from "@/lib/media";
import { euro } from "@/lib/format";
import { families, toppings, type Item } from "@/lib/carte";
import { JsonLd, menuJsonLd, pageMeta } from "@/lib/jsonld";
import { MenuTabs } from "@/components/MenuTabs";
import { OrderButton } from "@/components/OrderButton";
import { Rating } from "@/components/Rating";

export async function generateMetadata({ params }: PageProps<"/[lang]/carte">) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDict(lang);
  return pageMeta(lang, "/carte", d.meta.carteTitle, d.meta.carteDesc);
}

export default async function Carte({ params }: PageProps<"/[lang]/carte">) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang: Locale = l;
  const d = getDict(lang);
  const c = d.carte;

  return (
    <>
      <section className="container-x pt-10 pb-8 md:pt-14">
        <p className="kicker mb-3">{c.kicker}</p>
        <h1 className="max-w-3xl text-[clamp(2.6rem,6.5vw,4.6rem)]">{c.title}</h1>
        <p className="mt-4 max-w-xl text-[1.1rem] text-muted">{c.text}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <OrderButton label={c.order} />
          <Link href={`/${lang}#compose`} className="btn btn-line">
            {c.compose}
          </Link>
          <Rating d={d} lang={lang} className="text-[0.95rem]" />
        </div>
      </section>

      <MenuTabs label={c.tabsLabel} tabs={families.map((f) => ({ id: f.id, name: f[lang].name }))} />

      <div className="container-x pb-24">
        {families.map((f) => {
          const im = img(f.image);
          return (
            <section key={f.id} id={f.id} aria-labelledby={`${f.id}-title`} className="scroll-mt-36 border-b border-line py-14 last:border-0 md:py-20">
              <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
                <div className="lg:sticky lg:top-40 lg:self-start">
                  <div className="overflow-hidden rounded-[28px]">
                    <Image src={im.src} width={im.width} height={im.height} alt="" sizes="(min-width: 1024px) 32vw, 92vw" quality={70} className="aspect-[5/4] w-full object-cover" />
                  </div>
                  <h2 id={`${f.id}-title`} className="mt-6 text-[clamp(2rem,4vw,2.8rem)]">
                    {f[lang].name}
                  </h2>
                  <p className="mt-2 text-[1.05rem]">{f[lang].short}</p>
                  <p className="mt-1 text-[0.95rem] text-muted">{f[lang].note}</p>
                </div>
                <ul className="grid content-start gap-3 sm:grid-cols-2">
                  {(f.items as Item[]).map((it) => {
                    const pic = it.image ? img(it.image) : null;
                    return (
                      <li key={it.id} className="flex gap-4 rounded-[22px] bg-paper p-4">
                        {pic ? (
                          <Image src={pic.src} width={pic.width} height={pic.height} alt={it[lang].name} sizes="88px" quality={65} className="size-[5.5rem] shrink-0 rounded-[16px] object-cover" />
                        ) : null}
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-[family-name:var(--font-display)] text-[1.12rem] leading-snug font-semibold">{it[lang].name}</h3>
                            <p className={`shrink-0 tabular-nums ${it.price !== null ? "font-[family-name:var(--font-display)] text-[1.12rem] font-semibold" : "text-[0.85rem] text-muted"}`}>
                              {it.price !== null ? euro(it.price, lang) : c.priceShop}
                            </p>
                          </div>
                          <p className="mt-1 text-[0.93rem] leading-snug text-muted">{it[lang].desc}</p>
                          {it.popular || it.seasonal ? (
                            <p className="mt-2 flex gap-2">
                              {it.popular ? <span className="rounded-full bg-sakura-soft px-2.5 py-0.5 text-[0.78rem] font-bold">{c.popular}</span> : null}
                              {it.seasonal ? <span className="rounded-full bg-matcha-soft px-2.5 py-0.5 text-[0.78rem] font-bold text-matcha-ink">{c.seasonal}</span> : null}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          );
        })}

        <section aria-labelledby="toppings-title" className="mt-4 rounded-[32px] bg-cream-deep p-6 sm:p-10">
          <h2 id="toppings-title" className="text-[2rem]">
            {c.toppings}
          </h2>
          <p className="mt-2 text-muted">{c.toppingsText}</p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {toppings.map((t) => (
              <li key={t.id} className="chip cursor-default">
                <span className="pearl" aria-hidden="true" />
                {t[lang]}
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-6 text-[0.88rem] text-muted">{c.source}</p>
      </div>
      <JsonLd data={menuJsonLd(lang)} />
    </>
  );
}
