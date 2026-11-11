'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  ExternalLink,
  Eye,
  FileCode,
  Layers,
  Play,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { INITIAL_MODS, MOD_CATEGORIES, filterAndSortMods } from '@/lib/mods-repository';
import { DirectoryFilterState, transitionDirectoryFilter } from '@/lib/state-machines';
import { ModItem } from '@/lib/types';
import { useI18n } from './language-provider';
import { ViceArtworkCanvas } from './vice-artwork-canvas';
import { ContentLockerModal, StartGameModButton } from './content-locker-modal';

interface ModsDirectorySectionProps {
  mods?: ModItem[];
  queuedModIds?: string[];
  onToggleQueueMod?: (modId: string) => void;
  onJumpToCredits?: () => void;
}

export function ModsDirectorySection({
  mods = INITIAL_MODS,
  queuedModIds: externalQueuedIds,
  onToggleQueueMod: externalToggleQueue,
}: ModsDirectorySectionProps) {
  const { t } = useI18n();
  const [internalQueuedIds, setInternalQueuedIds] = useState<string[]>(['mod-vice-rtgi-ultra']);
  const [lockerTargetTitle, setLockerTargetTitle] = useState<string | null>(null);

  const queuedModIds = externalQueuedIds ?? internalQueuedIds;
  const handleToggleQueue = (modId: string) => {
    if (externalToggleQueue) {
      externalToggleQueue(modId);
    } else {
      setInternalQueuedIds((prev) =>
        prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
      );
    }
  };

  const [filterState, setFilterState] = useState<DirectoryFilterState>({
    category: 'all',
    searchQuery: '',
    sortBy: 'downloads',
    inspectedModId: mods[0]?.id || '',
  });

  const filteredMods = filterAndSortMods(mods, {
    category: filterState.category,
    searchQuery: filterState.searchQuery,
    sortBy: filterState.sortBy,
  });

  const inspectedMod =
    mods.find((m) => m.id === filterState.inspectedModId) || filteredMods[0] || mods[0];

  return (
    <section
      id="mods"
      aria-labelledby="mods-heading"
      className="py-14 px-6 lg:px-12 bg-[#0A0A0A] border-b border-[#262626]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Clean Hierarchy: Semantic Icon, Primary H1 Title, Concise 1-Line Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#262626]">
          <div>
            <Layers className="w-6 h-6 text-[#EAB308] mb-3" aria-hidden="true" />
            <h1
              id="mods-heading"
              className="font-display text-4xl sm:text-6xl font-bold uppercase text-[#F5F5F5] tracking-tight"
            >
              {t('mods.title')}
            </h1>
            <p className="text-sm text-neutral-300 max-w-2xl mt-2">
              {t('mods.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/credits"
              className="px-4 py-2.5 text-xs font-mono uppercase text-[#EAB308] bg-[#121212] hover:border-[#EAB308] border border-[#262626] whitespace-nowrap"
            >
              {t('mods.viewCredits')} →
            </Link>
          </div>
        </div>

        {/* Interactive Filter Controls Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#262626]">
          <div
            role="group"
            aria-label="Filter mods by category"
            className="flex flex-wrap items-center border border-[#262626] bg-[#121212]"
          >
            {MOD_CATEGORIES.map((cat) => {
              const active = filterState.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setFilterState((prev) =>
                      transitionDirectoryFilter(prev, { type: 'SET_CATEGORY', category: cat.id })
                    )
                  }
                  className={`px-3.5 py-2 text-xs font-mono uppercase border-r border-[#262626] last:border-r-0 whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#EAB308] text-[#0A0A0A] font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <label htmlFor="mod-search-input" className="sr-only">
                Search Mods by title, author, or shader
              </label>
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="mod-search-input"
                type="search"
                value={filterState.searchQuery}
                onChange={(e) =>
                  setFilterState((prev) =>
                    transitionDirectoryFilter(prev, { type: 'SET_QUERY', query: e.target.value })
                  )
                }
                placeholder={t('mods.searchPlaceholder')}
                className="w-full pl-9 pr-3 py-2 text-xs font-mono text-[#F5F5F5] bg-[#121212] border border-[#262626] placeholder:text-neutral-500 focus:outline-none focus:border-[#EAB308]"
              />
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-neutral-400 shrink-0" />
              <label htmlFor="mod-sort-select" className="text-xs text-neutral-300 whitespace-nowrap font-mono uppercase">
                {t('mods.sortBy')}
              </label>
              <select
                id="mod-sort-select"
                value={filterState.sortBy}
                onChange={(e) =>
                  setFilterState((prev) =>
                    transitionDirectoryFilter(prev, {
                      type: 'SET_SORT',
                      sortBy: e.target.value as 'downloads' | 'rating' | 'newest',
                    })
                  )
                }
                className="px-3 py-2 text-xs font-mono text-[#F5F5F5] bg-[#121212] border border-[#262626] focus:outline-none focus:border-[#EAB308]"
              >
                <option value="downloads">{t('mods.sortDownloads')}</option>
                <option value="rating">{t('mods.sortRating')}</option>
                <option value="newest">{t('mods.sortNewest')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Inspector Spotlight with Animated "START THE GAME MOD" Trigger */}
        {inspectedMod && (
          <div
            aria-label="Selected Mod Technical Specification"
            className="mb-10 bg-[#121212] border border-[#262626] grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-5 relative min-h-[260px] border-b lg:border-b-0 lg:border-r border-[#262626]">
              <ViceArtworkCanvas
                theme={inspectedMod.artworkTheme}
                imageUrl={inspectedMod.imageUrl}
                className="w-full h-full object-cover"
                label={inspectedMod.title}
              />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-neutral-200 font-mono tabular-nums bg-[#0A0A0A] px-3 py-2 border border-[#262626] flex items-center justify-between">
                <span className="truncate">
                  /mods/{inspectedMod.category}/{inspectedMod.slug}
                </span>
                <Link
                  href={`/mods/${inspectedMod.category}/${inspectedMod.slug}`}
                  className="text-[#EAB308] hover:underline ml-2 shrink-0"
                >
                  ROUTE →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#EAB308] font-mono tabular-nums mb-2">
                  <span>{inspectedMod.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{inspectedMod.version}</span>
                  <span aria-hidden="true">·</span>
                  <span>BY {inspectedMod.authorHandle}</span>
                  <span aria-hidden="true">·</span>
                  <span>{inspectedMod.fileSizeMb} MB</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white mb-3">
                  {inspectedMod.title}
                </h2>

                <p className="text-sm text-neutral-200 leading-relaxed mb-5">
                  {inspectedMod.summary}
                </p>

                <div className="space-y-1.5 mb-6 p-4 bg-[#0A0A0A] border border-[#262626]">
                  <div className="text-xs font-mono uppercase text-[#EAB308]">
                    {t('mods.techNotes')} ({inspectedMod.compatibility}):
                  </div>
                  <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside font-mono">
                    {inspectedMod.technicalNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-[#262626]">
                <StartGameModButton
                  size="lg"
                  label="START THE GAME MOD"
                  onClick={() =>
                    setLockerTargetTitle(`${inspectedMod.title} (${inspectedMod.version})`)
                  }
                />

                <div className="flex items-center gap-2">
                  <Link
                    href={`/mods/${inspectedMod.category}/${inspectedMod.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono uppercase text-[#F5F5F5] bg-[#0A0A0A] hover:border-[#EAB308] border border-[#262626] whitespace-nowrap"
                  >
                    <span>{t('mods.dedicatedPage')}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#EAB308]" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleToggleQueue(inspectedMod.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono uppercase whitespace-nowrap cursor-pointer border ${
                      queuedModIds.includes(inspectedMod.id)
                        ? 'bg-[#0A0A0A] text-[#EAB308] border-[#EAB308]'
                        : 'bg-[#0A0A0A] text-neutral-300 border-[#262626] hover:border-[#EAB308]'
                    }`}
                  >
                    {queuedModIds.includes(inspectedMod.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>QUEUED ({queuedModIds.length})</span>
                      </>
                    ) : (
                      <span>{t('mods.queueAction')}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filtered Mods Brutalist Grid */}
        {filteredMods.length === 0 ? (
          <div className="bg-[#121212] border border-[#262626] p-10 text-center">
            <p className="text-sm font-mono text-[#F5F5F5] mb-4">
              {t('mods.emptyState')}
            </p>
            <button
              type="button"
              onClick={() =>
                setFilterState((prev) =>
                  transitionDirectoryFilter(prev, {
                    type: 'RESET_FILTERS',
                    defaultModId: mods[0]?.id || '',
                  })
                )
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold uppercase text-[#0A0A0A] bg-[#EAB308] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t('mods.resetFilters')}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMods.map((mod) => {
              const isInspected = inspectedMod?.id === mod.id;

              return (
                <article
                  key={mod.id}
                  className={`bg-[#121212] border flex flex-col justify-between ${
                    isInspected
                      ? 'border-[#EAB308]'
                      : 'border-[#262626]'
                  }`}
                >
                  <div>
                    <div className="h-48 relative border-b border-[#262626]">
                      <ViceArtworkCanvas
                        theme={mod.artworkTheme}
                        imageUrl={mod.imageUrl}
                        className="w-full h-full"
                        label={mod.title}
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0A0A0A] border border-[#262626] font-mono text-[11px] text-[#EAB308]">
                        {mod.categoryLabel} · {mod.version}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-display text-2xl font-bold uppercase text-white mb-2 leading-tight">
                        <Link
                          href={`/mods/${mod.category}/${mod.slug}`}
                          className="hover:text-[#EAB308]"
                        >
                          {mod.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-neutral-300 leading-relaxed mb-4 line-clamp-2">
                        {mod.summary}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-3 border-t border-[#262626]">
                        <span>{mod.authorHandle}</span>
                        <span>
                          {(mod.downloadsCount / 1000).toFixed(1)}K DLS · {mod.fileSizeMb} MB
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0A0A0A] border-t border-[#262626] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFilterState((prev) =>
                          transitionDirectoryFilter(prev, { type: 'INSPECT_MOD', modId: mod.id })
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase text-neutral-200 bg-[#121212] border border-[#262626] hover:border-[#EAB308] cursor-pointer shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#EAB308]" />
                      <span>{t('mods.inspect')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLockerTargetTitle(`${mod.title} (${mod.version})`)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-display font-bold uppercase tracking-wider text-[#0A0A0A] bg-[#EAB308] cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>START THE GAME MOD</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <ContentLockerModal
        isOpen={Boolean(lockerTargetTitle)}
        onClose={() => setLockerTargetTitle(null)}
        packageTitle={lockerTargetTitle || 'GTA VI — MOD PACKAGE'}
      />
    </section>
  );
}

export function ModDetailLockerActions({
  modTitle,
  modVersion,
  authorHandle,
}: {
  modTitle: string;
  modVersion: string;
  authorHandle: string;
}) {
  const [lockerOpen, setLockerOpen] = useState(false);

  return (
    <>
      <div className="pt-6 border-t border-[#262626] flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <StartGameModButton
            size="lg"
            label="START THE GAME MOD"
            onClick={() => setLockerOpen(true)}
          />

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono uppercase text-neutral-200 bg-[#0A0A0A] border border-[#262626] hover:border-[#EAB308]"
          >
            <FileCode className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>VERIFY IN SITEMAP.XML</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-3 border-t border-[#262626]">
          <Link href="/credits" className="text-[#EAB308] hover:underline">
            ATTRIBUTION LEDGER ({authorHandle}) →
          </Link>
          <Link href="/mods" className="text-[#F5F5F5] hover:underline">
            ALL MOD PACKAGES →
          </Link>
        </div>
      </div>

      <ContentLockerModal
        isOpen={lockerOpen}
        onClose={() => setLockerOpen(false)}
        packageTitle={`${modTitle} (${modVersion})`}
      />
    </>
  );
}