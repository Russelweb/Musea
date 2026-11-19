import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Exhibit } from '../../types/exhibit';

interface MuseumSceneryBackdropProps {
  exhibit?: Exhibit;
  /** 'hall' shows more of the physical museum gallery room (like Reference #2); 'stage' blends the hall with the artwork's colour aura */
  variant?: 'hall' | 'stage';
}

const MUSEUM_HALL_SCENERY =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Interior_of_Gallery_of_19th_and_20th_Century_Art_(Pushkin_museum)_-_006.jpg?width=1280';

export const MuseumSceneryBackdrop: React.FC<MuseumSceneryBackdropProps> = ({
  exhibit,
  variant = 'stage',
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
      {/* 1. Architectural Museum Gallery Room Scenery (Soft Depth-of-Field like Reference #2) */}
      <motion.div
        animate={{
          scale: [1.04, 1.08, 1.04],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0"
      >
        <img
          src={MUSEUM_HALL_SCENERY}
          alt=""
          aria-hidden="true"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            variant === 'hall'
              ? 'opacity-35 blur-[6px] brightness-75 contrast-105'
              : 'opacity-22 blur-[14px] brightness-70'
          }`}
        />
      </motion.div>

      {/* 2. Active Artwork Colour Wash Aura (Blends softly with the museum room walls) */}
      {exhibit && (
        <AnimatePresence mode="wait">
          <motion.div
            key={exhibit.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: variant === 'hall' ? 0.25 : 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0"
          >
            <img
              src={exhibit.images.main}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover blur-[85px] saturate-150 scale-110"
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* 3. Overhead Museum Track-Light Cones & Soft Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 0%, rgba(235, 200, 140, 0.14) 0%, transparent 70%), radial-gradient(circle at 50% 45%, rgba(12, 12, 16, 0.35) 0%, rgba(8, 8, 11, 0.88) 100%)',
        }}
      />

      {/* 4. Subtle Architectural Wall Panels / Gallery Moulding Lines */}
      <div className="absolute inset-x-8 sm:inset-x-16 inset-y-0 border-x border-[#f4f1ea]/[0.03]" />
    </div>
  );
};
