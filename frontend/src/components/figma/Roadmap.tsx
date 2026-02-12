import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Rocket, Palette, Code2, Award } from 'lucide-react';
import { seededRandom } from '@/lib/seededRandom';

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
    company: 'Sweden Startup Nation (SISP), Sweden',
    description: 'Collaborating with AI agents in coding, testing, and deploying platform features for the Swedish Startup Nation Data Platform.',
    highlights: [
      'Agent-First Development with AI',
      'Data-Web Platform contribution',
      'Dashboards and Admin Tools',
      'Data models, APIs & automation workflows'
    ],
    icon: Rocket,
    color: 'from-[var(--persian-blue)] to-[var(--persian-blue-light)]',
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
    color: 'from-[var(--teal)] to-[var(--teal-light)]',
    position: 'left'
  },
  {
    year: 'Sep 2023 - May 2024',
    title: 'Front-End Development Intern',
    company: 'Liquido Studio, Turin',
    description: 'Developed responsive websites using HTML, CSS, WordPress, and JavaScript. Customized themes and implemented UI/UX best practices.',
    highlights: [
      'Responsive websites & web applications',
      'WordPress theme customization & plugins',
      'UI/UX best practices implementation'
    ],
    icon: Briefcase,
    color: 'from-[var(--golden-yellow)] to-[var(--amber)]',
    position: 'right'
  },
  {
    year: '2023',
    title: 'Professional Certifications',
    company: 'IBM, Engim Turin, Google',
    description: 'Industry certifications in front-end development, React, and UX design.',
    highlights: [
      'IBM – Developing Front-End Apps with React',
      'Engim Turin – Front-End Development',
      'Google UX Design – Wireframes & Prototypes'
    ],
    icon: Award,
    color: 'from-[var(--teal-light)] to-[var(--teal)]',
    position: 'left'
  },
  {
    year: '2018 - 2022',
    title: 'B.A. Fine Arts',
    company: 'Fine Arts Academy of Rome',
    description: 'Combining artistic creativity with technical vision, bridging the worlds of art and technology.',
    icon: GraduationCap,
    color: 'from-[var(--persian-blue-light)] to-[var(--persian-blue)]',
    position: 'right'
  },
  {
    year: '2009 - 2018',
    title: 'Software Engineer & Creative Designer',
    company: 'DYS Company & Tanvarz - Tehran',
    description: 'Co-developed internal social platforms, designed multi-channel catalogs, and created culturally localized content that boosted engagement.',
    highlights: [
      'Co-developed internal social-media platform',
      'Designed catalogs, banners & e-books',
      'Sales strategy & localized content'
    ],
    icon: Palette,
    color: 'from-[var(--sunset-orange)] to-[var(--warm-coral)]',
    position: 'left'
  },
  {
    year: '2009 - 2012',
    title: 'B.Sc. Computer Science',
    company: 'Abrar University of Tehran',
    description: 'Foundation in computer science principles and software engineering fundamentals.',
    highlights: [
      'C++, Java, Data Analysis, Databases, Networks'
    ],
    icon: GraduationCap,
    color: 'from-[var(--persian-blue)] to-[var(--teal)]',
    position: 'right'
  }
];

