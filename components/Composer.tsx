"use client";

import { useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/format";
import { IconArrow, IconClose, IconWhatsapp } from "@/components/icons";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type L = Dict["compose"];
type Topping = { id: string; label: string };

const BASES = ["noir", "vert", "jasmin", "oolong", "matcha", "lait"] as const;
const SUGARS = [0, 30, 50, 70, 100] as const;
const ICES = ["chaud", "sans", "peu", "normal"] as const;
type Base = (typeof BASES)[number];
type Ice = (typeof ICES)[number];

// Teinte du liquide selon la base
const TINT: Record<Base, string> = { noir: "#c9a27e", vert: "#ddd2a4", jasmin: "#e8d9b6", oolong: "#d9a95f", matcha: "#a9bb76", lait: "#f4ebdd" };

/** Gobelet SVG qui se remplit à chaque choix : liquide, glaçons, perles et toppings. */
function Cup({ base, sugar, ice, toppings, filled, alt }: { base: Base | null; sugar: number | null; ice: Ice | null; toppings: string[]; filled: number; alt: string }) {
  const has = (t: string) => toppings.includes(t);
  const tint = base ? TINT[base] : "#efe2cf";
  const cubes = ice === "normal" ? 4 : ice === "peu" ? 2 : 0;
  return (
    <svg viewBox="0 0 200 260" className="h-auto w-full max-w-[15rem]" role="img" aria-label={alt}>
      <defs>
        <clipPath id="cup-inside">
          <path d="M38 62h124l-13 170q-1 10-11 10H62q-10 0-11-10Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#cup-inside)">
        <rect className="cup-fill" x="30" y="62" width="140" height="190" fill={tint} style={{ transform: `scaleY(${filled})` }} />
        {sugar !== null && sugar > 0 ? <rect x="30" y="200" width="140" height="60" fill="#8a5a2b" opacity={sugar / 400} className="cup-fill" /> : null}
        {/* Glaçons */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} className="cup-pearl" data-on={i < cubes} x={58 + i * 22} y={86 + (i % 2) * 18} width="20" height="20" rx="5" fill="#fff" opacity="0.65" stroke="#fff" />
        ))}
        {/* Crème cheese / Oreo sur le dessus */}
        <rect className="cup-pearl" data-on={has("cheese")} x="30" y="62" width="140" height="22" fill="#fffaf3" />
        {[50, 72, 96, 120, 142].map((x, i) => (
          <circle key={x} className="cup-pearl" data-on={has("oreo")} cx={x} cy={66 + (i % 2) * 6} r="4" fill="#2b2420" />
        ))}
        {/* Perles de tapioca */}
        {[
          [72, 228],
          [92, 232],
          [112, 230],
          [132, 226],
          [82, 212],
          [102, 214],
          [122, 210],
        ].map(([x, y], i) => (
          <circle key={i} className="cup-pearl" data-on={has("tapioca")} style={{ transitionDelay: `${i * 0.04}s` }} cx={x} cy={y} r="8" fill="#241c17" />
        ))}
        {/* Perles de gelée */}
        {[
          [68, 196],
          [138, 194],
          [104, 190],
        ].map(([x, y], i) => (
          <circle key={i} className="cup-pearl" data-on={has("gelee")} cx={x} cy={y} r="7" fill="#f2c6cf" stroke="#e59aab" />
        ))}
        {/* Haricot rouge */}
        {[60, 76, 140, 152].map((x, i) => (
          <ellipse key={x} className="cup-pearl" data-on={has("haricot")} cx={x} cy={236 - (i % 2) * 8} rx="5" ry="3.5" fill="#7a2e2a" />
        ))}
        {/* Taro */}
        <rect className="cup-pearl" data-on={has("taro")} x="30" y="174" width="140" height="10" fill="#b79ccf" opacity="0.8" />
      </g>
      {/* Contour du gobelet, paille, couvercle */}
      <path d="M118 46 140 4" stroke="#b9773f" strokeWidth="9" strokeLinecap="round" />
      <path d="M38 62h124l-13 170q-1 10-11 10H62q-10 0-11-10Z" fill="none" stroke="#241c17" strokeWidth="4" strokeLinejoin="round" />
      <path d="M30 62h140" stroke="#241c17" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 62q58-38 116 0" fill="none" stroke="#241c17" strokeWidth="4" />
    </svg>
  );
}

