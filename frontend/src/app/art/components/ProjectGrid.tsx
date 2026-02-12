'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ValidatedArtwork, ArtworkCategory } from '../types/artwork';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  artworks: ValidatedArtwork[];
  isValidating: boolean;
  categoryFilter: ArtworkCategory | 'All';
  yearFilter: string | null;
  onProjectClick: (artwork: ValidatedArtwork) => void;
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border-2 border-white/10">
        <div className="aspect-[4/3] animate-pulse bg-white/10" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-white/10 animate-pulse" />
      </div>
    </motion.div>
  );
}

export default function ProjectGrid({
  artworks,
  isValidating,
  categoryFilter,
  yearFilter,
  onProjectClick,
}: ProjectGridProps) {
  const t = useTranslations('art.projectGrid');

  if (isValidating) {
    return (
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            aria-busy="true"
            aria-label={t('loading')}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const filteredArtworks = artworks.filter((artwork) => {
    const categoryMatch =
      categoryFilter === 'All' || artwork.category === categoryFilter;
    const yearMatch =
      !yearFilter || artwork.year.split('-')[0] === yearFilter;
    return categoryMatch && yearMatch;
  });

  return (
    <section className="px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, index) => (
              <ProjectCard
                key={artwork.id}
                artwork={artwork}
                onClick={() => onProjectClick(artwork)}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-400">
              {t('noResults')}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
