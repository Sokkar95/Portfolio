export type MockupVariant =
  | "app"
  | "fitness"
  | "estate"
  | "perfume"
  | "course"
  | "shop"
  | "cinematic";

export type Palette = {
  bg: string;
  soft: string;
  accent: string;
  ink: string;
};

export type Mockup = {
  screen: "phone" | "web";
  variant: MockupVariant;
  palette: Palette;
};

export type Project = {
  id: string;
  title: string;
  /** e.g. "Landing Page", "Mobile App" */
  type: string;
  group: "live" | "design";
  summary: string;
  tags: string[];
  link: string;
  linkLabel: string;
  /**
   * The designed cover. It is the card's main image in the work grid; the
   * screenshots below stay the ones the preview modal shows.
   */
  cover: string;
  /** Real screenshots. When present they replace the generated mockup. */
  images?: string[];
  /** `object-position` for those screenshots, when the crop needs steering. */
  focus?: string;
  /**
   * How the preview modal frames the shots: `contain` shows the whole page,
   * `cover` fills the frame. Defaults to `contain`.
   */
  fit?: "cover" | "contain";
  /** Optional looping preview clip (muted, shown inside the preview frame). */
  video?: string;
  mockup?: Mockup;
  featured?: boolean;
};

/* ------------------------------------------------------------------ *
 * Recent work — the sites designed, built and shipped end to end.
 * ------------------------------------------------------------------ */
const LIVE: Project[] = [
  {
    id: "wejha",
    title: "Wejha — وِجهة",
    type: "Travel Platform",
    group: "live",
    summary:
      "An Arabic-first Umrah booking site: a seven-stop journey timeline, testimonial carousel, FAQ and a WhatsApp booking flow, in full RTL with an English locale.",
    tags: ["Next.js", "Tailwind CSS", "Motion", "Lenis", "AR / EN i18n"],
    link: "https://wejha-ten.vercel.app/ar",
    linkLabel: "Visit Wejha",
    cover: "/work/cover-wejha.webp",
    images: ["/work/wejha-01.webp", "/work/wejha-02.webp", "/work/wejha-03.webp"],
    featured: true,
  },
  {
    id: "al-atibaa",
    title: "Al-Atibaa Center",
    type: "Clinic Website",
    group: "live",
    summary:
      "A medical centre landing page with specialty grid, an interactive before / after comparison slider, doctor profiles and a WhatsApp appointment form.",
    tags: ["Next.js", "Tailwind CSS", "Motion", "RTL"],
    link: "https://al-atibaa.vercel.app",
    linkLabel: "Visit Al-Atibaa",
    cover: "/work/cover-al-atibaa.webp",
    images: ["/work/atibaa-01.webp", "/work/atibaa-02.webp", "/work/atibaa-03.webp"],
  },
  {
    id: "agentech",
    title: "Agentech",
    type: "Agency Website",
    group: "live",
    summary:
      "An AI automation agency site — service tracks, product showcase, five-step methodology, live pricing tiers and a WhatsApp lead form wired to GA4.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "GA4"],
    link: "https://agentech-lyart.vercel.app",
    linkLabel: "Visit Agentech",
    cover: "/work/cover-agenttech.webp",
    images: [
      "/work/agentech-01.webp",
      "/work/agentech-02.webp",
      "/work/agentech-03.webp",
    ],
  },
  {
    id: "noor-city",
    title: "Noor City",
    type: "Launch Experience",
    group: "live",
    summary:
      "A scroll-driven cinematic launch page for a smart-city development: a full-bleed video hero carrying seven scroll-synced panels with custom rAF timing.",
    tags: ["Next.js", "Scroll-driven video", "Custom rAF", "No libraries"],
    link: "https://noor-city.vercel.app",
    linkLabel: "Visit Noor City",
    cover: "/work/cover-noor-city.webp",
    images: ["/work/noor-01.webp"],
    video: "/work/noor-preview.mp4",
    featured: true,
  },
];

/* ------------------------------------------------------------------ *
 * Product & UI/UX work — case studies living on Behance / Google Play.
 * ------------------------------------------------------------------ */
