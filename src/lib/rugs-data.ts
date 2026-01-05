import { Rug } from '@/types';

// CDN base URL for Rugs & Co images
const CDN_BASE = 'https://cdn.prod.website-files.com/681739fbf98c4d5139d2b8ac';

// Rug catalog with actual product images from rugsandco.com
export const rugsData: Rug[] = [
  // TIMELESS Collection
  {
    id: 'aurum',
    name: 'Aurum',
    nameHe: 'אורום',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: `${CDN_BASE}/6864c80002c7f307a74ccb0b_AURUM.jpg`,
    description: 'Golden elegance with timeless appeal'
  },
  {
    id: 'heirloom',
    name: 'Heirloom',
    nameHe: 'מורשת',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: `${CDN_BASE}/686cd17f86ba0bad9f274370_Heirloom.jpg`,
    description: 'Classic patterns passed through generations'
  },
  {
    id: 'legacy',
    name: 'Legacy',
    nameHe: 'לגסי',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: `${CDN_BASE}/686cd2cbe09ea66b3f1af875_Legacy.jpg`,
    description: 'Enduring design with historical roots'
  },
  {
    id: 'sonnet',
    name: 'Sonnet',
    nameHe: 'סונטה',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: `${CDN_BASE}/686cd475721453bca1fd6f65_Sonnet.jpg`,
    description: 'Poetic patterns woven with precision'
  },
  {
    id: 'mythos',
    name: 'Mythos',
    nameHe: 'מיתוס',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: `${CDN_BASE}/686cd6c57c01413b8eda03b6_Mythos.jpg`,
    description: 'Legendary designs inspired by ancient tales'
  },
  // AVANTGARDE Collection
  {
    id: 'bloom',
    name: 'Bloom',
    nameHe: 'פריחה',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: `${CDN_BASE}/6857df55b544c5dc141fa734_Bloom.jpg`,
    description: 'Abstract floral explosions in vibrant hues'
  },
  {
    id: 'echo',
    name: 'Echo',
    nameHe: 'הד',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: `${CDN_BASE}/68581589e7249631190ccc57_Echo.jpg`,
    description: 'Repeating geometric forms creating visual depth'
  },
  {
    id: 'drift',
    name: 'Drift',
    nameHe: 'סחף',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: `${CDN_BASE}/6857f8566cbdb552661c5786_Drift.jpg`,
    description: 'Flowing organic shapes in motion'
  },
  {
    id: 'wave',
    name: 'Wave',
    nameHe: 'גל',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: `${CDN_BASE}/685828862679f68695e06b61_WAVE.jpg`,
    description: 'Dynamic wave patterns capturing movement'
  },
  {
    id: 'luna',
    name: 'Luna',
    nameHe: 'לונה',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: `${CDN_BASE}/68581c00d56df63380c52ca2_Luna.jpg`,
    description: 'Celestial-inspired circular motifs'
  },
  // URBAN Collection
  {
    id: 'sterling',
    name: 'Sterling',
    nameHe: 'סטרלינג',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: `${CDN_BASE}/685b76383c961c77e61873f6_Sterling.jpg`,
    description: 'Sophisticated metallic-inspired geometric patterns'
  },
  {
    id: 'brixton',
    name: 'Brixton',
    nameHe: 'בריקסטון',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: `${CDN_BASE}/685b698371d30aedba2e4bf1_Brixton.jpg`,
    description: 'Industrial-chic patterns with urban edge'
  },
  {
    id: 'harlow',
    name: 'Harlow',
    nameHe: 'הארלו',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: `${CDN_BASE}/685b6e042aea11bf4e217835_Harlow.jpg`,
    description: 'Art deco influences with modern sensibility'
  },
  {
    id: 'dalston',
    name: 'Dalston',
    nameHe: 'דלסטון',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: `${CDN_BASE}/685b6be9994f158feadd7009_Dalston.jpg`,
    description: 'Contemporary street-inspired aesthetics'
  },
  {
    id: 'astor',
    name: 'Astor',
    nameHe: 'אסטור',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: `${CDN_BASE}/685b68ca4d36734dd53ef944_Astor.jpg`,
    description: 'Classic elegance meets metropolitan style'
  }
];

export const getRugById = (id: string): Rug | undefined => {
  return rugsData.find(rug => rug.id === id);
};

export const getRugsByCollection = (collection: Rug['collection']): Rug[] => {
  return rugsData.filter(rug => rug.collection === collection);
};

// Collection data with preview images from rugsandco.com
export const collections = [
  {
    id: 'TIMELESS' as const,
    name: 'Timeless',
    nameHe: 'נצחי',
    imageUrl: `${CDN_BASE}/6857850d26a66756e3fd9b65_TIMLESS.png`
  },
  {
    id: 'AVANTGARDE' as const,
    name: 'Avantgarde',
    nameHe: 'אוונגרד',
    imageUrl: `${CDN_BASE}/685784f6eb593077d126c868_AVANTGARDE_COLLECTION.png`
  },
  {
    id: 'URBAN' as const,
    name: 'Urban',
    nameHe: 'אורבני',
    imageUrl: `${CDN_BASE}/6857850401201c61d762d8a0_URBAN_COLLECTION.png`
  }
];

export type PatternType = 'circles' | 'waves' | 'geometric' | 'organic' | 'lines';

// Get pattern type based on rug id for visual variety (used as fallback)
export const getRugPattern = (id: string): PatternType => {
  const patterns: Record<string, PatternType> = {
    'aurum': 'circles',
    'heirloom': 'organic',
    'legacy': 'waves',
    'sonnet': 'lines',
    'mythos': 'geometric',
    'bloom': 'organic',
    'echo': 'geometric',
    'drift': 'waves',
    'wave': 'waves',
    'luna': 'circles',
    'sterling': 'lines',
    'brixton': 'geometric',
    'harlow': 'geometric',
    'dalston': 'lines',
    'astor': 'geometric'
  };
  return patterns[id] || 'circles';
};
