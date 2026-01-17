"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedLine } from "@/components/animated-line"
import { useRunwayMode } from "@/components/runway-mode-provider"
import Link from "next/link"
import { Brain } from "lucide-react"

export function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { isRunwayMode } = useRunwayMode()

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-card py-20 sm:py-24 md:py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Text - removed parallax style */}
          <div className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isRunwayMode ? 1.2 : 0.8 }}
              className="mb-3 font-mono text-xs tracking-wider text-secondary sm:mb-4 sm:text-sm"
            >
              ABOUT ME
            </motion.span>

            <TextReveal
              className="mb-6 font-serif text-2xl font-bold leading-snug text-foreground sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl"
              delay={0.1}
            >
              Crafting intelligent digital experiences.
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isRunwayMode ? 1.2 : 0.8, delay: 0.3 }}
              className="mb-6 text-base leading-relaxed text-muted-foreground sm:mb-8 sm:text-lg"
            >
              I&apos;m a passionate developer studying AI at Softwarica College of IT & E-Commerce. I blend modern web
              technologies with artificial intelligence to create experiences that are not just beautiful, but
              intelligent.
            </motion.p>

            <AnimatedLine className="mb-6 w-full sm:mb-8" delay={0.4} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <MagneticButton>
                <Link
                  href="/about"
                  data-cursor="hover"
                  data-cursor-text="More"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 hover:text-foreground"
                >
                  Read my full story
                  <span>→</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column - Visual - removed parallax style */}
          <div className="relative order-first lg:order-last">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-lg bg-muted lg:max-w-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="relative h-full w-full"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-48 w-48 rounded-full border border-border/30 sm:h-64 sm:w-64 lg:h-80 lg:w-80" />
                    <div className="absolute h-36 w-36 rounded-full border border-secondary/50 sm:h-48 sm:w-48 lg:h-64 lg:w-64" />
                    <motion.div
                      className="absolute h-24 w-24 rounded-full bg-secondary/20 sm:h-32 sm:w-32 lg:h-48 lg:w-48"
                      animate={isRunwayMode ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <img
                      src="/profile-pic.jpg"
                      alt="Profile"
                      className="absolute h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32 lg:h-48 lg:w-48"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-4 left-4 rounded-lg bg-background p-3 shadow-xl sm:bottom-8 sm:-left-4 sm:p-4 lg:-left-8"
            >
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-secondary" />
                <div className="font-mono text-[10px] text-muted-foreground sm:text-xs">FOCUS</div>
              </div>
              <div className="font-serif text-lg font-bold text-primary sm:text-xl">AI + Web Dev</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
