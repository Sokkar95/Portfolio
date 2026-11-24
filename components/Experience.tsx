import { cn } from "@/lib/cn";
import { EDUCATION, EXPERIENCE } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" label="Experience" />

        <h2 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
          Experience &amp; <span className="font-serif italic text-accent">Education</span>
        </h2>

        <ol className="mt-12 border-t border-line">
          {EXPERIENCE.map((item, i) => (
            <Reveal
              as="li"
              key={item.role}
              delay={i * 70}
              className="grid gap-3 border-b border-line py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8"
            >
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold sm:text-2xl">{item.role}</h3>
                <p className="mt-1 text-sm text-muted">{item.org}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {item.note}
                </p>
              </div>
              <span
                className={cn(
                  "whitespace-nowrap font-mono text-xs",
                  i === 0 ? "text-accent" : "text-muted",
                )}
              >
                {item.period}
              </span>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {EDUCATION.map((entry, i) => (
            <Reveal key={entry.title} delay={i * 80}>
              <p className="font-mono text-xs text-accent">{entry.year}</p>
              <h3 className="mt-3 text-base font-medium">{entry.title}</h3>
              <p className="mt-1 text-sm text-muted">{entry.org}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
