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
      [variant: string]: string; // e.g., "solid" → "m3-btn-filled"
    };
    sizes?: {
      [size: string]: string; // e.g., "sm" → "m3-btn-sm"
    };
    default?: string;
  };
}

export interface GlobalStyleContext {
  variant?: string; // e.g., "ghost", "solid", "text"
  size?: string; // e.g., "sm", "md", "lg"
}

export interface StyleVariantConfig {
  id: StyleVariant;
  name: string;
  cssString: string;
  classPrefix: string;
  description: string;
  componentStyles: ComponentStyleMap;
}

// Brutalism CSS - inline for reliable loading
/* Class prefix: brut- */
const BRUTALISM_CSS = `
:root {
  --color-brut-base: #f5f5f0;
  --color-brut-ink: #0a0a0a;
  --color-brut-accent: #ff3b30;
  --color-brut-accent-2: #ffd60a;
  --color-brut-success: #00c853;
  --color-brut-border: #0a0a0a;
  --radius-brut-sm: 0;
  --radius-brut-md: 0;
  --radius-brut-lg: 0;
  --radius-brut-xl: 0;
  --shadow-brut-sm: 4px 4px 0 0 var(--color-brut-ink);
  --shadow-brut-md: 6px 6px 0 0 var(--color-brut-ink);
  --shadow-brut-lg: 8px 8px 0 0 var(--color-brut-ink);
  --font-brut-mono: "JetBrains Mono", "Courier New", monospace;
  --font-brut-sans: "Inter", "Arial Black", sans-serif;

  /* Generic aliases for all components */
  --accent: var(--color-brut-accent);
  --accent-hover: #d62b22;
  --text-on-accent: #ffffff;
  --text-primary: var(--color-brut-ink);
  --text-secondary: #3d3d3d;
  --text-muted: #6b6b6b;
  --bg-primary: var(--color-brut-base);
  --bg-elevated: #ffffff;
  --bg-hover: #e8e8e3;
  --bg-tertiary: #d4d4cf;
  --border-color: var(--color-brut-border);
  --border-subtle: var(--color-brut-border);
  --error: var(--color-brut-accent);
  --warning: var(--color-brut-accent-2);
  --success: var(--color-brut-success);
  --info: #0066ff;
  --text-on-error: #ffffff;
  --text-on-warning: #0a0a0a;
  --text-on-success: #ffffff;
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
  border-radius: 0; animation: brut-spin 0.5s linear infinite;
}
@keyframes brut-spin { to { transform: rotate(360deg); } }
`;

// Skeuomorphism CSS - inline for reliable loading
/* Class prefix: skeu- */
const SKEUOMORPHISM_CSS = `
:root {
  --color-skeu-base: #e8dcc4;
  --color-skeu-leather: #6b4423;
  --color-skeu-leather-dark: #4a2e18;
  --color-skeu-paper: #f5e6c8;
  --color-skeu-ink: #2b1810;
  --color-skeu-accent: #b8860b;
  --color-skeu-accent-dark: #8b6508;
  --color-skeu-cream: #faf3e0;
  --color-skeu-glass: rgba(255,255,255,0.2);
  --radius-skeu-sm: 6px;
  --radius-skeu-md: 12px;
  --radius-skeu-lg: 18px;
  --radius-skeu-xl: 24px;
  --shadow-skeu-outset:
    inset 0 1px 0 rgba(255,255,255,0.4),
    inset 0 -1px 0 rgba(0,0,0,0.1),
    0 2px 4px rgba(0,0,0,0.2),
    0 4px 8px rgba(0,0,0,0.15);
  --shadow-skeu-inset:
    inset 0 2px 4px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(0,0,0,0.2);
  --shadow-skeu-glossy:
    inset 0 1px 0 rgba(255,255,255,0.5),
    inset 0 -10px 20px rgba(255,255,255,0.1),
    0 4px 8px rgba(0,0,0,0.2);

  /* Generic aliases for all components */
  --accent: var(--color-skeu-accent);
  --accent-hover: var(--color-skeu-accent-dark);
  --text-on-accent: var(--color-skeu-cream);
  --text-primary: var(--color-skeu-ink);
  --text-secondary: #5c3d20;
  --text-muted: #8a6f50;
  --bg-primary: var(--color-skeu-base);
  --bg-elevated: var(--color-skeu-paper);
  --bg-hover: #dcc99e;
  --bg-tertiary: #c4b58a;
  --border-color: var(--color-skeu-leather-dark);
  --border-subtle: #a8916b;
  --error: #8b0000;
  --warning: #c47700;
  --success: #2d5016;
  --info: #1e4d6b;
  --text-on-error: #fff5e6;
  --text-on-warning: #2b1810;
  --text-on-success: #f5e6c8;
}

/* Skeuomorphic component classes */
.skeu-card {
  background: linear-gradient(180deg, var(--color-skeu-leather) 0%, var(--color-skeu-leather-dark) 100%);
  color: var(--color-skeu-cream);
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-skeu-outset);
  font-family: Georgia, "Times New Roman", serif;
}
.skeu-card.paper {
  background: linear-gradient(180deg, var(--color-skeu-paper) 0%, #e8d9b3 100%);
  color: var(--color-skeu-ink);
  border-color: #c4b58a;
}
.skeu-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.625rem 1.25rem; font-family: Georgia, serif;
  font-weight: 600; font-size: 0.9375rem;
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-md);
  background: linear-gradient(180deg, var(--color-skeu-leather) 0%, var(--color-skeu-leather-dark) 100%);
  color: var(--color-skeu-cream);
  box-shadow: var(--shadow-skeu-outset);
  cursor: pointer; text-shadow: 0 1px 0 rgba(0,0,0,0.4);
  transition: filter 0.1s;
}
.skeu-btn:hover { filter: brightness(1.1); }
.skeu-btn:active { box-shadow: var(--shadow-skeu-inset); }
.skeu-btn-primary {
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  color: var(--color-skeu-cream);
  border-color: #5a4406;
}
.skeu-input {
  width: 100%; padding: 0.625rem 0.875rem;
  font-family: Georgia, serif; font-size: 0.9375rem;
  background: linear-gradient(180deg, #dcc99e 0%, #c4b58a 100%);
  color: var(--color-skeu-ink);
  border: 1px solid var(--color-skeu-leather-dark);
  border-radius: var(--radius-skeu-md);
  box-shadow: var(--shadow-skeu-inset);
  box-sizing: border-box;
}
.skeu-input:focus { outline: 2px solid var(--accent); }
.skeu-modal {
  background: linear-gradient(180deg, var(--color-skeu-paper) 0%, #e8d9b3 100%);
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
  background: linear-gradient(180deg, var(--color-skeu-leather) 0%, var(--color-skeu-leather-dark) 100%);
  color: var(--color-skeu-cream);
  font-family: Georgia, serif; font-size: 0.875rem; font-weight: 500;
  box-shadow: var(--shadow-skeu-outset);
  border: 1px solid var(--color-skeu-leather-dark);
}
.skeu-badge {
  display: inline-flex; align-items: center;
  padding: 0.125rem 0.5rem; border-radius: var(--radius-skeu-md);
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
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
  background: linear-gradient(180deg, #d4b890 0%, #b89968 100%);
  color: var(--color-skeu-ink);
  border: 1px solid var(--color-skeu-leather-dark);
  border-bottom: none;
  border-radius: var(--radius-skeu-md) var(--radius-skeu-md) 0 0;
  cursor: pointer; margin-bottom: -1px;
}
.skeu-tab.active {
  background: linear-gradient(180deg, var(--color-skeu-paper) 0%, #e8d9b3 100%);
  font-weight: 700;
}
.skeu-divider {
  height: 1px; background: linear-gradient(90deg, transparent 0%, var(--color-skeu-leather-dark) 50%, transparent 100%);
  margin: 1rem 0;
}
.skeu-spinner {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0deg, var(--accent) 360deg);
  -webkit-mask: radial-gradient(circle, transparent 50%, #000 51%);
          mask: radial-gradient(circle, transparent 50%, #000 51%);
  animation: skeu-spin 1s linear infinite;
}
@keyframes skeu-spin { to { transform: rotate(360deg); } }
`;

