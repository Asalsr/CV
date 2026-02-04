'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ThumbnailStrip from './ThumbnailStrip';

interface ImageGalleryProps {
  images: string[];
  currentIndex: number;
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export default function ImageGallery({
  images,
  currentIndex,
  title,
  onPrev,
  onNext,
  onSelectIndex,
}: ImageGalleryProps) {
  const hasMultipleImages = images.length > 1;

  return (
    <div className="relative flex-1 flex flex-col">
      {/* Main Image Container */}
      <div className="relative flex-1 flex items-center justify-center min-h-[50vh] md:min-h-[60vh]">
        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-2 md:left-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-2 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </>
        )}

        {/* Image with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-[50vh] md:h-[60vh]"
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Counter */}
      {hasMultipleImages && (
        <div className="text-center py-2 text-white/60 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Thumbnail Strip */}
      <ThumbnailStrip
        images={images}
        currentIndex={currentIndex}
        onSelect={onSelectIndex}
        title={title}
      />
    </div>
  );
}
