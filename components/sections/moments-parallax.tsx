"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { AnimatedLine } from "@/components/animated-line"

const reelImages = ["/images/image1.jpg", "/images/image2.jpg", "/images/image3.jpg", "/images/image4.jpg", 
  "/images/image5.jpg", "/images/image6.jpg", "/images/image7.jpg", "/images/image8.jpg", "/images/image9.jpg", 
  "/images/image10.jpg", "/images/image11.jpg"]

export function MomentsParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-card py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-block font-mono text-xs tracking-wider text-secondary"
        >
          MOMENTS REEL
        </motion.span>

        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">My Moment Gallery</h2>
        <AnimatedLine className="mt-6 w-24" delay={0.2} />

        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Smooth, horizontally scrolling reel with vertical, responsive frames.
        </p>
      </div>

      <div className="mt-12 sm:mt-16 lg:mt-20">
        <div className="relative h-[70vh] sm:h-[72vh] lg:h-[74vh]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-secondary/10 blur-3xl" />
          <div
            ref={scrollerRef}
            className="absolute inset-0 overflow-x-auto px-6 sm:px-8 lg:px-12 snap-x snap-mandatory hide-scrollbar"
            tabIndex={0}
            onKeyDown={(e) => {
              const el = scrollerRef.current
              if (!el) return
              if (e.key === "ArrowRight") el.scrollLeft += 100
              if (e.key === "ArrowLeft") el.scrollLeft -= 100
            }}
          >
            <div className="flex h-full items-center gap-6 sm:gap-8 lg:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="snap-start relative h-full aspect-[9/16] shrink-0 overflow-hidden rounded-xl border border-border bg-background p-6 sm:p-8 lg:p-10"
              >
                <div className="flex h-full flex-col justify-end">
                  <div className="font-mono text-xs tracking-wider text-secondary">INTRO</div>
                  <div className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">Personal Highlights</div>
                  <p className="mt-3 max-w-[22ch] text-sm text-muted-foreground sm:text-base">
                    Side-scroll to explore some of my personal best moments.
                  </p>
                </div>
              </motion.div>

              {reelImages.map((src, i) => (
                <motion.div
                  key={`reel-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="snap-start relative h-full aspect-[9/16] shrink-0 overflow-hidden rounded-xl border border-border bg-background"
                >
                  <Image
                    src={src}
                    alt="Moment"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 360px"
                    priority={i < 2}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

