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
    // Reset year filter when category changes
    if (category !== 'All') {
      setSelectedYear(null);
    }
  };

  const handleYearSelect = (year: string | null) => {
    setSelectedYear(year);
    // Reset category filter when year is selected
    if (year !== null) {
      setSelectedCategory('All');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-sm"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div>
                <h1
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Art Portfolio
                </h1>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Saeedeh Sarmadi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSelector />
              <ThemeModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection
        artworks={artworks}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Project Grid */}
      <ProjectGrid
        artworks={artworks}
        categoryFilter={selectedCategory}
        yearFilter={selectedYear}
        onProjectClick={openProject}
      />

      {/* Interactive Timeline */}
      <InteractiveTimeline
        artworks={artworks}
        selectedYear={selectedYear}
        onYearSelect={handleYearSelect}
      />

      {/* Footer */}
      <footer
        className="border-t py-8"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p style={{ color: 'var(--color-text-secondary)' }}>
            &copy; {new Date().getFullYear()} Saeedeh Sarmadi. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="https://www.behance.net/asalsr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
              style={{ color: 'var(--color-primary-500)' }}
            >
              Behance
            </a>
            <span style={{ color: 'var(--color-border)' }}>&bull;</span>
            <Link
              href="/"
              className="text-sm hover:underline"
              style={{ color: 'var(--color-primary-500)' }}
            >
              Developer Portfolio
            </Link>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
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
