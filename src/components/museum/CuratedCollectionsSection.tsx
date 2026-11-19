import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Quote } from 'lucide-react';
import { CURATED_COLLECTIONS, getExhibitById } from '../../data/exhibits';
import { ArtworkImage } from '../shared/ArtworkImage';

export const CuratedCollectionsSection: React.FC = () => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>(
    CURATED_COLLECTIONS[0].id
  );

  const activeCollection =
    CURATED_COLLECTIONS.find((c) => c.id === selectedCollectionId) ||
    CURATED_COLLECTIONS[0];

  const activeExhibits = activeCollection.exhibitIds
    .map((id) => getExhibitById(id))
    .filter(Boolean);

  return (
    <section className="py-16 sm:py-24 border-b border-[#f4f1ea]/8 bg-[#0c0c0f]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c9a96e] mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Curated Exhibitions</span>
            </div>
            <h2 className="font-serif-museum text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4f1ea]">
              Themed Gallery Wings
            </h2>
          </div>
          <p className="text-sm text-[#a39e93] max-w-md font-light">
            Select a curated exhibition below to explore connected masterpieces, monuments and stories gathered around a single theme.
          </p>
        </div>

        {/* Collection Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10">
          {CURATED_COLLECTIONS.map((collection) => {
            const isSelected = collection.id === activeCollection.id;
            return (
              <button
                key={collection.id}
                onClick={() => setSelectedCollectionId(collection.id)}
                className={`group relative rounded-xl overflow-hidden text-left transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'border-[#c9a96e] ring-1 ring-[#c9a96e]/40 bg-[#17171d]'
                    : 'border-[#f4f1ea]/10 hover:border-[#f4f1ea]/25 bg-[#121216]'
                }`}
              >
                <div className="relative h-32 w-full overflow-hidden">
                  <ArtworkImage
                    src={collection.coverImage}
                    alt={collection.title}
                    containerClassName="w-full h-full"
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isSelected ? 'scale-105' : 'group-hover:scale-105 opacity-75'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-[#0c0c10]/45 to-transparent" />
                  <span className="absolute top-2.5 left-3 text-[9px] uppercase tracking-[0.2em] text-[#e5c78f] bg-[#0a0a0c]/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#c9a96e]/30">
                    {collection.exhibitIds.length} Exhibits
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#a39e93] mb-1">
                    {collection.subtitle}
                  </p>
                  <h3
                    className={`font-serif-museum text-lg leading-snug transition-colors ${
                      isSelected ? 'text-[#e5c78f]' : 'text-[#f4f1ea] group-hover:text-[#e5c78f]'
                    }`}
                  >
                    {collection.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Curated Wing Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCollection.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl bg-[#121217] border border-[#f4f1ea]/10 p-6 sm:p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Curator's Plaque */}
              <div className="lg:col-span-4 space-y-4">
                <span className="inline-block text-[10px] uppercase tracking-[0.24em] text-[#c9a96e] px-3 py-1 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/30">
                  {activeCollection.subtitle}
                </span>
                <h3 className="font-serif-museum text-3xl sm:text-4xl text-[#f4f1ea] leading-tight">
                  {activeCollection.title}
                </h3>
                <p className="text-sm text-[#d5d0c5] leading-relaxed font-light">
                  {activeCollection.description}
                </p>
                <div className="p-4 rounded-xl bg-[#0c0c10] border border-[#f4f1ea]/8">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] mb-1.5">
                    <Quote className="w-3.5 h-3.5" />
                    <span>Curator’s Note</span>
                  </div>
                  <p className="font-serif-museum italic text-base text-[#d5d0c5] leading-relaxed">
                    "{activeCollection.curatorNote}"
                  </p>
                </div>
              </div>

              {/* Exhibits inside this Curated Wing */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeExhibits.map((exhibit) => {
                  if (!exhibit) return null;
                  return (
                    <Link
                      key={exhibit.id}
                      to={`/exhibit/${exhibit.id}`}
                      className="group flex flex-col rounded-xl overflow-hidden bg-[#0c0c10] border border-[#f4f1ea]/8 hover:border-[#c9a96e]/40 transition-all"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <ArtworkImage
                          src={exhibit.images.main}
                          alt={exhibit.title}
                          accentColor={exhibit.atmosphere.accent}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0d]/80 via-transparent to-transparent" />
                        <span className="absolute bottom-2.5 left-3 text-[10px] uppercase tracking-[0.18em] text-[#e5c78f]">
                          {exhibit.categoryLabel}
                        </span>
                      </div>
                      <div className="p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="font-serif-museum text-xl text-[#f4f1ea] group-hover:text-[#e5c78f] transition-colors truncate">
                            {exhibit.title}
                          </h4>
                          <p className="text-xs text-[#a39e93] truncate">
                            {exhibit.creator} · {exhibit.date}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#a39e93] group-hover:text-[#c9a96e] group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
