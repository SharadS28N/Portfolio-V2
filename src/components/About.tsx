import { motion } from 'framer-motion';
import { Code2, GraduationCap, Brain } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/50 p-6 rounded-2xl backdrop-blur-sm border border-yellow-400/20"
          >
            <Code2 className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Web Developer</h3>
            <p className="text-gray-300">Passionate about creating beautiful and functional web applications</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/50 p-6 rounded-2xl backdrop-blur-sm border border-yellow-400/20"
          >
            <GraduationCap className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Student</h3>
            <p className="text-gray-300">Grade 12 at Global School of Science, pursuing excellence in education</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/50 p-6 rounded-2xl backdrop-blur-sm border border-yellow-400/20"
          >
            <Brain className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Quick Learner</h3>
            <p className="text-gray-300">Always eager to learn new technologies and improve my skills</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}