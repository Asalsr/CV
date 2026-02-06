'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Users, Sparkles } from 'lucide-react';

const projects = [
  {
    title: 'Plastic Blue',
    year: '2021-2022',
    location: 'Rome',
    description: 'Painting series and artistic studies exploring the impact of plastic pollution on nature and human life.',
    icon: Palette,
    gradient: 'linear-gradient(135deg, var(--color-primary-500), var(--teal))',
    sketch: 'wave' as const,
  },
  {
    title: 'Women Life Freedom',
    year: '2022',
    location: 'Turin',
    description: "Led workshops and educational activities across multiple schools, engaging students in discussions on women's rights and freedom.",
    icon: Users,
    gradient: 'linear-gradient(135deg, var(--sunset-orange), var(--golden-yellow))',
    sketch: 'heart' as const,
  },
  {
    title: 'Illustration Workshops',
    year: '2023',
    location: 'Turin',
    description: "Led visual identity, promotional assets and on-site facilitation for Liberi di Crescere Association children's-rights non-profit event.",
    icon: Sparkles,
    gradient: 'linear-gradient(135deg, var(--golden-yellow), var(--sunset-orange))',
    sketch: 'star' as const,
  }
];

function SketchWave() {
  return (
    <svg className="absolute -bottom-2 -right-2 w-24 h-24 opacity-20" viewBox="0 0 100 100">
      <motion.path
        d="M 10,50 Q 30,30 50,50 T 90,50"
        strokeWidth="2"
        fill="none"
        stroke="var(--color-primary-500)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
      <motion.path
        d="M 10,60 Q 30,40 50,60 T 90,60"
        strokeWidth="2"
        fill="none"
        stroke="var(--teal)"
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
        strokeWidth="2"
        fill="none"
        stroke="var(--sunset-orange)"
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
        strokeWidth="2"
        fill="none"
        stroke="var(--golden-yellow)"
        initial={{ pathLength: 0, rotate: 0 }}
        whileInView={{ pathLength: 1, rotate: 360 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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
      <div
        className="backdrop-blur-sm rounded-2xl p-8 transition-all h-full relative overflow-hidden"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          border: '1px solid var(--color-glass-border)',
        }}
      >
        <div className="relative z-10">
          <div className="inline-flex p-4 rounded-2xl mb-4 relative" style={{ background: project.gradient }}>
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
                stroke="var(--color-glass-border)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            </motion.svg>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-2xl" style={{ color: 'var(--color-text-primary)' }}>{project.title}</h3>
          </div>

          <div className="flex items-center gap-3 mb-4 text-sm">
            <span style={{ color: 'var(--color-primary-400)' }}>{project.year}</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>&bull;</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>{project.location}</span>
          </div>

          <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
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
          <h2
            className="text-4xl md:text-5xl mb-4 bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(to right, var(--sunset-orange), var(--color-accent-500), var(--color-primary-500))' }}
          >
            Artistic Projects
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-xl">Where art meets activism and social impact</p>
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
                <stop offset="0%" stopColor="var(--sunset-orange)" />
                <stop offset="50%" stopColor="var(--color-accent-500)" />
                <stop offset="100%" stopColor="var(--color-primary-500)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
