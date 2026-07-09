/**
 * Searching algorithms.
 */

/** Linear search. Returns the index of the first match for `predicate`, or -1. O(n). */
export function linearSearch<T>(
  arr: readonly T[],
  predicate: (item: T) => boolean,
): number {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) return i;
  }
  return -1;
}

/** Binary search on a sorted array using natural ordering. O(log n). */
export function binarySearch<T>(
  arr: readonly T[],
  target: T,
  compare?: (a: T, b: T) => number,
): number {
  const cmp = compare ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const c = cmp(arr[mid], target);
    if (c === 0) return mid;
    if (c < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

/** Binary search by a key function. */
export function binarySearchBy<T, K>(
  arr: readonly T[],
  key: K,
  keyFn: (item: T) => K,
): number {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const mk = keyFn(arr[mid]);
    if (mk === key) return mid;
    if (mk < key) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

/** First index where `arr[i] >= target` (sorted array). */
export function lowerBound<T>(
  arr: readonly T[],
  target: T,
  compare?: (a: T, b: T) => number,
): number {
  const cmp = compare ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (cmp(arr[mid], target) < 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/** First index where `arr[i] > target` (sorted array). */
export function upperBound<T>(
  arr: readonly T[],
  target: T,
  compare?: (a: T, b: T) => number,
): number {
  const cmp = compare ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (cmp(arr[mid], target) <= 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/** Jump search on a sorted array. O(√n). */
export function jumpSearch<T>(arr: readonly T[], target: T): number {
  const n = arr.length;
  if (n === 0) return -1;
  const step = Math.max(1, Math.floor(Math.sqrt(n)));
  let prev = 0;
  while (prev < n && arr[Math.min(step, n) - 1] < target) {
    prev += step;
    if (prev >= n) return -1;
  }
  for (let i = prev; i < Math.min(prev + step, n); i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
