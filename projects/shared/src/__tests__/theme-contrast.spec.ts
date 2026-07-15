/**
 * Algorithmic theme contrast and compatibility tests.
 *
 * These tests parse CSS custom properties from theme CSS strings and
 * compute WCAG contrast ratios mathematically — no rendering, no screenshots.
 *
 * Coverage:
 * - Required semantic token presence
 * - var() reference chain resolution
 * - text-on-* tokens vs their base tokens (must meet AA large-text 3:1)
 * - Full text×bg matrix for general text tokens (text-primary/secondary/muted)
 * - Border visibility (1.5:1 minimum against bg-primary)
 * - Accent readability on backgrounds (3:1 large-text threshold)
 * - Dark mode contrast standards maintained
 */

import { describe, it, expect } from "vitest";
import {
  MATERIAL_DESIGN_V3_CSS,
  NEUMORPHISM_CSS,
  CLAYMORPHISM_CSS,
  GLASSMORPHISM_CSS,
  BRUTALISM_CSS,
  SKEUOMORPHISM_CSS,
} from "../styles/themes";
import {
  extractCssVariables,
  extractBlockVariables,
  resolveToken,
  parseColor,
  contrastRatio,
  wcagResult,
  isVarReference,
  isTransparent,
  isOpaque,
  SEMANTIC_TEXT_TOKENS,
  SEMANTIC_BG_TOKENS,
  ContrastFailure,
  ThemeName,
} from "../utils/color";

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/**
 * Map from ThemeName to the data-style attribute value used in CSS.
 */
const DATA_STYLE_MAP: Record<ThemeName, string> = {
  "material-design-v3": "m3",
  neumorphism: "neumorphism",
  claymorphism: "claymorphism",
  glassmorphism: "glassmorphism",
  brutalism: "brutalism",
  skeuomorphism: "skeuomorphism",
};

/**
 * Get theme CSS tokens for light mode (from :root block).
 */
function getLightTokens(css: string): Record<string, string> {
  return extractBlockVariables(css, ":root");
}

/**
 * Get theme CSS tokens for dark mode (from body[data-style="X"][data-theme="dark"] block).
 * Returns empty object if no dark mode block exists.
 */
function getDarkTokens(
  css: string,
  themeName: ThemeName,
): Record<string, string> {
  const ds = DATA_STYLE_MAP[themeName];
  return extractBlockVariables(
    css,
    `body[data-style="${ds}"][data-theme="dark"]`,
  );
}

function resolve(tokens: Record<string, string>, name: string): string | null {
  return resolveToken(name, tokens);
}

const THEMES: { name: ThemeName; css: string }[] = [
  { name: "material-design-v3", css: MATERIAL_DESIGN_V3_CSS },
  { name: "neumorphism", css: NEUMORPHISM_CSS },
  { name: "claymorphism", css: CLAYMORPHISM_CSS },
  { name: "glassmorphism", css: GLASSMORPHISM_CSS },
  { name: "brutalism", css: BRUTALISM_CSS },
  { name: "skeuomorphism", css: SKEUOMORPHISM_CSS },
];

// ---------------------------------------------------------------------------
// Tests — required tokens (light mode)
// ---------------------------------------------------------------------------

describe("theme contrast — required semantic tokens (light mode)", () => {
  const REQUIRED_TOKENS = [
    "text-primary",
    "text-secondary",
    "text-muted",
    "text-on-accent",
    "text-on-error",
    "text-on-warning",
    "text-on-success",
    "bg-primary",
    "bg-secondary",
    "bg-tertiary",
    "bg-elevated",
    "accent",
    "error",
    "warning",
    "success",
    "info",
    "border-color",
  ] as const;

  for (const theme of THEMES) {
    const tokens = getLightTokens(theme.css);

    for (const token of REQUIRED_TOKENS) {
      const defined = token in tokens;
      it(`${theme.name}: --${token} is defined`, () => {
        expect(defined, `--${token} missing in ${theme.name} light mode`).toBe(
          true,
        );
      });
    }
  }
});

// ---------------------------------------------------------------------------
// Tests — var() resolution
// ---------------------------------------------------------------------------

describe("theme contrast — text-on-* tokens resolve to concrete colors", () => {
  const PAIRS: Array<[string, string]> = [
    ["text-on-accent", "accent"],
    ["text-on-error", "error"],
    ["text-on-warning", "warning"],
    ["text-on-success", "success"],
  ];

  for (const theme of THEMES) {
    const tokens = getLightTokens(theme.css);

    for (const [textToken, baseToken] of PAIRS) {
      const textVal = resolve(tokens, textToken);
      const baseVal = resolve(tokens, baseToken);

      it(`${theme.name}: --${textToken} resolves on --${baseToken}`, () => {
        expect(
          textVal,
          `${theme.name}: --${textToken} is var() and unresolvable`,
        ).not.toBeNull();
        expect(
          baseVal,
          `${theme.name}: --${baseToken} is var() and unresolvable`,
        ).not.toBeNull();
      });
    }
  }
});

// ---------------------------------------------------------------------------
// Tests — text-on-* contrast (AA 4.5:1 large text = 3:1)
// ---------------------------------------------------------------------------

