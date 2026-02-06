'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Artwork } from '../types/artwork';
import { getRelatedProjects } from '../data/artworks';
import ImageWithFallback from '@/components/figma/ImageWithFallback';

interface RelatedProjectsProps {
  currentArtwork: Artwork;
  allArtworks: Artwork[];
  onProjectClick: (artwork: Artwork) => void;
}

export default function RelatedProjects({
  currentArtwork,
  allArtworks,
  onProjectClick,
}: RelatedProjectsProps) {
  const related = getRelatedProjects(currentArtwork, allArtworks);

  if (related.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-white/20">
      <h4 className="text-white/80 text-sm font-medium mb-4 text-center">
        Related Projects
      </h4>
      <div className="flex justify-center gap-4 overflow-x-auto pb-2">
        {related.map((artwork) => (
          <motion.button
            key={artwork.id}
            onClick={() => onProjectClick(artwork)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 group"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={artwork.thumbnail}
                alt={artwork.title}
                fill
                className="object-cover transition-transform group-hover:scale-110"
                sizes="128px"
              />
              {artwork.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                    <Play className="w-4 h-4 text-gray-900 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <span className="text-white text-xs font-medium truncate">
                  {artwork.title}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
