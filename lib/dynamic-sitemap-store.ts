import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CreatorCredit, ModItem, SitemapUrlEntry } from './types';

interface DynamicStorePayload {
  mods: ModItem[];
  credits: CreatorCredit[];
  sitemapEntries: SitemapUrlEntry[];
}

const STORE_FILE_PATH = path.join(os.tmpdir(), 'gta6mod-dynamic-store.json');

let memoryStore: DynamicStorePayload = {
  mods: [],
  credits: [],
  sitemapEntries: [],
};

export function readDynamicStore(): DynamicStorePayload {
  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const raw = fs.readFileSync(STORE_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as DynamicStorePayload;
      if (
        parsed &&
        Array.isArray(parsed.mods) &&
        Array.isArray(parsed.credits) &&
        Array.isArray(parsed.sitemapEntries)
      ) {
        memoryStore = parsed;
        return parsed;
      }
    }
  } catch {
    // Fallback to in-memory store if /tmp read fails
  }
  return memoryStore;
}

export function appendDynamicPageToStore(item: {
  mod: ModItem;
  credit: CreatorCredit;
  sitemapEntry: SitemapUrlEntry;
}): DynamicStorePayload {
  const current = readDynamicStore();
  const updated: DynamicStorePayload = {
    mods: [item.mod, ...current.mods.filter((m) => m.slug !== item.mod.slug)],
    credits: [item.credit, ...current.credits.filter((c) => c.id !== item.credit.id)],
    sitemapEntries: [
      item.sitemapEntry,
      ...current.sitemapEntries.filter((e) => e.path !== item.sitemapEntry.path),
    ],
  };

  memoryStore = updated;
  try {
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  } catch {
    // Keep in-memory store updated even in read-only environments
  }
  return updated;
}
