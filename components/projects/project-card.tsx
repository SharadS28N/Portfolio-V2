"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Star, GitFork, Code } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/hooks/useGitHubProjects"
import { useRunwayMode } from "@/components/runway-mode-provider"

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

interface ProjectCardProps {
    project: Project
    index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const [hovered, setHovered] = useState(false)
    const [imgError, setImgError] = useState(false)
    const { isRunwayMode } = useRunwayMode()

    // Primary language fallback
    const language = project.tags[0]
    const logo = languageLogos[language] || null
    const color = languageColors[language] || "#muted"

    return (
        <motion.article
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: isRunwayMode ? 1 : 0.5,
                delay: isRunwayMode ? index * 0.1 : index * 0.05,
                ease: [0.23, 1, 0.32, 1],
            }}
            className="group relative h-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                className="relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-500 hover:border-secondary/50 hover:shadow-lg"
                whileHover={isRunwayMode ? { y: -8, scale: 1.02 } : { y: -4 }}
            >
                {/* Project Image Area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    {!imgError ? (
                        <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={() => setImgError(true)}
                            unoptimized
                        />
                    ) : (
                        // Fallback: Language Logo or Initials
                        <div
                            className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                                background: `linear-gradient(135deg, ${color}20, transparent)`,
                            }}
                        >
                            {logo ? (
                                <Image
                                    src={logo || "/placeholder.svg"}
                                    alt={language}
                                    width={80}
                                    height={80}
                                    className="opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                                    unoptimized
                                />
                            ) : (
                                <Code className="h-16 w-16 text-muted-foreground/20" />
                            )}
                        </div>
                    )}

                    {/* Language Badge */}
                    {language && (
                        <div className="absolute left-3 top-3">
                            <span
                                className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
                                style={{ color }}
                            >
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                                {language}
                            </span>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div
                        className={`absolute inset-0 flex items-center justify-center gap-4 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-110"
                            title="View Source"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                                title="View Demo"
                            >
                                <ExternalLink className="h-5 w-5" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 font-serif text-lg font-bold leading-tight group-hover:text-primary">
                        {project.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground flex-1">
                        {project.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5" />
                                {project.stars}
                            </span>
                            <span className="flex items-center gap-1">
                                <GitFork className="h-3.5 w-3.5" />
                                {project.forks}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.article>
    )
}
