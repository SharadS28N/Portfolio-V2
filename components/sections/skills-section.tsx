"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { useRunwayMode } from "@/components/runway-mode-provider"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiFirebase,
  SiGit,
  SiDocker,
  SiDjango,
  SiFlask,
  SiFramer,
  SiFigma,
  SiThreedotjs,
} from "react-icons/si"

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Node.js", level: 85 },
  { name: "MongoDB", level: 80 },
  { name: "GSAP / Framer Motion", level: 88 },
]

const technologies = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Express", icon: SiExpress, color: "#ffffff" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Three.js", icon: SiThreedotjs, color: "#ffffff" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Django", icon: SiDjango, color: "#092E20" },
  { name: "Flask", icon: SiFlask, color: "#ffffff" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { isRunwayMode } = useRunwayMode()

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 sm:py-24 md:py-32 lg:py-48">
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-3 inline-block font-mono text-xs tracking-wider text-secondary sm:mb-4 sm:text-sm"
        >
          MY EXPERTISE
        </motion.span>

        <TextReveal
          className="mb-10 font-serif text-2xl font-bold leading-snug text-foreground sm:mb-12 sm:text-3xl md:mb-16 md:text-4xl lg:text-5xl"
          delay={0.1}
        >
          Technologies & Skills
        </TextReveal>

        <div className="grid gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Skill bars */}
          <div className="space-y-6 sm:space-y-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted sm:h-1">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{
                      duration: isRunwayMode ? 2 : 1.2,
                      delay: index * 0.1 + 0.3,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technology tags with icons */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:mb-6 sm:text-sm"
            >
              Technologies I Work With
            </motion.h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.5 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(90, 71, 58, 0.3)" }}
                  className="flex cursor-default items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-foreground transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm"
                  data-cursor="hover"
                >
                  <tech.icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: tech.color }} />
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

