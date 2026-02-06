'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Artwork } from '../types/artwork';

interface ProjectCardProps {
  artwork: Artwork;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ artwork, onClick, index }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  // Hide card if image failed to load
  if (imageError) {
    return null;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer relative"
      onClick={onClick}
    >
      <div
        className="relative rounded-xl overflow-hidden border transition-all duration-300 group-hover:shadow-xl"
        style={{
          borderColor: 'var(--color-border)',
          boxShadow: '0 0 0 0 var(--color-persian-blue-light)',
        }}
      >
        {/* Hand-drawn sketch border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <rect
            x="4"
            y="4"
            width="calc(100% - 8px)"
            height="calc(100% - 8px)"
            fill="none"
            stroke="var(--color-persian-blue)"
            strokeWidth="2"
            rx="12"
            strokeDasharray="8,4"
            opacity="0.3"
          />
        </svg>
        <div className="aspect-[4/3] relative">
          <Image
            src={artwork.thumbnail}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />

          {/* Video Play Icon */}
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

          {/* Image count badge */}
          {artwork.images.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {artwork.images.length} images
            </div>
          )}

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            }}
          />

          {/* Category Badge on Hover */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span
              className="px-3 py-1 text-xs font-medium rounded-full text-white backdrop-blur-sm relative"
              style={{
                background: 'linear-gradient(135deg, var(--color-persian-blue), var(--color-golden-yellow))',
              }}
            >
              {artwork.category}
              {/* Sketch circle around badge */}
              <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none">
                <ellipse
                  cx="50%"
                  cy="50%"
                  rx="48%"
                  ry="45%"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </svg>
            </span>
          </div>

          {/* Hover Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-semibold text-lg">{artwork.title}</h3>
            <p className="text-white/70 text-sm">{artwork.year}</p>
          </div>
        </div>
      </div>

      {/* Mobile Info (always visible) */}
      <div className="mt-3 md:hidden">
        <h3
          className="font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {artwork.title}
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {artwork.category} • {artwork.year}
        </p>
      </div>
    </motion.div>
  );
}
