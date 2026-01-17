"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { useRunwayMode } from "./runway-mode-provider"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  splitBy?: "chars" | "words" | "lines"
}

export function TextReveal({ children, className = "", delay = 0, splitBy = "words" }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const { isRunwayMode } = useRunwayMode()

  const items = splitBy === "chars" ? children.split("") : splitBy === "words" ? children.split(" ") : [children]

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isRunwayMode ? 0.08 : 0.04,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: isRunwayMode ? 1.2 : 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="flex flex-wrap">
        {items.map((item, index) => (
          <span key={index} className="overflow-hidden">
            <motion.span className="inline-block" variants={itemVariants}>
              {item}
              {splitBy === "words" && index < items.length - 1 && "\u00A0"}
            </motion.span>
          </span>
        ))}
      </div>
    </motion.div>
  )
}
