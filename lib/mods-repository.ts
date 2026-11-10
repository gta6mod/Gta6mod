import {
  CreatorCredit,
  ModCategory,
  ModItem,
  ModSubmissionInput,
  SitemapUrlEntry,
  ValidationResult,
  YoutubeGameplayVideo,
} from './types';

export const GENERATED_VI_ASSETS = {
  heroKeyArt: '/assets/scraped-vi/high_res_photos/poster_full.0az_iud2g3y4j.jpg',
  supercarMod: '/assets/scraped-vi/high_res_photos/asset_142.jpg',
  rtgiShaderMod: '/assets/scraped-vi/high_res_photos/asset_150.jpg',
  starfishEstateMod: '/assets/scraped-vi/high_res_photos/asset_141.jpg',
};

export const OFFICIAL_VI_ASSETS = {
  heroPoster: '/assets/scraped-vi/high_res_photos/poster_full.0az_iud2g3y4j.jpg',
  logoVi: '/assets/scraped-vi/high_res_photos/logo_vi.02gnpy7k4ozcz.png',
  logoGta: '/assets/scraped-vi/high_res_photos/logo_gta.0_~y3s2ni8fbj.png',
  ps5Badge: '/assets/scraped-vi/high_res_photos/PBOPS5_badge_h_en_GB.0mdk5n0snqy6v.svg',
  vintagePack: '/assets/scraped-vi/high_res_photos/VINTAGE_VICE_CITY_PACK_01.05zaof7o1uz.3.jpg',
  ultimateEdition: '/assets/scraped-vi/high_res_photos/ultimate_desktop_en_us.0~shc~hnjifzu.jpg',
  merchBox: '/assets/scraped-vi/high_res_photos/GTAVI_Merch_PromoCard.0_k5n2lk~h9h~.jpg',
  musicRadio: '/assets/scraped-vi/high_res_photos/musicDesktop.0zwcbzhynnsc-.jpg',
  onlyInLeonida: '/assets/scraped-vi/high_res_photos/onlyInLeonidaDesktop.15y2n40f3axwo.jpg',
  extendedLook: '/assets/scraped-vi/high_res_photos/an-extended-look.0zw.9~1j0ne~4.jpg',
  preLoad: '/assets/scraped-vi/high_res_photos/pre-load.0~7aq~08y784d.jpg',
  screenshots4k: [
    { id: 'shot-1', title: 'Vice Beach Golden Hour & Boardwalk', url: '/assets/scraped-vi/high_res_photos/asset_150.jpg', category: 'Vice Beach' },
    { id: 'shot-2', title: 'Classic Muscle Car Coastal Highway Cruise', url: '/assets/scraped-vi/high_res_photos/asset_142.jpg', category: 'Vehicles' },
    { id: 'shot-3', title: 'Ocean Drive Art Deco Neon Reflections', url: '/assets/scraped-vi/high_res_photos/asset_145.jpg', category: 'Nightlife' },
    { id: 'shot-4', title: 'Starfish Island Waterfront Compound', url: '/assets/scraped-vi/high_res_photos/asset_141.jpg', category: 'Architecture' },
    { id: 'shot-5', title: 'Downtown Vice High-Rise Twilight Skyline', url: '/assets/scraped-vi/high_res_photos/asset_153.jpg', category: 'Skyline' },
    { id: 'shot-6', title: 'Grassrivers Wetlands Wildlife & Airboat', url: '/assets/scraped-vi/high_res_photos/asset_133.jpg', category: 'Everglades' },
    { id: 'shot-7', title: 'Port Gellhorn Industrial Docks & Shipping', url: '/assets/scraped-vi/high_res_photos/asset_138.jpg', category: 'Port Gellhorn' },
    { id: 'shot-8', title: 'Jason & Lucia Convenience Store Heist Getaway', url: '/assets/scraped-vi/high_res_photos/asset_129.jpg', category: 'Protagonists' },
    { id: 'shot-9', title: 'Neon Club Strip & Custom Lowriders', url: '/assets/scraped-vi/high_res_photos/asset_144.jpg', category: 'Street Culture' },
    { id: 'shot-10', title: 'Leonida Keys Overseas Highway Sunset', url: '/assets/scraped-vi/high_res_photos/asset_128.jpg', category: 'Leonida Keys' },
    { id: 'shot-11', title: 'Vice City Marina & Superyacht Basin', url: '/assets/scraped-vi/high_res_photos/asset_154.jpg', category: 'Marina' },
    { id: 'shot-12', title: 'Vice Police Interceptor Night Patrol', url: '/assets/scraped-vi/high_res_photos/asset_140.jpg', category: 'Law Enforcement' },
  ],
};

