"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedLine } from "@/components/animated-line"
import { useRunwayMode } from "@/components/runway-mode-provider"
import Link from "next/link"
import { ArrowDown, Github, Linkedin, Sparkles } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  const { isRunwayMode } = useRunwayMode()

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const [konamiIndex, setKonamiIndex] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  const [aiBuffer, setAiBuffer] = useState("")
  const [showAiEgg, setShowAiEgg] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return

      // Konami code check
      if (e.code === konamiCode[konamiIndex]) {
        const newIndex = konamiIndex + 1
        setKonamiIndex(newIndex)
        if (newIndex === konamiCode.length) {
          setShowEasterEgg(true)
          setKonamiIndex(0)
          setTimeout(() => setShowEasterEgg(false), 4000)
        }
      } else {
        setKonamiIndex(0)
      }

      const newBuffer = (aiBuffer + e.key.toLowerCase()).slice(-2)
      setAiBuffer(newBuffer)
      if (newBuffer === "ai") {
        setShowAiEgg(true)
        setAiBuffer("")
        setTimeout(() => setShowAiEgg(false), 4000)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiIndex, aiBuffer])

  return (
    <section ref={containerRef} className="relative min-h-[100svh] overflow-hidden">
      {/* Background gradient - removed moving squares */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-card"
        aria-hidden="true"
      />

      <div
        className="absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-3xl md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-10 bottom-1/4 h-[200px] w-[200px] rounded-full bg-primary/5 blur-3xl md:-left-20 md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px]"
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div
        className="relative flex min-h-[100svh] flex-col justify-center px-4 pb-20 pt-24 sm:px-6 md:pb-24 lg:px-12"
        style={{ y, opacity, scale }}
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isRunwayMode ? 1.2 : 0.8, delay: 0.2 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <span className="font-mono text-xs tracking-wider text-muted-foreground sm:text-sm">HELLO, I&apos;M</span>
          </motion.div>

          {/* Name */}
          <div className="mb-4 sm:mb-6">
            <TextReveal
              className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
              delay={0.3}
            >
              Sharad
            </TextReveal>
            <TextReveal
              className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
              delay={0.5}
            >
              Bhandari
            </TextReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isRunwayMode ? 1.2 : 0.8, delay: 0.8 }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <AnimatedLine className="mb-4 w-16 sm:mb-6 sm:w-24" delay={1} />
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-xl lg:text-xl">
              Creative Full-Stack Developer & AI Enthusiast at{" "}
              <span className="text-primary">Softwarica College of IT</span>. Building intelligent digital experiences
              where modern web technologies meet artificial intelligence.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isRunwayMode ? 1.2 : 0.8, delay: 1 }}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <MagneticButton>
              <Link
                href="/projects"
                data-cursor="hover"
                data-cursor-text="View"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 sm:w-auto sm:px-6 sm:py-3"
              >
                Explore Work
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/contact"
                data-cursor="hover"
                data-cursor-text="Say Hi"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:w-auto sm:px-6 sm:py-3"
              >
                Get in Touch
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 flex items-center gap-4 sm:mt-12 sm:gap-6 md:mt-16"
          >
            <a
              href="https://github.com/sharads28n"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:h-auto sm:w-auto sm:border-0"
              data-cursor="hover"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/SharadS28N/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:h-auto sm:w-auto sm:border-0"
              data-cursor="hover"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:bottom-8 sm:block md:bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
            aria-hidden="true"
          >
            <span className="font-mono text-xs tracking-wider">SCROLL</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Easter egg unlocked"
          >
            <div className="px-4 text-center">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="mb-4 font-mono text-4xl sm:text-6xl"
              >
                {"</>"}
              </motion.div>
              <p className="font-serif text-xl text-primary sm:text-2xl">Achievement Unlocked!</p>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">You know the Konami code?</p>
              <p className="mt-1 font-mono text-xs text-secondary">+100 Developer Points</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAiEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="AI easter egg unlocked"
          >
            <div className="px-4 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: 1, ease: "linear" }}
                className="mb-4 text-5xl sm:text-7xl"
              >
                🤖
              </motion.div>
              <p className="font-serif text-xl text-primary sm:text-2xl">AI Enthusiast Detected!</p>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">Beep boop! You found me.</p>
              <p className="mt-1 font-mono text-xs text-secondary">+50 Neural Network Points</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
