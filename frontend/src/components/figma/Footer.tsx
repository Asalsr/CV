'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  return (
    <footer id="contact" className="relative py-16 px-4 border-t border-white/10 dark:border-white/20">
      <div className="max-w-6xl mx-auto">
        {/* Artistic Portfolio CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div
            className="relative rounded-2xl p-8 md:p-12 text-center"
            style={{
              background: 'linear-gradient(to right, color-mix(in srgb, var(--color-primary-500) 10%, transparent), color-mix(in srgb, var(--color-accent-500) 10%, transparent), color-mix(in srgb, var(--sunset-orange) 10%, transparent))',
              border: '1px solid var(--color-glass-border)',
            }}
          >
            <h3
              className="text-3xl md:text-4xl mb-4 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary-500), var(--color-accent-500), var(--sunset-orange))' }}
            >
              {t('artCtaTitle')}
            </h3>
            <p className="mb-6 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
              {t('artCtaDescription')}
            </p>
            <motion.a
              href="/art"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white hover:shadow-lg transition-all"
              style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary-500), var(--color-accent-500), var(--sunset-orange))' }}
            >
              {t('viewPortfolio')}
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

        {/* Social Links & Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl mb-2" style={{ color: 'var(--color-text-primary)' }}>{t('connectTitle')}</h4>
            <p className="mb-2" style={{ color: 'var(--color-text-secondary)' }}>{t('connectSubtitle')}</p>
            <a
              href="mailto:Saeedeh.sarmadi89@gmail.com"
              style={{ color: 'var(--color-primary-500)' }}
            >
              Saeedeh.sarmadi89@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            {[
              { href: 'https://github.com/Asalsr', icon: Github, external: true },
              { href: 'https://www.linkedin.com/in/saeedeh-asal-sarmadi', icon: Linkedin, external: true },
              { href: 'mailto:Saeedeh.sarmadi89@gmail.com', icon: Mail, external: false },
            ].map(({ href, icon: LinkIcon, external }) => (
              <motion.a
                key={href}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-3 rounded-lg transition-all"
                style={{
                  backgroundColor: 'var(--color-glass-bg)',
                  border: '1px solid var(--color-glass-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <LinkIcon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid var(--color-glass-border)', color: 'var(--color-text-secondary)' }}>
          <p className="flex items-center justify-center gap-2">
            {t.rich('copyright', {
              heart: () => <Heart className="w-4 h-4" style={{ color: 'var(--sunset-orange)' }} fill="currentColor" />
            })}
          </p>
          <p className="text-sm mt-2">{t('location')}</p>
        </div>
      </div>
    </footer>
  );
}
