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
      const value = getNestedValue(item, field);
      return (
        typeof value === "string" && value.toLowerCase().includes(lowerQuery)
      );
    }),
  );
}

function getNestedValue(obj: any, path: string | keyof any): any {
  if (typeof path === "string" && path.includes(".")) {
    return path.split(".").reduce((o, k) => o?.[k], obj);
  }
  return obj[path];
}
