'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Code2, Figma, Database, Cloud, Cpu } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Skill {
  name: string;
  level: number;
  icon: typeof Palette;
  color: string;
}

const uxuiSkills: Skill[] = [
  { name: 'Figma', level: 95, icon: Figma, color: 'bg-[#1C39BB] dark:bg-[#5B8DEF]' },
  { name: 'UI/UX Design', level: 92, icon: Palette, color: 'bg-[#FF6B35] dark:bg-[#FF8B66]' },
  { name: 'Photoshop & Illustrator', level: 98, icon: Palette, color: 'bg-[#0EA5E9] dark:bg-[#38BDF8]' },
  { name: 'InDesign', level: 90, icon: Palette, color: 'bg-[#FFB800] dark:bg-[#FFC947]' }
];

const frontendSkills: Skill[] = [
  { name: 'React (JS/TS)', level: 95, icon: Code2, color: 'bg-[#1C39BB] dark:bg-[#5B8DEF]' },
  { name: 'Redux & React Query', level: 90, icon: Code2, color: 'bg-[#4A90E2] dark:bg-[#7BA8F5]' },
  { name: 'AG Grid & Material UI', level: 88, icon: Code2, color: 'bg-[#0EA5E9] dark:bg-[#38BDF8]' },
  { name: 'HTML5/CSS3', level: 96, icon: Code2, color: 'bg-[#FF6B35] dark:bg-[#FF8B66]' }
];

const backendSkills: Skill[] = [
  { name: '.NET Core (C#)', level: 88, icon: Database, color: 'bg-[#0EA5E9] dark:bg-[#38BDF8]' },
  { name: 'RESTful APIs & GraphQL', level: 85, icon: Database, color: 'bg-[#1C39BB] dark:bg-[#5B8DEF]' },
  { name: 'SQL/PL-SQL & MongoDB', level: 87, icon: Database, color: 'bg-[#4A90E2] dark:bg-[#7BA8F5]' },
  { name: 'Microservices', level: 82, icon: Cpu, color: 'bg-[#FFB800] dark:bg-[#FFC947]' }
];

const devopsSkills: Skill[] = [
  { name: 'Docker & Kubernetes', level: 80, icon: Cloud, color: 'bg-[#1C39BB] dark:bg-[#5B8DEF]' },
  { name: 'AWS & Azure', level: 78, icon: Cloud, color: 'bg-[#FF6B35] dark:bg-[#FF8B66]' },
  { name: 'CI/CD & GitHub Actions', level: 85, icon: Cloud, color: 'bg-[#0EA5E9] dark:bg-[#38BDF8]' },
  { name: 'Git & Bash', level: 92, icon: Code2, color: 'bg-[#4A90E2] dark:bg-[#7BA8F5]' }
];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${skill.color} relative`}>
            <Icon className="w-4 h-4 text-white" />
            {/* Sketch circle */}
            <svg className="absolute -inset-0.5 w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none">
              <rect
                x="2"
                y="2"
                width="calc(100% - 4px)"
                height="calc(100% - 4px)"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                rx="4"
                strokeDasharray="1,1"
              />
            </svg>
          </div>
          <span className="text-white">{skill.name}</span>
        </div>
        <span className="text-gray-300 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/5 dark:bg-white/10 rounded-full overflow-hidden relative">
        {/* Sketch lines on progress bar */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2,2" />
        </svg>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          className={`h-full ${skill.color} rounded-full relative`}
        >
          {/* Animated sketch on top of progress */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: index * 0.1 + 1 }}
          >
            <svg className="w-full h-full">
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillSection({ title, skills, icon: Icon, gradient, index }: { 
  title: string; 
  skills: Skill[]; 
  icon: typeof Palette;
  gradient: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/20 rounded-2xl p-8 relative overflow-hidden"
    >
      {/* Hand-drawn sketch background */}
      <svg className="absolute top-4 right-4 w-24 h-24 opacity-5 pointer-events-none">
        <motion.circle
          cx="50%"
          cy="50%"
          r="40%"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white"
          initial={{ pathLength: 0, rotate: 0 }}
          animate={isInView ? { pathLength: 1, rotate: 360 } : { pathLength: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>

      <div className="flex items-center gap-3 mb-8">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} relative`}>
          <Icon className="w-6 h-6 text-white" />
          {/* Sketch star decoration */}
          <motion.svg 
            className="absolute -top-2 -right-2 w-4 h-4"
            initial={{ scale: 0, rotate: 0 }}
            animate={isInView ? { scale: 1, rotate: 180 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <path
              d="M 8,2 L 9,6 L 13,6 L 10,9 L 11,13 L 8,10 L 5,13 L 6,9 L 3,6 L 7,6 Z"
              fill="#FFB800"
            />
          </motion.svg>
        </div>
        <h3 className="text-2xl text-white relative">
          {title}
          {/* Hand-drawn underline */}
          <svg className="absolute -bottom-1 left-0 w-full h-2" preserveAspectRatio="none">
            <motion.path
              d="M 0,1 Q 50,3 100,1"
              stroke="rgba(255,184,0,0.5)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>
        </h3>
      </div>
      {skills.map((skill, idx) => (
        <SkillBar key={skill.name} skill={skill} index={idx} />
      ))}
    </motion.div>
  );
}

