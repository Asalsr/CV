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
          <div className="relative bg-gradient-to-r from-[#1C39BB]/10 via-[#FFB800]/10 to-[#FF6B35]/10 dark:from-[#5B8DEF]/10 dark:via-[#FFC947]/10 dark:to-[#FF8B66]/10 border border-white/10 dark:border-white/20 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl mb-4 bg-gradient-to-r from-[#1C39BB] via-[#FFB800] to-[#FF6B35] dark:from-[#5B8DEF] dark:via-[#FFC947] dark:to-[#FF8B66] bg-clip-text text-transparent">
              Explore My Artistic Side
            </h3>
            <p className="text-gray-200 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Beyond code and pixels, I create art. Fine Arts Academy graduate exploring plastic pollution (Plastic Blue series), leading children&apos;s rights workshops (Women Life Freedom), and illustration for social causes.
            </p>
            <motion.a
              href="/art"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1C39BB] via-[#FFB800] to-[#FF6B35] dark:from-[#5B8DEF] dark:via-[#FFC947] dark:to-[#FF8B66] rounded-full text-white hover:shadow-lg hover:shadow-[#5B8DEF]/50 transition-all"
            >
              {t('viewPortfolio')}
              <ExternalLink className="w-5 h-5" />
            </motion.a>

            {/* Sketch decoration */}
            <svg className="absolute bottom-4 left-4 w-16 h-16 opacity-10 pointer-events-none hidden md:block">
              <motion.circle
                cx="32"
                cy="32"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#5B8DEF]"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ pathLength: 1, rotate: 180 }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Social Links & Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-white text-xl mb-2">Let&apos;s Connect</h4>
            <p className="text-gray-300 dark:text-gray-400 mb-2">Open to new opportunities and collaborations</p>
            <a href="mailto:Saeedeh.sarmadi89@gmail.com" className="text-[#5B8DEF] dark:text-[#7BA8F5] hover:text-[#1C39BB] dark:hover:text-[#5B8DEF]">
              Saeedeh.sarmadi89@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4">
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
            Designed &amp; Built with <Heart className="w-4 h-4 text-[#FF6B35] dark:text-[#FF8B66]" fill="currentColor" /> by Saeedeh Sarmadi &copy; 2026
          </p>
          <p className="text-sm mt-2">{t('location')}</p>
        </div>
      </div>
    </footer>
  );
}