export const MOD_CATEGORIES: { id: ModCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Mods', count: 4280 },
  { id: 'vehicles', label: 'Vehicles & Customs', count: 1420 },
  { id: 'shaders', label: 'Graphics & Shaders', count: 680 },
  { id: 'map-expansions', label: 'Vice City Map', count: 590 },
  { id: 'characters', label: 'Character Outfits', count: 840 },
  { id: 'scripts', label: 'Scripts & Physics', count: 750 },
];

export const INITIAL_MODS: ModItem[] = [
  {
    id: 'mod-vice-rtgi-ultra',
    slug: 'vice-city-sunset-rtgi-path-tracer',
    title: 'Leonida Sunset RTGI Path-Tracing Preset',
    category: 'shaders',
    categoryLabel: 'Graphics & Shaders',
    version: 'v2.4.1',
    authorHandle: '@NeonVortexFX',
    authorRole: 'Lead Shader Architect',
    downloadsCount: 184920,
    rating: 4.9,
    fileSizeMb: 412,
    updatedAt: '2026-11-04',
    summary:
      'Calibrates volumetric tropical twilight, wet asphalt neon reflections along Ocean Drive, and physically based atmospheric scattering.',
    technicalNotes: [
      'Full-spectrum global illumination LUT tuned for Vice Beach golden hour',
      'Zero-ghosting temporal reflections on wet coastal highways',
      'Includes performance profiles for 1440p and 4K Ultra viewports',
    ],
    compatibility: 'RAGE 9 Shader Pipeline / ReShade 6.2+',
    accentGradient: 'from-[#FF2A85] via-[#A855F7] to-[#3B0764]',
    artworkTheme: 'neon-skyline',
    imageUrl: GENERATED_VI_ASSETS.rtgiShaderMod,
    featuredInMosaic: true,
  },
  {
    id: 'mod-cheetah-classic-86',
    slug: 'grotti-cheetah-vice-widebody-custom',
    title: '1986 Vice Cheetah Twin-Turbo Widebody Pack',
    category: 'vehicles',
    categoryLabel: 'Vehicles & Customs',
    version: 'v1.8.0',
    authorHandle: '@MatteWorks3D',
    authorRole: 'Senior Vehicle Artist',
    downloadsCount: 152300,
    rating: 4.9,
    fileSizeMb: 285,
    updatedAt: '2026-11-08',
    summary:
      'High-poly 140k-triangle classic wedge supercar with pop-up halogen headlights, louvered rear deck, and 18 customizable livery trims.',
    technicalNotes: [
      'Scratch-built 4K PBR interior upholstery with working analog digital dash',
      'Custom twin-turbo blow-off acoustics and realistic suspension travel',
      'Full deformation mesh and LOD0–LOD4 optimization',
    ],
    compatibility: 'Vehicle Streamer v3.1 / Add-On & Replace',
    accentGradient: 'from-[#FF7A28] via-[#FF2A85] to-[#4C0519]',
    artworkTheme: 'muscle-car',
    imageUrl: GENERATED_VI_ASSETS.supercarMod,
    featuredInMosaic: true,
  },
  {
    id: 'mod-ocean-drive-penthouse',
    slug: 'starfish-island-syndicate-estate-interior',
    title: 'Starfish Island Waterfront Estate & Heli-Pad',
    category: 'map-expansions',
    categoryLabel: 'Vice City Map',
    version: 'v3.0.2',
    authorHandle: '@LeonidaArchitect',
    authorRole: 'World Environment Builder',
    downloadsCount: 119450,
    rating: 4.8,
    fileSizeMb: 890,
    updatedAt: '2026-11-01',
    summary:
      'Seamless open-interior Art Deco mansion on Starfish Island featuring a subterranean speedboat dock, glass garage, and dynamic party lighting.',
    technicalNotes: [
      'Custom occlusion portals ensuring zero frame drops when entering from street',
      'Interactive garage lifts supporting up to 12 custom vehicles',
      'Dynamic night-cycle neon architectural trim synced to weather state',
    ],
    compatibility: 'Leonida Map Loader v2.0+',
    accentGradient: 'from-[#EC4899] via-[#7E22CE] to-[#1E1B4B]',
    artworkTheme: 'penthouse',
    imageUrl: GENERATED_VI_ASSETS.starfishEstateMod,
    featuredInMosaic: true,
  },
  {
    id: 'mod-everglades-airboat-physics',
    slug: 'grassrivers-wetlands-hydro-physics-overhaul',
    title: 'Grassrivers Wetlands Hydro & Airboat Physics',
    category: 'scripts',
    categoryLabel: 'Scripts & Physics',
    version: 'v1.5.4',
    authorHandle: '@DeltaScriptDev',
    authorRole: 'Physics & C# Systems Engineer',
    downloadsCount: 94800,
    rating: 4.8,
    fileSizeMb: 64,
    updatedAt: '2026-10-29',
    summary:
      'Rebuilds shallow-water mud drag, airboat rudder thrust vectoring, and swamp foliage displacement across the Grassrivers sector.',
    technicalNotes: [
      'Real-time hull planing math based on throttle and water depth',
      'Mud splatter accumulation shader mask on vehicle fenders',
      'Configurable controller force-feedback curves',
    ],
    compatibility: 'ScriptHookVI Community Preview',
    accentGradient: 'from-[#F59E0B] via-[#D946EF] to-[#2E1065]',
    artworkTheme: 'everglades',
    imageUrl: GENERATED_VI_ASSETS.rtgiShaderMod,
    featuredInMosaic: true,
  },
  {
    id: 'mod-lucia-jason-tactical-wardrobe',
    slug: 'vice-syndicate-heist-wardrobe-collection',
    title: 'Vice Syndicate Heist & Streetwear Wardrobe (80+ Pieces)',
    category: 'characters',
    categoryLabel: 'Character Outfits',
    version: 'v2.1.0',
    authorHandle: '@AtelierVice',
    authorRole: 'Cloth Simulation & Character Artist',
    downloadsCount: 138600,
    rating: 4.9,
    fileSizeMb: 520,
    updatedAt: '2026-11-06',
    summary:
      'Cloth-simulated pastel linen suits, tactical armored vests, retro Vice sunglasses, and custom heist masks with zero clipping.',
    technicalNotes: [
      '4K weave normal maps for linen, distressed leather, and ballistic nylon',
      'Physics-enabled jacket lapels and gold chain accessories',
      'Full wardrobe menu integration with outfit preset saving',
    ],
    compatibility: 'Character Streamer v1.9+',
    accentGradient: 'from-[#FF2A85] via-[#9333EA] to-[#1E1B4B]',
    artworkTheme: 'vice-beach',
    imageUrl: GENERATED_VI_ASSETS.starfishEstateMod,
    featuredInMosaic: true,
  },
  {
    id: 'mod-tulip-muscle-charger',
    slug: 'declasse-tulip-72-drag-strip-custom',
    title: '1972 Declasse Tulip Street-King Muscle Pack',
    category: 'vehicles',
    categoryLabel: 'Vehicles & Customs',
    version: 'v1.3.2',
    authorHandle: '@TorqueFoundry',
    authorRole: 'Automotive Modeler',
    downloadsCount: 87410,
    rating: 4.7,
    fileSizeMb: 310,
    updatedAt: '2026-10-24',
    summary:
      'Iconic hero car recreation inspired by the Leonida promotional artwork, complete with oxidised sun-baked paint options and supercharger whine.',
    technicalNotes: [
      'Authentic V8 idle shake and rear-axle torque twist under launch',
      '24 modular parts including hood scoops, roll cages, and drag radials',
      'Supports two-tone sunset metallic pearlescent shaders',
    ],
    compatibility: 'Vehicle Streamer v3.1 / Add-On',
    accentGradient: 'from-[#FBBF24] via-[#FF2A85] to-[#3B0764]',
    artworkTheme: 'ocean-drive',
    imageUrl: GENERATED_VI_ASSETS.heroKeyArt,
    featuredInMosaic: true,
  },
];

