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
      <div
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-glass-border)',
          opacity: 0.8,
        }}
      />
    );
  }

  const handleToggle = () => {
    dispatch(toggleThemeMode());
  };

  const isDark = mode === 'dark';

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm transition-all duration-300 group"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
        border: '1px solid var(--color-glass-border)',
        boxShadow: `0 8px 32px var(--color-card-hover-shadow)`,
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
        <Sun className="w-6 h-6" style={{ color: 'var(--color-accent-500)' }} />
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
        <Moon className="w-6 h-6" style={{ color: 'var(--color-accent-400)' }} />
      </motion.div>

      {/* Tooltip */}
      <span
        className="absolute right-full mr-3 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          border: '1px solid var(--color-glass-border)',
        }}
      >
        {isDark ? 'Light mode' : 'Dark mode'}
      </span>
    </motion.button>
  );
}
