export interface Rug {
  id: string;
  name: string;
  nameHe: string;
  collection: 'AVANTGARDE' | 'URBAN' | 'TIMELESS';
  collectionHe: string;
  imageUrl: string;
  description?: string;
}

export interface DesignIteration {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: Date;
  baseRugId: string;
}

export interface TraceEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'request' | 'response' | 'error';
  message: string;
  data?: unknown;
}

export interface GenerationRequest {
  baseRugId: string;
  baseRugImageUrl: string;
  prompt: string;
  previousIterations?: DesignIteration[];
}

export interface GenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}
