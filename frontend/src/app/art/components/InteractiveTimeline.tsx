'use client';

import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Artwork } from '../types/artwork';

interface InteractiveTimelineProps {
  artworks: Artwork[];
  selectedYear: string | null;
  onYearSelect: (year: string | null) => void;
}

interface YearData {
  year: string;
  count: number;
}

export default function InteractiveTimeline({
  artworks,
  selectedYear,
  onYearSelect,
}: InteractiveTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const yearData = useMemo(() => {
    const yearMap = new Map<string, number>();
    artworks.forEach((artwork) => {
      const year = artwork.year.split('-')[0];
      yearMap.set(year, (yearMap.get(year) || 0) + 1);
    });
    return Array.from(yearMap.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
  }, [artworks]);

  const handleYearClick = (year: string) => {
    if (selectedYear === year) {
      onYearSelect(null); // Toggle off
    } else {
      onYearSelect(year);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-16 px-4 bg-white/5 dark:bg-white/5 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block left-1/2 -translate-x-1/2 mb-4">
            <h3
              className="text-2xl md:text-3xl font-bold text-center"
              style={{
                background: 'linear-gradient(135deg, var(--color-persian-blue), var(--color-golden-yellow))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Timeline
            </h3>
            {/* Hand-drawn underline */}
            <svg className="absolute -bottom-2 left-0 w-full h-2" preserveAspectRatio="none">
              <motion.path
                d="M 0,1 Q 50,4 100,1"
                stroke="var(--color-sunset-orange)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5 }}
              />
            </svg>
          </div>
          <p
            className="text-center text-sm mb-10"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Click a year to filter projects
            {selectedYear && (
              <button
                onClick={() => onYearSelect(null)}
                className="ml-2 underline hover:no-underline"
                style={{ color: 'var(--color-persian-blue)' }}
              >
                (Clear filter)
              </button>
            )}
          </p>

          {/* Timeline Container */}
          <div className="relative overflow-x-auto pb-4">
            <div className="min-w-max px-8">
              {/* Timeline Line with gradient */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute left-8 right-8 top-4 h-0.5 origin-left rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--color-persian-blue), var(--color-golden-yellow), var(--color-sunset-orange))',
                }}
              />
              {/* Hand-drawn sketch line effect */}
              <svg className="absolute left-8 right-8 top-4 h-1 w-full pointer-events-none">
                <motion.path
                  d="M 0,0 L 100,0"
                  stroke="var(--color-persian-blue)"
                  strokeWidth="0.5"
                  strokeDasharray="4,2"
                  opacity="0.2"
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </svg>

              {/* Year Markers */}
              <div className="relative flex justify-between items-start">
                {yearData.map((data, index) => (
                  <YearMarker
                    key={data.year}
                    data={data}
                    index={index}
                    isSelected={selectedYear === data.year}
                    onClick={() => handleYearClick(data.year)}
                    isInView={isInView}
                    totalYears={yearData.length}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface YearMarkerProps {
  data: YearData;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  isInView: boolean;
  totalYears: number;
}

function YearMarker({
  data,
  index,
  isSelected,
  onClick,
  isInView,
  totalYears,
}: YearMarkerProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      onClick={onClick}
      className="relative flex flex-col items-center group px-4 md:px-6"
      style={{ minWidth: `${100 / totalYears}%` }}
    >
      {/* Dot with gradient */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="w-4 h-4 rounded-full z-10 transition-all relative"
        style={{
          background: isSelected
            ? 'linear-gradient(135deg, var(--color-persian-blue), var(--color-golden-yellow))'
            : 'var(--color-persian-blue-light)',
          boxShadow: isSelected
            ? '0 0 0 4px rgba(28, 57, 187, 0.2)'
            : 'none',
        }}
      >
        {/* Sketch circle around dot */}
        {isSelected && (
          <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none">
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="var(--color-golden-yellow)"
              strokeWidth="1"
              strokeDasharray="2,2"
              initial={{ pathLength: 0, rotate: 0 }}
              animate={{ pathLength: 1, rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        )}
      </motion.div>

      {/* Year Label */}
      <motion.span
        className="mt-3 font-bold text-base md:text-lg transition-colors"
        style={{
          background: isSelected
            ? 'linear-gradient(135deg, var(--color-persian-blue), var(--color-golden-yellow))'
            : 'var(--color-text-primary)',
          WebkitBackgroundClip: isSelected ? 'text' : 'initial',
          WebkitTextFillColor: isSelected ? 'transparent' : 'initial',
          backgroundClip: isSelected ? 'text' : 'initial',
          color: isSelected ? 'transparent' : 'var(--color-text-primary)',
        }}
      >
        {data.year}
      </motion.span>

      {/* Project Count */}
      <span
        className="text-xs md:text-sm transition-colors"
        style={{
          color: isSelected
            ? 'var(--color-sunset-orange)'
            : 'var(--color-text-secondary)',
        }}
      >
        {data.count} {data.count === 1 ? 'project' : 'projects'}
      </span>

      {/* Hover Indicator */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
        style={{
          background: 'linear-gradient(90deg, var(--color-persian-blue), var(--color-golden-yellow))',
        }}
      />
    </motion.button>
  );
}
