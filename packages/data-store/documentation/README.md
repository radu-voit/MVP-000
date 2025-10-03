# @koios/data-store

Data store utilities and state management for the KOIOS platform.

## Overview

This package provides powerful state management capabilities built on top of Zustand, offering lightweight, scalable, and type-safe state management with persistence support.

## Features

- **Lightweight State Management**: Built on Zustand for minimal boilerplate
- **TypeScript Support**: Full type safety and IntelliSense support
- **Persistence**: Automatic state persistence to localStorage/sessionStorage
- **Immer Integration**: Immutable state updates with Immer
- **Custom Hooks**: React hooks for easy state access
- **Store Composition**: Combine multiple stores efficiently

## Installation

\`\`\`bash
npm install @koios/data-store
\`\`\`

## Usage

### Basic Store

\`\`\`tsx
import { createStore, useStore } from '@koios/data-store';

const useCounterStore = createStore({
  name: 'counter',
  initialState: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
    reset: () => ({ count: 0 }),
  },
});

function Counter() {
  const { count, increment, decrement, reset } = useStore(useCounterStore);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
\`\`\`

### Persisted Store

\`\`\`tsx
import { createPersistedStore } from '@koios/data-store';

const useUserStore = createPersistedStore({
  name: 'user',
  initialState: { 
    user: null, 
    preferences: { theme: 'light' } 
  },
  actions: {
    setUser: (state, user) => ({ ...state, user }),
    updatePreferences: (state, preferences) => ({
      ...state,
      preferences: { ...state.preferences, ...preferences }
    }),
  },
  persist: true,
  storage: 'localStorage',
});
\`\`\`

## Stores

- `useAppStore` - Application-wide state
- `useUserStore` - User authentication and profile
- `useSettingsStore` - Application settings
- `createStore` - Generic store creator

## Hooks

- `useStore` - Access store state and actions
- `useStoreSelector` - Select specific state slices
- `useStoreActions` - Access only store actions
- `usePersistedStore` - Persisted store hook

## Types

- `StoreState` - Generic store state interface
- `StoreActions` - Store actions interface
- `StoreConfig<T>` - Store configuration
- `PersistedStoreConfig<T>` - Persisted store configuration

## Utilities

- `createPersistedStore` - Create stores with persistence
- `mergeStoreState` - Merge store states
- `validateStoreState` - Validate store state
- `serializeStore` - Serialize store for persistence

## Contributing

Please refer to the dev-notes folder for development guidelines and contribution instructions.
