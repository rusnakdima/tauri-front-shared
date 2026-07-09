/**
 * Math algorithms and statistics.
 */

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function factorial(n: number): number {
  if (n < 0) throw new Error("factorial undefined for negative numbers");
  if (n > 20) throw new Error("factorial overflow for n > 20 in number mode");
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/** Sieve of Eratosthenes. Returns all primes <= n. */
export function primesUpTo(n: number): number[] {
  if (n < 2) return [];
  const sieve = new Uint8Array(n + 1);
  const primes: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (sieve[i]) continue;
    primes.push(i);
    for (let j = i * i; j <= n; j += i) sieve[j] = 1;
  }
  return primes;
}

export function fibonacci(n: number): number {
  if (n < 0) throw new Error("fibonacci undefined for negative numbers");
  if (n === 0) return 0;
  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) {
    const t = a + b;
    a = b;
    b = t;
  }
  return b;
}

/** Fast exponentiation. O(log exp). */
export function power(base: number, exp: number): number {
  if (exp < 0) throw new Error("negative exponent not supported");
  let result = 1;
  let b = base;
  let e = exp;
  while (e > 0) {
    if (e & 1) result *= b;
    b *= b;
    e >>= 1;
  }
  return result;
}

export function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}

export function nextPowerOfTwo(n: number): number {
  if (n <= 1) return 1;
  let p = 1;
  while (p < n) p <<= 1;
  return p;
}

export function mean(nums: readonly number[]): number {
  if (nums.length === 0) return 0;
  let s = 0;
  for (const n of nums) s += n;
  return s / nums.length;
}

export function median(nums: readonly number[]): number {
  if (nums.length === 0) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function stddev(nums: readonly number[]): number {
  if (nums.length < 2) return 0;
  const m = mean(nums);
  let s = 0;
  for (const n of nums) s += (n - m) ** 2;
  return Math.sqrt(s / (nums.length - 1));
}
