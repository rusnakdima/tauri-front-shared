const TOKENS_CSS = `
/**
 * Claymorphism Design Tokens
 * Light mode (default) + Dark mode via body[data-style="claymorphism"][data-theme="dark"]
 */

/* Base colors */
:root {
  --color-clay-base: #e0e5ec;
  --color-clay-raised: #e0e5ec;
  --color-clay-inset: #d1d9e6;
  --color-clay-accent: #3d1fcc;
  --color-clay-accent-hover: #2d0fcc;
  --color-clay-shadow-light: rgba(255, 255, 255, 0.8);
  --color-clay-shadow-dark: rgba(163, 177, 198, 0.6);
  --color-clay-shadow-dark-strong: rgba(94, 108, 132, 0.4);

  /* Radius tokens */
  --radius-clay-sm: 12px;
  --radius-clay-md: 20px;
  --radius-clay-lg: 24px;
  --radius-clay-xl: 32px;

  /* Semantic tokens */
  --accent: var(--color-clay-accent);
  --accent-hover: var(--color-clay-accent-hover);
  --text-on-accent: #ffffff;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --text-muted: #a0aec0;
  --text-on-error: #ffffff;
  --text-on-warning: #ffffff;
  --text-on-success: #ffffff;
  --bg-elevated: #e8ecf4;
  --bg-primary: #e0e5ec;
  --bg-secondary: #d1d9e6;
  --bg-tertiary: #c8ccd4;
  --border-color: #a3b1c6;
  --border-subtle: #a3b1c6;
  --error: #e53e3e;
  --warning: #b34700;
  --success: #2d7a3a;
  --info: #4299e1;

  /* Gradient color stops for raised/inset surfaces */
  --gradient-clay-light: #f0f5fc;
  --gradient-clay-dark: #d4d9e4;
}

/* Dark mode */
body[data-style="claymorphism"][data-theme="dark"] {
  --color-clay-base: #1a1a2e;
  --color-clay-raised: #252540;
  --color-clay-inset: #1a1a2e;
  --color-clay-accent: #8b7cf7;
  --color-clay-accent-hover: #6d5dfc;
  --color-clay-shadow-light: rgba(255, 255, 255, 0.1);
  --color-clay-shadow-dark: rgba(0, 0, 0, 0.4);
  --color-clay-shadow-dark-strong: rgba(0, 0, 0, 0.6);
  --text-primary: #e2e8f0;
  --text-secondary: #a0aec0;
  --text-muted: #8899aa;
  --bg-elevated: #252540;
  --bg-primary: #1a1a2e;
  --bg-secondary: #252540;
  --bg-tertiary: #1a1a2e;
  --border-color: #4a5568;
  --border-subtle: #4a5568;
}
`;

