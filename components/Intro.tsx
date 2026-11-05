"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { BADGE_PATHS } from "@/components/Logo";

import { INTRO_KEY } from "@/lib/keys";
const done = () => {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
  document.documentElement.classList.add("intro-seen");
};

/**
 * Ouverture en 1,5 s (CSS dans globals.css), une fois par session, ignorée si l'utilisateur réduit les animations :
 * fond crème → le gobelet se dessine au trait → trois perles tombent et rebondissent → la paille se plante
 * → « meöw thé » apparaît, les oreilles bougent une fois → fondu sur le hero.
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(done, 1500);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;
  const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

  return (
    <div className="intro text-ink" aria-hidden="true">
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 64 64" className="size-36 overflow-visible text-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className="straw" d="M36.5 50 44.5 7" stroke="#b9773f" strokeWidth="3.2" />
          <path className="cup" pathLength={1} d={BADGE_PATHS.cup} />
          <path className="cup" pathLength={1} d={BADGE_PATHS.wave} />
          <path className="cup" pathLength={1} d={BADGE_PATHS.head} />
          <g className="ear-l">
            <path className="cup" pathLength={1} d={BADGE_PATHS.earL} />
          </g>
          <g className="ear-r">
            <path className="cup" pathLength={1} d={BADGE_PATHS.earR} />
          </g>
          <circle className="drop" style={d(0.4)} cx="28.3" cy="49.6" r="2.3" fill="#241c17" stroke="none" />
          <circle className="drop" style={d(0.5)} cx="32.6" cy="50.4" r="2.3" fill="#241c17" stroke="none" />
          <circle className="drop" style={d(0.6)} cx="31" cy="46" r="2.3" fill="#241c17" stroke="none" />
          <g className="word">
            <circle cx="28" cy="24" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="36" cy="24" r="1.2" fill="currentColor" stroke="none" />
            <path d={BADGE_PATHS.mouth} strokeWidth="1.6" />
          </g>
        </svg>
        <p className="word mt-4 font-[family-name:var(--font-display)] text-[2.6rem] leading-none font-semibold" translate="no">
          meöw thé
        </p>
      </div>
      <button
        type="button"
        aria-hidden="false"
        onClick={() => {
          done();
          setGone(true);
        }}
        className="absolute right-4 bottom-4 min-h-11 rounded-full px-4 font-semibold text-muted hover:text-ink"
      >
        {skipLabel}
      </button>
    </div>
  );
}
