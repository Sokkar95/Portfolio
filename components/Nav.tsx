"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/lib/scroll";
import { NAV, SITE, SOCIALS } from "@/lib/site";
import { Monogram } from "./Monogram";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        solid ? "glass border-line" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <button
          type="button"
          onClick={() => scrollToId("top")}
          className="flex items-center gap-2.5 text-left leading-none"
          aria-label="Back to top"
        >
          <Monogram className="size-8 shrink-0" />
          <span className="hidden text-sm font-medium sm:block">{SITE.name}</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center rounded-full border border-line px-4 py-2 text-center text-sm leading-none text-muted transition-colors hover:border-line-strong hover:text-ink sm:inline-flex"
          >
            Download CV
          </a>
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold leading-none text-[#14140f] transition-opacity hover:opacity-90"
          >
            Let&apos;s Talk
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-lg border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-[10px] w-[18px]">
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full bg-ink transition-transform duration-300",
                  open ? "top-[4px] rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-[1.5px] w-full bg-ink transition-transform duration-300",
                  open ? "top-[4px] -rotate-45" : "top-[8px]",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "glass absolute inset-x-0 top-16 origin-top border-b border-line transition-all duration-300 md:hidden",
          open ? "visible scale-y-100 opacity-100" : "invisible scale-y-95 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setOpen(false);
                scrollToId(item.id);
              }}
              className="border-b border-line py-4 text-left text-lg last:border-0"
            >
              {item.label}
            </button>
          ))}
          <div className="flex flex-wrap gap-2 pt-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-3 py-1.5 text-xs text-muted"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
