'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTranslations } from 'next-intl';
import { Artwork } from '../types/artwork';
import ImageGallery from './ImageGallery';
import RelatedProjects from './RelatedProjects';

interface ProjectModalProps {
  isOpen: boolean;
  project: Artwork | null;
  currentImageIndex: number;
  allArtworks: Artwork[];
  onClose: () => void;
  onPrevProject: () => void;
  onNextProject: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
  onSelectProject: (artwork: Artwork) => void;
}

export default function ProjectModal({
  isOpen,
  project,
  currentImageIndex,
  allArtworks,
  onClose,
  onPrevProject,
  onNextProject,
  onPrevImage,
  onNextImage,
  onSelectImage,
  onSelectProject,
}: ProjectModalProps) {
  const t = useTranslations('art.modal');
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl min-h-screen md:min-h-0 md:my-8 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label={t('closeModal')}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Project Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onPrevProject}
                  className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 flex items-center gap-1 text-sm"
                  aria-label={t('prevProject')}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden md:inline">{t('prev')}</span>
                </button>
                <button
                  onClick={onNextProject}
                  className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 flex items-center gap-1 text-sm"
                  aria-label={t('nextProject')}
                >
                  <span className="hidden md:inline">{t('next')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {project.type === 'video' && project.videoId ? (
              /* Video Player */
              <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1`}
                    title={project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              /* Image Gallery */
              <ImageGallery
                images={project.images}
                currentIndex={currentImageIndex}
                title={project.title}
                onPrev={onPrevImage}
                onNext={onNextImage}
                onSelectIndex={onSelectImage}
              />
            )}

            {/* Project Info */}
            <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto w-full">
              <div className="text-center mb-6">
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                  {project.title}
                </h2>
                <p className="text-white/60">
                  {project.category} • {project.year}
                </p>
                {project.externalLink && (
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('viewExternal')}
                  </a>
                )}
              </div>

              {/* Description */}
              {project.description && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h3 className="text-white text-lg font-bold mt-4 mb-2 first:mt-0">
                            {children}
                          </h3>
                        ),
                        h2: ({ children }) => (
                          <h4 className="text-white text-base font-bold mt-4 mb-2 first:mt-0">
                            {children}
                          </h4>
                        ),
                        h3: ({ children }) => (
                          <h5 className="text-white text-sm font-bold mt-3 mb-1">
                            {children}
                          </h5>
                        ),
                        p: ({ children }) => (
                          <p className="text-white/80 text-sm leading-relaxed mb-3 last:mb-0">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-white font-semibold">
                            {children}
                          </strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="text-white/80 text-sm list-disc list-inside mb-3 space-y-1">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="text-white/80 text-sm list-decimal list-inside mb-3 space-y-1">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-white/80">{children}</li>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {project.description}
                    </ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Keyboard Hints */}
              <div className="hidden md:flex justify-center gap-6 text-white/40 text-xs mb-6">
                <span>{t('escToClose')}</span>
                <span>{t('arrowsForImages')}</span>
                <span>{t('shiftArrowsForProjects')}</span>
              </div>

              {/* Related Projects */}
              <RelatedProjects
                currentArtwork={project}
                allArtworks={allArtworks}
                onProjectClick={onSelectProject}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
