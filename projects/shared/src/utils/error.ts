export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return String(error ?? "Unknown error");
}

export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  onError?: (error: unknown) => void,
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    onError?.(error);
    return undefined;
  }
}
