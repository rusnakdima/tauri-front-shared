import { Injectable, signal, computed } from "@angular/core";

export interface LogEntry {
  level: "debug" | "info" | "warn" | "error";
  message: string;
  timestamp: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

@Injectable({ providedIn: "root" })
export class SignalLoggerService {
  private _entries = signal<LogEntry[]>([]);
  private _minLevel = signal<"debug" | "info" | "warn" | "error">("info");
  private _maxEntries = signal<number>(1000);

  entries = computed(() => this._entries());

  filteredEntries = computed(() => {
    const level = this._minLevel();
    const levels: Array<LogEntry["level"]> = ["debug", "info", "warn", "error"];
    const minIndex = levels.indexOf(level);
    return this._entries().filter((e) => levels.indexOf(e.level) >= minIndex);
  });

  setMinLevel(level: "debug" | "info" | "warn" | "error"): void {
    this._minLevel.set(level);
  }

  getMinLevel(): string {
    return this._minLevel();
  }

  setMaxEntries(max: number): void {
    this._maxEntries.set(max);
  }

  private addEntry(entry: LogEntry): void {
    this._entries.update((entries) => {
      const newEntries = [...entries, entry];
      if (newEntries.length > this._maxEntries()) {
        return newEntries.slice(-this._maxEntries());
      }
      return newEntries;
    });
  }

  debug(
    message: string,
    source?: string,
    metadata?: Record<string, unknown>,
  ): void {
    this.addEntry({
      level: "debug",
      message,
      timestamp: new Date().toISOString(),
      source,
      metadata,
    });
  }

  info(
    message: string,
    source?: string,
    metadata?: Record<string, unknown>,
  ): void {
    this.addEntry({
      level: "info",
      message,
      timestamp: new Date().toISOString(),
      source,
      metadata,
    });
  }

  warn(
    message: string,
    source?: string,
    metadata?: Record<string, unknown>,
  ): void {
    this.addEntry({
      level: "warn",
      message,
      timestamp: new Date().toISOString(),
      source,
      metadata,
    });
  }

  error(
    message: string,
    source?: string,
    metadata?: Record<string, unknown>,
  ): void {
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

  getEntriesByLevel(level: LogEntry["level"]): LogEntry[] {
    return this._entries().filter((e) => e.level === level);
  }

  exportToJson(): string {
    return JSON.stringify(this._entries(), null, 2);
  }

  importFromJson(json: string): void {
    try {
      const entries = JSON.parse(json) as LogEntry[];
      this._entries.set(entries);
    } catch (error) {
      this.error("Failed to import log entries from JSON");
    }
  }
}
