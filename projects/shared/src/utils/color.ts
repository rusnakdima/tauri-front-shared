/**
 * Pure color algorithm functions for WCAG contrast testing.
 * No DOM dependencies — all functions are pure.
 */

// --- Types ---

export type ThemeName =
  | "material-design-v3"
  | "neumorphism"
  | "claymorphism"
  | "glassmorphism"
  | "brutalism"
  | "skeuomorphism";

export interface ContrastFailure {
  theme: ThemeName;
  token: string;
  bgToken: string;
  ratio: number;
  levelAA: boolean;
  levelAAA: boolean;
}

// --- Constants ---

export const SEMANTIC_TEXT_TOKENS = [
  "text-primary",
  "text-secondary",
  "text-muted",
] as const;

export const SEMANTIC_BG_TOKENS = [
  "bg-primary",
  "bg-secondary",
  "bg-tertiary",
  "bg-elevated",
] as const;

// --- Pure functions ---

/** Parse hex (#RRGGBB, #RGB, #RRGGBBAA), rgb(), rgba(), hsl(), hsla(), transparent, currentColor to {r,g,b,a} or null */
export function parseColor(
  color: string,
): { r: number; g: number; b: number; a: number } | null {
  const val = color.trim().toLowerCase();

  if (val === "transparent" || val === "currentcolor") {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  // #RGB
  if (/^#([0-9a-f]{3})$/.test(val)) {
    const hex = val.slice(1);
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
      a: 1,
    };
  }

  // #RRGGBB
  if (/^#([0-9a-f]{6})$/.test(val)) {
    const hex = val.slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }

  // #RRGGBBAA
  if (/^#([0-9a-f]{8})$/.test(val)) {
    const hex = val.slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }

  // rgba() / rgb()
  const rgbaMatch = val.match(
    /^rgba?\(\s*([\d.]+%?)\s*,\s*([\d.]+%?)\s*,\s*([\d.]+%?)\s*(?:,\s*([\d.]+)\s*)?\)$/,
  );
  if (rgbaMatch) {
    const [, rStr, gStr, bStr, aStr] = rgbaMatch;
    const r = parseComponent(rStr);
    const g = parseComponent(gStr);
    const b = parseComponent(bStr);
    if (r === null || g === null || b === null) return null;
    const a = aStr !== undefined ? parseFloat(aStr) : 1;
    return { r, g, b, a: isNaN(a) ? 1 : a };
  }

  // hsla() / hsl()
  const hslaMatch = val.match(
    /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)$/,
  );
  if (hslaMatch) {
    const [, hStr, sStr, lStr, aStr] = hslaMatch;
    const h = parseFloat(hStr);
    const s = parseFloat(sStr) / 100;
    const l = parseFloat(lStr) / 100;
    if ([h, s, l].some(isNaN)) return null;
    const { r, g, b } = hslToRgb(h, s, l);
    const a = aStr !== undefined ? parseFloat(aStr) : 1;
    return { r, g, b, a: isNaN(a) ? 1 : a };
  }

  return null;
}

function parseComponent(val: string): number | null {
  if (val.endsWith("%")) {
    const n = parseFloat(val);
    return isNaN(n) ? null : Math.round((n / 100) * 255);
  }
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

function hslToRgb(
  h: number,
  s: number,
  l: number,
): { r: number; g: number; b: number } {
  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return {
    r: Math.round(hue2rgb(p, q, h / 360 + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h / 360) * 255),
    b: Math.round(hue2rgb(p, q, h / 360 - 1 / 3) * 255),
  };
}

/** WCAG relative luminance (linearized sRGB) */
export function relativeLuminance(r: number, g: number, b: number): number {
  const linearize = (c: number): number => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };

  const R = linearize(r);
  const G = linearize(g);
  const B = linearize(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/** Contrast ratio between two colors (null if unparseable) */
export function contrastRatio(color1: string, color2: string): number | null {
  const c1 = parseColor(color1);
  const c2 = parseColor(color2);

  if (c1 === null || c2 === null) return null;

  const L1 = relativeLuminance(c1.r, c1.g, c1.b);
  const L2 = relativeLuminance(c2.r, c2.g, c2.b);

  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);

  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG AA/AAA result for a given ratio */
export function wcagResult(ratio: number): {
  levelAA: boolean;
  levelAAA: boolean;
} {
  return {
    levelAA: ratio >= 4.5, // AA normal text
    // Note: ratio >= 3 is AA large text (not stored, caller checks ratio >= 3 directly)
    levelAAA: ratio >= 7, // AAA normal text
  };
}

/** True if value is a CSS var() reference */
export function isVarReference(value: string): boolean {
  return value.trim().startsWith("var(");
}

/** True if color is transparent (any alpha < 0.1) */
export function isTransparent(value: string): boolean {
  const val = value.trim().toLowerCase();
  if (val === "transparent" || val === "currentcolor") return true;

  const parsed = parseColor(value);
  if (parsed === null) return false;

  return parsed.a < 0.1;
}

/** True if color is fully opaque (alpha >= 1.0) */
export function isOpaque(value: string): boolean {
  const parsed = parseColor(value);
  if (parsed === null) return true; // treat unparseable as opaque
  return parsed.a >= 1.0;
}

/** Extract all --name: value pairs from a raw CSS string */
export function extractCssVariables(css: string): Record<string, string> {
  const result: Record<string, string> = {};
  const regex = /--([\w-]+)\s*:\s*([^;}]+)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(css)) !== null) {
    result[match[1]] = match[2].trim();
  }

  return result;
}

/** Extract --name: value pairs from CSS block matching a specific selector substring */
export function extractBlockVariables(
  css: string,
  selector: string,
): Record<string, string> {
  // Find the selector start
  const selectorIndex = css.indexOf(selector);
  if (selectorIndex === -1) return {};

  // Find the opening brace after selector
  const braceStart = css.indexOf("{", selectorIndex);
  if (braceStart === -1 || braceStart > selectorIndex + selector.length + 10) {
    return {};
  }

  // Find the matching closing brace
  let depth = 1;
  let pos = braceStart + 1;
  while (pos < css.length && depth > 0) {
    if (css[pos] === "{") depth++;
    else if (css[pos] === "}") depth--;
    pos++;
  }

  if (depth !== 0) return {};

  const block = css.slice(braceStart + 1, pos - 1);
  return extractCssVariables(block);
}

/** Resolve a token name to its concrete color value, following var() chains */
export function resolveToken(
  name: string,
  tokens: Record<string, string>,
  _depth?: number,
): string | null {
  const MAX_DEPTH = 5;
  const depth = _depth ?? 0;

  if (depth > MAX_DEPTH) return null;

  if (!(name in tokens)) return null;

  const value = tokens[name];

  // Check for var() reference
  const varMatch = value.match(/^var\(--([\w-]+)\)$/);
  if (varMatch) {
    const refName = varMatch[1];
    return resolveToken(refName, tokens, depth + 1);
  }

  return value;
}
