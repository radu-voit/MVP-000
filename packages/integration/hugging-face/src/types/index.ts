// Hugging Face Types
export interface HuggingFaceConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export interface ModelInfo {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  downloads: number;
  likes: number;
}

export interface InferenceRequest {
  model: string;
  inputs: string | string[];
  parameters?: {
    max_length?: number;
    temperature?: number;
    top_p?: number;
    top_k?: number;
  };
}

export interface InferenceResponse {
  generated_text: string;
  score?: number;
}

export type ModelTask = 'text-generation' | 'text-classification' | 'question-answering' | 'summarization' | 'translation';
