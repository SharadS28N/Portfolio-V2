import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import ParticlesBackground from '../ParticlesBackground';
import profileImage from '../../assets/sharad.jpg';

export default function Hero() {
  return (
    <div id="home" className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <ParticlesBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-32 h-32 rounded-full border-4 border-yellow-400 mx-auto mb-8 overflow-hidden"
        >
          <img
            src={profileImage}
            alt="Sharad Bhandari"
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <h1 className="text-6xl font-bold mb-4 text-yellow-400">
          Sharad Bhandari
        </h1>
        <h2 className="text-2xl mb-6 text-white dark:text-white">
          Web Developer & Student
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Grade 12 student at Global School of Science with a passion for web development.
          Building the future one line of code at a time.
        </p>
        <div className="flex justify-center gap-6">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/sharads28n"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://linkedin.com/in/sharads28n/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="mailto:sharad.bhandari222@gmail.com"
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Mail size={24} />
          </motion.a>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-6 h-6 text-yellow-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}