import type { Metadata } from 'next';
import { Barlow_Condensed, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { LanguageProvider } from '@/components/language-provider';
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
  metadataBase: new URL('https://gta6mod.github.io/Gta6mod/'),
  title: 'Gta6mod – Vice City Mods Directory, Gameplay & Credits',
  description:
    'Explore GTA 6 Vice City mods, vehicle packs, graphics shaders, gameplay videos, creator credits, and an XML sitemap on this independent fan archive.',
  keywords: [
    'GTA 6 mods',
    'GTA 6 Vice City mods',
    'GTA 6 gameplay',
    'GTA 6 vehicle mods',
    'GTA 6 shaders',
    'Vice City modding',
  ],
  authors: [{ name: 'Gta6mod' }],
  creator: 'Gta6mod',
  publisher: 'Gta6mod',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  verification: {
    google: 'nqZDI1cO_8ojuxdvI8pGJM-XNcLLcQHBkO4FmQpczdE',
  },
  openGraph: {
    title: 'Gta6mod – Vice City Mods Directory, Gameplay & Credits',
    description:
      'Explore GTA 6 Vice City mods, gameplay showcases, creator credits, official media references, and a crawler-ready XML sitemap.',
    type: 'website',
    siteName: 'Gta6mod',
    url: 'https://gta6mod.github.io/Gta6mod/',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gta6mod – Vice City Mods Directory, Gameplay & Credits',
    description:
      'Explore GTA 6 Vice City mods, gameplay showcases, creator credits, official media references, and an XML sitemap.',
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
    url: process.env.APP_URL || 'https://gta6mod.github.io/Gta6mod/',
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
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href="/Gta6mod/sitemap.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased selection:bg-[#EAB308] selection:text-[#0A0A0A] min-h-screen"
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
