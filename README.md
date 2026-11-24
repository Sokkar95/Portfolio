# Amr Elsokkary — Portfolio

Dark-themed single-page portfolio built with **Next.js 16 (App Router)**, **React 19**,
**TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **Lucide React**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Structure

```
app/
  globals.css          # reset (@layer base), .hero-heading gradient, scrollbar
  layout.tsx           # Kanit font via next/font, metadata, viewport
  page.tsx             # section order + overflow-x: clip wrapper
components/
  HeroSection.tsx      # h-screen hero: nav, giant heading, magnet portrait, bottom bar
  Navbar.tsx           # About / Services / Projects / Contact
  MarqueeSection.tsx   # infinite scrolling word strip
  AboutSection.tsx     # gradient heading + word-by-word reveal
  ServicesSection.tsx  # white panel, rounded top, 4 numbered services
  ProjectsSection.tsx  # 3 sticky-stacking cards with scroll-linked scale
  Magnet.tsx           # cursor-attraction wrapper
  AnimatedText.tsx     # staggered word reveal on scroll into view
  ContactButton.tsx    # gradient pill
  LiveProjectButton.tsx# ghost pill -> Behance
  DownloadCVButton.tsx # ghost pill + Download icon -> /Resume.pdf
lib/site.ts            # email, Behance URL, resume path, nav links
public/images/         # portrait + 9 project screenshots
public/Resume.pdf
scripts/
  make-placeholders.mjs # regenerates the placeholder art
```

## Before you ship

The images and CV are **generated placeholders**, so the page renders correctly out of
the box. Replace them with real artwork — same filenames, same paths:

| File | Replace with |
| --- | --- |
| `public/images/my-avatar.png` | Portrait cut-out (transparent PNG looks best) |
| `public/images/3arabawy-{1,2,3}.png` | 3arabawy screens |
| `public/images/gfit-{1,2,3}.png` | G-Fit screens |
| `public/images/darak-{1,2,3}.png` | DARAK screens |
| `public/Resume.pdf` | The real CV |

Then update the two placeholders in `lib/site.ts`:

```ts
email: "amr.elsokkary@gmail.com",   // TODO
behance: "https://www.behance.net/" // TODO
```

Those feed the Contact button, the nav Contact link, and every "View on Behance" button.

## Notes on the implementation

- **Tailwind v4 cascade layers.** The global reset lives inside `@layer base` on purpose.
  Tailwind v4 emits utilities in `@layer utilities`, and *unlayered* declarations beat
  layered ones — an unlayered `* { margin: 0; padding: 0 }` silently kills every
  `p-*` / `m-*` / `gap-*` class on the page.
- **Sticky stacking.** Each project card sits in a `h-[145vh]` runway so the sticky
  child has real travel to pin with. If the runway is the same height as the card the
  cards scroll past instead of stacking.
- **Scroll-linked scale.** Cards scale with
  `useScroll` + `useTransform` using
  `targetScale = 1 - (totalCards - 1 - index) * 0.03`.
- **Magnet transitions.** `Magnet` accepts CSS-style shorthand
  (`"transform 0.3s ease-out"`) and parses it into a typed Framer Motion transition,
  which keeps the props readable while satisfying Framer Motion v13's stricter types.
- **Smooth anchor scrolling** comes from `scroll-behavior: smooth` in `globals.css`.
  `data-scroll-behavior="smooth"` is intentionally *not* set on `<html>`: in Next.js 16
  that attribute re-enables the legacy behaviour of force-resetting scroll on route
  changes, which is not wanted here.
