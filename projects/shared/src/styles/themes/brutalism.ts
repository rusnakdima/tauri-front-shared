/**
 * Brutalism CSS - inline for reliable loading
 */
export const BRUTALISM_CSS = `
/* Shared animations */
@keyframes theme-spin { to { transform: rotate(360deg); } }

/* Brutalism Design Tokens - Light mode */
:root {
  --color-brut-base: #f5f5f0;
  --color-brut-ink: #0a0a0a;
  --color-brut-accent: #ff3b30;
  --color-brut-accent-2: #ffd60a;
  --color-brut-success: #00c853;
  --color-brut-border: var(--color-brut-ink);

  /* Shadow presets — key for brutalism */
  --shadow-brut-sm: 4px 4px 0 0 var(--color-brut-ink);
  --shadow-brut-md: 6px 6px 0 0 var(--color-brut-ink);
  --shadow-brut-lg: 8px 8px 0 0 var(--color-brut-ink);

  /* Font families */
  --font-brut-mono: "JetBrains Mono", "Courier New", monospace;
  --font-brut-sans: "Inter", "Arial Black", sans-serif;

  /* Semantic tokens */
  --accent: var(--color-brut-accent);
  --accent-hover: #d62b22;
  --text-on-accent: #ffffff;
  --text-primary: var(--color-brut-ink);
  --text-secondary: #3d3d3d;
  --text-muted: #6b6b6b;
  --text-on-error: #ffffff;
  --text-on-warning: #0a0a0a;
  --text-on-success: #ffffff;
  --bg-primary: var(--color-brut-base);
  --bg-elevated: #ffffff;
  --bg-hover: #e8e8e3;
  --bg-tertiary: #d4d4cf;
  --border-color: var(--color-brut-ink);
  --border-subtle: var(--color-brut-ink);
  --error: var(--color-brut-accent);
  --warning: var(--color-brut-accent-2);
  --success: var(--color-brut-success);
  --info: #0066ff;
}

/* Brutalist component classes */
.brut-card {
  background: var(--bg-elevated);
  border: 4px solid var(--color-brut-border);
  border-radius: 0;
  padding: 1.25rem;
  box-shadow: var(--shadow-brut-md);
  font-family: var(--font-brut-sans);
}
.brut-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.625rem 1.25rem; font-family: var(--font-brut-sans);
  font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;
  border: 4px solid var(--color-brut-border);
  border-radius: 0; background: var(--bg-elevated);
  color: var(--text-primary);
  box-shadow: var(--shadow-brut-sm);
  transition: transform 0.05s, box-shadow 0.05s;
  cursor: pointer; user-select: none;
}
.brut-btn:hover { background: var(--color-brut-accent-2); }
.brut-btn:active { transform: translate(4px, 4px); box-shadow: 0 0 0 0 var(--color-brut-ink); }
.brut-btn-primary { background: var(--accent); color: var(--text-on-accent); }
.brut-btn-sm {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.375rem 0.75rem; font-family: var(--font-brut-sans);
  font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;
  border: 3px solid var(--color-brut-border);
  border-radius: 0; background: var(--bg-elevated);
  color: var(--text-primary);
  box-shadow: var(--shadow-brut-sm);
  transition: transform 0.05s, box-shadow 0.05s;
  cursor: pointer; user-select: none;
}
.brut-btn-lg {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.875rem 1.75rem; font-family: var(--font-brut-sans);
  font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;
  border: 4px solid var(--color-brut-border);
  border-radius: 0; background: var(--bg-elevated);
  color: var(--text-primary);
  box-shadow: var(--shadow-brut-lg);
  transition: transform 0.05s, box-shadow 0.05s;
  cursor: pointer; user-select: none;
}
.brut-input {
  width: 100%; padding: 0.625rem 0.875rem;
  font-family: var(--font-brut-mono); font-size: 0.9375rem;
  border: 4px solid var(--color-brut-border); border-radius: 0;
  background: var(--bg-elevated); color: var(--text-primary);
  box-sizing: border-box;
}
.brut-input:focus { outline: none; background: var(--color-brut-accent-2); }
.brut-modal {
  background: var(--bg-elevated);
  border: 4px solid var(--color-brut-border);
  border-radius: 0; padding: 1.5rem;
  box-shadow: var(--shadow-brut-lg);
  font-family: var(--font-brut-sans);
}
.brut-chip {
  display: inline-flex; align-items: center;
  padding: 0.25rem 0.625rem;
  border: 3px solid var(--color-brut-border); border-radius: 0;
  background: var(--color-brut-accent-2); color: var(--text-primary);
  font-family: var(--font-brut-mono); font-weight: 700;
  text-transform: uppercase; font-size: 0.75rem;
}
.brut-badge {
  display: inline-flex; align-items: center;
  padding: 0.125rem 0.5rem; border: 3px solid var(--color-brut-border);
  border-radius: 0; background: var(--accent); color: var(--text-on-accent);
  font-family: var(--font-brut-mono); font-weight: 700; font-size: 0.75rem;
}
.brut-tabs {
  display: flex; gap: 0;
  border-bottom: 4px solid var(--color-brut-border);
  font-family: var(--font-brut-sans);
}
.brut-tab {
  padding: 0.75rem 1.25rem; font-weight: 900; text-transform: uppercase;
  border: 4px solid var(--color-brut-border); border-bottom: none;
  background: var(--bg-elevated); color: var(--text-primary);
  cursor: pointer; margin-right: 4px;
}
.brut-tab.active { background: var(--accent); color: var(--text-on-accent); }
.brut-divider {
  height: 4px; background: var(--color-brut-border); width: 100%;
  margin: 1rem 0;
}
.brut-spinner {
  width: 32px; height: 32px;
  border: 4px solid var(--color-brut-border);
  border-top-color: var(--accent);
  border-radius: 0;   animation: theme-spin 0.5s linear infinite;
}

/* Brutalist layout components with CSS variable shadows */
.brut-data-table { border: 4px solid var(--color-brut-border); box-shadow: var(--shadow-brut-md); }
.brut-sidebar { border-right: 4px solid var(--color-brut-border); }
.brut-header, .brut-footer { border-bottom: 4px solid var(--color-brut-border); background: var(--bg-elevated); }
.brut-page-container { background: var(--bg-primary); }
.brut-panel { border: 4px solid var(--color-brut-border); box-shadow: var(--shadow-brut-md); border-radius: 0; padding: 16px; }
.brut-segment-selector { border: 3px solid var(--color-brut-border); border-radius: 0; background: var(--bg-elevated); }
.brut-split-view { background: var(--bg-primary); }
.brut-stats-card { border: 4px solid var(--color-brut-border); box-shadow: var(--shadow-brut-lg); padding: 24px; background: var(--bg-elevated); }
.brut-table { border: 4px solid var(--color-brut-border); }
.brut-tree { background: var(--bg-elevated); }
.brut-canvas { background: var(--color-brut-base); border: 4px solid var(--color-brut-border); }
.brut-main-editor { background: var(--color-brut-base); }
.brut-canvas-toolbar, .brut-page-toolbar { border-bottom: 4px solid var(--color-brut-border); background: var(--bg-elevated); }
.brut-command-palette { border: 4px solid var(--color-brut-border); box-shadow: var(--shadow-brut-lg); border-radius: 0; background: var(--bg-elevated); }
.brut-component-palette { border: 4px solid var(--color-brut-border); box-shadow: var(--shadow-brut-md); background: var(--bg-elevated); }
.brut-locale-switcher { border: 3px solid var(--color-brut-border); background: var(--bg-elevated); }
.brut-json-view { border: 3px solid var(--color-brut-border); background: var(--bg-elevated); font-family: monospace; }
.brut-form { border: 4px solid var(--color-brut-border); padding: 16px; background: var(--bg-elevated); }
.brut-properties-panel { border: 4px solid var(--color-brut-border); box-shadow: var(--shadow-brut-md); }
.brut-bottom-panel { border-top: 4px solid var(--color-brut-border); }
.brut-designer-tree { background: var(--bg-elevated); border: 3px solid var(--color-brut-border); }
.brut-designer-sidebar { border-right: 4px solid var(--color-brut-border); }
.brut-block { border: 4px solid var(--color-brut-border); box-shadow: var(--shadow-brut-md); background: var(--bg-elevated); }

/* Dark mode overrides for layout components */
:root.dark {
  --color-brut-base: #1a1a1a;
  --color-brut-ink: #f5f5f0;
  --color-brut-accent: #ff453a;
  --color-brut-accent-2: #ffd60a;
  --color-brut-success: #00e676;
  --text-primary: #f5f5f0;
  --text-secondary: #c0c0c0;
  --text-muted: #909090;
  --bg-primary: #1a1a1a;
  --bg-elevated: #2a2a2a;
  --bg-hover: #3a3a3a;
  --bg-tertiary: #404040;
  --border-color: #f5f5f0;
  --border-subtle: #c0c0c0;
  --error: #ff453a;
}

:root.dark .brut-data-table,
:root.dark .brut-sidebar,
:root.dark .brut-header,
:root.dark .brut-footer,
:root.dark .brut-page-container,
:root.dark .brut-panel,
:root.dark .brut-segment-selector,
:root.dark .brut-split-view,
:root.dark .brut-stats-card,
:root.dark .brut-table,
:root.dark .brut-tree,
:root.dark .brut-canvas,
:root.dark .brut-main-editor,
:root.dark .brut-canvas-toolbar,
:root.dark .brut-page-toolbar,
:root.dark .brut-command-palette,
:root.dark .brut-component-palette,
:root.dark .brut-locale-switcher,
:root.dark .brut-json-view,
:root.dark .brut-form,
:root.dark .brut-properties-panel,
:root.dark .brut-bottom-panel,
:root.dark .brut-designer-tree,
:root.dark .brut-designer-sidebar,
:root.dark .brut-block {
  background: var(--bg-elevated);
  box-shadow: var(--shadow-brut-md);
}

/* Brut card dark mode - uses var(--bg-elevated) which is overridden in :root.dark */
:root.dark .brut-card {
  background: var(--bg-elevated);
  border-color: var(--border-color);
  color: var(--text-primary);
}

/* Brut button dark mode */
:root.dark .brut-btn {
  background: var(--bg-elevated);
  border-color: var(--border-color);
  color: var(--text-primary);
}

/* Brut input dark mode */
:root.dark .brut-input {
  background: var(--bg-elevated);
  border-color: var(--border-color);
  color: var(--text-primary);
}

/* Brut modal dark mode */
:root.dark .brut-modal {
  background: var(--bg-elevated);
  border-color: var(--border-color);
  color: var(--text-primary);
}

/* Brut chip dark mode */
:root.dark .brut-chip {
  background: var(--accent);
  color: var(--text-on-accent);
}

/* Brut badge dark mode */
:root.dark .brut-badge {
  background: var(--accent);
  color: var(--text-on-accent);
}

/* Brut tab dark mode */
:root.dark .brut-tab {
  background: var(--bg-elevated);
  border-color: var(--border-color);
  color: var(--text-primary);
}

:root.dark .brut-tab.active {
  background: var(--accent);
  color: var(--text-on-accent);
}

/* Brut divider dark mode */
:root.dark .brut-divider {
  background: var(--border-color);
}

/* Brut spinner dark mode */
:root.dark .brut-spinner {
  border-color: var(--border-color);
  border-top-color: var(--accent);
}
`;

