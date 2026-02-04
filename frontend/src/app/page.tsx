'use client';

import ThemeModeToggle from '@/components/theme/ThemeModeToggle';
import ColorSchemeSelector from '@/components/theme/ColorSchemeSelector';
import { useAppSelector } from '@/lib/redux/hooks';
import { colorSchemes } from '@/config/themes';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Heart } from 'lucide-react';

export default function Home() {
  const { colorScheme, mode } = useAppSelector((state) => state.theme);
  const currentTheme = colorSchemes[colorScheme];

  const colors = currentTheme[mode];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header with Theme Controls */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-sm"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Saeedeh&apos;s Portfolio
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Theme System Demo
              </p>
            </div>

            <div className="flex items-center gap-3">
              <ColorSchemeSelector />
              <ThemeModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Full-Stack Developer
              <br />
              <span style={{ color: 'var(--color-primary-500)' }}>
                Creative Engineer
              </span>
            </h2>
            <p
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Building at the intersection of code and creativity
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="px-8 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-primary-500)',
                  color: '#ffffff',
                }}
              >
                View Projects
              </button>
              <button
                className="px-8 py-3 rounded-lg font-medium border transition-all hover:scale-105"
                style={{
                  borderColor: 'var(--color-primary-500)',
                  color: 'var(--color-primary-500)',
                }}
              >
                Download CV
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3
            className="text-3xl font-bold text-center mb-12"
            style={{ color: 'var(--color-text-primary)' }}
          >
            What I Do
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code,
                title: 'Full-Stack Development',
                desc: 'React, .NET Core, Node.js',
              },
              {
                icon: Palette,
                title: 'UI/UX Design',
                desc: 'Figma, Responsive Design',
              },
              {
                icon: Zap,
                title: 'Performance',
                desc: '60% faster queries, 40% load time',
              },
              {
                icon: Heart,
                title: 'User-Centered',
                desc: 'Accessible, intuitive interfaces',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-6 rounded-xl border hover:scale-105 transition-all"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'var(--color-primary-100)' }}
                >
                  <feature.icon
                    className="w-6 h-6"
                    style={{ color: 'var(--color-primary-600)' }}
                  />
                </div>
                <h4
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {feature.title}
                </h4>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Palette Preview */}
      <section className="py-16 px-4" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <h3
            className="text-3xl font-bold text-center mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Current Theme
          </h3>
          <p
            className="text-center mb-8"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {currentTheme.name} - {currentTheme.description}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Primary Colors */}
            <div>
              <h4
                className="font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Primary Colors
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className="h-16 rounded-lg border mb-2"
                      style={{
                        backgroundColor: colors.primary[shade as keyof typeof colors.primary],
                        borderColor: 'var(--color-border)',
                      }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <h4
                className="font-semibold mb-4"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Accent Colors
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className="h-16 rounded-lg border mb-2"
                      style={{
                        backgroundColor: colors.accent[shade as keyof typeof colors.accent],
                        borderColor: 'var(--color-border)',
                      }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {shade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Background', value: colors.background },
              { name: 'Surface', value: colors.surface },
              { name: 'Text Primary', value: colors.textPrimary },
              { name: 'Text Secondary', value: colors.textSecondary },
              { name: 'Border', value: colors.border },
            ].map((color) => (
              <div key={color.name} className="text-center">
                <div
                  className="h-20 rounded-lg border mb-2"
                  style={{
                    backgroundColor: color.value,
                    borderColor: 'var(--color-border)',
                  }}
                />
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {color.name}
                </p>
                <p
                  className="text-xs font-mono"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {color.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redux State Display */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h3
            className="text-2xl font-bold text-center mb-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Current Redux State
          </h3>
          <div
            className="p-6 rounded-xl border font-mono text-sm"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            <pre>
              {JSON.stringify(
                {
                  theme: {
                    colorScheme,
                    mode,
                  },
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </section>

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
            Built with Next.js, Redux Toolkit, Tailwind CSS & Framer Motion
          </p>
          <p
            className="mt-2 text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Theme managed with Redux • {colorSchemes[colorScheme].name} • {mode} mode
          </p>
        </div>
      </footer>
    </div>
  );
}
