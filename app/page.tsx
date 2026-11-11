import React from 'react';
import type { Metadata } from 'next';
import { Gta6modPortal } from '@/components/gta6mod-portal';

export const metadata: Metadata = {
  verification: {
    google: 'nqZDI1cO_8ojuxdvI8pGJM-XNcLLcQHBkO4FmQpczdE',
  },
};

export default function HomePage() {
  return <Gta6modPortal />;
}
