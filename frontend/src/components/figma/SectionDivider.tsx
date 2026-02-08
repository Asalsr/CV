'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'organic';
  color1?: string;
  color2?: string;
}

export function SectionDivider({
  variant = 'wave',
  color1 = '#5B8DEF',
  color2 = '#FFB800'
}: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className="relative h-24 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0,50 Q 150,20 300,50 T 600,50 T 900,50 T 1200,50 L 1200,100 L 0,100 Z"
            fill="url(#wave-gradient-1)"
            opacity="0.1"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d="M 0,60 Q 150,30 300,60 T 600,60 T 900,60 T 1200,60"
            stroke="url(#wave-gradient-2)"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            style={{
              filter: 'url(#paint-wave-texture)'
            }}
          />
          <motion.path
            d="M 0,70 Q 150,40 300,70 T 600,70 T 900,70 T 1200,70"
            stroke="url(#wave-gradient-3)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, delay: 0.2 }}
          />

          {/* Animated particles */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              r="2"
              fill={i % 2 === 0 ? color1 : color2}
              opacity="0.4"
              initial={{ offsetDistance: '0%', opacity: 0 }}
              whileInView={{
                offsetDistance: '100%',
                opacity: [0, 0.6, 0]
              }}
              viewport={{ once: true }}
              transition={{
                duration: 4,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                offsetPath: `path("M 0,60 Q 150,30 300,60 T 600,60 T 900,60 T 1200,60")`,
              }}
            />
          ))}

          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="50%" stopColor={color2} />
              <stop offset="100%" stopColor={color1} />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="100%" stopColor={color2} />
            </linearGradient>
            <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color2} />
              <stop offset="100%" stopColor={color1} />
            </linearGradient>
            <filter id="paint-wave-texture">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === 'curve') {
    return (
      <div className="relative h-20 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0,40 C 300,10 600,70 900,40 C 1050,25 1125,40 1200,40"
            stroke="url(#curve-divider-gradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            style={{
              filter: 'url(#paint-curve-texture)'
            }}
          />
          <defs>
            <linearGradient id="curve-divider-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color1} />
              <stop offset="50%" stopColor={color2} />
              <stop offset="100%" stopColor={color1} />
            </linearGradient>
            <filter id="paint-curve-texture">
              <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }

  // Organic variant with paint splatters
  return (
    <div className="relative h-32 overflow-hidden flex items-center justify-center">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120"
      >
        {/* Paint splatters */}
        {[...Array(12)].map((_, i) => {
          const x = (i / 12) * 1200;
          const y = 40 + Math.random() * 40;
          const r = Math.random() * 8 + 4;

          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={i % 2 === 0 ? color1 : color2}
              opacity="0.15"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.15 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                type: 'spring',
                stiffness: 200
              }}
            />
          );
        })}

        {/* Flowing organic line */}
        <motion.path
          d="M 0,60 Q 100,40 200,60 T 400,60 T 600,60 T 800,60 T 1000,60 T 1200,60"
          stroke="url(#organic-gradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          strokeDasharray="8,4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3 }}
        />

        <defs>
          <linearGradient id="organic-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="25%" stopColor={color2} />
            <stop offset="50%" stopColor={color1} />
            <stop offset="75%" stopColor={color2} />
            <stop offset="100%" stopColor={color1} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
