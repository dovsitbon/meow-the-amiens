"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { formatDay, waLink } from "@/lib/format";
import { IconWhatsapp } from "@/components/icons";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type L = Dict["group"];
const TYPES = ["lait", "fruits", "matcha", "frappes", "mix"] as const;
const SUGARS = ["maison", "moins", "mix"] as const;

const todayIso = () => new Date().toISOString().slice(0, 10);
const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());

/** Commande groupée : formulaire court → récapitulatif formaté envoyé sur WhatsApp, dans la langue du visiteur. */
export function GroupForm({ l, lang }: { l: L; lang: Locale }) {
  const f = l.fields;
  const [v, setV] = useState({ date: "", time: "", count: "", mode: "pickup" as "pickup" | "delivery", address: "", sugar: "" as (typeof SUGARS)[number] | "", name: "", phone: "", message: "" });
  const [types, setTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!v.date) e.date = l.errors.required;
    else if (v.date < todayIso()) e.date = l.errors.date;
    if (!v.time) e.time = l.errors.required;
    if (!v.count) e.count = l.errors.required;
    else if (Number(v.count) < 6) e.count = l.errors.count;
    if (v.mode === "delivery" && !v.address.trim()) e.address = l.errors.required;
    if (!v.name.trim()) e.name = l.errors.required;
    if (!isPhone(v.phone)) e.phone = v.phone ? l.errors.phone : l.errors.required;
    return e;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const firstKey = Object.keys(e)[0];
    if (firstKey) {
      document.getElementById(`g-${firstKey}`)?.focus();
      return;
    }
    const c = lang === "fr" ? " :" : ":";
    const line = (k: string, x: string) => (x ? `${k}${c} ${x}` : "");
    const msg = [
      `*${l.msgTitle}*`,
      l.msgIntro,
      "",
      line(f.date, formatDay(v.date, lang, { weekday: "long", day: "numeric", month: "long" })),
      line(f.time, lang === "fr" ? v.time.replace(":", " h ") : v.time),
      line(f.count, v.count),
      line(f.mode, v.mode === "pickup" ? f.pickup : f.delivery),
      v.mode === "delivery" ? line(f.address, v.address.trim()) : "",
      line(f.types, types.map((t) => f.typeOptions[t as (typeof TYPES)[number]]).join(", ")),
      line(f.sugar, v.sugar ? f.sugarOptions[v.sugar] : ""),
      "",
      line(f.name, v.name.trim()),
      line(f.phone, v.phone.trim()),
      line(f.message, v.message.trim()),
    ]
      .filter((x, i, a) => x !== "" || a[i - 1] !== "")
      .join("\n")
      .trim();
    window.open(waLink(msg), "_blank", "noopener");
    setSent(true);
  };

  const field = (id: keyof typeof v | "types", label: string, input: ReactNode, opt = false) => (
    <div>
      <label htmlFor={`g-${id}`} className="mb-1.5 block text-[0.9rem] font-bold">
        {label} {opt ? <span className="font-normal text-muted">({f.optional})</span> : null}
      </label>
      {input}
      {errors[id] ? (
        <p id={`g-${id}-err`} className="mt-1 text-[0.85rem] font-bold text-[#b3261e]">
          {errors[id]}
        </p>
      ) : null}
    </div>
  );
  const a = (id: string) => ({ id: `g-${id}`, "aria-invalid": errors[id] ? true : undefined, "aria-describedby": errors[id] ? `g-${id}-err` : undefined });

  return (
    <form noValidate onSubmit={submit} className="grid gap-5 rounded-[32px] bg-paper p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {field("date", f.date, <input type="date" min={todayIso()} className="field" value={v.date} onChange={set("date")} {...a("date")} />)}
        {field("time", f.time, <input type="time" className="field" value={v.time} onChange={set("time")} {...a("time")} />)}
        {field("count", f.count, <input type="number" inputMode="numeric" min={6} className="field" value={v.count} onChange={set("count")} {...a("count")} />)}
      </div>

      <fieldset>
        <legend className="mb-2 text-[0.9rem] font-bold">{f.mode}</legend>
        <div className="flex flex-wrap gap-2.5">
          {(["pickup", "delivery"] as const).map((m) => (
            <label key={m}>
              <input type="radio" name="mode" value={m} checked={v.mode === m} onChange={() => setV((s) => ({ ...s, mode: m }))} className="sr-only" />
              <span className="chip">{f[m]}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {v.mode === "delivery" ? field("address", f.address, <input className="field" autoComplete="street-address" value={v.address} onChange={set("address")} {...a("address")} />) : null}

      <fieldset>
        <legend className="mb-2 text-[0.9rem] font-bold">
          {f.types} <span className="font-normal text-muted">({f.optional})</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {TYPES.map((t) => (
            <label key={t}>
              <input type="checkbox" checked={types.includes(t)} onChange={() => setTypes((x) => (x.includes(t) ? x.filter((y) => y !== t) : [...x, t]))} className="sr-only" />
              <span className="chip">{f.typeOptions[t]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {field(
        "sugar",
        f.sugar,
        <select className="field" value={v.sugar} onChange={set("sugar")} id="g-sugar">
          <option value="">—</option>
          {SUGARS.map((s) => (
            <option key={s} value={s}>
              {f.sugarOptions[s]}
            </option>
          ))}
        </select>,
        true,
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", f.name, <input className="field" autoComplete="name" value={v.name} onChange={set("name")} {...a("name")} />)}
        {field("phone", f.phone, <input type="tel" className="field" autoComplete="tel" inputMode="tel" value={v.phone} onChange={set("phone")} {...a("phone")} />)}
      </div>
      {field("message", f.message, <textarea className="field min-h-24" placeholder={f.messagePh} value={v.message} onChange={set("message")} id="g-message" />, true)}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-ink">
          <IconWhatsapp className="size-5" />
          {l.submit}
        </button>
        <p className="text-[0.9rem] text-muted" role="status">
          {sent ? l.after : ""}
        </p>
      </div>
    </form>
  );
}
