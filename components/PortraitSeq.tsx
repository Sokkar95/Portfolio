"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/**
 * The hero portrait — a real turn, scrubbed like a product page.
 *
 * The clip was rendered as one level turn, which I cut into an even-angled
 * image sequence: a frame every 2 degrees, from the front out to sixty degrees
 * each way. The pointer's overflow past the frame picks the angle, and the frame
 * nearest it is drawn. Frames are never faded into each other: two poses two
 * degrees apart are different pictures of the face, and a cross-fade between
 * them reads as a double exposure whenever the pointer moves slowly. The set is
 * dense enough that the nearest frame is the smooth turn.
 *
 * Why a sequence and not the video: nothing is stretched (every frame is the
 * character actually turned), and nothing is decoded at runtime, so there is no
 * seek to fall behind the pointer.
 */
const COUNT = 61;
const STEP = 2; // degrees between frames
const MAX = 60; // degrees of turn each way
const FRONT = (COUNT - 1) / 2; // the frame that faces the viewer

const src = (i: number) => `/images/hero/seq/seq-${String(i).padStart(3, "0")}.webp`;

/** Below this much overflow the pointer still counts as centred. */
const DEAD = 0.04;
/** Easing time-constants, in seconds. */
const RISE = 0.12; // reach the wanted turn
const FALL = 0.16; // ease back to the front
const LEAN = 0.2; // smooth the pointer for the tilt and the key light

export function PortraitSeq() {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const light = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const box = card.current;
    const cv = canvas.current;
    if (!el || !box || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const imgs: (HTMLImageElement | null)[] = new Array(COUNT).fill(null);
    const preload = (i: number) => {
      const im = new Image();
      im.decoding = "async";
      im.src = src(i);
      imgs[i] = im;
      return im;
    };

    /** Draw the frame nearest `pos`. Nothing is blended into it. */
    let shown = -1;
    const draw = (pos: number) => {
      const i0 = clamp(Math.round(pos), 0, COUNT - 1);
      if (i0 === shown) return;
      const im = imgs[i0];
      if (!im || !im.complete || !im.naturalWidth) return; // keep the last good frame
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(im, 0, 0, cv.width, cv.height);
      shown = i0;
    };

    // The front frame is the only one a touch screen ever shows, so it is the
    // only one loaded there; it goes first everywhere.
    preload(FRONT);
    const showFront = () => draw(FRONT);
    if (imgs[FRONT]?.complete) showFront();
    else imgs[FRONT]?.addEventListener("load", showFront, { once: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduced || !fine) return;

    // Only a fine pointer can turn it, so only there do the other sixty frames
    // load — outward from the front, so the angles the pointer reaches first are
    // the ones ready first.
    const order: number[] = [];
    for (let i = 0; i < COUNT; i++) if (i !== FRONT) order.push(i);
    order.sort((a, b) => Math.abs(a - FRONT) - Math.abs(b - FRONT));
    let at = 0;
    let timer = 0;
    const pump = () => {
      for (let k = 0; k < 4 && at < order.length; k++, at++) preload(order[at]);
      if (at < order.length) timer = window.setTimeout(pump, 40);
    };
    pump();

    let inx = 0; // signed overflow past the frame, -1..1
    let ty = 0; // pointer from the frame's centre, for the lean
    let turn = 0; // rendered turn, -1..1 (of MAX degrees)
    let sx = 0;
    let sy = 0;
    let prev = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const ox = x < r.left ? x - r.left : x > r.right ? x - r.right : 0;
      const nx =
        ox < 0
          ? ox / Math.max(r.left, 64)
          : ox > 0
            ? ox / Math.max(window.innerWidth - r.right, 64)
            : 0;
      inx = clamp(nx, -1, 1);
      ty = clamp((y - (r.top + r.height / 2)) / (window.innerHeight / 2), -1, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const ease = (dt: number, tau: number) => 1 - Math.exp(-dt / tau);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = prev ? Math.min(0.064, (now - prev) / 1000) : 1 / 60;
      prev = now;

      const want = Math.abs(inx) < DEAD ? 0 : inx;
      turn += (want - turn) * ease(dt, Math.abs(want) > Math.abs(turn) ? RISE : FALL);
      if (Math.abs(turn) < 0.0015) turn = 0;

      const pos = FRONT + (turn * MAX) / STEP;
      draw(pos);

      // Depth: a small lean and a moving key light, in step with the pointer.
      const e = ease(dt, LEAN);
      sx += (turn - sx) * e;
      sy += (ty - sy) * e;
      el.style.setProperty("--x", sx.toFixed(4));
      el.style.setProperty("--y", sy.toFixed(4));
      if (light.current) {
        light.current.style.setProperty("--lx", `${(50 + sx * 46).toFixed(1)}%`);
        light.current.style.setProperty("--ly", `${(42 + sy * 40).toFixed(1)}%`);
      }
      if (readout.current) {
        const amount = Math.abs(turn);
        readout.current.textContent =
          turn === 0
            ? "· centre"
            : `· ${turn > 0 ? "right" : "left"} ${amount.toFixed(2)}`;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (timer) window.clearTimeout(timer);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[420px]">
      {/* Ambient light behind the frame, drifting against the lean. */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-[52px]"
        style={{
          background:
            "radial-gradient(58% 52% at 64% 28%, rgba(78,194,127,0.30), transparent 70%), radial-gradient(54% 48% at 28% 80%, rgba(126,214,164,0.20), transparent 72%)",
          transform: "translate3d(calc(var(--x, 0) * -16px), calc(var(--y, 0) * -12px), 0)",
        }}
      />

      <div style={{ perspective: "1200px" }}>
        <div
          ref={card}
          className="portrait-card relative aspect-[4/5] overflow-hidden rounded-[26px] border border-line bg-black"
          style={{
            transform: "rotateY(calc(var(--x, 0) * 5deg)) rotateX(calc(var(--y, 0) * -4deg))",
            boxShadow: "0 44px 90px -44px rgba(0,0,0,0.95)",
          }}
        >
          {/* The frame drifts a hair against the lean, which reads as depth. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              transform:
                "translate3d(calc(var(--x, 0) * -7px), calc(var(--y, 0) * -6px), 0) scale(1.05)",
            }}
          >
            <canvas
              ref={canvas}
              width={900}
              height={1125}
              className="absolute inset-0 size-full object-cover object-top"
            />
          </div>

          <div
            ref={light}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(300px circle at var(--lx, 50%) var(--ly, 42%), rgba(196,255,222,0.15), transparent 72%)",
              mixBlendMode: "soft-light",
            }}
          />

          {[
            "left-4 top-4 border-l border-t",
            "right-4 top-4 border-r border-t",
            "left-4 bottom-4 border-l border-b",
            "right-4 bottom-4 border-r border-b",
          ].map((c) => (
            <span key={c} aria-hidden="true" className={`absolute size-4 border-accent/60 ${c}`} />
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-black/70 px-4 py-2.5 font-mono text-xs text-muted">
            <span ref={readout} className="tabular-nums">
              · centre
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-accent" />
              Aim · Live
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-1 font-mono text-xs text-muted">
        <span>Fig. 01 — Portrait</span>
        <span>Follows your pointer</span>
      </div>
    </div>
  );
}