'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSelector() {
  const currentLocale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (locale: Locale) => {
    // Store the selected locale in a cookie (accessible by server)
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    // Reload the page to apply the new locale
    window.location.reload();
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-primary)',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe className="w-4 h-4" style={{ color: 'var(--color-primary-500)' }} />
        <span className="text-sm font-medium">{localeNames[currentLocale]}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--color-text-secondary)' }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 rounded-lg border shadow-lg z-50 overflow-hidden"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => {
                    handleLocaleChange(locale);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[var(--color-primary-100)]"
                  style={{
                    color: locale === currentLocale
                      ? 'var(--color-primary-600)'
                      : 'var(--color-text-primary)',
                    backgroundColor: locale === currentLocale
                      ? 'var(--color-primary-50)'
                      : 'transparent',
                  }}
                >
                  {localeNames[locale]}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
