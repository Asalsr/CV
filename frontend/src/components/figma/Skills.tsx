'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Code2, Figma, Database, Cloud, Cpu } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: typeof Palette;
  cssColor: string; // CSS variable string
}

const uxuiSkills: Skill[] = [
  { name: 'Figma', level: 95, icon: Figma, cssColor: 'var(--color-primary-500)' },
  { name: 'UI/UX Design', level: 92, icon: Palette, cssColor: 'var(--sunset-orange)' },
  { name: 'Photoshop & Illustrator', level: 98, icon: Palette, cssColor: 'var(--teal)' },
  { name: 'InDesign', level: 90, icon: Palette, cssColor: 'var(--golden-yellow)' }
];

const frontendSkills: Skill[] = [
  { name: 'React (JS/TS)', level: 95, icon: Code2, cssColor: 'var(--color-primary-500)' },
  { name: 'Redux & React Query', level: 90, icon: Code2, cssColor: 'var(--persian-blue-light)' },
  { name: 'AG Grid & Material UI', level: 88, icon: Code2, cssColor: 'var(--teal)' },
  { name: 'HTML5/CSS3', level: 96, icon: Code2, cssColor: 'var(--sunset-orange)' }
];

const backendSkills: Skill[] = [
  { name: '.NET Core (C#)', level: 88, icon: Database, cssColor: 'var(--teal)' },
  { name: 'RESTful APIs & GraphQL', level: 85, icon: Database, cssColor: 'var(--color-primary-500)' },
  { name: 'SQL/PL-SQL & MongoDB', level: 87, icon: Database, cssColor: 'var(--persian-blue-light)' },
  { name: 'Microservices', level: 82, icon: Cpu, cssColor: 'var(--golden-yellow)' }
];

const devopsSkills: Skill[] = [
  { name: 'Docker & Kubernetes', level: 80, icon: Cloud, cssColor: 'var(--color-primary-500)' },
  { name: 'AWS & Azure', level: 78, icon: Cloud, cssColor: 'var(--sunset-orange)' },
  { name: 'CI/CD & GitHub Actions', level: 85, icon: Cloud, cssColor: 'var(--teal)' },
  { name: 'Git & Bash', level: 92, icon: Code2, cssColor: 'var(--persian-blue-light)' }
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
          <div className="p-2 rounded-lg relative" style={{ backgroundColor: skill.cssColor }}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span style={{ color: 'var(--color-text-primary)' }}>{skill.name}</span>
        </div>
        <span style={{ color: 'var(--color-text-secondary)' }}>{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden relative" style={{ backgroundColor: 'var(--color-glass-bg)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          className="h-full rounded-full relative"
          style={{ backgroundColor: skill.cssColor }}
        />
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
      className="backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-glass-bg)',
        border: '1px solid var(--color-glass-border)',
      }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl relative" style={{ background: gradient }}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl relative" style={{ color: 'var(--color-text-primary)' }}>
          {title}
          {/* Hand-drawn underline */}
          <svg className="absolute -bottom-1 left-0 w-full h-2" preserveAspectRatio="none">
            <motion.path
              d="M 0,1 Q 50,3 100,1"
              stroke="var(--color-accent-500)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
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
          <h2
            className="text-4xl md:text-5xl mb-4 bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(to right, var(--teal), var(--color-accent-500))' }}
          >
            Skills &amp; Expertise
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-xl">Where creativity meets technology</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <SkillSection
            title="UI/UX Design"
            skills={uxuiSkills}
            icon={Palette}
            gradient="linear-gradient(135deg, var(--color-primary-500), var(--sunset-orange))"
            index={0}
          />
          <SkillSection
            title="Front-End"
            skills={frontendSkills}
            icon={Code2}
            gradient="linear-gradient(135deg, var(--color-primary-500), var(--teal))"
            index={1}
          />
          <SkillSection
            title="Back-End & Database"
            skills={backendSkills}
            icon={Database}
            gradient="linear-gradient(135deg, var(--teal), var(--color-accent-500))"
            index={2}
          />
          <SkillSection
            title="DevOps & Cloud"
            skills={devopsSkills}
            icon={Cloud}
            gradient="linear-gradient(135deg, var(--sunset-orange), var(--color-primary-500))"
            index={3}
          />
        </div>

        {/* Special Focus Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-2xl text-center mb-8 relative inline-block left-1/2 -translate-x-1/2" style={{ color: 'var(--color-text-primary)' }}>
            Special Focus
            <svg className="absolute -bottom-2 left-0 w-full h-2" preserveAspectRatio="none">
              <motion.path
                d="M 0,1 Q 50,4 100,1"
                stroke="var(--teal)"
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
            {[
              { emoji: '🤖', title: 'AI & LLM Apps', desc: 'Building intelligent applications with OpenAI APIs', color: 'var(--color-primary-500)' },
              { emoji: '⚡', title: 'Performance', desc: 'Optimized queries 60% faster, reduced load time 40%', color: 'var(--golden-yellow)' },
              { emoji: '☁️', title: 'Serverless', desc: 'AWS Lambda & microservices architecture', color: 'var(--teal)' },
              { emoji: '🎨', title: 'Design Systems', desc: 'Creating scalable, accessible UI frameworks', color: 'var(--sunset-orange)' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-6 text-center"
                style={{
                  background: `linear-gradient(135deg, color-mix(in srgb, ${item.color} 10%, transparent), color-mix(in srgb, ${item.color} 5%, transparent))`,
                  border: `1px solid color-mix(in srgb, ${item.color} 20%, transparent)`,
                }}
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <h4 className="mb-2" style={{ color: 'var(--color-text-primary)' }}>{item.title}</h4>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
