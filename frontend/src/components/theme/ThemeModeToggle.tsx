'use client';

import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { toggleThemeMode } from '@/lib/redux/themeSlice';
import { motion } from 'framer-motion';

export default function ThemeModeToggle() {
  const dispatch = useAppDispatch();
  const { mode, isHydrated } = useAppSelector((state) => state.theme);

  // Don't render until hydrated to avoid mismatch
  if (!isHydrated) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0F1729]/80 border border-white/10" />
    );
  }

  const handleToggle = () => {
    dispatch(toggleThemeMode());
  };

  const isDark = mode === 'dark';

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm border transition-all duration-300 group"
      style={{
        backgroundColor: isDark
          ? 'rgba(15, 23, 41, 0.9)'
          : 'rgba(255, 255, 255, 0.9)',
        borderColor: isDark
          ? 'rgba(91, 141, 239, 0.3)'
          : 'rgba(28, 57, 187, 0.2)',
        boxShadow: isDark
          ? '0 8px 32px rgba(91, 141, 239, 0.2)'
          : '0 8px 32px rgba(28, 57, 187, 0.15)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute"
      >
        <Sun className="w-6 h-6 text-[#FFB800]" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute"
      >
        <Moon className="w-6 h-6 text-[#FFC947]" />
      </motion.div>

      {/* Tooltip */}
      <span
        className="absolute right-full mr-3 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          backgroundColor: isDark ? '#1A2332' : '#ffffff',
          color: isDark ? '#F0F4F8' : '#0F1729',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          border: isDark
            ? '1px solid rgba(91, 141, 239, 0.2)'
            : '1px solid rgba(28, 57, 187, 0.1)',
        }}
      >
        {isDark ? 'Light mode' : 'Dark mode'}
      </span>
    </motion.button>
  );
}
