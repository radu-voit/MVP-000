# @koios/core

Core utilities and shared functionality for the KOIOS platform.

## Overview

This package contains essential utilities, types, and constants used across all KOIOS packages and applications.

## Features

- **Utility Functions**: Common utility functions for data manipulation
- **Type Definitions**: Shared TypeScript interfaces and types
- **Constants**: Application-wide constants and configuration
- **Helper Functions**: Date formatting, debouncing, throttling, etc.

## Installation

```bash
npm install @koios/core
```

## Usage

```tsx
import { cn, formatDate, debounce, BaseEntity, API_ENDPOINTS } from '@koios/core';

// Utility functions
const className = cn('base-class', 'conditional-class');
const formattedDate = formatDate(new Date());
const debouncedFunction = debounce(() => console.log('debounced'), 300);

// Types
interface User extends BaseEntity {
  name: string;
  email: string;
}

// Constants
const usersEndpoint = API_ENDPOINTS.USERS;
```

## Utilities

- `cn` - Class name utility (similar to clsx)
- `formatDate` - Date formatting utility
- `debounce` - Debounce function
- `throttle` - Throttle function

## Types

- `BaseEntity` - Base interface for all entities
- `ApiResponse<T>` - Generic API response type
- `Status` - Common status type

## Constants

- `API_ENDPOINTS` - Application API endpoints
- `HTTP_STATUS` - HTTP status codes

## Contributing

Please refer to the dev-notes folder for development guidelines and contribution instructions.
