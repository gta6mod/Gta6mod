import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download, ExternalLink, FileCode, ShieldAlert } from 'lucide-react';
import { INITIAL_MODS, GENERATED_VI_ASSETS } from '@/lib/mods-repository';
import { readDynamicStore } from '@/lib/dynamic-sitemap-store';
import { withBasePath } from '@/lib/utils';

interface ModPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ModPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const dynamicStore = readDynamicStore();
  const matchedMod = [...dynamicStore.mods, ...INITIAL_MODS].find((mod) => mod.slug === slug);
  const title =
    matchedMod?.title ||
    slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  const description =
    matchedMod?.summary ||
    `Explore the ${category.replaceAll('-', ' ')} mod "${title}" in the Gta6mod GTA 6 Vice City directory.`;

  return {
    title: `${title} | GTA 6 Mod Directory`,
    description,
    alternates: {
      canonical: `/mods/${category}/${slug}/`,
    },
    openGraph: {
      title: `${title} | GTA 6 Mod Directory`,
      description,
      type: 'article',
    },
  };
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
        {/* Top Bar: 3-Zone Contract */}
        <header className="flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-[#0A0A0A] border-b border-[#262626]">
          <Link
            href="/"
            className="font-display text-2xl font-bold tracking-wider text-white whitespace-nowrap shrink-0"
          >
            Gta6mod
          </Link>

          <nav
            aria-label="Mod Detail Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200"
          >
            <Link href="/#mods" className="hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0">
              Mods
            </Link>
            <Link href="/#gameplay" className="hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0">
              Gameplay
            </Link>
            <Link href="/#credits" className="hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0">
              Credits
            </Link>
            <Link href="/#sitemap" className="hover:text-[#FACC15] transition-colors whitespace-nowrap shrink-0">
              Sitemap
            </Link>
          </nav>

          <Link
            href="/#mods"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0A0A0A] bg-[#EAB308] hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Mods</span>
          </Link>
        </header>

        {/* Mod Detail Hero & Specs */}
        <section className="max-w-[1100px] mx-auto px-6 py-12">
          <div className="mb-6">
            <Link
              href="/#mods"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#EAB308] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Main Hub &amp; Mods Directory</span>
            </Link>
          </div>

          <div className="bg-[#121212] border border-[#262626] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative min-h-[300px] bg-[#0A0A0A] border-b lg:border-b-0 lg:border-r border-[#262626]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(imageUrl)}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#EAB308] font-mono tabular-nums mb-3">
                  <span>{categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{version}</span>
                  <span aria-hidden="true">·</span>
                  <span>Credit: {authorHandle}</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                  {title}
                </h1>

                <p className="text-sm text-slate-200 leading-relaxed mb-6">{summary}</p>

                <div className="mb-6">
                  <h2 className="text-xs font-semibold text-white mb-2">
                    Technical Package Highlights:
                  </h2>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {technicalNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 border-t border-[#262626] flex flex-wrap items-center justify-between gap-4">
                <Link
                  href="/#credits"
                  className="text-xs font-mono text-[#EAB308] hover:underline"
                >
                  View Creator Credit ({authorHandle}) →
                </Link>

                <div className="flex items-center gap-3">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono text-neutral-200 bg-[#0A0A0A] border border-[#262626] hover:border-[#EAB308] transition-colors"
                  >
                    <FileCode className="w-3.5 h-3.5 text-[#EAB308]" />
                    <span>Verify in sitemap.xml</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <Link
                    href="/#mods"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0A0A0A] bg-[#EAB308] hover:bg-[#FACC15] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Queue in Mod Manager</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="py-8 px-6 border-t border-[#262626] bg-[#0A0A0A] text-xs text-neutral-400">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#EAB308] shrink-0" />
            <span>
              Unofficial community modding index. Not affiliated with Rockstar Games, Take-Two
              Interactive, or Grand Theft Auto VI (GTA 6).
            </span>
          </div>
          <Link href="/" className="text-[#FACC15] hover:underline font-mono">
            Gta6mod Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
