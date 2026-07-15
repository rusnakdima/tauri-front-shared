const SKEUOMORPHISM_TOKENS_CSS = `
/* Shared animations */
@keyframes theme-spin { to { transform: rotate(360deg); } }

/**
 * Skeuomorphism Design Tokens
 * Light mode + Dark mode
 */

:root {
  /* Base colors */
  --color-skeu-base: #e8dcc4;
  --color-skeu-leather: #6b4423;
  --color-skeu-leather-dark: #4a2e18;
  --color-skeu-paper: #f5e6c8;
  --color-skeu-ink: #2b1810;
  --color-skeu-accent: #7a5200;
  --color-skeu-accent-dark: #5c3d00;
  --color-skeu-cream: #faf3e0;
  --color-skeu-glass: rgba(255,255,255,0.2);

  /* CONSOLIDATED gradient vars */
  --gradient-leather: linear-gradient(180deg, var(--color-skeu-leather) 0%, var(--color-skeu-leather-dark) 100%);
  --gradient-paper: linear-gradient(180deg, var(--color-skeu-paper) 0%, #e8d9b3 100%);
  --gradient-paper-light: linear-gradient(180deg, #f5e6c8 0%, #e8d9b3 100%);
  --gradient-input: linear-gradient(180deg, #dcc99e 0%, #c4b58a 100%);
  --gradient-tab: linear-gradient(180deg, #d4b890 0%, #b89968 100%);
  --gradient-accent: linear-gradient(180deg, #d4a017 0%, var(--color-skeu-accent-dark) 100%);
  --gradient-divider: linear-gradient(90deg, transparent 0%, var(--color-skeu-leather-dark) 50%, transparent 100%);

  /* Shadow tokens */
  --shadow-skeu-outset:
    0 1px 0 rgba(255,255,255,0.4) inset,
    0 2px 4px rgba(0,0,0,0.2),
    0 4px 8px rgba(0,0,0,0.15),
    0 8px 16px rgba(0,0,0,0.1);
  --shadow-skeu-inset:
    inset 0 2px 4px rgba(0,0,0,0.3),
    inset 0 4px 8px rgba(0,0,0,0.2);
  --shadow-skeu-glossy:
    inset 0 1px 0 rgba(255,255,255,0.5) inset,
    inset 0 -10px 20px rgba(255,255,255,0.1),
    0 2px 4px rgba(0,0,0,0.2);

  /* Radius tokens */
  --radius-skeu-sm: 6px;
  --radius-skeu-md: 12px;
  --radius-skeu-lg: 18px;
  --radius-skeu-xl: 24px;

  /* Semantic tokens */
  --accent: var(--color-skeu-accent);
  --accent-hover: var(--color-skeu-accent-dark);
  --text-on-accent: var(--color-skeu-cream);
  --text-primary: var(--color-skeu-ink);
  --text-secondary: #5c3d20;
  --text-muted: #8a6f50;
  --bg-primary: var(--color-skeu-base);
  --bg-elevated: var(--color-skeu-paper);
  --bg-hover: #dcc99e;
  --bg-secondary: #d4c99e;
  --bg-tertiary: #c4b58a;
  --border-color: var(--color-skeu-leather-dark);
  --border-subtle: #a8916b;
  --error: #8b0000;
  --warning: #c47700;
  --success: #2d5016;
  --info: #1e4d6b;
  --text-on-error: #fff5e6;
  --text-on-warning: var(--color-skeu-ink);
  --text-on-success: var(--color-skeu-paper);
}

/* Dark mode */
body[data-style="skeuomorphism"][data-theme="dark"] {
  --color-skeu-base: #2b1810;
  --color-skeu-leather: #8b6508;
  --color-skeu-leather-dark: #5a3d1a;
  --color-skeu-paper: #3d2b1f;
  --color-skeu-ink: #f5e6c8;
  --color-skeu-accent: #d4a017;
  --color-skeu-accent-dark: #8b6508;
  --color-skeu-cream: #faf3e0;
  --gradient-leather: linear-gradient(180deg, var(--color-skeu-leather) 0%, var(--color-skeu-leather-dark) 100%);
  --gradient-paper: linear-gradient(180deg, var(--color-skeu-paper) 0%, #2d2015 100%);
  --gradient-paper-light: linear-gradient(180deg, #3d2b1f 0%, #2d2015 100%);
  --gradient-input: linear-gradient(180deg, #5a4030 0%, #3d2b1f 100%);
  --text-primary: #f5e6c8;
  --text-secondary: #dcc99e;
  --text-muted: #9f9f9f;
  --bg-primary: #2b1810;
  --bg-elevated: #3d2b1f;
  --bg-hover: #4a3025;
  --bg-secondary: #352a20;
  --bg-tertiary: #1f140f;
  --border-color: #8b6508;
  --border-subtle: #5a3d1a;
  --error: #ff6b6b;
  --warning: #ffd60a;
  --success: #4ade80;
  --info: #60a5fa;
}
`;

