export function trackByRow(
  index: number,
  row: Record<string, unknown>,
): string {
  return String(row["_id"] || row["id"] || index);
}

export function trackByIndex(index: number): number {
  return index;
}

/**
 * Group entities by a key function, returning Map
 */
export function groupByKey<T, K>(
  entities: T[],
  keyFn: (entity: T) => K,
): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (const entity of entities) {
    const key = keyFn(entity);
    const list = map.get(key) || [];
    list.push(entity);
    map.set(key, list);
  }
  return map;
}
