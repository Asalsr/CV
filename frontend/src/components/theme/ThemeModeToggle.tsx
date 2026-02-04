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
      <div className="w-12 h-12 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]" />
    );
  }

  const handleToggle = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary-500)] transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: mode === 'dark' ? 180 : 0,
          scale: mode === 'dark' ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun
          className="w-5 h-5"
          style={{ color: 'var(--color-primary-500)' }}
        />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: mode === 'dark' ? 0 : -180,
          scale: mode === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon
          className="w-5 h-5"
          style={{ color: 'var(--color-primary-400)' }}
        />
      </motion.div>
    </motion.button>
  );
}
