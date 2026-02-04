"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useRunwayMode } from "./runway-mode-provider"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const { isRunwayMode, toggleRunwayMode } = useRunwayMode()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)

      // Track scroll direction for hide/show behavior
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Easter egg: Keyboard shortcut for runway mode (R key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          toggleRunwayMode()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleRunwayMode])

  return (
    <>
      {/* Top navigation bar */}
      <motion.header
        className={`fixed left-0 right-0 top-0 z-50 border-b px-4 py-3 transition-all duration-500 sm:px-6 sm:py-4 lg:px-12 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-border/50 shadow-lg shadow-background/5"
            : "bg-transparent border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{
          y: scrollDirection === "down" && isScrolled && !isOpen ? -100 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Go to homepage"
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image
                src="/logo-transparent.png"
                alt="SB"
                width={45}
                height={45}
                className="h-15 w-15"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    pathname === item.href
                      ? "text-primary"
                      : isScrolled
                        ? "text-foreground/80 hover:text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}

            {/* Runway Mode Toggle */}
            <button
              onClick={toggleRunwayMode}
              aria-pressed={isRunwayMode}
              className={`ml-2 rounded-full border px-3 py-1 text-xs tracking-wider transition-all duration-300 xl:ml-4 ${
                isRunwayMode
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              RUNWAY
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <motion.span
              className="block h-px w-6 bg-foreground"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px w-6 bg-foreground"
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px w-6 bg-foreground"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background lg:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            <nav className="relative flex flex-col items-center gap-6 sm:gap-8" aria-label="Mobile">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`block font-serif text-3xl transition-colors duration-300 sm:text-4xl ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Runway Mode Toggle */}
              <motion.button
                onClick={toggleRunwayMode}
                aria-pressed={isRunwayMode}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={`mt-4 rounded-full border px-4 py-2 text-sm tracking-wider transition-all duration-300 ${
                  isRunwayMode
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
              >
                RUNWAY MODE
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
