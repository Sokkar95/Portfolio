"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { FILTERS, GROUPS, type Project } from "@/lib/projects";
import { SITE } from "@/lib/site";
import { ProjectModal } from "./ProjectModal";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

function ProjectCard({
  project,
  number,
  onOpen,
}: {
  project: Project;
  number: number;
  onOpen: (project: Project) => void;
}) {
  const [hover, setHover] = useState(false);

  // The cover is the card's one image: it is designed to be read at this size,
  // while the raw screenshots stay for the preview modal.
  const reset = () => setHover(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={reset}
      onFocus={() => setHover(true)}
      onBlur={reset}
      aria-label={`Open ${project.title} preview`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-line bg-surface text-left transition-all duration-300 hover:border-line-strong hover:shadow-[0_34px_70px_-34px_rgba(0,0,0,0.95)]"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          // The covers are 16:9 for the two featured pieces and square for the
          // rest, so the frame follows the cover instead of cropping it.
          project.featured ? "aspect-[16/9]" : "aspect-square",
        )}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectVisual
            project={project}
            sources={[project.cover]}
            playing={hover && Boolean(project.video)}
          />
        </div>

        <span className="absolute left-4 top-4 rounded-md bg-black/55 px-2 py-1 font-mono text-xs text-[#edeae3] backdrop-blur-sm">
          {String(number).padStart(2, "0")} / {project.type}
        </span>
      </div>

      <div className="flex flex-1 items-start justify-between gap-4 border-t border-line px-5 py-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold">{project.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          ↗
        </span>
      </div>
    </button>
  );
}

export function Work() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [open, setOpen] = useState<Project | null>(null);

  const sections = useMemo(
    () => GROUPS.filter((group) => filter === "all" || group.id === filter),
    [filter],
  );

  return (
    <section id="work" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01" label="Work" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Selected <span className="font-serif italic text-accent">Work</span>
          </h2>

          <div
            className="no-bars flex max-w-full gap-1 overflow-x-auto rounded-full border border-line p-1"
            role="group"
            aria-label="Filter projects"
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-center text-sm leading-none transition-colors",
                  filter === f.id ? "bg-ink text-bg" : "text-muted hover:text-ink",
                )}
              >
                {f.label}
                <span className="ml-1.5 font-mono text-xs opacity-70">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.id} className="mt-12 first:mt-10">
            {filter === "all" && (
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
                <h3 className="text-xl font-semibold">{section.label}</h3>
                <p className="text-sm text-muted">{section.blurb}</p>
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {section.items.map((project, i) => (
                <Reveal
                  key={project.id}
                  delay={i * 70}
                  className={cn("min-w-0", project.featured && "md:col-span-2")}
                >
                  <ProjectCard project={project} number={i + 1} onOpen={setOpen} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-14 flex justify-center">
          <a
            href={SITE.behance}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-center text-sm leading-none transition-colors hover:border-line-strong"
          >
            See Everything on Behance
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {/* Remounts per project (see `key` in Work.tsx), which resets the
          active screenshot without a state-syncing effect. */}
      <ProjectModal
        key={open?.id ?? "closed"}
        project={open}
        onClose={() => setOpen(null)}
      />
    </section>
  );
}
