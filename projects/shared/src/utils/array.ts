export function findById<T extends { id: string }>(
  items: T[],
  id: string,
): T | undefined {
  return items.find((item) => item.id === id);
}

export function findByIdOrThrow<T extends { id: string }>(
  items: T[],
  id: string,
): T {
  const item = items.find((item) => item.id === id);
  if (!item) throw new Error(`Item ${id} not found`);
  return item;
}

export function upsertEntity<T extends { id: string }>(
  items: T[],
  entity: T,
): T[] {
  const index = items.findIndex((item) => item.id === entity.id);
  if (index >= 0) {
    const updated = [...items];
    updated[index] = entity;
    return updated;
  }
  return [...items, entity];
}

export function deduplicateById<T extends { id: string }>(
  items: T[],
  options?: { filterDeleted?: boolean },
): T[] {
  const seen = new Set<string>();
  const source = options?.filterDeleted
    ? (items as Array<T & { deleted_at?: unknown }>).filter(
        (item) => !item.deleted_at,
      )
    : items;
  return source.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function groupByField<T>(
  items: T[],
  field: keyof T,
): Record<string, T[]> {
  return items.reduce(
    (groups, item) => {
      const key = String(item[field]);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}
