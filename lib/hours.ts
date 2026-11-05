import horaires from "@/data/horaires.json";

export type Slot = { day: number; open: string | null; close: string | null };
export const week = horaires.week as Slot[];
const closures = horaires.closures as { from: string; to: string }[];

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Heure et jour actuels à Amiens, quel que soit le fuseau du visiteur. */
function parisNow(now: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: horaires.timezone, weekday: "short", hour: "2-digit", minute: "2-digit", year: "numeric", month: "2-digit", day: "2-digit", hourCycle: "h23" })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  return { day, min: Number(parts.hour) * 60 + Number(parts.minute), iso: `${parts.year}-${parts.month}-${parts.day}` };
}

const closedOn = (iso: string) => closures.some((c) => iso >= c.from && iso <= c.to);
const addDays = (iso: string, n: number) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

export type Status = { open: true; until: string } | { open: false; next: { inDays: number; day: number; at: string } | null };

/** Ouvert / fermé maintenant, et prochaine ouverture. */
export function status(now = new Date()): Status {
  const { day, min, iso } = parisNow(now);
  const today = week.find((s) => s.day === day);
  if (today?.open && today.close && !closedOn(iso) && min >= toMin(today.open) && min < toMin(today.close)) return { open: true, until: today.close };
  for (let i = 0; i < 21; i++) {
    const d = (day + i) % 7;
    const s = week.find((x) => x.day === d);
    if (!s?.open || closedOn(addDays(iso, i))) continue;
    if (i === 0 && min >= toMin(s.open)) continue;
    return { open: false, next: { inDays: i, day: d, at: s.open } };
  }
  return { open: false, next: null };
}
