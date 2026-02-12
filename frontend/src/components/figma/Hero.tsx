'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const heroImage = `${basePath}/images/hero-bg.png`;

// Deterministic pseudo-random to avoid SSR hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Pre-compute particle data so server and client render identically
const particles = Array.from({ length: 15 }, (_, i) => ({
  width: seededRandom(i * 4) * 60 + 20,
  height: seededRandom(i * 4 + 1) * 60 + 20,
  left: seededRandom(i * 4 + 2) * 100,
  top: seededRandom(i * 4 + 3) * 100,
  animX: seededRandom(i * 5) * 100 - 50,
  animY: seededRandom(i * 5 + 1) * 100 - 50,
  duration: seededRandom(i * 5 + 2) * 10 + 10,
  delay: seededRandom(i * 5 + 3) * 2,
}));

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20 md:py-0">
      {/* Wave/Grid Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
          }}
        />

        {/* Technical Grid Overlay (hidden on mobile, left side on desktop) */}
        <motion.svg
          className="hidden md:block absolute left-0 top-0 w-1/2 h-full opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--persian-blue)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Animated grid lines dissolving to right */}
          <motion.line
            x1="0" y1="20%" x2="100%" y2="20%"
            stroke="var(--persian-blue)"
            strokeWidth="1"
            initial={{ pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.line
            x1="0" y1="50%" x2="100%" y2="50%"
            stroke="var(--golden-yellow)"
            strokeWidth="1"
            initial={{ pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.line
            x1="0" y1="80%" x2="100%" y2="80%"
            stroke="var(--teal)"
            strokeWidth="1"
            initial={{ pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 3, delay: 1, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.svg>

        {/* Organic Paint Particles (simplified on mobile, right side on desktop) */}
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i > 7 ? 'hidden md:block' : ''}`}
              style={{
                width: p.width,
                height: p.height,
                background: i % 3 === 0
                  ? 'radial-gradient(circle, color-mix(in srgb, var(--persian-blue) 60%, transparent) 0%, transparent 70%)'
                  : i % 3 === 1
                  ? 'radial-gradient(circle, color-mix(in srgb, var(--golden-yellow) 60%, transparent) 0%, transparent 70%)'
                  : 'radial-gradient(circle, color-mix(in srgb, var(--sunset-orange) 60%, transparent) 0%, transparent 70%)',
                left: `${p.left}%`,
                top: `${p.top}%`,
                filter: 'blur(8px)',
              }}
              animate={{
                x: [0, p.animX],
                y: [0, p.animY],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)]/60 via-[var(--persian-blue-dark)]/40 to-[var(--persian-blue)]/60 dark:from-[var(--navy)]/80 dark:via-[var(--color-surface)]/60 dark:to-[var(--persian-blue-dark)]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="relative"
            >
              <Code className="w-8 h-8 md:w-12 md:h-12 text-[var(--persian-blue)]" />
              {/* Grid particles around icon - hidden on mobile */}
              <svg className="hidden md:block absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]">
                <rect x="0" y="0" width="8" height="8" fill="var(--persian-blue)" opacity="0.3" />
                <rect x="calc(100% - 8px)" y="0" width="8" height="8" fill="var(--persian-blue)" opacity="0.3" />
              </svg>
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-[var(--golden-yellow)]" />
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="relative"
            >
              <Palette className="w-8 h-8 md:w-12 md:h-12 text-[var(--sunset-orange)]" />
              {/* Paint splatter effect - hidden on mobile */}
              <svg className="hidden md:block absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none">
                <circle cx="10%" cy="10%" r="3" fill="var(--sunset-orange)" opacity="0.4" />
                <circle cx="90%" cy="20%" r="2" fill="var(--golden-yellow)" opacity="0.4" />
                <circle cx="80%" cy="90%" r="2.5" fill="var(--sunset-orange)" opacity="0.4" />
              </svg>
            </motion.div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl mb-4 md:mb-6 bg-gradient-to-r from-[var(--persian-blue)] via-[var(--golden-yellow)] to-[var(--teal)] bg-clip-text text-transparent px-4">
            Saeedeh Sarmadi
          </h1>

          <div className="relative inline-block mb-4 md:mb-6 px-4">
            <p className="text-lg sm:text-xl md:text-3xl text-gray-100 dark:text-gray-200">
              Agentic Developer | Full-Stack Engineer | UI/UX Enthusiast
            </p>
            {/* Paint brush stroke underline */}
            <svg
              className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-3 md:h-4"
              viewBox="0 0 500 15"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 0,8 Q 60,3 125,8 T 250,8 T 375,8 T 500,8"
                stroke="url(#paint-gradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
                style={{
                  filter: 'url(#paint-texture)'
                }}
              />
              {/* Paint texture effect */}
              <motion.path
                d="M 0,10 Q 60,5 125,10 T 250,10 T 375,10 T 500,10"
                stroke="url(#paint-gradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.2 }}
              />
              <defs>
                <linearGradient id="paint-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--persian-blue)" />
                  <stop offset="50%" stopColor="var(--golden-yellow)" />
                  <stop offset="100%" stopColor="var(--teal)" />
                </linearGradient>
                <filter id="paint-texture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                </filter>
              </defs>
            </svg>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-2xl text-gray-200 dark:text-gray-300 mb-8 md:mb-12 px-4"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          <a
            href="#roadmap"
            className="w-full sm:w-auto px-6 md:px-8 py-3 bg-gradient-to-r from-[var(--persian-blue)] to-[var(--persian-blue-light)] rounded-full text-white hover:shadow-lg hover:shadow-[var(--persian-blue)]/50 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Explore My Journey</span>
            {/* Paint splatter on hover - hidden on mobile */}
            <motion.div
              className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-20"
              initial={false}
            >
              <svg className="w-full h-full">
                <circle cx="20%" cy="50%" r="10" fill="var(--golden-yellow)" />
                <circle cx="80%" cy="50%" r="8" fill="var(--sunset-orange)" />
              </svg>
            </motion.div>
          </a>
          <a
            href="#skills"
            className="w-full sm:w-auto px-6 md:px-8 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full text-white border-2 border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all relative overflow-hidden group"
            style={{ borderStyle: 'dashed' }}
          >
            <span className="relative z-10">View Skills</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
