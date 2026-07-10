export type StyleVariant =
  | "claymorphism"
  | "glassmorphism"
  | "neumorphism"
  | "material-design-v3"
  | "brutalism"
  | "skeuomorphism";

export interface ComponentStyleMap {
  [componentId: string]: {
    variants: {
      [variant: string]: string;
    };
    sizes?: {
      [size: string]: string;
    };
    default?: string;
  };
}

export interface GlobalStyleContext {
  variant?: string;
  size?: string;
}

export interface StyleVariantConfig {
  id: StyleVariant;
  name: string;
  cssString: string;
  classPrefix: string;
  description: string;
  componentStyles: ComponentStyleMap;
}

import {
  CLAYMORPHISM_CSS,
  claymorphismComponentStyles,
  GLASSMORPHISM_CSS,
  glassmorphismComponentStyles,
  NEUMORPHISM_CSS,
  neumorphismComponentStyles,
  MATERIAL_DESIGN_V3_CSS,
  materialDesignV3ComponentStyles,
  BRUTALISM_CSS,
  brutalismComponentStyles,
  SKEUOMORPHISM_CSS,
  skeuomorphismComponentStyles,
} from "./themes/index";

export const STYLE_VARIANTS: Record<StyleVariant, StyleVariantConfig> = {
  claymorphism: {
    id: "claymorphism",
    name: "Claymorphism",
    cssString: CLAYMORPHISM_CSS,
    classPrefix: "clay-",
    description: "Soft raised shadows with clay-like appearance",
    componentStyles: claymorphismComponentStyles,
  },
  glassmorphism: {
    id: "glassmorphism",
    name: "Glassmorphism",
    cssString: GLASSMORPHISM_CSS,
    classPrefix: "glass-",
    description: "Frosted glass effect with backdrop blur",
    componentStyles: glassmorphismComponentStyles,
  },
  neumorphism: {
    id: "neumorphism",
    name: "Neumorphism",
    cssString: NEUMORPHISM_CSS,
    classPrefix: "neu-",
    description: "Soft inset and outset shadows",
    componentStyles: neumorphismComponentStyles,
  },
  "material-design-v3": {
    id: "material-design-v3",
    name: "Material Design 3",
    cssString: MATERIAL_DESIGN_V3_CSS,
    classPrefix: "m3-",
    description: "Google Material Design 3 with elevation system",
    componentStyles: materialDesignV3ComponentStyles,
  },
  brutalism: {
    id: "brutalism",
    name: "Brutalism",
    cssString: BRUTALISM_CSS,
    classPrefix: "brut-",
    description: "Sharp edges, hard shadows, high-contrast typography",
    componentStyles: brutalismComponentStyles,
  },
  skeuomorphism: {
    id: "skeuomorphism",
    name: "Skeuomorphism",
    cssString: SKEUOMORPHISM_CSS,
    classPrefix: "skeu-",
    description:
      "Realistic textures with leather, paper, and glossy highlights",
    componentStyles: skeuomorphismComponentStyles,
  },
};

const LOADED_STYLES: Set<StyleVariant> = new Set();
let CURRENT_STYLE: StyleVariant = "material-design-v3";
const STYLE_ELEMENTS: Map<StyleVariant, HTMLStyleElement> = new Map();

export async function loadStyleVariant(variant: StyleVariant): Promise<void> {
  if (LOADED_STYLES.has(variant)) {
    return;
  }

  const config = STYLE_VARIANTS[variant];
  if (!config) {
    console.warn(`Unknown style variant: ${variant}`);
    return;
  }

  if (!config.cssString) {
    console.warn(`No CSS loaded for variant: ${variant}`);
    return;
  }

  const style = document.createElement("style");
  style.textContent = config.cssString;
  style.id = `style-${variant}`;
  style.dataset.styleVariant = variant;
  // Initially disable all styles - only current style will be enabled
  style.disabled = variant !== CURRENT_STYLE;
  document.head.appendChild(style);

  LOADED_STYLES.add(variant);
  STYLE_ELEMENTS.set(variant, style);
}

export function unloadStyleVariant(variant: StyleVariant): void {
  if (!LOADED_STYLES.has(variant)) {
    return;
  }

  const style = STYLE_ELEMENTS.get(variant);
  if (style && style.parentNode) {
    style.parentNode.removeChild(style);
  }

  LOADED_STYLES.delete(variant);
  STYLE_ELEMENTS.delete(variant);
}

export function setCurrentStyle(variant: StyleVariant): void {
  if (variant === CURRENT_STYLE) {
    return;
  }

  const oldVariant = CURRENT_STYLE;
  CURRENT_STYLE = variant;

  // Enable new variant and disable old variant
  enableStyle(variant);
  if (oldVariant !== variant) {
    disableStyle(oldVariant);
  }

  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem("tauri-front-style", variant);
  }

  document.dispatchEvent(
    new CustomEvent("style-changed", {
      detail: { variant, prefix: STYLE_VARIANTS[variant].classPrefix },
    }),
  );
}

function enableStyle(variant: StyleVariant): void {
  const style = STYLE_ELEMENTS.get(variant);
  if (style) {
    style.disabled = false;
  }
}

function disableStyle(variant: StyleVariant): void {
  const style = STYLE_ELEMENTS.get(variant);
  if (style) {
    style.disabled = true;
  }
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

export function getComponentStyleClasses(
  theme: StyleVariant,
  componentId: string,
  explicitVariant?: string,
  explicitSize?: string,
  globalContext?: GlobalStyleContext,
): string {
  const config = STYLE_VARIANTS[theme];
  if (!config) return "";

  const componentMap = config.componentStyles?.[componentId];
  if (!componentMap) return "";

  const resolvedVariant = explicitVariant || globalContext?.variant;
  const resolvedSize = explicitSize || globalContext?.size;

  const classes: string[] = [];

  if (resolvedVariant) {
    const variantClass = componentMap.variants?.[resolvedVariant];
    if (variantClass) {
      classes.push(variantClass);
    }
  }

  if (resolvedSize && componentMap.sizes) {
    const sizeClass = componentMap.sizes[resolvedSize];
    if (sizeClass) {
      classes.push(sizeClass);
    }
  }

  if (classes.length === 0) {
    return componentMap.default || "";
  }

  return classes.join(" ");
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
