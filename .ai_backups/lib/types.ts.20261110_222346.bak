export type ModCategory =
  | 'all'
  | 'vehicles'
  | 'shaders'
  | 'map-expansions'
  | 'characters'
  | 'scripts';

export interface ModItem {
  id: string;
  slug: string;
  title: string;
  category: Exclude<ModCategory, 'all'>;
  categoryLabel: string;
  version: string;
  authorHandle: string;
  authorRole: string;
  downloadsCount: number;
  rating: number;
  fileSizeMb: number;
  updatedAt: string;
  summary: string;
  technicalNotes: string[];
  compatibility: string;
  accentGradient: string;
  artworkTheme: 'muscle-car' | 'neon-skyline' | 'vice-beach' | 'ocean-drive' | 'everglades' | 'penthouse';
  imageUrl?: string;
  featuredInMosaic?: boolean;
}

export interface YoutubeGameplayVideo {
  id: string;
  youtubeId: string;
  title: string;
  channelName: string;
  channelUrl: string;
  publishedDate: string;
  duration: string;
  viewsLabel: string;
  category: 'Official Trailer' | 'Graphics Mod Concept' | 'Gameplay Breakdown' | 'Map Reconstruction';
  summary: string;
  highlights: string[];
  nonAffiliationNote: string;
}

export interface CreatorCredit {
  id: string;
  handle: string;
  displayName: string;
  specialty: 'Shader Architecture' | 'Vehicle Modeling' | 'World & Map Design' | 'Script Hook & API' | 'YouTube Gameplay & Media';
  primaryContribution: string;
  modsPublished: number;
  totalDownloads: string;
  verifiedBuilds: string;
  profileSlug: string;
  attributionLicense: string;
}

export interface ModSubmissionInput {
  title: string;
  authorHandle: string;
  category: Exclude<ModCategory, 'all'>;
  version: string;
  summary: string;
  youtubeUrl?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export type SitemapEntityType = 'core' | 'mod' | 'category' | 'credit' | 'gameplay';

export interface SitemapUrlEntry {
  loc: string;
  path: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  priority: string;
  entityType: SitemapEntityType;
  shardId: number;
  title: string;
}

export interface SitemapShardInfo {
  shardId: number;
  label: string;
  entityType: SitemapEntityType | 'mixed';
  urlCount: number;
  samplePath: string;
  xmlEndpoint: string;
}
