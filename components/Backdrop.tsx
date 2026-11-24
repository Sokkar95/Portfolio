"use client";

import { useEffect, useRef } from "react";

/**
 * The page backdrop: two drifting glows, a soft dot field, film grain and a
 * light that trails the cursor. Far quieter than hard grid lines, and it
 * follows the palette of the portrait (green key light, mint fill light).
 */
export function Backdrop() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spot.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.35;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      x += (tx - x) * 0.075;
      y += (ty - y) * 0.075;
      // Whole pixels only: no sub-pixel repaints, and the eye cannot see the
      // difference on a glow this soft.
      el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Two soft glows. No blur() — the radial gradients already fade to
          nothing, and blurring an element this large repaints the whole
          layer every frame. */}
      <div
        className="glow-a absolute -top-[24%] right-[-14%] h-[64vh] w-[64vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(78,194,127,0.22), transparent 68%)" }}
      />
      <div
        className="glow-b absolute bottom-[-28%] left-[-16%] h-[64vh] w-[64vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(126,214,164,0.16), transparent 68%)" }}
      />

      {/* The cursor light: a fixed-size disc moved with `transform`, so the
          GPU composites it instead of repainting a full-screen gradient. */}
      <div
        ref={spot}
        className="absolute left-0 top-0 size-[680px] will-change-transform"
        style={{
          marginLeft: -340,
          marginTop: -340,
          background: "radial-gradient(circle, rgba(178,255,212,0.10), transparent 62%)",
          transform: "translate3d(0, 0, 0)",
        }}
      />

      <div className="bg-dots absolute inset-0" />
      <div className="bg-grain absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(135% 105% at 50% 0%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
