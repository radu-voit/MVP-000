# @koios/logger

Logging utilities and services for the KOIOS platform.

## Overview

This package provides comprehensive logging capabilities with support for multiple output destinations, log levels, and formatting options.

## Features

- **Multiple Destinations**: Console, file, and remote logging
- **Log Levels**: Debug, info, warn, and error levels
- **Formatting**: JSON and text formatting options
- **Context Support**: Rich context information
- **Error Handling**: Built-in error logging
- **Configurable**: Flexible configuration options

## Installation

```bash
npm install @koios/logger
```

## Usage

```tsx
import { Logger, LogLevel } from '@koios/logger';

// Create logger instance
const logger = new Logger({
  level: 'info',
  format: 'json',
  enableConsole: true,
  enableFile: true,
});

// Log messages
logger.debug('Debug message', { userId: 123 });
logger.info('User logged in', { userId: 123, timestamp: new Date() });
logger.warn('Deprecated API used', { endpoint: '/api/old' });
logger.error('Database connection failed', { error: new Error('Connection timeout') });
```

## Services

- `Logger` - Main logger class
- `ConsoleLogger` - Console-specific logger
- `FileLogger` - File-based logger
- `RemoteLogger` - Remote logging service

## Types

- `LogLevel` - Available log levels
- `LogEntry` - Log entry structure
- `LoggerConfig` - Logger configuration

## Utilities

- `formatLogEntry` - Format log entries
- `createLogContext` - Create log context
- `parseLogLevel` - Parse log level strings

## Configuration

```tsx
const config: LoggerConfig = {
  level: 'info',
  format: 'json',
  enableConsole: true,
  enableFile: true,
  enableRemote: false,
};
```

## Contributing

Please refer to the dev-notes folder for development guidelines and contribution instructions.