export const YOUTUBE_GAMEPLAY_VIDEOS: YoutubeGameplayVideo[] = [
  {
    id: 'yt-rockstar-trailer-1',
    youtubeId: 'QdBZY2fkU-0',
    title: 'Grand Theft Auto VI – Official Trailer 1 (4K 60FPS Frame Analysis)',
    channelName: 'Rockstar Games (Official Feed Embed)',
    channelUrl: 'https://www.youtube.com/watch?v=QdBZY2fkU-0',
    publishedDate: 'Dec 2023',
    duration: '01:31',
    viewsLabel: '225M+ Views on YouTube',
    category: 'Official Trailer',
    summary:
      'The official reveal of Leonida and Vice City showcasing Lucia and Jason, volumetric cloud lighting, dense beach crowds, and muscle car street culture.',
    highlights: [
      '0:18 – Volumetric golden-hour lighting across Vice Beach coastline',
      '0:42 – High-density vehicle traffic & custom lowrider paint shaders',
      '0:58 – Grassrivers wetlands airboat & wildlife ecosystem simulation',
    ],
    nonAffiliationNote:
      'Embedded directly from YouTube for community reference. Gta6mod is an independent fan index and is not affiliated with Rockstar Games or GTA 6.',
  },
  {
    id: 'yt-vice-graphics-concept',
    youtubeId: 'K-3pU6N4A7A',
    title: 'GTA 6 Concept Gameplay – Ultra Photorealistic Leonida Sunset RTGI',
    channelName: 'Community Next-Gen Mod Showcase',
    channelUrl: 'https://www.youtube.com/results?search_query=gta+6+gameplay+graphics+mod+concept',
    publishedDate: 'Oct 2026',
    duration: '08:14',
    viewsLabel: '4.2M+ Views on YouTube',
    category: 'Graphics Mod Concept',
    summary:
      'Community Next-Gen engine reconstruction demonstrating how path-traced neon reflections, rain puddles, and custom atmospheric LUTs transform Ocean Drive at night.',
    highlights: [
      '1:12 – Real-time ray-traced neon signage reflection test on wet asphalt',
      '3:45 – Custom 1986 Vice Cheetah cockpit camera in heavy tropical storm',
      '6:20 – Shader comparison: Default LUT vs. Leonida Sunset RTGI v2.4',
    ],
    nonAffiliationNote:
      'Community-created modding demonstration hosted on YouTube. Not official Rockstar Games footage; Gta6mod is not affiliated with Take-Two Interactive.',
  },
  {
    id: 'yt-leonida-map-reconstruction',
    youtubeId: '7fM2_3c4w7M',
    title: 'Leonida & Vice City Open-World Map Mod Reconstruction Tour',
    channelName: 'Vice Mapping Collective',
    channelUrl: 'https://www.youtube.com/results?search_query=gta+6+vice+city+map+mod+gameplay',
    publishedDate: 'Nov 2026',
    duration: '12:40',
    viewsLabel: '1.9M+ Views on YouTube',
    category: 'Map Reconstruction',
    summary:
      'Full highway flythrough of the community-built Leonida coastline, Port Gellhorn industrial docks, and Starfish Island waterfront estates.',
    highlights: [
      '0:50 – Venetian Causeway & Starfish Island drawbridge traffic flow',
      '5:15 – Port Gellhorn street racing circuit & drift physics showcase',
      '9:30 – Keys overseas highway sunset drive at 120 FPS',
    ],
    nonAffiliationNote:
      'Independent community map modding showcase uploaded to YouTube. Gta6mod is strictly unofficial and unaffiliated with GTA 6.',
  },
];

