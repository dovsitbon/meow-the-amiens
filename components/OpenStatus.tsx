"use client";

import { useEffect, useState } from "react";
import { status, type Status } from "@/lib/hours";

type Labels = { open: string; until: string; closed: string; opens: string; today: string; tomorrow: string; days: string[] };

/** « Ouvert maintenant · jusqu'à 19 h 45 » calculé en direct à l'heure d'Amiens (après le chargement, pour éviter un décalage serveur/client). */
export function OpenStatus({ l, lang, className = "" }: { l: Labels; lang: "fr" | "en"; className?: string }) {
  const [s, setS] = useState<Status | null>(null);
  useEffect(() => {
    const tick = () => setS(status());
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  const time = (hhmm: string) => (lang === "fr" ? hhmm.replace(":", " h ") : hhmm);
  if (!s) return <span className={`inline-flex min-h-7 ${className}`} aria-hidden="true" />;

  const detail = s.open
    ? l.until.replace("{time}", time(s.until))
    : s.next
      ? l.opens.replace("{when}", s.next.inDays === 0 ? l.today : s.next.inDays === 1 ? l.tomorrow : l.days[s.next.day]).replace("{time}", time(s.next.at))
      : "";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`size-2.5 rounded-full ${s.open ? "bg-matcha" : "bg-caramel"}`} aria-hidden="true" />
      <span>
        <strong className="font-bold">{s.open ? l.open : l.closed}</strong>
        {detail ? <span className="text-muted"> · {detail}</span> : null}
      </span>
    </span>
  );
}
