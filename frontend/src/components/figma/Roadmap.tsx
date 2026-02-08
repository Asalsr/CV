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

function RoadmapCard({ item, index }: { item: RoadmapItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: item.position === 'left' ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: item.position === 'left' ? -100 : 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`absolute ${item.position === 'left' ? 'left-0 md:left-8' : 'right-0 md:right-8'}`}
      style={{
        top: `${index * 22}%`,
        width: 'calc(50% - 60px)',
        maxWidth: '500px',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="relative bg-white/5 dark:bg-white/5 backdrop-blur-sm border-2 border-white/10 dark:border-white/20 rounded-2xl p-6 hover:border-[#5B8DEF]/30 dark:hover:border-[#7BA8F5]/40 transition-all overflow-hidden"
        style={{ borderStyle: 'solid' }}
      >
        {/* Paint stroke border effect */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            fill="none"
            stroke="url(#card-paint)"
            strokeWidth="3"
            rx="16"
            style={{ filter: 'url(#paint-texture)' }}
          />
          <defs>
            <linearGradient id="card-paint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B8DEF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FFB800" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} relative flex-shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
              {/* Paint splatter around icon */}
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
                {/* Paint stroke underline */}
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

export function Roadmap() {
  const svgRef = useRef(null);
  const isInView = useInView(svgRef, { once: true, margin: "-200px" });

  return (
    <section id="roadmap" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
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
            {/* Paint brush decoration */}
            <svg className="absolute -right-20 top-1/2 -translate-y-1/2 w-16 h-16 hidden md:block" viewBox="0 0 64 64">
              <motion.circle
                cx="32"
                cy="32"
                r="20"
                fill="none"
                stroke="#FFB800"
                strokeWidth="3"
                opacity="0.4"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 2, delay: 0.5 }}
                style={{ filter: 'url(#paint-texture)' }}
              />
              <circle cx="32" cy="32" r="6" fill="#FFB800" opacity="0.6" />
            </svg>
          </div>
          <p className="text-gray-300 dark:text-gray-400 text-xl">A roadmap of growth and innovation</p>
        </motion.div>

        {/* Flowing Curved Timeline */}
        <div className="relative h-[1400px] md:h-[1200px]" ref={svgRef}>
          {/* SVG Curved Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 1200" preserveAspectRatio="xMidYMid meet">
            {/* Main flowing curve path */}
            <motion.path
              d="M 400,50
                 C 600,150 600,250 400,350
                 C 200,450 200,550 400,650
                 C 600,750 600,850 400,950
                 C 200,1050 200,1150 400,1200"
              stroke="url(#curve-gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ filter: 'url(#paint-texture)' }}
            />

            {/* Secondary paint stroke for texture */}
            <motion.path
              d="M 405,50
                 C 605,150 605,250 405,350
                 C 205,450 205,550 405,650
                 C 605,750 605,850 405,950
                 C 205,1050 205,1150 405,1200"
              stroke="url(#curve-gradient-2)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
              style={{ filter: 'url(#paint-texture)' }}
            />

            {/* Animated particles following the curve */}
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                r="3"
                fill={i % 2 === 0 ? "#FFB800" : "#5B8DEF"}
                opacity="0.6"
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={isInView ? {
                  offsetDistance: "100%",
                  opacity: [0, 0.8, 0]
                } : { offsetDistance: "0%", opacity: 0 }}
                transition={{
                  duration: 4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  offsetPath: `path("M 400,50 C 600,150 600,250 400,350 C 200,450 200,550 400,650 C 600,750 600,850 400,950 C 200,1050 200,1150 400,1200")`,
                }}
              />
            ))}

            {/* Milestone points on the curve */}
            {roadmapData.map((item, index) => {
              const yPos = 50 + index * 240;
              const xPos = index % 2 === 0 ? 400 + 200 * Math.sin(index * 0.8) : 400 - 200 * Math.sin(index * 0.8);

              return (
                <g key={index}>
                  {/* Outer glow circle */}
                  <motion.circle
                    cx={xPos}
                    cy={yPos}
                    r="20"
                    fill="url(#point-glow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? {
                      scale: [0, 1.2, 1],
                      opacity: [0, 0.4, 0.2]
                    } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.3 }}
                  />

                  {/* Main point */}
                  <motion.circle
                    cx={xPos}
                    cy={yPos}
                    r="12"
                    fill="url(#point-gradient)"
                    stroke="white"
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  />

                  {/* Paint splatter around point */}
                  {[...Array(3)].map((_, i) => (
                    <motion.circle
                      key={i}
                      cx={xPos + (Math.random() - 0.5) * 40}
                      cy={yPos + (Math.random() - 0.5) * 40}
                      r={Math.random() * 3 + 2}
                      fill={i % 2 === 0 ? "#FFB800" : "#5B8DEF"}
                      opacity="0.3"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.3 + i * 0.1 }}
                    />
                  ))}
                </g>
              );
            })}

            <defs>
              <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5B8DEF" />
                <stop offset="25%" stopColor="#FFB800" />
                <stop offset="50%" stopColor="#0EA5E9" />
                <stop offset="75%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#5B8DEF" />
              </linearGradient>
              <linearGradient id="curve-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1C39BB" />
                <stop offset="50%" stopColor="#FFB800" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>
              <radialGradient id="point-gradient">
                <stop offset="0%" stopColor="#FFB800" />
                <stop offset="100%" stopColor="#5B8DEF" />
              </radialGradient>
              <radialGradient id="point-glow">
                <stop offset="0%" stopColor="#FFB800" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#5B8DEF" stopOpacity="0" />
              </radialGradient>
              <filter id="paint-texture">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
              </filter>
            </defs>
          </svg>

          {/* Timeline cards positioned along the curve */}
          {roadmapData.map((item, index) => (
            <RoadmapCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
