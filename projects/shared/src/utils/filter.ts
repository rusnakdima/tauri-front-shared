import { getNestedValue } from "./object";

/**
 * Filter array items by search query across multiple fields
 */
export function filterBySearch<T>(
  items: T[],
  query: string,
  fields: (keyof T | string)[],
): T[] {
  if (!query.trim()) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const value = getNestedValue(item, String(field));
      return (
        typeof value === "string" && value.toLowerCase().includes(lowerQuery)
      );
    }),
  );
}
