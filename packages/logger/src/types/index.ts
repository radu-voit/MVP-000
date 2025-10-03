// Logger Types
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  error?: Error;
}

export interface LoggerConfig {
  level: LogLevel;
  format?: 'json' | 'text';
  enableConsole?: boolean;
  enableFile?: boolean;
  enableRemote?: boolean;
}
