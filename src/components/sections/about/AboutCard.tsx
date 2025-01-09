import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AboutCardProps {
  item: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
}

export default function AboutCard({ item, index }: AboutCardProps) {
  const { icon: Icon, title, description } = item;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black/50 p-6 rounded-2xl backdrop-blur-sm border border-yellow-400/20"
    >
      <Icon className="w-12 h-12 text-yellow-400 mb-4" />
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}