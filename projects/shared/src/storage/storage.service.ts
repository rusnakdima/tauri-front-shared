export abstract class StorageService {
  abstract get<T>(key: string): Promise<T | null>;
  abstract set<T>(key: string, value: T): Promise<void>;
  abstract remove(key: string): Promise<void>;
  abstract clear(): Promise<void>;
  abstract keys(): string[];
  /**
   * Checks if a key exists in storage.
   * Optional for backward compatibility with implementations that don't need it.
   */
  has?(key: string): boolean;
}
