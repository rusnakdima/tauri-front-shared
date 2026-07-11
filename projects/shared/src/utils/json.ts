/**
 * Safe JSON parser with fallback for array types.
 * Replaces 22+ duplicate patterns across the codebase.
 */
export function parseJsonOrDefault<T>(
  json: string | T[],
  defaultValue: T[] = [],
): T[] {
  if (Array.isArray(json)) return json;
  try {
    return JSON.parse(json) as T[];
  } catch {
    return defaultValue;
  }
}
