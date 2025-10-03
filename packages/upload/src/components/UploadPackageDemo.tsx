import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X, File, Image, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

// File Upload Component
const FileUpload: React.FC<{
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}> = ({ onFilesSelected, accept, multiple = true }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onFilesSelected(files);
  }, [onFilesSelected]);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragOver 
          ? 'border-primary bg-primary/5' 
          : 'border-muted-foreground/25 hover:border-primary/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Drop files here or click to browse</h3>
        <p className="text-sm text-muted-foreground">
          {accept ? `Accepted formats: ${accept}` : 'All file types accepted'}
        </p>
        <p className="text-sm text-muted-foreground">
          {multiple ? 'Multiple files allowed' : 'Single file only'}
        </p>
      </div>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        Choose Files
      </Button>
    </div>
  );
};

// File Preview Component
const FilePreview: React.FC<{
  file: UploadFile;
  onRemove: () => void;
}> = ({ file, onRemove }) => {
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type.includes('pdf')) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      {getFileIcon(file.type)}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
        {file.status === 'uploading' && (
          <Progress value={file.progress} className="mt-1 h-1" />
        )}
        {file.error && (
          <p className="text-xs text-red-500 mt-1">{file.error}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

// Upload Package Demo Component
export const UploadPackageDemo: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploadConfig, setUploadConfig] = useState({
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/*', 'application/pdf', 'text/*'],
    multiple: true,
  });

  const validateFile = (file: File): string | null => {
    if (file.size > uploadConfig.maxFileSize) {
      return `File size exceeds ${uploadConfig.maxFileSize / (1024 * 1024)}MB limit`;
    }
    
    const isAllowed = uploadConfig.allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });
    
    if (!isAllowed) {
      return 'File type not allowed';
    }
    
    return null;
  };

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    const newFiles: UploadFile[] = selectedFiles.map(file => {
      const error = validateFile(file);
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: error ? 'error' : 'pending',
        progress: 0,
        error,
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
  }, [uploadConfig]);

  const simulateUpload = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading' as const } : f
    ));

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'success' as const, progress: 100 } : f
        ));
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 200);
  };

  const uploadAllFiles = () => {
    files.forEach(file => {
      if (file.status === 'pending') {
        simulateUpload(file.id);
      }
    });
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const pendingFiles = files.filter(f => f.status === 'pending');
  const uploadingFiles = files.filter(f => f.status === 'uploading');
  const completedFiles = files.filter(f => f.status === 'success');
  const errorFiles = files.filter(f => f.status === 'error');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">@koios/upload Package Demo</h1>
          <p className="text-muted-foreground">
            File upload components with drag-and-drop support
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                accept={uploadConfig.allowedTypes.join(',')}
                multiple={uploadConfig.multiple}
              />
            </CardContent>
          </Card>

          {files.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upload Queue</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      onClick={uploadAllFiles}
                      disabled={pendingFiles.length === 0}
                      size="sm"
                    >
                      Upload All ({pendingFiles.length})
                    </Button>
                    <Button
                      onClick={clearAllFiles}
                      variant="outline"
                      size="sm"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {files.map(file => (
                    <FilePreview
                      key={file.id}
                      file={file}
                      onRemove={() => removeFile(file.id)}
                    />
                  ))}
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{pendingFiles.length}</div>
                    <div className="text-muted-foreground">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{uploadingFiles.length}</div>
                    <div className="text-muted-foreground">Uploading</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{completedFiles.length}</div>
                    <div className="text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{errorFiles.length}</div>
                    <div className="text-muted-foreground">Errors</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Max File Size</label>
                  <select
                    value={uploadConfig.maxFileSize}
                    onChange={(e) => setUploadConfig(prev => ({
                      ...prev,
                      maxFileSize: parseInt(e.target.value)
                    }))}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value={1024 * 1024}>1 MB</option>
                    <option value={5 * 1024 * 1024}>5 MB</option>
                    <option value={10 * 1024 * 1024}>10 MB</option>
                    <option value={50 * 1024 * 1024}>50 MB</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Allowed Types</label>
                  <div className="mt-1 space-y-1">
                    {['image/*', 'application/pdf', 'text/*', 'application/*'].map(type => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={uploadConfig.allowedTypes.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setUploadConfig(prev => ({
                                ...prev,
                                allowedTypes: [...prev.allowedTypes, type]
                              }));
                            } else {
                              setUploadConfig(prev => ({
                                ...prev,
                                allowedTypes: prev.allowedTypes.filter(t => t !== type)
                              }));
                            }
                          }}
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Drag & drop support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>File validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Multiple file uploads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Error handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>File preview</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
