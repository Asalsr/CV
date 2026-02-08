'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

const heroImage = '/images/hero-bg.png';

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
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

        {/* Technical Grid Overlay (left side) */}
        <motion.svg
          className="absolute left-0 top-0 w-1/2 h-full opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5B8DEF" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Animated grid lines dissolving to right */}
          <motion.line
            x1="0" y1="20%" x2="100%" y2="20%"
            stroke="#5B8DEF"
            strokeWidth="1"
            initial={{ pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.line
            x1="0" y1="50%" x2="100%" y2="50%"
            stroke="#FFB800"
            strokeWidth="1"
            initial={{ pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.line
            x1="0" y1="80%" x2="100%" y2="80%"
            stroke="#0EA5E9"
            strokeWidth="1"
            initial={{ pathLength: 1, opacity: 1 }}
            animate={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 3, delay: 1, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.svg>

        {/* Organic Paint Particles (right side) */}
        <div className="absolute right-0 top-0 w-1/2 h-full">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                background: i % 3 === 0
                  ? 'radial-gradient(circle, rgba(91,141,239,0.6) 0%, rgba(91,141,239,0) 70%)'
                  : i % 3 === 1
                  ? 'radial-gradient(circle, rgba(255,184,0,0.6) 0%, rgba(255,184,0,0) 70%)'
                  : 'radial-gradient(circle, rgba(255,107,53,0.6) 0%, rgba(255,107,53,0) 70%)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(8px)',
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E1A]/60 via-[#0F1E5C]/40 to-[#1C39BB]/60 dark:from-[#0A0E1A]/80 dark:via-[#0F1729]/60 dark:to-[#1A2332]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
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
              <Code className="w-12 h-12 text-[#5B8DEF] dark:text-[#7BA8F5]" />
              {/* Grid particles around icon */}
              <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]">
                <rect x="0" y="0" width="8" height="8" fill="#5B8DEF" opacity="0.3" />
                <rect x="calc(100% - 8px)" y="0" width="8" height="8" fill="#5B8DEF" opacity="0.3" />
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
              <Sparkles className="w-12 h-12 text-[#FFB800] dark:text-[#FFC947]" />
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
              <Palette className="w-12 h-12 text-[#FF6B35] dark:text-[#FF8B66]" />
              {/* Paint splatter effect */}
              <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none">
                <circle cx="10%" cy="10%" r="3" fill="#FF6B35" opacity="0.4" />
                <circle cx="90%" cy="20%" r="2" fill="#FFB800" opacity="0.4" />
                <circle cx="80%" cy="90%" r="2.5" fill="#FF6B35" opacity="0.4" />
              </svg>
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-[#1C39BB] via-[#FFB800] to-[#0EA5E9] dark:from-[#5B8DEF] dark:via-[#FFC947] dark:to-[#38BDF8] bg-clip-text text-transparent">
            Saeedeh Sarmadi
          </h1>

          <div className="relative inline-block mb-6">
            <p className="text-2xl md:text-3xl text-gray-100 dark:text-gray-200">
              Agentic Developer | Full-Stack Engineer | UI/UX Enthusiast
            </p>
            {/* Paint brush stroke underline */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-4"
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
                  <stop offset="0%" stopColor="#5B8DEF" />
                  <stop offset="50%" stopColor="#FFB800" />
                  <stop offset="100%" stopColor="#0EA5E9" />
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
          className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 mb-12"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#roadmap"
            className="px-8 py-3 bg-gradient-to-r from-[#1C39BB] to-[#5B8DEF] dark:from-[#5B8DEF] dark:to-[#3D6FD9] rounded-full text-white hover:shadow-lg hover:shadow-[#5B8DEF]/50 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Explore My Journey</span>
            {/* Paint splatter on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20"
              initial={false}
            >
              <svg className="w-full h-full">
                <circle cx="20%" cy="50%" r="10" fill="#FFB800" />
                <circle cx="80%" cy="50%" r="8" fill="#FF6B35" />
              </svg>
            </motion.div>
          </a>
          <a
            href="#skills"
            className="px-8 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full text-white border-2 border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all relative overflow-hidden group"
            style={{ borderStyle: 'dashed' }}
          >
            <span className="relative z-10">View Skills</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
