'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Artwork, ArtworkCategory } from '../types/artwork';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  artworks: Artwork[];
  categoryFilter: ArtworkCategory | 'All';
  yearFilter: string | null;
  onProjectClick: (artwork: Artwork) => void;
}

export default function ProjectGrid({
  artworks,
  categoryFilter,
  yearFilter,
  onProjectClick,
}: ProjectGridProps) {
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
              No projects found for the selected filters.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
