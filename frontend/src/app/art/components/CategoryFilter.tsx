'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('art.categories');

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
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
              isSelected
                ? 'bg-gradient-to-r from-[var(--persian-blue)] to-[var(--persian-blue-light)] text-white border border-white/20'
                : 'bg-white/5 dark:bg-white/5 text-gray-300 dark:text-gray-400 border border-white/10 dark:border-white/20 hover:border-[var(--persian-blue)]/30'
            }`}
          >
            {t(category)}
          </motion.button>
        );
      })}
    </div>
  );
}
