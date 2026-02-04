'use client';

import { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setColorScheme } from '@/lib/redux/themeSlice';
import { colorSchemes, type ColorScheme } from '@/config/themes';
import { motion, AnimatePresence } from 'framer-motion';

export default function ColorSchemeSelector() {
  const dispatch = useAppDispatch();
  const currentScheme = useAppSelector((state) => state.theme.colorScheme);
  const currentMode = useAppSelector((state) => state.theme.mode);
  const [isOpen, setIsOpen] = useState(false);

  const handleSchemeChange = (scheme: ColorScheme) => {
    dispatch(setColorScheme(scheme));
    setIsOpen(false);
  };

  const schemes: ColorScheme[] = ['teal-coral', 'purple-gold', 'emerald-rose', 'monochrome-blue'];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 h-12 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary-500)] transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Select color scheme"
      >
        <Palette className="w-5 h-5" style={{ color: 'var(--color-primary-500)' }} />
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          Theme
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 right-0 z-50 w-72 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden"
            >
              <div className="p-4">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Choose Color Scheme
                </h3>

                <div className="space-y-2">
                  {schemes.map((scheme) => {
                    const config = colorSchemes[scheme];
                    const colors = config[currentMode];
                    const isSelected = currentScheme === scheme;

                    return (
                      <motion.button
                        key={scheme}
                        onClick={() => handleSchemeChange(scheme)}
                        className="w-full p-3 rounded-lg border transition-all duration-200 text-left"
                        style={{
                          borderColor: isSelected
                            ? 'var(--color-primary-500)'
                            : 'var(--color-border)',
                          backgroundColor: isSelected
                            ? 'var(--color-primary-50)'
                            : 'transparent',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="font-medium text-sm"
                                style={{ color: 'var(--color-text-primary)' }}
                              >
                                {config.name}
                              </span>
                              {isSelected && (
                                <Check
                                  className="w-4 h-4"
                                  style={{ color: 'var(--color-primary-600)' }}
                                />
                              )}
                            </div>
                            <p
                              className="text-xs"
                              style={{ color: 'var(--color-text-secondary)' }}
                            >
                              {config.description}
                            </p>
                          </div>

                          {/* Color preview */}
                          <div className="flex gap-1.5">
                            <div
                              className="w-6 h-6 rounded border border-black/10"
                              style={{ backgroundColor: colors.primary[500] }}
                            />
                            <div
                              className="w-6 h-6 rounded border border-black/10"
                              style={{ backgroundColor: colors.accent[500] }}
                            />
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
