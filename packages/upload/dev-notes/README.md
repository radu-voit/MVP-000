# Upload Package - Development Notes

## Package Overview
The `@koios/upload` package provides comprehensive file upload functionality with drag-and-drop support.

## Development Guidelines

### Code Structure
- `src/components/` - React upload components
- `src/hooks/` - Custom hooks for upload functionality
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions for file operations

### Dependencies
- **react-dropzone**: Drag-and-drop functionality
- **react**: React framework (peer dependency)

### Development Commands
```bash
# Build the package
npm run build

# Development mode with watch
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm run test

# Clean build artifacts
npm run clean
```

### Component Development
1. Create component files in `src/components/`
2. Export components from `src/components/index.ts`
3. Add TypeScript types in `src/types/`
4. Create utility functions in `src/utils/`
5. Write comprehensive tests

### File Validation
- Implement size validation
- Add file type validation
- Support custom validation rules
- Provide clear error messages

### Progress Tracking
- Implement real-time progress updates
- Support for multiple file uploads
- Handle upload cancellation
- Provide upload status feedback

### Security Considerations
- Validate file types server-side
- Implement file size limits
- Sanitize file names
- Prevent malicious file uploads

### Testing Strategy
- Unit tests for utility functions
- Component tests for upload UI
- Integration tests for upload flow
- Error handling tests

### Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Build the package
4. Run all tests
5. Publish to npm registry

## Known Issues
- None currently documented

## Future Enhancements
- [ ] Add image preview functionality
- [ ] Implement file compression
- [ ] Add upload queue management
- [ ] Support for chunked uploads
- [ ] Add upload retry mechanism
