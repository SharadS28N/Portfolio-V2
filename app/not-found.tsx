"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Link from "next/link"
import { MagneticButton } from "@/components/magnetic-button"
import { Home, ArrowLeft, Sparkles, Gamepad2 } from "lucide-react"

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [clickCount, setClickCount] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [gameMode, setGameMode] = useState(false)
  const [score, setScore] = useState(0)

  // Mouse following gradient
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - 300)
        mouseY.set(e.clientY - rect.top - 300)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Easter egg: Click the 4s 4 times
  useEffect(() => {
    if (clickCount >= 4) {
      setShowSecret(true)
      setTimeout(() => {
        setShowSecret(false)
        setClickCount(0)
      }, 3000)
    }
  }, [clickCount])

  const triggerGlitch = () => {
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 500)
  }

  const handleParticleClick = () => {
    if (gameMode) {
      setScore((s) => s + 1)
    }
  }

  return (
    <main ref={containerRef} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Animated background gradient that follows mouse */}
      <motion.div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-secondary/10 blur-3xl"
        style={{ x: springX, y: springY }}
      />

      {/* Floating particles - now clickable in game mode */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            onClick={handleParticleClick}
            className={`absolute h-2 w-2 rounded-full ${gameMode ? "cursor-pointer bg-primary hover:scale-150" : "bg-primary/30"}`}
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 800,
            }}
            animate={{
              y: [null, Math.random() * -500],
              x: gameMode ? [null, Math.random() * 200 - 100] : undefined,
              opacity: [0.3, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 text-center sm:px-6">
        {/* Game mode toggle */}
        {gameMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-primary px-4 py-2 font-mono text-sm text-primary-foreground"
          >
            Score: {score}
          </motion.div>
        )}

        {/* 404 Number - improved responsive sizing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-6 select-none sm:mb-8"
          onMouseEnter={triggerGlitch}
        >
          <span
            onClick={() => setClickCount((c) => c + 1)}
            className={`cursor-pointer font-serif text-[100px] font-bold leading-none text-foreground/10 transition-all duration-300 hover:text-foreground/20 sm:text-[150px] md:text-[200px] lg:text-[250px] ${isGlitching ? "animate-pulse text-destructive/20" : ""}`}
          >
            4
          </span>
          <motion.span
            className={`font-serif text-[100px] font-bold leading-none text-primary sm:text-[150px] md:text-[200px] lg:text-[250px] ${isGlitching ? "animate-bounce" : ""}`}
            animate={{ rotate: isGlitching ? [0, 10, -10, 0] : [0, 10, -10, 0] }}
            transition={{
              duration: isGlitching ? 0.2 : 2,
              repeat: isGlitching ? 2 : Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            0
          </motion.span>
          <span
            onClick={() => setClickCount((c) => c + 1)}
            className={`cursor-pointer font-serif text-[100px] font-bold leading-none text-foreground/10 transition-all duration-300 hover:text-foreground/20 sm:text-[150px] md:text-[200px] lg:text-[250px] ${isGlitching ? "animate-pulse text-destructive/20" : ""}`}
          >
            4
          </span>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="mb-3 font-serif text-2xl font-bold text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
            Page Not Found
          </h1>
          <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground sm:mb-8 sm:text-base">
            The page you&apos;re looking for seems to have wandered off into the digital void. Let&apos;s get you back
            on track.
          </p>
        </motion.div>

        {/* Action buttons - improved mobile layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 sm:w-auto sm:px-6 sm:py-3"
              data-cursor="hover"
              data-cursor-text="Home"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </MagneticButton>

          <MagneticButton>
            <button
              onClick={() => window.history.back()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 font-medium text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:w-auto sm:px-6 sm:py-3"
              data-cursor="hover"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </MagneticButton>
        </motion.div>

        {/* Easter egg hints and game toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-10 space-y-3 sm:mt-12"
        >
          <p className="font-mono text-xs text-muted-foreground/50">Hint: Click the 4s four times...</p>
          <button
            onClick={() => {
              setGameMode(!gameMode)
              setScore(0)
            }}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground/50 transition-colors hover:text-primary"
          >
            <Gamepad2 className="h-3 w-3" />
            {gameMode ? "Exit mini-game" : "Bored? Try the mini-game"}
          </button>
        </motion.div>
      </div>

      {/* Secret Easter Egg */}
      {showSecret && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
        >
          <div className="px-4 text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <Sparkles className="mx-auto mb-4 h-12 w-12 text-primary sm:h-16 sm:w-16" />
            </motion.div>
            <p className="font-serif text-xl text-primary sm:text-2xl">You found the 404 secret!</p>
            <p className="mt-2 text-sm text-muted-foreground">You&apos;re officially a curious explorer.</p>
          </div>
        </motion.div>
      )}
    </main>
  )
}
