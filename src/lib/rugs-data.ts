import { Rug } from '@/types';

// Sample rug catalog data - using placeholder images
// In production, these would be actual product images from the Rugs&Co CDN
export const rugsData: Rug[] = [
  // TIMELESS Collection
  {
    id: 'lunar-harmony',
    name: 'Lunar Harmony',
    nameHe: 'הרמוניה ירחית',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: '/rugs/timeless-1.jpg',
    description: 'A harmonious blend of circular patterns inspired by the moon'
  },
  {
    id: 'stone-cluster',
    name: 'Stone Cluster',
    nameHe: 'מקבץ אבנים',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: '/rugs/timeless-2.jpg',
    description: 'Organic stone-like formations creating natural texture'
  },
  {
    id: 'sanded-waves',
    name: 'Sanded Waves',
    nameHe: 'גלי חול',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: '/rugs/timeless-3.jpg',
    description: 'Flowing wave patterns reminiscent of desert dunes'
  },
  {
    id: 'golden-palm',
    name: 'Golden Palm Weave',
    nameHe: 'קליעת דקל זהובה',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: '/rugs/timeless-4.jpg',
    description: 'Intricate palm-inspired weaving in golden tones'
  },
  {
    id: 'aurora-fade',
    name: 'Aurora Fade',
    nameHe: 'דהיית זוהר',
    collection: 'TIMELESS',
    collectionHe: 'נצחי',
    imageUrl: '/rugs/timeless-5.jpg',
    description: 'Gradient transitions inspired by the northern lights'
  },
  // AVANTGARDE Collection
  {
    id: 'ocean',
    name: 'Ocean',
    nameHe: 'אוקיינוס',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: '/rugs/avantgarde-1.jpg',
    description: 'Deep blue waves capturing the essence of the sea'
  },
  {
    id: 'nova',
    name: 'Nova',
    nameHe: 'נובה',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: '/rugs/avantgarde-2.jpg',
    description: 'Explosive stellar patterns in bold colors'
  },
  {
    id: 'echo',
    name: 'Echo',
    nameHe: 'הד',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: '/rugs/avantgarde-3.jpg',
    description: 'Repeating geometric forms creating visual depth'
  },
  {
    id: 'bloom',
    name: 'Bloom',
    nameHe: 'פריחה',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: '/rugs/avantgarde-4.jpg',
    description: 'Abstract floral explosions in vibrant hues'
  },
  {
    id: 'drift',
    name: 'Drift',
    nameHe: 'סחף',
    collection: 'AVANTGARDE',
    collectionHe: 'אוונגרד',
    imageUrl: '/rugs/avantgarde-5.jpg',
    description: 'Flowing organic shapes in motion'
  },
  // URBAN Collection
  {
    id: 'sterling',
    name: 'Sterling',
    nameHe: 'סטרלינג',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: '/rugs/urban-1.jpg',
    description: 'Sophisticated metallic-inspired geometric patterns'
  },
  {
    id: 'brixton',
    name: 'Brixton',
    nameHe: 'בריקסטון',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: '/rugs/urban-2.jpg',
    description: 'Industrial-chic patterns with urban edge'
  },
  {
    id: 'harlow',
    name: 'Harlow',
    nameHe: 'הארלו',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: '/rugs/urban-3.jpg',
    description: 'Art deco influences with modern sensibility'
  },
  {
    id: 'dalston',
    name: 'Dalston',
    nameHe: 'דלסטון',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: '/rugs/urban-4.jpg',
    description: 'Contemporary street-inspired aesthetics'
  },
  {
    id: 'astor',
    name: 'Astor',
    nameHe: 'אסטור',
    collection: 'URBAN',
    collectionHe: 'אורבני',
    imageUrl: '/rugs/urban-5.jpg',
    description: 'Classic elegance meets metropolitan style'
  }
];

export const getRugById = (id: string): Rug | undefined => {
  return rugsData.find(rug => rug.id === id);
};

export const getRugsByCollection = (collection: Rug['collection']): Rug[] => {
  return rugsData.filter(rug => rug.collection === collection);
};

export const collections = [
  { id: 'TIMELESS' as const, name: 'Timeless', nameHe: 'נצחי' },
  { id: 'AVANTGARDE' as const, name: 'Avantgarde', nameHe: 'אוונגרד' },
  { id: 'URBAN' as const, name: 'Urban', nameHe: 'אורבני' }
];

export type PatternType = 'circles' | 'waves' | 'geometric' | 'organic' | 'lines';

// Get pattern type based on rug id for visual variety
export const getRugPattern = (id: string): PatternType => {
  const patterns: Record<string, PatternType> = {
    'lunar-harmony': 'circles',
    'stone-cluster': 'organic',
    'sanded-waves': 'waves',
    'golden-palm': 'lines',
    'aurora-fade': 'waves',
    'ocean': 'waves',
    'nova': 'circles',
    'echo': 'geometric',
    'bloom': 'organic',
    'drift': 'waves',
    'sterling': 'lines',
    'brixton': 'geometric',
    'harlow': 'geometric',
    'dalston': 'lines',
    'astor': 'geometric'
  };
  return patterns[id] || 'circles';
};
