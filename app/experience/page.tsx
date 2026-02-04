import { ExperienceHero } from "@/components/experience/experience-hero"
import { ExperienceTimeline } from "@/components/experience/experience-timeline"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experience | Sharad Bhandari",
  description:
    "Explore the professional journey and experience of Sharad Bhandari - A Creative Frontend / Full-Stack Developer.",
}

export default function ExperiencePage() {
  return (
    <main id="main-content">
      <ExperienceHero />
      <ExperienceTimeline />
      <Footer />
    </main>
  )
}
