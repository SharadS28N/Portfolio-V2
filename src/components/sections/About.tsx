import { motion } from 'framer-motion';
import AboutCard from './about/AboutCard';
import { aboutItems } from './about/aboutData';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 min-h-screen flex items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutItems.map((item, index) => (
            <AboutCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}