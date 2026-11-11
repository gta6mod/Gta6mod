'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, ShieldAlert, X } from 'lucide-react';
import { useI18n } from './language-provider';
import { LocaleCode } from '@/lib/types';
import { ContentLockerModal, StartGameModButton } from './content-locker-modal';

interface SiteHeaderProps {
  onOpenLocker?: () => void;
}

const NAV_ITEMS = [
  { href: '/', key: 'nav.index', fallback: 'INDEX' },
  { href: '/mods', key: 'nav.mods', fallback: 'MODS' },
  { href: '/official-media', key: 'nav.official', fallback: '4K ARCHIVE' },
  { href: '/gameplay', key: 'nav.gameplay', fallback: 'GAMEPLAY' },
  { href: '/credits', key: 'nav.credits', fallback: 'CREDITS' },
  { href: '/sitemap-explorer', key: 'nav.sitemap', fallback: 'SITEMAP' },
];

export function SiteHeader({ onOpenLocker }: SiteHeaderProps) {
  const pathname = usePathname();
  const { locale, languages, setLocale, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalLockerOpen, setInternalLockerOpen] = useState(false);

  const enabledLanguages = languages.filter((l) => l.enabled);

  const handleTriggerLocker = () => {
    if (onOpenLocker) {
      onOpenLocker();
    } else {
      setInternalLockerOpen(true);
    }
  };

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0A0A0A] border-b border-[#262626]">
        {/* Top Institutional Telemetry Bar */}
        <div className="border-b border-[#262626] px-4 lg:px-8 py-1.5 flex items-center justify-between gap-4 text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2 truncate">
            <ShieldAlert className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
            <span className="truncate">{t('hero.disclaimer')}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <span>LEONIDA // VICE CITY ARCHIVE</span>
            <Link href="/sitemap.xml" target="_blank" className="text-[#EAB308] hover:underline">
              /sitemap.xml
            </Link>
          </div>
        </div>

        {/* Main Brutalist Grid Masthead */}
        <div className="flex items-stretch justify-between min-h-[56px]">
          {/* Zone 1: Brand Wordmark Cell */}
          <Link
            href="/"
            className="flex items-center gap-3 px-5 lg:px-8 border-r border-[#262626] bg-[#0A0A0A] hover:bg-[#121212] shrink-0"
          >
            <span className="px-1.5 py-0.5 bg-[#EAB308] text-[#0A0A0A] font-mono text-xs font-bold leading-none">
              VI
            </span>
            <span className="font-display text-2xl font-bold uppercase tracking-wider text-[#F5F5F5]">
              GTA6MOD
            </span>
          </Link>

          {/* Zone 2: Exposed-Cell Page Navigation */}
          <nav
            aria-label="Primary Page Directory"
            className="hidden xl:flex items-stretch flex-1"
          >
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(item.href);
              const translated = t(item.key);
              const label = translated === item.key ? item.fallback : translated;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-center px-5 border-r border-[#262626] font-mono text-xs uppercase tracking-wider whitespace-nowrap ${
                    active
                      ? 'bg-[#EAB308] text-[#0A0A0A] font-semibold'
                      : 'bg-[#0A0A0A] text-[#F5F5F5] hover:bg-[#121212]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Language Matrix & Start Game Mod Action */}
          <div className="flex items-stretch ml-auto">
            <div
              role="group"
              aria-label="Language selector"
              className="hidden sm:flex items-center border-l border-[#262626] bg-[#0A0A0A] px-2"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-400 mx-1.5 shrink-0" />
              {enabledLanguages.map((lang) => {
                const isCurrent = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLocale(lang.code as LocaleCode)}
                    className={`px-2 py-1 text-[11px] font-mono uppercase cursor-pointer ${
                      isCurrent
                        ? 'bg-[#EAB308] text-[#0A0A0A] font-semibold'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center px-3 border-l border-[#262626] bg-[#0A0A0A]">
              <StartGameModButton
                size="sm"
                label="START THE GAME MOD"
                onClick={handleTriggerLocker}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="xl:hidden flex items-center justify-center px-4 border-l border-[#262626] bg-[#0A0A0A] text-[#F5F5F5] hover:bg-[#121212] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Brutalist Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Page Directory"
            className="xl:hidden grid grid-cols-2 sm:grid-cols-3 border-t border-[#262626] bg-[#0A0A0A]"
          >
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(item.href);
              const translated = t(item.key);
              const label = translated === item.key ? item.fallback : translated;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 border-b border-r border-[#262626] font-mono text-xs uppercase tracking-wider ${
                    active
                      ? 'bg-[#EAB308] text-[#0A0A0A] font-semibold'
                      : 'text-[#F5F5F5] hover:bg-[#121212]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {!onOpenLocker && (
        <ContentLockerModal
          isOpen={internalLockerOpen}
          onClose={() => setInternalLockerOpen(false)}
        />
      )}
    </>
  );
}