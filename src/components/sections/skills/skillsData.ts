import { Code2, Globe, Database, Server, Cpu, PenTool, Layers, Smartphone, Figma, GitBranch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
  proficiency: number; // 0-100
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
        proficiency: 90
      },
      {
        name: "CSS",
        icon: PenTool,
        color: "text-blue-500",
        proficiency: 85
      },
      {
        name: "JavaScript",
        icon: Code2,
        color: "text-yellow-400",
        proficiency: 85
      },
      {
        name: "TypeScript",
        icon: Code2,
        color: "text-blue-600",
        proficiency: 80
      },
      {
        name: "React",
        icon: Globe,
        color: "text-cyan-400",
        proficiency: 85
      },
      {
        name: "Tailwind",
        icon: PenTool,
        color: "text-cyan-500",
        proficiency: 90
      },
      {
        name: "Framer Motion",
        icon: Layers,
        color: "text-purple-500",
        proficiency: 75
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
        proficiency: 80
      },
      {
        name: "Express",
        icon: Server,
        color: "text-gray-400",
        proficiency: 75
      },
      {
        name: "MongoDB",
        icon: Database,
        color: "text-green-600",
        proficiency: 70
      },
      {
        name: "SQL",
        icon: Database,
        color: "text-blue-400",
        proficiency: 65
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
        proficiency: 85
      },
      {
        name: "Figma",
        icon: Figma,
        color: "text-purple-400",
        proficiency: 70
      },
      {
        name: "Responsive Design",
        icon: Smartphone,
        color: "text-blue-500",
        proficiency: 90
      },
      {
        name: "Three.js",
        icon: Cpu,
        color: "text-gray-300",
        proficiency: 60
      },
      {
        name: "GSAP",
        icon: Layers,
        color: "text-green-400",
        proficiency: 65
      },
    ]
  }
];