const SKEUOMORPHISM_COMPONENTS_CSS = `
/* Skeuomorphic component classes */
.skeu-card {
  background: var(--gradient-leather);
  color: var(--color-skeu-cream);
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-skeu-outset);
  font-family: Georgia, "Times New Roman", serif;
}
.skeu-card.paper {
  background: var(--gradient-paper);
  color: var(--color-skeu-ink);
  border-color: #c4b58a;
}
.skeu-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.625rem 1.25rem; font-family: Georgia, serif;
  font-weight: 600; font-size: 0.9375rem;
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-md);
  background: var(--gradient-leather);
  color: var(--color-skeu-cream);
  box-shadow: var(--shadow-skeu-outset);
  cursor: pointer; text-shadow: 0 1px 0 rgba(0,0,0,0.4);
  transition: filter 0.1s;
}
.skeu-btn:hover { filter: brightness(1.1); }
.skeu-btn:active { box-shadow: var(--shadow-skeu-inset); }
.skeu-btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  border-radius: var(--radius-skeu-sm);
}
.skeu-btn-lg {
  padding: 0.875rem 1.75rem;
  font-size: 1.0625rem;
  border-radius: var(--radius-skeu-lg);
}
.skeu-btn-primary {
  background: var(--gradient-accent);
  color: var(--color-skeu-cream);
  border-color: #5a4406;
}
.skeu-input {
  width: 100%; padding: 0.625rem 0.875rem;
  font-family: Georgia, serif; font-size: 0.9375rem;
  background: var(--gradient-input);
  color: var(--color-skeu-ink);
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-md);
  box-shadow: var(--shadow-skeu-inset);
  box-sizing: border-box;
}
.skeu-input:focus { outline: 2px solid var(--accent); }
.skeu-modal {
  background: var(--gradient-paper);
  color: var(--color-skeu-ink);
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-skeu-outset);
  font-family: Georgia, serif;
}
.skeu-chip {
  display: inline-flex; align-items: center;
  padding: 0.25rem 0.75rem; border-radius: var(--radius-skeu-lg);
  background: var(--gradient-leather);
  color: var(--color-skeu-cream);
  font-family: Georgia, serif; font-size: 0.875rem; font-weight: 500;
  box-shadow: var(--shadow-skeu-outset);
  border: 1px solid var(--color-skeu-leather-dark);
}
.skeu-badge {
  display: inline-flex; align-items: center;
  padding: 0.125rem 0.5rem; border-radius: var(--radius-skeu-md);
  background: var(--gradient-accent);
  color: var(--color-skeu-cream);
  font-family: Georgia, serif; font-weight: 600; font-size: 0.75rem;
  box-shadow: var(--shadow-skeu-outset);
  border: 1px solid #5a4406;
}
.skeu-tabs {
  display: flex; gap: 0.25rem;
  border-bottom: 1px solid var(--color-skeu-leather-dark);
  font-family: Georgia, serif;
}
.skeu-tab {
  padding: 0.625rem 1rem; font-weight: 500;
  background: var(--gradient-tab);
  color: var(--color-skeu-ink);
  border: 1px solid var(--color-skeu-leather-dark);
  border-bottom: none;
  border-radius: var(--radius-skeu-md) var(--radius-skeu-md) 0 0;
  cursor: pointer; margin-bottom: -1px;
}
.skeu-tab.active {
  background: var(--gradient-paper);
  font-weight: 700;
}
.skeu-divider {
  height: 1px; background: var(--gradient-divider);
  margin: 1rem 0;
}
.skeu-spinner {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0deg, var(--accent) 360deg);
  -webkit-mask: radial-gradient(circle, transparent 50%, #000 51%);
          mask: radial-gradient(circle, transparent 50%, #000 51%);
  animation: theme-spin 1s linear infinite;
}

/* Skeuomorphic additional components */
.skeu-data-table { background: var(--gradient-leather); border: 1px solid var(--color-skeu-leather-dark); border-radius: 12px; box-shadow: var(--shadow-skeu-outset); }
.skeu-sidebar { background: var(--gradient-leather); border-right: 1px solid var(--color-skeu-leather-dark); }
.skeu-header, .skeu-footer { background: var(--gradient-paper); border-bottom: 1px solid var(--color-skeu-leather-dark); }
.skeu-page-container { background: var(--color-skeu-base); }
.skeu-panel { background: var(--gradient-paper); border: 1px solid var(--color-skeu-leather-dark); border-radius: 12px; box-shadow: var(--shadow-skeu-outset); padding: 16px; }
.skeu-segment-selector { background: var(--gradient-leather); border: 1px solid var(--color-skeu-leather-dark); border-radius: 8px; }
.skeu-split-view { background: var(--color-skeu-base); }
.skeu-stats-card { background: var(--gradient-paper); border: 1px solid var(--color-skeu-leather-dark); border-radius: 12px; box-shadow: var(--shadow-skeu-outset); padding: 24px; }
.skeu-table { background: var(--gradient-paper); border: 1px solid var(--color-skeu-leather-dark); border-radius: 8px; }
.skeu-tree { background: var(--color-skeu-paper); }
.skeu-canvas { background: var(--color-skeu-base); border: 1px solid var(--color-skeu-leather-dark); }
.skeu-main-editor { background: var(--color-skeu-base); }
.skeu-canvas-toolbar, .skeu-page-toolbar { background: var(--gradient-leather); border-bottom: 1px solid var(--color-skeu-leather-dark); }
.skeu-command-palette { background: var(--gradient-paper); border: 1px solid var(--color-skeu-leather-dark); border-radius: 16px; box-shadow: var(--shadow-skeu-outset); }
.skeu-component-palette { background: var(--gradient-leather); border: 1px solid var(--color-skeu-leather-dark); border-radius: 8px; box-shadow: var(--shadow-skeu-outset); }
.skeu-locale-switcher { background: var(--gradient-leather); border: 1px solid var(--color-skeu-leather-dark); border-radius: 6px; }
.skeu-json-view { background: var(--gradient-input); border: 1px solid var(--color-skeu-leather-dark); border-radius: 6px; font-family: monospace; box-shadow: var(--shadow-skeu-inset); }
.skeu-form { background: var(--color-skeu-paper); padding: 16px; border-radius: 8px; }
.skeu-properties-panel { background: var(--gradient-leather); border: 1px solid var(--color-skeu-leather-dark); border-radius: 12px; box-shadow: var(--shadow-skeu-outset); }
.skeu-bottom-panel { background: var(--color-skeu-base); border-top: 1px solid var(--color-skeu-leather-dark); }
.skeu-designer-tree { background: var(--color-skeu-paper); border: 1px solid var(--color-skeu-leather-dark); border-radius: 8px; }
.skeu-designer-sidebar { background: var(--gradient-leather); border-right: 1px solid var(--color-skeu-leather-dark); }
.skeu-block { background: var(--gradient-paper); border: 1px solid var(--color-skeu-leather-dark); border-radius: 8px; box-shadow: var(--shadow-skeu-outset); }

/* Skeuomorphism Dark Mode Overrides */
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-card {
  background: var(--gradient-leather);
  border-color: var(--color-skeu-leather-dark);
  color: var(--color-skeu-cream);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-card.paper {
  background: var(--gradient-paper);
  border-color: #5a3d1a;
  color: var(--text-primary);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-btn {
  background: var(--gradient-leather);
  border-color: var(--color-skeu-leather-dark);
  color: var(--color-skeu-cream);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-btn-primary {
  background: var(--gradient-accent);
  color: var(--color-skeu-cream);
  border-color: #5a4406;
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-input {
  background: var(--gradient-input);
  border-color: var(--color-skeu-leather-dark);
  color: var(--text-primary);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-modal {
  background: var(--gradient-paper);
  border-color: var(--color-skeu-leather-dark);
  color: var(--text-primary);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-chip {
  background: var(--gradient-leather);
  color: var(--color-skeu-cream);
  border-color: var(--color-skeu-leather-dark);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-badge {
  background: var(--gradient-accent);
  color: var(--color-skeu-cream);
  border-color: #5a4406;
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-tab {
  background: var(--gradient-tab);
  color: var(--text-primary);
  border-color: var(--color-skeu-leather-dark);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-tab.active {
  background: var(--gradient-paper);
  color: var(--text-primary);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-divider {
  background: var(--gradient-divider);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-spinner {
  background: conic-gradient(from 0deg, transparent 0deg, var(--accent) 360deg);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-sidebar,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-header,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-footer,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-canvas-toolbar,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-page-toolbar,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-component-palette,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-locale-switcher,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-properties-panel,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-designer-sidebar {
  background: var(--gradient-leather);
  border-color: var(--color-skeu-leather-dark);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-page-container,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-split-view,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-canvas,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-main-editor,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-bottom-panel {
  background: var(--bg-primary);
}

body[data-style="skeuomorphism"][data-theme="dark"] .skeu-panel,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-form,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-designer-tree,
body[data-style="skeuomorphism"][data-theme="dark"] .skeu-block {
  background: var(--gradient-paper);
  border-color: var(--color-skeu-leather-dark);
}
`;

