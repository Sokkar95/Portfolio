"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Download } from "lucide-react"

export function Hero() {
  return (
    <section id="process" className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#D4AF37]">
            Product Designer | Structural Thinker
          </span>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl">
            Amr Elsokkary
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-white/50">
            Architecting intuitive, user-centric digital products. Merging civil
            engineering logic with advanced design systems to build seamless
            software.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="https://www.behance.net/amrelsokkary"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#D4AF37]/90"
            >
              View Projects
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/Resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Download CV
              <Download size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