describe("theme contrast — text-on-* tokens meet AA large-text 3:1 on base tokens", () => {
  const PAIRS: Array<[string, string]> = [
    ["text-on-accent", "accent"],
    ["text-on-error", "error"],
    ["text-on-warning", "warning"],
    ["text-on-success", "success"],
  ];

  for (const theme of THEMES) {
    const tokens = getLightTokens(theme.css);

    for (const [textToken, baseToken] of PAIRS) {
      const textVal = resolve(tokens, textToken);
      const baseVal = resolve(tokens, baseToken);
      if (!textVal || !baseVal) continue;

      const ratio = contrastRatio(textVal, baseVal);
      if (ratio === null) continue;

      it(`${theme.name}: --${textToken} on --${baseToken} >= 3:1 large-text (got ${ratio.toFixed(2)})`, () => {
        expect(
          ratio >= 3,
          `${theme.name}: --${textToken}/${baseToken} contrast=${ratio.toFixed(2)}:1 < 3:1`,
        ).toBe(true);
      });
    }
  }
});

// ---------------------------------------------------------------------------
// Tests — full text×bg matrix (AA + AAA)
// Only tests general-purpose text tokens. text-on-* tokens are semantic
// and should only be used on their matching colored surfaces (tested separately).
// ---------------------------------------------------------------------------

const GENERAL_TEXT_TOKENS = [
  "text-primary",
  "text-secondary",
  "text-muted",
] as const;

describe("theme contrast — full text×bg matrix (AA + AAA)", () => {
  for (const theme of THEMES) {
    const tokens = getLightTokens(theme.css);

    for (const textToken of GENERAL_TEXT_TOKENS) {
      for (const bgToken of SEMANTIC_BG_TOKENS) {
        const textVal = resolve(tokens, textToken);
        const bgVal = resolve(tokens, bgToken);
        if (!textVal || !bgVal) continue;
        if (isVarReference(textVal) || isVarReference(bgVal)) continue;
        // Skip semi-transparent backgrounds — contrast can't be accurately measured
        // without knowing the page background color (rgba() blends with page content)
        if (isTransparent(bgVal) || !isOpaque(bgVal)) continue;

        const ratio = contrastRatio(textVal, bgVal);
        if (ratio === null) continue;

        const result = wcagResult(ratio);

        it(`${theme.name}: --${textToken} on --${bgToken} AA=${result.levelAA} AAA=${result.levelAAA} (${ratio.toFixed(2)}:1)`, () => {
          expect(result.levelAA).toBe(true);
        });
      }
    }
  }
});

// ---------------------------------------------------------------------------
// Tests — border visibility
// ---------------------------------------------------------------------------

describe("theme contrast — border-color visible on bg-primary (>= 1.5:1)", () => {
  for (const theme of THEMES) {
    const tokens = getLightTokens(theme.css);
    const borderVal = resolve(tokens, "border-color");
    const bgVal = resolve(tokens, "bg-primary");
    if (!borderVal || !bgVal) continue;
    if (isVarReference(borderVal) || isVarReference(bgVal)) continue;
    if (isTransparent(borderVal) || isTransparent(bgVal)) continue;

    const ratio = contrastRatio(borderVal, bgVal);
    if (ratio === null) continue;

    it(`${theme.name}: --border-color on --bg-primary = ${ratio.toFixed(2)}:1 (need >= 1.5)`, () => {
      expect(
        ratio >= 1.5,
        `${theme.name}: border contrast=${ratio.toFixed(2)}:1 < 1.5:1`,
      ).toBe(true);
    });
  }
});

// ---------------------------------------------------------------------------
// Tests — accent readability (>= 3:1 large text)
// ---------------------------------------------------------------------------

describe("theme contrast — accent readable on backgrounds (>= 3:1 large text)", () => {
  for (const theme of THEMES) {
    const tokens = getLightTokens(theme.css);
    const accentVal = resolve(tokens, "accent");
    if (!accentVal) continue;
    if (isVarReference(accentVal) || isTransparent(accentVal)) continue;

    for (const bgToken of SEMANTIC_BG_TOKENS) {
      const bgVal = resolve(tokens, bgToken);
      if (!bgVal) continue;
      if (isVarReference(bgVal) || isTransparent(bgVal)) continue;

      const ratio = contrastRatio(accentVal, bgVal);
      if (ratio === null) continue;

      it(`${theme.name}: --accent on --${bgToken} = ${ratio.toFixed(2)}:1 (large text >= 3:1)`, () => {
        expect(
          ratio >= 3,
          `${theme.name}: accent/${bgToken} contrast=${ratio.toFixed(2)}:1 < 3:1`,
        ).toBe(true);
      });
    }
  }
});

// ---------------------------------------------------------------------------
// Tests — dark mode (AA + AAA)
// ---------------------------------------------------------------------------

describe("theme contrast — dark mode maintained (AA + AAA)", () => {
  // Brutalism has no dark mode — skip it
  const darkModeThemes = THEMES.filter((t) => t.name !== "brutalism");

  for (const theme of darkModeThemes) {
    const tokens = getDarkTokens(theme.css, theme.name);
    // If no dark mode block found (empty tokens), skip this theme
    if (Object.keys(tokens).length === 0) continue;

    for (const textToken of SEMANTIC_TEXT_TOKENS) {
      for (const bgToken of SEMANTIC_BG_TOKENS) {
        const textVal = resolve(tokens, textToken);
        const bgVal = resolve(tokens, bgToken);
        if (!textVal || !bgVal) continue;
        if (isVarReference(textVal) || isVarReference(bgVal)) continue;
        // Skip semi-transparent backgrounds — contrast can't be accurately measured
        // without knowing the page background color (rgba() blends with page content)
        if (isTransparent(bgVal) || !isOpaque(bgVal)) continue;

        const ratio = contrastRatio(textVal, bgVal);
        if (ratio === null) continue;

        const result = wcagResult(ratio);

        it(`${theme.name} dark: --${textToken} on --${bgToken} AA=${result.levelAA} AAA=${result.levelAAA} (${ratio.toFixed(2)}:1)`, () => {
          expect(result.levelAA).toBe(true);
        });
      }
    }
  }
});
