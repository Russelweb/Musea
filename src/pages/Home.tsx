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
import { MuseaLoader } from '../components/shared/MuseaLoader';

export const Home: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const initialExhibit = (id && getExhibitById(id)) || getFeaturedExhibit();
  const [activeExhibit, setActiveExhibit] = useState<Exhibit>(initialExhibit);
  // 3D Hall is the default Museum Homepage; Exhibit opens when exploring a portrait in detail (or via direct /exhibit/:id URL)
  const [viewMode, setViewMode] = useState<MuseumViewMode>(id ? 'stage' : 'deck');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('musea_onboarded') !== 'true';
    } catch {
      return true;
    }
  });

  // Brief opening brush-stroke splash while fonts & initial scene settle
  useEffect(() => {
    const timer = window.setTimeout(() => setIsInitialLoading(false), 1350);
    return () => window.clearTimeout(timer);
  }, []);

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

  const handleChangeViewMode = (mode: MuseumViewMode) => {
    setViewMode(mode);
    if (mode === 'deck' && id) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div
      className="relative w-screen h-dvh overflow-hidden text-[#f4f1ea]"
      style={{ backgroundColor: activeExhibit.atmosphere.bgPrimary }}
    >
      {/* Opening Paintbrush Loading Screen */}
      <AnimatePresence>
        {isInitialLoading && (
          <MuseaLoader variant="fullscreen" label="Opening Musea" />
        )}
      </AnimatePresence>

      {/* Floating App-Like Glass Navigation Bar */}
      <MuseumNavbar
        viewMode={viewMode}
        onChangeViewMode={handleChangeViewMode}
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

      {/* Unified 100dvh Viewport Experience Inside Semantic <main> Landmark */}
      <main id="museum-main" className="w-full h-full">
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
      </main>
    </div>
  );
};
