"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const greetings = [
  "Hello",
  "नमस्ते",
  "你好",
  "Bonjour",
  "Hola",
  "こんにちは",
  "안녕하세요",
  "مرحبا",
]

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0)

  useEffect(() => {
    // Cycle through greetings - 500ms per greeting so users can read each one
    const greetingInterval = setInterval(() => {
      setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length)
    }, 500)

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Variable speed for more realistic feel
        const increment = Math.random() * 10 + 3
        return Math.min(prev + increment, 100)
      })
    }, 150)

    // Minimum display time of 4 seconds to show all greetings + wait for document ready
    const minDisplayTime = new Promise((resolve) => setTimeout(resolve, 4000))
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

    return () => {
      clearInterval(interval)
      clearInterval(greetingInterval)
    }
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
            {/* Multilingual greeting text */}
            <motion.div
              className="mb-8 h-20 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentGreetingIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                  className="block font-serif text-5xl font-bold text-primary md:text-6xl lg:text-7xl"
                >
                  {greetings[currentGreetingIndex]}
                </motion.span>
              </AnimatePresence>
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
              className="mt-8 font-serif text-base italic text-muted-foreground md:text-lg"
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