const COMPONENTS_CSS = `
/* Claymorphism Style System */
/* Class prefix: clay- */

.clay {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-lg);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

.clay-raised {
  background: linear-gradient(145deg, var(--gradient-clay-light), var(--gradient-clay-dark));
  border-radius: var(--radius-clay-lg);
  box-shadow:
    10px 10px 20px var(--color-clay-shadow-dark-strong),
    -10px -10px 20px var(--color-clay-shadow-light);
}

.clay-inset {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-md);
  box-shadow:
    inset 6px 6px 12px var(--color-clay-shadow-dark),
    inset -6px -6px 12px var(--color-clay-shadow-light);
}

.clay-btn {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-md);
  box-shadow:
    6px 6px 12px var(--color-clay-shadow-dark),
    -6px -6px 12px var(--color-clay-shadow-light);
  transition: all 0.2s ease;
  cursor: pointer;
}

.clay-btn:hover {
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

.clay-btn:active,
.clay-btn-pressed {
  box-shadow:
    inset 4px 4px 8px var(--color-clay-shadow-dark),
    inset -4px -4px 8px var(--color-clay-shadow-light);
}

.clay-btn-solid {
  background: var(--color-clay-accent);
  color: var(--text-on-accent);
}

.clay-btn-solid:hover {
  background: var(--color-clay-accent-hover);
}

.clay-btn-outlined {
  background: transparent;
  border: 2px solid var(--color-clay-accent);
  color: var(--color-clay-accent);
}

.clay-btn-text {
  background: transparent;
  color: var(--color-clay-accent);
}

.clay-btn-tonal {
  background: var(--bg-secondary);
  color: var(--color-clay-accent);
}

.clay-btn-icon {
  border-radius: 50%;
  padding: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clay-btn-sm {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: var(--radius-clay-sm);
}

.clay-card {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-xl);
  box-shadow:
    12px 12px 24px var(--color-clay-shadow-dark-strong),
    -12px -12px 24px var(--color-clay-shadow-light);
  padding: 24px;
}

.clay-card-elevated {
  background: linear-gradient(145deg, var(--gradient-clay-light), var(--gradient-clay-dark));
  box-shadow:
    16px 16px 32px var(--color-clay-shadow-dark-strong),
    -16px -16px 32px var(--color-clay-shadow-light);
}

.clay-card-filled {
  background: var(--bg-secondary);
}

.clay-card-outlined {
  background: transparent;
  border: 2px solid var(--border-color);
  box-shadow: none;
}

.clay-input {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    inset 4px 4px 8px var(--color-clay-shadow-dark),
    inset -4px -4px 8px var(--color-clay-shadow-light);
  border: none;
  padding: 12px 16px;
  outline: none;
}

.clay-input:focus {
  box-shadow:
    inset 6px 6px 12px var(--color-clay-shadow-dark),
    inset -6px -6px 12px var(--color-clay-shadow-light);
}

.clay-badge {
  background: linear-gradient(145deg, var(--gradient-clay-light), var(--gradient-clay-dark));
  border-radius: var(--radius-clay-sm);
  box-shadow:
    3px 3px 6px var(--color-clay-shadow-dark),
    -3px -3px 6px var(--color-clay-shadow-light);
  padding: 4px 12px;
}

.clay-avatar {
  background: var(--color-clay-raised);
  border-radius: 50%;
  box-shadow:
    4px 4px 8px var(--color-clay-shadow-dark),
    -4px -4px 8px var(--color-clay-shadow-light);
}

.clay-checkbox {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    inset 3px 3px 6px var(--color-clay-shadow-dark),
    inset -3px -3px 6px var(--color-clay-shadow-light);
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.clay-checkbox:checked {
  background: var(--color-clay-accent);
  box-shadow:
    3px 3px 6px var(--color-clay-shadow-dark),
    -3px -3px 6px var(--color-clay-shadow-light);
}

.clay-toggle {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-lg);
  box-shadow:
    inset 2px 2px 4px var(--color-clay-shadow-dark),
    inset -2px -2px 4px var(--color-clay-shadow-light);
  width: 56px;
  height: 28px;
  cursor: pointer;
}

.clay-toggle-knob {
  background: var(--color-clay-raised);
  border-radius: 50%;
  box-shadow:
    2px 2px 4px var(--color-clay-shadow-dark),
    -2px -2px 4px var(--color-clay-shadow-light);
  width: 24px;
  height: 24px;
  margin: 2px;
  transition: transform 0.2s ease;
}

.clay-toggle-active .clay-toggle-knob {
  transform: translateX(28px);
  background: var(--color-clay-accent);
}

.clay-modal {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-xl);
  box-shadow:
    20px 20px 40px var(--color-clay-shadow-dark-strong),
    -20px -20px 40px var(--color-clay-shadow-light);
  padding: 32px;
}

.clay-tooltip {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    4px 4px 8px var(--color-clay-shadow-dark),
    -4px -4px 8px var(--color-clay-shadow-light);
  padding: 8px 12px;
  font-size: 12px;
}

.clay-progress {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    inset 2px 2px 4px var(--color-clay-shadow-dark),
    inset -2px -2px 4px var(--color-clay-shadow-light);
  height: 12px;
  overflow: hidden;
}

.clay-progress-bar {
  background: linear-gradient(90deg, var(--color-clay-accent), #8b7cf7);
  border-radius: var(--radius-clay-sm);
  height: 100%;
  transition: width 0.3s ease;
}

.clay-slider {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    inset 2px 2px 4px var(--color-clay-shadow-dark),
    inset -2px -2px 4px var(--color-clay-shadow-light);
  height: 8px;
}

.clay-slider-thumb {
  background: var(--color-clay-raised);
  border-radius: 50%;
  box-shadow:
    3px 3px 6px var(--color-clay-shadow-dark),
    -3px -3px 6px var(--color-clay-shadow-light);
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.clay-divider {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-clay-shadow-dark),
    transparent
  );
  height: 1px;
  margin: 16px 0;
}

.clay-text {
  color: var(--text-secondary);
  text-shadow: 1px 1px 2px var(--color-clay-shadow-light);
}

.clay-text-primary {
  color: var(--text-primary);
  font-weight: 600;
}

.clay-text-accent {
  color: var(--color-clay-accent);
}

.clay-data-table {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-lg);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

.clay-sidebar {
  background: var(--color-clay-raised);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

.clay-header,
.clay-footer {
  background: var(--color-clay-raised);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

.clay-page-container {
  background: var(--color-clay-base);
}

.clay-panel {
  background: var(--color-clay-raised);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
  border-radius: var(--radius-clay-lg);
}

.clay-segment-selector {
  background: var(--color-clay-inset);
  box-shadow:
    inset 6px 6px 12px var(--color-clay-shadow-dark),
    inset -6px -6px 12px var(--color-clay-shadow-light);
  border-radius: var(--radius-clay-md);
}

.clay-split-view {
  background: var(--color-clay-base);
}

.clay-stats-card {
  background: var(--color-clay-raised);
  box-shadow:
    12px 12px 24px var(--color-clay-shadow-dark-strong),
    -12px -12px 24px var(--color-clay-shadow-light);
  border-radius: var(--radius-clay-xl);
  padding: 24px;
}

.clay-table {
  background: var(--color-clay-raised);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
  border-radius: var(--radius-clay-md);
}

.clay-tree {
  background: var(--color-clay-raised);
}

.clay-canvas {
  background: var(--color-clay-base);
}

.clay-main-editor {
  background: var(--color-clay-base);
}

.clay-canvas-toolbar,
.clay-page-toolbar {
  background: var(--color-clay-raised);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

.clay-command-palette {
  background: var(--color-clay-raised);
  box-shadow:
    12px 12px 24px var(--color-clay-shadow-dark-strong),
    -12px -12px 24px var(--color-clay-shadow-light);
  border-radius: var(--radius-clay-xl);
}

.clay-component-palette {
  background: var(--color-clay-raised);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
  border-radius: var(--radius-clay-lg);
}

.clay-locale-switcher {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    4px 4px 8px var(--color-clay-shadow-dark),
    -4px -4px 8px var(--color-clay-shadow-light);
}

.clay-json-view {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-md);
  font-family: monospace;
  box-shadow:
    inset 4px 4px 8px var(--color-clay-shadow-dark),
    inset -4px -4px 8px var(--color-clay-shadow-light);
}

.clay-form {
  background: var(--color-clay-raised);
  padding: 16px;
  border-radius: var(--radius-clay-md);
  box-shadow:
    6px 6px 12px var(--color-clay-shadow-dark),
    -6px -6px 12px var(--color-clay-shadow-light);
}

.clay-properties-panel {
  background: var(--color-clay-raised);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
  border-radius: var(--radius-clay-lg);
}

.clay-bottom-panel {
  background: var(--color-clay-raised);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

.clay-designer-tree {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-md);
}

.clay-designer-sidebar {
  background: var(--color-clay-raised);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

.clay-block {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-lg);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}
`;

