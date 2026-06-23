import type React from "react"
import type { Metadata, Viewport } from "next"
import { Syne, Playfair_Display, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CustomCursor } from "@/components/custom-cursor"
import { RunwayModeProvider } from "@/components/runway-mode-provider"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Navigation } from "@/components/navigation"
import { NoiseOverlay } from "@/components/noise-overlay"
import { SecretZone } from "@/components/secret-zone"
import { Preloader } from "@/components/preloader"
import { ContextMenu } from "@/components/context-menu"

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  metadataBase: new URL("https://sharadb.com.np"),
  title: {
    default: "Sharad | Full Stack Developer in Nepal & AI Expert",
    template: "%s | Sharad",
  },
  description:
    "Hire Sharad, a modern Full-Stack Developer in Nepal specializing in Next.js, React, and Artificial Intelligence. Building fast, intelligent digital experiences.",
  keywords: [
    "Full-Stack Developer",
    "Full Stack Developer Nepal",
    "Sharad developer",
    "AI Developer",
    "React",
    "Next.js",
    "Machine Learning",
    "Web Development",
    "Softwarica College",
  ],
  authors: [{ name: "Sharad Bhandari" }],
  icons: {
    icon: [
      { url: "/logo-transparent.png", type: "image/png" },
      { url: "/icon-light-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sharad | Full Stack Developer in Nepal & AI Expert",
    description: "Hire Sharad, a modern Full-Stack Developer in Nepal specializing in Next.js, React, and Artificial Intelligence.",
    url: "https://sharadb.com.np",
    siteName: "Sharad Bhandari",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo-transparent.png",
        width: 1200,
        height: 630,
        alt: "Sharad Bhandari - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharad | Full Stack Developer in Nepal & AI Expert",
    description: "Hire Sharad, a modern Full-Stack Developer in Nepal specializing in Next.js, React, and Artificial Intelligence.",
    creator: "@sharadb",
    images: ["/logo-transparent.png"],
  }
}

export const viewport: Viewport = {
  themeColor: "#161412",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sharad Bhandari",
    alternateName: ["Sharad", "Sharad B", "SharadS28N"],
    jobTitle: "Full Stack Developer",
    url: "https://sharadb.com.np",
    sameAs: [
      "https://github.com/SharadS28N",
      "https://www.linkedin.com/in/SharadS28N/"
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: ["Softwarica College of IT & E-Commerce", "Coventry University"]
    },
    knowsAbout: ["Full Stack Web Development", "React.js", "Next.js", "Artificial Intelligence", "Machine Learning"]
  }

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${syne.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-full focus:bg-white/90 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black focus:shadow-lg focus:backdrop-blur"
        >
          Skip to main content
        </a>
        <RunwayModeProvider>
          <Preloader />
          <SmoothScroll>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
            >
              Skip to content
            </a>
            <CustomCursor />
            <Navigation />
            <NoiseOverlay />
            <SecretZone />
            <ContextMenu />
            {children}
          </SmoothScroll>
        </RunwayModeProvider>
        <Analytics />
      </body>
    </html>
  )
}
