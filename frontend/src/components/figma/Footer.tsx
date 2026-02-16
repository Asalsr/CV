'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  return (
    <footer id="contact" className="relative py-16 px-4 border-t border-white/10 dark:border-white/20">
      <div className="max-w-6xl mx-auto">
        {/* Social Links & Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-white text-xl mb-2">Let&apos;s Connect</h4>
            <p className="text-gray-300 dark:text-gray-400 mb-2">Open to new opportunities and collaborations</p>
            <a href="mailto:Saeedeh.sarmadi89@gmail.com" className="text-[var(--persian-blue)] hover:text-[var(--persian-blue-dark)]">
              Saeedeh.sarmadi89@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://res.cloudinary.com/dvtsn17rp/image/upload/CV_Saeedeh_Sarmadi_sit1uq.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-3 bg-white/5 dark:bg-white/10 hover:bg-white/10 dark:hover:bg-white/15 rounded-lg border border-white/10 dark:border-white/20 text-gray-300 hover:text-white transition-all"
              aria-label="Download CV"
            >
              <FileDown className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://github.com/Asalsr"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-3 bg-white/5 dark:bg-white/10 hover:bg-white/10 dark:hover:bg-white/15 rounded-lg border border-white/10 dark:border-white/20 text-gray-300 hover:text-white transition-all"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/saeedeh-asal-sarmadi"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-3 bg-white/5 dark:bg-white/10 hover:bg-white/10 dark:hover:bg-white/15 rounded-lg border border-white/10 dark:border-white/20 text-gray-300 hover:text-white transition-all"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="mailto:Saeedeh.sarmadi89@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-3 bg-white/5 dark:bg-white/10 hover:bg-white/10 dark:hover:bg-white/15 rounded-lg border border-white/10 dark:border-white/20 text-gray-300 hover:text-white transition-all"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 dark:border-white/20 text-center text-gray-300 dark:text-gray-400">
          <p className="flex items-center justify-center gap-2">
            Designed &amp; Built with <Heart className="w-4 h-4 text-[var(--sunset-orange)]" fill="currentColor" /> by Saeedeh Sarmadi &copy; 2026
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm">
            <a
              href="https://www.behance.net/asalsr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--persian-blue)] hover:underline transition-colors"
            >
              Behance
            </a>
            <span className="text-white/20">&bull;</span>
            <a
              href="https://res.cloudinary.com/dvtsn17rp/image/upload/cv/CV_Saeedeh_Sarmadi.pdf"
              download
              className="text-[var(--persian-blue)] hover:underline transition-colors"
            >
              {t('downloadCv')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
