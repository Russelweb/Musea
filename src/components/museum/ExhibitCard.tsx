import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { Exhibit } from '../../types/exhibit';
import { ArtworkImage } from '../shared/ArtworkImage';

interface ExhibitCardProps {
  exhibit: Exhibit;
  indexNumber?: number;
  masonryHeight?: 'tall' | 'medium' | 'compact' | 'square';
  variant?: 'bento-featured' | 'bento-tall' | 'bento-wide' | 'deck-mini' | 'default';
  isActive?: boolean;
  onSelect: (exhibit: Exhibit) => void;
}

export const ExhibitCard: React.FC<ExhibitCardProps> = ({
  exhibit,
  masonryHeight,
  onSelect,
}) => {
  // Natural Pinterest staggered aspect ratios
  const aspectClass =
    masonryHeight === 'tall'
      ? 'aspect-[3/4]'
      : masonryHeight === 'compact'
      ? 'aspect-[4/3]'
      : masonryHeight === 'square'
      ? 'aspect-square'
      : exhibit.images.aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : 'aspect-[4/3]';

  return (
    <div
      onClick={() => onSelect(exhibit)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(exhibit);
      }}
      className="group break-inside-avoid mb-4 cursor-pointer"
    >
      {/* Pinterest Pin Image Container */}
      <div
        className={`relative w-full ${aspectClass} rounded-3xl overflow-hidden bg-[#141419] border border-[#f4f1ea]/10 group-hover:border-[#e5b85b]/60 transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.55)]`}
      >
        <ArtworkImage
          src={exhibit.images.main}
          alt={exhibit.title}
          accentColor={exhibit.atmosphere.accent}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Soft bottom gradient for overlaid info */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060608]/90 via-[#060608]/20 to-transparent" />

        {/* Pinterest-Style Top-Right Hover Action Pill */}
        <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#e5b85b] text-[#09090c] text-xs font-bold shadow-lg">
            <span>View Art</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Top-Left Category Badge */}
        <div className="absolute top-3.5 left-3.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#09090c]/70 backdrop-blur-md border border-[#f4f1ea]/15 text-[10px] font-semibold text-[#f4f1ea]">
            {exhibit.featured && <Sparkles className="w-2.5 h-2.5 text-[#e5b85b]" />}
            {exhibit.categoryLabel.split(' ')[0]}
          </span>
        </div>

        {/* Bottom Overlaid Title & Creator */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-art-script text-2xl sm:text-3xl text-[#f4f1ea] group-hover:text-[#f3cf8a] leading-none transition-colors">
            {exhibit.title}
          </h3>
          <p className="text-xs text-[#d5d0c5]/85 font-medium mt-1 truncate">
            {exhibit.creator} · {exhibit.date}
          </p>
        </div>
      </div>
    </div>
  );
};
