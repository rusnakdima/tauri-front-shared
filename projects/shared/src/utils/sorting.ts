/**
 * Sort array of objects by property and order
 * @param arr - Array to sort
 * @param key - Property name to sort by
 * @param order - "asc" or "desc"
 */
export function sortBy<T>(
  arr: T[],
  key: keyof T | number,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...arr].sort((a, b) => {
    const aVal = typeof key === "number" ? (a as unknown as T[])[key] : a[key];
    const bVal = typeof key === "number" ? (b as unknown as T[])[key] : b[key];

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}
