import { AboutHero } from "@/components/about/about-hero"
import { AboutStory } from "@/components/about/about-story"
import { AboutPhilosophy } from "@/components/about/about-philosophy"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Sharad Bhandari",
  description:
    "Learn more about Sharad Bhandari - a Creative Frontend / Full-Stack Developer passionate about crafting premium digital experiences.",
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutPhilosophy />
      <Footer />
    </main>
  )
}
