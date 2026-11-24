import type { Metadata } from "next";
import { HeadLab } from "@/components/HeadLab";

export const metadata: Metadata = {
  title: "Head lab — Amr Elsokkary",
  robots: { index: false, follow: false },
};

export default function HeadLabPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <p className="font-mono text-xs tracking-[0.14em] text-accent">Lab · 3D head</p>
      <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-tight">
        A real 3D head, turned by the pointer.
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        No video, no seeking, no cross-fade — the model simply rotates. Move the pointer across
        the frame, or press “Swing front ↔ side”, and watch the fps readout. The hero only ever
        needs the front-to-three-quarter arc, so the turn stops well before the back of the head.
      </p>

      <div className="mt-8">
        <HeadLab />
      </div>

      <dl className="mt-8 grid max-w-xl grid-cols-2 gap-4 border-t border-line pt-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-mono text-xs text-muted">Source</dt>
          <dd className="mt-1">WebGL · three.js</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-muted">Cost per frame</dt>
          <dd className="mt-1">One rotated mesh</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-muted">Model</dt>
          <dd className="mt-1">Placeholder</dd>
        </div>
      </dl>

      <p className="mt-6 max-w-xl font-mono text-[11px] leading-relaxed text-muted">
        Placeholder mesh: “Infinite” 3D head scan by Lee Perry-Smith, CC BY 3.0
        (www.ir-ltd.net), via the three.js examples. It stands in only to measure the feel; it
        gets replaced by a scan of Amr before anything ships.
      </p>
    </main>
  );
}