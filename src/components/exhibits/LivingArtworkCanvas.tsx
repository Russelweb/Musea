import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Exhibit } from '../../types/exhibit';
import type { StoryChapter } from '../../lib/storyChapters';
import { MuseumSceneryBackdrop } from '../shared/MuseumSceneryBackdrop';

interface LivingArtworkCanvasProps {
  exhibit: Exhibit;
  activeChapter: StoryChapter;
  isPureArtMode?: boolean;
}

export const LivingArtworkCanvas: React.FC<LivingArtworkCanvasProps> = ({
  exhibit,
  activeChapter,
  isPureArtMode = false,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const { x, y, scale, rotateX, rotateY } = activeChapter.camera;

  // Gentle, restrained camera pan percentage so the artwork never shifts out of frame
  const panX = (50 - x) * 0.15;
  const panY = (50 - y) * 0.15;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x: normX * 1.2, y: normY * 1.2 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      className="relative w-full h-full overflow-hidden select-none flex items-center justify-center"
      style={{
        perspective: '1400px',
        backgroundColor: exhibit.atmosphere.bgPrimary,
      }}
    >
      {/* 1. Atmospheric Museum Gallery Scenery + Active Artwork Aura */}
      <MuseumSceneryBackdrop exhibit={exhibit} variant="stage" />

      {/* 2. Artwork-Specific Soft Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{ background: exhibit.atmosphere.ambientGradient }}
      />

      {/* 3. Main Artwork Stage — 100% Full Uncropped Visibility */}
      <div
        className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ${
          isPureArtMode
            ? 'px-4 sm:px-10 py-12'
            : 'px-4 sm:px-12 pt-16 pb-28 sm:pb-32'
        }`}
      >
        {/* Subtle breathing drift wrapper */}
        <motion.div
          animate={{
            scale: [1, 1.018, 1],
            rotateZ: [-0.15, 0.15, -0.15],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative max-h-full max-w-full flex items-center justify-center"
        >
          {/* Chapter-Driven Camera Pan, Zoom & 3D Angle */}
          <motion.div
            key={exhibit.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{
              opacity: 1,
              scale: scale,
              x: `${panX + mouseOffset.x * 0.25}%`,
              y: `${panY + mouseOffset.y * 0.25}%`,
              rotateX: rotateX - mouseOffset.y * 0.35,
              rotateY: rotateY + mouseOffset.x * 0.35,
            }}
            transition={{
              duration: 3.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="flex items-center justify-center"
          >
            {/* The Artwork Image: object-contain ensures the entire painting/sculpture is 100% visible from edge to edge */}
            <img
              src={exhibit.images.main}
              alt={exhibit.title}
              className={`max-h-[64dvh] sm:max-h-[68dvh] max-w-[90vw] sm:max-w-[82vw] w-auto h-auto object-contain rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.85)] ring-1 ring-[#f4f1ea]/12 transition-all duration-500`}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
