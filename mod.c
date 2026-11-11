import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, ShieldAlert } from 'lucide-react';
import { INITIAL_MODS, GENERATED_VI_ASSETS } from '@/lib/mods-repository';
import { readDynamicStore } from '@/lib/dynamic-sitemap-store';
import { withBasePath } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { ModDetailLockerActions } from '@/components/mods-directory-section';

interface ModPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return INITIAL_MODS.map((mod) => ({
    category: mod.category,
    slug: mod.slug,
  }));
}

export default async function ModDetailPage({ params }: ModPageProps) {
  const { category, slug } = await params;
  const dynamicStore = readDynamicStore();
  const allMods = [...dynamicStore.mods, ...INITIAL_MODS];

  const matchedMod = allMods.find((m) => m.slug === slug);

  const title =
    matchedMod?.title ||
    slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  const version = matchedMod?.version || 'v1.0.0';
  const authorHandle = matchedMod?.authorHandle || '@LeonidaCommunity';
  const categoryLabel = matchedMod?.categoryLabel || category.toUpperCase();
  const summary =
    matchedMod?.summary ||
    'Indexed GTA 6 / Leonida community modification package registered in the Gta6mod scalable repository and XML sitemap.';
  const imageUrl = matchedMod?.imageUrl || GENERATED_VI_ASSETS.heroKeyArt;
  const technicalNotes = matchedMod?.technicalNotes || [
    'Verified for RAGE 9 Shader & Asset Streamer pipeline',
    'Automatically indexed in /sitemap.xml for instant search engine discovery',
    'Includes creator attribution manifest and checksum verification',
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col justify-between">
      <div>
        <SiteHeader />

        <section className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="mb-6">
            <Link
              href="/mods"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#EAB308] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO MODS DIRECTORY</span>
            </Link>
          </div>

          <div className="bg-[#121212] border border-[#262626] grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[320px] bg-[#0A0A0A] border-b lg:border-b-0 lg:border-r border-[#262626]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(imageUrl)}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <Layers className="w-5 h-5 text-[#EAB308] mb-3" aria-hidden="true" />

                <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase text-white mb-2">
                  {title}
                </h1>

                <p className="text-xs font-mono uppercase text-[#EAB308] mb-5">
                  {categoryLabel} · {version} · AUTHOR: {authorHandle}
                </p>

                <p className="text-sm text-neutral-200 leading-relaxed mb-6">{summary}</p>

                <div className="mb-6 p-4 bg-[#0A0A0A] border border-[#262626]">
                  <h2 className="text-xs font-mono uppercase text-[#EAB308] mb-2">
                    TECHNICAL PACKAGE SPECIFICATIONS:
                  </h2>
                  <ul className="text-xs font-mono text-neutral-300 space-y-1.5 list-disc list-inside">
                    {technicalNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <ModDetailLockerActions
                modTitle={title}
                modVersion={version}
                authorHandle={authorHandle}
              />
            </div>
          </div>
        </section>
      </div>

      <footer className="py-8 px-6 border-t border-[#262626] bg-[#0A0A0A] text-xs font-mono text-neutral-400">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#EAB308] shrink-0" />
            <span>
              Unofficial community modding index. Not affiliated with Rockstar Games, Take-Two
              Interactive, or Grand Theft Auto VI.
            </span>
          </div>
          <Link href="/" className="text-[#EAB308] hover:underline uppercase">
            GTA6MOD INDEX →
          </Link>
        </div>
      </footer>
    </main>
  );
}