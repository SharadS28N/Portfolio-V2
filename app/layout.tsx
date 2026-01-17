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
  title: "Sharad Bhandari | Full-Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Sharad Bhandari - A Full-Stack Developer & AI Enthusiast at Softwarica College, crafting intelligent digital experiences with modern web technologies and artificial intelligence.",
  keywords: [
    "Full-Stack Developer",
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
  openGraph: {
    title: "Sharad Bhandari | Full-Stack Developer & AI Enthusiast",
    description: "Crafting intelligent digital experiences where web technologies meet AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharad Bhandari | Full-Stack Developer & AI Enthusiast",
    description: "Crafting intelligent digital experiences where web technologies meet AI.",
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
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}>
        <RunwayModeProvider>
          <Preloader />
          <SmoothScroll>
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
