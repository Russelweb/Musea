import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { CATEGORIES, EXHIBITS } from '../../data/exhibits';
import type { ExhibitCategory } from '../../types/exhibit';
import { ExhibitCard } from './ExhibitCard';

interface CategoryRailsSectionProps {
  onSelectCategory: (category: ExhibitCategory) => void;
}

const CategoryRail: React.FC<{
  categoryId: ExhibitCategory;
  label: string;
  description: string;
  onSelectCategory: (category: ExhibitCategory) => void;
}> = ({ categoryId, label, description, onSelectCategory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const exhibits = EXHIBITS.filter((e) => e.category === categoryId);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 420;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (exhibits.length === 0) return null;

  return (
    <div className="py-10 border-b border-[#f4f1ea]/6 last:border-b-0">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#c9a96e] mb-1.5">
            <span>Permanent Gallery Wing</span>
            <span>·</span>
            <span>{exhibits.length} Exhibits</span>
          </div>
          <h3 className="font-serif-museum text-3xl sm:text-4xl text-[#f4f1ea]">{label}</h3>
          <p className="text-xs sm:text-sm text-[#a39e93] mt-1 max-w-xl font-light">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-end">
          <button
            onClick={() => {
              onSelectCategory(categoryId);
              document
                .getElementById('discovery-collection')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] text-[#d5d0c5] hover:text-[#e5c78f] border border-[#f4f1ea]/12 hover:border-[#c9a96e]/40 transition-colors cursor-pointer"
          >
            Focus Wing
          </button>
          <button
            onClick={() => handleScroll('left')}
            className="p-2 rounded-full bg-[#141418] hover:bg-[#1c1c22] border border-[#f4f1ea]/10 text-[#a39e93] hover:text-[#f4f1ea] transition-colors cursor-pointer"
            aria-label={`Scroll ${label} left`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 rounded-full bg-[#141418] hover:bg-[#1c1c22] border border-[#f4f1ea]/10 text-[#a39e93] hover:text-[#f4f1ea] transition-colors cursor-pointer"
            aria-label={`Scroll ${label} right`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally Browsable Rail */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
      >
        {exhibits.map((exhibit) => (
          <div
            key={exhibit.id}
            className="min-w-[300px] sm:min-w-[360px] lg:min-w-[400px] max-w-[420px] flex-1 snap-start"
          >
            <ExhibitCard exhibit={exhibit} variant="default" onSelect={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CategoryRailsSection: React.FC<CategoryRailsSectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#0a0a0c]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Museum Directory</span>
          </div>
          <h2 className="font-serif-museum text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4f1ea]">
            Explore by Discipline
          </h2>
        </div>

        <div className="divide-y divide-[#f4f1ea]/8">
          {CATEGORIES.map((cat) => (
            <CategoryRail
              key={cat.id}
              categoryId={cat.id}
              label={cat.label}
              description={cat.description}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
