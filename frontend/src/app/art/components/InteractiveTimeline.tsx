'use client';

import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('art.timeline');
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
      className="py-16 px-4 bg-white/5 dark:bg-white/5 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-white">
            {t('heading')}
          </h3>
          <p className="text-center text-sm mb-10 text-gray-300 dark:text-gray-400">
            {t('instruction')}
            {selectedYear && (
              <button
                onClick={() => onYearSelect(null)}
                className="ml-2 underline hover:no-underline text-[var(--persian-blue)]"
              >
                {t('clearFilter')}
              </button>
            )}
          </p>

          <div className="relative overflow-x-auto pb-4">
            <div className="min-w-max px-8">
              {/* Paint-stroke timeline line with fading ends */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute left-8 right-8 top-4 h-[3px] origin-left"
                style={{
                  background: 'linear-gradient(to right, var(--persian-blue), var(--golden-yellow), var(--teal), var(--sunset-orange), var(--persian-blue))',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
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
                    projectCountLabel={t('projectCount', { count: data.count })}
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
  projectCountLabel: string;
}

function YearMarker({ data, index, isSelected, onClick, isInView, totalYears, projectCountLabel }: YearMarkerProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      onClick={onClick}
      className="relative flex flex-col items-center group px-4 md:px-6"
      style={{ minWidth: `${100 / totalYears}%` }}
    >
      {/* Dot — matches Roadmap timeline dots */}
      <motion.div
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        className="w-4 h-4 rounded-full z-10 transition-all border-2 border-white shadow-lg"
        style={{
          background: isSelected
            ? 'linear-gradient(135deg, var(--golden-yellow), var(--persian-blue))'
            : 'linear-gradient(135deg, var(--persian-blue), var(--persian-blue-light))',
          boxShadow: isSelected ? '0 0 12px rgba(255,184,0,0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
        }}
      />

      <motion.span
        className={`mt-3 font-bold text-base md:text-lg transition-colors ${
          isSelected ? 'text-[var(--golden-yellow)]' : 'text-white'
        }`}
      >
        {data.year}
      </motion.span>

      <span
        className={`text-xs md:text-sm transition-colors ${
          isSelected ? 'text-[var(--persian-blue)]' : 'text-gray-400 dark:text-gray-500'
        }`}
      >
        {projectCountLabel}
      </span>

      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-[var(--golden-yellow)]"
      />
    </motion.button>
  );
}
