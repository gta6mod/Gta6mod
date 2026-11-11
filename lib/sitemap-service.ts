import {
  INITIAL_CREDITS,
  INITIAL_MODS,
  MOD_CATEGORIES,
  YOUTUBE_GAMEPLAY_VIDEOS,
} from './mods-repository';
import { SitemapEntityType, SitemapShardInfo, SitemapUrlEntry } from './types';

const SYNTHETIC_MOD_PREFIXES = [
  'vice-beach',
  'leonida-keys',
  'ocean-drive',
  'starfish-island',
  'port-gellhorn',
  'grassrivers',
  'washington-beach',
  'little-haiti',
  'downtown-vice',
  'ambrosia-bay',
];

const SYNTHETIC_MOD_TYPES: {
  category: 'vehicles' | 'shaders' | 'map-expansions' | 'characters' | 'scripts';
  noun: string;
}[] = [
  { category: 'vehicles', noun: 'twin-turbo-widebody-coupe' },
  { category: 'shaders', noun: 'rtgi-sunset-path-tracer-lut' },
  { category: 'map-expansions', noun: 'art-deco-penthouse-interior' },
  { category: 'characters', noun: 'syndicate-heist-wardrobe-pack' },
  { category: 'scripts', noun: 'drift-telemetry-physics-hook' },
];

export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function normalizeBaseUrl(rawBaseUrl?: string): string {
  const fallback = 'https://gta6mod.community';
  if (!rawBaseUrl || !rawBaseUrl.trim()) return fallback;
  return rawBaseUrl.trim().replace(/\/+$/, '');
}

/**
 * Generates a deterministic catalog of thousands of SEO-ready URLs
 * across core routes, dynamically added pages, mod pages, categories,
 * creator credits, and gameplay videos.
 */
export function generateCatalogSitemapEntries(
  baseUrlInput?: string,
  totalSyntheticMods = 2500,
  dynamicEntries: SitemapUrlEntry[] = []
): SitemapUrlEntry[] {
  const baseUrl = normalizeBaseUrl(baseUrlInput);
  const entries: SitemapUrlEntry[] = [];

  // 0. Dynamically added pages (immediately prioritized at the top of Shard 1)
  for (const dyn of dynamicEntries) {
    const cleanPath = dyn.path.startsWith('/') ? dyn.path : `/${dyn.path}`;
    entries.push({
      ...dyn,
      path: cleanPath,
      loc: `${baseUrl}${cleanPath}`,
      shardId: 1,
    });
  }

  // 1. Core Standalone Pages (Shard 1)
  const coreRoutes = [
    { path: '/', priority: '1.0', freq: 'hourly' as const, title: 'Gta6mod Home & Launch Hub' },
    { path: '/mods', priority: '0.9', freq: 'hourly' as const, title: 'Vice City Mods Directory' },
    { path: '/official-media', priority: '0.9', freq: 'daily' as const, title: 'Official 4K Media & Lore Archive' },
    { path: '/gameplay', priority: '0.9', freq: 'daily' as const, title: 'YouTube GTA 6 Gameplay & Engine Analysis' },
    { path: '/credits', priority: '0.8', freq: 'daily' as const, title: 'Creator Credits & Attribution Ledger' },
    { path: '/sitemap-explorer', priority: '0.7', freq: 'weekly' as const, title: 'Multi-Shard XML Sitemap Inspector' },
  ];

  for (const route of coreRoutes) {
    entries.push({
      loc: `${baseUrl}${route.path}`,
      path: route.path,
      lastmod: '2026-11-10',
      changefreq: route.freq,
      priority: route.priority,
      entityType: 'core',
      shardId: 1,
      title: route.title,
    });
  }

  // 2. Category Landing Pages (Shard 1)
  for (const cat of MOD_CATEGORIES) {
    if (cat.id === 'all') continue;
    const path = `/mods/category/${cat.id}`;
    entries.push({
      loc: `${baseUrl}${path}`,
      path,
      lastmod: '2026-11-09',
      changefreq: 'daily',
      priority: '0.9',
      entityType: 'category',
      shardId: 1,
      title: `${cat.label} – Category Index (${cat.count} Mods)`,
    });
  }

  // 3. Curated Featured Mods (Shard 1)
  for (const mod of INITIAL_MODS) {
    const path = `/mods/${mod.category}/${mod.slug}`;
    if (entries.some((e) => e.path === path)) continue;
    entries.push({
      loc: `${baseUrl}${path}`,
      path,
      lastmod: mod.updatedAt,
      changefreq: 'weekly',
      priority: '0.8',
      entityType: 'mod',
      shardId: 1,
      title: `${mod.title} (${mod.version})`,
    });
  }

  // 4. Creator Credit Profiles (Shard 1)
  for (const credit of INITIAL_CREDITS) {
    if (entries.some((e) => e.path === credit.profileSlug)) continue;
    entries.push({
      loc: `${baseUrl}${credit.profileSlug}`,
      path: credit.profileSlug,
      lastmod: '2026-11-08',
      changefreq: 'weekly',
      priority: '0.7',
      entityType: 'credit',
      shardId: 1,
      title: `${credit.displayName} (${credit.handle}) – ${credit.specialty}`,
    });
  }

  // 5. YouTube Gameplay Showcase Pages (Shard 1)
  for (const video of YOUTUBE_GAMEPLAY_VIDEOS) {
    const path = `/gameplay/${video.id}`;
    entries.push({
      loc: `${baseUrl}${path}`,
      path,
      lastmod: '2026-11-07',
      changefreq: 'monthly',
      priority: '0.8',
      entityType: 'gameplay',
      shardId: 1,
      title: video.title,
    });
  }

  // 6. Programmatic Long-Tail Mod Pages across Shards 1..5 (for thousands of pages)
  const urlsPerShard = 500;
  for (let i = 1; i <= totalSyntheticMods; i++) {
    const prefix = SYNTHETIC_MOD_PREFIXES[i % SYNTHETIC_MOD_PREFIXES.length];
    const typeSpec = SYNTHETIC_MOD_TYPES[i % SYNTHETIC_MOD_TYPES.length];
    const buildNum = String(i).padStart(4, '0');
    const slug = `${prefix}-${typeSpec.noun}-build-${buildNum}`;
    const path = `/mods/${typeSpec.category}/${slug}`;
    const shardId = Math.min(5, Math.floor((i - 1) / urlsPerShard) + 1);
    const day = String((i % 28) + 1).padStart(2, '0');

    entries.push({
      loc: `${baseUrl}${path}`,
      path,
      lastmod: `2026-10-${day}`,
      changefreq: 'weekly',
      priority: i <= 250 ? '0.8' : '0.6',
      entityType: 'mod',
      shardId,
      title: `${prefix.replace('-', ' ').toUpperCase()} ${typeSpec.noun.replace(/-/g, ' ')} #${buildNum}`,
    });
  }

  return entries;
}

