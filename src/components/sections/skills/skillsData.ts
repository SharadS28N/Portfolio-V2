import { Code2, Globe, Database, Server, Cpu, PenTool, Layers, Smartphone, Figma, GitBranch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
  docsUrl: string; // Documentation URL
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      {
        name: "HTML",
        icon: Code2,
        color: "text-orange-500",
        docsUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML"
      },
      {
        name: "CSS",
        icon: PenTool,
        color: "text-blue-500",
        docsUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS"
      },
      {
        name: "JavaScript",
        icon: Code2,
        color: "text-yellow-400",
        docsUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      },
      {
        name: "TypeScript",
        icon: Code2,
        color: "text-blue-600",
        docsUrl: "https://www.typescriptlang.org/docs/"
      },
      {
        name: "React",
        icon: Globe,
        color: "text-cyan-400",
        docsUrl: "https://react.dev/"
      },
      {
        name: "Tailwind",
        icon: PenTool,
        color: "text-cyan-500",
        docsUrl: "https://tailwindcss.com/docs"
      },
      {
        name: "Framer Motion",
        icon: Layers,
        color: "text-purple-500",
        docsUrl: "https://www.framer.com/motion/"
      },
    ]
  },
  {
    title: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: Server,
        color: "text-green-500",
        docsUrl: "https://nodejs.org/en/docs/"
      },
      {
        name: "Express",
        icon: Server,
        color: "text-gray-400",
        docsUrl: "https://expressjs.com/"
      },
      {
        name: "MongoDB",
        icon: Database,
        color: "text-green-600",
        docsUrl: "https://docs.mongodb.com/"
      },
      {
        name: "SQL",
        icon: Database,
        color: "text-blue-400",
        docsUrl: "https://www.w3schools.com/sql/"
      },
    ]
  },
  {
    title: "Tools & Others",
    skills: [
      {
        name: "Git",
        icon: GitBranch,
        color: "text-orange-600",
        docsUrl: "https://git-scm.com/doc"
      },
      {
        name: "Figma",
        icon: Figma,
        color: "text-purple-400",
        docsUrl: "https://help.figma.com/"
      },
      {
        name: "Responsive Design",
        icon: Smartphone,
        color: "text-blue-500",
        docsUrl: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design"
      },
      {
        name: "Three.js",
        icon: Cpu,
        color: "text-gray-300",
        docsUrl: "https://threejs.org/docs/"
      },
      {
        name: "GSAP",
        icon: Layers,
        color: "text-green-400",
        docsUrl: "https://greensock.com/docs/"
      },
    ]
  }
];