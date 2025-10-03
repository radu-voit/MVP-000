// Google Types
export interface GoogleConfig {
  projectId: string;
  credentials?: string;
  keyFilename?: string;
}

export interface StorageBucket {
  name: string;
  location: string;
  storageClass: string;
  createdAt: Date;
}

export interface TranslationRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

export interface TranslationResponse {
  translatedText: string;
  detectedSourceLanguage?: string;
  confidence?: number;
}

export interface VisionAnalysis {
  labels: Array<{
    description: string;
    score: number;
  }>;
  faces?: Array<{
    joy: number;
    sorrow: number;
    anger: number;
    surprise: number;
  }>;
  text?: string;
}