const DESIGN: Project[] = [
  {
    id: "3arabawy",
    title: "3arabawy",
    type: "Mobile App",
    group: "design",
    summary:
      "Product design for a live Android marketplace in the automotive space — from user flows and ad spaces to credits payment screens, shipped end to end.",
    tags: ["Product Design", "UX Flows", "UI System"],
    link: "https://play.google.com/store/apps/details?id=com.al3arabawy",
    linkLabel: "View on Google Play",
    cover: "/work/cover-3arabawy.webp",
    images: ["/work/case-3arabawy.webp"],
    mockup: {
      screen: "phone",
      variant: "app",
      palette: { bg: "#14213D", soft: "#E8ECF4", accent: "#FCA311", ink: "#14213D" },
    },
  },
  {
    id: "gfit",
    title: "G-Fit",
    type: "Fitness App",
    group: "design",
    summary:
      "A gym and fitness app built around workouts, progress and daily motivation — I led the product design and mentored the junior UI team.",
    tags: ["Mobile App", "UI/UX", "Mentoring"],
    link: "https://www.behance.net/gallery/214813673/G-Fit-(Gym-Fitness)-App",
    linkLabel: "View on Behance",
    cover: "/work/cover-gfit.webp",
    images: ["/work/case-gfit.webp"],
    mockup: {
      screen: "phone",
      variant: "fitness",
      palette: { bg: "#0F1A12", soft: "#EAF5EA", accent: "#9AE65C", ink: "#0F1A12" },
    },
  },
  {
    id: "darak",
    title: "Darak",
    type: "Real Estate App",
    group: "design",
    summary:
      "A mobile-first real estate app for browsing, comparing and saving properties, designed so the listing itself does the selling.",
    tags: ["Mobile First", "UI/UX", "Property"],
    link: "https://www.behance.net/gallery/213273195/Darak-Real-Estate-App-l-",
    linkLabel: "View on Behance",
    cover: "/work/cover-darak.webp",
    images: ["/work/case-darak.webp"],
    mockup: {
      screen: "phone",
      variant: "estate",
      palette: { bg: "#16302C", soft: "#EEF3F1", accent: "#3FA796", ink: "#16302C" },
    },
  },
  {
    id: "echos",
    title: "Echo's Perfumes",
    type: "Landing Page",
    group: "design",
    summary:
      "A brand-led landing page for a perfume house — the whole thing is built to sell a scent you cannot smell, visually.",
    tags: ["Landing Page", "Visual Design", "Branding"],
    link: "https://www.behance.net/gallery/211122493/Echos-Perfume-(Landing-page)",
    linkLabel: "View on Behance",
    cover: "/work/cover-echos-perfumes.webp",
    images: ["/work/case-echos.webp"],
    fit: "cover",
    mockup: {
      screen: "web",
      variant: "perfume",
      palette: { bg: "#2B1E1A", soft: "#F3E9DC", accent: "#C08552", ink: "#2B1E1A" },
    },
  },
  {
    id: "luna",
    title: "Luna Academy",
    type: "Education Platform",
    group: "design",
    summary:
      "An online learning platform guided from UI architecture to a collaborative design process, with course discovery as the spine of the experience.",
    tags: ["Web Platform", "UI Architecture", "UI/UX"],
    link: "https://www.behance.net/gallery/202711925/-l-Luna-Academy",
    linkLabel: "View on Behance",
    cover: "/work/cover-luna-academy.webp",
    images: ["/work/case-luna.webp"],
    mockup: {
      screen: "web",
      variant: "course",
      palette: { bg: "#1E1B3A", soft: "#EEEAFB", accent: "#8C7BFF", ink: "#1E1B3A" },
    },
  },
  {
    id: "3rbia",
    title: "3rbia",
    type: "E-Commerce",
    group: "design",
    summary:
      "An e-commerce experience designed around fast browsing and a checkout short enough that people actually finish it.",
    tags: ["E-Commerce", "UI/UX", "Checkout"],
    link: "https://www.behance.net/gallery/207859761/3arbiacom-l-",
    linkLabel: "View on Behance",
    cover: "/work/cover-3rbia.webp",
    images: ["/work/case-3rbia.webp"],
    mockup: {
      screen: "web",
      variant: "shop",
      palette: { bg: "#3A1420", soft: "#FBEDEF", accent: "#E5484D", ink: "#3A1420" },
    },
  },
];

export const PROJECTS: Project[] = [...LIVE, ...DESIGN];

export const GROUPS = [
  {
    id: "live" as const,
    label: "Recent Work",
    blurb: "Designed, built and shipped — live sites you can open right now.",
    items: LIVE,
  },
  {
    id: "design" as const,
    label: "Product & UI/UX",
    blurb: "Case studies in product design, mobile UI and design systems.",
    items: DESIGN,
  },
];

export const FILTERS = [
  { id: "all" as const, label: "All Work", count: PROJECTS.length },
  { id: "live" as const, label: "Live Sites", count: LIVE.length },
  { id: "design" as const, label: "Product Design", count: DESIGN.length },
];