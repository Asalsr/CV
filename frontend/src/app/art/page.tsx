'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { useAppSelector } from '@/lib/redux/hooks';
import ThemeModeToggle from '@/components/theme/ThemeModeToggle';
import LanguageSelector from '@/components/LanguageSelector';

import { artworks } from './data/artworks';
import { ArtworkCategory } from './types/artwork';
import HeroSection from './components/HeroSection';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import InteractiveTimeline from './components/InteractiveTimeline';
import { useProjectModal } from './hooks/useProjectModal';

export default function ArtPortfolio() {
  useAppSelector((state) => state.theme);
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory | 'All'>('All');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const {
    isOpen,
    currentProject,
    currentImageIndex,
    openProject,
    closeProject,
    nextProject,
    prevProject,
    nextImage,
    prevImage,
    setImageIndex,
  } = useProjectModal({ artworks });

  const handleCategorySelect = (category: ArtworkCategory | 'All') => {
    setSelectedCategory(category);
    if (category !== 'All') {
      setSelectedYear(null);
    }
  };

  const handleYearSelect = (year: string | null) => {
    setSelectedYear(year);
    if (year !== null) {
      setSelectedCategory('All');
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, var(--color-page-from), var(--color-page-via), var(--color-page-to))',
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-30 backdrop-blur-sm"
        style={{
          borderBottom: '1px solid var(--color-glass-border)',
          backgroundColor: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div>
                <h1
                  className="text-xl md:text-2xl font-bold bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary-500), var(--color-accent-500))' }}
                >
                  Art Portfolio
                </h1>
                <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  Saeedeh Sarmadi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <HeroSection
        artworks={artworks}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <ProjectGrid
        artworks={artworks}
        categoryFilter={selectedCategory}
        yearFilter={selectedYear}
        onProjectClick={openProject}
      />

      <InteractiveTimeline
        artworks={artworks}
        selectedYear={selectedYear}
        onYearSelect={handleYearSelect}
      />

      <footer className="py-8" style={{ borderTop: '1px solid var(--color-glass-border)', backgroundColor: 'color-mix(in srgb, var(--color-surface) 50%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p style={{ color: 'var(--color-text-secondary)' }}>
            &copy; {new Date().getFullYear()} Saeedeh Sarmadi. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="https://www.behance.net/asalsr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:underline"
              style={{ color: 'var(--color-primary-500)' }}
            >
              Behance
            </a>
            <span style={{ color: 'var(--color-glass-border)' }}>&bull;</span>
            <Link
              href="/"
              className="text-sm transition-colors hover:underline"
              style={{ color: 'var(--color-primary-500)' }}
            >
              Developer Portfolio
            </Link>
          </div>
        </div>
      </footer>

      <ThemeModeToggle />

      <ProjectModal
        isOpen={isOpen}
        project={currentProject}
        currentImageIndex={currentImageIndex}
        allArtworks={artworks}
        onClose={closeProject}
        onPrevProject={prevProject}
        onNextProject={nextProject}
        onPrevImage={prevImage}
        onNextImage={nextImage}
        onSelectImage={setImageIndex}
        onSelectProject={openProject}
      />
    </div>
  );
}
