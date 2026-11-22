import React from 'react';
import { motion } from 'framer-motion';

interface MuseaLoaderProps {
  /** 'fullscreen' = full viewport splash; 'overlay' = covers parent container; 'compact' = inside artwork cards */
  variant?: 'fullscreen' | 'overlay' | 'compact';
  label?: string;
}

/**
 * Single continuous flowing cursive brush path spelling "Musea" + calligraphic flourish.
 * ViewBox: 0 0 420 140
 */
const MUSEA_BRUSH_PATH =
  'M 26 98 ' +
  'C 34 62, 46 28, 56 26 ' +
  'C 64 24, 58 64, 62 84 ' +
  'C 66 96, 82 32, 95 28 ' +
  'C 104 26, 94 82, 104 94 ' +
  'C 114 104, 130 70, 138 56 ' +
  'C 134 74, 134 94, 148 94 ' +
  'C 162 94, 170 72, 176 56 ' +
  'C 172 74, 174 94, 188 94 ' +
  'C 200 94, 212 72, 224 58 ' +
  'C 234 48, 220 46, 214 56 ' +
  'C 208 66, 232 72, 228 86 ' +
  'C 224 98, 206 96, 214 92 ' +
  'C 234 86, 254 78, 266 64 ' +
  'C 276 52, 260 48, 252 60 ' +
  'C 244 74, 250 94, 270 94 ' +
  'C 288 94, 304 72, 322 58 ' +
  'C 312 52, 296 66, 298 82 ' +
  'C 300 96, 318 92, 326 70 ' +
  'C 324 84, 328 95, 344 93 ' +
  'C 360 91, 376 80, 392 74';

const FLOURISH_PATH = 'M 54 114 C 145 106, 260 105, 368 112';

export const MuseaLoader: React.FC<MuseaLoaderProps> = ({
  variant = 'fullscreen',
  label,
}) => {
  const isCompact = variant === 'compact';

  const containerClasses =
    variant === 'fullscreen'
      ? 'fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#09090d]'
      : variant === 'overlay'
      ? 'absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#18171f]/90 backdrop-blur-md'
      : 'absolute inset-0 flex flex-col items-center justify-center bg-[#111116]';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`${containerClasses} select-none pointer-events-none`}
    >
      {/* Subtle warm gallery aura behind the brush */}
      {!isCompact && (
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, rgba(229, 184, 91, 0.14) 0%, transparent 60%)',
          }}
        />
      )}

      <div className="relative flex flex-col items-center">
        <svg
          viewBox="0 0 420 140"
          className={
            isCompact
              ? 'w-32 sm:w-40 h-auto overflow-visible'
              : 'w-64 sm:w-80 md:w-96 h-auto overflow-visible'
          }
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Loading Musea"
        >
          <defs>
            <linearGradient id="museaBrushGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e5b85b" />
              <stop offset="50%" stopColor="#fdf6e3" />
              <stop offset="100%" stopColor="#e5b85b" />
            </linearGradient>

            <linearGradient id="brushHandleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d9b061" />
              <stop offset="50%" stopColor="#7a5b2b" />
              <stop offset="100%" stopColor="#261f18" />
            </linearGradient>

            <filter id="brushGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle Ghost Guide of "Musea" */}
          <path
            d={MUSEA_BRUSH_PATH}
            stroke="#f4f1ea"
            strokeOpacity="0.1"
            strokeWidth={isCompact ? 6.5 : 5.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated Fast Smooth Brush Stroke Writing "Musea" in a Seamless Loop */}
          <path
            id="museaWritePath"
            d={MUSEA_BRUSH_PATH}
            stroke="url(#museaBrushGrad)"
            strokeWidth={isCompact ? 6.5 : 5.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1000}
            strokeDasharray="1000"
            filter="url(#brushGlow)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="1000; 0; 0; -1000"
              keyTimes="0; 0.56; 0.74; 1"
              dur="1.85s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.22 1; 0 0 1 1; 0.55 0 0.25 1"
            />
          </path>

          {/* Sweeping Calligraphic Underline Flourish */}
          <path
            d={FLOURISH_PATH}
            stroke="#e5b85b"
            strokeOpacity="0.7"
            strokeWidth={isCompact ? 2.8 : 2.2}
            strokeLinecap="round"
            pathLength={400}
            strokeDasharray="400"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="400; 400; 0; -400"
              keyTimes="0; 0.48; 0.72; 1"
              dur="1.85s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0 0 1 1; 0.35 0 0.2 1; 0.55 0 0.25 1"
            />
          </path>

          {/* Artist's Paintbrush Following the Exact Ink Tip Along the Path */}
          <g>
            <animateMotion
              dur="1.85s"
              repeatCount="indefinite"
              keyPoints="0; 1; 1; 1"
              keyTimes="0; 0.56; 0.74; 1"
              calcMode="spline"
              keySplines="0.42 0 0.22 1; 0 0 1 1; 0.55 0 0.25 1"
            >
              <mpath href="#museaWritePath" />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0; 1; 1; 0; 0"
              keyTimes="0; 0.06; 0.62; 0.74; 1"
              dur="1.85s"
              repeatCount="indefinite"
            />

            {/* Golden Wet Ink Tip Glow */}
            <circle cx="0" cy="0" r={isCompact ? 3.5 : 3} fill="#fff3d1" />

            {/* Angled Fine Paintbrush (Bristles -> Gold Ferrule -> Tapered Handle) */}
            <g transform="rotate(-38)">
              {/* Fine Tapered Bristles */}
              <path
                d="M 0 0 C 3 -4, 7 -11, 10 -15 L 4 -19 C 2 -14, -1 -6, 0 0 Z"
                fill="#e5b85b"
              />
              {/* Brass Ferrule Collar */}
              <path
                d="M 4 -19 L 10 -15 L 15 -22 L 9 -26 Z"
                fill="#f4e2b8"
              />
              {/* Sleek Tapered Wooden Brush Handle */}
              <path
                d="M 9 -26 L 15 -22 L 32 -52 C 34 -56, 30 -59, 27 -55 Z"
                fill="url(#brushHandleGrad)"
              />
            </g>
          </g>
        </svg>

        {!isCompact && (
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#d5d0c5]/75">
            {label || 'Entering Musea'}
          </p>
        )}
      </div>
    </motion.div>
  );
};
