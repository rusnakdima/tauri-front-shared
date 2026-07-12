export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isPresent<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidBase64Image(data: string): boolean {
  if (!data.startsWith("data:image/")) return false;
  const parts = data.split(",");
  if (parts.length !== 2) return false;
  const mimePart = parts[0];
  const base64Part = parts[1];
  const mimeMatch = mimePart.match(/^data:image\/(\w+);base64$/);
  if (!mimeMatch) return false;
  const validMimes = ["png", "jpeg", "gif", "webp", "svg+xml", "bmp"];
  if (!validMimes.includes(mimeMatch[1])) return false;
  try {
    atob(base64Part);
    return true;
  } catch {
    return false;
  }
}
