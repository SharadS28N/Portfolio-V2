"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RunwayModeContextType {
  isRunwayMode: boolean
  toggleRunwayMode: () => void
}

const RunwayModeContext = createContext<RunwayModeContextType | undefined>(undefined)

export function RunwayModeProvider({ children }: { children: ReactNode }) {
  const [isRunwayMode, setIsRunwayMode] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const toggleRunwayMode = () => {
    setIsRunwayMode((prev) => !prev)
    setShowToast(true)
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  return (
    <RunwayModeContext.Provider value={{ isRunwayMode, toggleRunwayMode }}>
      {children}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-[100] rounded-full border border-border bg-card px-6 py-3 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={isRunwayMode ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
                className={`h-2 w-2 rounded-full ${isRunwayMode ? "bg-primary" : "bg-muted-foreground"}`}
              />
              <span className="font-mono text-sm text-foreground">Runway Mode {isRunwayMode ? "ON" : "OFF"}</span>
              {isRunwayMode && <span className="text-xs text-muted-foreground">Press R to toggle</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </RunwayModeContext.Provider>
  )
}

export function useRunwayMode() {
  const context = useContext(RunwayModeContext)
  if (context === undefined) {
    throw new Error("useRunwayMode must be used within a RunwayModeProvider")
  }
  return context
}