// Neumorphism CSS - inline for reliable loading
const NEUMORPHISM_CSS = `
/* Neumorphism Style System for TailwindCSS v4 */
/* Class prefix: neu- */

:root {
  /* Neumorphism color palette - muted base colors */
  --color-neu-base: #e0e5ec;
  --color-neu-base-dark: #c8ccd4;
  --color-neu-base-light: #f8fafc;
  --color-neu-shadow-dark: #a3b1c6;
  --color-neu-shadow-light: #ffffff;
  --color-neu-shadow-dark-strong: #8a9bb0;
  --color-neu-shadow-light-strong: #ffffff;
  --color-neu-accent: #6d5dfc;
  --color-neu-accent-muted: #8b7cf7;
  --color-neu-text: #4a5568;
  --color-neu-text-light: #718096;
  --color-neu-text-dark: #2d3748;

  /* Neumorphism spacing */
  --radius-neu-sm: 8px;
  --radius-neu-md: 12px;
  --radius-neu-lg: 16px;
  --radius-neu-xl: 24px;

  /* Neumorphism shadow values */
  --shadow-neu-outset:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
  --shadow-neu-outset-strong:
    10px 10px 20px var(--color-neu-shadow-dark-strong),
    -10px -10px 20px var(--color-neu-shadow-light-strong);
  --shadow-neu-inset:
    inset 6px 6px 12px var(--color-neu-shadow-dark),
    inset -6px -6px 12px var(--color-neu-shadow-light);
  --shadow-neu-inset-strong:
    inset 8px 8px 16px var(--color-neu-shadow-dark-strong),
    inset -8px -8px 16px var(--color-neu-shadow-light-strong);

  /* Generic variables for all components */
  --accent: #6d5dfc;
  --accent-hover: #5a4cdb;
  --text-on-accent: #ffffff;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --text-muted: #a0aec0;
  --text-on-error: #ffffff;
  --bg-elevated: #e8ecf4;
  --border-color: #a3b1c6;
  --error: #e53e3e;
  --success: #48bb78;
}

/* Base neumorphism utility */
.neu {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow: var(--shadow-neu-outset);
}

/* Neumorphism raised surface */
.neu-raised {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset-strong);
}

/* Neumorphism pressed/inset state */
.neu-pressed {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-md);
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism flat surface */
.neu-flat {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow: none;
}

/* Neumorphism button */
.neu-btn {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-md);
  box-shadow: var(--shadow-neu-outset);
  color: var(--color-neu-text);
  font-weight: 500;
  transition: all 0.15s ease;
  cursor: pointer;
}

.neu-btn:hover {
  box-shadow: var(--shadow-neu-outset-strong);
}

.neu-btn:active,
.neu-btn-pressed {
  box-shadow: var(--shadow-neu-inset);
}

.neu-btn-primary {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  color: var(--color-neu-accent);
}

.neu-btn-primary:active,
.neu-btn-primary-pressed {
  background: linear-gradient(145deg, #d4d9e4, #f0f5fc);
}

/* Neumorphism card */
.neu-card {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset-strong);
  padding: 24px;
}

/* Neumorphism card hoverable */
.neu-card-hoverable {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset-strong);
  padding: 24px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.neu-card-hoverable:hover {
  box-shadow:
    12px 12px 24px var(--color-neu-shadow-dark-strong),
    -12px -12px 24px var(--color-neu-shadow-light-strong);
}

.neu-card-hoverable:active {
  box-shadow: var(--shadow-neu-inset-strong);
}

/* Neumorphism input */
.neu-input {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-sm);
  box-shadow: var(--shadow-neu-inset);
  border: none;
  padding: 12px 16px;
  color: var(--color-neu-text-dark);
  outline: none;
  transition: all 0.15s ease;
}

.neu-input::placeholder {
  color: var(--color-neu-text-light);
}

.neu-input:focus {
  box-shadow:
    inset 8px 8px 16px var(--color-neu-shadow-dark),
    inset -8px -8px 16px var(--color-neu-shadow-light);
}

/* Neumorphism textarea */
.neu-textarea {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-md);
  box-shadow: var(--shadow-neu-inset);
  border: none;
  padding: 16px;
  color: var(--color-neu-text-dark);
  outline: none;
  resize: vertical;
  min-height: 100px;
}

/* Neumorphism badge */
.neu-badge {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: var(--radius-neu-sm);
  box-shadow:
    3px 3px 6px var(--color-neu-shadow-dark),
    -3px -3px 6px var(--color-neu-shadow-light);
  padding: 4px 12px;
  color: var(--color-neu-text);
  font-size: 12px;
  font-weight: 500;
}

/* Neumorphism avatar */
.neu-avatar {
  background: var(--color-neu-base);
  border-radius: 50%;
  box-shadow:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
}

/* Neumorphism checkbox */
.neu-checkbox {
  background: var(--color-neu-base);
  border-radius: 6px;
  box-shadow: var(--shadow-neu-outset);
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.neu-checkbox-check {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: var(--color-neu-accent);
  box-shadow: var(--shadow-neu-inset);
  opacity: 0;
  transform: scale(0);
  transition: all 0.15s ease;
}

.neu-checkbox:checked .neu-checkbox-check {
  opacity: 1;
  transform: scale(1);
}

/* Neumorphism radio */
.neu-radio {
  background: var(--color-neu-base);
  border-radius: 50%;
  box-shadow: var(--shadow-neu-outset);
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.neu-radio-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-neu-accent);
  box-shadow: var(--shadow-neu-inset);
  opacity: 0;
  transform: scale(0);
  transition: all 0.15s ease;
}

.neu-radio:checked .neu-radio-dot {
  opacity: 1;
  transform: scale(1);
}

/* Neumorphism toggle/switch */
.neu-toggle {
  background: var(--color-neu-base);
  border-radius: 20px;
  box-shadow: var(--shadow-neu-outset);
  width: 60px;
  height: 30px;
  cursor: pointer;
  position: relative;
}

.neu-toggle-knob {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: 50%;
  box-shadow:
    3px 3px 6px var(--color-neu-shadow-dark),
    -3px -3px 6px var(--color-neu-shadow-light);
  width: 24px;
  height: 24px;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: all 0.2s ease;
}

.neu-toggle-active {
  box-shadow: var(--shadow-neu-inset);
}

.neu-toggle-active .neu-toggle-knob {
  left: 33px;
  background: var(--color-neu-accent);
}

/* Neumorphism slider */
.neu-slider {
  background: var(--color-neu-base);
  border-radius: 10px;
  box-shadow: var(--shadow-neu-inset);
  height: 10px;
  position: relative;
}

.neu-slider-thumb {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: 50%;
  box-shadow:
    4px 4px 8px var(--color-neu-shadow-dark),
    -4px -4px 8px var(--color-neu-shadow-light);
  width: 28px;
  height: 28px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.15s ease;
}

.neu-slider-thumb:hover {
  box-shadow:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
}

.neu-slider-thumb:active {
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism progress bar */
.neu-progress {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-sm);
  box-shadow: var(--shadow-neu-inset);
  height: 14px;
  overflow: hidden;
}

.neu-progress-bar {
  background: linear-gradient(
    90deg,
    var(--color-neu-accent),
    var(--color-neu-accent-muted)
  );
  border-radius: var(--radius-neu-sm);
  height: 100%;
  transition: width 0.3s ease;
  box-shadow:
    inset 2px 2px 4px rgba(0, 0, 0, 0.1),
    2px 2px 4px var(--color-neu-shadow-light);
}

/* Neumorphism modal/dialog */
.neu-modal {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow:
    20px 20px 40px var(--color-neu-shadow-dark-strong),
    -20px -20px 40px var(--color-neu-shadow-light-strong);
  padding: 32px;
}

/* Neumorphism tooltip */
.neu-tooltip {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-sm);
  box-shadow:
    4px 4px 8px var(--color-neu-shadow-dark),
    -4px -4px 8px var(--color-neu-shadow-light);
  padding: 8px 14px;
  color: var(--color-neu-text);
  font-size: 12px;
  box-shadow:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
}

/* Neumorphism divider */
.neu-divider {
  background: var(--color-neu-base);
  border-radius: 2px;
  height: 2px;
  box-shadow:
    inset 1px 1px 2px var(--color-neu-shadow-dark),
    inset -1px -1px 2px var(--color-neu-shadow-light);
  margin: 16px 0;
}

/* Neumorphism container */
.neu-container {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow:
    8px 8px 16px var(--color-neu-shadow-dark),
    -8px -8px 16px var(--color-neu-shadow-light);
  padding: 24px;
}

/* Neumorphism navigation */
.neu-nav {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow:
    4px 4px 8px var(--color-neu-shadow-dark),
    -4px -4px 8px var(--color-neu-shadow-light);
  padding: 8px;
}

.neu-nav-item {
  color: var(--color-neu-text);
  padding: 12px 20px;
  border-radius: var(--radius-neu-md);
  transition: all 0.15s ease;
}

.neu-nav-item:hover {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  box-shadow:
    3px 3px 6px var(--color-neu-shadow-dark),
    -3px -3px 6px var(--color-neu-shadow-light);
}

.neu-nav-item-active {
  color: var(--color-neu-accent);
  background: var(--color-neu-base);
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism tabs */
.neu-tabs {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow:
    inset 4px 4px 8px var(--color-neu-shadow-dark),
    inset -4px -4px 8px var(--color-neu-shadow-light);
  padding: 6px;
  display: flex;
  gap: 4px;
}

.neu-tab {
  color: var(--color-neu-text-light);
  padding: 10px 20px;
  border-radius: var(--radius-neu-md);
  transition: all 0.15s ease;
  cursor: pointer;
}

.neu-tab:hover {
  color: var(--color-neu-text-dark);
}

.neu-tab-active {
  color: var(--color-neu-accent);
  background: var(--color-neu-base);
  box-shadow:
    3px 3px 6px var(--color-neu-shadow-dark),
    -3px -3px 6px var(--color-neu-shadow-light);
}

/* Neumorphism pagination */
.neu-pagination {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow:
    inset 4px 4px 8px var(--color-neu-shadow-dark),
    inset -4px -4px 8px var(--color-neu-shadow-light);
  padding: 6px;
  display: flex;
  gap: 4px;
}

.neu-page-btn {
  color: var(--color-neu-text);
  width: 36px;
  height: 36px;
  border-radius: var(--radius-neu-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  cursor: pointer;
  background: transparent;
}

.neu-page-btn:hover {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  box-shadow:
    2px 2px 4px var(--color-neu-shadow-dark),
    -2px -2px 4px var(--color-neu-shadow-light);
}

.neu-page-btn-active {
  color: var(--color-neu-accent);
  background: var(--color-neu-base);
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism select/dropdown */
.neu-select {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-sm);
  box-shadow: var(--shadow-neu-outset);
  padding: 12px 16px;
  color: var(--color-neu-text-dark);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234a5568' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

/* Neumorphism text styles */
.neu-text {
  color: var(--color-neu-text);
}

.neu-text-primary {
  color: var(--color-neu-text-dark);
  font-weight: 600;
}

.neu-text-accent {
  color: var(--color-neu-accent);
}

/* Neumorphism icon button */
.neu-icon-btn {
  background: var(--color-neu-base);
  border-radius: 50%;
  box-shadow:
    4px 4px 8px var(--color-neu-shadow-dark),
    -4px -4px 8px var(--color-neu-shadow-light);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  color: var(--color-neu-text);
}

.neu-icon-btn:hover {
  box-shadow:
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
}

.neu-icon-btn:active {
  box-shadow: var(--shadow-neu-inset);
}

/* Neumorphism spinner/loading */
.neu-spinner {
  background: var(--color-neu-base);
  border-radius: 50%;
  box-shadow: var(--shadow-neu-outset);
  width: 40px;
  height: 40px;
  position: relative;
}

.neu-spinner::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--color-neu-accent);
  animation: neu-spin 1s linear infinite;
}

@keyframes neu-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Neumorphism empty state */
.neu-empty {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset);
  padding: 48px;
  text-align: center;
  color: var(--color-neu-text-light);
}

/* Neumorphism notification/toast */
.neu-toast {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-lg);
  box-shadow:
    8px 8px 16px var(--color-neu-shadow-dark),
    -8px -8px 16px var(--color-neu-shadow-light);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.neu-toast-success {
  border-left: 4px solid #48bb78;
}

.neu-toast-error {
  border-left: 4px solid #f56565;
}

.neu-toast-warning {
  border-left: 4px solid #ed8936;
}

.neu-toast-info {
  border-left: 4px solid #4299e1;
}
`;

