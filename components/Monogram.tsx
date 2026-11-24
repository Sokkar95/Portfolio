/**
 * The "AE" mark — the same drawing as the favicon (app/icon.svg), so the logo
 * beside the name in the header and the browser-tab icon are one and the same.
 * Colours come from the theme tokens, so it follows the palette.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Amr Elsokkary">
      <rect width="64" height="64" rx="15" fill="var(--surface-2)" />
      <rect
        x="1.1"
        y="1.1"
        width="61.8"
        height="61.8"
        rx="14"
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.34"
        strokeWidth="1.4"
      />
      <g
        fill="none"
        stroke="var(--accent)"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.6 45.2 L22 18.6 L31.4 45.2" />
        <path d="M16.7 35.7 H27.3" />
        <path d="M38.6 18.6 V45.2" />
        <path d="M38.6 18.6 H50.4" />
        <path d="M38.6 31.9 H47.6" />
        <path d="M38.6 45.2 H50.4" />
      </g>
    </svg>
  );
}
