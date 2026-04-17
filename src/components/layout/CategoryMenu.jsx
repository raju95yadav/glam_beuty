import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  'Makeup',
  'Skin Care',
  'Hair Care',
  'Fragrance',
  'Personal Care',
  'Mom & Baby',
  'Health & Wellness',
  'Men',
  'Luxe'
];

const containerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { opacity: 1, y: 0 }
};

const CategoryMenu = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm"
    >
      <div className="max-w-[1240px] mx-auto px-4">
        <ul className="flex items-center justify-between h-12 overflow-x-auto no-scrollbar gap-6 md:gap-0">
          {categories.map((category) => (
            <motion.li 
              key={category} 
              variants={itemVariants}
              className="group relative flex-shrink-0"
            >
              <Link
                to={`/category/${category.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-')}`}
                className="text-[12px] md:text-[13px] font-medium text-gray-700 hover:text-[#fc2779] transition-colors duration-200 uppercase tracking-wide py-3 block whitespace-nowrap"
              >
                {category}
              </Link>
              <motion.div 
                className="absolute bottom-1 left-0 h-[2px] bg-[#fc2779]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default CategoryMenu;

