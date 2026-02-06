'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Rocket, Palette, Code2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface RoadmapItem {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: typeof Briefcase;
  gradient: string;
  highlights?: string[];
}

function RoadmapCard({ item, index }: { item: RoadmapItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center gap-8 mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Card */}
      <div className="flex-1">
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative backdrop-blur-sm rounded-2xl p-6 transition-all overflow-hidden"
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            border: '1px solid var(--color-glass-border)',
          }}
        >
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 rounded-xl relative" style={{ background: item.gradient }}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm mb-1" style={{ color: 'var(--color-primary-400)' }}>{item.year}</div>
              <h3 className="text-xl mb-1" style={{ color: 'var(--color-text-primary)' }}>{item.title}</h3>
              <div className="mb-3" style={{ color: 'var(--color-text-secondary)' }}>{item.company}</div>
              <p className="leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>{item.description}</p>

              {item.highlights && (
                <ul className="space-y-1">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                      <span style={{ color: 'var(--color-accent-500)' }} className="mt-1">&rarr;</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline dot */}
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          className="w-6 h-6 rounded-full z-10 relative"
          style={{
            background: item.gradient,
            border: '4px solid var(--color-surface)',
          }}
        />
      </div>

      {/* Spacer for the other side */}
      <div className="flex-1" />
    </motion.div>
  );
}

export function Roadmap() {
  const t = useTranslations('roadmap');

  const roadmapData: RoadmapItem[] = [
    {
      year: t('job1.year'),
      title: t('job1.title'),
      company: t('job1.company'),
      description: t('job1.description'),
      highlights: [t('job1.h1'), t('job1.h2'), t('job1.h3')],
      icon: Rocket,
      gradient: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-400))'
    },
    {
      year: t('job2.year'),
      title: t('job2.title'),
      company: t('job2.company'),
      description: t('job2.description'),
      highlights: [t('job2.h1'), t('job2.h2'), t('job2.h3'), t('job2.h4')],
      icon: Code2,
      gradient: 'linear-gradient(135deg, var(--teal), var(--persian-blue-light))'
    },
    {
      year: t('job3.year'),
      title: t('job3.title'),
      company: t('job3.company'),
      description: t('job3.description'),
      icon: Briefcase,
      gradient: 'linear-gradient(135deg, var(--golden-yellow), var(--amber))'
    },
    {
      year: t('job4.year'),
      title: t('job4.title'),
      company: t('job4.company'),
      description: t('job4.description'),
      icon: Palette,
      gradient: 'linear-gradient(135deg, var(--sunset-orange), var(--warm-coral))'
    },
    {
      year: t('job5.year'),
      title: t('job5.title'),
      company: t('job5.company'),
      description: t('job5.description'),
      icon: GraduationCap,
      gradient: 'linear-gradient(135deg, var(--persian-blue-light), var(--color-primary-500))'
    }
  ];

  return (
    <section id="roadmap" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2
              className="text-4xl md:text-5xl mb-4 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary-500), var(--color-accent-500))' }}
            >
              {t('heading')}
            </h2>
            {/* Hand-drawn arrow sketch */}
            <svg className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 hidden md:block" viewBox="0 0 48 48">
              <motion.path
                d="M 5,24 L 35,24 M 28,16 L 38,24 L 28,32"
                stroke="var(--color-accent-500)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </svg>
          </div>
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-xl">{t('subtitle')}</p>
        </motion.div>

        {/* Vertical line */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full top-0"
          style={{
            backgroundImage: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-primary-400) 50%, transparent), color-mix(in srgb, var(--color-accent-500) 50%, transparent), color-mix(in srgb, var(--teal) 50%, transparent))'
          }}
        />

        {/* Roadmap items */}
        <div className="relative">
          {roadmapData.map((item, index) => (
            <RoadmapCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
