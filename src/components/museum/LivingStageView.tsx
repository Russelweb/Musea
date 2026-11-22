import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { EXHIBITS } from '../../data/exhibits';
import type { Exhibit } from '../../types/exhibit';
import { buildExhibitChapters } from '../../lib/storyChapters';
import { LivingArtworkCanvas } from '../exhibits/LivingArtworkCanvas';
import { useLenisScroll } from '../../hooks/useLenisScroll';

interface LivingStageViewProps {
  exhibit: Exhibit;
  onSelectExhibit: (exhibit: Exhibit) => void;
  onOpenCollection: () => void;
}

const AUTO_TOUR_DURATION_MS = 8500;

export const LivingStageView: React.FC<LivingStageViewProps> = ({
  exhibit,
  onSelectExhibit,
}) => {
  const chapters = useMemo(() => buildExhibitChapters(exhibit), [exhibit]);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [isAutoTourPlaying, setIsAutoTourPlaying] = useState(true);
  const [isPureArtMode, setIsPureArtMode] = useState(false);
  const [showFullDossierModal, setShowFullDossierModal] = useState(false);
  const [isAmbientSoundOn, setIsAmbientSoundOn] = useState(false);
  const dossierScrollRef = useRef<HTMLDivElement>(null);
  const dossierContentRef = useRef<HTMLDivElement>(null);

  useLenisScroll(dossierScrollRef, dossierContentRef, {
    enabled: showFullDossierModal,
    lerp: 0.085,
  });

  // Pure Web Audio API calm museum hall ambient soundscape (zero external files)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const toggleAmbientSound = () => {
    if (!isAmbientSoundOn) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioCtx();
          const master = ctx.createGain();
          master.gain.value = 0.0001;

          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 420;

          // Warm resonant D-major9 meditative museum chord (D2, A2, E3, F#3)
          const freqs = [73.42, 110.0, 164.81, 185.0];
          freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.value = f;
            g.gain.value = idx === 0 ? 0.25 : 0.12;
            osc.connect(g);
            g.connect(filter);
            osc.start();
          });

          filter.connect(master);
          master.connect(ctx.destination);
          audioCtxRef.current = ctx;
          masterGainRef.current = master;
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        masterGainRef.current?.gain.setTargetAtTime(
          0.06,
          audioCtxRef.current.currentTime,
          0.8
        );
        setIsAmbientSoundOn(true);
      } catch {
        // AudioContext unavailable
      }
    } else {
      if (audioCtxRef.current && masterGainRef.current) {
        masterGainRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.5
        );
      }
      setIsAmbientSoundOn(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setChapterIndex(0);
  }, [exhibit.id]);

  // Smooth Auto-Tour timer
  useEffect(() => {
    if (!isAutoTourPlaying || showFullDossierModal) return;
    const timer = setInterval(() => {
      setChapterIndex((prev) => (prev + 1) % chapters.length);
    }, AUTO_TOUR_DURATION_MS);
    return () => clearInterval(timer);
  }, [isAutoTourPlaying, chapters.length, chapterIndex, showFullDossierModal]);

  // Preload next & previous exhibit images in background for instant switching
  const currentIdx = EXHIBITS.findIndex((e) => e.id === exhibit.id);
  useEffect(() => {
    const next = EXHIBITS[(currentIdx + 1) % EXHIBITS.length];
    const prev = EXHIBITS[(currentIdx - 1 + EXHIBITS.length) % EXHIBITS.length];
    [next, prev].forEach((item) => {
      if (item) {
        const img = new Image();
        img.src = item.images.main;
      }
    });
  }, [currentIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight') {
        setChapterIndex((prev) => (prev + 1) % chapters.length);
      } else if (e.key === 'ArrowLeft') {
        setChapterIndex((prev) => (prev - 1 + chapters.length) % chapters.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoTourPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chapters.length]);

  const activeChapter = chapters[chapterIndex] || chapters[0];

  const handleNextExhibit = () => {
    const next = EXHIBITS[(currentIdx + 1) % EXHIBITS.length];
    onSelectExhibit(next);
  };

  const handlePrevExhibit = () => {
    const prev = EXHIBITS[(currentIdx - 1 + EXHIBITS.length) % EXHIBITS.length];
    onSelectExhibit(prev);
  };

  const handleNextChapter = () => {
    setChapterIndex((prev) => (prev + 1) % chapters.length);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#08080b]">
      {/* 1. SCULPTED EXHIBIT ROOM CANVAS (3D Frame, Spotlight, Dust Motes & Focal Ring) */}
      <div className="absolute inset-0 w-full h-full">
        <LivingArtworkCanvas
          exhibit={exhibit}
          activeChapter={activeChapter}
          isPureArtMode={isPureArtMode}
          onSwipeNext={handleNextExhibit}
          onSwipePrev={handlePrevExhibit}
        />
      </div>

      {/* Soft Left & Right Masterpiece Switcher Buttons (Desktop/Tablet; mobile uses smooth touch swipe) */}
      <button
        onClick={handlePrevExhibit}
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#121217]/60 hover:bg-[#e5b85b] text-[#f4f1ea]/85 hover:text-[#09090c] backdrop-blur-xl border border-[#f4f1ea]/12 items-center justify-center transition-colors cursor-pointer shadow-lg"
        title="Previous Artwork"
        aria-label="Previous artwork"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNextExhibit}
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#121217]/60 hover:bg-[#e5b85b] text-[#f4f1ea]/85 hover:text-[#09090c] backdrop-blur-xl border border-[#f4f1ea]/12 items-center justify-center transition-colors cursor-pointer shadow-lg"
        title="Next Artwork"
        aria-label="Next artwork"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Ambient Room Controls: Top-Right on Mobile (avoids Next button), Bottom-Right on Desktop */}
      <div className="absolute top-20 right-4 sm:top-auto sm:bottom-4 sm:right-7 z-40 flex items-center gap-2">
        <button
          onClick={toggleAmbientSound}
          className={`w-11 h-11 rounded-full backdrop-blur-xl border flex items-center justify-center transition-colors cursor-pointer shadow-lg ${
            isAmbientSoundOn
              ? 'bg-[#e5b85b]/20 border-[#e5b85b]/60 text-[#e5b85b]'
              : 'bg-[#141419]/75 border-[#f4f1ea]/15 hover:border-[#e5b85b] text-[#d5d0c5] hover:text-[#f4f1ea]'
          }`}
          title={isAmbientSoundOn ? 'Mute Gallery Ambiance' : 'Play Gallery Ambiance'}
          aria-label={isAmbientSoundOn ? 'Mute gallery sound' : 'Play gallery sound'}
        >
          {isAmbientSoundOn ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={() => setIsPureArtMode((p) => !p)}
          className="w-11 h-11 rounded-full bg-[#141419]/75 backdrop-blur-xl border border-[#f4f1ea]/15 hover:border-[#e5b85b] text-[#d5d0c5] hover:text-[#f4f1ea] flex items-center justify-center transition-colors cursor-pointer shadow-lg"
          title={isPureArtMode ? 'Show Story' : 'Full Screen Art'}
          aria-label={isPureArtMode ? 'Show story card' : 'Full screen artwork'}
        >
          {isPureArtMode ? (
            <Minimize2 className="w-4 h-4 text-[#e5b85b]" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 2. SLEEK, COMPACT FLOATING STORY SPOTLIGHT AT BOTTOM */}
      <AnimatePresence>
        {!isPureArtMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
            onFocus={() => setIsAutoTourPlaying(false)}
            className="absolute inset-x-0 bottom-3 sm:bottom-4 z-30 px-4 sm:px-8 pointer-events-none"
          >
            <div className="pointer-events-auto max-w-2xl mx-auto rounded-3xl bg-[#0e0e14]/88 backdrop-blur-2xl border border-[#f4f1ea]/14 px-5 sm:px-7 py-3.5 sm:py-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
              {/* Top Row: Chapter Badge · Title · Accessible Step Dots */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e5b85b]/15 border border-[#e5b85b]/40 text-[#f3cf8a] text-xs font-semibold shrink-0">
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                    {activeChapter.tabLabel}
                  </span>
                  <span className="text-xs text-[#f4f1ea]/90 font-semibold truncate">
                    {exhibit.title}
                  </span>
                  <span className="hidden sm:inline text-xs text-[#a39e93] truncate">
                    · {exhibit.creator} ({exhibit.date})
                  </span>
                </div>

                {/* Accessible 28px Padded Tap Targets Around Sleek 6px Step Bars */}
                <div className="flex items-center" role="tablist" aria-label="Story chapters">
                  {chapters.map((chap, idx) => {
                    const isCurrent = idx === chapterIndex;
                    return (
                      <button
                        key={chap.id}
                        role="tab"
                        aria-selected={isCurrent}
                        aria-label={`Chapter ${idx + 1}: ${chap.tabLabel}`}
                        onClick={() => setChapterIndex(idx)}
                        className="min-w-[28px] min-h-[28px] flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e5b85b] rounded-full"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-300 ${
                            isCurrent
                              ? 'w-5 bg-[#e5b85b]'
                              : 'w-1.5 bg-[#f4f1ea]/30 hover:bg-[#f4f1ea]/60'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Unclamped, Screen-Reader-Live Story Moment */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="min-h-[64px] flex flex-col justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${exhibit.id}-${activeChapter.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="font-art-script text-2xl sm:text-3xl text-[#fdfbf7] leading-tight mb-1">
                      {activeChapter.heading}
                    </h1>
                    <p className="text-xs sm:text-sm text-[#e6e1d6] leading-relaxed">
                      {activeChapter.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Controls Bar with Comfortable Tap Targets */}
              <div className="mt-3 pt-2 border-t border-[#f4f1ea]/8 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsAutoTourPlaying((p) => !p)}
                    className="min-h-[36px] px-2.5 inline-flex items-center gap-1.5 rounded-full text-xs font-medium text-[#d5d0c5] hover:text-[#f4f1ea] hover:bg-[#f4f1ea]/5 transition-colors cursor-pointer"
                  >
                    {isAutoTourPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#e5b85b]" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#e5b85b]" />
                        <span>Auto</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowFullDossierModal(true)}
                    className="min-h-[36px] px-2.5 inline-flex items-center gap-1.5 rounded-full text-xs font-medium text-[#d5d0c5] hover:text-[#e5b85b] hover:bg-[#f4f1ea]/5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#e5b85b]" />
                    <span>Read Story</span>
                  </button>
                </div>

                {/* Live Gold Progress Line */}
                <div className="hidden sm:block flex-1 max-w-[130px] h-1 bg-[#f4f1ea]/10 rounded-full overflow-hidden">
                  {isAutoTourPlaying ? (
                    <motion.div
                      key={`prog-${exhibit.id}-${activeChapter.id}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: AUTO_TOUR_DURATION_MS / 1000,
                        ease: 'linear',
                      }}
                      className="h-full bg-[#e5b85b]"
                    />
                  ) : (
                    <div className="h-full w-full bg-[#e5b85b]/50" />
                  )}
                </div>

                <button
                  onClick={handleNextChapter}
                  className="min-h-[36px] inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#e5b85b]/15 hover:bg-[#e5b85b] text-[#f3cf8a] hover:text-[#09090c] border border-[#e5b85b]/35 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessible Full Story Dialog */}
      <AnimatePresence>
        {showFullDossierModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dossier-dialog-title"
            className="fixed inset-0 z-50 bg-[#050507]/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setShowFullDossierModal(false)}
          >
            <motion.div
              ref={dossierScrollRef}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[82dvh] overflow-y-auto no-scrollbar rounded-t-3xl sm:rounded-3xl bg-[#121217] border border-[#f4f1ea]/15 p-6 sm:p-8 shadow-2xl"
            >
              <div ref={dossierContentRef} className="space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-[#f4f1ea]/10 pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#e5b85b] block mb-1">
                    {exhibit.categoryLabel}
                  </span>
                  <h2 id="dossier-dialog-title" className="font-art-script text-3xl sm:text-4xl text-[#f4f1ea]">
                    {exhibit.title}
                  </h2>
                  <p className="text-xs text-[#a39e93] mt-1">
                    {exhibit.creator} · {exhibit.date} · {exhibit.location}
                  </p>
                </div>
                <button
                  onClick={() => setShowFullDossierModal(false)}
                  className="px-4 py-1.5 rounded-full bg-[#1c1c24] text-xs font-semibold text-[#f4f1ea] hover:bg-[#e5b85b] hover:text-[#09090c] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4 text-sm text-[#d5d0c5] leading-relaxed">
                <p className="text-base text-[#f4f1ea] font-medium">
                  {exhibit.introduction}
                </p>
                <h4 className="text-lg font-bold text-[#e5b85b] pt-2">
                  {exhibit.story.heading}
                </h4>
                {exhibit.story.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <h4 className="text-lg font-bold text-[#e5b85b] pt-2">
                  {exhibit.meaning.heading}
                </h4>
                {exhibit.meaning.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <div className="p-4 rounded-2xl bg-[#181820] border border-[#e5b85b]/30">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#e5b85b] block mb-1">
                    Why It Matters
                  </span>
                  <p className="text-sm text-[#f4f1ea] font-medium">
                    {exhibit.meaning.keyTakeaway}
                  </p>
                </div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
