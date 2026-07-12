export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;
  if (obj instanceof Map) {
    const cloned = new Map();
    obj.forEach((value, key) => cloned.set(key, deepClone(value)));
    return cloned as T;
  }
  if (obj instanceof Set) {
    const cloned = new Set();
    obj.forEach((value) => cloned.add(deepClone(value)));
    return cloned as T;
  }
  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

export function getNestedValue(obj: unknown, path: string): unknown {
  if (!path) return obj;
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function applyUpdate<T extends object>(
  target: T,
  update: Partial<T>,
): T {
  return { ...target, ...update };
}
