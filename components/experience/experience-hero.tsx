"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { AnimatedLine } from "@/components/animated-line"

export function ExperienceHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex items-center">
      {/* Background elements */}
      <motion.div
        className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ y }}
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-6 lg:px-12"
        style={{ y: useTransform(y, (v) => v * 0.5), opacity }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 inline-block font-mono text-sm tracking-wider text-secondary"
        >
          MY JOURNEY
        </motion.span>

        <TextReveal
          className="mb-8 max-w-4xl font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
          delay={0.3}
        >
          A timeline of growth, learning, and creation.
        </TextReveal>

        <AnimatedLine className="mb-8 w-32" delay={0.8} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-2xl text-lg text-muted-foreground"
        >
          From my first lines of code to building complex web applications, every step has been a learning opportunity.
        </motion.p>
      </motion.div>
    </section>
  )
}
