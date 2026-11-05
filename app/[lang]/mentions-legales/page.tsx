import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/jsonld";

export async function generateMetadata({ params }: PageProps<"/[lang]/mentions-legales">) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDict(lang);
  return { ...pageMeta(lang, "/mentions-legales", d.meta.legalTitle, d.meta.legalDesc), robots: { index: false, follow: true } };
}

export default async function Legal({ params }: PageProps<"/[lang]/mentions-legales">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  return (
    <section className="container-x max-w-3xl py-16 md:py-24">
      <h1 className="text-[clamp(2.4rem,6vw,3.6rem)]">{d.legal.title}</h1>
      <div className="mt-10 space-y-8">
        {d.legal.sections.map((s) => (
          <div key={s.h}>
            <h2 className="text-[1.5rem]">{s.h}</h2>
            <p className="mt-2 text-muted">{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
