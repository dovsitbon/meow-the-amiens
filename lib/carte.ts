import carte from "@/data/carte.json";

export type Family = (typeof carte.families)[number];
export type Item = Family["items"][number] & { image?: string; popular?: boolean; seasonal?: boolean };
export const families = carte.families;
export const toppings = carte.toppings;
export const popular = () => families.flatMap((f) => (f.items as Item[]).filter((i) => i.popular).map((i) => ({ ...i, family: f.id })));
