import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { RockstarOfficialGallerySection } from '@/components/rockstar-official-gallery-section';

export const metadata: Metadata = {
  title: 'Official 4K Launch Gallery & Lore Archive | Gta6mod',
  description:
    'Inspect uncompressed 3840x2160 UHD reference captures, narrative synopsis, and official release specifications for Vice City and Leonida.',
  alternates: {
    canonical: '/official-media/',
  },
};

export default function OfficialMediaPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#0A0A0A] text-[#F5F5F5]">
      <div>
        <SiteHeader />
        <RockstarOfficialGallerySection />
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