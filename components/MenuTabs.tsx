"use client";

import { useEffect, useRef, useState } from "react";

/** Onglets collants de la carte : ancres vers chaque famille, l'onglet actif suit le défilement. */
export function MenuTabs({ tabs, label }: { tabs: { id: string; name: string }[]; label: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const bar = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [tabs]);

  useEffect(() => {
    const el = bar.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label={label} className="sticky top-16 z-30 border-b border-line bg-cream/95 backdrop-blur-sm md:top-[4.5rem]">
      <ul ref={bar} className="no-scrollbar container-x flex gap-2 overflow-x-auto py-3">
        {tabs.map((t) => (
          <li key={t.id} data-id={t.id} className="shrink-0">
            <a href={`#${t.id}`} aria-current={active === t.id ? "true" : undefined} className={`chip ${active === t.id ? "!border-ink !bg-ink !text-cream" : ""}`}>
              {t.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
