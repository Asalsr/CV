'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-[#5B8DEF]/10 dark:bg-[#5B8DEF]/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-[#FFB800]/10 dark:bg-[#FFC947]/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Code className="w-12 h-12 text-[#5B8DEF] dark:text-[#7BA8F5]" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <Sparkles className="w-12 h-12 text-[#FFB800] dark:text-[#FFC947]" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Palette className="w-12 h-12 text-[#FF6B35] dark:text-[#FF8B66]" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-[#1C39BB] via-[#FFB800] to-[#0EA5E9] dark:from-[#5B8DEF] dark:via-[#FFC947] dark:to-[#2e9ac9] bg-clip-text text-transparent">
            Saeedeh Sarmadi
          </h1>
          <div className="relative inline-block mb-6">
            <p className="text-2xl md:text-3xl text-gray-100 dark:text-gray-200">
              Agentic Developer | Full-Stack Engineer | UI/UX Enthusiast
            </p>
            {/* Hand-drawn underline sketch */}
            <svg
              className="absolute -bottom-2 left-0 w-full h-3"
              viewBox="0 0 500 10"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 0,5 Q 125,8 250,5 T 500,5"
                stroke="url(#hero-gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              <defs>
                <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5B8DEF" />
                  <stop offset="50%" stopColor="#FFB800" />
                  <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
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
          Fine Arts meets Computer Science — Crafting beautiful digital experiences from Gothenburg, Sweden
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#roadmap"
            className="px-8 py-3 bg-gradient-to-r from-[#1C39BB] to-[#5B8DEF] dark:from-[#5B8DEF] dark:to-[#3D6FD9] rounded-full text-white hover:shadow-lg hover:shadow-[#5B8DEF]/50 transition-all"
          >
            Explore My Journey
          </a>
          <a
            href="#skills"
            className="px-8 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all"
          >
            View Skills
          </a>
        </motion.div>
      </div>
    </section>
  );
}
