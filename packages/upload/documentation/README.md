# @koios/upload

File upload components and utilities for the KOIOS platform.

## Overview

This package provides comprehensive file upload functionality with drag-and-drop support, progress tracking, and file validation.

## Features

- **Drag & Drop**: Intuitive drag-and-drop interface
- **Progress Tracking**: Real-time upload progress
- **File Validation**: Size, type, and format validation
- **Multiple Files**: Support for single and multiple file uploads
- **Preview**: File preview capabilities
- **Error Handling**: Comprehensive error handling and feedback
- **TypeScript Support**: Full type definitions included

## Installation

\`\`\`bash
npm install @koios/upload
\`\`\`

## Usage

\`\`\`tsx
import { FileUpload, useFileUpload } from '@koios/upload';

function UploadComponent() {
  const { files, upload, progress, status } = useFileUpload({
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/*', 'application/pdf'],
    multiple: true,
    endpoint: '/api/upload',
  });

  return (
    <FileUpload
      onUpload={upload}
      files={files}
      progress={progress}
      status={status}
    />
  );
}
\`\`\`

## Components

- `FileUpload` - Main file upload component
- `DragDropUpload` - Drag-and-drop upload component
- `UploadProgress` - Upload progress indicator
- `FilePreview` - File preview component

## Hooks

- `useFileUpload` - Main file upload hook
- `useDragDrop` - Drag-and-drop functionality hook
- `useUploadProgress` - Upload progress tracking hook

## Types

- `UploadFile` - File upload structure
- `UploadConfig` - Upload configuration
- `UploadStatus` - Upload status type

## Utilities

- `validateFile` - File validation utility
- `formatFileSize` - File size formatting
- `getFileIcon` - File type icon utility
- `createFormData` - Form data creation utility

## Configuration

\`\`\`tsx
const config: UploadConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/*', 'application/pdf'],
  multiple: true,
  endpoint: '/api/upload',
  headers: {
    'Authorization': 'Bearer token',
  },
};
\`\`\`

## Contributing

Please refer to the dev-notes folder for development guidelines and contribution instructions.
