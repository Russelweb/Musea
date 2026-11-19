import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/exhibits';
import type { ExhibitCategory } from '../../types/exhibit';

interface MuseumFooterProps {
  onSelectCategory?: (category: ExhibitCategory | 'all') => void;
}

export const MuseumFooter: React.FC<MuseumFooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="border-t border-[#f4f1ea]/10 bg-[#070709] text-[#a39e93]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#f4f1ea]/8">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="font-serif-museum text-2xl font-semibold tracking-[0.22em] text-[#f4f1ea]">
                MUSEA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
            </Link>
            <p className="font-serif-museum italic text-xl text-[#d5d0c5] max-w-md">
              "See something fascinating. Discover its story. Understand its significance."
            </p>
            <p className="text-xs leading-relaxed text-[#8c877d] max-w-sm">
              A digital discovery museum dedicated to presenting humanity’s greatest paintings, sculptures, monuments, architecture, books and historical artefacts with clarity and reverence.
            </p>
          </div>

          {/* Wings Directory */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#c9a96e]">
              Permanent Gallery Wings
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/?category=${cat.id}`}
                    onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                    className="hover:text-[#f4f1ea] transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cultural Repositories & Open Access Attribution */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.22em] text-[#c9a96e]">
              Open-Access Archives
            </h4>
            <p className="text-xs leading-relaxed text-[#8c877d]">
              Imagery and historical provenance curated from Open-Access museum collections including The Metropolitan Museum of Art, MoMA, Musée du Louvre, Mauritshuis, The British Museum and Wikimedia Commons.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[#78746c]">
          <span>MUSEA · Digital Discovery Museum · Version 1.0</span>
          <span>Open Cultural Heritage · Public Domain & Licensed Archives</span>
        </div>
      </div>
    </footer>
  );
};
