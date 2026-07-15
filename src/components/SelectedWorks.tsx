"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "3arabawy",
    category: "Mobile App",
    image: "/images/3arabawy.png",
    href: "https://play.google.com/store/apps/details?id=com.al3arabawy",
    gridClass: "md:col-span-1 md:row-span-2",
    minHeight: "min-h-[400px] md:min-h-[620px]",
  },
  {
    title: "Echo's Perfumes",
    category: "Landing Page",
    image: "/images/Echo.png",
    href: "https://www.behance.net/gallery/211122493/Echos-Perfume-(Landing-page)",
    gridClass: "md:col-span-1 md:row-span-1",
    minHeight: "min-h-[300px] md:min-h-[300px]",
  },
  {
    title: "G-Fit",
    category: "Gym Fitness App",
    image: "/images/G-fit.png",
    href: "https://www.behance.net/gallery/214813673/G-Fit-(Gym-Fitness)-App",
    gridClass: "md:col-span-1 md:row-span-1",
    minHeight: "min-h-[300px] md:min-h-[300px]",
  },
  {
    title: "Darak",
    category: "Real Estate App",
    image: "/images/Darak.png",
    href: "https://www.behance.net/gallery/213273195/Darak-Real-Estate-App-l-",
    gridClass: "md:col-span-1 md:row-span-1",
    minHeight: "min-h-[300px] md:min-h-[300px]",
  },
  {
    title: "Luna Academy",
    category: "Education Platform",
    image: "/images/Luna.png",
    href: "https://www.behance.net/gallery/202711925/-l-Luna-Academy",
    gridClass: "md:col-span-1 md:row-span-2",
    minHeight: "min-h-[400px] md:min-h-[620px]",
  },
  {
    title: "3rbia",
    category: "E-Commerce",
    image: "/images/3rbia.png",
    href: "https://www.behance.net/gallery/207859761/3arbiacom-l-",
    gridClass: "md:col-span-2 md:row-span-1",
    minHeight: "min-h-[300px] md:min-h-[300px]",
  },
]

export function SelectedWorks() {
  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-3xl font-bold tracking-tight text-white sm:mb-16 sm:text-4xl lg:text-5xl"
        >
          Selected Works<span className="text-[#D4AF37]">.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/5 ${project.minHeight} ${project.gridClass} cursor-pointer`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white sm:text-xl">{project.title}</h3>
                    <p className="mt-1 text-xs text-white/50 sm:text-sm">{project.category}</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black sm:h-10 sm:w-10">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