export function Composer({ l, lang, toppings }: { l: L; lang: Locale; toppings: Topping[] }) {
  const [step, setStep] = useState(0);
  const [base, setBase] = useState<Base | null>(null);
  const [sugar, setSugar] = useState<number | null>(null);
  const [ice, setIce] = useState<Ice | null>(null);
  const [tops, setTops] = useState<string[]>([]);
  const [toppingsDone, setToppingsDone] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const counter = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus({ preventScroll: true });
  }, [step]);

  const filled = 0.12 + 0.22 * [base, sugar, ice].filter((x) => x !== null).length + (toppingsDone ? 0.22 : 0);
  const canNext = [base !== null, sugar !== null, ice !== null, true][step] ?? true;
  const sugarLabel = (n: number) => (lang === "fr" ? `${n} %` : `${n}%`);
  const topLabels = tops.map((t) => toppings.find((x) => x.id === t)?.label ?? t);
  const pct = lang === "fr" ? " :" : ":";

  const lines = [
    base ? l.bases[base] : "",
    sugar !== null ? `${l.sugar}${pct} ${sugarLabel(sugar)}` : "",
    ice ? `${l.iceLabel}${pct} ${l.ice[ice]}` : "",
    `${l.toppingsLabel}${pct} ${topLabels.length ? topLabels.join(", ") : l.none}`,
  ].filter(Boolean);

  const message = [
    `*${l.msgTitle}*`,
    l.msgIntro,
    ...lines.map((x) => `• ${x}`),
    "",
    name.trim() ? `${l.msgName}${pct} ${name.trim()}` : "",
    time ? `${l.msgTime}${pct} ${lang === "fr" ? time.replace(":", " h ") : time}` : "",
    l.msgEnd,
  ]
    .filter((x, i, a) => x !== "" || (i > 0 && a[i - 1] !== ""))
    .join("\n");

  const restart = () => {
    setStep(0);
    setBase(null);
    setSugar(null);
    setIce(null);
    setTops([]);
    setToppingsDone(false);
  };

  const next = () => {
    if (step === 3) setToppingsDone(true);
    setStep((s) => Math.min(4, s + 1));
  };

  const chip = (selected: boolean, onClick: () => void, label: string, key: string, multi = false) => (
    <button key={key} type="button" className="chip" role={multi ? "checkbox" : "radio"} aria-checked={selected} onClick={onClick}>
      {label}
    </button>
  );

  return (
    <div className="grid overflow-hidden rounded-[32px] bg-paper md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="grid place-items-center bg-sakura-soft px-8 py-10 md:py-14">
        <Cup base={base} sugar={sugar} ice={ice} toppings={tops} filled={Math.min(1, filled)} alt={l.cupAlt} />
      </div>

      <div className="flex flex-col p-6 sm:p-8 md:p-10">
        <ol className="mb-7 flex gap-2" aria-label={l.kicker}>
          {l.steps.map((s, i) => (
            <li key={s} className="flex-1">
              <span className={`block h-1.5 rounded-full transition-colors ${i < step || step === 4 ? "bg-ink" : i === step ? "bg-caramel" : "bg-line"}`} aria-hidden="true" />
              <span className={`mt-2 block text-[0.8rem] font-bold ${i === step ? "text-ink" : "text-muted"}`} aria-current={i === step ? "step" : undefined}>
                {s}
              </span>
            </li>
          ))}
        </ol>

        {step < 4 ? (
          <div className="flex flex-1 flex-col">
            <p className="text-[0.9rem] font-semibold text-muted">{l.stepLabel.replace("{n}", String(step + 1))}</p>
            <h3 ref={heading} tabIndex={-1} className="mt-1 text-[1.9rem] outline-none">
              {l.steps[step]}
            </h3>
            {step === 1 ? <p className="mt-1 text-muted">{l.sugarHint}</p> : null}
            {step === 3 ? <p className="mt-1 text-muted">{l.toppingsHint}</p> : null}

            <div className="mt-5 flex flex-wrap gap-2.5" role={step === 3 ? "group" : "radiogroup"} aria-label={l.steps[step]}>
              {step === 0 && BASES.map((b) => chip(base === b, () => setBase(b), l.bases[b], b))}
              {step === 1 && SUGARS.map((n) => chip(sugar === n, () => setSugar(n), sugarLabel(n), String(n)))}
              {step === 2 && ICES.map((x) => chip(ice === x, () => setIce(x), l.ice[x], x))}
              {step === 3 && toppings.map((t) => chip(tops.includes(t.id), () => setTops((v) => (v.includes(t.id) ? v.filter((x) => x !== t.id) : [...v, t.id])), t.label, t.id, true))}
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 pt-8">
              <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className={`min-h-11 px-2 font-bold text-muted hover:text-ink ${step === 0 ? "invisible" : ""}`}>
                {l.prev}
              </button>
              <button type="button" onClick={next} disabled={!canNext} className="btn btn-ink disabled:cursor-not-allowed disabled:opacity-40">
                {step === 3 ? l.done : l.next}
                <IconArrow className="size-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            <h3 ref={heading} tabIndex={-1} className="text-[1.9rem] outline-none">
              {l.recap}
            </h3>
            <ul className="mt-4 space-y-1.5 text-[1.05rem]">
              {lines.map((x, i) => (
                <li key={x} className={i === 0 ? "font-[family-name:var(--font-display)] text-[1.3rem] font-semibold" : ""}>
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[0.9rem] font-bold">{l.nameLabel}</span>
                <input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.9rem] font-bold">{l.timeLabel}</span>
                <input className="field" type="time" value={time} onChange={(e) => setTime(e.target.value)} aria-describedby="time-hint" />
                <span id="time-hint" className="sr-only">
                  {l.timeHint}
                </span>
              </label>
            </div>
            <p className="mt-4 text-[0.9rem] text-muted">{l.note}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={waLink(message)} target="_blank" rel="noopener" className="btn btn-ink">
                <IconWhatsapp className="size-5" />
                {l.send}
              </a>
              <button type="button" className="btn btn-line" onClick={() => counter.current?.showModal()}>
                {l.show}
              </button>
              <button type="button" onClick={restart} className="min-h-11 px-2 font-bold text-muted underline-offset-4 hover:text-ink hover:underline">
                {l.restart}
              </button>
            </div>
          </div>
        )}
      </div>

      <dialog ref={counter} aria-label={l.recap} className="m-0 h-dvh max-h-none w-screen max-w-none bg-cream p-0 text-ink">
        <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
          <p className="kicker">{l.counterHint}</p>
          <ul className="space-y-3">
            {lines.map((x, i) => (
              <li key={x} className={`font-[family-name:var(--font-display)] font-semibold ${i === 0 ? "text-[2.6rem] leading-tight" : "text-[1.7rem]"}`}>
                {x}
              </li>
            ))}
          </ul>
          {name.trim() ? <p className="text-[1.3rem]">{name.trim()}</p> : null}
          <button type="button" className="btn btn-ink mt-4" onClick={() => counter.current?.close()}>
            <IconClose className="size-5" />
            {l.counterClose}
          </button>
        </div>
      </dialog>
    </div>
  );
}
