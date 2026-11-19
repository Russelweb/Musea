import React, { useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { CATEGORIES, EXHIBITS } from '../../data/exhibits';
import type { Exhibit } from '../../types/exhibit';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  onSelectExhibit: (exhibit: Exhibit) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  query,
  onQueryChange,
  onSelectExhibit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredExhibits = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return EXHIBITS.slice(0, 8);
    return EXHIBITS.filter(
      (ex) =>
        ex.title.toLowerCase().includes(trimmed) ||
        ex.creator.toLowerCase().includes(trimmed) ||
        ex.period.toLowerCase().includes(trimmed) ||
        ex.categoryLabel.toLowerCase().includes(trimmed) ||
        ex.location.toLowerCase().includes(trimmed) ||
        ex.tagline.toLowerCase().includes(trimmed)
    );
  }, [query]);

  const handleChoose = (exhibit: Exhibit) => {
    onSelectExhibit(exhibit);
    onClose();
  };

  const handleSurpriseMe = () => {
    const random = EXHIBITS[Math.floor(Math.random() * EXHIBITS.length)];
    onSelectExhibit(random);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-[#060608]/85 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-3xl bg-[#111116]/95 border border-[#f4f1ea]/15 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-5 py-4 border-b border-[#f4f1ea]/10">
              <Search className="w-5 h-5 text-[#e5b85b] shrink-0 mr-4" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search artworks, artists, civilisations, architecture, literature..."
                className="w-full bg-transparent text-[#f4f1ea] placeholder-[#a39e93]/60 text-base sm:text-lg focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => onQueryChange('')}
                  className="text-xs uppercase tracking-widest text-[#a39e93] hover:text-[#f4f1ea] mr-3 px-2 py-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-[#a39e93] hover:text-[#f4f1ea] hover:bg-[#f4f1ea]/10 transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Category Pills */}
            <div className="px-5 py-3 bg-[#0b0b0f] border-b border-[#f4f1ea]/8 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#a39e93] mr-1 shrink-0 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#e5b85b]" />
                Disciplines:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onQueryChange(cat.shortLabel)}
                  className="text-xs px-3 py-1 rounded-full border border-[#f4f1ea]/12 bg-[#16161c] text-[#d5d0c5] hover:border-[#e5b85b] hover:text-[#f4f1ea] transition-colors shrink-0 cursor-pointer"
                >
                  {cat.shortLabel}
                </button>
              ))}
              <button
                onClick={handleSurpriseMe}
                className="ml-auto text-xs px-3 py-1 rounded-full border border-[#e5b85b]/40 bg-[#e5b85b]/15 text-[#f3cf8a] hover:bg-[#e5b85b]/25 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                Surprise Art
              </button>
            </div>

            {/* Visual Overlaid Results Grid */}
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar p-4 sm:p-5">
              <div className="pb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#a39e93]">
                <span>
                  {query.trim()
                    ? `Found ${filteredExhibits.length} Masterwork${filteredExhibits.length === 1 ? '' : 's'}`
                    : 'Instant Stage Jump'}
                </span>
                <span>Click to enter Living Stage</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredExhibits.map((exhibit, idx) => (
                  <button
                    key={exhibit.id}
                    onClick={() => handleChoose(exhibit)}
                    className="group relative h-28 rounded-2xl overflow-hidden border border-[#f4f1ea]/12 hover:border-[#e5b85b] text-left cursor-pointer transition-all"
                  >
                    <img
                      src={exhibit.images.main}
                      alt={exhibit.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/95 via-[#070709]/70 to-transparent" />
                    <div className="absolute inset-0 p-3.5 flex items-center justify-between">
                      <div className="min-w-0 pr-3">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#e5b85b] block">
                          /0{idx + 1} · {exhibit.categoryLabel.split(' ')[0]}
                        </span>
                        <h4 className="font-serif-museum text-xl text-[#f4f1ea] group-hover:text-[#f3cf8a] truncate">
                          {exhibit.title}
                        </h4>
                        <p className="text-xs text-[#d5d0c5]/80 truncate">
                          {exhibit.creator} · {exhibit.date}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#e5b85b] shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
