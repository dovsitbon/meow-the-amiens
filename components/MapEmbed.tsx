"use client";

import { useState } from "react";
import { IconPin } from "@/components/icons";

/** Carte Google chargée au clic seulement (aucun script ni cookie tiers avant l'action du visiteur). */
export function MapEmbed({ src, title, label }: { src: string; title: string; label: string }) {
  const [on, setOn] = useState(false);
  return on ? (
    <iframe src={src} title={title} className="size-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
  ) : (
    <button type="button" onClick={() => setOn(true)} className="group grid size-full place-items-center bg-cream-deep">
      <span className="flex flex-col items-center gap-3">
        <span className="grid size-16 place-items-center rounded-full bg-paper transition-transform group-hover:-translate-y-1">
          <IconPin className="size-8" />
        </span>
        <span className="btn btn-ink">{label}</span>
      </span>
    </button>
  );
}
