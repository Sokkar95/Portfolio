import { PROCESS, TOOLKIT } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-y border-line bg-surface/40 px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02" label="About" />

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <h2 className="text-4xl font-semibold leading-[1.03] tracking-tight sm:text-5xl">
              Structural{" "}
              <span className="font-serif italic text-accent">Logic</span>
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <div className="space-y-4 text-lg leading-relaxed text-muted">
              <p>
                <span className="text-ink">I went from beams to buttons.</span> My
                background in structural analysis and construction taught me that
                nothing holds up without a solid foundation — so I read the load
                before I draw anything.
              </p>
              <p>
                Today I bring that same thinking to product design: analytical
                precision for the structure, creative intuition for the experience,
                and enough front-end range to ship the result myself.
              </p>
            </div>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 70} className="bg-bg p-6">
              <span className="font-mono text-xs text-accent">{step.n}</span>
              <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
          {TOOLKIT.map((group, i) => (
            <Reveal key={group.group} delay={i * 80}>
              <h3 className="font-mono text-xs text-muted">{group.group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
