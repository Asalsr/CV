'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Artwork, ArtworkCategory, CATEGORIES } from '../types/artwork';
import CategoryFilter from './CategoryFilter';

interface HeroSectionProps {
  artworks: Artwork[];
  selectedCategory: ArtworkCategory | 'All';
  onCategorySelect: (category: ArtworkCategory | 'All') => void;
}

export default function HeroSection({
  artworks,
  selectedCategory,
  onCategorySelect,
}: HeroSectionProps) {
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

    // Filter CATEGORIES to only include 'All' + categories that have artworks
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            <span style={{ color: 'var(--color-text-primary)' }}>
              My Artistic
            </span>
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {' '}
              Journey
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Exploring creativity through photography, painting, digital art, and
            design
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-6 md:gap-12 mb-10"
          >
            <StatItem value={stats.projectCount} label="Projects" />
            <div
              className="w-px h-8"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
            <StatItem value={stats.yearsActive} label="Years" />
            <div
              className="w-px h-8"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
            <StatItem value={stats.categoryCount} label="Mediums" />
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants}>
            <CategoryFilter
              categories={availableCategories}
              selected={selectedCategory}
              onSelect={onCategorySelect}
            />
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
        className="text-3xl md:text-4xl font-bold"
        style={{ color: 'var(--color-primary-500)' }}
      >
        {value}
      </motion.div>
      <div
        className="text-sm md:text-base"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {label}
      </div>
    </div>
  );
}
