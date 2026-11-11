import React from 'react';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { CreditsAndSitemapSection } from '@/components/credits-and-sitemap-section';

export const metadata: Metadata = {
  title: 'Multi-Shard sitemap.xml Inspector | Gta6mod',
  description:
    'Inspect the 5-shard XML 0.9 crawler index architecture, canonical page routes, and live XML payload output for Gta6mod.',
  alternates: {
    canonical: '/sitemap-explorer/',
  },
};

export default function SitemapExplorerPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#0A0A0A] text-[#F5F5F5]">
      <div>
        <SiteHeader />
        <CreditsAndSitemapSection showCredits={false} showSitemap={true} />
      </div>
    </main>
  );
}