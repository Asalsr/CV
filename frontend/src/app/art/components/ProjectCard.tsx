'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ValidatedArtwork } from '../types/artwork';
import ImageWithFallback from '@/components/figma/ImageWithFallback';

interface ProjectCardProps {
  artwork: ValidatedArtwork;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ artwork, onClick, index }: ProjectCardProps) {
  const t = useTranslations('art.projectCard');
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/5 dark:bg-white/5 backdrop-blur-sm border-2 border-white/10 dark:border-white/20 hover:border-[var(--persian-blue)]/30 transition-all">
        {/* Paint stroke border — matches home cards */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-10">
          <rect
            x="2" y="2"
            width="calc(100% - 4px)" height="calc(100% - 4px)"
            fill="none"
            stroke="url(#art-card-paint)"
            strokeWidth="2"
            rx="16"
            strokeDasharray="8,4"
          />
          <defs>
            <linearGradient id="art-card-paint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--persian-blue)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--golden-yellow)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--sunset-orange)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <div className="aspect-[4/3] relative">
          <ImageWithFallback
            src={artwork.validThumbnail}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />

          {artwork.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
              >
                <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
              </motion.div>
            </div>
          )}

          {artwork.validImages.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm z-10">
              {t('images', { count: artwork.validImages.length })}
            </div>
          )}

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <span className="px-3 py-1 text-xs font-medium rounded-full text-white backdrop-blur-sm bg-[var(--persian-blue)]/30 border border-[var(--persian-blue)]/20">
              {artwork.category}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-semibold text-lg">{artwork.title}</h3>
            <p className="text-white/70 text-sm">{artwork.year}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 md:hidden">
        <h3 className="font-semibold text-white">{artwork.title}</h3>
        <p className="text-sm text-gray-300 dark:text-gray-400">{artwork.category} &bull; {artwork.year}</p>
      </div>
    </motion.div>
  );
}