export const SKEUOMORPHISM_CSS = `/* Skeuomorphism Style System */\n${SKEUOMORPHISM_TOKENS_CSS}\n${SKEUOMORPHISM_COMPONENTS_CSS}`;

export const skeuomorphismComponentStyles = {
  "app-button": {
    variants: { default: "skeu-btn" },
    sizes: { sm: "skeu-btn-sm", md: "", lg: "skeu-btn-lg" },
  },
  "app-card": {
    variants: { default: "skeu-card", paper: "skeu-card paper" },
  },
  "app-input": { variants: { default: "skeu-input" } },
  "app-textarea": { variants: { default: "skeu-input" } },
  "app-modal": { variants: { default: "skeu-modal" } },
  "app-dialog": { variants: { default: "skeu-modal" } },
  "app-confirm-dialog": { variants: { default: "skeu-modal" } },
  "app-chip": { variants: { default: "skeu-chip" } },
  "app-badge": { variants: { default: "skeu-badge" } },
  "app-tabs": { variants: { default: "skeu-tabs" } },
  "app-divider": { variants: { default: "skeu-divider" } },
  "app-spinner": { variants: { default: "skeu-spinner" } },
  "app-loading": { variants: { default: "skeu-spinner" } },
  "app-checkbox": {
    variants: {
      outlined: "skeu-checkbox",
    },
  },
  "app-radio": {
    variants: {
      outlined: "skeu-radio",
    },
  },
  "app-slider": {
    variants: {
      outline: "skeu-slider",
    },
  },
  "app-snackbar": {
    variants: {
      standard: "skeu-snackbar",
    },
  },
  "app-tooltip": {
    variants: {
      default: "skeu-tooltip",
    },
  },
  "app-pagination": {
    variants: {
      default: "skeu-pagination",
    },
  },
} as const;
