"use client";

import { IconClose } from "@/components/icons";

import { INFOBAR_KEY } from "@/lib/keys";

/** Bandeau d'infos (data/annonces.json) qu'on peut fermer : il reste fermé tant que l'annonce ne change pas. */
export function Infobar({ id, text, href, more, closeLabel }: { id: string; text: string; href: string | null; more: string; closeLabel: string }) {
  return (
    <div className="infobar bg-ink text-cream">
      <div className="container-x flex min-h-10 items-center gap-3 py-1.5 text-[0.9rem]">
        <p className="flex-1 text-center">
          {text}
          {href ? (
            <>
              {" "}
              <a href={href} className="font-bold whitespace-nowrap underline underline-offset-4">
                {more}
              </a>
            </>
          ) : null}
        </p>
        <button
          type="button"
          aria-label={closeLabel}
          className="-me-2 grid size-10 shrink-0 place-items-center rounded-full hover:bg-white/10"
          onClick={() => {
            try {
              localStorage.setItem(INFOBAR_KEY, id);
            } catch {}
            document.documentElement.classList.add("infobar-closed");
          }}
        >
          <IconClose className="size-5" />
        </button>
      </div>
    </div>
  );
}
