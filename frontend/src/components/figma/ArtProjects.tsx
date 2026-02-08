'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Users, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

const projects = [
  {
    title: 'Plastic Blue',
    year: '2021-2022',
    location: 'Rome',
    description: 'Painting series and artistic studies exploring the impact of plastic pollution on nature and human life.',
    icon: Palette,
    color: 'from-[#1C39BB] to-[#0EA5E9] dark:from-[#5B8DEF] dark:to-[#38BDF8]',
    sketch: 'wave' as const
  },
  {
    title: 'Women Life Freedom',
    year: '2022',
    location: 'Turin',
    description: "Led workshops and educational activities across multiple schools, engaging students in discussions on women's rights and freedom.",
    icon: Users,
    color: 'from-[#FF6B35] to-[#FFB800] dark:from-[#FF8B66] dark:to-[#FFC947]',
    sketch: 'heart' as const
  },
  {
    title: 'Illustration Workshops',
    year: '2023',
    location: 'Turin',
    description: "Led visual identity, promotional assets and on-site facilitation for Liberi di Crescere Association children's-rights non-profit event.",
    icon: Sparkles,
    color: 'from-[#FFB800] to-[#FF6B35] dark:from-[#FFC947] dark:to-[#FF8B66]',
    sketch: 'star' as const
  }
];

function SketchWave() {
  return (
    <svg className="absolute -bottom-2 -right-2 w-24 h-24 opacity-20" viewBox="0 0 100 100">
      <motion.path
        d="M 10,50 Q 30,30 50,50 T 90,50"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-[#1C39BB] dark:text-[#5B8DEF]"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
      <motion.path
        d="M 10,60 Q 30,40 50,60 T 90,60"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-[#0EA5E9] dark:text-[#38BDF8]"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.2 }}
      />
    </svg>
  );
}

function SketchHeart() {
  return (
    <svg className="absolute -bottom-2 -right-2 w-24 h-24 opacity-20" viewBox="0 0 100 100">
      <motion.path
        d="M 50,80 C 30,60 10,40 10,25 C 10,15 15,10 25,10 C 35,10 45,20 50,30 C 55,20 65,10 75,10 C 85,10 90,15 90,25 C 90,40 70,60 50,80 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-[#FF6B35] dark:text-[#FF8B66]"
        initial={{ pathLength: 0, scale: 0.8 }}
        whileInView={{ pathLength: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
    </svg>
  );
}

function SketchStar() {
  return (
    <svg className="absolute -bottom-2 -right-2 w-24 h-24 opacity-20" viewBox="0 0 100 100">
      <motion.path
        d="M 50,10 L 60,40 L 90,45 L 65,65 L 72,95 L 50,78 L 28,95 L 35,65 L 10,45 L 40,40 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-[#FFB800] dark:text-[#FFC947]"
        initial={{ pathLength: 0, rotate: 0 }}
        whileInView={{ pathLength: 1, rotate: 360 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: ArtProject; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = project.icon;

  const SketchComponent = 
    project.sketch === 'wave' ? SketchWave :
    project.sketch === 'heart' ? SketchHeart :
    SketchStar;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/20 rounded-2xl p-8 hover:border-[#5B8DEF]/30 dark:hover:border-[#7BA8F5]/40 transition-all h-full relative overflow-hidden">
        {/* Hand-drawn sketch border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <rect
            x="4"
            y="4"
            width="calc(100% - 8px)"
            height="calc(100% - 8px)"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
            rx="16"
            strokeDasharray="8,4"
          />
        </svg>

        <div className="relative z-10">
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${project.color} mb-4 relative`}>
            <Icon className="w-8 h-8 text-white" />
            {/* Sketch circle around icon */}
            <motion.svg 
              className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]"
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              viewport={{ once: true }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            </motion.svg>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-2xl text-white">{project.title}</h3>
            {/* Hand-drawn underline */}
            <svg className="w-12 h-2" preserveAspectRatio="none">
              <motion.path
                d="M 0,1 L 48,1"
                stroke="rgba(255,184,0,0.5)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
              />
            </svg>
          </div>

          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="text-[#5B8DEF] dark:text-[#7BA8F5]">{project.year}</span>
            <span className="text-gray-500">&bull;</span>
            <span className="text-gray-300 dark:text-gray-400">{project.location}</span>
          </div>

          <p className="text-gray-200 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Decorative sketch element */}
        <SketchComponent />
      </div>
    </motion.div>
  );
}

export function ArtProjects() {
  const t = useTranslations('artProjects');

  const projects = [
    {
      title: t('plasticBlue.title'),
      year: '2021-2022',
      location: 'Rome',
      description: t('plasticBlue.description'),
      icon: Palette,
      gradient: 'linear-gradient(135deg, var(--color-primary-500), var(--teal))',
      sketch: 'wave' as const,
    },
    {
      title: t('womenLifeFreedom.title'),
      year: '2022',
      location: 'Turin',
      description: t('womenLifeFreedom.description'),
      icon: Users,
      gradient: 'linear-gradient(135deg, var(--sunset-orange), var(--golden-yellow))',
      sketch: 'heart' as const,
    },
    {
      title: t('illustrationWorkshops.title'),
      year: '2023',
      location: 'Turin',
      description: t('illustrationWorkshops.description'),
      icon: Sparkles,
      gradient: 'linear-gradient(135deg, var(--golden-yellow), var(--sunset-orange))',
      sketch: 'star' as const,
    }
  ];

  return (
    <section id="art-projects" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#FF6B35] via-[#FFB800] to-[#1C39BB] dark:from-[#FF8B66] dark:via-[#FFC947] dark:to-[#5B8DEF] bg-clip-text text-transparent">
              Artistic Projects
            </h2>
            {/* Hand-drawn sketch decoration */}
            <motion.svg 
              className="absolute -right-16 top-0 w-16 h-16 hidden lg:block"
              viewBox="0 0 64 64"
              initial={{ opacity: 0, rotate: -45 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.path
                d="M 10,32 Q 20,10 32,10 Q 44,10 54,32 Q 44,54 32,54 Q 20,54 10,32 Z"
                fill="none"
                stroke="#FFB800"
                strokeWidth="2"
                strokeDasharray="4,2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </motion.svg>
          </div>
          <p className="text-gray-300 dark:text-gray-400 text-xl">Where art meets activism and social impact</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Hand-drawn doodles decoration at bottom */}
        <div className="mt-16 relative">
          <svg className="w-full h-24 opacity-10">
            <motion.path
              d="M 0,40 Q 100,20 200,40 T 400,40 T 600,40 T 800,40 T 1000,40 T 1200,40"
              stroke="url(#art-gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3 }}
            />
            <defs>
              <linearGradient id="art-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="50%" stopColor="#FFB800" />
                <stop offset="100%" stopColor="#5B8DEF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
