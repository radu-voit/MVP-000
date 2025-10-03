// Upload Types
export interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

export interface UploadConfig {
  maxFileSize?: number;
  allowedTypes?: string[];
  multiple?: boolean;
  endpoint?: string;
  headers?: Record<string, string>;
}

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';
