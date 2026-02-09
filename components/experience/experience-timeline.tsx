"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRunwayMode } from "@/components/runway-mode-provider"
import { Briefcase, GraduationCap, Award, Code } from "lucide-react"

const experiences = [
  {
    id: 1,
    type: "work",
    title: "Web Developer",
    organization: "Nexus Event & IT Solutions Pvt. Ltd.",
    period: "Jan 2025 - Present",
    description:
      "Building modern web applications and digital solutions for clients. Working with Next.js, React, and full-stack technologies to deliver high-quality products.",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB"],
    icon: Briefcase,
  },
  {
    id: 2,
    type: "work",
    title: "Technical Lead",
    organization: "CyberUtsav 2.0 Hackathon",
    period: "May 2025 - Sep 2025",
    description:
      "Led technical operations for CyberUtsav 2.0, a high-school hackathon. Managed sound system, stage tech, and provided technical assistance. Designed hackathon architecture including cloud environments, APIs, and toolkits.",
    technologies: ["Cloud", "APIs", "Event Tech", "Team Leadership"],
    icon: Code,
  },
  {
    id: 3,
    type: "achievement",
    title: "Certifications Milestone",
    organization: "Meta, IBM, Harvard CS50",
    period: "2024 - 2025",
    description:
      "Completed multiple professional certifications: Programming in Python, Getting Started with Git and GitHub, Developing Front-End Apps with React, Understanding of HTML, and Introduction to Databases for Back End Development.",
    technologies: ["Python", "React", "Git", "Databases", "CS50x"],
    icon: Award,
  },
  {
    id: 4,
    type: "work",
    title: "Full-Stack Developer",
    organization: "Personal Projects & Freelance",
    period: "2021 - 2024",
    description:
      "Developed end-to-end web solutions using the MERN stack and Firebase. Created projects like Aleo (AI voice assistant), CVly (CV generator for CS50x), SecScanner, NetGuard, and InvestIQ.",
    technologies: ["MongoDB", "Express", "React", "Node.js", "Firebase"],
    icon: Code,
  },
  {
    id: 5,
    type: "education",
    title: "COVID-Era Learning Sprint",
    organization: "Self-Taught & Online Courses",
    period: "2019 - 2020",
    description:
      "Intensive learning during the pandemic. Mastered React.js, deepened JavaScript knowledge, explored networking concepts through YouTube tutorials, and built multiple frontend projects.",
    technologies: ["React", "JavaScript", "CSS", "Bootstrap"],
    icon: GraduationCap,
  },
  {
    id: 6,
    type: "education",
    title: "The Foundation",
    organization: "Self-Taught Journey",
    period: "2017 - 2018",
    description:
      "Started coding journey with QBasic and explored VB Script in Visual Studio. Despite being young, curiosity drove exploration. Transitioned to HTML, CSS, and JavaScript, mastering frontend fundamentals and frameworks like Bootstrap.",
    technologies: ["QBasic", "HTML", "CSS", "JavaScript", "Bootstrap"],
    icon: GraduationCap,
  },
]

function TimelineItem({
  experience,
  index,
  isRunwayMode,
}: {
  experience: (typeof experiences)[0]
  index: number
  isRunwayMode: boolean
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, margin: "-50px" })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={itemRef}
      className={`relative flex items-start ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: isRunwayMode ? 1.2 : 0.8,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {/* Timeline node */}
      <div className="absolute left-0 top-0 z-10 lg:left-1/2 lg:-translate-x-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary bg-background sm:h-12 sm:w-12"
        >
          <experience.icon className="h-4 w-4 text-secondary sm:h-5 sm:w-5" />
        </motion.div>
      </div>

      {/* Content card - improved mobile spacing */}
      <div className={`ml-14 w-full sm:ml-16 lg:ml-0 lg:w-[calc(50%-3rem)] ${isLeft ? "lg:pr-12" : "lg:pl-12"}`}>
        <motion.div
          whileHover={{ y: -5 }}
          className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-secondary/50 sm:p-6"
        >
          {/* Period badge */}
          <span className="mb-3 inline-block rounded-full bg-secondary/20 px-2.5 py-1 font-mono text-xs text-secondary sm:mb-4 sm:px-3">
            {experience.period}
          </span>

          <h3 className="mb-1 font-serif text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
            {experience.title}
          </h3>

          <p className="mb-3 text-sm text-primary sm:mb-4">{experience.organization}</p>

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:mb-6">{experience.description}</p>

          {/* Technologies - improved wrapping */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground sm:px-3 sm:py-1"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Hover accent */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-secondary to-primary transition-all duration-500 group-hover:w-full" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const { isRunwayMode } = useRunwayMode()

  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-card py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Timeline line - positioned for mobile */}
        <div className="absolute bottom-0 left-4 top-0 w-px bg-border sm:left-6 lg:left-1/2">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-secondary to-primary"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline items */}
        <div className="relative space-y-12 sm:space-y-16 lg:space-y-24">
          {experiences.map((experience, index) => (
            <TimelineItem key={experience.id} experience={experience} index={index} isRunwayMode={isRunwayMode} />
          ))}
        </div>

        {/* End node */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mt-12 flex justify-start sm:mt-16 lg:mt-24 lg:justify-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background sm:h-16 sm:w-16">
            <span className="font-serif text-lg font-bold text-primary sm:text-xl">∞</span>
          </div>
        </motion.div>

        {/* Journey continues message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-center font-serif text-lg italic text-muted-foreground sm:mt-8 sm:text-xl"
        >
          And the journey continues...
        </motion.p>
      </div>
    </section>
  )
}
