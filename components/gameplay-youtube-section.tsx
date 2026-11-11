'use client';

import React, { useState } from 'react';
import { ExternalLink, Film, Play, ShieldAlert, Tv, Video } from 'lucide-react';
import { YOUTUBE_GAMEPLAY_VIDEOS } from '@/lib/mods-repository';
import { VideoTheaterState, transitionVideoTheater } from '@/lib/state-machines';
import { useI18n } from './language-provider';
import { ViceArtworkCanvas } from './vice-artwork-canvas';
import { ContentLockerModal, StartGameModButton } from './content-locker-modal';

const ANGLED_MOD_SLICES = [
  {
    id: 'slice-1',
    title: 'Ocean Drive RTGI',
    subtitle: 'Volumetric Neon & Wet Asphalt',
    theme: 'ocean-drive' as const,
    metric: '4K LUTs',
  },
  {
    id: 'slice-2',
    title: 'Vice Beach Crowd & Cloth',
    subtitle: 'Physics-Driven Streetwear',
    theme: 'vice-beach' as const,
    metric: '80+ Outfits',
  },
  {
    id: 'slice-3',
    title: '1986 Widebody Customs',
    subtitle: 'Twin-Turbo Wedge Supercars',
    theme: 'muscle-car' as const,
    metric: '140k Poly',
  },
  {
    id: 'slice-4',
    title: 'Starfish Island Estates',
    subtitle: 'Open-Interior Mansions & Docks',
    theme: 'penthouse' as const,
    metric: 'Zero-Load MLO',
  },
  {
    id: 'slice-5',
    title: 'Grassrivers Hydro Hook',
    subtitle: 'Airboat Thrust & Swamp Physics',
    theme: 'everglades' as const,
    metric: 'C# ScriptHook',
  },
];

