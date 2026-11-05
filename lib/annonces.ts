import annonces from "@/data/annonces.json";
import nouveautes from "@/data/nouveautes.json";
import concours from "@/data/concours.json";

type Annonce = { id: string; from: string | null; to: string | null; fr: string; en: string; link: string | null };
const today = () => new Date().toISOString().slice(0, 10);

/** Première annonce active à la date du build (le site est reconstruit à chaque push). */
export function currentAnnonce(): Annonce | null {
  const t = today();
  return (annonces.items as Annonce[]).find((a) => (!a.from || a.from <= t) && (!a.to || a.to >= t)) ?? null;
}

export type Nouveaute = Omit<(typeof nouveautes.items)[number], "until" | "price"> & { until: string | null; price: number | null };
export const currentNouveautes = () => (nouveautes.items as Nouveaute[]).filter((n) => !n.until || n.until >= today());
const contest = concours as Omit<typeof concours, "until" | "active"> & { until: string | null; active: boolean };
export const currentConcours = () => (contest.active && (!contest.until || contest.until >= today()) ? contest : null);
