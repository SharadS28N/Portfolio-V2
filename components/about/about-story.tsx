"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { TextReveal } from "@/components/text-reveal"
import { AnimatedLine } from "@/components/animated-line"
import { useRunwayMode } from "@/components/runway-mode-provider"

const storyBlocks = [
  {
    title: "The Beginning",
    content:
      "My journey started with a curiosity about how things work on the internet. What began as simple HTML pages quickly evolved into a passion for creating immersive digital experiences. Now, at Softwarica College of IT & E-Commerce, I'm expanding into the world of AI.",
  },
  {
    title: "The Craft",
    content:
      "I specialize in building modern web applications using React, Next.js, and the MERN stack. My current studies in AI are teaching me to integrate machine learning into these applications, creating truly intelligent user experiences.",
  },
  {
    title: "The Philosophy",
    content:
      "I believe the future of development lies at the intersection of beautiful design and artificial intelligence. The best digital experiences feel natural, intuitive, and almost magical—powered by smart algorithms working invisibly behind the scenes.",
  },
]

export function AboutStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const { isRunwayMode } = useRunwayMode()

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-card py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Image/Visual */}
          <motion.div className="relative order-2 lg:order-1" style={{ y: isRunwayMode ? imageY : 0 }}>
            <div className="sticky top-32 aspect-square overflow-hidden rounded-lg bg-muted">
              {/* Abstract visual representing the developer */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <div className="h-72 w-72 rounded-full border border-border/30" />
                  <div className="absolute inset-4 rounded-full border border-secondary/40" />
                  <div className="absolute inset-8 rounded-full border border-primary/30" />
                  <div className="absolute inset-12 rounded-full bg-secondary/10" />

                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Image
                        src="/profile-pic.jpg"
                        alt="Profile"
                        width={120}
                        height={120}
                        className="h-28 w-28 rounded-full object-cover"
                        priority
                      />
                      <p className="mt-2 font-mono text-xs tracking-wider text-muted-foreground">AI DEVELOPER</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute left-4 top-8 rounded-lg bg-background p-4 font-mono text-xs shadow-xl lg:left-8"
              >
                <span className="text-secondary">const</span> <span className="text-primary">developer</span>{" "}
                <span className="text-muted-foreground">=</span> <span className="text-foreground">{"{"}</span>
                <br />
                <span className="ml-4 text-muted-foreground">skills:</span>{" "}
                <span className="text-green-500">&apos;web + AI&apos;</span>
                <br />
                <span className="ml-4 text-muted-foreground">learning:</span>{" "}
                <span className="text-green-500">&apos;always&apos;</span>
                <br />
                <span className="text-foreground">{"};"}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Story */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isRunwayMode ? 1.2 : 0.8 }}
              className="mb-4 font-mono text-sm tracking-wider text-secondary"
            >
              MY STORY
            </motion.span>

            <TextReveal
              className="mb-12 font-serif text-3xl font-bold leading-snug text-foreground md:text-4xl"
              delay={0.1}
            >
              From curiosity to craft
            </TextReveal>

            <div className="space-y-12">
              {storyBlocks.map((block, index) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: isRunwayMode ? 1 : 0.8, delay: index * 0.1 }}
                >
                  <h3 className="mb-3 font-serif text-xl font-bold text-primary">{block.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{block.content}</p>
                  {index < storyBlocks.length - 1 && <AnimatedLine className="mt-8 w-full" delay={0.2} />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
