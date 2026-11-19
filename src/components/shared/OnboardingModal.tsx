import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, X } from 'lucide-react';

interface OnboardingSlide {
  id: string;
  badge: string;
  artworkTitle: string;
  artist: string;
  location: string;
  headline: string;
  subheadline: string;
  image: string;
  accent: string;
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'slide-1',
    badge: 'FEATURED',
    artworkTitle: 'Portrait of a Young Woman',
    artist: 'SANDRO BOTTICELLI',
    location: 'Städel Museum, Frankfurt',
    headline: 'A Virtual World Of Timeless Art',
    subheadline:
      'Explore the beauty of world-famous paintings, sculptures and wonders, and discover the stories behind every masterpiece.',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sandro_Botticelli_048.jpg?width=960',
    accent: '#E5A93C',
  },
  {
    id: 'slide-2',
    badge: 'LIVING STAGE',
    artworkTitle: 'The Creation of Adam',
    artist: 'MICHELANGELO BUONARROTI',
    location: 'Sistine Chapel, Vatican City',
    headline: 'Art That Moves And Breathes',
    subheadline:
      'No endless scrolling away from the canvas. Smooth cinema cameras glide, zoom, and unveil hidden details while the story comes directly to you.',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Michelangelo_-_Creation_of_Adam_(cropped).jpg?width=960',
    accent: '#E0B26B',
  },
  {
    id: 'slide-3',
    badge: '3D DECK & GALLERY',
    artworkTitle: 'The Starry Night',
    artist: 'VINCENT VAN GOGH',
    location: 'MoMA, New York',
    headline: 'Curated For Pure Enjoyment',
    subheadline:
      'Switch seamlessly between the cinematic Living Stage, the spatial 3D Deck, and our calm Pinterest-style gallery collections.',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?width=960',
    accent: '#E2B857',
  },
];

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex]);

  if (!isOpen) return null;

  const slide = ONBOARDING_SLIDES[currentSlideIndex];
  const isLast = currentSlideIndex === ONBOARDING_SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      handleFinish();
    } else {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const handleFinish = () => {
    try {
      localStorage.setItem('musea_onboarded', 'true');
    } catch {
      // Ignore if localStorage unavailable
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#040406]/90 backdrop-blur-2xl select-none"
      >
        {/* Phone / Device Frame Card Matching Reference 1 & 2 */}
        <div className="relative w-full max-w-[430px] h-[92dvh] sm:h-[840px] max-h-[92dvh] rounded-[42px] sm:rounded-[48px] overflow-hidden bg-[#09090c] border border-[#f4f1ea]/15 shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col justify-between">
          {/* Animated Background Artwork with Smooth Ken-Burns Zoom */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-0 overflow-hidden"
            >
              <img
                src={slide.image}
                alt={slide.artworkTitle}
                className="w-full h-full object-cover"
              />
              {/* Refined gradient overlay for clear typography legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-[#060609]/45 to-[#060609]/20" />
            </motion.div>
          </AnimatePresence>

          {/* Top Status Bar & Skip Button */}
          <div className="relative z-20 flex items-center justify-between p-6 sm:p-7">
            {/* Pill Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {ONBOARDING_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'w-7 bg-[#e5b85b]'
                      : 'w-2 bg-[#f4f1ea]/35 hover:bg-[#f4f1ea]/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Skip / Close Pill */}
            <button
              onClick={handleFinish}
              className="px-3.5 py-1.5 rounded-full bg-[#08080c]/60 hover:bg-[#08080c]/85 text-xs text-[#d5d0c5] hover:text-[#f4f1ea] border border-[#f4f1ea]/15 backdrop-blur-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Skip</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Middle/Bottom: Reference #1 & #2 Overlaid Art Details & Headlines */}
          <div className="relative z-20 p-6 sm:p-8 space-y-5">
            {/* Slide Details with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-4"
              >
                {/* Yellow/Gold Badge Matching Ref 1 (FEATURED) */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e5a93c] text-[#09090c] text-[10px] font-extrabold uppercase tracking-widest shadow">
                    <Sparkles className="w-2.5 h-2.5" />
                    {slide.badge}
                  </span>
                  <span className="text-[11px] text-[#f4f1ea]/70 font-medium">
                    {slide.location}
                  </span>
                </div>

                {/* Main Headline (Ref 2: A Virtual World Of Timeless Art) */}
                <h2 className="text-3xl sm:text-[34px] font-bold text-[#fdfbf7] tracking-tight leading-[1.12]">
                  {slide.headline}
                </h2>

                {/* Subheadline */}
                <p className="text-xs sm:text-sm text-[#e6e1d6]/90 leading-relaxed font-normal">
                  {slide.subheadline}
                </p>

                {/* Artist & Artwork Title Footnote Matching Ref 1 (Portrait of a Young Woman · SANDRO BOTTICELLI) */}
                <div className="pt-1 flex items-baseline justify-between border-t border-[#f4f1ea]/10 text-xs">
                  <span className="font-semibold text-[#f4f1ea] truncate max-w-[220px]">
                    {slide.artworkTitle}
                  </span>
                  <span className="text-[11px] text-[#e5b85b] uppercase tracking-wider font-medium truncate">
                    {slide.artist}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom CTA Button: Exactly Matching Reference 2 ("Discover Art" + Circle Arrow) */}
            <div className="pt-2">
              <button
                onClick={handleNext}
                className="group w-full flex items-center justify-between pl-7 pr-3 py-3 rounded-full bg-[#1c1c24]/90 hover:bg-[#252530] text-[#f4f1ea] border border-[#f4f1ea]/15 backdrop-blur-xl transition-all duration-300 cursor-pointer shadow-xl"
              >
                <span className="text-sm font-semibold tracking-wide">
                  {isLast ? 'Enter Musea' : 'Discover Art'}
                </span>
                <div className="w-10 h-10 rounded-full bg-[#2d2d38] group-hover:bg-[#e5b85b] group-hover:text-[#09090c] text-[#f4f1ea] flex items-center justify-center transition-all duration-300 shadow">
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
