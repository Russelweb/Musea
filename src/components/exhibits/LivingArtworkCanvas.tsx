import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Exhibit } from '../../types/exhibit';
import type { StoryChapter } from '../../lib/storyChapters';
import { MuseumSceneryBackdrop } from '../shared/MuseumSceneryBackdrop';

interface LivingArtworkCanvasProps {
  exhibit: Exhibit;
  activeChapter: StoryChapter;
  isPureArtMode?: boolean;
  onSwipeNext?: () => void;
  onSwipePrev?: () => void;
}

export const LivingArtworkCanvas: React.FC<LivingArtworkCanvasProps> = ({
  exhibit,
  activeChapter,
  isPureArtMode = false,
  onSwipeNext,
  onSwipePrev,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isInspectZoomed, setIsInspectZoomed] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const { x, y, scale, rotateX, rotateY } = activeChapter.camera;

  // Restrained pan so the entire artwork remains comfortably visible
  const panX = (50 - x) * 0.14;
  const panY = (50 - y) * 0.14;
  const finalScale = isInspectZoomed ? Math.max(1.32, scale * 1.18) : scale;

  // Ambient floating golden dust motes matching the 3D Museum Hall
  const dustMotes = useMemo(
    () =>
      Array.from({ length: 24 }, (_, idx) => ({
        id: idx,
        left: `${(idx * 37 + 11) % 94}%`,
        top: `${(idx * 29 + 7) % 88}%`,
        size: 2 + (idx % 3),
        duration: 9 + (idx % 7) * 2.2,
        delay: (idx % 5) * 0.8,
      })),
    []
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x: normX, y: normY });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const dx = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(dx) > 55) {
      if (dx < 0 && onSwipeNext) onSwipeNext();
      if (dx > 0 && onSwipePrev) onSwipePrev();
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full overflow-hidden select-none flex items-center justify-center"
      style={{
        perspective: '1500px',
        backgroundColor: exhibit.atmosphere.bgPrimary,
      }}
    >
      {/* 1. Atmospheric Museum Gallery Scenery + Active Artwork Aura */}
      <MuseumSceneryBackdrop exhibit={exhibit} variant="stage" />

      {/* 2. Artwork-Specific Soft Radial Wall Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{ background: exhibit.atmosphere.ambientGradient }}
      />

      {/* 3. Dynamic Overhead Museum Halogen Spotlight Cone (Subtly follows pointer) */}
      <div
        className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out z-[5]"
        style={{
          transform: `translate3d(${mouseOffset.x * 24}px, ${mouseOffset.y * 12}px, 0)`,
          background:
            'radial-gradient(ellipse 46% 62% at 50% 14%, rgba(255, 232, 184, 0.22) 0%, rgba(229, 184, 91, 0.06) 48%, transparent 76%)',
        }}
      />

      {/* 4. Floating Golden Dust Motes Drifting Through the Spotlight Beam */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[6]">
        {dustMotes.map((mote) => (
          <motion.span
            key={mote.id}
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
            }}
            animate={{
              y: [-14, 14, -14],
              x: [-8, 8, -8],
              opacity: [0.12, 0.55, 0.12],
            }}
            transition={{
              duration: mote.duration,
              delay: mote.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-[#f5dba0] blur-[0.5px]"
          />
        ))}
      </div>

      {/* 5. Physical Sculpted 3D Museum Frame Stage — 100% Uncropped Visibility */}
      <div
        className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 ${
          isPureArtMode
            ? 'px-4 sm:px-10 py-12'
            : 'px-4 sm:px-12 pt-16 pb-28 sm:pb-32'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={exhibit.id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-full max-w-full flex items-center justify-center"
          >
            {/* Subtle autonomous breathing motion */}
            <motion.div
              animate={{
                scale: [1, 1.015, 1],
                rotateZ: [-0.12, 0.12, -0.12],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-center justify-center"
            >
              {/* Chapter-Driven 3D Parallax & Gentle Focal Camera */}
              <motion.div
                animate={{
                  scale: finalScale,
                  x: `${panX + mouseOffset.x * 1.1}%`,
                  y: `${panY + mouseOffset.y * 0.9}%`,
                  rotateX: rotateX - mouseOffset.y * 3.2,
                  rotateY: rotateY + mouseOffset.x * 3.8,
                }}
                transition={{
                  duration: 2.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => setIsInspectZoomed((z) => !z)}
                title={isInspectZoomed ? 'Click to zoom out' : 'Click to inspect closer'}
                className="relative cursor-zoom-in active:cursor-zoom-out"
              >
                {/* Sculpted Museum Wood-Obsidian Frame + Antique Gold Inner Fillet */}
                <div className="relative p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-[#231f1b] via-[#131217] to-[#0a0a0e] ring-1 ring-[#c9a96e]/45 shadow-[0_36px_95px_rgba(0,0,0,0.92),0_0_50px_rgba(229,184,91,0.08)]">
                  <div className="relative overflow-hidden rounded-lg ring-1 ring-[#f4f1ea]/12 bg-[#09090d]">
                    <img
                      src={exhibit.images.main}
                      alt={exhibit.title}
                      draggable={false}
                      className="max-h-[60dvh] sm:max-h-[65dvh] max-w-[86vw] sm:max-w-[78vw] w-auto h-auto object-contain block"
                    />

                    {/* Subtle Interactive Light Glint Across Canvas Surface */}
                    <div
                      className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at ${50 + mouseOffset.x * 28}% ${
                          45 + mouseOffset.y * 28
                        }%, rgba(255, 244, 218, 0.1) 0%, transparent 55%)`,
                      }}
                    />

                    {/* Subtle Golden "Look Closer" Focal Spotlight Ring When Inspecting a Detail */}
                    <AnimatePresence>
                      {activeChapter.hotspotCoord && !isPureArtMode && (
                        <motion.div
                          key={activeChapter.id}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            left: `${activeChapter.hotspotCoord.x}%`,
                            top: `${activeChapter.hotspotCoord.y}%`,
                          }}
                          className="pointer-events-none -translate-x-1/2 -translate-y-1/2 absolute z-20"
                        >
                          <span className="block w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#e5b85b]/80 bg-[#e5b85b]/10 shadow-[0_0_30px_rgba(229,184,91,0.4)] animate-pulse" />
                          <span className="block absolute inset-3 rounded-full border border-[#fdfbf7]/60" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