export const brutalismComponentStyles = {
  "app-button": {
    variants: { default: "brut-btn" },
    sizes: { sm: "brut-btn-sm", md: "", lg: "brut-btn-lg" },
  },
  "app-card": { variants: { default: "brut-card" } },
  "app-input": { variants: { default: "brut-input" } },
  "app-textarea": { variants: { default: "brut-input" } },
  "app-modal": { variants: { default: "brut-modal" } },
  "app-dialog": { variants: { default: "brut-modal" } },
  "app-confirm-dialog": { variants: { default: "brut-modal" } },
  "app-chip": { variants: { default: "brut-chip" } },
  "app-badge": { variants: { default: "brut-badge" } },
  "app-tabs": { variants: { default: "brut-tabs" } },
  "app-divider": { variants: { default: "brut-divider" } },
  "app-spinner": { variants: { default: "brut-spinner" } },
  "app-loading": { variants: { default: "brut-spinner" } },
  "app-checkbox": {
    variants: {
      outlined: "brut-checkbox",
    },
  },
  "app-radio": {
    variants: {
      outlined: "brut-radio",
    },
  },
  "app-slider": {
    variants: {
      outline: "brut-slider",
    },
  },
  "app-snackbar": {
    variants: {
      standard: "brut-snackbar",
    },
  },
  "app-tooltip": {
    variants: {
      default: "brut-tooltip",
    },
  },
  "app-pagination": {
    variants: {
      default: "brut-pagination",
    },
  },
} as const;