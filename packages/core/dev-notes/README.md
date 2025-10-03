# Core Package - Development Notes

## Package Overview
The `@koios/core` package contains essential utilities, types, and constants used across all KOIOS packages.

## Development Guidelines

### Code Structure
- `src/utils/` - Utility functions
- `src/types/` - TypeScript type definitions
- `src/constants/` - Application constants

### Dependencies
- **clsx**: Class name utility
- **tailwind-merge**: Tailwind CSS class merging

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

### Utility Development
1. Create utility functions in `src/utils/`
2. Export utilities from `src/utils/index.ts`
3. Add comprehensive TypeScript types
4. Write unit tests for all functions
5. Document function behavior and parameters

### Type Development
1. Define interfaces in `src/types/`
2. Export types from `src/types/index.ts`
3. Use generic types where appropriate
4. Provide JSDoc comments for complex types

### Constants Management
1. Define constants in `src/constants/`
2. Use `as const` for type safety
3. Group related constants together
4. Export constants from `src/constants/index.ts`

### Testing Strategy
- Unit tests for all utility functions
- Type tests for complex type definitions
- Integration tests for utility combinations

### Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Build the package
4. Run all tests
5. Publish to npm registry

## Known Issues
- None currently documented

## Future Enhancements
- [ ] Add more utility functions
- [ ] Implement caching utilities
- [ ] Add validation utilities
- [ ] Create data transformation utilities
