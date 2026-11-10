import type { Metadata } from 'next';
import { Barlow_Condensed, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Gta6mod – Vice City Mods Directory, Gameplay & Credits',
  description:
    'Discover Gta6mod: high-contrast Vice City mods, vehicle packs, ray-traced shaders, curated YouTube GTA 6 gameplay videos, creator credits, and scalable XML sitemaps. Unofficial fan platform not affiliated with Rockstar Games or GTA 6.',
  openGraph: {
    title: 'Gta6mod – Vice City Mods Directory, Gameplay & Credits',
    description:
      'Explore community mods, YouTube GTA 6 gameplay showcases, creator credits, and a crawler-ready multi-thousand page sitemap architecture.',
    type: 'website',
    siteName: 'Gta6mod',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gta6mod – Vice City Mods Directory, Gameplay & Credits',
    description:
      'Explore community mods, YouTube GTA 6 gameplay showcases, creator credits, and a crawler-ready multi-thousand page sitemap architecture.',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gta6mod',
    description:
      'Community modding directory, YouTube GTA 6 gameplay index, and creator credits repository. Independent platform not affiliated with Rockstar Games or Grand Theft Auto VI.',
    url: process.env.APP_URL || 'https://gta6mod.community',
    potentialAction: {
      '@type': 'SearchAction',
      target: '{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#11051C] text-[#F8FAFC] font-sans antialiased selection:bg-[#F43F5E] selection:text-white min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
