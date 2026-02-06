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
    onYearSelect(selectedYear === year ? null : year);
  };

  return (
    <section
      ref={containerRef}
      className="py-16 px-4 backdrop-blur-sm"
      style={{ backgroundColor: 'var(--color-glass-bg)' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Timeline
          </h3>
          <p className="text-center text-sm mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            Click a year to filter projects
            {selectedYear && (
              <button
                onClick={() => onYearSelect(null)}
                className="ml-2 underline hover:no-underline"
                style={{ color: 'var(--color-primary-500)' }}
              >
                (Clear filter)
              </button>
            )}
          </p>

          <div className="relative overflow-x-auto pb-4">
            <div className="min-w-max px-8">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute left-8 right-8 top-4 h-0.5 origin-left"
                style={{
                  backgroundImage: 'linear-gradient(to right, color-mix(in srgb, var(--color-primary-500) 50%, transparent), color-mix(in srgb, var(--color-accent-500) 50%, transparent), color-mix(in srgb, var(--color-primary-500) 50%, transparent))',
                }}
              />

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

function YearMarker({ data, index, isSelected, onClick, isInView, totalYears }: YearMarkerProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      onClick={onClick}
      className="relative flex flex-col items-center group px-4 md:px-6"
      style={{ minWidth: `${100 / totalYears}%` }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="w-4 h-4 rounded-full z-10 transition-all"
        style={{
          backgroundColor: isSelected ? 'var(--color-primary-500)' : 'var(--color-primary-400)',
          boxShadow: isSelected ? '0 0 0 4px color-mix(in srgb, var(--color-primary-500) 30%, transparent)' : 'none',
        }}
      />

      <motion.span
        className="mt-3 font-bold text-base md:text-lg transition-colors"
        style={{ color: isSelected ? 'var(--color-primary-500)' : 'var(--color-text-primary)' }}
      >
        {data.year}
      </motion.span>

      <span
        className="text-xs md:text-sm transition-colors"
        style={{ color: isSelected ? 'var(--color-primary-400)' : 'var(--color-text-secondary)' }}
      >
        {data.count} {data.count === 1 ? 'project' : 'projects'}
      </span>

      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300"
        style={{ backgroundColor: 'var(--color-primary-500)' }}
      />
    </motion.button>
  );
}
