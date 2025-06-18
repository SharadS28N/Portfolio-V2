import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-4 text-yellow-400">
          Sharad Bhandari
        </h1>
        <h2 className="text-2xl mb-6 text-white">
          Web Developer & Student
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Grade 12 student at Global School of Science with a passion for web development.
          Building the future one line of code at a time.
        </p>
        <div className="flex justify-center gap-6">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/sharadbhandari"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://linkedin.com/in/sharads28n"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="mailto:sharad@example.com"
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Mail size={24} />
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}