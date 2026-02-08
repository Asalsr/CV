'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Rocket, Palette, Code2 } from 'lucide-react';

interface RoadmapItem {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: typeof Briefcase;
  color: string;
  highlights?: string[];
  position: 'left' | 'right';
}

const roadmapData: RoadmapItem[] = [
  {
    year: 'Dec 2025 - Present',
    title: 'Agentic Developer Intern',
    company: 'Sweden Startup Nation (SSN) - SISP, Sweden',
    description: 'Collaborating with AI agents in coding, testing, and deploying platform features for the Swedish Startup Nation Data Platform.',
    highlights: [
      'Agent-First Development with AI',
      'Data-Web Platform contribution',
      'Dashboards and Admin Tools'
    ],
    icon: Rocket,
    color: 'from-[#1C39BB] to-[#5B8DEF] dark:from-[#5B8DEF] dark:to-[#7BA8F5]',
    position: 'right'
  },
  {
    year: 'Jun 2024 - Oct 2025',
    title: 'Full-Stack Developer & Systems Analyst',
    company: 'RADA Computing Solutions, Turin',
    description: 'Led migration from 2008 legacy system to modern React platform. Built REST APIs, optimized Oracle DB queries (60% faster), and created AI chatbot.',
    highlights: [
      'React migration (20+ modules)',
      'AG Grid implementation (150k+ rows)',
      'GraphQL POC (30% payload reduction)',
      'AWS Lambda serverless workflows'
    ],
    icon: Code2,
    color: 'from-[#0EA5E9] to-[#38BDF8] dark:from-[#38BDF8] dark:to-[#0EA5E9]',
    position: 'left'
  },
  {
    year: 'Sep 2023 - May 2024',
    title: 'Front-End Development Intern',
    company: 'Liquido Studio, Turin',
    description: 'Developed responsive websites using HTML, CSS, WordPress, and JavaScript. Customized themes and implemented UI/UX best practices.',
    icon: Briefcase,
    color: 'from-[#FFB800] to-[#FFC947] dark:from-[#FFC947] dark:to-[#FFD76E]',
    position: 'right'
  },
  {
    year: '2009 - 2018',
    title: 'Software Engineer & Creative Designer',
    company: 'DYS Company & Tanvarz - Tehran',
    description: 'Co-developed internal social platforms, designed multi-channel catalogs, and created culturally localized content that boosted engagement.',
    icon: Palette,
    color: 'from-[#FF6B35] to-[#FF8B66] dark:from-[#FF8B66] dark:to-[#FF9980]',
    position: 'left'
  },
  {
    year: 'Education',
    title: 'B.A. Fine Arts (GPA 4.0) & B.Sc. Computer Science',
    company: 'Fine Arts Academy of Rome & Abrar University of Tehran',
    description: 'Unique combination of artistic creativity and technical expertise in computer science.',
    icon: GraduationCap,
    color: 'from-[#4A90E2] to-[#1C39BB] dark:from-[#7BA8F5] dark:to-[#5B8DEF]',
    position: 'right'
  }
];