// Claymorphism CSS - inline for reliable loading
const CLAYMORPHISM_CSS = `
/* Claymorphism Style System for TailwindCSS v4 */
/* Class prefix: clay- */

:root {
  /* Claymorphism color palette */
  --color-clay-base: #e0e5ec;
  --color-clay-raised: #e0e5ec;
  --color-clay-inset: #d1d9e6;
  --color-clay-accent: #6d5dfc;
  --color-clay-accent-hover: #5a4cdb;
  --color-clay-shadow-light: rgba(255, 255, 255, 0.8);
  --color-clay-shadow-dark: rgba(163, 177, 198, 0.6);
  --color-clay-shadow-dark-strong: rgba(94, 108, 132, 0.4);

  /* Claymorphism spacing */
  --radius-clay-sm: 12px;
  --radius-clay-md: 20px;
  --radius-clay-lg: 24px;
  --radius-clay-xl: 32px;

  /* Generic variables for all components */
  --accent: #6d5dfc;
  --accent-hover: #5a4cdb;
  --text-on-accent: #ffffff;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --text-muted: #a0aec0;
  --text-on-error: #ffffff;
  --bg-elevated: #e8ecf4;
  --border-color: #a3b1c6;
  --error: #e53e3e;
  --success: #48bb78;
}

/* Base claymorphism utility */
.clay {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-lg);
  box-shadow:
    8px 8px 16px var(--color-clay-shadow-dark),
    -8px -8px 16px var(--color-clay-shadow-light);
}

/* Claymorphism raised surface */
.clay-raised {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: var(--radius-clay-lg);
  box-shadow:
    10px 10px 20px var(--color-clay-shadow-dark-strong),
    -10px -10px 20px var(--color-clay-shadow-light);
}

/* Claymorphism inset/pressed state */
.clay-inset {
  background: var(--color-clay-inset);
  border-radius: var(--radius-clay-md);
  box-shadow:
    inset 6px 6px 12px var(--color-clay-shadow-dark),
    inset -6px -6px 12px var(--color-clay-shadow-light);
}

/* Claymorphism button */
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

/* Claymorphism card */
.clay-card {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-xl);
  box-shadow:
    12px 12px 24px var(--color-clay-shadow-dark-strong),
    -12px -12px 24px var(--color-clay-shadow-light);
  padding: 24px;
}

/* Claymorphism input */
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

/* Claymorphism badge */
.clay-badge {
  background: linear-gradient(145deg, #f0f5fc, #d4d9e4);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    3px 3px 6px var(--color-clay-shadow-dark),
    -3px -3px 6px var(--color-clay-shadow-light);
  padding: 4px 12px;
}

/* Claymorphism avatar */
.clay-avatar {
  background: var(--color-clay-raised);
  border-radius: 50%;
  box-shadow:
    4px 4px 8px var(--color-clay-shadow-dark),
    -4px -4px 8px var(--color-clay-shadow-light);
}

/* Claymorphism checkbox */
.clay-checkbox {
  background: var(--color-clay-inset);
  border-radius: 6px;
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

/* Claymorphism toggle/switch */
.clay-toggle {
  background: var(--color-clay-inset);
  border-radius: 16px;
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

/* Claymorphism modal/dialog */
.clay-modal {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-xl);
  box-shadow:
    20px 20px 40px var(--color-clay-shadow-dark-strong),
    -20px -20px 40px var(--color-clay-shadow-light);
  padding: 32px;
}

/* Claymorphism tooltip */
.clay-tooltip {
  background: var(--color-clay-raised);
  border-radius: var(--radius-clay-sm);
  box-shadow:
    4px 4px 8px var(--color-clay-shadow-dark),
    -4px -4px 8px var(--color-clay-shadow-light);
  padding: 8px 12px;
  font-size: 12px;
}

/* Claymorphism progress bar */
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

/* Claymorphism slider */
.clay-slider {
  background: var(--color-clay-inset);
  border-radius: 8px;
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

/* Claymorphism divider */
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

/* Claymorphism text styles */
.clay-text {
  color: #4a5568;
  text-shadow: 1px 1px 2px var(--color-clay-shadow-light);
}

.clay-text-primary {
  color: #2d3748;
  font-weight: 600;
}

.clay-text-accent {
  color: var(--color-clay-accent);
}
`;

