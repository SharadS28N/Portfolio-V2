"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useSWR from "swr"
import { ExternalLink, Github, Star, GitFork, Calendar, Code } from "lucide-react"
import { useRunwayMode } from "@/components/runway-mode-provider"
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
  created_at: string
  updated_at: string
  pushed_at: string
  default_branch: string
  owner: {
    login: string
  }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const languageColors: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  React: "#61dafb",
  Vue: "#4fc08d",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Jupyter: "#DA5B0B",
  "Jupyter Notebook": "#DA5B0B",
}

const languageLogos: Record<string, string> = {
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  Jupyter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  "Jupyter Notebook": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
}

export function ProjectsGrid() {
  const [filter, setFilter] = useState<string>("all")
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { isRunwayMode } = useRunwayMode()
  const [projectImages, setProjectImages] = useState<Record<number, string | null>>({})

  const {
    data: repos,
    error,
    isLoading,
  } = useSWR<GitHubRepo[]>("https://api.github.com/users/sharads28n/repos?sort=updated&per_page=30", fetcher, {
    revalidateOnFocus: false,
  })

  useEffect(() => {
    if (!repos) return

    repos.forEach(async (repo) => {
      try {
        // Try to fetch README content
        const readmeRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`, {
          headers: { Accept: "application/vnd.github.v3.raw" },
        })

        if (readmeRes.ok) {
          const readmeText = await readmeRes.text()
          // Extract first image from README (supports both markdown and HTML img tags)
          const imgMatch = readmeText.match(/!\[.*?\]$$(https?:\/\/[^$$]+)\)|<img[^>]+src=["'](https?:\/\/[^"']+)["']/i)
          if (imgMatch) {
            const imageUrl = imgMatch[1] || imgMatch[2]
            setProjectImages((prev) => ({ ...prev, [repo.id]: imageUrl }))
            return
          }
        }
        // No image found
        setProjectImages((prev) => ({ ...prev, [repo.id]: null }))
      } catch {
        setProjectImages((prev) => ({ ...prev, [repo.id]: null }))
      }
    })
  }, [repos])

  // Get unique languages for filter
  const languages = repos
    ? ["all", ...Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean)))]
    : ["all"]

  const filteredRepos = repos?.filter((repo) => (filter === "all" ? true : repo.language === filter))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  return (
    <section className="relative overflow-hidden bg-card py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isRunwayMode ? 1.2 : 0.8 }}
          className="mb-8 -mx-4 px-4 sm:mx-0 sm:mb-12 sm:px-0"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 hide-scrollbar">
            {languages.slice(0, 8).map((lang) => (
              <motion.button
                key={lang}
                onClick={() => setFilter(lang)}
                whileHover={isRunwayMode ? { scale: 1.1, y: -2 } : { scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                  filter === lang
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-secondary hover:text-foreground"
                }`}
              >
                {lang === "all" ? "All Projects" : lang}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/10] rounded-lg bg-muted" />
                <div className="mt-4 h-6 w-3/4 rounded bg-muted" />
                <div className="mt-2 h-4 w-full rounded bg-muted" />
                <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
            <div className="mb-4 rounded-full bg-destructive/20 p-4">
              <Code className="h-6 w-6 text-destructive sm:h-8 sm:w-8" />
            </div>
            <h3 className="mb-2 font-serif text-lg font-bold text-foreground sm:text-xl">Unable to load projects</h3>
            <p className="text-sm text-muted-foreground">Please try refreshing the page or check back later.</p>
          </div>
        )}

        {/* Projects grid */}
        {filteredRepos && (
          <motion.div layout className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo, index) => {
                const hasReadmeImage = projectImages[repo.id]
                const langLogo = languageLogos[repo.language || ""] || null

                return (
                  <motion.article
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: isRunwayMode ? 1 : 0.5,
                      delay: isRunwayMode ? index * 0.1 : index * 0.05,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="group relative"
                    onMouseEnter={() => setHoveredId(repo.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <motion.div
                      className="relative overflow-hidden rounded-lg border border-border bg-background transition-all duration-500 hover:border-secondary/50"
                      whileHover={isRunwayMode ? { y: -8, scale: 1.02 } : { y: -2 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Project visual header */}
                      <div
                        className="relative aspect-[16/10] overflow-hidden"
                        data-cursor="hover"
                        data-cursor-text="View"
                      >
                        {hasReadmeImage ? (
                          <Image
                            src={hasReadmeImage || "/placeholder.svg"}
                            alt={repo.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            unoptimized
                          />
                        ) : (
                          <div
                            className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${languageColors[repo.language || "JavaScript"] || "#5a473a"}20, transparent)`,
                            }}
                          >
                            {langLogo ? (
                              <motion.div
                                animate={hoveredId === repo.id ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                                transition={{ duration: 0.4 }}
                              >
                                <Image
                                  src={langLogo || "/placeholder.svg"}
                                  alt={repo.language || "Code"}
                                  width={80}
                                  height={80}
                                  className="opacity-60 sm:h-24 sm:w-24"
                                  unoptimized
                                />
                              </motion.div>
                            ) : (
                              <motion.span
                                className="font-serif text-4xl font-bold transition-all duration-500 sm:text-5xl md:text-6xl"
                                style={{
                                  color: `${languageColors[repo.language || "JavaScript"] || "#c7bdb1"}40`,
                                }}
                                animate={hoveredId === repo.id ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                              >
                                {repo.name.charAt(0).toUpperCase()}
                              </motion.span>
                            )}
                          </div>
                        )}

                        {/* Language badge */}
                        {repo.language && (
                          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                            <span
                              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm sm:gap-1.5 sm:px-3 sm:py-1"
                              style={{
                                backgroundColor: `${languageColors[repo.language] || "#5a473a"}30`,
                                color: languageColors[repo.language] || "#c7bdb1",
                              }}
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                                style={{ backgroundColor: languageColors[repo.language] || "#c7bdb1" }}
                              />
                              {repo.language}
                            </span>
                          </div>
                        )}

                        {/* Hover overlay with links */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center gap-3 bg-background/90 sm:gap-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredId === repo.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-colors sm:h-12 sm:w-12"
                          >
                            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                          </motion.a>
                          {repo.homepage && (
                            <motion.a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors sm:h-12 sm:w-12"
                            >
                              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                            </motion.a>
                          )}
                        </motion.div>
                      </div>

                      {/* Project info */}
                      <div className="p-4 sm:p-6">
                        <h3 className="mb-1.5 font-serif text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary sm:mb-2 sm:text-lg">
                          {repo.name
                            .replace(/-/g, " ")
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h3>

                        <p className="mb-3 line-clamp-2 text-xs text-muted-foreground sm:mb-4 sm:text-sm">
                          {repo.description || "A creative project showcasing modern development practices."}
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:gap-4">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            {repo.forks_count}
                          </span>
                          <span className="hidden items-center gap-1 sm:flex">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(repo.pushed_at)}
                          </span>
                        </div>

                        {/* Topics */}
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
                            {repo.topics.slice(0, 3).map((topic) => (
                              <span
                                key={topic}
                                className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground sm:text-xs"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {filteredRepos && filteredRepos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
            <p className="text-sm text-muted-foreground">No projects found for this filter.</p>
            <button onClick={() => setFilter("all")} className="mt-4 text-primary hover:underline">
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
