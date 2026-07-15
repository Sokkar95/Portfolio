"use client"

import { motion } from "framer-motion"

const timeline = [
  { role: "Product Designer", company: "3arabawy", period: "Present" },
  { role: "Freelance UI/UX Designer", company: "", period: "2023 - Present" },
  { role: "Civil Engineer", company: "", period: "2020 - 2022" },
]

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-3xl font-bold tracking-tight text-white sm:mb-16 sm:text-4xl lg:text-5xl"
        >
          Structural Logic<span className="text-[#D4AF37]">.</span>
        </motion.h2>

        <div className="grid gap-10 sm:gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-base leading-relaxed text-white/50 sm:text-lg">
              Leveraging a unique multidisciplinary background that bridges civil
              engineering and digital design. With a foundation in structural
              analysis and construction, I bring a systematic, logic-driven approach
              to crafting user experiences. My transition from engineering to design
              allows me to approach problems with both analytical precision and
              creative intuition, ensuring every digital product is built on a solid
              structural foundation while delivering intuitive, user-centered
              interfaces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {timeline.map((item, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 sm:pb-6"
              >
                <div>
                  <h3 className="text-sm font-medium text-white sm:text-base">
                    {item.role}
                    {item.company && (
                      <span className="text-[#D4AF37]"> @ {item.company}</span>
                    )}
                  </h3>
                </div>
                <span className="shrink-0 text-xs text-white/40 sm:text-sm">{item.period}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
