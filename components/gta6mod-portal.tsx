'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Layers, Play, ShieldAlert } from 'lucide-react';
import { INITIAL_MODS } from '@/lib/mods-repository';
import { generateCatalogSitemapEntries } from '@/lib/sitemap-service';
import { ModItem, SitemapUrlEntry } from '@/lib/types';
import { HeroSection } from './hero-section';
import { ViceArtworkCanvas } from './vice-artwork-canvas';
import { ContentLockerModal } from './content-locker-modal';
import { useI18n } from './language-provider';

export function Gta6modPortal() {
  const { t } = useI18n();
  const [mods] = useState<ModItem[]>(INITIAL_MODS);
  const [sitemapEntries] = useState<SitemapUrlEntry[]>(() =>
    generateCatalogSitemapEntries('https://gta6mod.github.io/Gta6mod', 2500)
  );
  const [lockerState, setLockerState] = useState<{
    isOpen: boolean;
    packageTitle: string;
  }>({
    isOpen: false,
    packageTitle: 'GTA VI — VICE CITY CORE MOD PACKAGE',
  });

  const handleOpenLocker = (packageTitle = 'GTA VI — VICE CITY CORE MOD PACKAGE') => {
    setLockerState({ isOpen: true, packageTitle });
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#0A0A0A] text-[#F5F5F5]">
      <div>
        <HeroSection
          totalIndexedUrls={sitemapEntries.length}
          totalModsCount={mods.length}
          onOpenLocker={handleOpenLocker}
        />

        {/* Featured Mod Builds Ledger on the Launch Hub */}
        <section
          aria-labelledby="hub-featured-mods-heading"
          className="py-16 px-6 lg:px-12 border-b border-[#262626] bg-[#0A0A0A]"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#262626]">
              <div>
                <Layers className="w-6 h-6 text-[#EAB308] mb-3" aria-hidden="true" />
                <h2
                  id="hub-featured-mods-heading"
                  className="font-display text-3xl sm:text-5xl font-bold uppercase text-[#F5F5F5] tracking-tight"
                >
                  {t('mods.title')}
                </h2>
                <p className="text-sm text-neutral-300 max-w-2xl mt-1">
                  {t('mods.subtitle')}
                </p>
              </div>

              <Link
                href="/mods"
                className="inline-flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase font-semibold text-[#0A0A0A] bg-[#EAB308] border border-[#EAB308] whitespace-nowrap shrink-0"
              >
                <span>VIEW FULL MODS CATALOG ({mods.length})</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mods.map((mod) => (
                <article
                  key={mod.id}
                  className="bg-[#121212] border border-[#262626] flex flex-col justify-between"
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
                      <h3 className="font-display text-2xl font-bold uppercase text-[#F5F5F5] mb-2">
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
                      <div className="text-[11px] font-mono text-neutral-400 flex items-center justify-between pt-3 border-t border-[#262626]">
                        <span>AUTHOR: {mod.authorHandle}</span>
                        <span>{mod.fileSizeMb} MB</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0A0A0A] border-t border-[#262626] flex items-center justify-between gap-2">
                    <Link
                      href={`/mods/${mod.category}/${mod.slug}`}
                      className="px-3 py-2 text-xs font-mono uppercase text-[#F5F5F5] bg-[#121212] border border-[#262626] hover:border-[#EAB308]"
                    >
                      SPECS
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleOpenLocker(`${mod.title} (${mod.version})`)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#EAB308] text-[#0A0A0A] font-display font-bold uppercase tracking-wider text-sm cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>START THE GAME MOD</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Institutional Brutalist Footer */}
      <footer className="py-10 px-6 lg:px-12 bg-[#0A0A0A] text-neutral-300">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#262626]">
            <div>
              <Link
                href="/"
                className="font-display text-2xl font-bold uppercase tracking-wider text-[#F5F5F5]"
              >
                GTA6MOD
              </Link>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                {t('footer.subtitle')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase text-neutral-300">
              <Link href="/mods" className="hover:text-[#EAB308]">
                /mods
              </Link>
              <Link href="/official-media" className="hover:text-[#EAB308]">
                /official-media
              </Link>
              <Link href="/gameplay" className="hover:text-[#EAB308]">
                /gameplay
              </Link>
              <Link href="/credits" className="hover:text-[#EAB308]">
                /credits
              </Link>
              <Link href="/sitemap-explorer" className="hover:text-[#EAB308]">
                /sitemap-explorer
              </Link>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EAB308] hover:underline"
              >
                /sitemap.xml
              </a>
            </div>
          </div>

          <div className="bg-[#121212] border border-[#262626] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-[#EAB308] shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-300 leading-relaxed">
                {t('footer.disclaimer')}
              </div>
            </div>
            <div className="text-xs text-neutral-400 font-mono shrink-0">
              © 2026 GTA6MOD
            </div>
          </div>
        </div>
      </footer>

      <ContentLockerModal
        isOpen={lockerState.isOpen}
        onClose={() => setLockerState((prev) => ({ ...prev, isOpen: false }))}
        packageTitle={lockerState.packageTitle}
      />
    </main>
  );
}