export const CLAYMORPHISM_CSS = `/* Claymorphism Style System */\n${TOKENS_CSS}\n${COMPONENTS_CSS}`;

export const claymorphismComponentStyles = {
  "app-button": {
    variants: {
      solid: "clay-btn clay-btn-solid",
      outlined: "clay-btn clay-btn-outlined",
      text: "clay-btn clay-btn-text",
      icon: "clay-btn clay-btn-icon",
      tonal: "clay-btn clay-btn-tonal",
    },
    sizes: {
      sm: "clay-btn-sm",
      md: "",
      lg: "",
    },
  },
  "app-card": {
    variants: {
      elevated: "clay-card clay-card-elevated",
      filled: "clay-card clay-card-filled",
      outlined: "clay-card clay-card-outlined",
    },
  },
  "app-theme-toggle": { variants: { default: "clay-toggle" } },
  "app-swap-button": { variants: { default: "clay-swap-btn" } },
  "app-language-selector": { variants: { default: "clay-lang-selector" } },
  "app-text-input": { variants: { default: "clay-input" } },
  "app-translation-output": { variants: { default: "clay-output" } },
  "app-shortcuts-overlay": { variants: { default: "clay-overlay" } },
  "app-dialog": {
    variants: {
      solid: "clay-modal",
    },
  },
  "app-confirm-dialog": {
    variants: {
      solid: "clay-modal",
    },
  },
  "app-modal": {
    variants: {
      solid: "clay-modal",
    },
  },
  "app-checkbox": {
    variants: {
      outlined: "clay-checkbox",
    },
  },
  "app-switch": {
    variants: {
      outlined: "clay-toggle",
    },
  },
  "app-slider": {
    variants: {
      outline: "clay-slider",
    },
  },
  "app-progress-bar": {
    variants: {
      linear: "clay-progress",
    },
  },
  "app-text": {
    variants: {
      default: "clay-text",
    },
  },
  "app-textarea": {
    variants: {
      default: "clay-input",
    },
  },
  "app-avatar": {
    variants: {
      image: "clay-avatar",
      initials: "clay-avatar",
      icon: "clay-avatar",
    },
  },
  "app-chip": {
    variants: {
      assist: "clay-chip",
      filter: "clay-chip",
      input: "clay-chip",
      suggestion: "clay-chip",
    },
  },
  "app-radio": {
    variants: {
      outlined: "clay-radio",
    },
  },
  "app-snackbar": {
    variants: {
      standard: "clay-snackbar",
    },
  },
  "app-tooltip": {
    variants: {
      default: "clay-tooltip",
    },
  },
  "app-pagination": {
    variants: {
      default: "clay-pagination",
    },
  },
} as const;
