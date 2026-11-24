import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { SITE } from "@/lib/site";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "Amr Elsokkary — Product & UI/UX Designer";
const description =
  "Product & UI/UX designer in Egypt. I design and ship digital products — interfaces, design systems and full websites — from the first wireframe to the live deploy.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s — Amr Elsokkary",
  },
  description,
  keywords: [
    "Amr Elsokkary",
    "Sokkar",
    "Product Designer",
    "UI/UX Designer",
    "Design Systems",
    "Figma",
    "Next.js",
    "Vibe Coding",
    "Egypt",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title,
    description,
    images: [
      {
        url: "/images/og.webp",
        width: 1200,
        height: 630,
        alt: "Amr Elsokkary — Product & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${grotesk.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <body>
        {/* Marks that scripting is on, so the reveal states can stay inert
            (and every block stays visible) when it is off. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