export const INITIAL_CREDITS: CreatorCredit[] = [
  {
    id: 'cred-1',
    handle: '@NeonVortexFX',
    displayName: 'Elena Vance (NeonVortex)',
    specialty: 'Shader Architecture',
    primaryContribution: 'Leonida Sunset RTGI Path-Tracing LUT & Wet Road SSR Pipeline',
    modsPublished: 14,
    totalDownloads: '640.5K',
    verifiedBuilds: 'v2.4.1 Stable',
    profileSlug: '/credits/neonvortexfx',
    attributionLicense: 'CC BY-NC-SA 4.0',
  },
  {
    id: 'cred-2',
    handle: '@MatteWorks3D',
    displayName: 'Marcus Sterling',
    specialty: 'Vehicle Modeling',
    primaryContribution: '1986 Vice Cheetah Widebody & Classic Muscle Chassis Rigging',
    modsPublished: 28,
    totalDownloads: '1.12M',
    verifiedBuilds: 'v1.8.0 Verified',
    profileSlug: '/credits/matteworks3d',
    attributionLicense: 'OpenMod Attribution v2',
  },
  {
    id: 'cred-3',
    handle: '@LeonidaArchitect',
    displayName: 'Carlos Rivera',
    specialty: 'World & Map Design',
    primaryContribution: 'Starfish Island Open-Interior Estates & Ocean Drive Art Deco Trim',
    modsPublished: 9,
    totalDownloads: '410.2K',
    verifiedBuilds: 'v3.0.2 Stable',
    profileSlug: '/credits/leonidaarchitect',
    attributionLicense: 'CC BY 4.0',
  },
  {
    id: 'cred-4',
    handle: '@DeltaScriptDev',
    displayName: 'Sora Takahashi',
    specialty: 'Script Hook & API',
    primaryContribution: 'Grassrivers Hydroplaning Physics & Core Sitemap Indexer CLI',
    modsPublished: 19,
    totalDownloads: '890.0K',
    verifiedBuilds: 'v1.5.4 Verified',
    profileSlug: '/credits/deltascriptdev',
    attributionLicense: 'MIT Open Source',
  },
  {
    id: 'cred-5',
    handle: '@AtelierVice',
    displayName: 'Chloe Moreau',
    specialty: 'World & Map Design',
    primaryContribution: 'Vice Syndicate Cloth-Simulated Wardrobe & Character Textures',
    modsPublished: 22,
    totalDownloads: '530.8K',
    verifiedBuilds: 'v2.1.0 Stable',
    profileSlug: '/credits/ateliervice',
    attributionLicense: 'CC BY-NC 4.0',
  },
  {
    id: 'cred-6',
    handle: '@ViceMediaArchive',
    displayName: 'Vice Gameplay & Trailer Analysis Crew',
    specialty: 'YouTube Gameplay & Media',
    primaryContribution: '4K 60FPS Frame-by-Frame YouTube Gameplay Breakdowns & Shader Comparisons',
    modsPublished: 31,
    totalDownloads: '2.40M Views',
    verifiedBuilds: 'YouTube Verified Partner',
    profileSlug: '/credits/vicemediaarchive',
    attributionLicense: 'Fair Use / Creator Attribution',
  },
];

