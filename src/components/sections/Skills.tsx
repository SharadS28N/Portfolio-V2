import { motion } from 'framer-motion';
import SkillCard from './skills/SkillCard';
import { skillCategories } from './skills/skillsData';
import SkillsAnimation from './skills/SkillsAnimation';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 min-h-screen flex items-center relative overflow-hidden">
      <SkillsAnimation />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto w-full relative z-10"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">My Skills</h2>
        
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title} 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: categoryIndex * 0.2,
                duration: 0.5,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ 
                  delay: categoryIndex * 0.2 + 0.3, 
                  duration: 0.8,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-4"
              />
              
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.2 + 0.1 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-white"
              >
                {category.title}
              </motion.h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    index={skillIndex} 
                    categoryIndex={categoryIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}