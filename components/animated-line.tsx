"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedLineProps {
  className?: string
  direction?: "horizontal" | "vertical"
  delay?: number
}

export function AnimatedLine({ className = "", direction = "horizontal", delay = 0 }: AnimatedLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className={direction === "horizontal" ? "h-px w-full bg-border" : "h-full w-px bg-border"}
        initial={{ scaleX: direction === "horizontal" ? 0 : 1, scaleY: direction === "vertical" ? 0 : 1 }}
        animate={isInView ? { scaleX: 1, scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay }}
        style={{ transformOrigin: direction === "horizontal" ? "left" : "top" }}
      />
    </div>
  )
}
