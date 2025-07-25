import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  skill: {
    name: string;
    icon: LucideIcon;
    color: string;
    proficiency: number; // 0-100
  };
  index: number;
  categoryIndex: number;
}

export default function SkillCard({ skill, index, categoryIndex }: SkillCardProps) {
  const { name, icon: Icon, color, proficiency } = skill;
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
      
      <div className="w-full bg-gray-700/50 rounded-full h-2 mt-3">
        <motion.div 
          className={`h-2 rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          transition={{ delay: 0.5 + (index * 0.05), duration: 0.8 }}
          viewport={{ once: true }}
        />
      </div>
      
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
            <p className="text-white font-bold mb-1">{name}</p>
            <p className="text-yellow-400 text-sm font-medium mb-2">{proficiency}% Proficiency</p>
            <div className="w-full bg-gray-700/50 rounded-full h-3">
              <motion.div 
                className={`h-3 rounded-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${proficiency}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}