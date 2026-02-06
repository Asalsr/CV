'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from '@/components/figma/ImageWithFallback';

interface ThumbnailStripProps {
  images: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
  title: string;
}

export default function ThumbnailStrip({
  images,
  currentIndex,
  onSelect,
  title,
}: ThumbnailStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const activeThumb = container.children[currentIndex] as HTMLElement;
    if (activeThumb) {
      const containerRect = container.getBoundingClientRect();
      const thumbRect = activeThumb.getBoundingClientRect();

      if (thumbRect.left < containerRect.left || thumbRect.right > containerRect.right) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentIndex]);

  if (images.length <= 1) return null;

  return (
    <div
      ref={containerRef}
      className="flex justify-center gap-2 overflow-x-auto pb-2 px-4 scrollbar-thin"
      style={{
        scrollbarColor: '#5B8DEF transparent',
      }}
    >
      {images.map((img, idx) => (
        <motion.button
          key={idx}
          onClick={() => onSelect(idx)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all"
          style={{
            border: `2px solid ${
              idx === currentIndex ? '#ffffff' : 'transparent'
            }`,
            opacity: idx === currentIndex ? 1 : 0.6,
            transform: idx === currentIndex ? 'scale(1.1)' : 'scale(1)',
          }}
          aria-label={`View image ${idx + 1} of ${images.length}`}
          aria-current={idx === currentIndex ? 'true' : undefined}
        >
          <ImageWithFallback
            src={img}
            alt={`${title} - Thumbnail ${idx + 1}`}
            fill
            className="object-cover"
            sizes="80px"
          />
        </motion.button>
      ))}
    </div>
  );
}