export function filterAndSortMods(
  mods: ModItem[],
  options: {
    category?: ModCategory;
    searchQuery?: string;
    sortBy?: 'downloads' | 'rating' | 'newest';
  }
): ModItem[] {
  const { category = 'all', searchQuery = '', sortBy = 'downloads' } = options;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = mods.filter((mod) => {
    const matchesCategory = category === 'all' || mod.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;
    return (
      mod.title.toLowerCase().includes(normalizedQuery) ||
      mod.summary.toLowerCase().includes(normalizedQuery) ||
      mod.authorHandle.toLowerCase().includes(normalizedQuery) ||
      mod.categoryLabel.toLowerCase().includes(normalizedQuery)
    );
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating || b.downloadsCount - a.downloadsCount;
    }
    if (sortBy === 'newest') {
      return b.updatedAt.localeCompare(a.updatedAt);
    }
    return b.downloadsCount - a.downloadsCount;
  });
}

export function validateModSubmission(input: ModSubmissionInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.title || input.title.trim().length < 5) {
    errors.title = 'Mod title must be at least 5 characters.';
  }

  const trimmedHandle = (input.authorHandle || '').trim();
  if (!trimmedHandle || trimmedHandle.length < 3) {
    errors.authorHandle = 'Creator handle is required (e.g. @ViceBuilder).';
  }

  if (!input.version || !/^v?\d+\.\d+(\.\d+)?$/i.test(input.version.trim())) {
    errors.version = 'Enter a semantic version such as v1.0.0.';
  }

  if (!input.summary || input.summary.trim().length < 15) {
    errors.summary = 'Please provide a summary of at least 15 characters.';
  }

  if (input.youtubeUrl && input.youtubeUrl.trim().length > 0) {
    const yt = input.youtubeUrl.trim();
    if (!yt.includes('youtube.com/') && !yt.includes('youtu.be/')) {
      errors.youtubeUrl = 'Optional video link must be a valid YouTube URL.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function buildDynamicModAndSitemapObjects(
  input: ModSubmissionInput,
  baseUrl = 'https://gta6mod.community'
): {
  mod: ModItem;
  credit: CreatorCredit;
  sitemapEntry: SitemapUrlEntry;
} {
  const slug = createSlugFromTitle(input.title);
  const catMeta = MOD_CATEGORIES.find((c) => c.id === input.category);
  const cleanHandle = input.authorHandle.trim().startsWith('@')
    ? input.authorHandle.trim()
    : `@${input.authorHandle.trim()}`;

  const mod: ModItem = {
    id: `mod-custom-${slug}`,
    slug,
    title: input.title.trim(),
    category: input.category,
    categoryLabel: catMeta?.label || 'Vehicles & Customs',
    version: input.version.trim(),
    authorHandle: cleanHandle,
    authorRole: 'Community Mod Contributor',
    downloadsCount: 1,
    rating: 5.0,
    fileSizeMb: 195,
    updatedAt: '2026-11-10',
    summary: input.summary.trim(),
    technicalNotes: [
      'Dynamically registered page and indexed in live /sitemap.xml Shard 01',
      input.youtubeUrl
        ? `Includes linked YouTube showcase: ${input.youtubeUrl.trim()}`
        : 'Compatible with standard RAGE 9 community mod loader',
    ],
    compatibility: 'Community Mod Loader v2.0+',
    accentGradient: 'from-[#FACC15] via-[#FF2A85] to-[#3B0764]',
    artworkTheme:
      input.category === 'shaders'
        ? 'neon-skyline'
        : input.category === 'map-expansions'
        ? 'penthouse'
        : 'muscle-car',
    imageUrl:
      input.category === 'shaders'
        ? GENERATED_VI_ASSETS.rtgiShaderMod
        : input.category === 'map-expansions'
        ? GENERATED_VI_ASSETS.starfishEstateMod
        : GENERATED_VI_ASSETS.supercarMod,
  };

  const credit: CreatorCredit = {
    id: `cred-custom-${slug}`,
    handle: cleanHandle,
    displayName: cleanHandle.replace('@', ''),
    specialty:
      input.category === 'shaders'
        ? 'Shader Architecture'
        : input.category === 'vehicles'
        ? 'Vehicle Modeling'
        : input.category === 'scripts'
        ? 'Script Hook & API'
        : 'World & Map Design',
    primaryContribution: `${input.title.trim()} (${input.version.trim()})`,
    modsPublished: 1,
    totalDownloads: 'New Release',
    verifiedBuilds: `${input.version.trim()} Indexed`,
    profileSlug: `/credits/${createSlugFromTitle(cleanHandle)}`,
    attributionLicense: 'CC BY-NC-SA 4.0',
  };

  const normalizedBase = baseUrl.replace(/\/+$/, '');
  const path = `/mods/${input.category}/${slug}`;

  const sitemapEntry: SitemapUrlEntry = {
    loc: `${normalizedBase}${path}`,
    path,
    lastmod: '2026-11-10',
    changefreq: 'daily',
    priority: '0.9',
    entityType: 'mod',
    shardId: 1,
    title: `${input.title.trim()} (${input.version.trim()})`,
  };

  return { mod, credit, sitemapEntry };
}
