import { motion } from 'framer-motion';

const projects = [
  {
    title: "Project 1",
    description: "A web application built with React and Node.js",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Project 2",
    description: "Mobile-first responsive design implementation",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    title: "Project 3",
    description: "Full-stack application with modern technologies",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

export default function Projects() {
  return (
    <section className="py-20 px-4">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl font-bold text-center mb-12 text-yellow-400"
      >
        My Projects
      </motion.h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-black/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-yellow-400/20"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-yellow-400">{project.title}</h3>
              <p className="text-gray-300">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}