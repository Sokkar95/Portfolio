"use client"

import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "./ThemeProvider"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-[#0B0B0C]/80 dark:bg-[#0B0B0C]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          Sokkar<span className="text-[#D4AF37]">.</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="text-sm font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-[#D4AF37]">
            Projects
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="text-sm font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-[#D4AF37]">
            About
          </a>
          <a href="#process" onClick={(e) => handleNavClick(e, "#process")} className="text-sm font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-[#D4AF37]">
            Process
          </a>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:text-[#D4AF37]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="mailto:sokary32@gmail.com"
            className="rounded-full bg-[#D4AF37] px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#D4AF37]/90"
          >
            Let&apos;s Talk
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-[#0B0B0C]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="text-sm font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-[#D4AF37]">
                Projects
              </a>
              <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="text-sm font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-[#D4AF37]">
                About
              </a>
              <a href="#process" onClick={(e) => handleNavClick(e, "#process")} className="text-sm font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-[#D4AF37]">
                Process
              </a>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggle}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <a
                  href="mailto:sokary32@gmail.com"
                  className="rounded-full bg-[#D4AF37] px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-black"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
