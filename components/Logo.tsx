/**
 * Logo Meow Thé redessiné d'après son logo (photo de profil Instagram) : un chat qui sort d'un gobelet de thé au lait,
 * dans un cercle, au trait arrondi. Tout est en currentColor : facile à recolorer ou à remplacer.
 */
export const BADGE_PATHS = {
  ring: "M32 3a29 29 0 1 1 0 58a29 29 0 1 1 0-58",
  earL: "M22 22 24.5 13 29 17.5",
  earR: "M35 17.5 39.5 13 42 22",
  head: "M22 31V22M29 17.5h6M42 22v9",
  cup: "M21 31h22l-3.4 21q-.3 2-2.3 2H26.7q-2 0-2.3-2Z",
  wave: "M22.8 40q2.5-2 5 0t5 0t5 0t3.9 0",
  mouth: "M30.5 26.6q1.5 1.6 3 0",
};

export function Badge({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <path d={BADGE_PATHS.ring} />
      <path d={BADGE_PATHS.earL} />
      <path d={BADGE_PATHS.earR} />
      <path d={BADGE_PATHS.head} />
      <path d={BADGE_PATHS.cup} />
      <path d={BADGE_PATHS.wave} />
      <path d={BADGE_PATHS.mouth} strokeWidth="1.8" />
      <circle cx="28" cy="24" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="36" cy="24" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** « meöw thé », comme sur son enseigne (minuscules, tréma sur le o). */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-[family-name:var(--font-display)] font-semibold tracking-[-0.01em] ${className}`} translate="no">
      meöw thé
    </span>
  );
}

export function Lockup({ className = "", badgeClass = "size-10", wordClass = "text-[1.6rem]" }: { className?: string; badgeClass?: string; wordClass?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Badge className={badgeClass} />
      <Wordmark className={`leading-none ${wordClass}`} />
    </span>
  );
}
