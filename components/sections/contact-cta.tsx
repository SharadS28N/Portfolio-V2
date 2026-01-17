"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedLine } from "@/components/animated-line"
import Link from "next/link"

export function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-24 md:py-32 lg:py-48">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/20 sm:h-[600px] sm:w-[600px] lg:h-[800px] lg:w-[800px]" />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/20 sm:h-[450px] sm:w-[450px] lg:h-[600px] lg:w-[600px]" />

      <motion.div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-12" style={{ scale, opacity }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-block font-mono text-xs tracking-wider text-secondary sm:mb-8 sm:text-sm"
        >
          LET&apos;S WORK TOGETHER
        </motion.span>

        <TextReveal
          className="mb-6 font-serif text-3xl font-bold leading-tight text-foreground sm:mb-8 sm:text-4xl md:text-5xl lg:text-6xl"
          delay={0.2}
        >
          Have a project in mind?
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-8 max-w-xl text-base text-muted-foreground sm:mb-12 sm:text-lg"
        >
          I&apos;m always open to discussing new opportunities, creative ideas, or partnerships.
        </motion.p>

        <AnimatedLine className="mx-auto mb-8 w-16 sm:mb-12 sm:w-24" delay={0.5} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MagneticButton strength={0.2}>
            <Link
              href="/contact"
              data-cursor="hover"
              data-cursor-text="Contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 sm:gap-3 sm:px-8 sm:py-4 sm:text-lg"
            >
              Start a Conversation
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
