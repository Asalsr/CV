'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PaintStrokeProps {
  children: ReactNode;
  color?: string;
  delay?: number;
  className?: string;
}

export function PaintStrokeUnderline({ children, color = "#FFB800", delay = 0, className = "" }: PaintStrokeProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        className="absolute -bottom-1 left-0 w-full h-3"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0,5 Q 25,8 50,5 T 100,5"
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay }}
          style={{
            filter: 'url(#paint-texture-underline)'
          }}
        />
        <motion.path
          d="M 0,6 Q 25,9 50,6 T 100,6"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.1 }}
        />
        <defs>
          <filter id="paint-texture-underline">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          </filter>
        </defs>
      </svg>
    </span>
  );
}

export function PaintStrokeCircle({
  size = 60,
  color = "#5B8DEF",
  delay = 0,
  className = ""
}: {
  size?: number;
  color?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100">
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={color}
        strokeWidth="4"
        opacity="0.4"
        initial={{ pathLength: 0, rotate: 0 }}
        whileInView={{ pathLength: 1, rotate: 360 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay }}
        style={{
          filter: 'url(#paint-texture-circle)'
        }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.2"
        initial={{ pathLength: 0, rotate: 180 }}
        whileInView={{ pathLength: 1, rotate: -180 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: delay + 0.2 }}
      />
      <defs>
        <filter id="paint-texture-circle">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </defs>
    </svg>
  );
}

export function PaintSplatter({
  count = 5,
  colors = ["#5B8DEF", "#FFB800", "#FF6B35"],
  delay = 0,
  className = ""
}: {
  count?: number;
  colors?: string[];
  delay?: number;
  className?: string;
}) {
  return (
    <svg className={`${className} pointer-events-none`} width="100" height="100" viewBox="0 0 100 100">
      {[...Array(count)].map((_, i) => {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        const r = Math.random() * 4 + 2;
        const color = colors[i % colors.length];

        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill={color}
            opacity="0.4"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: delay + i * 0.1,
              type: "spring",
              stiffness: 200
            }}
          />
        );
      })}
    </svg>
  );
}

export function PaintStrokeButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = ""
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  return (
    <Component
      {...props}
      className={`
        px-8 py-3 rounded-full text-white relative overflow-hidden group
        ${variant === 'primary'
          ? 'bg-gradient-to-r from-[#1C39BB] to-[#5B8DEF] dark:from-[#5B8DEF] dark:to-[#3D6FD9]'
          : 'bg-white/10 dark:bg-white/5 backdrop-blur-sm border-2 border-white/20'
        }
        hover:shadow-lg hover:shadow-[#5B8DEF]/50 transition-all
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>

      {/* Paint splatters on hover */}
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        viewBox="0 0 200 80"
      >
        <circle cx="40" cy="40" r="8" fill="#FFB800" opacity="0.3" />
        <circle cx="160" cy="40" r="6" fill="#FF6B35" opacity="0.3" />
        <circle cx="100" cy="20" r="4" fill="#0EA5E9" opacity="0.3" />
        <circle cx="120" cy="60" r="5" fill="#FFB800" opacity="0.3" />
      </motion.svg>

      {/* Paint stroke border effect */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          fill="none"
          stroke="white"
          strokeWidth="1"
          rx="9999"
          opacity="0.2"
          style={{
            filter: 'url(#paint-texture-button)'
          }}
        />
        <defs>
          <filter id="paint-texture-button">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
      </svg>
    </Component>
  );
}

export function GridToOrganic({
  width = 200,
  height = 200,
  delay = 0,
  className = ""
}: {
  width?: number;
  height?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 200 200"
    >
      {/* Grid lines that dissolve */}
      {[...Array(5)].map((_, i) => (
        <g key={`grid-${i}`}>
          <motion.line
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="200"
            stroke="#5B8DEF"
            strokeWidth="0.5"
            opacity="0.3"
            initial={{ pathLength: 1, opacity: 0.3 }}
            whileInView={{ pathLength: 0, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: delay + i * 0.1 }}
          />
          <motion.line
            x1="0"
            y1={i * 50}
            x2="200"
            y2={i * 50}
            stroke="#5B8DEF"
            strokeWidth="0.5"
            opacity="0.3"
            initial={{ pathLength: 1, opacity: 0.3 }}
            whileInView={{ pathLength: 0, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: delay + i * 0.1 }}
          />
        </g>
      ))}

      {/* Organic shapes that appear */}
      {[...Array(8)].map((_, i) => {
        const x = Math.random() * 160 + 20;
        const y = Math.random() * 160 + 20;
        const r = Math.random() * 15 + 5;
        const colors = ["#5B8DEF", "#FFB800", "#FF6B35", "#0EA5E9"];

        return (
          <motion.circle
            key={`organic-${i}`}
            cx={x}
            cy={y}
            r={r}
            fill={colors[i % colors.length]}
            opacity="0.3"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: delay + 1 + i * 0.15,
              type: "spring"
            }}
            style={{
              filter: 'url(#blur)'
            }}
          />
        );
      })}

      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>
    </svg>
  );
}
