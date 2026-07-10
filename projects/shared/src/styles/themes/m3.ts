const M3_TOKENS_CSS = `
/**
 * Material Design 3 Design Tokens
 * Light mode + Dark mode
 */

:root {
  /* M3 Color System */
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

  /* Shadow tokens */
  --shadow-m3-1: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-m3-2: 0 2px 6px rgba(0,0,0,0.3);
  --shadow-m3-3: 0 4px 8px rgba(0,0,0,0.3);
  --shadow-m3-4: 0 6px 10px rgba(0,0,0,0.3);
  --shadow-m3-5: 0 8px 12px rgba(0,0,0,0.3);

  /* State layer tokens */
  --color-m3-state-hover: rgba(103, 80, 164, 0.08);
  --color-m3-state-focus: rgba(103, 80, 164, 0.12);
  --color-m3-state-pressed: rgba(103, 80, 164, 0.12);
  --color-m3-state-dragged: rgba(103, 80, 164, 0.16);
  --color-m3-state-hover-alt: rgba(103, 80, 164, 0.04);
  --color-m3-state-selected: rgba(103, 80, 164, 0.12);

  /* Radius tokens */
  --radius-m3-extra-small: 4px;
  --radius-m3-small: 8px;
  --radius-m3-medium: 12px;
  --radius-m3-large: 16px;
  --radius-m3-extra-large: 28px;
  --radius-m3-full: 50%;

  /* Semantic aliases */
  --accent: var(--color-m3-primary);
  --accent-hover: #7c4dff;
  --text-on-accent: var(--color-m3-on-primary);
  --text-primary: var(--color-m3-on-background);
  --text-secondary: var(--color-m3-on-surface-variant);
  --text-muted: var(--color-m3-outline);
  --text-on-error: var(--color-m3-on-error);
  --text-on-warning: #ffffff;
  --text-on-success: #ffffff;
  --bg-elevated: var(--color-m3-surface-container);
  --border-color: var(--color-m3-outline);
  --error: var(--color-m3-error);
  --warning: #ff9800;
  --success: #48bb78;
  --info: #0066ff;
  --bg-primary: var(--color-m3-background);
  --bg-secondary: var(--color-m3-surface-container-low);
  --bg-tertiary: var(--color-m3-surface-container);
  --border-subtle: var(--color-m3-outline-variant);
}

/* Dark mode */
:root.dark {
  --color-m3-primary: #d0bcff;
  --color-m3-primary-container: #4f378b;
  --color-m3-on-primary: #381e72;
  --color-m3-on-primary-container: #eaddff;
  --color-m3-secondary: #ccc2dc;
  --color-m3-secondary-container: #4a4458;
  --color-m3-on-secondary: #332d41;
  --color-m3-on-secondary-container: #e8def8;
  --color-m3-tertiary: #efb8c8;
  --color-m3-tertiary-container: #633b48;
  --color-m3-on-tertiary: #492532;
  --color-m3-on-tertiary-container: #ffd8e4;
  --color-m3-error: #f2b8b5;
  --color-m3-error-container: #8c1d18;
  --color-m3-on-error: #601410;
  --color-m3-on-error-container: #f9dedc;
  --color-m3-background: #1c1b1f;
  --color-m3-on-background: #e6e1e5;
  --color-m3-surface: #1c1b1f;
  --color-m3-surface-dim: #141218;
  --color-m3-surface-container: #211f26;
  --color-m3-surface-container-low: #1d1b22;
  --color-m3-surface-container-high: #2b2930;
  --color-m3-surface-container-highest: #36343b;
  --color-m3-on-surface: #e6e1e5;
  --color-m3-on-surface-variant: #cac4d0;
  --color-m3-outline: #938f99;
  --color-m3-outline-variant: #49454f;
  --color-m3-inverse-surface: #e6e1e5;
  --color-m3-inverse-on-surface: #313033;
  --color-m3-inverse-primary: #6750a4;
  --color-m3-surface-tint: #d0bcff;
  --shadow-m3-1: 0 1px 2px rgba(0,0,0,0.5);
  --shadow-m3-2: 0 2px 6px rgba(0,0,0,0.5);
  --shadow-m3-3: 0 4px 8px rgba(0,0,0,0.5);
  --shadow-m3-4: 0 6px 10px rgba(0,0,0,0.5);
  --shadow-m3-5: 0 8px 12px rgba(0,0,0,0.5);
  --color-m3-state-hover: rgba(208, 188, 255, 0.08);
  --color-m3-state-focus: rgba(208, 188, 255, 0.12);
  --color-m3-state-pressed: rgba(208, 188, 255, 0.12);
  --color-m3-state-dragged: rgba(208, 188, 255, 0.16);
  --color-m3-state-hover-alt: rgba(208, 188, 255, 0.04);
  --color-m3-state-selected: rgba(208, 188, 255, 0.12);
  --text-primary: #e6e1e5;
  --text-secondary: #cac4d0;
  --text-muted: #938f99;
  --bg-elevated: #2b2930;
  --border-color: #938f99;
  --error: #f2b8b5;
  --info: #60a5fa;
  --bg-primary: #1c1b1f;
  --bg-secondary: #1d1b22;
  --bg-tertiary: #2b2930;
  --border-subtle: #49454f;
}
`;

