import { motion } from 'framer-motion';
import { ExternalLink, Github, Image as ImageIcon } from 'lucide-react';
import type { Project } from '../../hooks/useGitHubProjects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-black/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-yellow-400/20"
    >
      {project.image ? (
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-black/50">
          <ImageIcon className="w-12 h-12 text-yellow-400/50" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-yellow-400">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex gap-4">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Github className="w-5 h-5" />
          </motion.a>
          {project.demo && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}