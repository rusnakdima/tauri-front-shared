export abstract class StorageService {
  abstract get<T>(key: string): T | null;
  abstract set<T>(key: string, value: T): void;
  abstract remove(key: string): void;
  abstract clear(): void;
  abstract keys(): string[];
  /**
   * Checks if a key exists in storage.
   * Optional for backward compatibility with implementations that don't need it.
   */
  has?(key: string): boolean;
}
