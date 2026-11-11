'use client';

import React, { useState } from 'react';
import {
  Camera,
  Disc3,
  ExternalLink,
  Eye,
  Info,
  Package,
  X,
} from 'lucide-react';
import { OFFICIAL_VI_ASSETS } from '@/lib/mods-repository';
import { LightboxState, transitionLightbox } from '@/lib/state-machines';
import { withBasePath } from '@/lib/utils';
import { useI18n } from './language-provider';
import { ContentLockerModal, StartGameModButton } from './content-locker-modal';

export function RockstarOfficialGallerySection() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    status: 'closed',
    activeShotId: null,
  });
  const [lockerOpen, setLockerOpen] = useState(false);

  const categories = [
    'All',
    'Vice Beach',
    'Vehicles',
    'Nightlife',
    'Protagonists',
    'Architecture',
    'Skyline',
    'Everglades',
  ];

  const screenshots = OFFICIAL_VI_ASSETS.screenshots4k;
  const filteredShots =
    selectedCategory === 'All'
      ? screenshots
      : screenshots.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const activeScreenshot =
    lightboxState.status === 'inspecting'
      ? screenshots.find((s) => s.id === lightboxState.activeShotId) || null
      : null;

  return (
    <section
      id="official-gallery"
      aria-labelledby="official-gallery-heading"
      className="py-14 px-6 lg:px-12 bg-[#0A0A0A] border-b border-[#262626]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Clean Hierarchy: Semantic Icon, Primary H1 Title, Concise 1-Line Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#262626]">
          <div>
            <Camera className="w-6 h-6 text-[#EAB308] mb-3" aria-hidden="true" />
            <h1
              id="official-gallery-heading"
              className="font-display text-4xl sm:text-6xl font-bold uppercase text-[#F5F5F5] tracking-tight"
            >
              {t('official.title')}
            </h1>
            <p className="text-sm text-neutral-300 max-w-2xl mt-2">
              {t('official.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <StartGameModButton
              size="sm"
              label="START THE GAME MOD"
              onClick={() => setLockerOpen(true)}
            />
            <a
              href="https://www.rockstargames.com/VI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase text-[#F5F5F5] bg-[#121212] border border-[#262626] hover:border-[#EAB308] whitespace-nowrap shrink-0"
            >
              <span>{t('official.visitSite')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#EAB308]" />
            </a>
          </div>
        </div>

        {/* Official Story Spotlight Box */}
        <div className="mb-12 bg-[#121212] border border-[#262626] grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#262626]">
            <div>
              <div className="text-xs font-mono uppercase text-[#EAB308] mb-2">
                {t('official.storyMeta')}
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-[#F5F5F5] leading-tight mb-4">
                {t('official.storyHeadline')}
              </h2>
              <p className="text-sm text-neutral-200 leading-relaxed bg-[#0A0A0A] p-4 border border-[#262626] mb-6">
                {t('official.storyQuote')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#262626] bg-[#0A0A0A] divide-y sm:divide-y-0 sm:divide-x divide-[#262626] text-xs font-mono">
              <div className="p-3 text-neutral-200">{t('official.protagonists')}</div>
              <div className="p-3 text-neutral-200">{t('official.platforms')}</div>
              <div className="p-3 text-[#EAB308]">{t('official.ps5Note')}</div>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-[#0A0A0A] flex flex-col justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath(OFFICIAL_VI_ASSETS.heroPoster)}
              alt="Grand Theft Auto VI Official Poster Lucia and Jason"
              className="w-full h-full object-cover object-top"
            />
            <div className="bg-[#0A0A0A] border-t border-[#262626] px-4 py-2.5 flex items-center justify-between text-xs font-mono">
              <span className="text-[#F5F5F5]">{t('official.posterCaption')}</span>
              <span className="text-[#EAB308]">KEY ART 01</span>
            </div>
          </div>
        </div>

        {/* 4K Screenshot Category Segmented Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#262626]">
          <div
            role="group"
            aria-label="Filter 4K screenshots by sector"
            className="flex flex-wrap items-center bg-[#121212] border border-[#262626]"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-mono uppercase border-r border-[#262626] last:border-r-0 cursor-pointer ${
                    active
                      ? 'bg-[#EAB308] text-[#0A0A0A] font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono tabular-nums uppercase">
            <Camera className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>
              {filteredShots.length} · {t('official.showingCaptures')}
            </span>
          </div>
        </div>

        {/* 4K Screenshots Brutalist Grid (Zero Hover Motion or Fade Gimmicks) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredShots.map((shot) => (
            <article
              key={shot.id}
              className="bg-[#121212] border border-[#262626] flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-[#0A0A0A] border-b border-[#262626]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBasePath(shot.url)}
                  alt={shot.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#0A0A0A] text-[#EAB308] border border-[#262626]">
                  3840x2160 UHD
                </div>
              </div>

              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-mono uppercase text-[#EAB308] mb-0.5">
                    {shot.category}
                  </div>
                  <h3 className="text-sm font-semibold text-[#F5F5F5] truncate">
                    {shot.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxState((prev) =>
                      transitionLightbox(prev, { type: 'OPEN_SHOT', shotId: shot.id })
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0A0A0A] border border-[#262626] hover:border-[#EAB308] text-xs font-mono uppercase text-[#F5F5F5] cursor-pointer shrink-0"
                  title={t('official.inspect4k')}
                >
                  <Eye className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>MASTER</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Official Game Editions & Pre-Order Packs Strip */}
        <div className="mb-12">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-[#262626]">
            <Package className="w-5 h-5 text-[#EAB308]" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F5F5F5] tracking-tight">
              {t('official.editionsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121212] border border-[#262626] flex flex-col justify-between">
              <div className="relative aspect-[16/10] bg-[#0A0A0A] border-b border-[#262626]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBasePath(OFFICIAL_VI_ASSETS.ultimateEdition)}
                  alt="GTA VI Ultimate Edition"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-mono uppercase text-[#EAB308] font-semibold">
                  {t('official.ultimateLabel')}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5F5] mt-1 mb-2">
                  {t('official.ultimateTitle')}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {t('official.ultimateDesc')}
                </p>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#262626] flex flex-col justify-between">
              <div className="relative aspect-[16/10] bg-[#0A0A0A] border-b border-[#262626]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBasePath(OFFICIAL_VI_ASSETS.vintagePack)}
                  alt="Vintage Vice City Pack Pre-order Bonus"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-mono uppercase text-[#EAB308] font-semibold">
                  {t('official.vintageLabel')}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5F5] mt-1 mb-2">
                  {t('official.vintageTitle')}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {t('official.vintageDesc')}
                </p>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#262626] flex flex-col justify-between">
              <div className="relative aspect-[16/10] bg-[#0A0A0A] border-b border-[#262626]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBasePath(OFFICIAL_VI_ASSETS.merchBox)}
                  alt="Collector's Box The Vice City Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="text-[11px] font-mono uppercase text-[#EAB308] font-semibold">
                  {t('official.merchLabel')}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5F5] mt-1 mb-2">
                  {t('official.merchTitle')}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {t('official.merchDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Music, Soundtrack & Radio Stations Card */}
        <div className="bg-[#121212] border border-[#262626] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#0A0A0A] border border-[#262626] text-[#EAB308] shrink-0">
              <Disc3 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-[#EAB308] mb-1">
                {t('official.audioLabel')}
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5F5] mb-2">
                {t('official.audioTitle')}
              </h3>
              <p className="text-xs text-neutral-300 max-w-xl leading-relaxed">
                {t('official.audioDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://www.rockstargames.com/VI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-mono uppercase text-[#F5F5F5] bg-[#0A0A0A] hover:border-[#EAB308] border border-[#262626] whitespace-nowrap"
            >
              {t('official.audioCta')}
            </a>
          </div>
        </div>

        {/* Copyright Note */}
        <div className="mt-8 flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Info className="w-4 h-4 text-[#EAB308] shrink-0" />
          <span>{t('official.copyrightNote')}</span>
        </div>
      </div>

      {/* Fullscreen 4K Lightbox Modal (Zero Rounded Corners or Drop Shadows) */}
      {activeScreenshot && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col justify-between p-4 sm:p-8"
        >
          <div className="flex items-center justify-between text-[#F5F5F5] pb-3 border-b border-[#262626]">
            <div>
              <span className="text-xs font-mono uppercase text-[#EAB308] mr-2">
                {activeScreenshot.category}
              </span>
              <span className="text-sm font-semibold">{activeScreenshot.title}</span>
              <span className="text-xs text-neutral-400 ml-3 font-mono">
                3840x2160 UHD
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                setLightboxState((prev) => transitionLightbox(prev, { type: 'CLOSE_SHOT' }))
              }
              className="p-2 bg-[#121212] border border-[#262626] hover:border-[#EAB308] text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4 overflow-hidden bg-[#0A0A0A] border border-[#262626]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath(activeScreenshot.url)}
              alt={activeScreenshot.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400 pt-3 border-t border-[#262626]">
            <span className="font-mono">{activeScreenshot.url}</span>
            <button
              type="button"
              onClick={() =>
                setLightboxState((prev) => transitionLightbox(prev, { type: 'CLOSE_SHOT' }))
              }
              className="px-4 py-1.5 bg-[#EAB308] text-[#0A0A0A] font-mono uppercase font-semibold cursor-pointer"
            >
              {t('official.closeLightbox')}
            </button>
          </div>
        </div>
      )}

      <ContentLockerModal
        isOpen={lockerOpen}
        onClose={() => setLockerOpen(false)}
        packageTitle="GTA VI — 4K UHD TEXTURE & SHADER MOD"
      />
    </section>
  );
}