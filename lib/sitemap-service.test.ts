import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildSitemapIndexXml,
  buildUrlSetXml,
  escapeXml,
  filterSitemapEntries,
  generateCatalogSitemapEntries,
  getSitemapShardsSummary,
} from './sitemap-service';
import {
  INITIAL_MODS,
  buildDynamicModAndSitemapObjects,
  createSlugFromTitle,
  filterAndSortMods,
  validateModSubmission,
} from './mods-repository';

test('escapeXml properly escapes XML special characters', () => {
  const raw = 'https://gta6mod.community/mods?a=1&b="2"&c=<tag>';
  const escaped = escapeXml(raw);
  assert.equal(
    escaped,
    'https://gta6mod.community/mods?a=1&amp;b=&quot;2&quot;&amp;c=&lt;tag&gt;'
  );
});

test('generateCatalogSitemapEntries generates 2,500+ crawler URLs across 5 shards', () => {
  const entries = generateCatalogSitemapEntries('https://gta6mod.community', 2500);
  assert.ok(entries.length > 2500, `Expected > 2500 entries, got ${entries.length}`);

  const shards = getSitemapShardsSummary(entries, 'https://gta6mod.community');
  assert.equal(shards.length, 5);
  assert.equal(shards[0].xmlEndpoint, 'https://gta6mod.community/sitemap.xml?shard=1');
});

test('dynamically added pages immediately update the generated sitemap.xml entries', () => {
  const { sitemapEntry } = buildDynamicModAndSitemapObjects(
    {
      title: 'Leonida Keys Offshore Speedboat Pack',
      authorHandle: '@MarineModder',
      category: 'vehicles',
      version: 'v1.4.0',
      summary: 'High-speed offshore racing catamarans for the Leonida Keys sector.',
    },
    'https://gta6mod.community'
  );

  const entries = generateCatalogSitemapEntries('https://gta6mod.community', 2500, [
    sitemapEntry,
  ]);
  assert.equal(entries[0].path, '/mods/vehicles/leonida-keys-offshore-speedboat-pack');

  const xml = buildUrlSetXml(entries.slice(0, 3));
  assert.ok(
    xml.includes(
      '<loc>https://gta6mod.community/mods/vehicles/leonida-keys-offshore-speedboat-pack</loc>'
    )
  );
});

test('buildUrlSetXml and buildSitemapIndexXml produce valid Sitemap 0.9 XML', () => {
  const entries = generateCatalogSitemapEntries('https://gta6mod.community', 20);
  const urlsetXml = buildUrlSetXml(entries.slice(0, 5));
  assert.ok(urlsetXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(urlsetXml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  assert.ok(urlsetXml.includes('<loc>https://gta6mod.community/</loc>'));

  const shards = getSitemapShardsSummary(entries, 'https://gta6mod.community');
  const indexXml = buildSitemapIndexXml(shards);
  assert.ok(indexXml.includes('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  assert.ok(indexXml.includes('<loc>https://gta6mod.community/sitemap.xml?shard=1</loc>'));
});

test('filterSitemapEntries filters by shard, entityType, and search query', () => {
  const entries = generateCatalogSitemapEntries('https://gta6mod.community', 600);
  const creditsOnly = filterSitemapEntries(entries, { entityType: 'credit' });
  assert.ok(creditsOnly.length >= 6);
  assert.ok(creditsOnly.every((e) => e.entityType === 'credit'));

  const shard2Only = filterSitemapEntries(entries, { shardId: 2, limit: 100 });
  assert.ok(shard2Only.length > 0);
  assert.ok(shard2Only.every((e) => e.shardId === 2));
});

test('filterAndSortMods filters by category and search query deterministically', () => {
  const vehicles = filterAndSortMods(INITIAL_MODS, { category: 'vehicles' });
  assert.equal(vehicles.length, 2);
  assert.ok(vehicles.every((m) => m.category === 'vehicles'));

  const queryMatch = filterAndSortMods(INITIAL_MODS, { searchQuery: 'Cheetah' });
  assert.equal(queryMatch.length, 1);
  assert.equal(queryMatch[0].id, 'mod-cheetah-classic-86');
});

test('validateModSubmission enforces required fields and accepts valid input', () => {
  const invalid = validateModSubmission({
    title: 'abc',
    authorHandle: '',
    category: 'vehicles',
    version: 'bad',
    summary: 'too short',
    youtubeUrl: 'https://example.com/not-youtube',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.authorHandle);
  assert.ok(invalid.errors.version);
  assert.ok(invalid.errors.summary);
  assert.ok(invalid.errors.youtubeUrl);

  const valid = validateModSubmission({
    title: 'Vice Neon Palm Overhaul',
    authorHandle: '@PalmArtist',
    category: 'shaders',
    version: 'v1.2.0',
    summary: 'High-resolution palm frond subsurface scattering shader for Vice Beach.',
    youtubeUrl: 'https://www.youtube.com/watch?v=QdBZY2fkU-0',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
  assert.equal(createSlugFromTitle('Vice Neon Palm Overhaul!'), 'vice-neon-palm-overhaul');
});
