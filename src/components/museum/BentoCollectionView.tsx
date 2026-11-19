import React, { useMemo, useState } from 'react';
import { Search, X, Sparkles, Check } from 'lucide-react';
import { CATEGORIES, EXHIBITS, getTopIconicExhibits } from '../../data/exhibits';
import type { Exhibit, ExhibitCategory } from '../../types/exhibit';
import { ExhibitCard } from './ExhibitCard';
import { ArtworkImage } from '../shared/ArtworkImage';
import { MuseumSceneryBackdrop } from '../shared/MuseumSceneryBackdrop';

interface BentoCollectionViewProps {
  onSelectExhibit: (exhibit: Exhibit) => void;
}

const MASONRY_HEIGHTS: Array<'tall' | 'compact' | 'medium' | 'square'> = [
  'tall',
  'compact',
  'tall',
  'square',
  'compact',
  'tall',
  'square',
  'compact',
];

export const BentoCollectionView: React.FC<BentoCollectionViewProps> = ({
  onSelectExhibit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    ExhibitCategory | 'featured-8'
  >('featured-8');
  const [query, setQuery] = useState('');

  // Curated max-8 attention-pulling masterworks for the active selection
  const displayedExhibits = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (q) {
      return EXHIBITS.filter(
        (ex) =>
          ex.title.toLowerCase().includes(q) ||
          ex.creator.toLowerCase().includes(q) ||
          ex.period.toLowerCase().includes(q) ||
          ex.categoryLabel.toLowerCase().includes(q)
      ).slice(0, 8);
    }

    if (selectedCategory === 'featured-8') {
      return getTopIconicExhibits(8);
    }

    return EXHIBITS.filter((ex) => ex.category === selectedCategory).slice(0, 8);
  }, [selectedCategory, query]);

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="relative w-full h-full overflow-y-auto no-scrollbar pt-24 pb-20 px-4 sm:px-8 lg:px-12 bg-[#09090c]">
      <MuseumSceneryBackdrop variant="stage" />
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* 1. Header & Pinterest-Style Rounded Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#f4f1ea] tracking-tight">
              Explore by Category
            </h1>
            <p className="text-xs sm:text-sm text-[#a39e93] mt-0.5">
              Tap a category card to view its most iconic masterworks
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#a39e93] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search iconic art, artists..."
              className="w-full pl-11 pr-9 py-2.5 rounded-full bg-[#16161d] border border-[#f4f1ea]/10 focus:border-[#e5b85b] text-xs sm:text-sm text-[#f4f1ea] placeholder-[#a39e93]/70 focus:outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a39e93] hover:text-[#f4f1ea] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 2. VISUAL CATEGORY CARDS (Replaces Text Tabbar — Each card uses the most popular art of that category!) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {/* Card 0: Top 8 Most Iconic Artworks */}
          <button
            onClick={() => {
              setSelectedCategory('featured-8');
              setQuery('');
            }}
            className={`group relative h-32 sm:h-36 rounded-2xl overflow-hidden text-left cursor-pointer transition-all border-2 ${
              selectedCategory === 'featured-8' && !query
                ? 'border-[#e5b85b] ring-2 ring-[#e5b85b]/35 scale-[1.02]'
                : 'border-[#f4f1ea]/10 hover:border-[#f4f1ea]/35 opacity-80 hover:opacity-100'
            }`}
          >
            <ArtworkImage
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg?width=960"
              alt="Top 8 Iconic"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/95 via-[#060608]/40 to-transparent" />

            {selectedCategory === 'featured-8' && !query && (
              <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#e5b85b] text-[#09090c] flex items-center justify-center shadow">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 p-3">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#e5b85b]">
                <Sparkles className="w-2.5 h-2.5" />
                Top 8
              </span>
              <p className="text-sm font-bold text-[#f4f1ea] leading-tight">
                Most Iconic
              </p>
            </div>
          </button>

          {/* Category Cards using the #1 Most Popular Artwork in Each Category */}
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id && !query;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setQuery('');
                }}
                className={`group relative h-32 sm:h-36 rounded-2xl overflow-hidden text-left cursor-pointer transition-all border-2 ${
                  isSelected
                    ? 'border-[#e5b85b] ring-2 ring-[#e5b85b]/35 scale-[1.02]'
                    : 'border-[#f4f1ea]/10 hover:border-[#f4f1ea]/35 opacity-80 hover:opacity-100'
                }`}
              >
                <ArtworkImage
                  src={category.coverImage}
                  alt={category.label}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/95 via-[#060608]/40 to-transparent" />

                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#e5b85b] text-[#09090c] flex items-center justify-center shadow">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-3">
                  <span className="block text-[10px] text-[#d5d0c5]/80 truncate">
                    {category.featuredArtworkTitle.split('·')[0]}
                  </span>
                  <p className="text-sm font-bold text-[#f4f1ea] leading-tight truncate">
                    {category.shortLabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. PINTEREST MASONRY GALLERY (Curated to at most 8 attention-pulling masterworks) */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between border-b border-[#f4f1ea]/10 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#f4f1ea] tracking-tight">
                {query
                  ? `Search Results for "${query}"`
                  : selectedCategory === 'featured-8'
                  ? '8 Most Iconic Masterworks in the World'
                  : activeCategoryMeta?.label}
              </h2>
              <p className="text-xs text-[#a39e93] mt-0.5">
                {selectedCategory === 'featured-8'
                  ? 'Handpicked world-famous works across paintings, sculpture, wonders and architecture'
                  : activeCategoryMeta?.description}
              </p>
            </div>
            <span className="text-xs font-semibold text-[#e5b85b] shrink-0">
              {displayedExhibits.length} {displayedExhibits.length === 1 ? 'Work' : 'Works'}
            </span>
          </div>

          {/* Pinterest Waterfall Columns Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {displayedExhibits.map((exhibit, idx) => (
              <ExhibitCard
                key={exhibit.id}
                exhibit={exhibit}
                masonryHeight={MASONRY_HEIGHTS[idx % MASONRY_HEIGHTS.length]}
                onSelect={onSelectExhibit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
