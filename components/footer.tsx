"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Mail, Coffee, Terminal, Cpu } from "lucide-react"

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
]

const socialLinks = [
  { href: "https://github.com/sharads28n", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/SharadS28N/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:contact@sharadbhandari.com", icon: Mail, label: "Email" },
]

const devMessages = [
  { icon: Coffee, text: "Powered by coffee & curiosity!" },
  { icon: Terminal, text: "console.log('Hello World!')" },
  { icon: Cpu, text: "AI is the future, I'm building it!" },
]

export function Footer() {
  const [heartClicks, setHeartClicks] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [secretMessage, setSecretMessage] = useState(devMessages[0])

  const [typedKeys, setTypedKeys] = useState("")
  const [showReactEgg, setShowReactEgg] = useState(false)

  const handleHeartClick = () => {
    const newCount = heartClicks + 1
    setHeartClicks(newCount)
    if (newCount >= 5) {
      setSecretMessage(devMessages[Math.floor(Math.random() * devMessages.length)])
      setShowSecret(true)
      setTimeout(() => {
        setShowSecret(false)
        setHeartClicks(0)
      }, 3000)
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return

      const newTyped = (typedKeys + e.key.toLowerCase()).slice(-5)
      setTypedKeys(newTyped)

      if (newTyped === "react") {
        setShowReactEgg(true)
        setTypedKeys("")
        setTimeout(() => setShowReactEgg(false), 3000)
      }
    },
    [typedKeys],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <footer className="relative border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image src="/logo-transparent.png" alt="SB" width={45} height={45} className="h-20 w-20" priority />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground sm:mt-4">
              Full-Stack Developer & AI Enthusiast crafting intelligent digital experiences at Softwarica College.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground sm:mb-4">
              Navigation
            </h3>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col md:gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground sm:mb-4">Connect</h3>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:mt-16 sm:flex-row sm:gap-4 sm:pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sharad Bhandari. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed & Built with{" "}
            <motion.button
              onClick={handleHeartClick}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block cursor-pointer text-primary hover:scale-125"
              aria-label="Click for a surprise"
            >
              ♥
            </motion.button>
            <AnimatePresence>
              {showSecret && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="ml-2 inline-flex items-center gap-1 text-primary"
                >
                  <secretMessage.icon className="h-3 w-3" /> {secretMessage.text}
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showReactEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          >
            <div className="text-center px-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mx-auto mb-4 h-20 w-20 text-[#61dafb]"
              >
                <svg viewBox="-11.5 -10.232 23 20.463">
                  <circle r="2.05" fill="currentColor" />
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                  </g>
                </svg>
              </motion.div>
              <p className="font-serif text-xl text-primary sm:text-2xl">React Developer Detected!</p>
              <p className="mt-2 text-sm text-muted-foreground">React + Next.js = My favorite stack</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}
