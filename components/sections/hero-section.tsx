"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedLine } from "@/components/animated-line"
import { useRunwayMode } from "@/components/runway-mode-provider"
import Link from "next/link"
import { ArrowDown, Github, Linkedin } from "lucide-react"
import Spline from "@splinetool/react-spline"

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
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-card"
        aria-hidden="true"
      />

      {/* Ambient blobs */}
      <div
        className="absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-3xl md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-10 bottom-1/4 h-[200px] w-[200px] rounded-full bg-primary/5 blur-3xl md:-left-20 md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px]"
        aria-hidden="true"
      />

      {/* ===================== */}
      {/* Right-side Spline Model (Desktop only) */}
      {/* ===================== */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[45%] lg:block">
        <Spline
          scene="https://prod.spline.design/MS43BsE7W7d7eqL7/scene.splinecode"
          className="h-full w-full"
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative flex min-h-[100svh] flex-col justify-center px-4 pb-20 pt-24 sm:px-6 md:pb-24 lg:px-12"
        style={{ y, opacity, scale }}
      >
        <div className="mx-auto w-full max-w-7xl lg:pr-[40%]">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isRunwayMode ? 1.2 : 0.8, delay: 0.2 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <span className="font-mono text-xs tracking-wider text-muted-foreground sm:text-sm">
              HELLO, I&apos;M
            </span>
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

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isRunwayMode ? 1.2 : 0.8, delay: 0.8 }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <AnimatedLine className="mb-4 w-16 sm:mb-6 sm:w-24" delay={1} />
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-xl lg:text-xl">
              Creative Full-Stack Developer & AI Enthusiast pursuing{" "}
              <span className="text-primary">BSc (Hons) Computing with AI</span> at Softwarica College / Coventry University. Building intelligent digital
              experiences where modern web technologies meet artificial intelligence.
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
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 sm:w-auto sm:px-6 sm:py-3"
              >
                Explore Work
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/contact"
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
              href="https://github.com/SharadS28N"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/SharadS28N/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
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
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="font-mono text-xs tracking-wider">SCROLL</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Easter Eggs (unchanged) */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="mb-4 font-mono text-6xl">{"</>"}</div>
              <p className="font-serif text-2xl text-primary">Achievement Unlocked!</p>
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
          >
            <div className="text-center">
              <div className="mb-4 text-6xl">🤖</div>
              <p className="font-serif text-2xl text-primary">AI Enthusiast Detected!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