export function GameplayYoutubeSection() {
  const { t } = useI18n();
  const [theaterState, setTheaterState] = useState<VideoTheaterState>({
    mode: 'interactive-preview',
    activeVideoId: YOUTUBE_GAMEPLAY_VIDEOS[0].id,
    selectedHighlightIdx: 0,
  });
  const [lockerOpen, setLockerOpen] = useState(false);

  const activeVideo =
    YOUTUBE_GAMEPLAY_VIDEOS.find((v) => v.id === theaterState.activeVideoId) ||
    YOUTUBE_GAMEPLAY_VIDEOS[0];

  return (
    <section
      id="gameplay"
      aria-labelledby="gameplay-heading"
      className="py-14 px-6 lg:px-12 bg-[#0A0A0A] border-b border-[#262626]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Clean Hierarchy: Semantic Icon, Primary H1 Title, Concise 1-Line Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#262626]">
          <div>
            <Film className="w-6 h-6 text-[#EAB308] mb-3" aria-hidden="true" />
            <h1
              id="gameplay-heading"
              className="font-display text-4xl sm:text-6xl font-bold uppercase text-[#F5F5F5] tracking-tight"
            >
              {t('gameplay.title')}
            </h1>
            <p className="text-sm text-neutral-300 max-w-2xl mt-2">
              {t('gameplay.subtitle')}
            </p>
          </div>

          <div className="shrink-0">
            <StartGameModButton
              size="sm"
              label="START THE GAME MOD"
              onClick={() => setLockerOpen(true)}
            />
          </div>
        </div>

        {/* Video Switcher Tabs */}
        <div
          role="group"
          aria-label="Select YouTube gameplay video"
          className="grid grid-cols-1 md:grid-cols-3 border border-[#262626] bg-[#121212] divide-y md:divide-y-0 md:divide-x divide-[#262626] mb-8"
        >
          {YOUTUBE_GAMEPLAY_VIDEOS.map((video, idx) => {
            const isSelected = video.id === activeVideo.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() =>
                  setTheaterState((prev) =>
                    transitionVideoTheater(prev, { type: 'SELECT_VIDEO', videoId: video.id })
                  )
                }
                className={`text-left p-5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#EAB308] text-[#0A0A0A]'
                    : 'bg-[#121212] text-[#F5F5F5] hover:bg-[#0A0A0A]'
                }`}
              >
                <div
                  className={`flex items-center justify-between text-xs font-mono tabular-nums uppercase mb-1.5 ${
                    isSelected ? 'text-[#0A0A0A] font-semibold' : 'text-[#EAB308]'
                  }`}
                >
                  <span>
                    0{idx + 1} {'//'} {video.category}
                  </span>
                  <span>{video.duration}</span>
                </div>
                <div className="font-display text-xl font-bold uppercase line-clamp-1 mb-1">
                  {video.title}
                </div>
                <div
                  className={`text-xs font-mono ${
                    isSelected ? 'text-[#0A0A0A]/80' : 'text-neutral-400'
                  }`}
                >
                  {video.channelName} · {video.viewsLabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Split Theater */}
        <div className="bg-[#121212] border border-[#262626] grid grid-cols-1 lg:grid-cols-12 mb-14">
          {/* Left 7 Columns: Video Viewport */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#262626]">
            <div className="relative overflow-hidden bg-[#0A0A0A] aspect-video border border-[#262626]">
              {theaterState.mode === 'youtube-iframe' ? (
                <iframe
                  title={activeVideo.title}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full">
                  <ViceArtworkCanvas
                    theme={
                      activeVideo.id === 'yt-rockstar-trailer-1'
                        ? 'hero-vista'
                        : activeVideo.id === 'yt-vice-graphics-concept'
                        ? 'neon-skyline'
                        : 'ocean-drive'
                    }
                    className="w-full h-full"
                    label={activeVideo.title}
                  />
                  <div className="absolute inset-0 bg-black/55 flex flex-col justify-between p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono tabular-nums text-[#EAB308] bg-[#0A0A0A] px-3 py-1.5 border border-[#262626]">
                        ID: {activeVideo.youtubeId} · {activeVideo.duration}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setTheaterState((prev) =>
                            transitionVideoTheater(prev, {
                              type: 'SET_MODE',
                              mode: 'youtube-iframe',
                            })
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase font-semibold text-[#0A0A0A] bg-[#EAB308] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{t('gameplay.loadEmbed')}</span>
                      </button>
                    </div>

                    <div className="bg-[#0A0A0A] border border-[#262626] p-4">
                      <div className="text-xs text-[#EAB308] font-mono tabular-nums uppercase mb-1">
                        {t('gameplay.activeHighlight')} #{theaterState.selectedHighlightIdx + 1}:
                      </div>
                      <div className="text-sm font-mono text-[#F5F5F5]">
                        {activeVideo.highlights[theaterState.selectedHighlightIdx]}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Player Mode Controls */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#262626]">
              <div className="flex items-center border border-[#262626] bg-[#0A0A0A]">
                <button
                  type="button"
                  onClick={() =>
                    setTheaterState((prev) =>
                      transitionVideoTheater(prev, {
                        type: 'SET_MODE',
                        mode: 'interactive-preview',
                      })
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase border-r border-[#262626] whitespace-nowrap cursor-pointer ${
                    theaterState.mode === 'interactive-preview'
                      ? 'bg-[#EAB308] text-[#0A0A0A] font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>{t('gameplay.frameCanvas')}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTheaterState((prev) =>
                      transitionVideoTheater(prev, {
                        type: 'SET_MODE',
                        mode: 'youtube-iframe',
                      })
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase whitespace-nowrap cursor-pointer ${
                    theaterState.mode === 'youtube-iframe'
                      ? 'bg-[#EAB308] text-[#0A0A0A] font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{t('gameplay.iframePlayer')}</span>
                </button>
              </div>

              <a
                href={activeVideo.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#EAB308] hover:underline whitespace-nowrap shrink-0"
              >
                <span>
                  {t('gameplay.openYoutube')} ({activeVideo.viewsLabel})
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right 5 Columns: Breakdown Details & Non-Affiliation Disclaimer */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#EAB308] font-mono tabular-nums uppercase mb-2">
                <span>{activeVideo.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeVideo.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span>{activeVideo.duration}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mb-3">
                {activeVideo.title}
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                {activeVideo.summary}
              </p>

              <div className="mb-6">
                <div className="text-xs font-mono uppercase text-[#EAB308] mb-2.5">
                  {t('gameplay.timestampsTitle')}:
                </div>
                <div className="space-y-2">
                  {activeVideo.highlights.map((hl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setTheaterState((prev) =>
                          transitionVideoTheater(prev, {
                            type: 'SELECT_HIGHLIGHT',
                            index: idx,
                          })
                        )
                      }
                      className={`w-full border px-3.5 py-2.5 text-left text-xs font-mono cursor-pointer ${
                        theaterState.selectedHighlightIdx === idx
                          ? 'bg-[#0A0A0A] border-[#EAB308] text-[#F5F5F5] font-semibold'
                          : 'bg-[#0A0A0A] border-[#262626] text-neutral-300 hover:text-white'
                      }`}
                    >
                      {hl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <StartGameModButton
                size="lg"
                label="START THE GAME MOD"
                onClick={() => setLockerOpen(true)}
                className="w-full justify-between"
              />

              <div className="bg-[#0A0A0A] border border-[#262626] p-4 text-xs text-neutral-300 leading-relaxed">
                <div className="flex items-center gap-2 font-mono uppercase font-semibold text-[#EAB308] mb-1">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{t('gameplay.disclaimerTitle')}</span>
                </div>
                <p>
                  {activeVideo.nonAffiliationNote} All trademarks and game footage belong to their
                  respective owners.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Sector Architecture Grid */}
        <div>
          <div className="pb-4 mb-6 border-b border-[#262626]">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F5F5F5] tracking-tight">
              {t('gameplay.sectorsTitle')}
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-1">
              {t('gameplay.sectorsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-[#262626] divide-y sm:divide-y-0 sm:divide-x divide-[#262626]">
            {ANGLED_MOD_SLICES.map((slice, idx) => (
              <div
                key={slice.id}
                className="bg-[#121212] flex flex-col justify-between"
              >
                <div className="h-44 relative border-b border-[#262626]">
                  <ViceArtworkCanvas
                    theme={slice.theme}
                    className="w-full h-full"
                    label={slice.title}
                  />
                </div>
                <div className="p-4 bg-[#0A0A0A]">
                  <div className="text-[11px] font-mono tabular-nums uppercase text-[#EAB308] mb-1">
                    0{idx + 1} · {slice.metric}
                  </div>
                  <div className="font-display text-xl font-bold uppercase text-white leading-tight">
                    {slice.title}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">{slice.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContentLockerModal
        isOpen={lockerOpen}
        onClose={() => setLockerOpen(false)}
        packageTitle={`GTA VI — ${activeVideo.title.toUpperCase()}`}
      />
    </section>
  );
}