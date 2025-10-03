# Data Grid Package - Development Notes

## Package Overview
The `@koios/data-grid` package provides powerful data grid components built on TanStack Table.

## Development Guidelines

### Code Structure
- `src/components/` - React data grid components
- `src/hooks/` - Custom hooks for grid functionality
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions for data operations

### Dependencies
- **@tanstack/react-table**: Core table functionality
- **react-virtual**: Virtual scrolling for performance
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

### Performance Considerations
- Implement virtual scrolling for large datasets
- Use React.memo for expensive components
- Optimize column rendering
- Implement proper memoization for data operations

### Accessibility
- Ensure proper ARIA attributes
- Support keyboard navigation
- Implement screen reader compatibility
- Follow WCAG guidelines

### Testing Strategy
- Unit tests for utility functions
- Component tests for grid rendering
- Integration tests for data operations
- Performance tests for large datasets

### Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Build the package
4. Run all tests
5. Publish to npm registry

## Known Issues
- None currently documented

## Future Enhancements
- [ ] Add column resizing
- [ ] Implement column reordering
- [ ] Add inline editing capabilities
- [ ] Support for nested data structures
- [ ] Add export functionality
