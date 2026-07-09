/**
 * String algorithms.
 */

/** Levenshtein edit distance. O(m*n) time, O(min(m,n)) space. */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const prev: number[] = new Array(b.length + 1);
  const curr: number[] = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

/** Hamming distance. Throws if strings have different lengths. */
export function hamming(a: string, b: string): number {
  if (a.length !== b.length)
    throw new Error("Hamming distance requires equal length strings");
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}

/** Jaro-Winkler similarity. Returns 0..1. */
export function jaroWinkler(a: string, b: string): number {
  if (a === b) return 1;
  const m = jaroMatches(a, b);
  if (m === 0) return 0;
  const t = jaroTranspositions(a, b);
  const jaro = (m / a.length + m / b.length + (m - t) / m) / 3;
  let prefix = 0;
  for (let i = 0; i < Math.min(4, a.length); i++) {
    if (a[i] === b[i]) prefix++;
    else break;
  }
  return jaro + prefix * 0.1 * (1 - jaro);
}

function jaroMatches(a: string, b: string): number {
  if (!a.length || !b.length) return 0;
  const matchDistance = Math.max(
    0,
    Math.floor(Math.max(a.length, b.length) / 2) - 1,
  );
  const aMatches = new Array(a.length).fill(false);
  const bMatches = new Array(b.length).fill(false);
  let matches = 0;
  for (let i = 0; i < a.length; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, b.length);
    for (let j = start; j < end; j++) {
      if (bMatches[j]) continue;
      if (a[i] !== b[j]) continue;
      aMatches[i] = true;
      bMatches[j] = true;
      matches++;
      break;
    }
  }
  return matches;
}

function jaroTranspositions(a: string, b: string): number {
  const matchDistance = Math.max(
    0,
    Math.floor(Math.max(a.length, b.length) / 2) - 1,
  );
  const aMatches = new Array(a.length).fill(false);
  const bMatches = new Array(b.length).fill(false);
  for (let i = 0; i < a.length; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, b.length);
    for (let j = start; j < end; j++) {
      if (bMatches[j]) continue;
      if (a[i] !== b[j]) continue;
      aMatches[i] = true;
      bMatches[j] = true;
      break;
    }
  }
  let k = 0;
  let transpositions = 0;
  for (let i = 0; i < a.length; i++) {
    if (!aMatches[i]) continue;
    while (!bMatches[k]) k++;
    if (a[i] !== b[k]) transpositions++;
    k++;
  }
  return Math.floor(transpositions / 2);
}

/** Longest common subsequence length. */
export function lcsLength(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[] = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    let prev = 0;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      if (a[i - 1] === b[j - 1]) dp[j] = prev + 1;
      else dp[j] = Math.max(dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
}

/** Longest common substring length. */
export function lcsSubstringLength(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0 || n === 0) return 0;
  let best = 0;
  const prev: number[] = new Array(n + 1).fill(0);
  const curr: number[] = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1] + 1;
        if (curr[j] > best) best = curr[j];
      } else {
        curr[j] = 0;
      }
    }
    for (let j = 0; j <= n; j++) prev[j] = curr[j];
  }
  return best;
}

export function isPalindrome(s: string): boolean {
  const n = s.length;
  for (let i = 0; i < n / 2; i++) {
    if (s[i] !== s[n - 1 - i]) return false;
  }
  return true;
}

export function kebabToCamel(s: string): string {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

export function camelToKebab(s: string): string {
  return s.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
}

export function truncate(s: string, max: number, suffix = "…"): string {
  return s.length <= max ? s : s.slice(0, max - suffix.length) + suffix;
}
