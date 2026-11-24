"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = bodyOverflow;
      previous?.focus?.();
    };
  }, [project, onClose]);

  // The shots rotate on their own, so the preview shows every angle of the set
  // the card cycles, without anyone having to reach for the thumbnails.
  useEffect(() => {
    if (!project) return;
    const count = project.images?.length ?? 0;
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 2800);
    return () => window.clearInterval(id);
  }, [project]);

  if (!project) return null;

  const shots = project.images ?? [];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pm-title"
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-sm"
      />

      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-line bg-bg sm:rounded-3xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9]">
          <ProjectVisual
            project={project}
            index={index}
            playing={Boolean(project.video)}
            fit={project.fit ?? "contain"}
          />

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-black/60 text-xl leading-none text-[#edeae3] backdrop-blur-sm transition-colors hover:bg-black/85"
          >
            ×
          </button>

          {shots.length > 1 && (
            <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-gradient-to-t from-black/70 to-transparent p-4">
              {shots.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show preview ${i + 1}`}
                  aria-pressed={i === index}
                  className={cn(
                    "relative h-14 w-20 overflow-hidden rounded-lg border transition-all",
                    i === index
                      ? "border-accent opacity-100"
                      : "border-line opacity-60 hover:opacity-100",
                  )}
                >
                  <Image src={src} alt="" fill quality={90} sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-[1.4fr_1fr] sm:p-8">
          <div>
            <p className="font-mono text-xs text-accent">{project.type}</p>
            <h2 id="pm-title" className="mt-2 text-3xl font-semibold">
              {project.title}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold leading-none text-[#14140f] transition-opacity hover:opacity-90"
            >
              {project.linkLabel}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
