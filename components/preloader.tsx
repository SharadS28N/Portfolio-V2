"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Variable speed for more realistic feel
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 100)

    // Minimum display time + wait for document ready
    const minDisplayTime = new Promise((resolve) => setTimeout(resolve, 2000))
    const documentReady = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve(true)
      } else {
        window.addEventListener("load", () => resolve(true))
      }
    })

    Promise.all([minDisplayTime, documentReady]).then(() => {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 500)
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -right-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated logo */}
            <motion.div className="relative mb-12">
              {/* Orbiting circles */}
              <motion.div
                className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/30 md:h-40 md:w-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/40 md:h-32 md:w-32"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 md:h-24 md:w-24"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              {/* Logo letters */}
              <div className="relative flex items-center justify-center">
                <motion.span
                  className="font-serif text-5xl font-bold text-primary md:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  S
                </motion.span>
                <motion.span
                  className="font-serif text-5xl font-bold text-foreground md:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  B
                </motion.span>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="relative w-48 md:w-64">
              <div className="h-px w-full bg-border">
                <motion.div
                  className="h-full bg-gradient-to-r from-secondary to-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Progress text */}
              <motion.div
                className="mt-4 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="font-mono text-xs tracking-wider text-muted-foreground">LOADING</span>
                <span className="font-mono text-xs text-primary">{Math.round(progress)}%</span>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.p
              className="mt-8 font-serif text-sm italic text-muted-foreground md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Crafting digital experiences
            </motion.p>
          </div>

          {/* Animated lines */}
          <div className="absolute inset-x-0 bottom-0 h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
