'use client';

import React, { useEffect } from 'react';
import { ExternalLink, Lock, Play, Terminal, X } from 'lucide-react';

export const CONTENT_LOCKER_URL = 'https://apptrck.net/cl/i/n6e9jk';

interface ContentLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle?: string;
}

export function ContentLockerModal({
  isOpen,
  onClose,
  packageTitle = 'GTA VI — CORE GAME MOD LAUNCHER',
}: ContentLockerModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="locker-modal-title"
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-3xl bg-[#0A0A0A] border border-[#EAB308] flex flex-col h-[86vh] max-h-[760px]">
        {/* Top Institutional Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-[#262626]">
          <div className="flex items-center gap-2.5 min-w-0">
            <Lock className="w-4 h-4 text-[#EAB308] shrink-0" aria-hidden="true" />
            <span
              id="locker-modal-title"
              className="font-mono text-xs uppercase tracking-wider text-[#F5F5F5] truncate"
            >
              MOD LAUNCH GATE // {packageTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close content locker"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase text-[#F5F5F5] bg-[#121212] border border-[#262626] hover:bg-[#EAB308] hover:text-[#0A0A0A] cursor-pointer shrink-0"
          >
            <span>CLOSE</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status Sub-Bar */}
        <div className="px-4 py-2 bg-[#121212] border-b border-[#262626] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-[#EAB308] animate-ping" />
            <span>STATUS: AWAITING USER VERIFICATION TO INITIALIZE MOD RUNTIME</span>
          </div>
          <span className="text-[#EAB308]">ID: N6E9JK</span>
        </div>

        {/* Embedded Content Locker Iframe */}
        <div className="flex-1 bg-[#0A0A0A] relative overflow-hidden">
          <iframe
            src={CONTENT_LOCKER_URL}
            title="Start The Game Mod Verification Locker"
            className="w-full h-full border-0 bg-[#0A0A0A]"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>

        {/* Direct Fallback Footer */}
        <div className="px-4 py-3 bg-[#0A0A0A] border-t border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
            <span>If the verification panel does not render in your browser, open it directly.</span>
          </div>

          <a
            href={CONTENT_LOCKER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-semibold uppercase text-[#0A0A0A] bg-[#EAB308] border border-[#EAB308] whitespace-nowrap shrink-0"
          >
            <span>OPEN VERIFICATION IN NEW TAB</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

interface StartGameModButtonProps {
  onClick: () => void;
  size?: 'sm' | 'lg';
  label?: string;
  className?: string;
}

export function StartGameModButton({
  onClick,
  size = 'lg',
  label = 'START THE GAME MOD',
  className = '',
}: StartGameModButtonProps) {
  if (size === 'sm') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative inline-flex items-center gap-2.5 px-4 py-2 bg-[#EAB308] text-[#0A0A0A] border border-[#EAB308] font-display font-bold uppercase tracking-wider text-sm cursor-pointer shrink-0 ${className}`}
      >
        <span className="inline-flex items-center justify-center px-1.5 py-0.5 bg-[#0A0A0A] text-[#EAB308] font-mono text-[10px] font-bold leading-none">
          VI
        </span>
        <span>{label}</span>
        <span className="inline-block w-2 h-2 bg-[#0A0A0A] animate-ping" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-stretch bg-[#0A0A0A] border border-[#EAB308] p-1 cursor-pointer text-left ${className}`}
    >
      {/* Left GTA VI Roman Numeral Block */}
      <span className="flex flex-col items-center justify-center px-4 py-3 bg-[#0A0A0A] border-r border-[#262626] text-[#EAB308] font-display font-bold">
        <span className="text-2xl leading-none tracking-tighter">VI</span>
        <span className="text-[9px] font-mono uppercase tracking-widest mt-1 text-[#F5F5F5]">
          MOD
        </span>
      </span>

      {/* Center Animated High-Contrast Trigger Block */}
      <span className="relative overflow-hidden flex items-center gap-4 px-6 py-3.5 bg-[#EAB308] text-[#0A0A0A]">
        <Play className="w-5 h-5 fill-current shrink-0 animate-pulse" aria-hidden="true" />
        <span className="flex flex-col">
          <span className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-none">
            {label}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest mt-1 font-semibold">
            RAGE 9 RUNTIME // CLICK TO INITIALIZE
          </span>
        </span>

        {/* Mechanical Terminal Activity Indicator */}
        <span className="ml-2 flex items-center gap-1 px-2 py-1 bg-[#0A0A0A] text-[#EAB308] font-mono text-[10px] uppercase">
          <span className="w-1.5 h-1.5 bg-[#EAB308] animate-ping" />
          <span>READY</span>
        </span>
      </span>
    </button>
  );
}