// Glassmorphism CSS - inline for reliable loading
const GLASSMORPHISM_CSS = `
/* Glasmorphism Style System for TailwindCSS v4 */
/* Class prefix: glass- */

:root {
  /* Glasmorphism color palette */
  --color-glass-bg: rgba(255, 255, 255, 0.1);
  --color-glass-bg-hover: rgba(255, 255, 255, 0.15);
  --color-glass-bg-active: rgba(255, 255, 255, 0.2);
  --color-glass-border: rgba(255, 255, 255, 0.45);
  --color-glass-border-strong: rgba(255, 255, 255, 0.6);
  --color-glass-white: rgba(255, 255, 255, 0.8);
  --color-glass-blur: rgba(255, 255, 255, 0.05);
  --color-glass-accent: #6d5dfc;
  --color-glass-accent-hover: #8b7cf7;
  --color-glass-dark: rgba(0, 0, 0, 0.3);
  --color-glass-dark-strong: rgba(0, 0, 0, 0.5);

  /* Glassmorphism spacing */
  --radius-glass-sm: 8px;
  --radius-glass-md: 12px;
  --radius-glass-lg: 16px;
  --radius-glass-xl: 24px;

  /* Blur values */
  --blur-glass-light: 10px;
  --blur-glass-medium: 20px;
  --blur-glass-heavy: 40px;

  /* Generic variables for all components */
  --accent: #6d5dfc;
  --accent-hover: #5a4cdb;
  --text-on-accent: #ffffff;
  --text-primary: #1a1a2e;
  --text-secondary: #718096;
  --text-muted: #a0aec0;
  --text-on-error: #ffffff;
  --bg-elevated: rgba(255, 255, 255, 0.15);
  --border-color: rgba(255, 255, 255, 0.45);
  --error: #e53e3e;
  --success: #48bb78;
}

/* Base glassmorphism utility */
.glass {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-lg);
}

/* Glassmorphism surface */
.glass-surface {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(var(--blur-glass-heavy));
  -webkit-backdrop-filter: blur(var(--blur-glass-heavy));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-xl);
  box-shadow:
    0 8px 32px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Glassmorphism light variant */
.glass-light {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-glass-md);
}

/* Glassmorphism dark variant */
.glass-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-glass-lg);
  box-shadow: 0 8px 32px var(--color-glass-dark-strong);
}

/* Glassmorphism button */
.glass-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-md);
  color: var(--color-glass-white);
  transition: all 0.3s ease;
  cursor: pointer;
}

.glass-btn:hover {
  background: var(--color-glass-bg-hover);
  border-color: var(--color-glass-border-strong);
  box-shadow:
    0 4px 16px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-btn:active,
.glass-btn-pressed {
  background: var(--color-glass-bg-active);
  transform: scale(0.98);
}

/* Glassmorphism primary button */
.glass-btn-primary {
  background: linear-gradient(
    135deg,
    var(--color-glass-accent) 0%,
    #8b7cf7 100%
  );
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  box-shadow:
    0 4px 16px rgba(109, 93, 252, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-btn-primary:hover {
  background: linear-gradient(
    135deg,
    var(--color-glass-accent-hover) 0%,
    #9d8ff7 100%
  );
  box-shadow:
    0 6px 24px rgba(109, 93, 252, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Glassmorphism card */
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(var(--blur-glass-heavy));
  -webkit-backdrop-filter: blur(var(--blur-glass-heavy));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-xl);
  box-shadow:
    0 8px 32px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  padding: 24px;
}

/* Glassmorphism input */
.glass-input {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-sm);
  color: white;
  padding: 12px 16px;
  outline: none;
  transition: all 0.3s ease;
}

.glass-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.glass-input:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-glass-accent);
  box-shadow:
    0 0 0 3px rgba(109, 93, 252, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Glassmorphism badge */
.glass-badge {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-glass-sm);
  padding: 4px 12px;
  color: var(--color-glass-white);
  font-size: 12px;
  font-weight: 500;
}

/* Glassmorphism avatar */
.glass-avatar {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  box-shadow: 0 4px 16px var(--color-glass-dark);
}

/* Glassmorphism checkbox */
.glass-checkbox {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: 6px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glass-checkbox:checked {
  background: var(--color-glass-accent);
  border-color: var(--color-glass-accent);
  box-shadow:
    0 0 0 3px rgba(109, 93, 252, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Glassmorphism toggle/switch */
.glass-toggle {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: 20px;
  width: 56px;
  height: 28px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glass-toggle-knob {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.6) 100%
  );
  border-radius: 50%;
  box-shadow: 0 2px 8px var(--color-glass-dark);
  width: 22px;
  height: 22px;
  margin: 2px;
  transition: all 0.3s ease;
}

.glass-toggle-active {
  background: var(--color-glass-accent);
  border-color: var(--color-glass-accent);
}

.glass-toggle-active .glass-toggle-knob {
  transform: translateX(28px);
  background: white;
}

/* Glassmorphism modal/dialog */
.glass-modal {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(var(--blur-glass-heavy));
  -webkit-backdrop-filter: blur(var(--blur-glass-heavy));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-xl);
  box-shadow:
    0 24px 48px var(--color-glass-dark-strong),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  padding: 32px;
}

/* Glassmorphism tooltip */
.glass-tooltip {
  background: linear-gradient(
    135deg,
    rgba(60, 60, 60, 0.9) 0%,
    rgba(40, 40, 40, 0.9) 100%
  );
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-glass-sm);
  padding: 8px 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  box-shadow: 0 4px 16px var(--color-glass-dark-strong);
}

/* Glassmorphism progress bar */
.glass-progress {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-sm);
  height: 12px;
  overflow: hidden;
}

.glass-progress-bar {
  background: linear-gradient(
    90deg,
    var(--color-glass-accent),
    #8b7cf7,
    var(--color-glass-accent-hover)
  );
  background-size: 200% 100%;
  border-radius: var(--radius-glass-sm);
  height: 100%;
  animation: glass-progress-shine 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(109, 93, 252, 0.5);
}

@keyframes glass-progress-shine {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

/* Glassmorphism slider */
.glass-slider {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border: 1px solid var(--color-glass-border);
  border-radius: 8px;
  height: 8px;
}

.glass-slider-thumb {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 100%
  );
  backdrop-filter: blur(var(--blur-glass-light));
  -webkit-backdrop-filter: blur(var(--blur-glass-light));
  border-radius: 50%;
  box-shadow:
    0 2px 8px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.glass-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow:
    0 4px 12px var(--color-glass-dark),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

/* Glassmorphism navigation */
.glass-nav {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(var(--blur-glass-medium));
  -webkit-backdrop-filter: blur(var(--blur-glass-medium));
  border-bottom: 1px solid var(--color-glass-border);
}

.glass-nav-item {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  padding: 12px 16px;
  border-radius: var(--radius-glass-sm);
}

.glass-nav-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.glass-nav-item-active {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  border-bottom: 2px solid var(--color-glass-accent);
}

/* Glassmorphism text styles */
.glass-text {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px var(--color-glass-dark);
}

.glass-text-primary {
  color: white;
  font-weight: 600;
}

.glass-text-accent {
  color: var(--color-glass-accent-hover);
}

/* Glassmorphism divider */
.glass-divider {
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-glass-border),
    transparent
  );
  height: 1px;
  margin: 16px 0;
}
`;

