import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, MapPin, Calendar, Sparkles } from 'lucide-react';
import { EXHIBITS } from '../../data/exhibits';
import { ArtworkImage } from '../shared/ArtworkImage';

const SPOTLIGHT_IDS = [
  'the-starry-night',
  'great-wave-kanagawa',
  'winged-victory-of-samothrace',
  'pyramids-of-giza',
  'taj-mahal',
];

export const FeaturedExhibitHero: React.FC = () => {
  const navigate = useNavigate();
  const spotlightExhibits = SPOTLIGHT_IDS.map((id) =>
    EXHIBITS.find((e) => e.id === id)
  ).filter(Boolean) as typeof EXHIBITS;

  const [activeIndex, setActiveIndex] = useState(0);
  const exhibit = spotlightExhibits[activeIndex] || EXHIBITS[0];

  return (
    <section className="relative overflow-hidden border-b border-[#f4f1ea]/8 transition-colors duration-1000">
      {/* Subtle Artwork-Specific Ambient Gallery Lighting */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000 opacity-90"
        style={{ background: exhibit.atmosphere.ambientGradient }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-14 lg:py-16">
        {/* Top Curatorial Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.24em] font-medium border"
              style={{
                borderColor: exhibit.atmosphere.borderSubtle,
                color: exhibit.atmosphere.accent,
                backgroundColor: 'rgba(15, 15, 20, 0.65)',
              }}
            >
              <Sparkles className="w-3 h-3" />
              Featured Exhibition · {exhibit.hallNumber}
            </span>
            <span className="hidden sm:inline text-xs text-[#a39e93] tracking-wider">
              {exhibit.atmosphere.name}
            </span>
          </div>

          {/* Spotlight Switcher Pills */}
          <div className="flex items-center gap-1.5">
            {spotlightExhibits.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3 py-1 rounded-full text-[11px] tracking-wider transition-all cursor-pointer ${
                  idx === activeIndex
                    ? 'bg-[#f4f1ea]/12 text-[#f4f1ea] border border-[#c9a96e]/40'
                    : 'text-[#a39e93] hover:text-[#f4f1ea] border border-transparent'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Main Image-Dominant Museum Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={exhibit.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Dominant Artwork Presentation (8 of 12 columns on desktop) */}
            <div className="lg:col-span-8">
              <div
                onClick={() => navigate(`/exhibit/${exhibit.id}`)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#09090c] p-2 sm:p-4 border border-[#f4f1ea]/10 shadow-[0_30px_90px_rgba(0,0,0,0.85)] transition-all duration-700 hover:border-[#c9a96e]/40"
              >
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-[#0d0d11]">
                  <ArtworkImage
                    src={exhibit.images.main}
                    alt={exhibit.title}
                    priority
                    accentColor={exhibit.atmosphere.accent}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-1000 ease-out"
                  />

                  {/* Subtle Bottom Gradient Vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080b]/70 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-500" />

                  {/* Interactive Hotspot Count Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1.5 rounded-full bg-[#0a0a0c]/80 backdrop-blur-md border border-[#f4f1ea]/15 text-[11px] tracking-[0.16em] uppercase text-[#f4f1ea] flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-[#c9a96e]" />
                      {exhibit.lookCloser.length} Interactive Details Inside
                    </span>
                    <span className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-[#c9a96e]/90 text-[#0a0a0c] text-[11px] font-semibold tracking-[0.16em] uppercase items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      Enter Exhibit
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal Curatorial Plaque Beside the Artwork (4 of 12 columns) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#c9a96e] mb-3">
                  <span>{exhibit.categoryLabel}</span>
                </div>

                <h1 className="font-serif-museum text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.06] text-[#f4f1ea] tracking-tight mb-2">
                  {exhibit.title}
                </h1>

                {exhibit.subtitle && (
                  <p className="font-serif-museum italic text-lg text-[#a39e93] mb-5">
                    {exhibit.subtitle}
                  </p>
                )}

                {/* Museum Wall Plaque Metadata */}
                <div className="py-4 my-5 border-y border-[#f4f1ea]/10 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.18em] text-[#a39e93]">Creator</span>
                    <span className="text-[#f4f1ea] font-medium text-right">{exhibit.creator}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.18em] text-[#a39e93] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#c9a96e]" />
                      Date
                    </span>
                    <span className="text-[#d5d0c5] text-right">
                      {exhibit.date} · {exhibit.period}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.18em] text-[#a39e93] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#c9a96e]" />
                      Collection
                    </span>
                    <span className="text-[#d5d0c5] text-right truncate max-w-[220px]">
                      {exhibit.location}
                    </span>
                  </div>
                </div>

                {/* Short Evocative Hook (Not a wall of text) */}
                <p className="text-sm sm:text-base text-[#d5d0c5] leading-relaxed font-light">
                  {exhibit.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                <button
                  onClick={() => navigate(`/exhibit/${exhibit.id}`)}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#f4f1ea] hover:bg-[#e5c78f] text-[#0a0a0c] text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer"
                >
                  <span>Enter Exhibit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate(`/exhibit/${exhibit.id}?section=look-closer`)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#15151a] hover:bg-[#1e1e26] text-[#f4f1ea] border border-[#f4f1ea]/15 hover:border-[#c9a96e]/50 text-xs uppercase tracking-[0.18em] transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#c9a96e]" />
                  <span>Look Closer</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