function RoadmapCard({ item, index }: { item: RoadmapItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="relative bg-white/5 dark:bg-white/5 backdrop-blur-sm border-2 border-white/10 dark:border-white/20 rounded-2xl p-4 md:p-6 hover:border-[var(--persian-blue)]/30 transition-all overflow-hidden"
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
              <stop offset="0%" stopColor="var(--persian-blue)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--golden-yellow)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--sunset-orange)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10">
          <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
            <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${item.color} relative flex-shrink-0`}>
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              {/* Paint splatter around icon */}
              <svg className="hidden md:block absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none">
                <circle cx="10%" cy="10%" r="2" fill="rgba(255,255,255,0.3)" />
                <circle cx="90%" cy="20%" r="1.5" fill="rgba(255,255,255,0.3)" />
                <circle cx="85%" cy="85%" r="2" fill="rgba(255,255,255,0.3)" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs md:text-sm text-[var(--persian-blue)] mb-1">{item.year}</div>
              <h3 className="text-lg md:text-xl text-white mb-1 relative inline-block">
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
                    transition={{ duration: 1, delay: index * 0.15 + 0.3 }}
                  />
                </svg>
              </h3>
            </div>
          </div>

          <div className="text-gray-300 dark:text-gray-400 mb-2 md:mb-3 text-xs md:text-sm">{item.company}</div>
          <p className="text-gray-200 dark:text-gray-300 leading-relaxed mb-2 md:mb-3 text-sm">{item.description}</p>

          {item.highlights && (
            <ul className="space-y-1">
              {item.highlights.map((highlight, i) => (
                <li key={i} className="text-xs md:text-sm text-gray-300 dark:text-gray-400 flex items-start gap-2">
                  <span className="text-[var(--golden-yellow)] mt-1 flex-shrink-0">→</span>
                  <span className="flex-1">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function generateCurvePath(count: number, containerHeight: number, xOffset = 0): string {
  const startY = 50;
  const segmentH = 300;
  const centerX = 400 + xOffset;
  const rightX = 600 + xOffset;
  const leftX = 200 + xOffset;

  let y = startY;
  let d = `M ${centerX},${y}`;
  let goRight = true;

  for (let i = 0; i < count; i++) {
    const isLast = i === count - 1;
    const endY = isLast ? containerHeight : y + segmentH;
    const sideX = goRight ? rightX : leftX;
    d += ` C ${sideX},${y + 100} ${sideX},${y + 200} ${centerX},${endY}`;
    y = endY;
    goRight = !goRight;
  }

  return d;
}

export function Roadmap() {
  const svgRef = useRef(null);
  const isInView = useInView(svgRef, { once: true, margin: "-100px" });

  // Dynamic desktop layout — adapts to any number of roadmap items
  const count = roadmapData.length;
  const containerHeight = count * 300;
  const milestoneSpacing = (containerHeight - 350) / (count - 1);
  const cardSpacing = 85 / (count - 1);
  const mainPath = generateCurvePath(count, containerHeight);
  const secondaryPath = generateCurvePath(count, containerHeight, 5);

  return (
    <section id="roadmap" className="py-12 md:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-5xl mb-3 md:mb-4 bg-gradient-to-r from-[var(--persian-blue)] to-[var(--golden-yellow)] bg-clip-text text-transparent">
              My Journey
            </h2>
            {/* Paint brush decoration - hidden on mobile */}
            <svg className="hidden md:block absolute -right-20 top-1/2 -translate-y-1/2 w-16 h-16" viewBox="0 0 64 64">
              <motion.circle
                cx="32"
                cy="32"
                r="20"
                fill="none"
                stroke="var(--golden-yellow)"
                strokeWidth="3"
                opacity="0.4"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 2, delay: 0.5 }}
                style={{ filter: 'url(#paint-texture)' }}
              />
              <circle cx="32" cy="32" r="6" fill="var(--golden-yellow)" opacity="0.6" />
            </svg>
          </div>
          <p className="text-gray-300 dark:text-gray-400 text-lg md:text-xl">A roadmap of growth and innovation</p>
        </motion.div>

        {/* Mobile: Simple vertical timeline */}
        <div className="md:hidden space-y-6 relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--persian-blue)] via-[var(--golden-yellow)] to-[var(--sunset-orange)] opacity-30" />

          {roadmapData.map((item, index) => (
            <div key={index} className="relative pl-16">
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="absolute left-3 top-6 w-6 h-6 rounded-full bg-gradient-to-br from-[var(--golden-yellow)] to-[var(--persian-blue)] border-2 border-white/20"
              />
              <RoadmapCard item={item} index={index} />
            </div>
          ))}
        </div>

        {/* Desktop: Flowing Curved Timeline */}
        <div className="hidden md:block relative" style={{ height: containerHeight }} ref={svgRef}>
          {/* SVG Curved Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 800 ${containerHeight}`} preserveAspectRatio="xMidYMid meet">
            {/* Main flowing curve path */}
            <motion.path
              d={mainPath}
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
              d={secondaryPath}
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
                fill={i % 2 === 0 ? "var(--golden-yellow)" : "var(--persian-blue)"}
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
                  offsetPath: `path("${mainPath}")`,
                }}
              />
            ))}

            {/* Milestone points on the curve */}
            {roadmapData.map((item, index) => {
              const yPos = 50 + index * milestoneSpacing;
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
                      cx={xPos + (seededRandom(index * 10 + i * 3) - 0.5) * 40}
                      cy={yPos + (seededRandom(index * 10 + i * 3 + 1) - 0.5) * 40}
                      r={seededRandom(index * 10 + i * 3 + 2) * 3 + 2}
                      fill={i % 2 === 0 ? "var(--golden-yellow)" : "var(--persian-blue)"}
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
                <stop offset="0%" stopColor="var(--persian-blue)" />
                <stop offset="25%" stopColor="var(--golden-yellow)" />
                <stop offset="50%" stopColor="var(--teal)" />
                <stop offset="75%" stopColor="var(--sunset-orange)" />
                <stop offset="100%" stopColor="var(--persian-blue)" />
              </linearGradient>
              <linearGradient id="curve-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--persian-blue)" />
                <stop offset="50%" stopColor="var(--golden-yellow)" />
                <stop offset="100%" stopColor="var(--teal)" />
              </linearGradient>
              <radialGradient id="point-gradient">
                <stop offset="0%" stopColor="var(--golden-yellow)" />
                <stop offset="100%" stopColor="var(--persian-blue)" />
              </radialGradient>
              <radialGradient id="point-glow">
                <stop offset="0%" stopColor="var(--golden-yellow)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--persian-blue)" stopOpacity="0" />
              </radialGradient>
              <filter id="paint-texture">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
              </filter>
            </defs>
          </svg>

          {/* Timeline cards positioned along the curve */}
          {roadmapData.map((item, index) => (
            <div
              key={index}
              className={`absolute ${item.position === 'left' ? 'left-8' : 'right-8'}`}
              style={{
                top: `${index * cardSpacing}%`,
                width: 'calc(50% - 60px)',
                maxWidth: '500px',
              }}
            >
              <RoadmapCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
