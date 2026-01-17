"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SecretZone() {
  const [isHovered, setIsHovered] = useState(false)
  const [hoverTime, setHoverTime] = useState(0)
  const [showSecret, setShowSecret] = useState(false)

  // Easter egg: Hover in the corner for 3 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isHovered) {
      interval = setInterval(() => {
        setHoverTime((t) => {
          if (t >= 3) {
            setShowSecret(true)
            setTimeout(() => setShowSecret(false), 3000)
            return 0
          }
          return t + 0.1
        })
      }, 100)
    } else {
      setHoverTime(0)
    }
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <>
      {/* Secret hover zone in bottom-right corner */}
      <div
        className="fixed bottom-0 right-0 z-40 h-20 w-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Progress indicator */}
        {isHovered && hoverTime > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 right-4 h-2 w-12 overflow-hidden rounded-full bg-border"
          >
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(hoverTime / 3) * 100}%` }}
            />
          </motion.div>
        )}
      </div>

      {/* Secret message */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 rounded-lg border border-primary/50 bg-background/90 p-4 backdrop-blur-sm"
          >
            <p className="font-serif text-sm text-primary">You found the secret corner!</p>
            <p className="mt-1 text-xs text-muted-foreground">Patient explorers are always rewarded.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