const M3_COMPONENTS_CSS = `
/* Material Design 3 Component Styles */

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
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, sans-serif;
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

/* M3 Small button */
.m3-btn-sm {
  padding: 6px 16px;
  font-size: 12px;
  border-radius: var(--radius-m3-large);
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
.m3-display-large { font-size: 57px; font-weight: 400; letter-spacing: -0.25px; line-height: 64px; }
.m3-display-medium { font-size: 45px; font-weight: 400; line-height: 52px; }
.m3-display-small { font-size: 36px; font-weight: 400; line-height: 44px; }
.m3-headline-large { font-size: 32px; font-weight: 400; line-height: 40px; }
.m3-headline-medium { font-size: 28px; font-weight: 400; line-height: 36px; }
.m3-headline-small { font-size: 24px; font-weight: 400; line-height: 32px; }
.m3-title-large { font-size: 22px; font-weight: 400; line-height: 28px; }
.m3-title-medium { font-size: 16px; font-weight: 500; letter-spacing: 0.15px; line-height: 24px; }
.m3-title-small { font-size: 14px; font-weight: 500; letter-spacing: 0.1px; line-height: 20px; }
.m3-body-large { font-size: 16px; font-weight: 400; letter-spacing: 0.5px; line-height: 24px; }
.m3-body-medium { font-size: 14px; font-weight: 400; letter-spacing: 0.25px; line-height: 20px; }
.m3-body-small { font-size: 12px; font-weight: 400; letter-spacing: 0.4px; line-height: 16px; }
.m3-label-large { font-size: 14px; font-weight: 500; letter-spacing: 0.1px; line-height: 20px; }
.m3-label-medium { font-size: 12px; font-weight: 500; letter-spacing: 0.5px; line-height: 16px; }
.m3-label-small { font-size: 11px; font-weight: 500; letter-spacing: 0.5px; line-height: 16px; }

/* M3 Surface containers */
.m3-surface-dim { background: var(--color-m3-surface-dim); }
.m3-surface-container { background: var(--color-m3-surface-container); }
.m3-surface-container-low { background: var(--color-m3-surface-container-low); }
.m3-surface-container-high { background: var(--color-m3-surface-container-high); }
.m3-surface-container-highest { background: var(--color-m3-surface-container-highest); }

/* M3 Additional components */
.m3-data-table { background: var(--color-m3-surface); border-radius: var(--radius-m3-medium); box-shadow: var(--shadow-m3-1); }
.m3-sidebar { background: var(--color-m3-surface); box-shadow: var(--shadow-m3-2); }
.m3-header, .m3-footer { background: var(--color-m3-surface); box-shadow: var(--shadow-m3-2); }
.m3-page-container { background: var(--color-m3-surface); }
.m3-panel { background: var(--color-m3-surface); border-radius: var(--radius-m3-large); box-shadow: var(--shadow-m3-2); }
.m3-segment-selector { background: var(--color-m3-surface-container-low); border-radius: var(--radius-m3-medium); }
.m3-split-view { background: var(--color-m3-surface); }
.m3-stats-card { background: var(--color-m3-surface); border-radius: var(--radius-m3-large); box-shadow: var(--shadow-m3-3); padding: 24px; }
.m3-table { background: var(--color-m3-surface); border-radius: var(--radius-m3-medium); }
.m3-tree { background: var(--color-m3-surface-container-low); border-radius: var(--radius-m3-small); }
.m3-canvas { background: var(--color-m3-surface-dim); }
.m3-main-editor { background: var(--color-m3-surface); }
.m3-canvas-toolbar, .m3-page-toolbar { background: var(--color-m3-surface); box-shadow: var(--shadow-m3-2); }
.m3-command-palette { background: var(--color-m3-surface); border-radius: var(--radius-m3-extra-large); box-shadow: var(--shadow-m3-5); }
.m3-component-palette { background: var(--color-m3-surface); border-radius: var(--radius-m3-large); box-shadow: var(--shadow-m3-3); }
.m3-locale-switcher { background: var(--color-m3-surface-container-high); border-radius: var(--radius-m3-small); }
.m3-json-view { background: var(--color-m3-surface-container-highest); border-radius: var(--radius-m3-small); font-family: monospace; }
.m3-form { background: var(--color-m3-surface-container-low); padding: 16px; border-radius: var(--radius-m3-medium); }
.m3-properties-panel { background: var(--color-m3-surface); border-radius: var(--radius-m3-large); box-shadow: var(--shadow-m3-3); }
.m3-bottom-panel { background: var(--color-m3-surface); box-shadow: var(--shadow-m3-2); }
.m3-designer-tree { background: var(--color-m3-surface-container-low); border-radius: var(--radius-m3-medium); }
.m3-designer-sidebar { background: var(--color-m3-surface); box-shadow: var(--shadow-m3-2); }
.m3-block { background: var(--color-m3-surface); border-radius: var(--radius-m3-medium); box-shadow: var(--shadow-m3-2); }

/* Missing component classes - Swap button */
.m3-swap-btn {
  background: var(--color-m3-secondary-container);
  color: var(--color-m3-on-secondary-container);
  border-radius: var(--radius-m3-full);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: var(--shadow-m3-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.m3-swap-btn:hover {
  box-shadow: var(--shadow-m3-3);
  background: var(--color-m3-secondary-container);
}

.m3-swap-btn:active {
  box-shadow: var(--shadow-m3-1);
}

/* Missing component classes - Language selector */
.m3-lang-selector {
  background: var(--color-m3-surface-container-high);
  color: var(--color-m3-on-surface);
  border-radius: var(--radius-m3-medium);
  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid var(--color-m3-outline-variant);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;
}

.m3-lang-selector:hover {
  border-color: var(--color-m3-primary);
}

.m3-lang-selector:focus {
  outline: 2px solid var(--color-m3-primary);
  outline-offset: 2px;
}

/* Missing component classes - Translation output */
.m3-output {
  background: var(--color-m3-surface-container-low);
  color: var(--color-m3-on-surface);
  border-radius: var(--radius-m3-medium);
  padding: 16px;
  font-size: 16px;
  line-height: 1.6;
  min-height: 120px;
  border: 1px solid var(--color-m3-outline-variant);
}

.m3-output:focus {
  border-color: var(--color-m3-primary);
  border-width: 2px;
}

/* Missing component classes - Shortcuts overlay */
.m3-overlay {
  background: var(--color-m3-surface);
  color: var(--color-m3-on-surface);
  border-radius: var(--radius-m3-extra-large);
  padding: 24px;
  box-shadow: var(--shadow-m3-5);
  max-width: 480px;
  min-width: 320px;
}

.m3-overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
`;

