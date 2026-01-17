import { ProjectsHero } from "@/components/projects/projects-hero"
import { ProjectsGrid } from "@/components/projects/projects-grid"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Sharad Bhandari",
  description:
    "Explore the portfolio of Sharad Bhandari - A collection of web development projects showcasing modern technologies and creative solutions.",
}

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsGrid />
      <Footer />
    </main>
  )
}
