"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { AnimatedLine } from "@/components/animated-line"

export function ContactHero() {
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
        className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl"
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
          GET IN TOUCH
        </motion.span>

        <TextReveal
          className="mb-8 max-w-4xl font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
          delay={0.3}
        >
          Let&apos;s create something extraordinary together.
        </TextReveal>

        <AnimatedLine className="mb-8 w-32" delay={0.8} />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-2xl text-lg text-muted-foreground"
        >
          Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how we can
          work together.
        </motion.p>
      </motion.div>
    </section>
  )
}
