import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { EXHIBITS, getExhibitById, getFeaturedExhibit } from '../data/exhibits';
import type { Exhibit } from '../types/exhibit';
import {
  MuseumNavbar,
  type MuseumViewMode,
} from '../components/navigation/MuseumNavbar';
import { SearchModal } from '../components/navigation/SearchModal';
import { LivingStageView } from '../components/museum/LivingStageView';
import { FannedDeckView } from '../components/museum/FannedDeckView';
import { BentoCollectionView } from '../components/museum/BentoCollectionView';
import { OnboardingModal } from '../components/shared/OnboardingModal';

export const Home: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const initialExhibit = (id && getExhibitById(id)) || getFeaturedExhibit();
  const [activeExhibit, setActiveExhibit] = useState<Exhibit>(initialExhibit);
  const [viewMode, setViewMode] = useState<MuseumViewMode>('stage');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('musea_onboarded') !== 'true';
    } catch {
      return true;
    }
  });

  // Sync URL param if user navigates directly to /exhibit/:id
  useEffect(() => {
    if (id) {
      const found = getExhibitById(id);
      if (found) {
        setActiveExhibit(found);
        setViewMode('stage');
      }
    }
  }, [id]);

  const handleSelectExhibit = (exhibit: Exhibit) => {
    setActiveExhibit(exhibit);
    setViewMode('stage');
    navigate(`/exhibit/${exhibit.id}`, { replace: true });
  };

  const handleShuffleExhibit = () => {
    const candidates = EXHIBITS.filter((e) => e.id !== activeExhibit.id);
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    handleSelectExhibit(chosen);
  };

  return (
    <div
      className="relative w-screen h-dvh overflow-hidden text-[#f4f1ea] select-none"
      style={{ backgroundColor: activeExhibit.atmosphere.bgPrimary }}
    >
      {/* Floating App-Like Glass Navigation Bar */}
      <MuseumNavbar
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onShuffleExhibit={handleShuffleExhibit}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      {/* Welcome Onboarding Experience Matching Ref #1 & #2 */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* Instant Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSelectExhibit={handleSelectExhibit}
      />

      {/* Unified 100dvh Viewport Experience (Zero Page-Scrolling Fatigue) */}
      <AnimatePresence mode="wait">
        {viewMode === 'stage' && (
          <motion.div
            key="view-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full"
          >
            <LivingStageView
              exhibit={activeExhibit}
              onSelectExhibit={handleSelectExhibit}
              onOpenCollection={() => setViewMode('collection')}
            />
          </motion.div>
        )}

        {viewMode === 'deck' && (
          <motion.div
            key="view-deck"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full"
          >
            <FannedDeckView
              activeExhibit={activeExhibit}
              onSelectExhibit={handleSelectExhibit}
            />
          </motion.div>
        )}

        {viewMode === 'collection' && (
          <motion.div
            key="view-collection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full"
          >
            <BentoCollectionView onSelectExhibit={handleSelectExhibit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
