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
    color: 'from-[#1C39BB] to-[#5B8DEF] dark:from-[#5B8DEF] dark:to-[#7BA8F5]'
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
    color: 'from-[#0EA5E9] to-[#38BDF8] dark:from-[#38BDF8] dark:to-[#0EA5E9]'
  },
  {
    year: 'Sep 2023 - May 2024',
    title: 'Front-End Development Intern',
    company: 'Liquido Studio, Turin',
    description: 'Developed responsive websites using HTML, CSS, WordPress, and JavaScript. Customized themes and implemented UI/UX best practices.',
    icon: Briefcase,
    color: 'from-[#FFB800] to-[#FFC947] dark:from-[#FFC947] dark:to-[#FFD76E]'
  },
  {
    year: '2009 - 2018',
    title: 'Software Engineer & Creative Designer',
    company: 'DYS Company & Tanvarz - Tehran',
    description: 'Co-developed internal social platforms, designed multi-channel catalogs, and created culturally localized content that boosted engagement.',
    icon: Palette,
    color: 'from-[#FF6B35] to-[#FF8B66] dark:from-[#FF8B66] dark:to-[#FF9980]'
  },
  {
    year: 'Education',
    title: 'B.A. Fine Arts (GPA 4.0) & B.Sc. Computer Science',
    company: 'Fine Arts Academy of Rome & Abrar University of Tehran',
    description: 'Unique combination of artistic creativity and technical expertise in computer science.',
    icon: GraduationCap,
    color: 'from-[#4A90E2] to-[#1C39BB] dark:from-[#7BA8F5] dark:to-[#5B8DEF]'
  }
];

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
          className="relative bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/20 rounded-2xl p-6 hover:border-[#5B8DEF]/30 dark:hover:border-[#7BA8F5]/40 transition-all overflow-hidden"
        >
          <div className="flex items-start gap-4 relative z-10">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} relative`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#5B8DEF] dark:text-[#7BA8F5] mb-1">{item.year}</div>
              <h3 className="text-xl text-white mb-1">{item.title}</h3>
              <div className="text-gray-300 dark:text-gray-400 mb-3">{item.company}</div>
              <p className="text-gray-200 dark:text-gray-300 leading-relaxed mb-3">{item.description}</p>

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
          </div>
        </motion.div>
      </div>

      {/* Timeline dot */}
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.color} border-4 border-[#0F1729] dark:border-[#0A0E1A] z-10 relative`}
        />
      </div>

      {/* Spacer for the other side */}
      <div className="flex-1" />
    </motion.div>
  );
}

export function Roadmap() {
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
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#1C39BB] to-[#FFB800] dark:from-[#5B8DEF] dark:to-[#FFC947] bg-clip-text text-transparent">
              My Journey
            </h2>
            {/* Hand-drawn arrow sketch */}
            <svg className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 hidden md:block" viewBox="0 0 48 48">
              <motion.path
                d="M 5,24 L 35,24 M 28,16 L 38,24 L 28,32"
                stroke="#FFB800"
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
          <p className="text-gray-300 dark:text-gray-400 text-xl">A roadmap of growth and innovation</p>
        </motion.div>

        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#5B8DEF]/50 via-[#FFB800]/50 to-[#0EA5E9]/50 dark:from-[#7BA8F5]/50 dark:via-[#FFC947]/50 dark:to-[#38BDF8]/50 h-full top-0" />

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
