import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  Layers,
  Compass,
  LayoutGrid,
  Menu,
  X,
} from 'lucide-react';

export type MuseumViewMode = 'stage' | 'deck' | 'collection';

interface MuseumNavbarProps {
  viewMode: MuseumViewMode;
  onChangeViewMode: (mode: MuseumViewMode) => void;
  onShuffleExhibit: () => void;
  onOpenSearch: () => void;
  onOpenOnboarding?: () => void;
}

const MODE_LABELS: Record<MuseumViewMode, string> = {
  stage: 'Exhibit',
  deck: '3D Hall',
  collection: 'Gallery',
};

export const MuseumNavbar: React.FC<MuseumNavbarProps> = ({
  viewMode,
  onChangeViewMode,
  onShuffleExhibit,
  onOpenSearch,
  onOpenOnboarding,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const handleSelectMode = (mode: MuseumViewMode) => {
    onChangeViewMode(mode);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 lg:px-12 pt-3.5 sm:pt-5 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Airy Minimal Wordmark (Billabong / Grand Hotel Script) */}
        <button
          onClick={() => handleSelectMode('stage')}
          className="pointer-events-auto group flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111116]/60 backdrop-blur-2xl border border-[#f4f1ea]/10 hover:border-[#e5b85b]/50 transition-all cursor-pointer"
        >
          <span className="font-art-script text-2xl sm:text-3xl leading-none text-[#f4f1ea] pt-0.5">
            Musea
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5b85b]" />
        </button>

        {/* Center (Desktop Only): Airy Floating Glass Pill Capsule */}
        <nav
          aria-label="Museum Experience Modes"
          className="pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full bg-[#14141a]/65 backdrop-blur-2xl border border-[#f4f1ea]/12 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        >
          <button
            onClick={() => handleSelectMode('stage')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'stage'
                ? 'bg-[#f4f1ea]/15 text-[#f4f1ea] border border-[#e5b85b]/45 shadow-sm'
                : 'text-[#d5d0c5]/80 hover:text-[#f4f1ea] border border-transparent'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#e5b85b]" />
            <span>Exhibit</span>
          </button>

          <button
            onClick={() => handleSelectMode('deck')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'deck'
                ? 'bg-[#f4f1ea]/15 text-[#f4f1ea] border border-[#e5b85b]/45 shadow-sm'
                : 'text-[#d5d0c5]/80 hover:text-[#f4f1ea] border border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#e5b85b]" />
            <span>3D Hall</span>
          </button>

          <button
            onClick={() => handleSelectMode('collection')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'collection'
                ? 'bg-[#f4f1ea]/15 text-[#f4f1ea] border border-[#e5b85b]/45 shadow-sm'
                : 'text-[#d5d0c5]/80 hover:text-[#f4f1ea] border border-transparent'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#e5b85b]" />
            <span>Gallery</span>
          </button>

          <div className="w-[1px] h-4 bg-[#f4f1ea]/12 mx-1" />

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-[#d5d0c5]/80 hover:text-[#f4f1ea] transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[#e5b85b]" />
            <span>Search</span>
          </button>
        </nav>

        {/* Right (Desktop): Soft Shuffle Pill & Intro Guide */}
        <div className="pointer-events-auto hidden md:flex items-center gap-2">
          {onOpenOnboarding && (
            <button
              onClick={onOpenOnboarding}
              className="px-3.5 py-2 rounded-full bg-[#14141a]/65 hover:bg-[#1e1e28] text-[#d5d0c5] hover:text-[#f4f1ea] backdrop-blur-2xl border border-[#f4f1ea]/12 text-xs font-medium transition-all cursor-pointer"
              title="Museum Guide"
            >
              Guide
            </button>
          )}

          <button
            onClick={onShuffleExhibit}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#14141a]/65 hover:bg-[#e5b85b] text-[#e5b85b] hover:text-[#09090c] backdrop-blur-2xl border border-[#e5b85b]/35 text-xs font-semibold transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surprise</span>
          </button>
        </div>

        {/* Right (Mobile Only): Clean Search + Collapsible Menu Trigger (Zero Overlap!) */}
        <div className="pointer-events-auto flex md:hidden items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full bg-[#14141a]/75 backdrop-blur-2xl border border-[#f4f1ea]/12 flex items-center justify-center text-[#d5d0c5]"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-[#e5b85b]" />
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#14141a]/80 backdrop-blur-2xl border border-[#f4f1ea]/15 text-xs font-semibold text-[#f4f1ea]"
            aria-label="Toggle navigation menu"
          >
            <span className="text-[#e5b85b]">{MODE_LABELS[viewMode]}</span>
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#f4f1ea]" />
            ) : (
              <Menu className="w-4 h-4 text-[#f4f1ea]" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Dropdown Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto md:hidden mt-2.5 ml-auto w-56 rounded-3xl bg-[#121218]/95 backdrop-blur-2xl border border-[#f4f1ea]/15 p-2.5 shadow-2xl space-y-1"
          >
            <button
              onClick={() => handleSelectMode('stage')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-left transition-all ${
                viewMode === 'stage'
                  ? 'bg-[#e5b85b] text-[#09090c]'
                  : 'text-[#d5d0c5] hover:bg-[#f4f1ea]/10'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Exhibit</span>
            </button>

            <button
              onClick={() => handleSelectMode('deck')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-left transition-all ${
                viewMode === 'deck'
                  ? 'bg-[#e5b85b] text-[#09090c]'
                  : 'text-[#d5d0c5] hover:bg-[#f4f1ea]/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3D Hall</span>
            </button>

            <button
              onClick={() => handleSelectMode('collection')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-left transition-all ${
                viewMode === 'collection'
                  ? 'bg-[#e5b85b] text-[#09090c]'
                  : 'text-[#d5d0c5] hover:bg-[#f4f1ea]/10'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Gallery</span>
            </button>

            <div className="h-[1px] bg-[#f4f1ea]/10 my-1" />

            {onOpenOnboarding && (
              <button
                onClick={() => {
                  onOpenOnboarding();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-[#d5d0c5] hover:bg-[#f4f1ea]/10 text-left transition-all"
              >
                <Compass className="w-4 h-4 text-[#e5b85b]" />
                <span>Guide</span>
              </button>
            )}

            <button
              onClick={() => {
                onShuffleExhibit();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-[#e5b85b] hover:bg-[#e5b85b]/15 text-left transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Surprise Me</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
