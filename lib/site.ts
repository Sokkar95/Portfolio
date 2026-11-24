/**
 * Everything personal lives here. Change it once, the whole page follows.
 */
export const SITE = {
  name: "Amr Elsokkary",
  shortName: "Sokkar",
  role: "Product & UI/UX Designer",
  location: "Cairo, Egypt",
  email: "Amr_Elsokkary@yahoo.com",
  phone: "+20 100 123 9584",
  /** Digits only — used to build wa.me links. */
  whatsapp: "201001239584",
  behance: "https://www.behance.net/amrelsokkary",
  linkedin: "https://www.linkedin.com/in/amrelsokkary",
  facebook: "https://www.facebook.com/AmrHeshamElSokkary",
  instagram: "https://www.instagram.com/amrelsokary",
  url: "https://sokkar.vercel.app",
  resume: "/Amr-Elsokkary-Resume.pdf",
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const SOCIALS = [
  { label: "WhatsApp", href: waLink() },
  { label: "Behance", href: SITE.behance },
  { label: "LinkedIn", href: SITE.linkedin },
  { label: "Instagram", href: SITE.instagram },
  { label: "Facebook", href: SITE.facebook },
] as const;

export const STATS = [
  { k: "Designing Since", v: "2022" },
  { k: "Currently At", v: "3arabawy" },
  { k: "Based In", v: "Cairo, EG" },
] as const;

export const MARQUEE = [
  "Product Design",
  "UI/UX",
  "Design Systems",
  "UX Research",
  "Wireframing",
  "Prototyping",
  "Figma",
  "Next.js",
  "Tailwind CSS",
  "React",
  "Vercel",
  "ComfyUI",
  "AI Pipelines",
  "Vibe Coding",
] as const;

export const PROCESS = [
  {
    n: "01",
    title: "Analyze",
    text: "Study the load first: users, goals, constraints and the business sitting behind the product.",
  },
  {
    n: "02",
    title: "Structure",
    text: "Lay the framework — information architecture, user flows and wireframes that hold weight.",
  },
  {
    n: "03",
    title: "Design",
    text: "Build the visible layer on a real design system, from tokens and components to final UI.",
  },
  {
    n: "04",
    title: "Ship & Test",
    text: "Prototype, test with real people, then ship it and reinforce whatever bends under load.",
  },
] as const;

export const TOOLKIT = [
  {
    group: "Design",
    items: [
      "Figma",
      "FigJam",
      "Design Systems",
      "UX Research",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
      "Handoff",
    ],
  },
  {
    group: "Build",
    items: ["Next.js", "Tailwind CSS", "React", "HTML & CSS", "JavaScript", "Git", "Vercel"],
  },
  {
    group: "AI & Content",
    items: [
      "Claude",
      "DeepSeek",
      "Hermes Agent",
      "Antigravity",
      "ComfyUI",
      "LTX 2",
      "ElevenLabs",
      "CapCut",
      "Figma MCP",
      "Open Code",
    ],
  },
] as const;

export const EXPERIENCE = [
  {
    role: "Product Designer",
    org: "3arabawy — Automotive Marketplace",
    period: "2024 — Present",
    note: "Owning the UI/UX lifecycle of the app and the responsive web build, plus a design system that keeps the brand consistent and hands off cleanly to developers.",
  },
  {
    role: "Freelance UI/UX Designer",
    org: "Independent",
    period: "2023 — Present",
    note: "User-centred work for mobile and web clients — including Sub Grid, a subscription-tracking app — with a Figma-to-code pipeline that ships straight to Vercel.",
  },
  {
    role: "Civil Engineer",
    org: "Construction & Structural",
    period: "2020 — 2022",
    note: "Where the structural instinct came from: reading load, sequence and constraints before drawing anything.",
  },
] as const;

export const EDUCATION = [
  {
    title: "Google UX Design Professional Certificate",
    org: "Coursera",
    year: "2023",
  },
  {
    title: "Frontend Cross-Platform Diploma",
    org: "ITI — Ismailia",
    year: "2022",
  },
  {
    title: "B.Sc. Civil Engineering",
    org: "HIET, Kafrelsheikh",
    year: "2013 — 2018",
  },
] as const;

export const FORM_SERVICES = [
  "Mobile App",
  "Website",
  "Design System",
  "UX Audit",
  "AI Automation",
  "Other",
] as const;