// Material Design 3 CSS - inline for reliable loading
const MATERIAL_DESIGN_V3_CSS = `
/* Material Design 3 Style System for TailwindCSS v4 */
/* Class prefix: m3- */

:root {
  /* Material Design 3 color palette */
  --color-m3-primary: #6750a4;
  --color-m3-primary-container: #eaddff;
  --color-m3-on-primary: #ffffff;
  --color-m3-on-primary-container: #21005d;
  --color-m3-secondary: #625b71;
  --color-m3-secondary-container: #e8def8;
  --color-m3-on-secondary: #ffffff;
  --color-m3-on-secondary-container: #1d192b;
  --color-m3-tertiary: #7d5260;
  --color-m3-tertiary-container: #ffd8e4;
  --color-m3-on-tertiary: #ffffff;
  --color-m3-on-tertiary-container: #31111d;
  --color-m3-error: #b3261e;
  --color-m3-error-container: #f9dedc;
  --color-m3-on-error: #ffffff;
  --color-m3-on-error-container: #410e0b;
  --color-m3-background: #fffbfe;
  --color-m3-on-background: #1c1b1f;
  --color-m3-surface: #fffbfe;
  --color-m3-surface-dim: #ded8e1;
  --color-m3-surface-container: #f3edf7;
  --color-m3-surface-container-low: #f7f2fa;
  --color-m3-surface-container-high: #ece6f0;
  --color-m3-surface-container-highest: #e6e0e9;
  --color-m3-on-surface: #1c1b1f;
  --color-m3-on-surface-variant: #49454f;
  --color-m3-outline: #79747e;
  --color-m3-outline-variant: #cac4d0;
  --color-m3-inverse-surface: #313033;
  --color-m3-inverse-on-surface: #f4eff4;
  --color-m3-inverse-primary: #d0bcff;
  --color-m3-shadow: #000000;
  --color-m3-scrim: #000000;
  --color-m3-surface-tint: #6750a4;

  /* Material Design 3 elevation */
  --shadow-m3-1: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.15);
  --shadow-m3-2: 0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.15);
  --shadow-m3-3: 0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.15);
  --shadow-m3-4: 0 6px 10px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.15);
  --shadow-m3-5: 0 8px 12px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.15);

  /* Material Design 3 state layers */
  --color-m3-state-hover: rgba(103, 80, 164, 0.08);
  --color-m3-state-focus: rgba(103, 80, 164, 0.12);
  --color-m3-state-pressed: rgba(103, 80, 164, 0.12);
  --color-m3-state-dragged: rgba(103, 80, 164, 0.16);
  --color-m3-state-hover-alt: rgba(103, 80, 164, 0.04);
  --color-m3-state-selected: rgba(103, 80, 164, 0.12);

  /* Material Design 3 spacing */
  --radius-m3-extra-small: 4px;
  --radius-m3-small: 8px;
  --radius-m3-medium: 12px;
  --radius-m3-large: 16px;
  --radius-m3-extra-large: 28px;
  --radius-m3-full: 50%;

  /* Generic variables for all components */
  --accent: #6750a4;
  --accent-hover: #7c4dff;
  --text-on-accent: #ffffff;
  --text-primary: #1c1b1f;
  --text-secondary: #49454f;
  --text-muted: #79747e;
  --text-on-error: #ffffff;
  --bg-elevated: #ece6f0;
  --border-color: #79747e;
  --error: #b3261e;
  --success: #48bb78;
}

/* M3 State layer mixin utility */
.m3-state-layer {
  position: relative;
  overflow: hidden;
}

.m3-state-layer::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.m3-state-layer:hover::before {
  opacity: 1;
  background: var(--color-m3-state-hover);
}

.m3-state-layer:focus-visible::before {
  opacity: 1;
  background: var(--color-m3-state-focus);
}

.m3-state-layer:active::before {
  opacity: 1;
  background: var(--color-m3-state-pressed);
}

/* M3 - Material 3 component base */
.m3 {
  font-family:
    "Roboto",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  color: var(--color-m3-on-surface);
}

/* M3 Filled button (default) */
.m3-btn-filled {
  background: var(--color-m3-primary);
  color: var(--color-m3-on-primary);
  border-radius: var(--radius-m3-extra-large);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  box-shadow: var(--shadow-m3-1);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
}

.m3-btn-filled:hover {
  box-shadow: var(--shadow-m3-2);
}

.m3-btn-filled:active {
  box-shadow: var(--shadow-m3-1);
}

.m3-btn-filled:focus-visible {
  outline: 2px solid var(--color-m3-primary);
  outline-offset: 2px;
}

/* M3 Outlined button */
.m3-btn-outlined {
  background: transparent;
  color: var(--color-m3-primary);
  border-radius: var(--radius-m3-extra-large);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border: 1px solid var(--color-m3-outline);
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-btn-outlined:hover {
  background: var(--color-m3-state-hover-alt);
}

.m3-btn-outlined:active {
  background: var(--color-m3-state-pressed);
}

.m3-btn-outlined:focus-visible {
  outline: 2px solid var(--color-m3-primary);
  outline-offset: 2px;
}

/* M3 Text button */
.m3-btn-text {
  background: transparent;
  color: var(--color-m3-primary);
  border-radius: var(--radius-m3-extra-large);
  padding: 10px 12px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-btn-text:hover {
  background: var(--color-m3-state-hover-alt);
}

.m3-btn-text:active {
  background: var(--color-m3-state-pressed);
}

/* M3 Tonal button */
.m3-btn-tonal {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
  border-radius: var(--radius-m3-extra-large);
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-btn-tonal:hover {
  background: var(--color-m3-secondary-container);
  box-shadow: var(--shadow-m3-1);
}

.m3-btn-tonal:active {
  box-shadow: none;
}

/* M3 Icon button */
.m3-btn-icon {
  background: transparent;
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-full);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-btn-icon:hover {
  background: var(--color-m3-state-hover);
}

.m3-btn-icon:active {
  background: var(--color-m3-state-pressed);
}

.m3-btn-icon-selected {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
}

/* M3 FAB */
.m3-fab {
  background: var(--color-m3-primary-container);
  color: var(--color-m3-on-primary-container);
  border-radius: var(--radius-m3-large);
  padding: 16px;
  min-width: 56px;
  min-height: 56px;
  box-shadow: var(--shadow-m3-3);
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.m3-fab:hover {
  box-shadow: var(--shadow-m3-4);
}

.m3-fab:active {
  box-shadow: var(--shadow-m3-2);
}

.m3-fab-small {
  border-radius: var(--radius-m3-medium);
  padding: 8px;
  min-width: 40px;
  min-height: 40px;
}

.m3-fab-large {
  border-radius: var(--radius-m3-large);
  padding: 20px;
  min-width: 96px;
  min-height: 96px;
}

/* M3 Card - Elevated */
.m3-card-elevated {
  background: var(--color-m3-surface);
  border-radius: var(--radius-m3-medium);
  box-shadow: var(--shadow-m3-1);
  transition: box-shadow 0.2s ease;
  overflow: hidden;
}

.m3-card-elevated:hover {
  box-shadow: var(--shadow-m3-2);
}

/* M3 Card - Filled */
.m3-card-filled {
  background: var(--color-m3-surface-container-low);
  border-radius: var(--radius-m3-medium);
  overflow: hidden;
}

/* M3 Card - Outlined */
.m3-card-outlined {
  background: var(--color-m3-surface);
  border-radius: var(--radius-m3-medium);
  border: 1px solid var(--color-m3-outline-variant);
  overflow: hidden;
}

/* M3 Input - Outlined */
.m3-input-outlined {
  background: transparent;
  border: 1px solid var(--color-m3-outline);
  border-radius: var(--radius-m3-extra-small);
  padding: 16px;
  font-size: 16px;
  color: var(--color-m3-on-surface);
  transition: all 0.2s ease;
  outline: none;
}

.m3-input-outlined:hover {
  border-color: var(--color-m3-on-surface-variant);
}

.m3-input-outlined:focus {
  border-color: var(--color-m3-primary);
  border-width: 2px;
}

.m3-input-outlined::placeholder {
  color: var(--color-m3-on-surface-variant);
}

/* M3 Input - Filled */
.m3-input-filled {
  background: var(--color-m3-surface-container-high);
  border: none;
  border-radius: var(--radius-m3-extra-small) var(--radius-m3-extra-small) 0 0;
  padding: 16px;
  font-size: 16px;
  color: var(--color-m3-on-surface);
  transition: all 0.2s ease;
  outline: none;
}

.m3-input-filled:focus {
  background: var(--color-m3-surface-container-highest);
}

/* M3 Chip - Assist */
.m3-chip-assist {
  background: var(--color-m3-surface-container-low);
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-small);
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.m3-chip-assist:hover {
  background: var(--color-m3-state-hover);
}

/* M3 Chip - Filter */
.m3-chip-filter {
  background: transparent;
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-small);
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid var(--color-m3-outline);
  cursor: pointer;
  transition: all 0.2s ease;
}

.m3-chip-filter:hover {
  background: var(--color-m3-state-hover-alt);
}

.m3-chip-filter-selected {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
  border-color: transparent;
}

/* M3 Chip - Input */
.m3-chip-input {
  background: var(--color-m3-surface-container-low);
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-small);
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* M3 Chip - Suggestion */
.m3-chip-suggestion {
  background: transparent;
  color: var(--color-m3-on-surface-variant);
  border-radius: var(--radius-m3-small);
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.m3-chip-suggestion:hover {
  background: var(--color-m3-state-hover-alt);
}

/* M3 Badge */
.m3-badge {
  background: var(--color-m3-error);
  color: var(--color-m3-on-error);
  border-radius: var(--radius-m3-full);
  padding: 0 6px;
  font-size: 10px;
  font-weight: 500;
  min-width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* M3 Avatar - Image */
.m3-avatar-image {
  background: var(--color-m3-primary-container);
  border-radius: var(--radius-m3-full);
  width: 40px;
  height: 40px;
  overflow: hidden;
}

.m3-avatar-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* M3 Avatar - Initials */
.m3-avatar-initials {
  background: var(--color-m3-primary-container);
  color: var(--color-m3-on-primary-container);
  border-radius: var(--radius-m3-full);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
}

/* M3 Avatar - Icon */
.m3-avatar-icon {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
  border-radius: var(--radius-m3-full);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* M3 Checkbox */
.m3-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-m3-outline);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background: transparent;
}

.m3-checkbox:checked {
  background: var(--color-m3-primary);
  border-color: var(--color-m3-primary);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}

/* M3 Radio */
.m3-radio {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-m3-outline);
  border-radius: var(--radius-m3-full);
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
}

.m3-radio:checked {
  border-color: var(--color-m3-primary);
  border-width: 10px;
}

/* M3 Switch */
.m3-switch {
  width: 52px;
  height: 32px;
  background: var(--color-m3-surface-container-highest);
  border-radius: 16px;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s ease;
  position: relative;
  border: none;
}

.m3-switch::before {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  background: var(--color-m3-outline);
  border-radius: var(--radius-m3-full);
  top: 4px;
  left: 4px;
  transition: all 0.2s ease;
}

.m3-switch:checked {
  background: var(--color-m3-primary-container);
}

.m3-switch:checked::before {
  background: var(--color-m3-on-primary-container);
  transform: translateX(20px);
}

/* M3 Slider */
.m3-slider {
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.m3-slider-track {
  flex: 1;
  height: 4px;
  background: var(--color-m3-surface-container-highest);
  border-radius: 2px;
  position: relative;
}

.m3-slider-fill {
  position: absolute;
  height: 100%;
  background: var(--color-m3-primary);
  border-radius: 2px;
  left: 0;
}

.m3-slider-thumb {
  width: 20px;
  height: 20px;
  background: var(--color-m3-primary);
  border-radius: var(--radius-m3-full);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: var(--shadow-m3-2);
  transition: all 0.1s ease;
  cursor: grab;
}

.m3-slider-thumb:active {
  cursor: grabbing;
  transform: translateX(-50%) scale(1.1);
}

/* M3 Progress - Linear */
.m3-progress-linear {
  height: 4px;
  background: var(--color-m3-surface-container-highest);
  border-radius: 2px;
  overflow: hidden;
}

.m3-progress-linear-bar {
  height: 100%;
  background: var(--color-m3-primary);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* M3 Progress - Circular */
.m3-progress-circular {
  width: 48px;
  height: 48px;
  position: relative;
}

.m3-progress-circular-track {
  position: absolute;
  inset: 0;
  border: 4px solid var(--color-m3-surface-container-highest);
  border-radius: var(--radius-m3-full);
}

.m3-progress-circular-indicator {
  position: absolute;
  inset: 0;
  border: 4px solid transparent;
  border-top-color: var(--color-m3-primary);
  border-radius: var(--radius-m3-full);
  animation: m3-spin 1s linear infinite;
}

@keyframes m3-spin {
  to {
    transform: rotate(360deg);
  }
}

/* M3 Dialog */
.m3-dialog {
  background: var(--color-m3-surface);
  border-radius: var(--radius-m3-extra-large);
  padding: 24px;
  box-shadow: var(--shadow-m3-5);
  max-width: 560px;
  min-width: 280px;
}

.m3-dialog-headline {
  font-size: 24px;
  font-weight: 400;
  color: var(--color-m3-on-surface);
  margin-bottom: 16px;
}

.m3-dialog-content {
  font-size: 14px;
  color: var(--color-m3-on-surface-variant);
  line-height: 1.5;
  margin-bottom: 24px;
}

.m3-dialog-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

/* M3 Navigation - Rail */
.m3-nav-rail {
  background: var(--color-m3-surface);
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 4px;
}

.m3-nav-rail-item {
  width: 56px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: var(--radius-m3-medium);
  color: var(--color-m3-on-surface-variant);
  cursor: pointer;
  transition: all 0.2s ease;
}

.m3-nav-rail-item:hover {
  background: var(--color-m3-state-hover);
}

.m3-nav-rail-item-selected {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
}

.m3-nav-rail-label {
  font-size: 12px;
  font-weight: 500;
}

/* M3 Navigation - Bar */
.m3-nav-bar {
  background: var(--color-m3-surface);
  height: 80px;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 24px;
  box-shadow: var(--shadow-m3-2);
}

.m3-nav-bar-item {
  flex: 1;
  max-width: 80px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: var(--radius-m3-medium);
  color: var(--color-m3-on-surface-variant);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.m3-nav-bar-item:hover {
  background: var(--color-m3-state-hover);
}

.m3-nav-bar-item-selected {
  color: var(--color-m3-on-secondary-container);
}

.m3-nav-bar-item-selected::before {
  content: "";
  position: absolute;
  top: 0;
  width: 32px;
  height: 3px;
  background: var(--color-m3-secondary-container);
  border-radius: 0 0 3px 3px;
}

/* M3 Tabs */
.m3-tabs {
  background: var(--color-m3-surface);
  display: flex;
  gap: 0;
}

.m3-tab {
  color: var(--color-m3-on-surface-variant);
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}

.m3-tab:hover {
  color: var(--color-m3-on-surface);
}

.m3-tab-selected {
  color: var(--color-m3-primary);
}

.m3-tab-indicator {
  position: absolute;
  bottom: 0;
  height: 3px;
  background: var(--color-m3-primary);
  border-radius: 3px 3px 0 0;
  transition: all 0.2s ease;
}

/* M3 Tooltip */
.m3-tooltip {
  background: var(--color-m3-inverse-surface);
  color: var(--color-m3-inverse-on-surface);
  border-radius: var(--radius-m3-extra-small);
  padding: 6px 8px;
  font-size: 12px;
  line-height: 1.4;
  max-width: 200px;
  box-shadow: var(--shadow-m3-2);
}

/* M3 Snackbar */
.m3-snackbar {
  background: var(--color-m3-inverse-surface);
  color: var(--color-m3-inverse-on-surface);
  border-radius: var(--radius-m3-extra-small);
  padding: 14px 16px;
  font-size: 14px;
  box-shadow: var(--shadow-m3-3);
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 420px;
}

.m3-snackbar-action {
  color: var(--color-m3-inverse-primary);
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  border: none;
}

/* M3 Divider */
.m3-divider {
  background: var(--color-m3-outline-variant);
  height: 1px;
  margin: 16px 0;
}

.m3-divider-vertical {
  background: var(--color-m3-outline-variant);
  width: 1px;
  margin: 0 16px;
}

/* M3 Text styles */
.m3-display-large {
  font-size: 57px;
  font-weight: 400;
  letter-spacing: -0.25px;
  line-height: 64px;
}

.m3-display-medium {
  font-size: 45px;
  font-weight: 400;
  line-height: 52px;
}

.m3-display-small {
  font-size: 36px;
  font-weight: 400;
  line-height: 44px;
}

.m3-headline-large {
  font-size: 32px;
  font-weight: 400;
  line-height: 40px;
}

.m3-headline-medium {
  font-size: 28px;
  font-weight: 400;
  line-height: 36px;
}

.m3-headline-small {
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
}

.m3-title-large {
  font-size: 22px;
  font-weight: 400;
  line-height: 28px;
}

.m3-title-medium {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.15px;
  line-height: 24px;
}

.m3-title-small {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  line-height: 20px;
}

.m3-body-large {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 24px;
}

.m3-body-medium {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.25px;
  line-height: 20px;
}

.m3-body-small {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.4px;
  line-height: 16px;
}

.m3-label-large {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  line-height: 20px;
}

.m3-label-medium {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 16px;
}

.m3-label-small {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 16px;
}

/* M3 Surface containers */
.m3-surface-dim {
  background: var(--color-m3-surface-dim);
}

.m3-surface-container {
  background: var(--color-m3-surface-container);
}

.m3-surface-container-low {
  background: var(--color-m3-surface-container-low);
}

.m3-surface-container-high {
  background: var(--color-m3-surface-container-high);
}

.m3-surface-container-highest {
  background: var(--color-m3-surface-container-highest);
}
`;

