# Data Store Package - Development Notes

## Package Overview
The `@koios/data-store` package provides state management utilities built on Zustand with persistence support.

## Development Guidelines

### Code Structure
- `src/stores/` - Store definitions and configurations
- `src/hooks/` - React hooks for store access
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions for store operations

### Dependencies
- **zustand**: Core state management library
- **immer**: Immutable state updates
- **react**: React framework (peer dependency)

### Development Commands
\`\`\`bash
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
\`\`\`

### Store Development
1. Create store definitions in `src/stores/`
2. Export stores from `src/stores/index.ts`
3. Add TypeScript types in `src/types/`
4. Create utility functions in `src/utils/`
5. Write comprehensive tests

### State Management Patterns
- Use Immer for immutable updates
- Implement proper action creators
- Handle async operations with middleware
- Use selectors for computed values

### Persistence Considerations
- Implement proper serialization/deserialization
- Handle version migrations
- Manage storage quotas
- Implement error recovery

### Testing Strategy
- Unit tests for store logic
- Integration tests for store interactions
- Persistence tests for storage operations
- Performance tests for large state trees

### Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Build the package
4. Run all tests
5. Publish to npm registry

## Known Issues
- None currently documented

## Future Enhancements
- [ ] Add middleware support
- [ ] Implement store devtools integration
- [ ] Add store composition utilities
- [ ] Support for store subscriptions
- [ ] Add store migration utilities
