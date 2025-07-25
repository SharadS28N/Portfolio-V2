import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  skill: {
    name: string;
    icon: LucideIcon;
    color: string;
    docsUrl: string;
  };
  index: number;
  categoryIndex: number;
}

export default function SkillCard({ skill, index, categoryIndex }: SkillCardProps) {
  const { name, icon: Icon, color, docsUrl } = skill;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.1 + (index * 0.05) + (categoryIndex * 0.1),
        duration: 0.5
      }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-black/50 p-4 rounded-xl backdrop-blur-sm border border-yellow-400/20 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <Icon className={`w-10 h-10 mb-3 ${color}`} />
      <p className="text-white text-center font-medium">{name}</p>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-3"
          >
            <Icon className={`w-8 h-8 mb-2 ${color}`} />
            <p className="text-white font-bold mb-2">{name}</p>
            <motion.a 
              href={docsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-yellow-400/20 text-yellow-400 text-sm font-medium hover:bg-yellow-400/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Documentation
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}