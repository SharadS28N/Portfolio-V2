import { motion } from 'framer-motion';
import ProjectsGrid from '../projects/ProjectsGrid';

export default function Projects() {
  return (
    <section id="projects" className="py-20 min-h-screen flex flex-col justify-center">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-12 text-yellow-400"
      >
        My Projects
      </motion.h2>
      <ProjectsGrid />
    </section>
  );
}