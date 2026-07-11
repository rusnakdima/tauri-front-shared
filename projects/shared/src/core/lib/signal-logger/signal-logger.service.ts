import { Injectable, signal, computed } from "@angular/core";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  source?: string;
  metadata?: unknown;
}

@Injectable({ providedIn: "root" })
export class SignalLoggerService {
  private _entries = signal<LogEntry[]>([]);
  private _minLevel = signal<LogLevel>("info");
  private _maxEntries = signal(1000);

  entries = computed(() => this._entries());
  filteredEntries = computed(() => {
    const level = this._minLevel();
    const levels: LogLevel[] = ["debug", "info", "warn", "error"];
    const minIndex = levels.indexOf(level);
    return this._entries().filter((e) => levels.indexOf(e.level) >= minIndex);
  });

  setMinLevel(level: LogLevel): void {
    this._minLevel.set(level);
  }

  getMinLevel(): LogLevel {
    return this._minLevel();
  }

  setMaxEntries(max: number): void {
    this._maxEntries.set(max);
  }

  addEntry(entry: LogEntry): void {
    this._entries.update((entries) => {
      const newEntries = [...entries, entry];
      if (newEntries.length > this._maxEntries()) {
        return newEntries.slice(-this._maxEntries());
      }
      return newEntries;
    });
  }

  debug(message: string, source?: string, metadata?: unknown): void {
    this.addEntry({
      level: "debug",
      message,
      timestamp: new Date().toISOString(),
      source,
      metadata,
    });
  }

  info(message: string, source?: string, metadata?: unknown): void {
    this.addEntry({
      level: "info",
      message,
      timestamp: new Date().toISOString(),
      source,
      metadata,
    });
  }

  warn(message: string, source?: string, metadata?: unknown): void {
    this.addEntry({
      level: "warn",
      message,
      timestamp: new Date().toISOString(),
      source,
      metadata,
    });
  }

  error(message: string, source?: string, metadata?: unknown): void {
    this.addEntry({
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      source,
      metadata,
    });
  }

  clear(): void {
    this._entries.set([]);
  }

  getEntriesByLevel(level: LogLevel): LogEntry[] {
    return this._entries().filter((e) => e.level === level);
  }

  exportToJson(): string {
    return JSON.stringify(this._entries(), null, 2);
  }

  importFromJson(json: string): void {
    try {
      const entries = JSON.parse(json);
      this._entries.set(entries);
    } catch {
      this.error("Failed to import log entries from JSON");
    }
  }
}
