"use client";

import { PortraitSeq } from "./PortraitSeq";
import { Reveal } from "./Reveal";
import { SITE, STATS } from "@/lib/site";
import { scrollToId } from "@/lib/scroll";

export function Hero() {
  return (
    <section id="top" className="px-5 pb-16 pt-10 sm:px-8 sm:pb-20 md:pt-14">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent-2" />
              Open to freelance &amp; full-time work
            </span>
          </Reveal>

          <Reveal delay={70}>
            <p className="mt-7 font-mono text-xs tracking-[0.14em] text-accent sm:text-xs">
              {SITE.role}
              <span className="hidden sm:inline"> · Structural Thinker</span>
            </p>
          </Reveal>

          <Reveal delay={130}>
            <h1 className="mt-4 text-[clamp(2.9rem,8.6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.035em]">
              Amr
              <br />
              Elsokkary<span className="text-accent">.</span>
            </h1>
          </Reveal>

          <Reveal delay={190}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">
              I design and ship digital products — interfaces, design systems and
              full websites — with the logic of a civil engineer and the precision
              of a design system.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToId("work")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold leading-none text-[#14140f] transition-opacity hover:opacity-90"
              >
                View Work
                <span aria-hidden="true">↓</span>
              </button>
              <a
                href={SITE.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-center text-sm leading-none transition-colors hover:border-line-strong"
              >
                Download CV
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={310}>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {STATS.map((s) => (
                /* Column layout keeps the values on one line even when a
                   label wraps on narrow screens. */
                <div key={s.k} className="flex flex-col justify-between gap-1.5">
                  <dt className="font-mono text-xs text-muted">{s.k}</dt>
                  <dd className="text-sm">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={140} className="md:pl-4">
          <PortraitSeq />
        </Reveal>
      </div>
    </section>
  );
}
