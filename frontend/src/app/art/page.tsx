'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useAppSelector } from '@/lib/redux/hooks';
import ThemeModeToggle from '@/components/theme/ThemeModeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { SectionDivider } from '@/components/figma/SectionDivider';

import { artworks } from './data/artworks';
import { ArtworkCategory } from './types/artwork';
import HeroSection from './components/HeroSection';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import InteractiveTimeline from './components/InteractiveTimeline';
import { useProjectModal } from './hooks/useProjectModal';
import { useValidatedArtworks } from './hooks/useValidatedArtworks';

/** Reads ?project= query param and auto-opens the matching modal */
function ProjectAutoOpener({
  artworks: validatedArtworks,
  openProject,
  isOpen,
}: {
  artworks: import('./types/artwork').ValidatedArtwork[];
  openProject: (p: import('./types/artwork').ValidatedArtwork) => void;
  isOpen: boolean;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const projectId = searchParams.get('project');
    if (projectId && validatedArtworks.length > 0 && !isOpen) {
      const project = validatedArtworks.find((a) => a.id === Number(projectId));
      if (project) {
        openProject(project);
      }
    }
  }, [searchParams, validatedArtworks]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default function ArtPortfolio() {
  const t = useTranslations('art.page');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  useAppSelector((state) => state.theme);
  const { artworks: validatedArtworks, isValidating } = useValidatedArtworks(artworks);
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory | 'All'>('All');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const projectGridRef = useRef<HTMLDivElement>(null);

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
  } = useProjectModal({ artworks: validatedArtworks });

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
      projectGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#0F1E5C] to-[#1C39BB] dark:from-[#0A0E1A] dark:via-[#0F1729] dark:to-[#1A2332]">
      {/* Header — matches home nav glass style */}
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
                className="flex items-center gap-2 text-sm text-gray-300 dark:text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('back')}
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1C39BB] to-[#FFB800] dark:from-[#5B8DEF] dark:to-[#FFC947]">
                  {t('title')}
                </h1>
                <p className="text-sm mt-0.5 text-gray-300 dark:text-gray-400">
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
        artworks={validatedArtworks}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <SectionDivider variant="wave" color1="#5B8DEF" color2="#FFB800" />

      <div ref={projectGridRef}>
        <ProjectGrid
          artworks={validatedArtworks}
          isValidating={isValidating}
          categoryFilter={selectedCategory}
          yearFilter={selectedYear}
          onProjectClick={openProject}
        />
      </div>

      <SectionDivider variant="curve" color1="#0EA5E9" color2="#FF6B35" />

      <InteractiveTimeline
        artworks={validatedArtworks}
        selectedYear={selectedYear}
        onYearSelect={handleYearSelect}
      />

      <footer className="relative py-16 px-4 border-t border-white/10 dark:border-white/20">
        <div className="max-w-7xl mx-auto text-center text-gray-300 dark:text-gray-400">
          <p className="flex items-center justify-center gap-2">
            Designed &amp; Built with <Heart className="w-4 h-4 text-[var(--sunset-orange)]" fill="currentColor" /> by Saeedeh Sarmadi &copy; 2026
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm">
            <a
              href="https://www.behance.net/asalsr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5B8DEF] dark:text-[#7BA8F5] hover:underline transition-colors"
            >
              Behance
            </a>
            <span className="text-white/20">&bull;</span>
            <Link
              href="/"
              className="text-[#5B8DEF] dark:text-[#7BA8F5] hover:underline transition-colors"
            >
              {t('devPortfolio')}
            </Link>
            <span className="text-white/20">&bull;</span>
            <a
              href={`${basePath}/CV-Saeedeh-Sarmadi.pdf`}
              download
              className="text-[#5B8DEF] dark:text-[#7BA8F5] hover:underline transition-colors"
            >
              {t('downloadCv')}
            </a>
          </div>
        </div>
      </footer>

      <ThemeModeToggle />

      <Suspense fallback={null}>
        <ProjectAutoOpener
          artworks={validatedArtworks}
          openProject={openProject}
          isOpen={isOpen}
        />
      </Suspense>

      <ProjectModal
        isOpen={isOpen}
        project={currentProject}
        currentImageIndex={currentImageIndex}
        allArtworks={validatedArtworks}
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
