export type StyleVariant =
  | "claymorphism"
  | "glassmorphism"
  | "neumorphism"
  | "material-design-v3";

export interface StyleVariantConfig {
  id: StyleVariant;
  name: string;
  cssFile: string;
  classPrefix: string;
  description: string;
}

export const STYLE_VARIANTS: Record<StyleVariant, StyleVariantConfig> = {
  claymorphism: {
    id: "claymorphism",
    name: "Claymorphism",
    cssFile: "./claymorphism.css",
    classPrefix: "clay-",
    description:
      "Soft raised shadows with clay-like appearance, rounded corners and gradient backgrounds",
  },
  glassmorphism: {
    id: "glassmorphism",
    name: "Glasmorphism",
    cssFile: "./glassmorphism.css",
    classPrefix: "glass-",
    description:
      "Frosted glass effect with backdrop blur, semi-transparent surfaces",
  },
  neumorphism: {
    id: "neumorphism",
    name: "Neumorphism",
    cssFile: "./neumorphism.css",
    classPrefix: "neu-",
    description:
      "Soft inset and outset shadows with muted base color for subtle depth",
  },
  "material-design-v3": {
    id: "material-design-v3",
    name: "Material Design 3",
    cssFile: "./material-design-v3.css",
    classPrefix: "m3-",
    description:
      "Google Material Design 3 with elevation system, state layers, and rounded corners",
  },
};

const LOADED_STYLES: Set<StyleVariant> = new Set();
let CURRENT_STYLE: StyleVariant = "material-design-v3";
const STYLE_ELEMENTS: Map<StyleVariant, HTMLLinkElement> = new Map();

export async function loadStyleVariant(variant: StyleVariant): Promise<void> {
  if (LOADED_STYLES.has(variant)) {
    return;
  }

  const config = STYLE_VARIANTS[variant];
  if (!config) {
    console.warn(`Unknown style variant: ${variant}`);
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = config.cssFile;
  link.id = `style-${variant}`;
  link.dataset.styleVariant = variant;

  await new Promise<void>((resolve, reject) => {
    link.onload = () => resolve();
    link.onerror = () =>
      reject(new Error(`Failed to load style: ${config.cssFile}`));
    document.head.appendChild(link);
  });

  LOADED_STYLES.add(variant);
  STYLE_ELEMENTS.set(variant, link);
}

export function unloadStyleVariant(variant: StyleVariant): void {
  if (!LOADED_STYLES.has(variant)) {
    return;
  }

  const link = STYLE_ELEMENTS.get(variant);
  if (link && link.parentNode) {
    link.parentNode.removeChild(link);
  }

  LOADED_STYLES.delete(variant);
  STYLE_ELEMENTS.delete(variant);
}

export function setCurrentStyle(variant: StyleVariant): void {
  if (variant === CURRENT_STYLE) {
    return;
  }

  CURRENT_STYLE = variant;

  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem("tauri-front-style", variant);
  }

  document.dispatchEvent(
    new CustomEvent("style-changed", {
      detail: { variant, prefix: STYLE_VARIANTS[variant].classPrefix },
    }),
  );
}

export function getCurrentStyle(): StyleVariant {
  return CURRENT_STYLE;
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
  const baseName = baseClass.replace(/^clay-|^glass-|^neu-|^m3-/, "");
  return `${prefix}${baseName}`;
}

export function applyStyleToElement(
  element: HTMLElement,
  variant: StyleVariant,
): void {
  const prefix = getStyleClassPrefix(variant);
  element.dataset.styleVariant = variant;
  element.classList.forEach((cls) => {
    if (
      cls.startsWith("clay-") ||
      cls.startsWith("glass-") ||
      cls.startsWith("neu-") ||
      cls.startsWith("m3-")
    ) {
      element.classList.remove(cls);
    }
  });
  element.classList.add(`${prefix}${element.dataset.baseClass || ""}`);
}
