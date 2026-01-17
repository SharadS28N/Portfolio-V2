"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { Code, Palette, Zap, Heart } from "lucide-react"

const philosophyItems = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that future developers will thank you for.",
  },
  {
    icon: Palette,
    title: "Design-Driven",
    description: "Every pixel matters. Creating interfaces that are both beautiful and functional.",
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "Optimizing for speed because every millisecond counts in user experience.",
  },
  {
    icon: Heart,
    title: "User-Centric",
    description: "Building with empathy, always keeping the end user's needs at the forefront.",
  },
]

export function AboutPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32 lg:py-48">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-4 inline-block font-mono text-sm tracking-wider text-secondary"
          >
            MY APPROACH
          </motion.span>

          <TextReveal
            className="mx-auto max-w-3xl font-serif text-3xl font-bold leading-snug text-foreground md:text-4xl lg:text-5xl"
            delay={0.1}
          >
            Philosophy & Values
          </TextReveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {philosophyItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-500 hover:border-secondary/50 hover:bg-card/80">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 text-secondary"
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>

                <h3 className="mb-3 font-serif text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-secondary to-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <blockquote className="mx-auto max-w-3xl">
            <p className="font-serif text-2xl italic text-foreground md:text-3xl">
              &ldquo;The details are not the details. They make the design.&rdquo;
            </p>
            <footer className="mt-4 font-mono text-sm text-muted-foreground">— Charles Eames</footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