export function Skills() {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#0EA5E9] to-[#FFB800] dark:from-[#38BDF8] dark:to-[#FFC947] bg-clip-text text-transparent">
              Skills &amp; Expertise
            </h2>
            {/* Sketch doodle decoration */}
            <motion.svg 
              className="absolute -left-12 -top-8 w-16 h-16 hidden lg:block" 
              viewBox="0 0 64 64"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <circle cx="32" cy="32" r="20" fill="none" stroke="#5B8DEF" strokeWidth="2" strokeDasharray="4,4" />
              <circle cx="32" cy="32" r="4" fill="#FFB800" />
            </motion.svg>
          </div>
          <p className="text-gray-300 dark:text-gray-400 text-xl">Where creativity meets technology</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <SkillSection 
            title="UI/UX Design" 
            skills={uxuiSkills} 
            icon={Palette}
            gradient="from-[#1C39BB] to-[#FF6B35] dark:from-[#5B8DEF] dark:to-[#FF8B66]"
            index={0}
          />
          <SkillSection 
            title="Front-End" 
            skills={frontendSkills} 
            icon={Code2}
            gradient="from-[#1C39BB] to-[#0EA5E9] dark:from-[#5B8DEF] dark:to-[#38BDF8]"
            index={1}
          />
          <SkillSection 
            title="Back-End & Database" 
            skills={backendSkills} 
            icon={Database}
            gradient="from-[#0EA5E9] to-[#FFB800] dark:from-[#38BDF8] dark:to-[#FFC947]"
            index={2}
          />
          <SkillSection 
            title="DevOps & Cloud" 
            skills={devopsSkills} 
            icon={Cloud}
            gradient="from-[#FF6B35] to-[#1C39BB] dark:from-[#FF8B66] dark:to-[#5B8DEF]"
            index={3}
          />
        </div>

        {/* Special Focus Areas with sketchy style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-2xl text-center text-white mb-8 relative inline-block left-1/2 -translate-x-1/2">
            Special Focus
            <svg className="absolute -bottom-2 left-0 w-full h-2" preserveAspectRatio="none">
              <motion.path
                d="M 0,1 Q 50,4 100,1"
                stroke="#0EA5E9"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />
            </svg>
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#1C39BB]/10 to-[#5B8DEF]/10 dark:from-[#5B8DEF]/10 dark:to-[#7BA8F5]/10 border border-[#1C39BB]/20 dark:border-[#5B8DEF]/30 rounded-xl p-6 text-center relative overflow-hidden">
              <svg className="absolute top-2 right-2 w-8 h-8 opacity-20">
                <motion.path
                  d="M 4,4 L 28,4 L 28,28 L 4,28 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[#5B8DEF]"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                />
              </svg>
              <div className="text-4xl mb-2">🤖</div>
              <h4 className="text-white mb-2">AI &amp; LLM Apps</h4>
              <p className="text-gray-300 dark:text-gray-400 text-sm">Building intelligent applications with OpenAI APIs</p>
            </div>
            <div className="bg-gradient-to-br from-[#FFB800]/10 to-[#FFC947]/10 dark:from-[#FFC947]/10 dark:to-[#FFD76E]/10 border border-[#FFB800]/20 dark:border-[#FFC947]/30 rounded-xl p-6 text-center relative overflow-hidden">
              <svg className="absolute top-2 right-2 w-8 h-8 opacity-20">
                <motion.circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[#FFB800] dark:text-[#FFC947]"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.2 }}
                />
              </svg>
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="text-white mb-2">Performance</h4>
              <p className="text-gray-300 dark:text-gray-400 text-sm">Optimized queries 60% faster, reduced load time 40%</p>
            </div>
            <div className="bg-gradient-to-br from-[#0EA5E9]/10 to-[#38BDF8]/10 dark:from-[#38BDF8]/10 dark:to-[#0EA5E9]/10 border border-[#0EA5E9]/20 dark:border-[#38BDF8]/30 rounded-xl p-6 text-center relative overflow-hidden">
              <svg className="absolute top-2 right-2 w-8 h-8 opacity-20">
                <motion.path
                  d="M 16,4 L 28,16 L 16,28 L 4,16 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[#0EA5E9] dark:text-[#38BDF8]"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.4 }}
                />
              </svg>
              <div className="text-4xl mb-2">☁️</div>
              <h4 className="text-white mb-2">Serverless</h4>
              <p className="text-gray-300 dark:text-gray-400 text-sm">AWS Lambda &amp; microservices architecture</p>
            </div>
            <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#FF8B66]/10 dark:from-[#FF8B66]/10 dark:to-[#FF9980]/10 border border-[#FF6B35]/20 dark:border-[#FF8B66]/30 rounded-xl p-6 text-center relative overflow-hidden">
              <svg className="absolute top-2 right-2 w-8 h-8 opacity-20">
                <motion.path
                  d="M 16,4 L 20,12 L 28,16 L 20,20 L 16,28 L 12,20 L 4,16 L 12,12 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[#FF6B35] dark:text-[#FF8B66]"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.6 }}
                />
              </svg>
              <div className="text-4xl mb-2">🎨</div>
              <h4 className="text-white mb-2">Design Systems</h4>
              <p className="text-gray-300 dark:text-gray-400 text-sm">Creating scalable, accessible UI frameworks</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
