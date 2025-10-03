# Chart Package - Development Notes

## Package Overview
The `@koios/chart` package provides chart visualization components built on Recharts and D3.

## Development Guidelines

### Code Structure
- `src/components/` - React chart components
- `src/hooks/` - Custom hooks for chart functionality
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions for chart operations

### Dependencies
- **recharts**: Primary charting library
- **d3**: Low-level data manipulation and visualization
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
5. Write tests for all functionality

### Performance Considerations
- Use React.memo for chart components
- Implement proper data memoization
- Consider virtualization for large datasets
- Optimize re-renders with useMemo and useCallback

### Testing Strategy
- Unit tests for utility functions
- Component tests for chart rendering
- Integration tests for data flow
- Visual regression tests for chart appearance

### Release Process
1. Update version in package.json
2. Update CHANGELOG.md
3. Build the package
4. Run all tests
5. Publish to npm registry

## Known Issues
- None currently documented

## Future Enhancements
- [ ] Add more chart types (radar, gauge, etc.)
- [ ] Implement chart animations
- [ ] Add chart export functionality
- [ ] Support for real-time data updates
