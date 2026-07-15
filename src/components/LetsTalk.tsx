"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"

export function LetsTalk() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const buttonX = useTransform(mouseX, [-200, 200], [-15, 15])
  const buttonY = useTransform(mouseY, [-200, 200], [-10, 10])

  return (
    <section id="contact" className="py-20 sm:py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/40 sm:mb-6 sm:text-sm">
            Got a vision?
          </span>
          <h2 className="mb-12 text-4xl font-bold leading-tight tracking-tight text-white sm:mb-16 sm:text-6xl lg:text-8xl">
            Let&apos;s build<br className="sm:hidden" /> the system.
          </h2>
          <motion.a
            href="mailto:sokary32@gmail.com"
            style={{ x: buttonX, y: buttonY }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-6 rounded-full bg-[#D4AF37] px-10 py-4 text-sm font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#D4AF37]/90 sm:px-14 sm:py-5 sm:text-base"
          >
            Start a Project
          </motion.a>
          <span className="text-xs text-white/30 sm:text-sm">
            sokary32@gmail.com
          </span>
        </motion.div>
      </div>
    </section>
  )
}
