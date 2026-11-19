import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react';
import { getTopIconicExhibits } from '../../data/exhibits';
import type { Exhibit } from '../../types/exhibit';
import { MuseumSceneryBackdrop } from '../shared/MuseumSceneryBackdrop';

interface FannedDeckViewProps {
  activeExhibit: Exhibit;
  onSelectExhibit: (exhibit: Exhibit) => void;
}

export const FannedDeckView: React.FC<FannedDeckViewProps> = ({
  activeExhibit,
  onSelectExhibit,
}) => {
  // Showcase the 8 Iconic Masterworks in a calm, breathable 3D fan
  const deckExhibits = useMemo(() => getTopIconicExhibits(8), []);

  const initialIdx = Math.max(
    0,
    deckExhibits.findIndex((e) => e.id === activeExhibit.id)
  );
  const [centerIndex, setCenterIndex] = useState<number>(initialIdx);

  const safeCenterIndex =
    centerIndex >= deckExhibits.length ? 0 : centerIndex;
  const centerExhibit = deckExhibits[safeCenterIndex] || deckExhibits[0];

  const handlePrev = () => {
    setCenterIndex((prev) => (prev - 1 + deckExhibits.length) % deckExhibits.length);
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % deckExhibits.length);
  };

  const visibleCards = useMemo(() => {
    const total = deckExhibits.length;
    if (total === 0) return [];
    const offsets = [-2, -1, 0, 1, 2];

    return offsets.map((offset) => {
      const idx = (safeCenterIndex + offset + total) % total;
      return {
        exhibit: deckExhibits[idx],
        offset,
        idx,
      };
    });
  }, [deckExhibits, safeCenterIndex]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between pt-24 pb-8 px-4 overflow-hidden select-none">
      {/* 1. Atmospheric Museum Gallery Room Scenery Backdrop (Like Reference #2) */}
      <MuseumSceneryBackdrop exhibit={centerExhibit} variant="hall" />

      {/* Top Airy Spacer so Cards Never Touch the Top Navigation */}
      <div className="relative z-20 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e5b85b]/85">
          Curated 3D Gallery · {safeCenterIndex + 1} of {deckExhibits.length}
        </span>
      </div>

      {/* 2. 3D Fanned Card Carousel Stage (Properly proportioned so it never overlaps top or bottom controls!) */}
      <div
        className="relative z-20 w-full max-w-6xl flex-1 min-h-0 flex items-center justify-center my-4"
        style={{ perspective: '1400px' }}
      >
        {visibleCards.map(({ exhibit, offset, idx }) => {
          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          const translateX = offset * 165;
          const scale = isCenter ? 1 : absOffset === 1 ? 0.84 : 0.7;
          const rotateY = offset * -11;
          const zIndex = 30 - absOffset * 10;
          const opacity = isCenter ? 1 : absOffset === 1 ? 0.68 : 0.38;

          return (
            <motion.div
              key={`${exhibit.id}-${offset}`}
              initial={false}
              animate={{
                x: translateX,
                scale,
                rotateY,
                zIndex,
                opacity,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => {
                if (isCenter) {
                  onSelectExhibit(exhibit);
                } else {
                  setCenterIndex(idx);
                }
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`absolute w-[290px] sm:w-[430px] md:w-[470px] h-[310px] sm:h-[350px] max-h-[54dvh] rounded-[28px] overflow-hidden cursor-pointer border transition-colors shadow-[0_25px_70px_rgba(0,0,0,0.75)] ${
                isCenter
                  ? 'border-[#f4f1ea]/30 hover:border-[#e5b85b]'
                  : 'border-[#f4f1ea]/12'
              }`}
            >
              <img
                src={exhibit.images.main}
                alt={exhibit.title}
                className="w-full h-full object-cover"
              />

              {isCenter && (
                <div className="absolute top-3.5 right-3.5 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#09090c]/75 backdrop-blur-md border border-[#e5b85b]/45 text-[#e5b85b] text-[11px] font-semibold shadow-lg">
                    <Play className="w-3 h-3 fill-current" />
                    Enter Stage
                  </span>
                </div>
              )}

              {/* Frosted Glass Bottom Blur Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-[#121217]/65 backdrop-blur-xl border-t border-[#f4f1ea]/15 text-left">
                <div className="flex items-baseline justify-between gap-3 mb-0.5">
                  <h3 className="text-lg sm:text-2xl font-bold text-[#f4f1ea] truncate tracking-tight">
                    {exhibit.title}
                  </h3>
                  <span className="text-xs text-[#f4f1ea]/80 shrink-0">
                    {exhibit.date}
                  </span>
                </div>

                <p className="text-xs text-[#e5b85b] font-semibold mb-1.5 truncate">
                  {exhibit.creator}
                </p>

                <p className="text-xs text-[#f4f1ea]/85 leading-relaxed line-clamp-2">
                  {exhibit.tagline}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Bottom Floating Creator Control Unit (Pushed cleanly down below the cards with zero collision!) */}
      <div className="relative z-20 shrink-0 mt-2 flex items-center gap-4 px-5 py-2.5 rounded-full bg-[#15151b]/75 backdrop-blur-2xl border border-[#f4f1ea]/15 shadow-2xl max-w-md w-full justify-between">
        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full border border-[#f4f1ea]/20 flex items-center justify-center text-[#d5d0c5] hover:text-[#f4f1ea] hover:border-[#e5b85b] transition-colors cursor-pointer shrink-0"
          aria-label="Previous artwork"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          onClick={() => onSelectExhibit(centerExhibit)}
          className="flex items-center gap-3 min-w-0 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#e5b85b]/50 shrink-0">
            <img
              src={centerExhibit.images.main}
              alt={centerExhibit.creator}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 text-left">
            <div className="flex items-center gap-1.5">
              <p className="text-xs sm:text-sm font-bold text-[#f4f1ea] group-hover:text-[#e5b85b] transition-colors truncate">
                {centerExhibit.creator}
              </p>
              <Sparkles className="w-3 h-3 text-[#e5b85b] shrink-0" />
            </div>
            <p className="text-[11px] text-[#a39e93] truncate">
              {centerExhibit.period} · {centerExhibit.location}
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-8 h-8 rounded-full border border-[#f4f1ea]/20 flex items-center justify-center text-[#d5d0c5] hover:text-[#f4f1ea] hover:border-[#e5b85b] transition-colors cursor-pointer shrink-0"
          aria-label="Next artwork"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
