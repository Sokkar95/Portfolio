import { MARQUEE } from "@/lib/site";

/**
 * Infinite keyword strip. Two identical copies keep the -50% translate
 * seamless; CSS drives it, hover pauses it, reduced motion stops it.
 */
export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];

  return (
    <div className="marquee relative overflow-hidden border-y border-line py-5">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-6 pr-6 font-mono text-[11px] tracking-[0.16em] text-muted sm:text-xs"
          >
            {item}
            <span className="text-accent" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
