/**
 * Array algorithms.
 */

export function dedupe<T>(
  arr: readonly T[],
  keyFn?: (item: T) => unknown,
): T[] {
  if (!keyFn) return Array.from(new Set(arr));
  const seen = new Set<unknown>();
  const out: T[] = [];
  for (const item of arr) {
    const k = keyFn(item);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(item);
    }
  }
  return out;
}

export function groupBy<T, K>(
  arr: readonly T[],
  keyFn: (item: T) => K,
): Map<K, T[]> {
  const out = new Map<K, T[]>();
  for (const item of arr) {
    const k = keyFn(item);
    const bucket = out.get(k);
    if (bucket) bucket.push(item);
    else out.set(k, [item]);
  }
  return out;
}

export function chunk<T>(arr: readonly T[], size: number): T[][] {
  if (size <= 0) throw new Error("chunk size must be positive");
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function partition<T>(
  arr: readonly T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  const yes: T[] = [];
  const no: T[] = [];
  for (const item of arr) {
    if (predicate(item)) yes.push(item);
    else no.push(item);
  }
  return [yes, no];
}

export function flatten<T>(arr: readonly (T | T[])[], depth = 1): T[] {
  const out: T[] = [];
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) out.push(...flatten(item, depth - 1));
    else out.push(item as T);
  }
  return out;
}

export function zip<T, U>(a: readonly T[], b: readonly U[]): [T, U][] {
  const n = Math.min(a.length, b.length);
  const out: [T, U][] = new Array(n);
  for (let i = 0; i < n; i++) out[i] = [a[i], b[i]];
  return out;
}

export function intersection<T>(...arrs: readonly T[][]): T[] {
  if (arrs.length === 0) return [];
  const [first, ...rest] = arrs;
  return first.filter((x) => rest.every((a) => a.includes(x)));
}

export function union<T>(...arrs: readonly T[][]): T[] {
  const out: T[] = [];
  const seen = new Set<T>();
  for (const a of arrs)
    for (const x of a) {
      if (!seen.has(x)) {
        seen.add(x);
        out.push(x);
      }
    }
  return out;
}

export function difference<T>(a: readonly T[], b: readonly T[]): T[] {
  const set = new Set(b);
  return a.filter((x) => !set.has(x));
}
