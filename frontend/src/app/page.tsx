'use client';

import { useTranslations } from 'next-intl';
import ThemeModeToggle from '@/components/theme/ThemeModeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { Hero } from '@/components/figma/Hero';
import { Roadmap } from '@/components/figma/Roadmap';
import { Skills } from '@/components/figma/Skills';
import { ArtProjects } from '@/components/figma/ArtProjects';
import { Footer } from '@/components/figma/Footer';
import { SectionDivider } from '@/components/figma/SectionDivider';

export default function Home() {
  const t = useTranslations('nav');

  const navItems = [
    { key: 'journey' as const, href: '#roadmap' },
    { key: 'skills' as const, href: '#skills' },
    { key: 'art' as const, href: '/art' },
    { key: 'contact' as const, href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E1A] via-[#0F1E5C] to-[#1C39BB] dark:from-[#0A0E1A] dark:via-[#0F1729] dark:to-[#1A2332]">
      {/* Navigation Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm"
        style={{
          borderBottom: '1px solid var(--color-glass-border)',
          backgroundColor: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1C39BB] to-[#FFB800] dark:from-[#5B8DEF] dark:to-[#FFC947]"
            >
              SS
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm text-gray-300 dark:text-gray-400 hover:text-white transition-colors"
                >
                  {t(item.key)}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Hero />
      <SectionDivider variant="wave" color1="#5B8DEF" color2="#FFB800" />
      <Roadmap />
      <SectionDivider variant="curve" color1="#0EA5E9" color2="#FF6B35" />
      <Skills />
      <SectionDivider variant="organic" color1="#FFB800" color2="#5B8DEF" />
      <ArtProjects />
      <Footer />

      {/* Floating Theme Toggle */}
      <ThemeModeToggle />
    </div>
  );
}
