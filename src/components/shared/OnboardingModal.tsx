import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

interface OnboardingSlide {
  id: string;
  badge: string;
  artworkTitle: string;
  artist: string;
  location: string;
  headline: string;
  subheadline: string;
  image: string;
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'slide-1',
    badge: 'Featured Work',
    artworkTitle: 'Portrait of a Young Woman',
    artist: 'Sandro Botticelli',
    location: 'Städel Museum, Frankfurt',
    headline: 'Walk Through Five Millennia of Art',
    subheadline:
      'Step inside a nocturnal 3D corridor lined with fifteen landmark paintings, sculptures, monuments, and artefacts—each paired with its history and hidden details.',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sandro_Botticelli_048.jpg?width=960',
  },
  {
    id: 'slide-2',
    badge: 'Exhibit Room',
    artworkTitle: 'The Creation of Adam',
    artist: 'Michelangelo Buonarroti',
    location: 'Sistine Chapel, Vatican City',
    headline: 'Art That Moves and Breathes',
    subheadline:
      'No scrolling away from the canvas. Guided focal rings highlight hidden brushstrokes and symbolism right on the work while the story unfolds beneath.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/960px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
  },
  {
    id: 'slide-3',
    badge: '3D Hall & Gallery',
    artworkTitle: 'The Starry Night',
    artist: 'Vincent van Gogh',
    location: 'MoMA, New York',
    headline: 'Explore at Your Own Pace',
    subheadline:
      'Scroll, swipe, or use your arrow keys to stroll down the 3D Hall, click any frame to step closer on the wall, or browse the Gallery by discipline.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/960px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus dialog on open and restore previous focus on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setTimeout(() => dialogRef.current?.focus(), 40);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  const handleFinish = () => {
    try {
      localStorage.setItem('musea_onboarded', 'true');
    } catch {
      // Ignore if localStorage unavailable
    }
    onClose();
  };

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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'Escape') handleFinish();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen) return null;

  const slide = ONBOARDING_SLIDES[currentSlideIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-heading"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050508]/88 backdrop-blur-2xl"
        onClick={handleFinish}
      >
        {/* Responsive Editorial Card: Full-Bleed Portrait on Mobile, Wide Museum Split Layout on Desktop */}
        <div
          ref={dialogRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[420px] md:max-w-4xl h-[86dvh] max-h-[760px] md:h-[560px] rounded-3xl overflow-hidden bg-[#101016] border border-[#f4f1ea]/14 shadow-[0_30px_100px_rgba(0,0,0,0.92)] flex flex-col md:grid md:grid-cols-12 focus:outline-none"
        >
          {/* LEFT / BACKGROUND (Mobile Full-Bleed, Desktop 6 Cols): Clean Artwork Plate */}
          <div className="absolute inset-0 md:relative md:col-span-6 overflow-hidden bg-[#09090d]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                <img
                  src={slide.image}
                  alt={`${slide.artworkTitle} by ${slide.artist}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/55 to-[#08080c]/20 md:bg-gradient-to-t md:from-[#08080c]/75 md:via-transparent md:to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Desktop Artwork Attribution Bar */}
            <div className="hidden md:flex absolute inset-x-0 bottom-0 p-5 items-baseline justify-between text-xs">
              <span className="font-semibold text-[#f4f1ea]">{slide.artworkTitle}</span>
              <span className="text-[#e5b85b]">{slide.artist}</span>
            </div>
          </div>

          {/* RIGHT / BOTTOM CONTENT (Desktop 6 Cols, Mobile Overlay) */}
          <div className="relative z-10 flex-1 md:col-span-6 flex flex-col justify-between p-6 sm:p-8 md:p-10">
            {/* Top Bar: Step Indicators & Skip */}
            <div className="flex items-center justify-between">
              <div className="flex items-center" role="tablist" aria-label="Guide slides">
                {ONBOARDING_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={idx === currentSlideIndex}
                    aria-label={`Slide ${idx + 1}: ${s.badge}`}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className="min-w-[28px] min-h-[28px] flex items-center justify-center cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e5b85b]"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlideIndex
                          ? 'w-7 bg-[#e5b85b]'
                          : 'w-2 bg-[#f4f1ea]/35 hover:bg-[#f4f1ea]/70'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleFinish}
                className="min-h-[36px] px-3.5 py-1.5 rounded-full bg-[#16161f]/80 hover:bg-[#222230] text-xs font-medium text-[#d5d0c5] hover:text-[#f4f1ea] border border-[#f4f1ea]/15 backdrop-blur-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Skip</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Middle Editorial Copy */}
            <div className="my-auto pt-6 pb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-[#e5b85b] text-[#09090c] font-bold tracking-wide">
                      {slide.badge}
                    </span>
                    <span className="text-[#d5d0c5]/80">{slide.location}</span>
                  </div>

                  <h2
                    id="onboarding-heading"
                    className="font-art-script text-4xl sm:text-5xl text-[#fdfbf7] leading-[1.08]"
                  >
                    {slide.headline}
                  </h2>

                  <p className="text-sm text-[#e6e1d6]/90 leading-relaxed">
                    {slide.subheadline}
                  </p>

                  {/* Mobile-only Artwork Footnote */}
                  <div className="md:hidden pt-2 flex items-baseline justify-between border-t border-[#f4f1ea]/12 text-xs">
                    <span className="font-semibold text-[#f4f1ea] truncate max-w-[200px]">
                      {slide.artworkTitle}
                    </span>
                    <span className="text-[#e5b85b] truncate">{slide.artist}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom CTA Button */}
            <div className="pt-2">
              <button
                onClick={handleNext}
                className="group w-full min-h-[52px] flex items-center justify-between pl-6 pr-2.5 py-2 rounded-full bg-[#e5b85b] hover:bg-[#f0c770] text-[#09090c] transition-colors duration-200 cursor-pointer shadow-xl"
              >
                <span className="text-sm font-bold tracking-wide">
                  {isLast ? 'Enter Musea' : 'Continue'}
                </span>
                <span className="w-9 h-9 rounded-full bg-[#09090c]/15 group-hover:bg-[#09090c]/25 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 stroke-[2.4]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
