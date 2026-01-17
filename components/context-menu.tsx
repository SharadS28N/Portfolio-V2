"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRunwayMode } from "./runway-mode-provider"
import { RefreshCw, Home, User, FolderKanban, Mail, Zap, Github, Copy, ArrowUp, Music, Sparkles } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

interface MenuItem {
  label: string
  icon: React.ReactNode
  action: () => void
  shortcut?: string
  divider?: boolean
}

export function ContextMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { isRunwayMode, toggleRunwayMode } = useRunwayMode()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleContextMenu = useCallback((e: MouseEvent) => {
    if (window.innerWidth < 1024) return

    e.preventDefault()

    const menuWidth = 220
    const menuHeight = 320
    let x = e.clientX
    let y = e.clientY

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10
    }

    setPosition({ x, y })
    setIsOpen(true)
  }, [])

  const handleClick = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("click", handleClick)
    }
  }, [handleContextMenu, handleClick])

  const refreshPage = () => {
    window.location.reload()
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href)
    showToast("URL copied!")
  }

  const showToast = (message: string) => {
    const toast = document.createElement("div")
    toast.className =
      "fixed bottom-4 right-4 bg-card border border-border px-4 py-2 rounded-lg text-sm z-[200] animate-in fade-in slide-in-from-bottom-2"
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 2000)
  }

  const triggerEasterEgg = () => {
    const overlay = document.createElement("div")
    overlay.className = "fixed inset-0 z-[300] pointer-events-none flex items-center justify-center"
    overlay.innerHTML = `
      <div class="text-6xl animate-bounce">
        <span class="inline-block animate-spin" style="animation-duration: 0.5s;">🎉</span>
        <span class="inline-block animate-pulse">🚀</span>
        <span class="inline-block animate-spin" style="animation-duration: 0.7s;">✨</span>
      </div>
    `
    document.body.appendChild(overlay)
    setTimeout(() => overlay.remove(), 2000)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
        showToast("Jazz paused")
      } else {
        audioRef.current.play().catch(() => {
          showToast("Click again to play")
        })
        showToast("Playing jazz...")
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  const menuItems: MenuItem[] = [
    {
      label: "Refresh",
      icon: <RefreshCw size={14} />,
      action: refreshPage,
      shortcut: "F5",
    },
    {
      label: "Back to Top",
      icon: <ArrowUp size={14} />,
      action: scrollToTop,
      divider: true,
    },
    {
      label: "Home",
      icon: <Home size={14} />,
      action: () => router.push("/"),
      shortcut: pathname === "/" ? "•" : undefined,
    },
    {
      label: "About",
      icon: <User size={14} />,
      action: () => router.push("/about"),
      shortcut: pathname === "/about" ? "•" : undefined,
    },
    {
      label: "Projects",
      icon: <FolderKanban size={14} />,
      action: () => router.push("/projects"),
      shortcut: pathname === "/projects" ? "•" : undefined,
    },
    {
      label: "Contact",
      icon: <Mail size={14} />,
      action: () => router.push("/contact"),
      shortcut: pathname === "/contact" ? "•" : undefined,
      divider: true,
    },
    {
      label: isRunwayMode ? "Runway: ON" : "Runway: OFF",
      icon: <Zap size={14} className={isRunwayMode ? "text-yellow-500" : ""} />,
      action: toggleRunwayMode,
      shortcut: "R",
    },
    {
      label: isMusicPlaying ? "Stop Jazz" : "Play Jazz",
      icon: <Music size={14} className={isMusicPlaying ? "text-green-500" : ""} />,
      action: toggleMusic,
      divider: true,
    },
    {
      label: "Copy URL",
      icon: <Copy size={14} />,
      action: copyUrl,
    },
    {
      label: "GitHub",
      icon: <Github size={14} />,
      action: () => window.open("https://github.com/sharad-bhandari", "_blank"),
      divider: true,
    },
    {
      label: "Surprise Me!",
      icon: <Sparkles size={14} className="text-accent" />,
      action: triggerEasterEgg,
    },
  ]

  if (isMobile) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          style={{ left: position.x, top: position.y }}
          className="fixed z-[150] w-52 overflow-hidden rounded-lg border border-border bg-card/95 backdrop-blur-xl shadow-2xl"
        >
          <div className="border-b border-border bg-muted/30 px-3 py-1.5">
            <p className="font-mono text-[10px] text-muted-foreground">sharad.dev</p>
          </div>

          <div className="p-1">
            {menuItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    item.action()
                    if (item.label !== "Play Jazz" && item.label !== "Stop Jazz") {
                      setIsOpen(false)
                    }
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-muted/50 focus:outline-none focus:bg-muted/50"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-muted-foreground">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.shortcut && (
                    <span className="font-mono text-[10px] text-muted-foreground">{item.shortcut}</span>
                  )}
                </button>
                {item.divider && <div className="my-1 h-px bg-border" />}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
