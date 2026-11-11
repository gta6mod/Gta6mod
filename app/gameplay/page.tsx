import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { GameplayYoutubeSection } from '@/components/gameplay-youtube-section';

export const metadata: Metadata = {
  title: 'YouTube Gameplay & Engine Analysis | Gta6mod',
  description:
    'Watch curated GTA 6 gameplay videos and explore community analysis of shaders, vehicles, maps, and the RAGE engine.',
  alternates: {
    canonical: '/gameplay/',
  },
};

export default function GameplayPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#0A0A0A] text-[#F5F5F5]">
      <div>
        <SiteHeader />
        <GameplayYoutubeSection />
      </div>

      <footer className="py-8 px-6 lg:px-12 border-t border-[#262626] bg-[#0A0A0A] text-xs font-mono text-neutral-400">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#EAB308] shrink-0" />
            <span>
              Unofficial community archive. Not affiliated with Rockstar Games, Take-Two Interactive, or Grand Theft Auto VI.
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