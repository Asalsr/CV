'use client';

import { motion } from 'framer-motion';
import { ArtworkCategory } from '../types/artwork';

interface CategoryFilterProps {
  categories: readonly (ArtworkCategory | 'All')[];
  selected: ArtworkCategory | 'All';
  onSelect: (category: ArtworkCategory | 'All') => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => {
        const isSelected = selected === category;
        return (
          <motion.button
            key={category}
            onClick={() => onSelect(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              backgroundColor: isSelected
                ? '#5B8DEF'
                : 'rgba(255, 255, 255, 0.05)',
              color: isSelected ? '#ffffff' : '#94A3B8',
              border: `1px solid ${
                isSelected
                  ? '#5B8DEF'
                  : 'rgba(255, 255, 255, 0.1)'
              }`,
              backdropFilter: isSelected ? 'none' : 'blur(4px)',
            }}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
}
