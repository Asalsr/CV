'use client';

import { useTranslations } from 'next-intl';
import ThemeModeToggle from '@/components/theme/ThemeModeToggle';
import LanguageSelector from '@/components/LanguageSelector';
import { Hero } from '@/components/figma/Hero';
import { Roadmap } from '@/components/figma/Roadmap';
import { Skills } from '@/components/figma/Skills';
import { ArtProjects } from '@/components/figma/ArtProjects';
import { Footer } from '@/components/figma/Footer';

export default function Home() {
  const t = useTranslations('nav');

  const navItems = [
    { key: 'journey' as const, href: '#roadmap' },
    { key: 'skills' as const, href: '#skills' },
    { key: 'art' as const, href: '#art-projects' },
    { key: 'contact' as const, href: '#contact' },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, var(--color-page-from), var(--color-page-via), var(--color-page-to))',
      }}
    >
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
              className="text-xl font-bold bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary-500), var(--color-accent-500))' }}
            >
              SS
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
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
      <Roadmap />
      <Skills />
      <ArtProjects />
      <Footer />

      {/* Floating Theme Toggle */}
      <ThemeModeToggle />
    </div>
  );
}
