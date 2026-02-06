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
    <section className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title with hand-drawn decoration */}
          <motion.div variants={itemVariants} className="relative inline-block mb-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span style={{ color: 'var(--color-text-primary)' }}>
                My Artistic
              </span>
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-persian-blue), var(--color-golden-yellow), var(--color-sunset-orange))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {' '}
                Journey
              </span>
            </h2>
            {/* Hand-drawn sketch decoration */}
            <motion.svg
              className="absolute -right-16 -top-8 w-16 h-16 hidden lg:block"
              viewBox="0 0 64 64"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <circle cx="32" cy="32" r="20" fill="none" stroke="var(--color-persian-blue)" strokeWidth="2" strokeDasharray="4,4" />
              <circle cx="32" cy="32" r="4" fill="var(--color-golden-yellow)" />
            </motion.svg>
            {/* Hand-drawn underline */}
            <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full max-w-md h-3" preserveAspectRatio="none">
              <motion.path
                d="M 0,2 Q 125,5 250,2 T 500,2"
                stroke="url(#hero-gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              <defs>
                <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-persian-blue)" />
                  <stop offset="50%" stopColor="var(--color-golden-yellow)" />
                  <stop offset="100%" stopColor="var(--color-sunset-orange)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

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
    <div className="text-center relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="text-3xl md:text-4xl font-bold relative"
        style={{
          background: 'linear-gradient(135deg, var(--color-persian-blue), var(--color-golden-yellow))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
        {/* Sketch circle around number */}
        <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none opacity-20">
          <motion.circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            stroke="var(--color-persian-blue)"
            strokeWidth="1"
            strokeDasharray="2,2"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{ pathLength: 1, rotate: 180 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </svg>
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
