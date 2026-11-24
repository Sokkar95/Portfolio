"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Mockup, MockupVariant, Palette, Project } from "@/lib/projects";

/* ------------------------------------------------------------------ *
 * Mockup primitives — small screens drawn with divs + SVG so a card
 * always has something real to show. Real screenshots replace them the
 * moment an `images` array is present in lib/projects.ts.
 * ------------------------------------------------------------------ */

function Bar({
  w = "100%",
  h = 6,
  c,
  o = 1,
  r = 3,
  className,
}: {
  w?: string;
  h?: number;
  c: string;
  o?: number;
  r?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ width: w, height: h, background: c, opacity: o, borderRadius: r }}
    />
  );
}

function Phone({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("relative aspect-[9/19] rounded-[22px] border-[5px] shadow-2xl", className)}
      style={{ borderColor: "#0b0b0a", ...style }}
    >
      <div
        className="absolute left-1/2 top-1 z-10 h-1.5 w-8 -translate-x-1/2 rounded-full"
        style={{ background: "#0b0b0a" }}
      />
      <div className="size-full overflow-hidden rounded-[17px]">{children}</div>
    </div>
  );
}

function PhoneScreen({ variant, p }: { variant: MockupVariant; p: Palette }) {
  const { ink, accent: ac, soft } = p;

  if (variant === "fitness") {
    return (
      <div className="flex h-full flex-col gap-2 p-2.5">
        <Bar w="55%" h={6} c={ink} />
        <div className="relative mx-auto my-1 size-[62%] min-h-0">
          <svg viewBox="0 0 100 100" className="size-full">
            <circle cx="50" cy="50" r="38" fill="none" stroke={ink} strokeOpacity=".12" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke={ac}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="170 239"
              transform="rotate(-90 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="22"
              fill="none"
              stroke={ink}
              strokeOpacity=".7"
              strokeWidth="6"
              strokeDasharray="90 138"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[0.9, 0.6, 0.75].map((v, i) => (
            <div
              key={i}
              className="flex h-9 items-end rounded-md p-1"
              style={{ background: ink, opacity: 0.08 + i * 0.02 }}
            >
              <Bar h={Math.round(v * 22)} c={ink} o={0.6} r={2} />
            </div>
          ))}
        </div>
        <div className="mt-auto rounded-lg p-2" style={{ background: ink }}>
          <Bar w="60%" h={5} c={ac} />
          <Bar w="40%" h={4} c={soft} o={0.5} className="mt-1.5" />
        </div>
      </div>
    );
  }

  if (variant === "estate") {
    return (
      <div className="flex h-full flex-col gap-2 p-2.5">
        <div className="flex items-center justify-between">
          <Bar w="45%" h={6} c={ink} />
          <div className="size-3 rounded-full" style={{ background: ac }} />
        </div>
        <div
          className="relative h-[42%] overflow-hidden rounded-lg"
          style={{ background: ink, opacity: 0.9 }}
        >
          <svg
            viewBox="0 0 100 60"
            className="absolute inset-0 size-full"
            preserveAspectRatio="xMidYMax meet"
          >
            <path d="M20 60 V32 L45 14 L70 32 V60 Z" fill={soft} opacity=".9" />
            <rect x="38" y="40" width="14" height="20" fill={ac} />
            <path d="M62 60 V40 L78 30 L92 40 V60Z" fill={soft} opacity=".55" />
          </svg>
        </div>
        <Bar w="70%" h={6} c={ink} />
        <Bar w="35%" h={6} c={ac} />
        <div className="mt-auto grid grid-cols-2 gap-1.5">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-md p-1.5" style={{ background: ink, opacity: 0.1 }}>
              <div className="h-7 rounded" style={{ background: ink, opacity: 0.6 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2 p-2.5">
      <div className="flex items-center justify-between">
        <Bar w="40%" h={6} c={ink} />
        <div className="size-3 rounded-full" style={{ background: ink, opacity: 0.2 }} />
      </div>
      <div className="h-5 rounded-full" style={{ background: ink, opacity: 0.08 }} />
      <div className="flex gap-1">
        {["40%", "30%", "26%"].map((w, i) => (
          <div
            key={i}
            className="h-3.5 rounded-full"
            style={{ width: w, background: i === 0 ? ac : ink, opacity: i === 0 ? 1 : 0.12 }}
          />
        ))}
      </div>
      <div className="h-[26%] rounded-lg p-2" style={{ background: ink }}>
        <Bar w="55%" h={5} c={ac} />
        <Bar w="35%" h={4} c={soft} o={0.5} className="mt-1.5" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="size-6 shrink-0 rounded-md" style={{ background: ink, opacity: 0.15 }} />
          <div className="flex-1 space-y-1">
            <Bar w="80%" h={4} c={ink} o={0.7} />
            <Bar w="50%" h={3} c={ink} o={0.3} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Scaled({ scale = 0.6, children }: { scale?: number; children: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="origin-top-left"
        style={{
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Browser({
  children,
  p,
}: {
  children: ReactNode;
  p: Palette;
}) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-t-xl border shadow-2xl"
      style={{ background: p.soft, borderColor: "rgba(0,0,0,.25)" }}
    >
      <div
        className="flex items-center gap-1.5 border-b px-3 py-2"
        style={{ borderColor: "rgba(0,0,0,.08)" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2 rounded-full"
            style={{ background: p.ink, opacity: 0.25 }}
          />
        ))}
        <div
          className="ml-2 h-3 flex-1 rounded-full"
          style={{ background: p.ink, opacity: 0.08 }}
        />
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

function WebScreen({ variant, p }: { variant: MockupVariant; p: Palette }) {
  const { ink, accent: ac, soft } = p;

  const nav = (
    <div className="flex items-center justify-between px-3 py-2">
      <Bar w="16%" h={6} c={ink} />
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <Bar key={i} w="22px" h={4} c={ink} o={0.35} />
        ))}
      </div>
      <div className="h-4 w-10 rounded-full" style={{ background: ac }} />
    </div>
  );

  if (variant === "perfume") {
    return (
      <div className="flex h-full flex-col">
        {nav}
        <div className="grid flex-1 grid-cols-2 items-center gap-3 px-4 pb-4">
          <div className="space-y-2">
            <Bar w="90%" h={10} c={ink} />
            <Bar w="70%" h={10} c={ink} />
            <Bar w="80%" h={4} c={ink} o={0.35} className="mt-3" />
            <Bar w="60%" h={4} c={ink} o={0.35} />
            <div className="mt-3 h-5 w-20 rounded-full" style={{ background: ink }} />
          </div>
          <div className="relative flex h-full items-center justify-center">
            <div className="absolute size-[78%] rounded-full" style={{ background: ac, opacity: 0.25 }} />
            <svg viewBox="0 0 60 100" className="relative h-[80%]">
              <rect x="22" y="4" width="16" height="14" rx="2" fill={ink} />
              <rect x="26" y="18" width="8" height="8" fill={ac} />
              <rect x="8" y="26" width="44" height="70" rx="10" fill={ink} opacity=".92" />
              <rect x="16" y="50" width="28" height="16" rx="2" fill={soft} opacity=".85" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "course") {
    return (
      <div className="flex h-full flex-col">
        {nav}
        <div className="space-y-2 px-4 pt-2">
          <Bar w="55%" h={10} c={ink} />
          <Bar w="38%" h={10} c={ink} />
          <div className="flex gap-2 pt-1">
            <div className="h-4 w-16 rounded-full" style={{ background: ac }} />
            <div
              className="h-4 w-14 rounded-full border"
              style={{ borderColor: ink, opacity: 0.4 }}
            />
          </div>
        </div>
        <div className="mt-4 grid flex-1 grid-cols-3 grid-rows-2 gap-2 px-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex min-h-0 flex-col rounded-md p-1.5"
              style={{ background: ink, opacity: i === 1 ? 1 : 0.12 }}
            >
              <div
                className="min-h-0 flex-1 rounded"
                style={{ background: i === 1 ? ac : ink, opacity: i === 1 ? 1 : 0.5 }}
              />
              <Bar w="70%" h={4} c={i === 1 ? soft : ink} className="mt-1.5" />
            </div>
          ))}
        </div>

        <div
          className="mt-auto flex items-center justify-between border-t px-4 py-2.5"
          style={{ borderColor: `${ink}1a` }}
        >
          <Bar w="26%" h={4} c={ink} o={0.45} />
          <div className="h-4 w-16 rounded-full" style={{ background: ac }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {nav}
      <div
        className="mx-4 flex h-[30%] items-center justify-between rounded-lg px-3"
        style={{ background: ink }}
      >
        <div className="w-1/2 space-y-1.5">
          <Bar w="90%" h={7} c={soft} />
          <Bar w="50%" h={5} c={ac} />
        </div>
        <div className="size-10 rounded-full" style={{ background: ac }} />
      </div>
      <div className="grid flex-1 grid-cols-4 grid-rows-2 gap-2 p-3">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex min-h-0 flex-col gap-1">
            <div
              className="min-h-0 flex-1 rounded-md"
              style={{ background: ink, opacity: 0.12 + (i % 3) * 0.05 }}
            />
            <Bar w="80%" h={4} c={ink} o={0.7} />
            <Bar w="40%" h={4} c={ac} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Mockup({ mockup }: { mockup: Mockup }) {
  const p = mockup.palette;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: p.bg }}>
      <div
        className="absolute inset-0 opacity-[.07]"
        style={{
          backgroundImage: `linear-gradient(${p.soft} 1px,transparent 1px),linear-gradient(90deg,${p.soft} 1px,transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute -bottom-1/2 -right-1/3 size-[85%] rounded-full"
        style={{ background: p.accent, opacity: 0.13 }}
      />

      {mockup.screen === "phone" ? (
        <div className="absolute inset-0 flex items-end justify-center gap-[4%] px-[8%] pt-[9%]">
          <Phone className="mb-[-14%] w-[26%]" style={{ background: p.soft }}>
            <PhoneScreen variant={mockup.variant} p={p} />
          </Phone>
          <Phone className="mb-[-6%] w-[30%]" style={{ background: p.soft }}>
            <PhoneScreen variant={mockup.variant} p={p} />
          </Phone>
          <Phone className="mb-[-19%] w-[26%]" style={{ background: p.soft }}>
            <PhoneScreen variant="app" p={p} />
          </Phone>
        </div>
      ) : (
        <div className="absolute inset-x-[6%] bottom-0 top-[11%]">
          <Scaled scale={0.6}>
            <Browser p={p}>
              <WebScreen variant={mockup.variant} p={p} />
            </Browser>
          </Scaled>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Public component
 * ------------------------------------------------------------------ */

type ProjectVisualProps = {
  project: Project;
  /**
   * The shots to draw. Defaults to the project's screenshots; the grid card
   * passes its cover instead, so the card and the modal can differ.
   */
  sources?: readonly string[];
  /** Which shot of `sources` is currently visible. */
  index?: number;
  /** True while the card is hovered / the modal is open with a clip. */
  playing?: boolean;
  /** `contain` shows the whole shot (modal); `cover` fills the frame (grid card). */
  fit?: "cover" | "contain";
};

export function ProjectVisual({
  project,
  sources,
  index = 0,
  playing = false,
  fit = "cover",
}: ProjectVisualProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shots = sources ?? project.images ?? [];
  const hasMedia = shots.length > 0;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      void v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [playing]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-surface-2">
      {shots.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${project.title} — preview ${i + 1}`}
          fill
          quality={95}
          sizes="(max-width: 767px) 92vw, (max-width: 1279px) 46vw, 900px"
          style={project.focus ? { objectPosition: project.focus } : undefined}
          className={cn(
            "transition-opacity duration-[900ms] ease-out",
            fit === "contain" ? "object-contain" : "object-cover",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {project.video && (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="none"
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-500",
            playing ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {!hasMedia && project.mockup && <Mockup mockup={project.mockup} />}
    </div>
  );
}
