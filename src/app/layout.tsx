import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { MouseGlow } from "@/components/MouseGlow"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Ticker } from "@/components/Ticker"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sokkar",
  description: "Product Designer & Structural Thinker. Architecting intuitive, user-centric digital products.",
  icons: {
    icon: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <MouseGlow />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Ticker />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
