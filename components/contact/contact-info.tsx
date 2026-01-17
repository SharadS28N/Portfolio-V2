"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin, Clock } from "lucide-react"
import { AnimatedLine } from "@/components/animated-line"

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@sharadbhandari.com",
    href: "mailto:contact@sharadbhandari.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Available Worldwide",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/sharads28n",
    username: "@sharads28n",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/SharadS28N/",
    username: "Sharad Bhandari",
  },
]

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">Contact Details</h2>

      {/* Contact details */}
      <div className="mb-12 space-y-6">
        {contactDetails.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary">
              <detail.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{detail.label}</p>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="font-medium text-foreground transition-colors duration-300 hover:text-primary"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="font-medium text-foreground">{detail.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatedLine className="mb-12" delay={0.8} />

      {/* Social links */}
      <div>
        <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-muted-foreground">Connect with me</h3>
        <div className="space-y-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 rounded-lg border border-border p-4 transition-all duration-300 hover:border-secondary/50 hover:bg-background"
              data-cursor="hover"
            >
              <social.icon className="h-5 w-5 text-secondary" />
              <div>
                <p className="font-medium text-foreground">{social.label}</p>
                <p className="text-sm text-muted-foreground">{social.username}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Availability note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-12 rounded-lg bg-secondary/10 p-6"
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="font-medium text-foreground">Currently available for freelance work</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          I&apos;m open to new projects and collaborations. Let&apos;s discuss your ideas!
        </p>
      </motion.div>
    </motion.div>
  )
}
