'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ValidatedArtwork, ArtworkCategory, CATEGORIES } from '../types/artwork';
import CategoryFilter from './CategoryFilter';

interface HeroSectionProps {
  artworks: ValidatedArtwork[];
  selectedCategory: ArtworkCategory | 'All';
  onCategorySelect: (category: ArtworkCategory | 'All') => void;
}

export default function HeroSection({
  artworks,
  selectedCategory,
  onCategorySelect,
}: HeroSectionProps) {
  const t = useTranslations('art.hero');
  const { stats, availableCategories } = useMemo(() => {
    const years = new Set<string>();
    const categoriesInUse = new Set<ArtworkCategory>();

    artworks.forEach((artwork) => {
      const yearParts = artwork.year.split('-');
      yearParts.forEach((y) => years.add(y));
      categoriesInUse.add(artwork.category);
    });

    const sortedYears = Array.from(years).sort();
    const minYear = parseInt(sortedYears[0]);
    const maxYear = parseInt(sortedYears[sortedYears.length - 1]);

    const filteredCategories = CATEGORIES.filter(
      (cat) => cat === 'All' || categoriesInUse.has(cat as ArtworkCategory)
    );

    return {
      stats: {
        projectCount: artworks.length,
        yearsActive: maxYear - minYear + 1,
        categoryCount: categoriesInUse.size,
      },
      availableCategories: filteredCategories,
    };
  }, [artworks]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="relative inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">{t('headingWhite')}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--sunset-orange)] via-[var(--golden-yellow)] to-[var(--persian-blue)]">
                {t('headingGradient')}
              </span>
            </h2>
            {/* Paint brush decoration — matches home headings */}
            <svg className="absolute -right-16 top-0 w-16 h-16 hidden lg:block" viewBox="0 0 64 64">
              <motion.path
                d="M 10,32 Q 20,10 32,10 Q 44,10 54,32 Q 44,54 32,54 Q 20,54 10,32 Z"
                fill="none"
                stroke="var(--golden-yellow)"
                strokeWidth="2"
                strokeDasharray="4,2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
            {/* Paint stroke underline */}
            <svg className="absolute -bottom-2 left-1/4 w-1/2 h-3" viewBox="0 0 100 6" preserveAspectRatio="none">
              <motion.path
                d="M 0,1 Q 25,5 50,1 T 100,1"
                stroke="var(--golden-yellow)"
                strokeWidth="3"
                fill="none"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
            </svg>
          </motion.div>

          <motion.p variants={itemVariants} className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200 dark:text-gray-300">
            {t('subtitle')}
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center items-center gap-6 md:gap-12 mb-10">
            <StatItem value={stats.projectCount} label={t('projects')} />
            <div className="w-px h-8 bg-white/10 dark:bg-white/20" />
            <StatItem value={stats.yearsActive} label={t('years')} />
            <div className="w-px h-8 bg-white/10 dark:bg-white/20" />
            <StatItem value={stats.categoryCount} label={t('mediums')} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <CategoryFilter categories={availableCategories} selected={selectedCategory} onSelect={onCategorySelect} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="text-3xl md:text-4xl font-bold text-[var(--persian-blue)]"
      >
        {value}
      </motion.div>
      <div className="text-sm md:text-base text-gray-300 dark:text-gray-400">{label}</div>
    </div>
  );
}
