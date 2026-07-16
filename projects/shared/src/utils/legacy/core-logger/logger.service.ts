import { Injectable } from "@angular/core";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: string;
}

@Injectable({ providedIn: "root" })
export class LoggerService {
  private _logs: LogEntry[] = [];

  get logs(): LogEntry[] {
    return this._logs;
  }

  log(level: LogLevel, message: string, context?: string): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      context,
    };
    this._logs.push(entry);
    this.writeToConsole(entry);
  }

  debug(message: string, context?: string): void {
    this.log("debug", message, context);
  }

  info(message: string, context?: string): void {
    this.log("info", message, context);
  }

  warn(message: string, context?: string): void {
    this.log("warn", message, context);
  }

  error(message: string, context?: string): void {
    this.log("error", message, context);
  }

  getFilteredLogs(level?: LogLevel): LogEntry[] {
    if (!level) return [...this._logs];
    return this._logs.filter((log) => log.level === level);
  }

  exportLogs(): string {
    return JSON.stringify(this._logs, null, 2);
  }

  clear(): void {
    this._logs = [];
  }

  private writeToConsole(entry: LogEntry): void {
    const prefix = `[${entry.timestamp.toISOString()}] [${entry.level.toUpperCase()}]`;
    const contextStr = entry.context ? ` [${entry.context}]` : "";
    const fullMessage = `${prefix}${contextStr} ${entry.message}`;

    switch (entry.level) {
      case "debug":
        console.debug(fullMessage);
        break;
      case "info":
        console.info(fullMessage);
        break;
      case "warn":
        console.warn(fullMessage);
        break;
      case "error":
        console.error(fullMessage);
        break;
    }
  }
}
