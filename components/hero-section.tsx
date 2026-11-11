'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Camera, FileCode, Film, Layers, Terminal, Users } from 'lucide-react';
import { useI18n } from './language-provider';
import { ViceArtworkCanvas } from './vice-artwork-canvas';
import { SiteHeader } from './site-header';
import { ContentLockerModal, StartGameModButton } from './content-locker-modal';

export type ActiveSectionView = 'all' | 'mods' | 'official' | 'credits' | 'gameplay' | 'sitemap';

interface HeroSectionProps {
  totalIndexedUrls: number;
  totalModsCount: number;
  activeView?: ActiveSectionView;
  onSelectView?: (view: ActiveSectionView, targetId?: string) => void;
  onOpenLocker?: (packageTitle?: string) => void;
}

export function HeroSection({
  totalIndexedUrls,
  totalModsCount,
  onOpenLocker,
}: HeroSectionProps) {
  const { t } = useI18n();
  const [lockerOpen, setLockerOpen] = useState(false);

  const handleStartMod = () => {
    if (onOpenLocker) {
      onOpenLocker('GTA VI — VICE CITY CORE MOD PACKAGE');
    } else {
      setLockerOpen(true);
    }
  };

  const directoryRoutes = [
    {
      href: '/mods',
      code: '01 // DIRECTORY',
      title: t('nav.mods'),
      meta: `${totalModsCount} VERIFIED PACKAGES`,
      desc: 'Shader presets, widebody vehicle rigs, map interiors, and C# physics scripts.',
      icon: Layers,
    },
    {
      href: '/official-media',
      code: '02 // REFERENCE',
      title: t('nav.official'),
      meta: '3840x2160 UHD',
      desc: 'Uncompressed 4K reference captures, edition specs, and Leonida lore archive.',
      icon: Camera,
    },
    {
      href: '/gameplay',
      code: '03 // TELEMETRY',
      title: t('nav.gameplay'),
      meta: '60 FPS ANALYSIS',
      desc: 'Frame-by-frame trailer breakdowns and community engine reconstruction feeds.',
      icon: Film,
    },
    {
      href: '/credits',
      code: '04 // LEDGER',
      title: t('nav.credits'),
      meta: 'OPEN ATTRIBUTION',
      desc: 'Creator attribution registry and direct repository package submission terminal.',
      icon: Users,
    },
    {
      href: '/sitemap-explorer',
      code: '05 // CRAWLER XML',
      title: t('nav.sitemap'),
      meta: `${totalIndexedUrls.toLocaleString()} URLS`,
      desc: 'Multi-shard XML 0.9 index architecture for search engine discovery.',
      icon: FileCode,
    },
  ];

  return (
    <div className="bg-[#0A0A0A] border-b border-[#262626]">
      <SiteHeader onOpenLocker={handleStartMod} />

      {/* Brutalist Editorial Hero Viewport */}
      <section
        id="top"
        aria-label="Hero Launch Terminal"
        className="relative min-h-[580px] flex flex-col justify-end border-b border-[#262626] overflow-hidden"
      >
        <ViceArtworkCanvas
          theme="hero-vista"
          className="absolute inset-0 w-full h-full"
          label="Leonida Vice City Key Art Backdrop"
        />

        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 lg:px-12 pt-20 pb-14">
          <div className="max-w-3xl bg-[#0A0A0A] border border-[#262626] p-6 sm:p-10">
            {/* Strict Hierarchy: Semantic Icon, Primary H1 Title, Concise 1-Line Subtitle */}
            <Terminal className="w-6 h-6 text-[#EAB308] mb-4" aria-hidden="true" />

            <h1
              className="font-display font-bold uppercase text-[#F5F5F5] tracking-tight mb-3"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                lineHeight: 1.0,
              }}
            >
              {t('hero.title')}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
              {t('hero.subtitle')}
            </p>

            {/* Primary Animated GTA 6 Mod Launch CTA + Secondary Directory Link */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-[#262626]">
              <StartGameModButton
                size="lg"
                label="START THE GAME MOD"
                onClick={handleStartMod}
              />

              <Link
                href="/mods"
                className="inline-flex items-center justify-between sm:justify-center gap-3 px-6 py-4 font-mono text-xs uppercase tracking-wider text-[#F5F5F5] bg-[#121212] border border-[#262626] hover:border-[#EAB308] whitespace-nowrap"
              >
                <span>OPEN MODS DIRECTORY</span>
                <ArrowUpRight className="w-4 h-4 text-[#EAB308]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Exposed 1px Grid Directory for Standalone SEO Pages */}
      <section aria-label="Dedicated Archive Pages" className="bg-[#0A0A0A]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#262626] border-x border-[#262626]">
          {directoryRoutes.map((route) => {
            const IconComponent = route.icon;
            return (
              <Link
                key={route.href}
                href={route.href}
                className="p-6 bg-[#0A0A0A] hover:bg-[#121212] flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-3">
                    <span>{route.code}</span>
                    <IconComponent className="w-4 h-4 text-[#EAB308]" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-[#F5F5F5] mb-1.5">
                    {route.title}
                  </h2>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {route.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#262626] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#EAB308]">{route.meta}</span>
                  <span className="text-[#F5F5F5] inline-flex items-center gap-1">
                    <span>{route.href}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#EAB308]" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {!onOpenLocker && (
        <ContentLockerModal
          isOpen={lockerOpen}
          onClose={() => setLockerOpen(false)}
          packageTitle="GTA VI — VICE CITY CORE MOD PACKAGE"
        />
      )}
    </div>
  );
}