import { Code2, GraduationCap, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface AboutItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const aboutItems: AboutItem[] = [
  {
    icon: Code2,
    title: "Web Developer",
    description: "Passionate about creating beautiful and functional web applications"
  },
  {
    icon: GraduationCap,
    title: "Student",
    description: "Grade 12 at Global School of Science, pursuing excellence in education"
  },
  {
    icon: Brain,
    title: "Quick Learner",
    description: "Always eager to learn new technologies and improve my skills"
  }
];