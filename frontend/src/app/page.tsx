'use client';

import ThemeModeToggle from '@/components/theme/ThemeModeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { Hero } from '@/components/figma/Hero';
import { Roadmap } from '@/components/figma/Roadmap';
import { Skills } from '@/components/figma/Skills';
import { ArtProjects } from '@/components/figma/ArtProjects';
import { Footer } from '@/components/figma/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1729] via-[#0A0E1A] to-[#0F1729]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-xl font-bold bg-gradient-to-r from-[#5B8DEF] to-[#FFC947] bg-clip-text text-transparent">
              SS
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors text-sm">
                Journey
              </a>
              <a href="#skills" className="text-gray-300 hover:text-white transition-colors text-sm">
                Skills
              </a>
              <a href="#art-projects" className="text-gray-300 hover:text-white transition-colors text-sm">
                Art
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Hero />
      <Roadmap />
      <Skills />
      <ArtProjects />
      <Footer />

      {/* Floating Theme Toggle */}
      <ThemeModeToggle />
    </div>
  );
}
