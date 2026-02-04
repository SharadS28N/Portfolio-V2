import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Sharad Bhandari",
  description:
    "Get in touch with Sharad Bhandari for collaboration, project inquiries, or just to say hello. Let's create something amazing together.",
}

export default function ContactPage() {
  return (
    <main id="main-content">
      <ContactHero />
      <div className="relative bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