export const MATERIAL_DESIGN_V3_CSS = `/* Material Design 3 Style System */\n${M3_TOKENS_CSS}\n${M3_COMPONENTS_CSS}`;

export const materialDesignV3ComponentStyles = {
  "app-button": {
    variants: {
      solid: "m3-btn-filled",
      outlined: "m3-btn-outlined",
      text: "m3-btn-text",
      icon: "m3-btn-icon",
      tonal: "m3-btn-tonal",
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
  "app-text-input": { variants: { default: "m3-input-outlined" } },
  "app-translation-output": { variants: { default: "m3-output" } },
  "app-shortcuts-overlay": { variants: { default: "m3-overlay" } },
  "app-dialog": {
    variants: {
      solid: "m3-dialog",
    },
  },
  "app-confirm-dialog": {
    variants: {
      solid: "m3-dialog",
    },
  },
  "app-modal": {
    variants: {
      solid: "m3-dialog",
    },
  },
  "app-checkbox": {
    variants: {
      outlined: "m3-checkbox",
    },
  },
  "app-radio": {
    variants: {
      outlined: "m3-radio",
    },
  },
  "app-switch": {
    variants: {
      outlined: "m3-switch",
    },
  },
  "app-slider": {
    variants: {
      outline: "m3-slider",
    },
  },
  "app-progress-bar": {
    variants: {
      linear: "m3-progress-linear",
    },
  },
  "app-tabs": {
    variants: {
      standard: "m3-tabs",
    },
  },
  "app-snackbar": {
    variants: {
      standard: "m3-snackbar",
    },
  },
  "app-avatar": {
    variants: {
      image: "m3-avatar-image",
      initials: "m3-avatar-initials",
      icon: "m3-avatar-icon",
    },
  },
  "app-chip": {
    variants: {
      assist: "m3-chip-assist",
      filter: "m3-chip-filter",
      input: "m3-chip-input",
      suggestion: "m3-chip-suggestion",
    },
  },
  "app-tooltip": {
    variants: {
      default: "m3-tooltip",
    },
  },
  "app-pagination": {
    variants: {
      default: "m3-pagination",
    },
  },
} as const;