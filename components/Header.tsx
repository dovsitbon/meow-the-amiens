"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Lockup } from "@/components/Logo";
import { IconArrow, IconBag, IconClose, IconInstagram, IconMenu, IconPhone, IconScooter, IconUsers } from "@/components/icons";
import type { Locale } from "@/lib/locales";

type Labels = {
  a11y: { menu: string; close: string; home: string; lang: string; newTab: string };
  nav: { carte: string; nouveautes: string; compose: string; groupe: string; infos: string; instagram: string };
  order: { cta: string; title: string; delivery: string; deliveryText: string; takeaway: string; takeawayText: string; group: string; groupText: string; call: string; callText: string };
};

export function Header({ lang, l, uber, tel, instagram }: { lang: Locale; l: Labels; uber: string; tel: string; instagram: string }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const sheet = useRef<HTMLDialogElement>(null);
  const home = `/${lang}`;

  const links = [
    { href: `${home}/carte`, label: l.nav.carte },
    { href: `${home}#nouveautes`, label: l.nav.nouveautes },
    { href: `${home}#compose`, label: l.nav.compose },
    { href: `${home}#groupe`, label: l.nav.groupe },
    { href: `${home}#infos`, label: l.nav.infos },
  ];
  const other: Locale = lang === "fr" ? "en" : "fr";
  const otherPath = pathname.replace(/^\/(fr|en)/, `/${other}`);

  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const openOrder = () => {
    setMenu(false);
    if (!sheet.current?.open) sheet.current?.showModal();
  };
  useEffect(() => {
    const h = () => {
      setMenu(false);
      if (!sheet.current?.open) sheet.current?.showModal();
    };
    window.addEventListener("meow:order", h);
    return () => window.removeEventListener("meow:order", h);
  }, []);

  const langSwitch = (
    <nav aria-label={l.a11y.lang} className="flex items-center gap-1 text-[0.95rem] font-bold">
      <span aria-current="page" className="px-1.5">
        {lang.toUpperCase()}
      </span>
      <span aria-hidden="true" className="text-taupe">
        ·
      </span>
      <Link href={otherPath} hrefLang={other} lang={other} className="grid min-h-11 place-items-center px-1.5 text-muted hover:text-ink" onClick={() => (document.cookie = `NEXT_LOCALE=${other};path=/;max-age=31536000`)}>
        {other.toUpperCase()}
      </Link>
    </nav>
  );

  const orderOptions = [
    { href: uber, icon: IconScooter, title: l.order.delivery, text: l.order.deliveryText, external: true },
    { href: `${home}#compose`, icon: IconBag, title: l.order.takeaway, text: l.order.takeawayText },
    { href: `${home}#groupe`, icon: IconUsers, title: l.order.group, text: l.order.groupText },
    { href: tel, icon: IconPhone, title: l.order.call, text: l.order.callText },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/95 backdrop-blur-sm">
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link href={home} aria-label={l.a11y.home} className="shrink-0">
            <Lockup badgeClass="size-9 md:size-10" wordClass="text-[1.45rem] md:text-[1.6rem]" />
          </Link>

          <nav aria-label="Navigation" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {links.map((x) => (
                <li key={x.href}>
                  <Link href={x.href} className="rounded-full px-3 py-2 font-semibold whitespace-nowrap transition-colors hover:bg-cream-deep" aria-current={pathname === x.href ? "page" : undefined}>
                    {x.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 md:gap-3">
            <div className="hidden md:block">{langSwitch}</div>
            <a href={instagram} target="_blank" rel="noopener" aria-label={`${l.nav.instagram} ${l.a11y.newTab}`} className="hidden size-11 place-items-center rounded-full hover:bg-cream-deep md:grid">
              <IconInstagram className="size-6" />
            </a>
            <button type="button" onClick={openOrder} className="btn btn-ink hidden min-h-11 sm:inline-flex">
              <span className="pearl" aria-hidden="true" />
              {l.order.cta}
            </button>
            <button type="button" className="grid size-11 place-items-center rounded-full hover:bg-cream-deep xl:hidden" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((v) => !v)}>
              <span className="sr-only">{menu ? l.a11y.close : l.a11y.menu}</span>
              {menu ? <IconClose className="size-7" /> : <IconMenu className="size-7" />}
            </button>
          </div>
        </div>

        <div id="mobile-menu" hidden={!menu} className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-cream xl:hidden">
          <nav aria-label="Navigation" className="container-x flex flex-col pt-6 pb-32">
            {links.map((x) => (
              <Link key={x.href} href={x.href} onClick={() => setMenu(false)} className="flex items-center justify-between border-b border-line py-4 font-[family-name:var(--font-display)] text-[1.75rem] font-semibold">
                {x.label}
                <IconArrow className="size-6 text-caramel" />
              </Link>
            ))}
            <div className="mt-8 flex items-center justify-between">
              {langSwitch}
              <a href={instagram} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 font-semibold">
                <IconInstagram className="size-6" /> {l.nav.instagram}
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile : barre fixe en bas, « Commander » toujours à portée de pouce */}
      <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:hidden">
        <div className="flex gap-2.5">
          <Link href={`${home}/carte`} className="btn btn-line min-h-12 flex-1">
            {l.nav.carte}
          </Link>
          <button type="button" onClick={openOrder} className="btn btn-ink min-h-12 flex-[1.3]">
            <span className="pearl" aria-hidden="true" />
            {l.order.cta}
          </button>
        </div>
      </div>

      <dialog
        ref={sheet}
        aria-labelledby="order-title"
        className="m-auto mb-0 w-full max-w-lg rounded-t-[28px] bg-paper p-0 text-ink backdrop:bg-ink/40 sm:mb-auto sm:rounded-[28px]"
        onClick={(e) => {
          if (e.target === e.currentTarget) sheet.current?.close();
        }}
      >
        <div className="p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <h2 id="order-title" className="text-[1.75rem]">
              {l.order.title}
            </h2>
            <button type="button" className="-me-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full hover:bg-cream" onClick={() => sheet.current?.close()}>
              <span className="sr-only">{l.a11y.close}</span>
              <IconClose className="size-6" />
            </button>
          </div>
          <ul className="grid gap-2.5">
            {orderOptions.map((o) => (
              <li key={o.title}>
                <a
                  href={o.href}
                  {...(o.external ? { target: "_blank", rel: "noopener" } : {})}
                  onClick={() => sheet.current?.close()}
                  className="card-hover flex items-center gap-4 rounded-2xl border-[1.5px] border-line bg-cream/50 p-4 transition-colors hover:border-ink"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cream-deep">
                    <o.icon className="size-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-[family-name:var(--font-display)] text-[1.2rem] font-semibold">{o.title}</span>
                    <span className="block text-[0.95rem] text-muted">{o.text}</span>
                  </span>
                  <IconArrow className="size-5 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
