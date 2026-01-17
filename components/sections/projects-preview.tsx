"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TextReveal } from "@/components/text-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useRunwayMode } from "@/components/runway-mode-provider"
import Link from "next/link"
import useSWR from "swr"
import { ExternalLink, Github, Star, GitFork } from "lucide-react"
import Image from "next/image"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  owner: {
    login: string
  }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const languageLogos: Record<string, string> = {
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Jupyter Notebook": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
}

export function ProjectsPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const { isRunwayMode } = useRunwayMode()
  const [projectImages, setProjectImages] = useState<Record<number, string | null>>({})

  const {
    data: repos,
    error,
    isLoading,
  } = useSWR<GitHubRepo[]>("https://api.github.com/users/sharads28n/repos?sort=updated&per_page=4", fetcher, {
    revalidateOnFocus: false,
  })

  useEffect(() => {
    if (!repos) return
    repos.forEach(async (repo) => {
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`, {
          headers: { Accept: "application/vnd.github.v3.raw" },
        })
        if (readmeRes.ok) {
          const readmeText = await readmeRes.text()
          const imgMatch = readmeText.match(/!\[.*?\]$$(https?:\/\/[^$$]+)\)|<img[^>]+src=["'](https?:\/\/[^"']+)["']/i)
          if (imgMatch) {
            setProjectImages((prev) => ({ ...prev, [repo.id]: imgMatch[1] || imgMatch[2] }))
            return
          }
        }
        setProjectImages((prev) => ({ ...prev, [repo.id]: null }))
      } catch {
        setProjectImages((prev) => ({ ...prev, [repo.id]: null }))
      }
    })
  }, [repos])

  const x = useTransform(scrollYProgress, [0, 1], [0, isRunwayMode ? -60 : -30])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-card py-20 sm:py-24 md:py-32 lg:py-48">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: isRunwayMode ? 1.2 : 0.8 }}
              className="mb-3 inline-block font-mono text-xs tracking-wider text-secondary sm:mb-4 sm:text-sm"
            >
              SELECTED WORK
            </motion.span>

            <TextReveal
              className="font-serif text-2xl font-bold leading-snug text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
              delay={0.1}
            >
              Featured Projects
            </TextReveal>
          </div>

          <MagneticButton>
            <Link
              href="/projects"
              data-cursor="hover"
              data-cursor-text="View All"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors duration-300 hover:text-foreground"
            >
              View all projects
              <span>→</span>
            </Link>
          </MagneticButton>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/10] rounded-lg bg-muted" />
                <div className="mt-4 h-6 w-3/4 rounded bg-muted" />
                <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
            <p className="text-muted-foreground">Unable to load projects at the moment.</p>
            <Link href="/projects" className="mt-4 text-primary hover:underline">
              View all projects →
            </Link>
          </div>
        )}

        {/* Projects grid */}
        {repos && (
          <motion.div style={{ x }} className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {repos.map((repo, index) => {
              const hasReadmeImage = projectImages[repo.id]
              const langLogo = languageLogos[repo.language || ""] || null

              return (
                <motion.article
                  key={repo.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: isRunwayMode ? 1.2 : 0.8, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted"
                    data-cursor="hover"
                    data-cursor-text="View"
                    whileHover={isRunwayMode ? { scale: 1.03 } : {}}
                  >
                    {hasReadmeImage ? (
                      <Image
                        src={hasReadmeImage || "/placeholder.svg"}
                        alt={repo.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/20 to-primary/10">
                        {langLogo ? (
                          <Image
                            src={langLogo || "/placeholder.svg"}
                            alt={repo.language || "Code"}
                            width={64}
                            height={64}
                            className="opacity-50 transition-transform duration-500 group-hover:scale-110 sm:h-20 sm:w-20"
                            unoptimized
                          />
                        ) : (
                          <span className="font-serif text-3xl font-bold text-primary/30 transition-transform duration-500 group-hover:scale-110 sm:text-4xl">
                            {repo.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Links */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-4">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 hover:scale-110 sm:h-12 sm:w-12"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 hover:scale-110 sm:h-12 sm:w-12"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </motion.div>

                  <div className="mt-4 sm:mt-6">
                    <h3 className="font-serif text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
                      {repo.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground sm:mt-2">
                      {repo.description || "A creative project built with passion and attention to detail."}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 sm:mt-4 sm:gap-4">
                      {repo.language && (
                        <span className="rounded-full bg-secondary/20 px-2.5 py-1 text-xs text-secondary sm:px-3">
                          {repo.language}
                        </span>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground sm:gap-3">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
