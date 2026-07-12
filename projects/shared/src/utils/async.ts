export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delayMs: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delayMs);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delayMs: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delayMs) {
      lastCall = now;
      fn(...args);
    }
  };
}

export type LoadingState = { loading: boolean };

export function withLoading<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  setLoading: (loading: boolean) => void,
): (...args: Parameters<T>) => Promise<unknown> {
  return async (...args: Parameters<T>) => {
    try {
      setLoading(true);
      return await fn(...args);
    } finally {
      setLoading(false);
    }
  };
}
