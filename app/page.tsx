import { HeroSection } from "@/components/sections/hero-section"
import { AboutPreview } from "@/components/sections/about-preview"
import { MomentsParallax } from "@/components/sections/moments-parallax"
import { SkillsSection } from "@/components/sections/skills-section"
import { ContactCTA } from "@/components/sections/contact-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutPreview />
      <SkillsSection />
      <MomentsParallax />
      <ContactCTA />
      <Footer />
    </main>
  )
}
