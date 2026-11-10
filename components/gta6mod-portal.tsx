'use client';

import React, { useState } from 'react';
import {
  INITIAL_CREDITS,
  INITIAL_MODS,
  buildDynamicModAndSitemapObjects,
} from '@/lib/mods-repository';
import { generateCatalogSitemapEntries } from '@/lib/sitemap-service';
import {
  CreatorCredit,
  ModItem,
  ModSubmissionInput,
  SitemapUrlEntry,
} from '@/lib/types';
import { PortalViewState, transitionPortalView } from '@/lib/state-machines';
import { ActiveSectionView, HeroSection } from './hero-section';
import { ModsDirectorySection } from './mods-directory-section';
import { RockstarOfficialGallerySection } from './rockstar-official-gallery-section';
import { GameplayYoutubeSection } from './gameplay-youtube-section';
import { CreditsAndSitemapSection } from './credits-and-sitemap-section';

export function Gta6modPortal() {
  const [viewState, setViewState] = useState<PortalViewState>({
    status: 'viewing_all',
    activeView: 'all',
  });
  const [mods, setMods] = useState<ModItem[]>(INITIAL_MODS);
  const [queuedModIds, setQueuedModIds] = useState<string[]>([
    'mod-vice-rtgi-ultra',
  ]);
  const [credits, setCredits] = useState<CreatorCredit[]>(INITIAL_CREDITS);
  const [sitemapEntries, setSitemapEntries] = useState<SitemapUrlEntry[]>(() =>
    generateCatalogSitemapEntries('https://gta6mod.github.io/Gta6mod', 2500)
  );

  const handleSelectView = (view: ActiveSectionView, targetId?: string) => {
    setViewState((prev) =>
      transitionPortalView(prev, { type: 'SELECT_VIEW', view, targetId })
    );
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 40);
    }
  };

  const handleToggleQueueMod = (modId: string) => {
    setQueuedModIds((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  const handleAddModAndCredit = async (input: ModSubmissionInput) => {
    const { mod, credit, sitemapEntry } = buildDynamicModAndSitemapObjects(
      input,
      'https://gta6mod.github.io/Gta6mod'
    );

    setMods((prev) => [mod, ...prev.filter((m) => m.slug !== mod.slug)]);
    setCredits((prev) => [credit, ...prev.filter((c) => c.id !== credit.id)]);
    setSitemapEntries((prev) => [
      sitemapEntry,
      ...prev.filter((e) => e.path !== sitemapEntry.path),
    ]);

    try {
      await fetch('/api/mods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
    } catch {
      // Optimistic client state is already updated
    }
  };

  const activeView = viewState.activeView;
  const showMods = activeView === 'all' || activeView === 'mods';
  const showOfficial = activeView === 'all' || activeView === 'official';
  const showGameplay = activeView === 'all' || activeView === 'gameplay';
  const showCredits = activeView === 'all' || activeView === 'credits';
  const showSitemap = activeView === 'all' || activeView === 'sitemap';

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <HeroSection
        totalIndexedUrls={sitemapEntries.length}
        totalModsCount={mods.length}
        activeView={activeView}
        onSelectView={handleSelectView}
      />

      {showOfficial && <RockstarOfficialGallerySection />}

      {showMods && (
        <ModsDirectorySection
          mods={mods}
          queuedModIds={queuedModIds}
          onToggleQueueMod={handleToggleQueueMod}
          onJumpToCredits={() => handleSelectView('all', 'credits')}
        />
      )}

      {showGameplay && <GameplayYoutubeSection />}

      <CreditsAndSitemapSection
        credits={credits}
        sitemapEntries={sitemapEntries}
        onAddModAndCredit={handleAddModAndCredit}
        showCredits={showCredits}
        showSitemap={showSitemap}
        onJumpToMods={() => handleSelectView('all', 'mods')}
      />
    </main>
  );
}