export function getSitemapShardsSummary(
  entries: SitemapUrlEntry[],
  baseUrlInput?: string
): SitemapShardInfo[] {
  const baseUrl = normalizeBaseUrl(baseUrlInput);
  const shardMap = new Map<number, SitemapUrlEntry[]>();

  for (const entry of entries) {
    const list = shardMap.get(entry.shardId) || [];
    list.push(entry);
    shardMap.set(entry.shardId, list);
  }

  const shardLabels: Record<number, string> = {
    1: 'Shard 01: Core Hub, Dynamic Submissions, Featured Mods & Credits',
    2: 'Shard 02: Vehicles & Widebody Customs Index (#0501–#1000)',
    3: 'Shard 03: Ray-Tracing Shaders & Vice LUTs (#1001–#1500)',
    4: 'Shard 04: Leonida Map Expansions & Interiors (#1501–#2000)',
    5: 'Shard 05: Scripts, Physics & Character Packs (#2001–#2500+)',
  };

  return Array.from(shardMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([shardId, list]) => ({
      shardId,
      label: shardLabels[shardId] || `Shard 0${shardId}: Extended Mod Archive`,
      entityType: shardId === 1 ? 'mixed' : 'mod',
      urlCount: list.length,
      samplePath: list[0]?.path || '/',
      xmlEndpoint: `${baseUrl}/sitemap.xml?shard=${shardId}`,
    }));
}

export function buildUrlSetXml(entries: SitemapUrlEntry[]): string {
  const urlNodes = entries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${escapeXml(entry.priority)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;
}

export function buildSitemapIndexXml(shards: SitemapShardInfo[], lastmod = '2026-11-10'): string {
  const sitemapNodes = shards
    .map(
      (shard) => `  <sitemap>
    <loc>${escapeXml(shard.xmlEndpoint)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapNodes}
</sitemapindex>`;
}

export function filterSitemapEntries(
  entries: SitemapUrlEntry[],
  options: {
    shardId?: number | 'all';
    entityType?: SitemapEntityType | 'all';
    query?: string;
    limit?: number;
  }
): SitemapUrlEntry[] {
  const { shardId = 'all', entityType = 'all', query = '', limit = 50 } = options;
  const q = query.trim().toLowerCase();

  const filtered = entries.filter((item) => {
    if (shardId !== 'all' && item.shardId !== shardId) return false;
    if (entityType !== 'all' && item.entityType !== entityType) return false;
    if (!q) return true;
    return (
      item.path.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.entityType.toLowerCase().includes(q)
    );
  });

  return filtered.slice(0, limit);
}
