# Koios Monorepo

A sophisticated monorepo architecture built with Turborepo, featuring custom packages, dual-theme design system, and offline-first capabilities.

## Architecture

\`\`\`
koios-monorepo/
├── apps/
│   └── web/                 # Next.js application
├── packages/
│   ├── logger/              # Pino-based logging
│   ├── table/               # AG Grid tables
│   ├── chart/               # Recharts visualizations
│   └── upload/              # Advanced file uploader
├── shared/
│   └── core/                # Universal business logic
├── libs/                    # Centrally referenced libraries
└── public/
    ├── base/theme/          # Base design system
    └── client-000/theme/    # Client theme overrides
\`\`\`

## Getting Started

### Installation

\`\`\`bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev
\`\`\`

### Offline Support

All packages are designed to work offline. Libraries are bundled and cached locally in the `libs/` folder.

## Packages

- **@koios/logger**: Structured logging with Pino
- **@koios/table**: Data tables with AG Grid
- **@koios/chart**: Charts with Recharts (Line, Bar, Pie)
- **@koios/upload**: Advanced file uploader with drag-and-drop, folders, and ZIP support

## Theme System

Switch between base and client themes using the theme switcher in the top right corner.

## Security

Built following Next.js best practices with security-first approach for production deployment.
