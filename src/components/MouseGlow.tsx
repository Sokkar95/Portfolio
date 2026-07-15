"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "./ThemeProvider"

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  if (theme === "light") {
    return (
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-50 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px] transition-[left,top] duration-150 ease-out bg-[#D4AF37] sm:block"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-50 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px] transition-[left,top] duration-150 ease-out bg-white"
      aria-hidden="true"
    />
  )
}