export const STYLE_VARIANTS: Record<StyleVariant, StyleVariantConfig> = {
  claymorphism: {
    id: "claymorphism",
    name: "Claymorphism",
    cssString: CLAYMORPHISM_CSS,
    classPrefix: "clay-",
    description: "Soft raised shadows with clay-like appearance",
    componentStyles: {
      "app-button": {
        variants: {
          solid: "clay-btn clay-btn-solid",
          ghost: "clay-btn clay-btn-ghost",
          text: "clay-btn clay-btn-text",
          icon: "clay-btn clay-btn-icon",
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
    },
  },
  glassmorphism: {
    id: "glassmorphism",
    name: "Glassmorphism",
    cssString: GLASSMORPHISM_CSS,
    classPrefix: "glass-",
    description: "Frosted glass effect with backdrop blur",
    componentStyles: {
      "app-button": {
        variants: {
          solid: "glass-btn glass-btn-solid",
          ghost: "glass-btn glass-btn-ghost",
          text: "glass-btn glass-btn-text",
          icon: "glass-btn glass-btn-icon",
        },
        sizes: {
          sm: "glass-btn-sm",
          md: "",
          lg: "",
        },
      },
      "app-card": {
        variants: {
          elevated: "glass-card glass-card-elevated",
          filled: "glass-card glass-card-filled",
          outlined: "glass-card glass-card-outlined",
        },
      },
      "app-theme-toggle": { variants: { default: "glass-toggle" } },
      "app-swap-button": { variants: { default: "glass-swap-btn" } },
      "app-language-selector": { variants: { default: "glass-lang-selector" } },
      "app-text-input": { variants: { default: "glass-input" } },
      "app-translation-output": { variants: { default: "glass-output" } },
      "app-shortcuts-overlay": { variants: { default: "glass-overlay" } },
    },
  },
  neumorphism: {
    id: "neumorphism",
    name: "Neumorphism",
    cssString: NEUMORPHISM_CSS,
    classPrefix: "neu-",
    description: "Soft inset and outset shadows",
    componentStyles: {
      "app-button": {
        variants: {
          solid: "neu-btn neu-btn-primary",
          ghost: "neu-btn neu-btn-primary",
          text: "neu-btn neu-btn-primary",
          icon: "neu-btn neu-btn-icon",
        },
        sizes: {
          sm: "neu-btn-sm",
          md: "",
          lg: "",
        },
      },
      "app-card": {
        variants: {
          elevated: "neu-card neu-card-elevated",
          filled: "neu-card neu-card-filled",
          outlined: "neu-card neu-card-outlined",
        },
      },
      "app-theme-toggle": { variants: { default: "neu-toggle" } },
      "app-swap-button": { variants: { default: "neu-swap-btn" } },
      "app-language-selector": { variants: { default: "neu-lang-selector" } },
      "app-text-input": { variants: { default: "neu-input" } },
      "app-translation-output": { variants: { default: "neu-output" } },
      "app-shortcuts-overlay": { variants: { default: "neu-overlay" } },
    },
  },
  "material-design-v3": {
    id: "material-design-v3",
    name: "Material Design 3",
    cssString: MATERIAL_DESIGN_V3_CSS,
    classPrefix: "m3-",
    description: "Google Material Design 3 with elevation system",
    componentStyles: {
      "app-button": {
        variants: {
          solid: "m3-btn-filled",
          ghost: "m3-btn-outlined",
          text: "m3-btn-text",
          icon: "m3-btn-icon",
        },
        sizes: {
          sm: "m3-btn-sm",
          md: "",
          lg: "",
        },
      },
      "app-card": {
        variants: {
          elevated: "m3-card-elevated",
          filled: "m3-card-filled",
          outlined: "m3-card-outlined",
        },
      },
      "app-theme-toggle": { variants: { default: "m3-toggle" } },
      "app-swap-button": { variants: { default: "m3-swap-btn" } },
      "app-language-selector": { variants: { default: "m3-lang-selector" } },
      "app-text-input": { variants: { default: "m3-input" } },
      "app-translation-output": { variants: { default: "m3-output" } },
      "app-shortcuts-overlay": { variants: { default: "m3-overlay" } },
    },
  },
  brutalism: {
    id: "brutalism",
    name: "Brutalism",
    cssString: BRUTALISM_CSS,
    classPrefix: "brut-",
    description: "Sharp edges, hard shadows, high-contrast typography",
    componentStyles: {
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
    },
  },
  skeuomorphism: {
    id: "skeuomorphism",
    name: "Skeuomorphism",
    cssString: SKEUOMORPHISM_CSS,
    classPrefix: "skeu-",
    description:
      "Realistic textures with leather, paper, and glossy highlights",
    componentStyles: {
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
    },
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

/**
 * Get CSS classes for a component's variant and size.
 * Uses the global style registry — variant and size are resolved separately.
 * Returns CSS class string combining variant and size classes, or empty string if not found.
 */
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

  // Resolve variant: explicit > global
  const resolvedVariant = explicitVariant || globalContext?.variant;
  // Resolve size: explicit > global
  const resolvedSize = explicitSize || globalContext?.size;

  const classes: string[] = [];

  // Get variant class
  if (resolvedVariant) {
    const variantClass = componentMap.variants?.[resolvedVariant];
    if (variantClass) {
      classes.push(variantClass);
    }
  }

  // Get size class
  if (resolvedSize && componentMap.sizes) {
    const sizeClass = componentMap.sizes[resolvedSize];
    if (sizeClass) {
      classes.push(sizeClass);
    }
  }

  // If nothing resolved, try default
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
