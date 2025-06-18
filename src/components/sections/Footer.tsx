import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-yellow-400/20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-300">Made with</span>
            <Heart className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-gray-300">by Sharad Bhandari</span>
          </div>

          <div className="flex gap-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/sharads28n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/sharadb2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:sharad.bhandari222@gmail.com"
              className="text-yellow-400 hover:text-yellow-300"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>

          <div className="text-gray-300">
            © {currentYear} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}