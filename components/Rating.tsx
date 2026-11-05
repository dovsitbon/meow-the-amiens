import site from "@/data/site.json";
import { IconStar } from "@/components/icons";
import { fill, type Dict } from "@/lib/i18n";
import { rating } from "@/lib/format";
import type { Locale } from "@/lib/locales";

/** Note Google, cliquable vers les avis. */
export function Rating({ d, lang, className = "" }: { d: Dict; lang: Locale; className?: string }) {
  const value = rating(lang);
  return (
    <a href={site.maps} target="_blank" rel="noopener" aria-label={fill(d.rating.aria, { value, count: site.rating.count })} className={`group inline-flex items-center gap-2 ${className}`}>
      <span className="flex text-caramel" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <IconStar key={i} className="size-[1.05rem]" />
        ))}
      </span>
      <span>
        <strong className="font-bold">{fill(d.rating.label, { value })}</strong>{" "}
        <span className="text-muted underline decoration-caramel underline-offset-4 group-hover:decoration-ink">{fill(d.rating.count, { count: site.rating.count })}</span>
      </span>
    </a>
  );
}
