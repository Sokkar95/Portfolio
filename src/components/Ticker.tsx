"use client"

export function Ticker() {
  const items = [
    "CODE",
    "COMFYUI",
    "VIBE CODING",
    "FIGMA",
    "FIGMA MCP",
    "COMFYUI",
  ]

  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div className="overflow-hidden border-y border-white/5 bg-[#0B0B0C] py-4">
      <div className="ticker flex w-max gap-8">
        {repeated.map((item, i) => (
          <span key={i} className="ticker-item flex items-center gap-8 whitespace-nowrap text-sm font-medium uppercase tracking-widest text-white/30">
            {item}
            <span className="text-[#D4AF37]">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
