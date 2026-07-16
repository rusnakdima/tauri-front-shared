/**
 * Style Registry - TailwindCSS v4 Theme System
 *
 * Themes are loaded dynamically at runtime via CSS <link> injection.
 * Each theme has a theme.css file with @theme directive.
 */

export type StyleVariant =
  | "claymorphism"
  | "glassmorphism"
  | "neumorphism"
  | "material-design-v3"
  | "brutalism"
  | "skeuomorphism";

export interface GlobalStyleContext {
  variant?: string;
  size?: string;
}

export interface StyleVariantConfig {
  id: StyleVariant;
  name: string;
  classPrefix: string;
  description: string;
}

/**
 * @deprecated - Component style mapping is no longer used in TailwindCSS v4 approach
 */
export interface ComponentStyleMap {
  [key: string]: string;
}

/**
 * Theme configuration - no cssString, themes are loaded via <link>
 */
export const STYLE_VARIANTS: Record<StyleVariant, StyleVariantConfig> = {
  claymorphism: {
    id: "claymorphism",
    name: "Claymorphism",
    classPrefix: "clay-",
    description: "Soft raised shadows with clay-like appearance",
  },
  glassmorphism: {
    id: "glassmorphism",
    name: "Glassmorphism",
    classPrefix: "glass-",
    description: "Frosted glass effect with backdrop blur",
  },
  neumorphism: {
    id: "neumorphism",
    name: "Neumorphism",
    classPrefix: "neu-",
    description: "Soft inset and outset shadows",
  },
  "material-design-v3": {
    id: "material-design-v3",
    name: "Material Design 3",
    classPrefix: "m3-",
    description: "Google Material Design 3 with elevation system",
  },
  brutalism: {
    id: "brutalism",
    name: "Brutalism",
    classPrefix: "brut-",
    description: "Sharp edges, hard shadows, high-contrast typography",
  },
  skeuomorphism: {
    id: "skeuomorphism",
    name: "Skeuomorphism",
    classPrefix: "skeu-",
    description: "Realistic textures with leather, paper, and glossy highlights",
  },
};

const LOADED_STYLES: Set<StyleVariant> = new Set();
let CURRENT_STYLE: StyleVariant = "material-design-v3";

export async function loadStyleVariant(variant: StyleVariant): Promise<void> {
  setTheme(variant);
  // CSS is loaded statically via @import in app's styles.css
  // loadStyleVariant() only sets data-theme attributes for CSS selectors
}

/**
 * SCSS-only fallback — sets body[data-style] without injecting runtime CSS.
 * Kept for compatibility with apps using static SCSS themes.
 */
export async function loadStyleVariantNoop(variant: StyleVariant = "material-design-v3"): Promise<void> {
  setTheme(variant);
}

export function setTheme(variant: StyleVariant): void {
  const config = STYLE_VARIANTS[variant];
  if (!config) {
    console.warn(`Unknown style variant: ${variant}`);
    return;
  }
  document.documentElement.setAttribute("data-theme", variant);
  document.body.setAttribute("data-theme", variant);
  const isDark = document.body.getAttribute("data-theme-mode") === "dark";
  document.documentElement.setAttribute("data-theme-mode", isDark ? "dark" : "light");
  document.body.setAttribute("data-theme-mode", isDark ? "dark" : "light");
  CURRENT_STYLE = variant;
  LOADED_STYLES.add(variant);
  document.dispatchEvent(
    new CustomEvent("style-changed", { detail: { variant, prefix: config.classPrefix } }),
  );
}

export function unloadStyleVariant(variant: StyleVariant): void {
  if (!LOADED_STYLES.has(variant)) {
    return;
  }
  LOADED_STYLES.delete(variant);
}

export function getCurrentStyle(): StyleVariant {
  return CURRENT_STYLE;
}

export function setCurrentStyle(variant: StyleVariant): void {
  setTheme(variant);
}

export function getStyleConfig(variant: StyleVariant): StyleVariantConfig {
  return STYLE_VARIANTS[variant] || STYLE_VARIANTS["material-design-v3"];
}

export function getStyleClassPrefix(variant: StyleVariant): string {
  return STYLE_VARIANTS[variant]?.classPrefix || "m3-";
}

export function getAllStyleVariants(): StyleVariantConfig[] {
  return Object.values(STYLE_VARIANTS);
}

export function initializeStyles(): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  const savedStyle = window.localStorage.getItem(
    "tauri-front-style",
  ) as StyleVariant | null;
  if (savedStyle && STYLE_VARIANTS[savedStyle]) {
    CURRENT_STYLE = savedStyle;
  }
}

export function getStyleClass(
  variant: StyleVariant,
  baseClass: string,
): string {
  const prefix = getStyleClassPrefix(variant);
  const baseName = baseClass.replace(/^clay-|^glass-|^neu-|^m3-|^brut-|^skeu-/, "");
  return `${prefix}${baseName}`;
}

/**
 * @deprecated - Use direct TailwindCSS utility classes in schema instead
 * Component style mapping - returns empty string in TailwindCSS v4-only approach
 */
export function getComponentStyleClasses(
  theme: StyleVariant,
  componentId: string,
  explicitVariant?: string,
  explicitSize?: string,
  globalContext?: GlobalStyleContext,
): string {
  // TailwindCSS v4 approach: use utility classes directly in schema
  // e.g., schema classes: "bg-primary text-on-primary rounded-lg"
  return "";
}
