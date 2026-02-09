"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { AnimatedLine } from "@/components/animated-line"

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex items-center pt-20">
      {/* Background elements */}
      <motion.div
        className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-3xl"
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
          ABOUT ME
        </motion.span>

        <TextReveal
          className="mb-8 max-w-4xl font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl"
          delay={0.3}
        >
          I craft digital experiences that blend aesthetics with functionality.
        </TextReveal>

        <AnimatedLine className="mb-8 w-32" delay={0.8} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl"
        >
          A passionate developer who believes in the power of beautiful, functional design. Every project is an
          opportunity to push boundaries and create something extraordinary.
        </motion.p>
      </motion.div>

      {/* Decorative scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="h-12 w-px bg-gradient-to-b from-border to-transparent"
        />
      </motion.div>
    </section>
  )
}
