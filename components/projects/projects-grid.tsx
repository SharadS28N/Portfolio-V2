"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRunwayMode } from "@/components/runway-mode-provider"
import { useGitHubProjects } from "@/hooks/useGitHubProjects"
import { ProjectCard } from "@/components/projects/project-card"
import { Code } from "lucide-react"

export function ProjectsGrid() {
  const [filter, setFilter] = useState<string>("all")
  const { isRunwayMode } = useRunwayMode()
  const { projects, loading, error } = useGitHubProjects()

  // Extract unique languages
  const languages = ["all", ...Array.from(new Set(projects.flatMap((p) => p.tags[0]).filter(Boolean)))]

  // Filter projects
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter) || p.tags[0] === filter)

  return (
    <section className="relative overflow-hidden bg-card py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isRunwayMode ? 1.2 : 0.8 }}
          className="mb-8 -mx-4 px-4 sm:mx-0 sm:mb-12 sm:px-0"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0 hide-scrollbar">
            {languages.slice(0, 8).map((lang) => ( // Limiting filter tabs to keep UI clean
              <motion.button
                key={lang}
                onClick={() => setFilter(lang)}
                whileHover={isRunwayMode ? { scale: 1.1, y: -2 } : { scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${filter === lang
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-secondary hover:text-foreground"
                  }`}
              >
                {lang === "all" ? "All Projects" : lang}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4 rounded-lg border p-4">
                <div className="aspect-[16/10] bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-20 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-destructive/10 p-3">
              <Code className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-lg font-bold">Failed to load projects</h3>
            <p className="text-muted-foreground">Please try again later.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No projects found for {filter}.</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 text-primary hover:underline hover:text-primary/80"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
