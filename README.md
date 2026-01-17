# Sharad Bhandari | Portfolio

A premium, luxury fashion-inspired personal portfolio website built with Next.js 15, Framer Motion, and Tailwind CSS.

![Portfolio Preview](https://via.placeholder.com/1200x630/161412/ffffff?text=Sharad+Bhandari+Portfolio)

## Features

### Design
- **Luxury Dark Theme** - Elegant color palette (#161412, #5a473a, #c7bdb1, #ddd9d6, #ffffff)
- **Custom Cursor** - Interactive cursor with magnetic hover effects
- **Noise Texture Overlay** - Subtle grain effect for that premium feel
- **Smooth Scroll** - Lenis-powered buttery smooth scrolling
- **Fashion-Inspired Preloader** - Animated loading screen with orbiting elements

### Pages
- **Home** - Hero section with animated text reveals, skills preview, and project highlights
- **About** - Narrative-driven story with philosophy cards
- **Projects** - GitHub API integration with language filtering and README image fetching
- **Experience** - Animated timeline with scroll-triggered progression
- **Contact** - Animated contact form with validation
- **404** - Interactive error page with particle effects

### Technical
- **Next.js 15** - App Router, Server Components
- **Framer Motion** - Smooth animations throughout
- **Tailwind CSS v4** - Utility-first styling
- **TypeScript** - Full type safety
- **SWR** - Data fetching for GitHub projects
- **Responsive** - Mobile-first design approach

---

## Easter Eggs & Hidden Features

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `R` | Toggle Runway Mode (dramatic animations) |
| `↑↑↓↓←→←→BA` | Konami Code - Achievement Unlocked! |

### Secret Interactions

1. **Type "ai" anywhere**
   - Triggers a fun AI robot animation with "Beep boop! You found me!" message
   - Awards +50 Neural Network Points

2. **Type "react" anywhere**
   - Shows a spinning React logo
   - Displays "React Developer Detected!" message

3. **Click the heart 5 times** (Footer)
   - Rotates through developer messages:
     - "Powered by mass mass coffee!"
     - "console.log('hello world')"
     - "The future is AI-powered"

4. **Hover bottom-right corner for 3 seconds**
   - Reveals a secret zone with hidden message

5. **Right-click anywhere** (Desktop only)
   - Opens a custom OS-style context menu with:
     - Quick navigation
     - Runway Mode toggle
     - Play Jazz music (actual lofi jazz plays!)
     - Copy URL & GitHub link
     - "Surprise Me!" easter egg
   - Note: Only works on laptop/desktop (1024px+)

6. **404 Page Easter Egg**
   - Click the "4" numbers to start a particle clicking mini-game
   - Hover over the page for glitch effect

### Runway Mode

Press `R` or use the right-click menu to toggle **Runway Mode**. This makes animations slower and more dramatic - like watching a fashion runway presentation in slow motion.

---

## Tech Stack

```
Frontend:     Next.js 15, React 19, TypeScript
Styling:      Tailwind CSS v4, Framer Motion
Data:         SWR, GitHub REST API
Fonts:        Syne, Playfair Display, JetBrains Mono
Icons:        Lucide React
Analytics:    Vercel Analytics
```

---

## Project Structure

```
├── app/
│   ├── about/
│   ├── contact/
│   ├── experience/
│   ├── projects/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── about/
│   ├── contact/
│   ├── experience/
│   ├── projects/
│   ├── sections/
│   ├── ui/
│   ├── context-menu.tsx
│   ├── custom-cursor.tsx
│   ├── footer.tsx
│   ├── magnetic-button.tsx
│   ├── navigation.tsx
│   ├── noise-overlay.tsx
│   ├── parallax-section.tsx
│   ├── preloader.tsx
│   ├── runway-mode-provider.tsx
│   ├── secret-zone.tsx
│   ├── smooth-scroll.tsx
│   └── text-reveal.tsx
└── lib/
    └── utils.ts
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/sharad-bhandari/portfolio.git

# Navigate to project
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

No environment variables are required for basic functionality. The GitHub API is used without authentication (rate limited to 60 requests/hour).

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sharad-bhandari/portfolio)

### Manual Build

```bash
npm run build
npm start
```

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Obsidian | `#161412` | Primary background |
| Espresso | `#5a473a` | Accent/Primary |
| Sand | `#c7bdb1` | Muted foreground |
| Cream | `#ddd9d6` | Secondary text |
| White | `#ffffff` | Headings, emphasis |

---

## Performance

- **Lighthouse Score**: 95+ Performance
- **Core Web Vitals**: Optimized
- **Accessibility**: WCAG 2.1 AA compliant
- **Reduced Motion**: Respects `prefers-reduced-motion`

---

## Credits

- Design inspired by luxury fashion brands and editorial websites
- Icons by [Lucide](https://lucide.dev)
- Fonts by [Google Fonts](https://fonts.google.com)
- Smooth scroll by [Lenis](https://lenis.studiofreight.com)

---

## License

MIT License - feel free to use this as inspiration for your own portfolio!

---

## Contact

**Sharad Bhandari**
- GitHub: [@sharad-bhandari](https://github.com/SharadS28N)
- LinkedIn: [Sharad Bhandari](https://linkedin.com/in/SharadS28N)
- Email: sharad.bhandari222@gmail.com

---

<p align="center">
  <sub>Built with mass mass coffee and mass mass passion</sub>
</p>