function RoadmapCard({ item, index, animateFrom }: { item: RoadmapItem; index: number; animateFrom?: 'left' | 'right' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = item.icon;
  const direction = animateFrom || item.position;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === 'left' ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -3 }}
        className="relative bg-white/5 dark:bg-white/5 backdrop-blur-sm border-2 border-white/10 dark:border-white/20 rounded-2xl p-6 hover:border-[#5B8DEF]/30 dark:hover:border-[#7BA8F5]/40 transition-all overflow-hidden"
      >
        {/* Paint stroke border effect */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <rect
            x="2" y="2"
            width="calc(100% - 4px)" height="calc(100% - 4px)"
            fill="none"
            stroke="url(#roadmap-card-paint)"
            strokeWidth="3"
            rx="16"
            style={{ filter: 'url(#roadmap-paint-texture)' }}
          />
        </svg>

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} relative flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
              <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none">
                <circle cx="10%" cy="10%" r="2" fill="rgba(255,255,255,0.3)" />
                <circle cx="90%" cy="20%" r="1.5" fill="rgba(255,255,255,0.3)" />
                <circle cx="85%" cy="85%" r="2" fill="rgba(255,255,255,0.3)" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#5B8DEF] dark:text-[#7BA8F5] mb-1">{item.year}</div>
              <h3 className="text-xl text-white mb-1 relative inline-block">
                {item.title}
                <svg className="absolute -bottom-1 left-0 w-full h-2" preserveAspectRatio="none">
                  <motion.path
                    d="M 0,1 Q 50,3 100,1"
                    stroke="rgba(255,184,0,0.4)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  />
                </svg>
              </h3>
            </div>
          </div>

          <div className="text-gray-300 dark:text-gray-400 mb-3 text-sm">{item.company}</div>
          <p className="text-gray-200 dark:text-gray-300 leading-relaxed mb-3 text-sm">{item.description}</p>

          {item.highlights && (
            <ul className="space-y-1">
              {item.highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-gray-300 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-[#FFB800] dark:text-[#FFC947] mt-1">&rarr;</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineDot({ index, isInView }: { index: number; isInView: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-14 h-14">
      {/* Outer glow */}
      <motion.div
        className="absolute w-12 h-12 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,184,0,0.4) 0%, transparent 70%)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: [0, 1.5, 1], opacity: [0, 0.5, 0.3] } : {}}
        transition={{ duration: 0.8, delay: index * 0.3 + 0.5 }}
      />
      {/* Main dot */}
      <motion.div
        className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFB800] to-[#5B8DEF] border-[2.5px] border-white shadow-lg shadow-[#FFB800]/20 relative z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: index * 0.3 + 0.3, type: "spring", stiffness: 200 }}
      />
      {/* Paint splatter */}
      <motion.div
        className="absolute w-12 h-12 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.3 + 0.6 }}
      >
        <div className="absolute top-0 left-1.5 w-1.5 h-1.5 rounded-full bg-[#FFB800] opacity-50" />
        <div className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-[#5B8DEF] opacity-50" />
        <div className="absolute top-2.5 right-0 w-1 h-1 rounded-full bg-[#FF6B35] opacity-40" />
      </motion.div>
    </div>
  );
}

export function Roadmap() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="roadmap" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#1C39BB] to-[#FFB800] dark:from-[#5B8DEF] dark:to-[#FFC947] bg-clip-text text-transparent">
              My Journey
            </h2>
            <svg className="absolute -right-20 top-1/2 -translate-y-1/2 w-16 h-16 hidden md:block" viewBox="0 0 64 64">
              <motion.circle
                cx="32" cy="32" r="20"
                fill="none" stroke="#FFB800" strokeWidth="3" opacity="0.4"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 2, delay: 0.5 }}
                style={{ filter: 'url(#roadmap-paint-texture)' }}
              />
              <circle cx="32" cy="32" r="6" fill="#FFB800" opacity="0.6" />
            </svg>
          </div>
          <p className="text-gray-300 dark:text-gray-400 text-xl">A roadmap of growth and innovation</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={sectionRef}>
          {/* SVG filter + gradient definitions (shared) */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id="roadmap-paint-texture">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
              </filter>
              <linearGradient id="roadmap-card-paint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5B8DEF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FFB800" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Desktop: Vertical timeline line (centered) with fading ends */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] hidden md:block"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              transformOrigin: 'top',
              background: 'linear-gradient(to bottom, #5B8DEF, #FFB800, #0EA5E9, #FF6B35, #5B8DEF)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              filter: 'url(#roadmap-paint-texture)',
            }}
          />
          {/* Desktop: Secondary line for painted depth */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-[6px] hidden md:block opacity-20"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
            style={{
              transformOrigin: 'top',
              marginLeft: '1px',
              background: 'linear-gradient(to bottom, #1C39BB, #FFB800, #0EA5E9)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              filter: 'url(#roadmap-paint-texture)',
            }}
          />

          {/* Mobile: Vertical timeline line (left side) with fading ends */}
          <motion.div
            className="absolute left-[19px] top-0 bottom-0 w-[3px] md:hidden"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              transformOrigin: 'top',
              background: 'linear-gradient(to bottom, #5B8DEF, #FFB800, #0EA5E9, #FF6B35, #5B8DEF)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
              filter: 'url(#roadmap-paint-texture)',
            }}
          />

          {/* Timeline rows */}
          <div className="space-y-12 md:space-y-16">
            {roadmapData.map((item, index) => {
              const isLeft = item.position === 'left';

              return (
                <div key={index} className="relative">
                  {/* Desktop layout: [left card] — [dot] — [right card] */}
                  <div className="hidden md:flex items-center">
                    {/* Left card area */}
                    <div className="w-[calc(50%-28px)] flex justify-end">
                      {isLeft ? (
                        <div className="w-full max-w-lg">
                          <RoadmapCard item={item} index={index} />
                        </div>
                      ) : null}
                    </div>

                    {/* Center dot (sits on the timeline line) */}
                    <div className="flex-shrink-0 relative z-10">
                      <TimelineDot index={index} isInView={isInView} />
                    </div>

                    {/* Right card area */}
                    <div className="w-[calc(50%-28px)]">
                      {!isLeft ? (
                        <div className="w-full max-w-lg">
                          <RoadmapCard item={item} index={index} />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Mobile layout: [dot] — [card] */}
                  <div className="flex md:hidden items-start">
                    <div className="w-10 flex-shrink-0 flex justify-center pt-6 relative z-10">
                      <motion.div
                        className="w-4 h-4 rounded-full bg-gradient-to-br from-[#FFB800] to-[#5B8DEF] border-2 border-white shadow-lg shadow-[#FFB800]/20"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2, type: "spring" }}
                      />
                    </div>
                    <div className="flex-1 pl-2">
                      <RoadmapCard item={item} index={index} animateFrom="right" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated particles floating along the timeline — Desktop */}
          {isInView && (
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden md:block pointer-events-none overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: i % 2 === 0 ? '#FFB800' : '#5B8DEF',
                    left: '-2px',
                  }}
                  initial={{ top: '-2%', opacity: 0 }}
                  animate={{
                    top: '102%',
                    opacity: [0, 0.8, 0.8, 0],
                  }}
                  transition={{
                    duration: 6,
                    delay: i * 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
