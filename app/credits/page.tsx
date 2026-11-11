import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { CreditsAndSitemapSection } from '@/components/credits-and-sitemap-section';

export const metadata: Metadata = {
  title: 'Creator Credits & Attribution Ledger | Gta6mod',
  description:
    'Institutional attribution registry for GTA 6 Vice City 3D vehicle modelers, RAGE 9 shader architects, script developers, and media analysts.',
  alternates: {
    canonical: '/credits/',
  },
};

export default function CreditsPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#0A0A0A] text-[#F5F5F5]">
      <div>
        <SiteHeader />
        <CreditsAndSitemapSection showCredits={true} showSitemap={false} />
      </div>
    </main>
  );
}