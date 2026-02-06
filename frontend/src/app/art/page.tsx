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
    <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#0A0E1A] to-[#0F1729]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 backdrop-blur-sm bg-[#0F1729]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#5B8DEF] to-[#FFC947] bg-clip-text text-transparent">
                  Art Portfolio
                </h1>
                <p className="text-sm mt-0.5 text-gray-400">
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
      <footer className="border-t border-white/10 py-8 bg-[#0F1729]/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Saeedeh Sarmadi. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="https://www.behance.net/asalsr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#5B8DEF] hover:text-[#7BA8F5] transition-colors hover:underline"
            >
              Behance
            </a>
            <span className="text-white/20">&bull;</span>
            <Link
              href="/"
              className="text-sm text-[#5B8DEF] hover:text-[#7BA8F5] transition-colors hover:underline"
            >
              Developer Portfolio
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating Theme Toggle */}
      <ThemeModeToggle />

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
