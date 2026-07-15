"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B0B0C] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          Sokkar<span className="text-[#D4AF37]">.</span>
        </Link>

        <div className="flex items-center gap-8">
          <a
            href="https://www.behance.net/amrelsokkary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/40 transition-colors hover:text-[#D4AF37]"
          >
            Behance
          </a>
          <a
            href="https://www.linkedin.com/in/amrelsokkary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/40 transition-colors hover:text-[#D4AF37]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
