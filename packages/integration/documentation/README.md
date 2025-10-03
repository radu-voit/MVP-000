# @koios/integration

Integration package with sub-packages for external services and APIs.

## Overview

This package provides a comprehensive integration solution with specialized sub-packages for different external services. Each sub-package is self-contained and follows uniform configuration standards.

## Sub-Packages

### 1. @koios/integration-hugging-face
**Purpose**: AI model integration with Hugging Face
- **Dependencies**: @huggingface/inference, axios
- **Features**: Text generation, classification, question answering, dataset management

### 2. @koios/integration-vercel
**Purpose**: Vercel deployment and analytics integration
- **Dependencies**: @vercel/sdk, axios
- **Features**: Deployment management, analytics, project management

### 3. @koios/integration-google
**Purpose**: Google Cloud Services integration
- **Dependencies**: @google-cloud/storage, @google-cloud/translate, @google-cloud/vision
- **Features**: Cloud storage, translation, vision API, authentication

### 4. @koios/integration-neo4j
**Purpose**: Neo4j graph database integration
- **Dependencies**: neo4j-driver, axios
- **Features**: Cypher queries, graph visualization, relationship management

## Installation

```bash
# Install main integration package
npm install @koios/integration

# Install specific sub-packages
npm install @koios/integration-hugging-face
npm install @koios/integration-vercel
npm install @koios/integration-google
npm install @koios/integration-neo4j
```

## Usage

### Hugging Face Integration
```tsx
import { HuggingFaceClient } from '@koios/integration-hugging-face';

const client = new HuggingFaceClient({
  apiKey: 'your-hugging-face-token'
});

const result = await client.inference({
  model: 'gpt2',
  inputs: 'Hello world',
  parameters: { max_length: 50 }
});
```

### Vercel Integration
```tsx
import { VercelClient } from '@koios/integration-vercel';

const client = new VercelClient({
  apiToken: 'your-vercel-token'
});

const deployments = await client.getDeployments();
```

### Google Cloud Integration
```tsx
import { GoogleClient } from '@koios/integration-google';

const client = new GoogleClient({
  projectId: 'your-project-id',
  credentials: 'path-to-credentials.json'
});

const translation = await client.translate('Hello', 'es');
```

### Neo4j Integration
```tsx
import { Neo4jClient } from '@koios/integration-neo4j';

const client = new Neo4jClient({
  uri: 'bolt://localhost:7687',
  username: 'neo4j',
  password: 'password'
});

const result = await client.query({
  query: 'MATCH (n) RETURN n LIMIT 10'
});
```

## Architecture

The integration package follows a monorepo structure with workspaces:

```
packages/integration/
├── hugging-face/          # Hugging Face sub-package
├── vercel/               # Vercel sub-package
├── google/               # Google Cloud sub-package
├── neo4j/                # Neo4j sub-package
├── src/                  # Main integration utilities
├── dev-notes/            # Development guidelines
└── documentation/        # User documentation
```

## Configuration

Each sub-package includes:
- **TypeScript**: Strict configuration with proper type definitions
- **Testing**: Jest configuration with coverage thresholds
- **Linting**: ESLint with consistent rules
- **Documentation**: Comprehensive README and API docs
- **Demo Components**: Interactive examples for each service

## Contributing

Please refer to the dev-notes folder for development guidelines and contribution instructions for each sub-package.

## License

MIT License - see individual sub-package licenses for details.
