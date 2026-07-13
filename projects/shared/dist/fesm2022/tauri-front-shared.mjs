import * as i0 from '@angular/core';
import { signal, Injectable, inject, ElementRef, Renderer2, Input, Directive, Component, EventEmitter, Output, HostListener, computed, Injector, ViewChild, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA, effect, Optional, input, output, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { BehaviorSubject, Subject, map, distinctUntilChanged } from 'rxjs';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const SCHEMA_COMPONENT_MAP = new Map();
function registerSchemaComponent(selector, component) {
    SCHEMA_COMPONENT_MAP.set(selector, component);
}

// Flat key-value translation maps for i18n
// All schema text should use i18nKey referencing these keys
const EN = {
    // App-level
    "app.title": "Translator",
    "app.subtitle": "Translate text between 15 languages instantly",
    // Header
    "header.shortcuts": "Shortcuts",
    "header.theme": "Theme",
    // Labels
    "label.from": "From",
    "label.to": "To",
    // Buttons
    "button.translate": "Translate",
    "button.clear": "Clear",
    // Footer
    "footer.text": "Translator - Translate text between 15 languages instantly",
    // Shortcuts overlay
    "shortcuts.title": "Keyboard Shortcuts",
    "shortcuts.description": "Press the following keys to trigger actions",
    // App language selector
    "lang.selector.label": "Language",
    // Input placeholders
    "input.placeholder": "Enter text to translate...",
    "output.placeholder": "Translation will appear here as you type...",
};
const RU = {
    // App-level
    "app.title": "Переводчик",
    "app.subtitle": "Переводите текст между 15 языками мгновенно",
    // Header
    "header.shortcuts": "Ярлыки",
    "header.theme": "Тема",
    // Labels
    "label.from": "С",
    "label.to": "На",
    // Buttons
    "button.translate": "Перевести",
    "button.clear": "Очистить",
    // Footer
    "footer.text": "Переводчик — переводите текст между 15 языками мгновенно",
    // Shortcuts overlay
    "shortcuts.title": "Горячие клавиши",
    "shortcuts.description": "Нажмите следующие клавиши для выполнения действий",
    // App language selector
    "lang.selector.label": "Язык",
    // Input placeholders
    "input.placeholder": "Введите текст для перевода...",
    "output.placeholder": "Перевод появится здесь по мере ввода...",
};

const TRANSLATIONS = {
    en: EN,
    ru: RU,
};
class I18nService {
    _locale = signal("en", ...(ngDevMode ? [{ debugName: "_locale" }] : []));
    get locale() {
        return this._locale.asReadonly();
    }
    get translations() {
        return TRANSLATIONS[this._locale()];
    }
    setLocale(locale) {
        this._locale.set(locale);
    }
    /**
     * Translate a key. Falls back to English, then to the key itself.
     */
    t(key) {
        const locale = this._locale();
        return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS["en"]?.[key] ?? key;
    }
    /**
     * Get all available locales.
     */
    getAvailableLocales() {
        return ["en", "ru"];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: I18nService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: I18nService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: I18nService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

const TOKENS_CSS = `
/**
 * Claymorphism Design Tokens
 * Light mode (default) + Dark mode via :root.dark
 */

/* Base colors */
:root {
  --color-clay-base: #e0e5ec;
  --color-clay-raised: #e0e5ec;
  --color-clay-inset: #d1d9e6;
  --color-clay-accent: #6d5dfc;
  --color-clay-accent-hover: #5a4cdb;
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
  --warning: #ff9800;
  --success: #48bb78;
  --info: #4299e1;

  /* Gradient color stops for raised/inset surfaces */
  --gradient-clay-light: #f0f5fc;
  --gradient-clay-dark: #d4d9e4;
}

/* Dark mode */
:root.dark {
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
  --text-muted: #718096;
  --bg-elevated: #252540;
  --bg-primary: #1a1a2e;
  --bg-secondary: #252540;
  --bg-tertiary: #1a1a2e;
  --border-color: #4a5568;
  --border-subtle: #4a5568;
}
`;
const COMPONENTS_CSS = `
/* Claymorphism Style System for TailwindCSS v4 */
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
const CLAYMORPHISM_CSS = `/* Claymorphism Style System */\n${TOKENS_CSS}\n${COMPONENTS_CSS}`;
const claymorphismComponentStyles = {
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
};

// Glassmorphism CSS - inline for reliable loading
const GLASSMORPHISM_CSS = `
/* Glassmorphism Style System for TailwindCSS v4 */
/* Class prefix: glass- */

/* Glass-specific variables */
:root {
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

  /* Radius tokens */
  --radius-glass-sm: 8px;
  --radius-glass-md: 12px;
  --radius-glass-lg: 16px;
  --radius-glass-xl: 24px;

  /* Semantic tokens */
  --accent: var(--color-glass-accent);
  --accent-hover: var(--color-glass-accent-hover);
  --text-on-accent: #ffffff;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --text-muted: #a0aec0;
  --text-on-error: #ffffff;
  --text-on-warning: #ffffff;
  --text-on-success: #ffffff;
  --bg-elevated: rgba(255, 255, 255, 0.15);
  --border-color: rgba(255, 255, 255, 0.45);
  --error: #e53e3e;
  --warning: #ff9800;
  --success: #48bb78;
  --info: #4299e1;
  --bg-primary: rgba(15, 15, 30, 0.9);
  --bg-secondary: rgba(25, 25, 45, 0.75);
  --bg-tertiary: rgba(10, 10, 20, 0.95);
  --border-subtle: rgba(255, 255, 255, 0.15);
}

/* Dark mode — lighter glass surfaces for contrast */
:root.dark {
  --color-glass-bg: rgba(255, 255, 255, 0.08);
  --color-glass-bg-hover: rgba(255, 255, 255, 0.12);
  --color-glass-bg-active: rgba(255, 255, 255, 0.18);
  --color-glass-border: rgba(255, 255, 255, 0.25);
  --color-glass-border-strong: rgba(255, 255, 255, 0.35);
  --color-glass-white: rgba(255, 255, 255, 0.6);
  --color-glass-blur: rgba(255, 255, 255, 0.03);
  --color-glass-dark: rgba(0, 0, 0, 0.5);
  --color-glass-dark-strong: rgba(0, 0, 0, 0.7);
  --text-primary: #e2e8f0;
  --text-secondary: #c0c0c0;
  --text-muted: #909090;
  --bg-elevated: rgba(255, 255, 255, 0.1);
  --border-color: rgba(255, 255, 255, 0.25);
  --bg-primary: rgba(5, 5, 15, 0.95);
  --bg-secondary: rgba(15, 15, 30, 0.85);
  --bg-tertiary: rgba(10, 10, 20, 0.98);
  --border-subtle: rgba(255, 255, 255, 0.08);
}

/* Base glass surface */
.glass {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--radius-glass-md));
  -webkit-backdrop-filter: blur(var(--radius-glass-md));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-lg);
}

/* Glassmorphism surface */
.glass-surface {
  background: linear-gradient(
    135deg,
    var(--color-glass-bg) 0%,
    var(--color-glass-blur) 100%
  );
  backdrop-filter: blur(var(--radius-glass-xl));
  -webkit-backdrop-filter: blur(var(--radius-glass-xl));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-xl);
  box-shadow:
    0 8px 32px var(--color-glass-dark),
    inset 0 1px 0 var(--color-glass-white);
}

/* Glassmorphism light variant */
.glass-light {
  background: var(--color-glass-bg-active);
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-md);
}

/* Glassmorphism dark variant */
.glass-dark {
  background: var(--color-glass-dark);
  backdrop-filter: blur(var(--radius-glass-md));
  -webkit-backdrop-filter: blur(var(--radius-glass-md));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-glass-lg);
  box-shadow: 0 8px 32px var(--color-glass-dark-strong);
}

/* Glassmorphism button */
.glass-btn {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
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
    inset 0 1px 0 var(--color-glass-white);
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
    var(--color-glass-accent-hover) 100%
  );
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border);
  color: white;
  box-shadow:
    0 4px 16px var(--color-glass-accent),
    inset 0 1px 0 var(--color-glass-white);
}

.glass-btn-primary:hover {
  background: linear-gradient(
    135deg,
    var(--color-glass-accent-hover) 0%,
    var(--color-glass-accent) 100%
  );
  box-shadow:
    0 6px 24px var(--color-glass-accent),
    inset 0 1px 0 var(--color-glass-white);
}

/* Glassmorphism button variants */
.glass-btn-solid {
  background: var(--color-glass-bg-active);
  backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border-strong);
}

.glass-btn-outlined {
  background: transparent;
  backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border-strong);
}

.glass-btn-text {
  background: transparent;
  backdrop-filter: none;
  border: none;
  color: var(--color-glass-white);
}

.glass-btn-icon {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-md);
  padding: 8px;
}

.glass-btn-tonal {
  background: var(--color-glass-bg-hover);
  backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border);
}

.glass-btn-sm {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-sm);
  padding: 6px 12px;
  font-size: 12px;
}

/* Glassmorphism card */
.glass-card {
  background: linear-gradient(
    135deg,
    var(--bg-elevated) 0%,
    var(--color-glass-blur) 100%
  );
  backdrop-filter: blur(var(--radius-glass-xl));
  -webkit-backdrop-filter: blur(var(--radius-glass-xl));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-xl);
  box-shadow:
    0 8px 32px var(--color-glass-dark),
    inset 0 1px 0 var(--color-glass-white);
  padding: 24px;
}

/* Glassmorphism card variants */
.glass-card-elevated {
  background: linear-gradient(
    135deg,
    var(--color-glass-bg-hover) 0%,
    var(--color-glass-bg) 100%
  );
  backdrop-filter: blur(var(--radius-glass-xl));
  border: 1px solid var(--color-glass-border-strong);
  box-shadow:
    0 12px 40px var(--color-glass-dark-strong),
    inset 0 1px 0 var(--color-glass-white);
}

.glass-card-filled {
  background: var(--color-glass-bg-hover);
  backdrop-filter: blur(var(--radius-glass-md));
  border: 1px solid var(--color-glass-border);
}

.glass-card-outlined {
  background: transparent;
  backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border-strong);
  box-shadow: none;
}

/* Glassmorphism input */
.glass-input {
  background: var(--color-glass-blur);
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-sm);
  color: var(--color-glass-white);
  padding: 12px 16px;
  outline: none;
  transition: all 0.3s ease;
}

.glass-input::placeholder {
  color: var(--color-glass-white);
}

.glass-input:focus {
  background: var(--color-glass-bg);
  border-color: var(--color-glass-accent);
  box-shadow:
    0 0 0 3px var(--color-glass-accent),
    inset 0 1px 0 var(--color-glass-white);
}

/* Glassmorphism badge */
.glass-badge {
  background: var(--color-glass-bg-hover);
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border);
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
    var(--color-glass-bg-active) 0%,
    var(--color-glass-bg) 100%
  );
  backdrop-filter: blur(var(--radius-glass-md));
  -webkit-backdrop-filter: blur(var(--radius-glass-md));
  border: 2px solid var(--color-glass-border);
  border-radius: 50%;
  box-shadow: 0 4px 16px var(--color-glass-dark);
}

/* Glassmorphism checkbox */
.glass-checkbox {
  background: var(--color-glass-blur);
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
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
    0 0 0 3px var(--color-glass-accent),
    inset 0 1px 0 var(--color-glass-white);
}

/* Glassmorphism toggle/switch */
.glass-toggle {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
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
    var(--color-glass-white) 0%,
    var(--color-glass-white) 100%
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
    var(--color-glass-bg-active) 0%,
    var(--color-glass-bg) 100%
  );
  backdrop-filter: blur(var(--radius-glass-xl));
  -webkit-backdrop-filter: blur(var(--radius-glass-xl));
  border: 1px solid var(--color-glass-border-strong);
  border-radius: var(--radius-glass-xl);
  box-shadow:
    0 24px 48px var(--color-glass-dark-strong),
    inset 0 1px 0 var(--color-glass-white);
  padding: 32px;
}

/* Glassmorphism tooltip */
.glass-tooltip {
  background: linear-gradient(
    135deg,
    var(--color-glass-dark) 0%,
    var(--color-glass-dark-strong) 100%
  );
  backdrop-filter: blur(var(--radius-glass-md));
  -webkit-backdrop-filter: blur(var(--radius-glass-md));
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-glass-sm);
  padding: 8px 12px;
  color: var(--color-glass-white);
  font-size: 12px;
  box-shadow: 0 4px 16px var(--color-glass-dark-strong);
}

/* Glassmorphism progress bar */
.glass-progress {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-glass-sm);
  height: 12px;
  overflow: hidden;
}

.glass-progress-bar {
  background: linear-gradient(
    90deg,
    var(--color-glass-accent),
    var(--color-glass-accent-hover),
    var(--color-glass-accent)
  );
  background-size: 200% 100%;
  border-radius: var(--radius-glass-sm);
  height: 100%;
  animation: glass-progress-shine 2s ease-in-out infinite;
  box-shadow: 0 0 20px var(--color-glass-accent);
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
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
  border: 1px solid var(--color-glass-border);
  border-radius: 8px;
  height: 8px;
}

.glass-slider-thumb {
  background: linear-gradient(
    135deg,
    var(--color-glass-white) 0%,
    var(--color-glass-white) 100%
  );
  backdrop-filter: blur(var(--radius-glass-sm));
  -webkit-backdrop-filter: blur(var(--radius-glass-sm));
  border-radius: 50%;
  box-shadow:
    0 2px 8px var(--color-glass-dark),
    inset 0 1px 0 var(--color-glass-white);
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.glass-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow:
    0 4px 12px var(--color-glass-dark),
    inset 0 1px 0 var(--color-glass-white);
}

/* Glassmorphism navigation */
.glass-nav {
  background: linear-gradient(
    90deg,
    var(--color-glass-bg) 0%,
    var(--color-glass-blur) 100%
  );
  backdrop-filter: blur(var(--radius-glass-md));
  -webkit-backdrop-filter: blur(var(--radius-glass-md));
  border-bottom: 1px solid var(--color-glass-border);
}

.glass-nav-item {
  color: var(--color-glass-white);
  transition: all 0.3s ease;
  padding: 12px 16px;
  border-radius: var(--radius-glass-sm);
}

.glass-nav-item:hover {
  color: white;
  background: var(--color-glass-bg-hover);
}

.glass-nav-item-active {
  color: white;
  background: var(--color-glass-bg-active);
  border-bottom: 2px solid var(--color-glass-accent);
}

/* Glassmorphism text styles */
.glass-text {
  color: var(--color-glass-white);
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

/* Glassmorphism additional components */
.glass-data-table { backdrop-filter: blur(var(--radius-glass-md)); background: var(--color-glass-bg); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-md); }
.glass-sidebar { backdrop-filter: blur(var(--radius-glass-md)); background: var(--bg-secondary); border-right: 1px solid var(--border-subtle); }
.glass-header, .glass-footer { backdrop-filter: blur(var(--radius-glass-md)); background: var(--bg-secondary); border-bottom: 1px solid var(--border-subtle); }
.glass-page-container { background: var(--bg-primary); }
.glass-panel { backdrop-filter: blur(var(--radius-glass-md)); background: var(--color-glass-bg); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-xl); }
.glass-segment-selector { backdrop-filter: blur(var(--radius-glass-sm)); background: var(--color-glass-blur); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-md); }
.glass-split-view { background: var(--bg-primary); }
.glass-stats-card { backdrop-filter: blur(var(--radius-glass-md)); background: var(--color-glass-bg); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-xl); padding: 24px; }
.glass-table { backdrop-filter: blur(var(--radius-glass-sm)); background: var(--color-glass-blur); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-md); }
.glass-tree { background: var(--color-glass-blur); }
.glass-canvas { background: var(--bg-primary); }
.glass-main-editor { background: var(--bg-primary); }
.glass-canvas-toolbar, .glass-page-toolbar { backdrop-filter: blur(var(--radius-glass-md)); background: var(--bg-secondary); border-bottom: 1px solid var(--border-subtle); }
.glass-command-palette { backdrop-filter: blur(var(--radius-glass-xl)); background: var(--bg-secondary); border: 1px solid var(--color-glass-border-strong); border-radius: var(--radius-glass-xl); }
.glass-component-palette { backdrop-filter: blur(var(--radius-glass-md)); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-xl); }
.glass-locale-switcher { backdrop-filter: blur(var(--radius-glass-sm)); background: var(--color-glass-bg); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-sm); }
.glass-json-view { backdrop-filter: blur(var(--radius-glass-sm)); background: var(--color-glass-blur); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-sm); font-family: monospace; }
.glass-form { backdrop-filter: blur(var(--radius-glass-sm)); background: var(--color-glass-blur); padding: 16px; border-radius: var(--radius-glass-md); }
.glass-properties-panel { backdrop-filter: blur(var(--radius-glass-md)); background: var(--color-glass-bg); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-xl); }
.glass-bottom-panel { backdrop-filter: blur(var(--radius-glass-md)); background: var(--bg-secondary); border-top: 1px solid var(--border-subtle); }
.glass-designer-tree { backdrop-filter: blur(var(--radius-glass-sm)); background: var(--color-glass-blur); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-md); }
.glass-designer-sidebar { backdrop-filter: blur(var(--radius-glass-md)); background: var(--bg-secondary); border-right: 1px solid var(--border-subtle); }
.glass-block { backdrop-filter: blur(var(--radius-glass-md)); background: var(--color-glass-bg); border: 1px solid var(--border-subtle); border-radius: var(--radius-glass-md); }
`;
const glassmorphismComponentStyles = {
    "app-button": {
        variants: {
            solid: "glass-btn glass-btn-solid",
            outlined: "glass-btn glass-btn-outlined",
            text: "glass-btn glass-btn-text",
            icon: "glass-btn glass-btn-icon",
            tonal: "glass-btn glass-btn-tonal",
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
    "app-dialog": {
        variants: {
            solid: "glass-modal",
        },
    },
    "app-confirm-dialog": {
        variants: {
            solid: "glass-modal",
        },
    },
    "app-modal": {
        variants: {
            solid: "glass-modal",
        },
    },
    "app-checkbox": {
        variants: {
            outlined: "glass-checkbox",
        },
    },
    "app-switch": {
        variants: {
            outlined: "glass-toggle",
        },
    },
    "app-slider": {
        variants: {
            outline: "glass-slider",
        },
    },
    "app-progress-bar": {
        variants: {
            linear: "glass-progress",
        },
    },
    "app-sidebar": {
        variants: {
            default: "glass-nav",
        },
    },
    "app-text": {
        variants: {
            default: "glass-text",
        },
    },
    "app-avatar": {
        variants: {
            image: "glass-avatar",
            initials: "glass-avatar",
            icon: "glass-avatar",
        },
    },
    "app-chip": {
        variants: {
            assist: "glass-chip",
            filter: "glass-chip",
            input: "glass-chip",
            suggestion: "glass-chip",
        },
    },
    "app-radio": {
        variants: {
            outlined: "glass-radio",
        },
    },
    "app-snackbar": {
        variants: {
            standard: "glass-snackbar",
        },
    },
    "app-tooltip": {
        variants: {
            default: "glass-tooltip",
        },
    },
    "app-pagination": {
        variants: {
            default: "glass-pagination",
        },
    },
};

const NEUMORPHISM_TOKENS_CSS = `
/**
 * Neumorphism Design Tokens
 * Light mode + Dark mode
 */

/* Neumorphic base colors */
:root {
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

  /* Gradient color stops */
  --gradient-neu-light: #f0f5fc;
  --gradient-neu-dark: #d4d9e4;

  /* Radius tokens */
  --radius-neu-sm: 8px;
  --radius-neu-md: 12px;
  --radius-neu-lg: 16px;
  --radius-neu-xl: 24px;

  /* Shadow presets */
  --shadow-neu-outset: 6px 6px 12px var(--color-neu-shadow-dark), -6px -6px 12px var(--color-neu-shadow-light);
  --shadow-neu-outset-strong: 10px 10px 20px var(--color-neu-shadow-dark-strong), -10px -10px 20px var(--color-neu-shadow-light-strong);
  --shadow-neu-inset: inset 6px 6px 12px var(--color-neu-shadow-dark), inset -6px -6px 12px var(--color-neu-shadow-light);
  --shadow-neu-inset-strong: inset 8px 8px 16px var(--color-neu-shadow-dark), inset -8px -8px 16px var(--color-neu-shadow-light);

  /* Semantic tokens */
  --accent: var(--color-neu-accent);
  --accent-hover: #5a4cdb;
  --text-on-accent: #ffffff;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --text-muted: #a0aec0;
  --text-on-error: #ffffff;
  --text-on-warning: #ffffff;
  --text-on-success: #ffffff;
  --bg-elevated: #e8ecf4;
  --border-color: #a3b1c6;
  --error: #e53e3e;
  --warning: #ff9800;
  --success: #48bb78;
  --info: #4299e1;
  --bg-primary: #e0e5ec;
}

/* Dark mode */
:root.dark {
  --color-neu-base: #2d3748;
  --color-neu-base-dark: #1a202c;
  --color-neu-base-light: #4a5568;
  --color-neu-shadow-dark: #1a202c;
  --color-neu-shadow-light: #4a5568;
  --color-neu-shadow-dark-strong: #0f172a;
  --color-neu-shadow-light-strong: #5a6578;
  --color-neu-text: #e2e8f0;
  --color-neu-text-light: #a0aec0;
  --color-neu-text-dark: #f8fafc;
  --gradient-neu-light: #4a5568;
  --gradient-neu-dark: #2d3748;
  --text-primary: #f8fafc;
  --text-secondary: #a0aec0;
  --text-muted: #718096;
  --bg-elevated: #2d3748;
  --border-color: #4a5568;
  --bg-primary: #2d3748;
}
`;
const NEUMORPHISM_COMPONENTS_CSS = `
/* Neumorphism Style System */
/* Class prefix: neu- */

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
  background: linear-gradient(145deg, var(--gradient-neu-light), var(--gradient-neu-dark));
  color: var(--color-neu-accent);
}

.neu-btn-primary:active,
.neu-btn-primary-pressed {
  background: linear-gradient(145deg, var(--gradient-neu-dark), var(--gradient-neu-light));
}

.neu-btn-solid {
  background: var(--color-neu-base);
  box-shadow: var(--shadow-neu-outset);
  color: var(--color-neu-accent);
}

.neu-btn-solid:hover {
  box-shadow: var(--shadow-neu-outset-strong);
}

.neu-btn-solid:active {
  box-shadow: var(--shadow-neu-inset);
}

.neu-btn-outlined {
  background: transparent;
  border: 2px solid var(--border-color);
  box-shadow: none;
  color: var(--color-neu-text);
}

.neu-btn-outlined:hover {
  background: var(--color-neu-base);
  box-shadow: var(--shadow-neu-outset);
}

.neu-btn-outlined:active {
  box-shadow: var(--shadow-neu-inset);
}

.neu-btn-text {
  background: transparent;
  box-shadow: none;
  color: var(--color-neu-accent);
}

.neu-btn-text:hover {
  background: var(--color-neu-base);
  box-shadow: var(--shadow-neu-outset);
}

.neu-btn-text:active {
  box-shadow: var(--shadow-neu-inset);
}

.neu-btn-icon {
  background: var(--color-neu-base);
  border-radius: 50%;
  box-shadow: var(--shadow-neu-outset);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.neu-btn-icon:hover {
  box-shadow: var(--shadow-neu-outset-strong);
}

.neu-btn-icon:active {
  box-shadow: var(--shadow-neu-inset);
}

.neu-btn-tonal {
  background: var(--color-neu-base);
  box-shadow: var(--shadow-neu-outset);
  color: var(--color-neu-accent);
}

.neu-btn-tonal:hover {
  background: linear-gradient(145deg, var(--gradient-neu-light), var(--gradient-neu-dark));
}

.neu-btn-tonal:active {
  background: linear-gradient(145deg, var(--gradient-neu-dark), var(--gradient-neu-light));
}

.neu-btn-sm {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: var(--radius-neu-sm);
}

/* Neumorphism card */
.neu-card {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset-strong);
  padding: 24px;
}

.neu-card-elevated {
  background: var(--color-neu-base);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset-strong);
  padding: 24px;
}

.neu-card-filled {
  background: var(--bg-elevated);
  border-radius: var(--radius-neu-xl);
  box-shadow: var(--shadow-neu-outset);
  padding: 24px;
}

.neu-card-outlined {
  background: transparent;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-neu-xl);
  box-shadow: none;
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
  background: linear-gradient(145deg, var(--gradient-neu-light), var(--gradient-neu-dark));
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
  background: linear-gradient(145deg, var(--gradient-neu-light), var(--gradient-neu-dark));
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
  background: linear-gradient(145deg, var(--gradient-neu-light), var(--gradient-neu-dark));
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
    inset 2px 2px 4px var(--color-neu-shadow-dark),
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
    6px 6px 12px var(--color-neu-shadow-dark),
    -6px -6px 12px var(--color-neu-shadow-light);
  padding: 8px 14px;
  color: var(--color-neu-text);
  font-size: 12px;
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
  background: linear-gradient(145deg, var(--gradient-neu-light), var(--gradient-neu-dark));
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
  background: linear-gradient(145deg, var(--gradient-neu-light), var(--gradient-neu-dark));
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
  border-left: 4px solid var(--success);
}

.neu-toast-error {
  border-left: 4px solid var(--error);
}

.neu-toast-warning {
  border-left: 4px solid var(--warning);
}

.neu-toast-info {
  border-left: 4px solid var(--info);
}

/* Neumorphism additional components */
.neu-data-table { background: var(--bg-elevated); border-radius: var(--radius-neu-lg); box-shadow: var(--shadow-neu-outset); }
.neu-sidebar { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset); }
.neu-header, .neu-footer { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset); }
.neu-page-container { background: var(--bg-primary); }
.neu-panel { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset); border-radius: var(--radius-neu-lg); }
.neu-segment-selector { background: var(--bg-elevated); box-shadow: var(--shadow-neu-inset); border-radius: var(--radius-neu-md); }
.neu-split-view { background: var(--bg-primary); }
.neu-stats-card { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset-strong); border-radius: var(--radius-neu-xl); padding: 24px; }
.neu-table { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset); border-radius: var(--radius-neu-md); }
.neu-tree { background: var(--bg-elevated); }
.neu-canvas { background: var(--bg-primary); }
.neu-main-editor { background: var(--bg-primary); }
.neu-canvas-toolbar, .neu-page-toolbar { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset); }
.neu-command-palette { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset-strong); border-radius: var(--radius-neu-xl); }
.neu-component-palette { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset); }
.neu-locale-switcher { background: var(--bg-elevated); border-radius: var(--radius-neu-sm); }
.neu-json-view { background: var(--bg-elevated); border-radius: var(--radius-neu-md); font-family: monospace; }
.neu-form { background: var(--bg-elevated); padding: 16px; }
.neu-properties-panel { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset); border-radius: var(--radius-neu-lg); }
.neu-bottom-panel { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset); }
.neu-designer-tree { background: var(--bg-elevated); border-radius: var(--radius-neu-md); }
.neu-designer-sidebar { background: var(--bg-elevated); box-shadow: var(--shadow-neu-outset); }
.neu-block { background: var(--bg-elevated); border-radius: var(--radius-neu-lg); box-shadow: var(--shadow-neu-outset); }
`;
const NEUMORPHISM_CSS = `/* Neumorphism Style System */\n${NEUMORPHISM_TOKENS_CSS}\n${NEUMORPHISM_COMPONENTS_CSS}`;
const neumorphismComponentStyles = {
    "app-button": {
        variants: {
            solid: "neu-btn neu-btn-solid",
            outlined: "neu-btn neu-btn-outlined",
            text: "neu-btn neu-btn-text",
            icon: "neu-btn neu-btn-icon",
            tonal: "neu-btn neu-btn-tonal",
            primary: "neu-btn neu-btn-primary",
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
    "app-dialog": {
        variants: {
            solid: "neu-modal",
        },
    },
    "app-confirm-dialog": {
        variants: {
            solid: "neu-modal",
        },
    },
    "app-modal": {
        variants: {
            solid: "neu-modal",
        },
    },
    "app-checkbox": {
        variants: {
            outlined: "neu-checkbox",
        },
    },
    "app-switch": {
        variants: {
            outlined: "neu-toggle",
        },
    },
    "app-slider": {
        variants: {
            outline: "neu-slider",
        },
    },
    "app-progress-bar": {
        variants: {
            linear: "neu-progress",
        },
    },
    "app-tabs": {
        variants: {
            standard: "neu-tabs",
        },
    },
    "app-toast": {
        variants: {
            standard: "neu-toast",
        },
    },
    "app-snackbar": {
        variants: {
            standard: "neu-snackbar",
        },
    },
    "app-radio": {
        variants: {
            outlined: "neu-radio",
        },
    },
    "app-tooltip": {
        variants: {
            default: "neu-tooltip",
        },
    },
    "app-empty-state": {
        variants: {
            standard: "neu-empty",
        },
    },
    "app-pagination": {
        variants: {
            standard: "neu-pagination",
        },
    },
    "app-select": {
        variants: {
            standard: "neu-select",
        },
    },
    "app-spinner": {
        variants: {
            standard: "neu-spinner",
        },
    },
    "app-loading": {
        variants: {
            standard: "neu-loading",
        },
    },
    "app-text": {
        variants: {
            default: "neu-text",
        },
    },
    "app-textarea": {
        variants: {
            default: "neu-textarea",
        },
    },
    "app-avatar": {
        variants: {
            image: "neu-avatar",
            initials: "neu-avatar",
            icon: "neu-avatar",
        },
    },
    "app-chip": {
        variants: {
            assist: "neu-chip",
            filter: "neu-chip",
            input: "neu-chip",
            suggestion: "neu-chip",
        },
    },
    "app-sidebar": {
        variants: {
            default: "neu-nav",
        },
    },
    "app-block": {
        variants: {
            default: "neu-container",
        },
    },
};

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
const MATERIAL_DESIGN_V3_CSS = `/* Material Design 3 Style System */\n${M3_TOKENS_CSS}\n${M3_COMPONENTS_CSS}`;
const materialDesignV3ComponentStyles = {
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
};

/**
 * Brutalism CSS - inline for reliable loading
 */
const BRUTALISM_CSS = `
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
const brutalismComponentStyles = {
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
};

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
  --color-skeu-accent: #b8860b;
  --color-skeu-accent-dark: #8b6508;
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
:root.dark {
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
  --text-muted: #a8916b;
  --bg-primary: #2b1810;
  --bg-elevated: #3d2b1f;
  --bg-hover: #4a3025;
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
:root.dark .skeu-card {
  background: var(--gradient-leather);
  border-color: var(--color-skeu-leather-dark);
  color: var(--color-skeu-cream);
}

:root.dark .skeu-card.paper {
  background: var(--gradient-paper);
  border-color: #5a3d1a;
  color: var(--text-primary);
}

:root.dark .skeu-btn {
  background: var(--gradient-leather);
  border-color: var(--color-skeu-leather-dark);
  color: var(--color-skeu-cream);
}

:root.dark .skeu-btn-primary {
  background: var(--gradient-accent);
  color: var(--color-skeu-cream);
  border-color: #5a4406;
}

:root.dark .skeu-input {
  background: var(--gradient-input);
  border-color: var(--color-skeu-leather-dark);
  color: var(--text-primary);
}

:root.dark .skeu-modal {
  background: var(--gradient-paper);
  border-color: var(--color-skeu-leather-dark);
  color: var(--text-primary);
}

:root.dark .skeu-chip {
  background: var(--gradient-leather);
  color: var(--color-skeu-cream);
  border-color: var(--color-skeu-leather-dark);
}

:root.dark .skeu-badge {
  background: var(--gradient-accent);
  color: var(--color-skeu-cream);
  border-color: #5a4406;
}

:root.dark .skeu-tab {
  background: var(--gradient-tab);
  color: var(--text-primary);
  border-color: var(--color-skeu-leather-dark);
}

:root.dark .skeu-tab.active {
  background: var(--gradient-paper);
  color: var(--text-primary);
}

:root.dark .skeu-divider {
  background: var(--gradient-divider);
}

:root.dark .skeu-spinner {
  background: conic-gradient(from 0deg, transparent 0deg, var(--accent) 360deg);
}

:root.dark .skeu-sidebar,
:root.dark .skeu-header,
:root.dark .skeu-footer,
:root.dark .skeu-canvas-toolbar,
:root.dark .skeu-page-toolbar,
:root.dark .skeu-component-palette,
:root.dark .skeu-locale-switcher,
:root.dark .skeu-properties-panel,
:root.dark .skeu-designer-sidebar {
  background: var(--gradient-leather);
  border-color: var(--color-skeu-leather-dark);
}

:root.dark .skeu-page-container,
:root.dark .skeu-split-view,
:root.dark .skeu-canvas,
:root.dark .skeu-main-editor,
:root.dark .skeu-bottom-panel {
  background: var(--bg-primary);
}

:root.dark .skeu-panel,
:root.dark .skeu-form,
:root.dark .skeu-designer-tree,
:root.dark .skeu-block {
  background: var(--gradient-paper);
  border-color: var(--color-skeu-leather-dark);
}
`;
const SKEUOMORPHISM_CSS = `/* Skeuomorphism Style System */\n${SKEUOMORPHISM_TOKENS_CSS}\n${SKEUOMORPHISM_COMPONENTS_CSS}`;
const skeuomorphismComponentStyles = {
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
};

const STYLE_VARIANTS = {
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
        description: "Realistic textures with leather, paper, and glossy highlights",
        componentStyles: skeuomorphismComponentStyles,
    },
};
const LOADED_STYLES = new Set();
let CURRENT_STYLE = "material-design-v3";
const STYLE_ELEMENTS = new Map();
async function loadStyleVariant(variant) {
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
function unloadStyleVariant(variant) {
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
function setCurrentStyle(variant) {
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
    document.dispatchEvent(new CustomEvent("style-changed", {
        detail: { variant, prefix: STYLE_VARIANTS[variant].classPrefix },
    }));
}
function enableStyle(variant) {
    const style = STYLE_ELEMENTS.get(variant);
    if (style) {
        style.disabled = false;
    }
}
function disableStyle(variant) {
    const style = STYLE_ELEMENTS.get(variant);
    if (style) {
        style.disabled = true;
    }
}
function getCurrentStyle() {
    return CURRENT_STYLE;
}
function getStyleConfig(variant) {
    return STYLE_VARIANTS[variant] || STYLE_VARIANTS["material-design-v3"];
}
function getStyleClassPrefix(variant) {
    return STYLE_VARIANTS[variant]?.classPrefix || "m3-";
}
function getComponentStyleClasses(theme, componentId, explicitVariant, explicitSize, globalContext) {
    const config = STYLE_VARIANTS[theme];
    if (!config)
        return "";
    const componentMap = config.componentStyles?.[componentId];
    if (!componentMap)
        return "";
    const resolvedVariant = explicitVariant || globalContext?.variant;
    const resolvedSize = explicitSize || globalContext?.size;
    const classes = [];
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
function getAllStyleVariants() {
    return Object.values(STYLE_VARIANTS);
}
function initializeStyles() {
    if (typeof window === "undefined" || !window.localStorage) {
        return;
    }
    const savedStyle = window.localStorage.getItem("tauri-front-style");
    if (savedStyle && STYLE_VARIANTS[savedStyle]) {
        CURRENT_STYLE = savedStyle;
    }
}
function getStyleClass(variant, baseClass) {
    const prefix = getStyleClassPrefix(variant);
    const baseName = baseClass.replace(/^clay-|^glass-|^neu-|^m3-/, "");
    return `${prefix}${baseName}`;
}
function applyStyleToElement(element, variant) {
    const prefix = getStyleClassPrefix(variant);
    element.dataset.styleVariant = variant;
    element.classList.forEach((cls) => {
        if (cls.startsWith("clay-") ||
            cls.startsWith("glass-") ||
            cls.startsWith("neu-") ||
            cls.startsWith("m3-")) {
            element.classList.remove(cls);
        }
    });
    element.classList.add(`${prefix}${element.dataset.baseClass || ""}`);
}

const DARK_MODE_STORAGE_KEY = "tauri-front-dark-mode";
class StyleThemeService {
    _themeChanged$ = new BehaviorSubject({
        variant: getCurrentStyle(),
        isDark: this.loadDarkModePreference(),
    });
    themeChanged$ = this._themeChanged$.asObservable();
    constructor() {
        this.initializeDarkMode();
    }
    /** No-op for API compatibility; initialization runs in the constructor. */
    init() { }
    async loadTheme(variant) {
        setCurrentStyle(variant);
        if (this.isDarkMode()) {
            this.injectDarkModeVariables(variant);
        }
        this._themeChanged$.next({
            variant,
            isDark: this.isDarkMode(),
        });
    }
    /** Convenience alias for apps that use simple theme names (e.g. "light", "dark"). */
    async setTheme(theme) {
        const variant = this.resolveThemeVariant(theme);
        await this.loadTheme(variant);
    }
    resolveThemeVariant(theme) {
        const map = {
            "material-design-v3": "material-design-v3",
            neumorphism: "neumorphism",
            claymorphism: "claymorphism",
            glassmorphism: "glassmorphism",
            brutalism: "brutalism",
            skeuomorphism: "skeuomorphism",
        };
        if (map[theme])
            return map[theme];
        return "material-design-v3";
    }
    /** Alias for toggleDarkMode() — used by ZenithDB. */
    toggle() {
        this.toggleDarkMode();
    }
    /** Returns 'dark' or 'light' based on current dark mode state — used by ZenithDB. */
    effectiveColorMode() {
        return this.isDarkMode() ? "dark" : "light";
    }
    toggleDarkMode() {
        const html = document.documentElement;
        const isCurrentlyDark = html.classList.contains("dark");
        if (isCurrentlyDark) {
            html.classList.remove("dark");
            this.removeDarkModeVariables();
        }
        else {
            html.classList.add("dark");
            this.injectDarkModeVariables(this.getCurrentTheme());
        }
        this.saveDarkModePreference(!isCurrentlyDark);
        this._themeChanged$.next({
            variant: this.getCurrentTheme(),
            isDark: !isCurrentlyDark,
        });
    }
    isDarkMode() {
        return document.documentElement.classList.contains("dark");
    }
    setDarkMode(enabled) {
        const html = document.documentElement;
        if (enabled) {
            html.classList.add("dark");
            this.injectDarkModeVariables(this.getCurrentTheme());
        }
        else {
            html.classList.remove("dark");
            this.removeDarkModeVariables();
        }
        this.saveDarkModePreference(enabled);
        this._themeChanged$.next({
            variant: this.getCurrentTheme(),
            isDark: enabled,
        });
    }
    getCurrentTheme() {
        return getCurrentStyle();
    }
    injectDarkModeVariables(variant) {
        this.removeDarkModeVariables();
        const style = document.createElement("style");
        style.id = "dark-mode-variables";
        // Both mechanisms are needed: :root {} variables AND .dark .{prefix}* class selectors
        style.textContent =
            this.getDarkModeVariablesCSS(variant) +
                this.getDarkModeCSSForVariant(variant);
        document.head.appendChild(style);
    }
    removeDarkModeVariables() {
        const existing = document.getElementById("dark-mode-variables");
        if (existing)
            existing.remove();
    }
    getDarkModeVariablesCSS(variant) {
        const isDark = document.documentElement.classList.contains("dark");
        if (!isDark)
            return "";
        const vars = {
            "material-design-v3": `
:root {
  --accent: #d0bcff;
  --accent-hover: #b69df8;
  --text-on-accent: #381e72;
  --text-primary: #e6e1e5;
  --text-secondary: #cac4d0;
  --text-muted: #938f99;
  --text-on-error: #f2b8b5;
  --text-on-warning: #3e2723;
  --text-on-success: #1b4332;
  --bg-elevated: #2b2930;
  --border-color: #49454f;
  --error: #f2b8b5;
  --success: #6ee7b7;
  --warning: #ffab40;
  --bg-primary: #1c1b1f;
  --bg-secondary: #2b2930;
  --bg-tertiary: #49454f;
  --border-subtle: #49454f;
  --info: #82b1ff;
  --bg-hover: rgba(187, 184, 201, 0.08);
  --bg-header: #1c1b1f;
}`,
            neumorphism: `
:root {
  --accent: #a78bfa;
  --accent-hover: #8b7cf7;
  --text-on-accent: #1e1b2e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-on-error: #1e1b2e;
  --text-on-warning: #1a1a2e;
  --text-on-success: #1a1a2e;
  --bg-elevated: #2d3748;
  --border-color: #4a5568;
  --error: #fc8181;
  --success: #68d391;
  --warning: #ffb74d;
  --bg-primary: #1a202c;
  --bg-secondary: #1e2533;
  --bg-tertiary: #171923;
  --border-subtle: #4a5568;
  --info: #4299e1;
  --bg-hover: #3d4758;
  --bg-header: #2d3748;
}`,
            claymorphism: `
:root {
  --accent: #a78bfa;
  --accent-hover: #8b7cf7;
  --text-on-accent: #1e1b2e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-on-error: #1e1b2e;
  --text-on-warning: #1a1a2e;
  --text-on-success: #1a1a2e;
  --bg-elevated: #2d3748;
  --border-color: #4a5568;
  --error: #fc8181;
  --success: #68d391;
  --warning: #ffb74d;
  --bg-primary: #1a202c;
  --bg-secondary: #1e2533;
  --bg-tertiary: #171923;
  --border-subtle: #4a5568;
  --info: #4299e1;
  --bg-hover: #3d4758;
  --bg-header: #2d3748;
}`,
            glassmorphism: `
:root {
  --accent: rgba(167, 139, 250, 0.8);
  --accent-hover: rgba(187, 159, 250, 0.9);
  --text-on-accent: #1e1b2e;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-on-error: #fce4ec;
  --text-on-warning: #1a1a2e;
  --text-on-success: #1a1a2e;
  --bg-elevated: rgba(30, 30, 50, 0.7);
  --border-color: rgba(255, 255, 255, 0.15);
  --error: #ff6b6b;
  --success: #51cf66;
  --warning: #ffb74d;
  --bg-primary: rgba(15, 15, 30, 0.9);
  --bg-secondary: rgba(25, 25, 45, 0.75);
  --bg-tertiary: rgba(10, 10, 20, 0.95);
  --border-subtle: rgba(255, 255, 255, 0.15);
  --info: #4299e1;
  --bg-hover: rgba(50, 50, 80, 0.4);
  --bg-header: rgba(20, 20, 40, 0.8);
}`,
            brutalism: `
:root {
  --color-brut-base: #1a1a1a;
  --color-brut-ink: #f5f5f0;
  --color-brut-accent: #ff3b30;
  --color-brut-accent-2: #ffd60a;
  --color-brut-success: #00c853;
  --bg-primary: #1a1a1a;
  --bg-elevated: #2a2a2a;
  --bg-hover: #3a3a3a;
  --bg-tertiary: #404040;
  --text-primary: #f5f5f0;
  --text-secondary: #c0c0c0;
  --text-muted: #909090;
  --border-color: #f5f5f0;
  --accent: var(--color-brut-accent);
  --accent-hover: #d62b22;
  --text-on-accent: #ffffff;
  --text-on-error: #ffffff;
  --text-on-warning: #0a0a0a;
  --text-on-success: #ffffff;
  --error: var(--color-brut-accent);
  --warning: var(--color-brut-accent-2);
  --success: var(--color-brut-success);
}`,
            skeuomorphism: `
:root {
  --color-skeu-base: #2b1f14;
  --color-skeu-leather: #3a2a18;
  --color-skeu-leather-dark: #1a1009;
  --color-skeu-paper: #3a2e1f;
  --color-skeu-ink: #f5e6c8;
  --color-skeu-accent: #d4a017;
  --color-skeu-accent-dark: #b8860b;
  --bg-primary: #2b1f14;
  --bg-elevated: #3a2e1f;
  --bg-hover: #4a3e2f;
  --bg-tertiary: #5a4e3f;
  --text-primary: #f5e6c8;
  --text-secondary: #d4b890;
  --text-muted: #a8916b;
  --border-color: #1a1009;
  --accent: var(--color-skeu-accent);
  --accent-hover: var(--color-skeu-accent-dark);
  --text-on-accent: #faf3e0;
  --text-on-error: #fff5e6;
  --text-on-warning: #2b1810;
  --text-on-success: #f5e6c8;
  --error: #8b0000;
  --warning: #c47700;
  --success: #2d5016;
}`,
        };
        return vars[variant] ?? "";
    }
    getDarkModeCSS(variant) {
        return this.getDarkModeCSSForVariant(variant);
    }
    getDarkModeCSSForVariant(variant) {
        switch (variant) {
            case "material-design-v3":
                return this.materialDesignV3DarkCSS();
            case "neumorphism":
                return this.neumorphismDarkCSS();
            case "claymorphism":
                return this.claymorphismDarkCSS();
            case "glassmorphism":
                return this.glassmorphismDarkCSS();
            case "brutalism":
                return this.brutalismDarkCSS();
            case "skeuomorphism":
                return this.skeuomorphismDarkCSS();
            default:
                return "";
        }
    }
    brutalismDarkCSS() {
        return `
:root {
  --color-brut-base: #1a1a1a;
  --color-brut-ink: #f5f5f0;
  --color-brut-accent: #ff3b30;
  --color-brut-accent-2: #ffd60a;
  --color-brut-success: #00e676;
  --color-brut-border: #f5f5f0;
  --shadow-brut-sm: 4px 4px 0 0 #f5f5f0;
  --shadow-brut-md: 6px 6px 0 0 #f5f5f0;
  --shadow-brut-lg: 8px 8px 0 0 #f5f5f0;
  --bg-primary: #1a1a1a;
  --bg-elevated: #2a2a2a;
  --bg-hover: #3a3a3a;
  --bg-tertiary: #404040;
  --text-primary: #f5f5f0;
  --text-secondary: #c0c0c0;
  --text-muted: #909090;
  --text-on-accent: #ffffff;
  --text-on-error: #ffffff;
  --text-on-warning: #0a0a0a;
  --text-on-success: #ffffff;
  --border-color: #f5f5f0;
  --border-subtle: #c0c0c0;
  --accent: #ff3b30;
  --accent-hover: #d62b22;
  --error: #ff3b30;
  --warning: #ffd60a;
  --success: #00e676;
  --info: #60a5fa;
}

.dark .brut-card {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-btn {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-btn:hover { background: #3a3a3a; }
.dark .brut-btn-primary { background: #ff3b30; color: #ffffff; border-color: #f5f5f0; }
.dark .brut-btn-sm {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-btn-lg {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-input {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-input:focus { background: #3a3a3a; outline: none; }
.dark .brut-modal {
  background: #2a2a2a;
  border-color: #f5f5f0;
  color: #f5f5f0;
}
.dark .brut-chip { background: #ffd60a; color: #0a0a0a; border-color: #f5f5f0; }
.dark .brut-badge { background: #ff3b30; color: #ffffff; border-color: #f5f5f0; }
.dark .brut-tabs { border-bottom-color: #f5f5f0; }
.dark .brut-tab { background: #2a2a2a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-tab.active { background: #ff3b30; color: #ffffff; }
.dark .brut-divider { background: #f5f5f0; }
.dark .brut-spinner { border-color: #f5f5f0; border-top-color: #ff3b30; }

/* Layout components dark mode */
.dark .brut-data-table { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; }
.dark .brut-sidebar { background: #2a2a2a; border-right-color: #f5f5f0; }
.dark .brut-header, .dark .brut-footer { background: #2a2a2a; border-bottom-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-page-container { background: #1a1a1a; }
.dark .brut-panel { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; color: #f5f5f0; }
.dark .brut-segment-selector { background: #2a2a2a; border-color: #f5f5f0; }
.dark .brut-split-view { background: #1a1a1a; }
.dark .brut-stats-card { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 8px 8px 0 0 #f5f5f0; color: #f5f5f0; }
.dark .brut-table { background: #2a2a2a; border-color: #f5f5f0; }
.dark .brut-tree { background: #2a2a2a; color: #f5f5f0; }
.dark .brut-canvas { background: #1a1a1a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-main-editor { background: #1a1a1a; color: #f5f5f0; }
.dark .brut-canvas-toolbar, .dark .brut-page-toolbar { background: #2a2a2a; border-bottom-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-command-palette { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 8px 8px 0 0 #f5f5f0; color: #f5f5f0; }
.dark .brut-component-palette { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; }
.dark .brut-locale-switcher { background: #2a2a2a; border-color: #f5f5f0; }
.dark .brut-json-view { background: #2a2a2a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-form { background: #2a2a2a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-properties-panel { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; }
.dark .brut-bottom-panel { background: #2a2a2a; border-top-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-designer-tree { background: #2a2a2a; border-color: #f5f5f0; color: #f5f5f0; }
.dark .brut-designer-sidebar { background: #2a2a2a; border-right-color: #f5f5f0; }
.dark .brut-block { background: #2a2a2a; border-color: #f5f5f0; box-shadow: 6px 6px 0 0 #f5f5f0; color: #f5f5f0; }
`;
    }
    skeuomorphismDarkCSS() {
        return `
:root {
  --color-skeu-base: #2b1f14;
  --color-skeu-leather: #3a2a18;
  --color-skeu-leather-dark: #1a1009;
  --color-skeu-paper: #3a2e1f;
  --color-skeu-ink: #f5e6c8;
  --color-skeu-accent: #d4a017;
  --color-skeu-accent-dark: #b8860b;
  --color-skeu-cream: #faf3e0;
  --gradient-leather: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%);
  --gradient-paper: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  --gradient-paper-light: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  --gradient-input: linear-gradient(180deg, #4a3e2f 0%, #3a3025 100%);
  --gradient-tab: linear-gradient(180deg, #4a3a28 0%, #2d2015 100%);
  --gradient-accent: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  --gradient-divider: linear-gradient(90deg, transparent 0%, #1a1009 50%, transparent 100%);
  --shadow-skeu-outset:
    0 1px 0 rgba(255,255,255,0.1) inset,
    0 2px 4px rgba(0,0,0,0.4),
    0 4px 8px rgba(0,0,0,0.3),
    0 8px 16px rgba(0,0,0,0.2);
  --shadow-skeu-inset:
    inset 0 2px 4px rgba(0,0,0,0.5),
    inset 0 4px 8px rgba(0,0,0,0.4);
  --bg-primary: #2b1f14;
  --bg-elevated: #3a2e1f;
  --bg-hover: #4a3e2f;
  --bg-tertiary: #5a4e3f;
  --text-primary: #f5e6c8;
  --text-secondary: #d4b890;
  --text-muted: #a8916b;
  --text-on-accent: #faf3e0;
  --text-on-error: #fff5e6;
  --text-on-warning: #2b1810;
  --text-on-success: #f5e6c8;
  --border-color: #1a1009;
  --border-subtle: #4a2e18;
  --accent: #d4a017;
  --accent-hover: #8b6508;
  --error: #ff6b6b;
  --warning: #ffd60a;
  --success: #4ade80;
  --info: #60a5fa;
}

.dark .skeu-card {
  background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-card.paper {
  background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  color: #f5e6c8;
  border-color: #5a4e3f;
}
.dark .skeu-btn {
  background: linear-gradient(180deg, #4a3a28 0%, #1a1009 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-btn:hover { filter: brightness(1.15); }
.dark .skeu-btn-primary {
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  color: #f5e6c8;
}
.dark .skeu-input {
  background: linear-gradient(180deg, #4a3e2f 0%, #3a3025 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-modal {
  background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-chip {
  background: linear-gradient(180deg, #4a3a28 0%, #1a1009 100%);
  border-color: #1a1009;
  color: #f5e6c8;
}
.dark .skeu-badge {
  background: linear-gradient(180deg, #d4a017 0%, #8b6508 100%);
  color: #f5e6c8;
}
.dark .skeu-tab {
  background: linear-gradient(180deg, #4a3a28 0%, #2d2015 100%);
  color: #f5e6c8;
  border-color: #1a1009;
}
.dark .skeu-tab.active {
  background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%);
  color: #f5e6c8;
}
.dark .skeu-divider { background: linear-gradient(90deg, transparent 0%, #1a1009 50%, transparent 100%); }
.dark .skeu-spinner { border-color: #1a1009; border-top-color: #d4a017; }

/* Layout components dark mode */
.dark .skeu-data-table { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; }
.dark .skeu-sidebar { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-right-color: #1a1009; }
.dark .skeu-header, .dark .skeu-footer { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-bottom-color: #1a1009; color: #f5e6c8; }
.dark .skeu-page-container { background: #2b1f14; }
.dark .skeu-panel { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-segment-selector { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; }
.dark .skeu-split-view { background: #2b1f14; }
.dark .skeu-stats-card { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-table { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; }
.dark .skeu-tree { background: #3a2e1f; color: #f5e6c8; }
.dark .skeu-canvas { background: #2b1f14; border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-main-editor { background: #2b1f14; color: #f5e6c8; }
.dark .skeu-canvas-toolbar, .dark .skeu-page-toolbar { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-bottom-color: #1a1009; color: #f5e6c8; }
.dark .skeu-command-palette { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-component-palette { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; }
.dark .skeu-locale-switcher { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-json-view { background: linear-gradient(180deg, #4a3e2f 0%, #3a3025 100%); border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-form { background: #3a2e1f; border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-properties-panel { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-color: #1a1009; }
.dark .skeu-bottom-panel { background: #2b1f14; border-top-color: #1a1009; color: #f5e6c8; }
.dark .skeu-designer-tree { background: #3a2e1f; border-color: #1a1009; color: #f5e6c8; }
.dark .skeu-designer-sidebar { background: linear-gradient(180deg, #3a2a18 0%, #1a1009 100%); border-right-color: #1a1009; }
.dark .skeu-block { background: linear-gradient(180deg, #3a2e1f 0%, #2b2218 100%); border-color: #1a1009; color: #f5e6c8; }
`;
    }
    materialDesignV3DarkCSS() {
        return `
.dark .m3 {
  color: #e6e1e5;
}

.dark .m3-btn-filled {
  background: #d0bcff;
  color: #381e72;
}

.dark .m3-btn-outlined {
  color: #d0bcff;
  border-color: #938f99;
}

.dark .m3-btn-text {
  color: #d0bcff;
}

.dark .m3-btn-tonal {
  background: #4f378b;
  color: #e8def8;
}

.dark .m3-input-outlined {
  border-color: #938f99;
  color: #e6e1e5;
}

.dark .m3-card-elevated {
  background: #1c1b1f;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.dark .m3-card-filled {
  background: #211f26;
}

.dark .m3-card-outlined {
  background: #1c1b1f;
  border-color: #938f99;
}

.dark .m3-surface-dim {
  background: #141218;
}

.dark .m3-surface-container {
  background: #211f26;
}

.dark .m3-surface-container-low {
  background: #1d1b20;
}

.dark .m3-surface-container-high {
  background: #2b2930;
}

.dark .m3-surface-container-highest {
  background: #36343b;
}

.dark .m3-progress-linear {
  background: #49454f;
}

.dark .m3-progress-circular-track {
  border-color: #49454f;
}

.dark .m3-nav-rail {
  background: #1c1b1f;
}

.dark .m3-nav-bar {
  background: #1c1b1f;
}

.dark .m3-snackbar {
  background: #d0bcff;
  color: #381e72;
}

.dark .m3-tooltip {
  background: #e6e1e5;
  color: #1c1b1f;
}

.dark .m3-chip-assist {
  background: #4f378b;
  color: #e8def8;
}

.dark .m3-chip-filter {
  border-color: #938f99;
  color: #e6e1e5;
}

.dark .m3-chip-filter-selected {
  background: #4f378b;
  color: #e8def8;
}

.dark .m3-tabs {
  background: #1c1b1f;
}

.dark .m3-tab {
  color: #cac4d0;
}

.dark .m3-tab-selected {
  color: #d0bcff;
}

.dark .m3-tab-indicator {
  background: #d0bcff;
}

.dark .m3-switch {
  background: #49454f;
}

.dark .m3-switch:checked {
  background: #4f378b;
}

.dark .m3-checkbox {
  border-color: #938f99;
}

.dark .m3-checkbox:checked {
  background: #d0bcff;
  border-color: #d0bcff;
}

.dark .m3-radio {
  border-color: #938f99;
}

.dark .m3-radio:checked {
  border-color: #d0bcff;
}

.dark .m3-slider-track {
  background: #49454f;
}

.dark .m3-slider-thumb {
  background: #d0bcff;
}

.dark .m3-divider,
.dark .m3-divider-vertical {
  background: #49454f;
}
`;
    }
    neumorphismDarkCSS() {
        return `
.dark .neu {
  background: #2d3748;
}

.dark .neu-raised {
  background: #2d3748;
}

.dark .neu-pressed {
  background: #2d3748;
}

.dark .neu-btn {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .neu-btn-primary {
  background: linear-gradient(145deg, #3d4758, #1f2937);
  color: #a78bfa;
}

.dark .neu-input {
  background: #2d3748;
  color: #e2e8f0;
  box-shadow: inset 6px 6px 12px #1f2937, inset -6px -6px 12px #3d4758;
}

.dark .neu-card,
.dark .neu-card-hoverable {
  background: #2d3748;
}

.dark .neu-text {
  color: #e2e8f0;
}

.dark .neu-text-primary {
  color: #f8fafc;
}

.dark .neu-text-accent {
  color: #a78bfa;
}

.dark .neu-tooltip {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .neu-modal {
  background: #2d3748;
}

.dark .neu-nav {
  background: #2d3748;
}

.dark .neu-nav-item {
  color: #e2e8f0;
}

.dark .neu-nav-item-active {
  color: #a78bfa;
}

.dark .neu-tabs {
  background: #2d3748;
  box-shadow: inset 4px 4px 8px #1f2937, inset -4px -4px 8px #3d4758;
}

.dark .neu-tab {
  color: #94a3b8;
}

.dark .neu-tab-active {
  color: #a78bfa;
}

.dark .neu-icon-btn {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .neu-toggle {
  background: #2d3748;
}

.dark .neu-toggle-active .neu-toggle-knob {
  background: #a78bfa;
}

.dark .neu-progress {
  background: #2d3748;
}

.dark .neu-progress-bar {
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
}

.dark .neu-checkbox {
  background: #2d3748;
}

.dark .neu-checkbox-check {
  background: #a78bfa;
}

.dark .neu-radio-dot {
  background: #a78bfa;
}

.dark .neu-slider {
  background: #2d3748;
}
`;
    }
    claymorphismDarkCSS() {
        return `
.dark .clay {
  background: #2d3748;
}

.dark .clay-raised {
  background: linear-gradient(145deg, #3d4758, #1f2937);
}

.dark .clay-inset {
  background: #1f2937;
}

.dark .clay-btn {
  background: #2d3748;
}

.dark .clay-card {
  background: #2d3748;
}

.dark .clay-input {
  background: #1f2937;
  color: #e2e8f0;
}

.dark .clay-text {
  color: #e2e8f0;
}

.dark .clay-text-primary {
  color: #f8fafc;
}

.dark .clay-text-accent {
  color: #a78bfa;
}

.dark .clay-toggle {
  background: #1f2937;
}

.dark .clay-toggle-active .clay-toggle-knob {
  background: #a78bfa;
}

.dark .clay-progress {
  background: #1f2937;
}

.dark .clay-progress-bar {
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
}

.dark .clay-checkbox {
  background: #1f2937;
}

.dark .clay-checkbox:checked {
  background: #a78bfa;
}

.dark .clay-modal {
  background: #2d3748;
}

.dark .clay-tooltip {
  background: #2d3748;
  color: #e2e8f0;
}

.dark .clay-badge {
  background: linear-gradient(145deg, #3d4758, #1f2937);
  color: #e2e8f0;
}

.dark .clay-avatar {
  background: #2d3748;
}

.dark .clay-divider {
  background: linear-gradient(90deg, transparent, #49454f, transparent);
}
`;
    }
    glassmorphismDarkCSS() {
        return `
.dark .glass {
  background: rgba(30, 30, 50, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-surface {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.7) 0%, rgba(20, 20, 40, 0.7) 100%);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-light {
  background: rgba(50, 50, 80, 0.3);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-dark {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.08);
}

.dark .glass-btn {
  background: rgba(30, 30, 50, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .glass-btn:hover {
  background: rgba(50, 50, 80, 0.6);
  border-color: rgba(255, 255, 255, 0.25);
}

.dark .glass-btn-primary {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%);
  border-color: rgba(255, 255, 255, 0.3);
}

.dark .glass-card {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.6) 0%, rgba(20, 20, 40, 0.6) 100%);
  border-color: rgba(255, 255, 255, 0.12);
}

.dark .glass-input {
  background: rgba(20, 20, 40, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .glass-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.dark .glass-input:focus {
  border-color: rgba(167, 139, 250, 0.6);
}

.dark .glass-badge {
  background: rgba(30, 30, 50, 0.6);
  border-color: rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
}

.dark .glass-avatar {
  background: linear-gradient(135deg, rgba(50, 50, 80, 0.5) 0%, rgba(30, 30, 50, 0.5) 100%);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .glass-checkbox {
  background: rgba(20, 20, 40, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-checkbox:checked {
  background: rgba(167, 139, 250, 0.8);
  border-color: rgba(167, 139, 250, 0.8);
}

.dark .glass-toggle {
  background: rgba(30, 30, 50, 0.5);
  border-color: rgba(255, 255, 255, 0.15);
}

.dark .glass-toggle-active {
  background: rgba(167, 139, 250, 0.6);
  border-color: rgba(167, 139, 250, 0.6);
}

.dark .glass-modal {
  background: linear-gradient(135deg, rgba(30, 30, 50, 0.8) 0%, rgba(20, 20, 40, 0.8) 100%);
  border-color: rgba(255, 255, 255, 0.12);
}

.dark .glass-tooltip {
  background: linear-gradient(135deg, rgba(200, 200, 220, 0.9) 0%, rgba(180, 180, 200, 0.9) 100%);
  color: #1c1b1f;
}

.dark .glass-progress {
  background: rgba(30, 30, 50, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-progress-bar {
  background: linear-gradient(90deg, rgba(167, 139, 250, 0.8), rgba(124, 58, 237, 0.8), rgba(167, 139, 250, 0.8));
}

.dark .glass-nav {
  background: linear-gradient(90deg, rgba(30, 30, 50, 0.6) 0%, rgba(20, 20, 40, 0.6) 100%);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .glass-nav-item {
  color: rgba(200, 200, 220, 0.7);
}

.dark .glass-nav-item:hover {
  color: #e2e8f0;
  background: rgba(50, 50, 80, 0.4);
}

.dark .glass-nav-item-active {
  color: #e2e8f0;
  background: rgba(50, 50, 80, 0.5);
  border-color: rgba(167, 139, 250, 0.6);
}

.dark .glass-text {
  color: rgba(200, 200, 220, 0.9);
}

.dark .glass-text-primary {
  color: #e2e8f0;
}

.dark .glass-text-accent {
  color: rgba(167, 139, 250, 0.9);
}

.dark .glass-divider {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}
`;
    }
    initializeDarkMode() {
        const savedDarkMode = this.loadDarkModePreference();
        if (savedDarkMode) {
            document.documentElement.classList.add("dark");
        }
        this._themeChanged$.next({
            variant: this.getCurrentTheme(),
            isDark: savedDarkMode,
        });
    }
    loadDarkModePreference() {
        try {
            const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY);
            if (stored !== null) {
                return stored === "true";
            }
        }
        catch {
            // localStorage not available
        }
        return false;
    }
    saveDarkModePreference(enabled) {
        try {
            localStorage.setItem(DARK_MODE_STORAGE_KEY, String(enabled));
        }
        catch {
            // localStorage not available
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleThemeService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StyleThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class ApplyThemeDirective {
    componentId;
    themedVariant;
    themedSize;
    styleThemeService = inject(StyleThemeService);
    elementRef = inject(ElementRef);
    renderer = inject(Renderer2);
    subscription;
    currentClasses = [];
    ngOnInit() {
        this.applyThemeClasses();
        this.subscription = this.styleThemeService.themeChanged$.subscribe(() => {
            this.applyThemeClasses();
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    applyThemeClasses() {
        const theme = getCurrentStyle();
        const newClasses = getComponentStyleClasses(theme, this.componentId, this.themedVariant, this.themedSize);
        const classList = newClasses.split(" ").filter((c) => c);
        this.currentClasses.forEach((cls) => {
            this.renderer.removeClass(this.elementRef.nativeElement, cls);
        });
        classList.forEach((cls) => {
            this.renderer.addClass(this.elementRef.nativeElement, cls);
        });
        this.currentClasses = classList;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ApplyThemeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.25", type: ApplyThemeDirective, isStandalone: true, selector: "[appApplyTheme]", inputs: { componentId: ["appApplyTheme", "componentId"], themedVariant: "themedVariant", themedSize: "themedSize" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ApplyThemeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[appApplyTheme]",
                    standalone: true,
                }]
        }], propDecorators: { componentId: [{
                type: Input,
                args: ["appApplyTheme"]
            }], themedVariant: [{
                type: Input
            }], themedSize: [{
                type: Input
            }] } });

// Font Awesome icon mapping - no MatIcon, no SVG injection
const FA_ICONS = {
    // Navigation
    home: "fa-home",
    menu: "fa-bars",
    close: "fa-xmark",
    check: "fa-check",
    "chevron-down": "fa-chevron-down",
    "chevron-right": "fa-chevron-right",
    // Actions
    edit: "fa-pen",
    delete: "fa-trash",
    add: "fa-plus",
    search: "fa-magnifying-glass",
    undo: "fa-rotate-left",
    redo: "fa-rotate-right",
    remove: "fa-minus",
    fit_screen: "fa-expand",
    grid: "fa-table-cells",
    grid_on: "fa-table-cells",
    zoom_in: "fa-plus",
    zoom_out: "fa-minus",
    // Status
    info: "fa-circle-info",
    warning: "fa-triangle-exclamation",
    error: "fa-circle-xmark",
    success: "fa-circle-check",
    // Content
    user: "fa-user",
    settings: "fa-gear",
    star: "fa-star",
    heart: "fa-heart",
    // Media
    image: "fa-image",
    camera: "fa-camera",
    // Files
    file: "fa-file",
    folder: "fa-folder",
    // Misc
    sun: "fa-sun",
    moon: "fa-moon",
    download: "fa-download",
    upload: "fa-upload",
    copy: "fa-copy",
    // Additional
    search_off: "fa-magnifying-glass-minus",
    swap_vert: "fa-up-down",
    expand_more: "fa-chevron-down",
    dark_mode: "fa-moon",
    light_mode: "fa-sun",
    arrow_back: "fa-arrow-left",
    arrow_forward: "fa-arrow-right",
    first_page: "fa-angles-left",
    last_page: "fa-angles-right",
    chevron_left: "fa-chevron-left",
    chevron_right: "fa-chevron-right",
    content_copy: "fa-copy",
};
class IconComponent {
    icon = "";
    size = 24;
    get faClass() {
        const faIcon = FA_ICONS[this.icon] || FA_ICONS["info"];
        return `fa-fw ${faIcon}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: IconComponent, isStandalone: true, selector: "app-icon", inputs: { icon: "icon", size: "size" }, ngImport: i0, template: "<span class=\"inline-flex items-center justify-center icon-wrapper\">\n  <i\n    [class]=\"faClass\"\n    style=\"font-size: 16px; width: 1.2em; text-align: center\"\n  ></i>\n</span>\n", styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-icon", standalone: true, imports: [], template: "<span class=\"inline-flex items-center justify-center icon-wrapper\">\n  <i\n    [class]=\"faClass\"\n    style=\"font-size: 16px; width: 1.2em; text-align: center\"\n  ></i>\n</span>\n" }]
        }], propDecorators: { icon: [{
                type: Input
            }], size: [{
                type: Input
            }] } });
registerSchemaComponent("app-icon", IconComponent);

class ButtonComponent {
    i18n = inject(I18nService);
    variant = "primary";
    buttonStyle = "solid";
    size = "md";
    disabled = false;
    loading = false;
    icon = null;
    iconPosition = "left";
    fullWidth = false;
    type = "button";
    label = "";
    set i18nKey(value) {
        if (value !== undefined && value !== null) {
            this.label = this.i18n.t(value);
        }
    }
    classes = "";
    ariaLabel = "";
    align = "";
    direction = "";
    height = "";
    justify = "";
    layout = "";
    width = "";
    clicked = new EventEmitter();
    handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.clicked.emit(e);
    }
    getButtonClass() {
        const sizeClass = this.size === "sm"
            ? "py-1 px-2 text-sm"
            : this.size === "lg"
                ? "py-3 px-6 text-lg"
                : "";
        return [sizeClass, this.fullWidth ? "w-full" : ""]
            .filter(Boolean)
            .join(" ");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ButtonComponent, isStandalone: true, selector: "app-button", inputs: { variant: "variant", buttonStyle: "buttonStyle", size: "size", disabled: "disabled", loading: "loading", icon: "icon", iconPosition: "iconPosition", fullWidth: "fullWidth", type: "type", label: "label", i18nKey: "i18nKey", classes: "classes", ariaLabel: "ariaLabel", align: "align", direction: "direction", height: "height", justify: "justify", layout: "layout", width: "width" }, outputs: { clicked: "clicked" }, ngImport: i0, template: "<button\n  appApplyTheme=\"app-button\"\n  [themedVariant]=\"buttonStyle\"\n  [themedSize]=\"size\"\n  [attr.type]=\"type || 'button'\"\n  [class]=\"getButtonClass()\"\n  [disabled]=\"disabled || loading\"\n  (click)=\"handleClick($event)\"\n  class=\"inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-center font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed\"\n>\n  @if (loading) {\n    <span\n      class=\"app-btn-spinner w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin\"\n    ></span>\n  } @else {\n    @if (icon && iconPosition === \"left\") {\n      <app-icon class=\"app-btn-icon\" [icon]=\"icon\" [size]=\"20\" />\n    }\n    @if (label) {\n      <span>{{ label }}</span>\n    } @else {\n      <ng-content></ng-content>\n    }\n    @if (icon && iconPosition === \"right\") {\n      <app-icon class=\"app-btn-icon\" [icon]=\"icon\" [size]=\"20\" />\n    }\n  }\n</button>\n", styles: [""], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-button", standalone: true, imports: [IconComponent, ApplyThemeDirective], template: "<button\n  appApplyTheme=\"app-button\"\n  [themedVariant]=\"buttonStyle\"\n  [themedSize]=\"size\"\n  [attr.type]=\"type || 'button'\"\n  [class]=\"getButtonClass()\"\n  [disabled]=\"disabled || loading\"\n  (click)=\"handleClick($event)\"\n  class=\"inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-center font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed\"\n>\n  @if (loading) {\n    <span\n      class=\"app-btn-spinner w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin\"\n    ></span>\n  } @else {\n    @if (icon && iconPosition === \"left\") {\n      <app-icon class=\"app-btn-icon\" [icon]=\"icon\" [size]=\"20\" />\n    }\n    @if (label) {\n      <span>{{ label }}</span>\n    } @else {\n      <ng-content></ng-content>\n    }\n    @if (icon && iconPosition === \"right\") {\n      <app-icon class=\"app-btn-icon\" [icon]=\"icon\" [size]=\"20\" />\n    }\n  }\n</button>\n" }]
        }], propDecorators: { variant: [{
                type: Input
            }], buttonStyle: [{
                type: Input
            }], size: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loading: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconPosition: [{
                type: Input
            }], fullWidth: [{
                type: Input
            }], type: [{
                type: Input
            }], label: [{
                type: Input
            }], i18nKey: [{
                type: Input
            }], classes: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], align: [{
                type: Input
            }], direction: [{
                type: Input
            }], height: [{
                type: Input
            }], justify: [{
                type: Input
            }], layout: [{
                type: Input
            }], width: [{
                type: Input
            }], clicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-button", ButtonComponent);

class InputComponent {
    type = "text";
    placeholder = "";
    label = "";
    icon = "";
    disabled = false;
    value = "";
    error = "";
    input = new EventEmitter();
    blurred = new EventEmitter();
    focused = false;
    handleInput(e) {
        this.value = e.target.value;
        this.input.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: InputComponent, isStandalone: true, selector: "app-input", inputs: { type: "type", placeholder: "placeholder", label: "label", icon: "icon", disabled: "disabled", value: "value", error: "error" }, outputs: { input: "input", blurred: "blurred" }, ngImport: i0, template: "<div appApplyTheme=\"app-input\" class=\"flex flex-col gap-1\">\n  @if (label) {\n    <label class=\"text-sm font-medium text-[var(--text-primary)]\">{{\n      label\n    }}</label>\n  }\n  <div class=\"relative flex items-center\" [class.app-input-focused]=\"focused\">\n    @if (icon) {\n      <app-icon\n        class=\"absolute left-3 text-xl\"\n        [icon]=\"icon\"\n        [size]=\"20\"\n        [class]=\"focused ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'\"\n      />\n    }\n    <input\n      #inputEl\n      [attr.type]=\"type\"\n      class=\"w-full px-3 py-2 rounded-lg border transition-all outline-none focus:shadow-[0_0_0_1px_var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed\"\n      [class.ps-10]=\"!!icon\"\n      [class.border-[var(--error)]]=\"error\"\n      [class.border-[var(--accent)]]=\"!error && focused\"\n      [class.border-[var(--border-color)]]=\"!error && !focused\"\n      [class.bg-[var(--bg-tertiary)]]=\"disabled\"\n      [class.bg-[var(--bg-primary)]]=\"!disabled\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (input)=\"handleInput($event)\"\n      (focus)=\"focused = true\"\n      (blur)=\"focused = false\"\n    />\n  </div>\n  @if (error) {\n    <span class=\"text-xs text-[var(--error)]\">{{ error }}</span>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-input", standalone: true, imports: [IconComponent, ApplyThemeDirective], template: "<div appApplyTheme=\"app-input\" class=\"flex flex-col gap-1\">\n  @if (label) {\n    <label class=\"text-sm font-medium text-[var(--text-primary)]\">{{\n      label\n    }}</label>\n  }\n  <div class=\"relative flex items-center\" [class.app-input-focused]=\"focused\">\n    @if (icon) {\n      <app-icon\n        class=\"absolute left-3 text-xl\"\n        [icon]=\"icon\"\n        [size]=\"20\"\n        [class]=\"focused ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'\"\n      />\n    }\n    <input\n      #inputEl\n      [attr.type]=\"type\"\n      class=\"w-full px-3 py-2 rounded-lg border transition-all outline-none focus:shadow-[0_0_0_1px_var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed\"\n      [class.ps-10]=\"!!icon\"\n      [class.border-[var(--error)]]=\"error\"\n      [class.border-[var(--accent)]]=\"!error && focused\"\n      [class.border-[var(--border-color)]]=\"!error && !focused\"\n      [class.bg-[var(--bg-tertiary)]]=\"disabled\"\n      [class.bg-[var(--bg-primary)]]=\"!disabled\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (input)=\"handleInput($event)\"\n      (focus)=\"focused = true\"\n      (blur)=\"focused = false\"\n    />\n  </div>\n  @if (error) {\n    <span class=\"text-xs text-[var(--error)]\">{{ error }}</span>\n  }\n</div>\n" }]
        }], propDecorators: { type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], label: [{
                type: Input
            }], icon: [{
                type: Input
            }], disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], error: [{
                type: Input
            }], input: [{
                type: Output
            }], blurred: [{
                type: Output
            }] } });
registerSchemaComponent("app-input", InputComponent);

class EmptyStateComponent {
    title = "";
    message = "";
    icon = "";
    variant = "default";
    action = "";
    actionClicked = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EmptyStateComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: EmptyStateComponent, isStandalone: true, selector: "app-empty-state", inputs: { title: "title", message: "message", icon: "icon", variant: "variant", action: "action" }, outputs: { actionClicked: "actionClicked" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-empty-state\"\n  class=\"w-16 h-16 rounded-full flex items-center justify-center border-2\"\n  [class]=\"variant\"\n  [class]=\"\n    variant === 'danger'\n      ? 'bg-[var(--error)] border-[var(--error)]'\n      : variant === 'success'\n        ? 'bg-[var(--success)] border-[var(--success)]'\n        : 'bg-[var(--bg-elevated)] border-[var(--border-color)]'\n  \"\n>\n  @if (icon) {\n    <span class=\"text-4xl size-8\">{{ icon }}</span>\n  }\n</div>\n@if (title) {\n  <h3 class=\"text-2xl font-semibold m-0 text-[var(--text-primary)]\">\n    {{ title }}\n  </h3>\n}\n@if (message) {\n  <p class=\"text-base m-0 max-w-[400px] mt-2 text-[var(--text-secondary)]\">\n    {{ message }}\n  </p>\n}\n@if (action) {\n  <div class=\"mt-2\">\n    <button\n      class=\"inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-150 bg-[var(--accent)] border-[var(--accent)] text-[var(--text-on-accent)]\"\n      (mouseenter)=\"\n        $any($event.target).style.background = 'var(--accent-hover)';\n        $any($event.target).style.borderColor = 'var(--accent-hover)'\n      \"\n      (mouseleave)=\"\n        $any($event.target).style.background = 'var(--accent)';\n        $any($event.target).style.borderColor = 'var(--accent)'\n      \"\n      (click)=\"actionClicked.emit($event)\"\n    >\n      {{ action }}\n    </button>\n  </div>\n}\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EmptyStateComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-empty-state", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-empty-state\"\n  class=\"w-16 h-16 rounded-full flex items-center justify-center border-2\"\n  [class]=\"variant\"\n  [class]=\"\n    variant === 'danger'\n      ? 'bg-[var(--error)] border-[var(--error)]'\n      : variant === 'success'\n        ? 'bg-[var(--success)] border-[var(--success)]'\n        : 'bg-[var(--bg-elevated)] border-[var(--border-color)]'\n  \"\n>\n  @if (icon) {\n    <span class=\"text-4xl size-8\">{{ icon }}</span>\n  }\n</div>\n@if (title) {\n  <h3 class=\"text-2xl font-semibold m-0 text-[var(--text-primary)]\">\n    {{ title }}\n  </h3>\n}\n@if (message) {\n  <p class=\"text-base m-0 max-w-[400px] mt-2 text-[var(--text-secondary)]\">\n    {{ message }}\n  </p>\n}\n@if (action) {\n  <div class=\"mt-2\">\n    <button\n      class=\"inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-150 bg-[var(--accent)] border-[var(--accent)] text-[var(--text-on-accent)]\"\n      (mouseenter)=\"\n        $any($event.target).style.background = 'var(--accent-hover)';\n        $any($event.target).style.borderColor = 'var(--accent-hover)'\n      \"\n      (mouseleave)=\"\n        $any($event.target).style.background = 'var(--accent)';\n        $any($event.target).style.borderColor = 'var(--accent)'\n      \"\n      (click)=\"actionClicked.emit($event)\"\n    >\n      {{ action }}\n    </button>\n  </div>\n}\n" }]
        }], propDecorators: { title: [{
                type: Input
            }], message: [{
                type: Input
            }], icon: [{
                type: Input
            }], variant: [{
                type: Input
            }], action: [{
                type: Input
            }], actionClicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-empty-state", EmptyStateComponent);

class ModalComponent {
    open = false;
    title = "";
    size = "md";
    closed = new EventEmitter();
    handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this.close();
        }
    }
    close() {
        this.open = false;
        this.closed.emit();
    }
    onEscape() {
        if (this.open)
            this.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ModalComponent, isStandalone: true, selector: "app-modal", inputs: { open: "open", title: "title", size: "size" }, outputs: { closed: "closed" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: "@if (open) {\n  <div\n    appApplyTheme=\"app-modal\"\n    class=\"fixed inset-0 bg-[var(--bg-overlay,rgba(0,0,0,0.5))] flex items-center justify-center z-[1000]\"\n    (click)=\"handleOverlayClick($event)\"\n  >\n    <div\n      [class]=\"\n        'modal modal-' +\n        size +\n        ' bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-xl min-w-[320px] max-h-[90vh] flex flex-col shadow-2xl'\n      \"\n      [style.width]=\"\n        size === 'sm'\n          ? '320px'\n          : size === 'md'\n            ? '480px'\n            : size === 'lg'\n              ? '640px'\n              : '480px'\n      \"\n    >\n      <header\n        class=\"flex items-center justify-between p-4 border-b border-[var(--border-color)]\"\n      >\n        <h3 class=\"m-0 text-lg font-semibold text-[var(--text-primary)]\">\n          {{ title }}\n        </h3>\n        <button\n          class=\"bg-transparent border-none cursor-pointer p-1 rounded text-xl leading-none text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n          (click)=\"close()\"\n          aria-label=\"Close\"\n        >\n          &times;\n        </button>\n      </header>\n      <div class=\"p-5 overflow-y-auto text-[var(--text-primary)]\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n}\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ModalComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-modal", standalone: true, imports: [ApplyThemeDirective], template: "@if (open) {\n  <div\n    appApplyTheme=\"app-modal\"\n    class=\"fixed inset-0 bg-[var(--bg-overlay,rgba(0,0,0,0.5))] flex items-center justify-center z-[1000]\"\n    (click)=\"handleOverlayClick($event)\"\n  >\n    <div\n      [class]=\"\n        'modal modal-' +\n        size +\n        ' bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-xl min-w-[320px] max-h-[90vh] flex flex-col shadow-2xl'\n      \"\n      [style.width]=\"\n        size === 'sm'\n          ? '320px'\n          : size === 'md'\n            ? '480px'\n            : size === 'lg'\n              ? '640px'\n              : '480px'\n      \"\n    >\n      <header\n        class=\"flex items-center justify-between p-4 border-b border-[var(--border-color)]\"\n      >\n        <h3 class=\"m-0 text-lg font-semibold text-[var(--text-primary)]\">\n          {{ title }}\n        </h3>\n        <button\n          class=\"bg-transparent border-none cursor-pointer p-1 rounded text-xl leading-none text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n          (click)=\"close()\"\n          aria-label=\"Close\"\n        >\n          &times;\n        </button>\n      </header>\n      <div class=\"p-5 overflow-y-auto text-[var(--text-primary)]\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n}\n" }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], size: [{
                type: Input
            }], closed: [{
                type: Output
            }], onEscape: [{
                type: HostListener,
                args: ["window:keydown.escape"]
            }] } });
registerSchemaComponent("app-modal", ModalComponent);

class DialogComponent {
    open = false;
    title = "";
    size = "md";
    showHeader = true;
    showFooter = false;
    closed = new EventEmitter();
    handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this.close();
        }
    }
    close() {
        this.open = false;
        this.closed.emit();
    }
    onEscape() {
        if (this.open)
            this.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: DialogComponent, isStandalone: true, selector: "app-dialog", inputs: { open: "open", title: "title", size: "size", showHeader: "showHeader", showFooter: "showFooter" }, outputs: { closed: "closed" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: "@if (open) {\n  <div\n    appApplyTheme=\"app-dialog\"\n    class=\"fixed inset-0 flex items-center justify-center z-[1000] bg-[var(--bg-overlay,rgba(0,0,0,0.5))]\"\n    (click)=\"handleOverlayClick($event)\"\n  >\n    <div\n      [class]=\"\n        'flex flex-col bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-3xl min-w-[360px] max-h-[90vh] shadow-2xl dialog-' +\n        size\n      \"\n    >\n      <header\n        class=\"flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-elevated)] rounded-t-3xl\"\n      >\n        <h2 class=\"m-0 text-xl font-bold text-[var(--text-primary)]\">\n          {{ title }}\n        </h2>\n        <button\n          class=\"bg-transparent border-0 cursor-pointer px-2 py-1 rounded-md text-2xl leading-none font-light transition-colors duration-150 text-[var(--text-secondary)] hover:text-[var(--text-primary)]\"\n          (click)=\"close()\"\n          aria-label=\"Close\"\n        >\n          &times;\n        </button>\n      </header>\n      <div class=\"px-6 py-5 overflow-y-auto text-[var(--text-primary)]\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n}\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DialogComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-dialog", standalone: true, imports: [ApplyThemeDirective], template: "@if (open) {\n  <div\n    appApplyTheme=\"app-dialog\"\n    class=\"fixed inset-0 flex items-center justify-center z-[1000] bg-[var(--bg-overlay,rgba(0,0,0,0.5))]\"\n    (click)=\"handleOverlayClick($event)\"\n  >\n    <div\n      [class]=\"\n        'flex flex-col bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-3xl min-w-[360px] max-h-[90vh] shadow-2xl dialog-' +\n        size\n      \"\n    >\n      <header\n        class=\"flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)] bg-[var(--bg-elevated)] rounded-t-3xl\"\n      >\n        <h2 class=\"m-0 text-xl font-bold text-[var(--text-primary)]\">\n          {{ title }}\n        </h2>\n        <button\n          class=\"bg-transparent border-0 cursor-pointer px-2 py-1 rounded-md text-2xl leading-none font-light transition-colors duration-150 text-[var(--text-secondary)] hover:text-[var(--text-primary)]\"\n          (click)=\"close()\"\n          aria-label=\"Close\"\n        >\n          &times;\n        </button>\n      </header>\n      <div class=\"px-6 py-5 overflow-y-auto text-[var(--text-primary)]\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </div>\n}\n" }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], size: [{
                type: Input
            }], showHeader: [{
                type: Input
            }], showFooter: [{
                type: Input
            }], closed: [{
                type: Output
            }], onEscape: [{
                type: HostListener,
                args: ["window:keydown.escape"]
            }] } });
registerSchemaComponent("app-dialog", DialogComponent);

class ConfirmDialogComponent {
    open = false;
    title = "Confirm";
    message = "";
    confirmText = "Confirm";
    cancelText = "Cancel";
    confirmed = new EventEmitter();
    cancelled = new EventEmitter();
    confirm() {
        this.open = false;
        this.confirmed.emit();
    }
    cancel() {
        this.open = false;
        this.cancelled.emit();
    }
    onEscape() {
        if (this.open)
            this.cancel();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ConfirmDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ConfirmDialogComponent, isStandalone: true, selector: "app-confirm-dialog", inputs: { open: "open", title: "title", message: "message", confirmText: "confirmText", cancelText: "cancelText" }, outputs: { confirmed: "confirmed", cancelled: "cancelled" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: "@if (open) {\n  <div\n    appApplyTheme=\"app-confirm-dialog\"\n    class=\"fixed inset-0 bg-[var(--bg-overlay,rgba(0,0,0,0.5))] flex items-center justify-center z-[1000]\"\n    (click)=\"cancel()\"\n  >\n    <div\n      class=\"dialog bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl w-[400px] max-w-[90vw] shadow-2xl\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <header\n        class=\"flex items-center justify-between p-5 border-b border-[var(--border-color)]\"\n      >\n        <h2 class=\"m-0 text-lg font-semibold text-[var(--text-primary)]\">\n          {{ title || \"Confirm\" }}\n        </h2>\n        <button\n          class=\"bg-transparent border-none cursor-pointer p-1 rounded text-xl leading-none text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n          (click)=\"cancel()\"\n          aria-label=\"Close\"\n        >\n          &times;\n        </button>\n      </header>\n      <div class=\"p-6 text-[var(--text-secondary)] text-[15px] leading-6\">\n        {{ message }}\n      </div>\n      <footer\n        class=\"flex gap-3 p-4 border-t border-[var(--border-color)] justify-end\"\n      >\n        <button\n          class=\"px-4 py-2 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] font-medium cursor-pointer hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n          (click)=\"cancel()\"\n        >\n          {{ cancelText || \"Cancel\" }}\n        </button>\n        <button\n          class=\"px-4 py-2 rounded-lg border border-[var(--accent)] bg-[var(--accent)] text-[var(--text-on-accent)] font-medium cursor-pointer hover:bg-[var(--accent-hover)]\"\n          (click)=\"confirm()\"\n        >\n          {{ confirmText || \"Confirm\" }}\n        </button>\n      </footer>\n    </div>\n  </div>\n}\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ConfirmDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-confirm-dialog", standalone: true, imports: [ApplyThemeDirective], template: "@if (open) {\n  <div\n    appApplyTheme=\"app-confirm-dialog\"\n    class=\"fixed inset-0 bg-[var(--bg-overlay,rgba(0,0,0,0.5))] flex items-center justify-center z-[1000]\"\n    (click)=\"cancel()\"\n  >\n    <div\n      class=\"dialog bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl w-[400px] max-w-[90vw] shadow-2xl\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <header\n        class=\"flex items-center justify-between p-5 border-b border-[var(--border-color)]\"\n      >\n        <h2 class=\"m-0 text-lg font-semibold text-[var(--text-primary)]\">\n          {{ title || \"Confirm\" }}\n        </h2>\n        <button\n          class=\"bg-transparent border-none cursor-pointer p-1 rounded text-xl leading-none text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n          (click)=\"cancel()\"\n          aria-label=\"Close\"\n        >\n          &times;\n        </button>\n      </header>\n      <div class=\"p-6 text-[var(--text-secondary)] text-[15px] leading-6\">\n        {{ message }}\n      </div>\n      <footer\n        class=\"flex gap-3 p-4 border-t border-[var(--border-color)] justify-end\"\n      >\n        <button\n          class=\"px-4 py-2 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] font-medium cursor-pointer hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n          (click)=\"cancel()\"\n        >\n          {{ cancelText || \"Cancel\" }}\n        </button>\n        <button\n          class=\"px-4 py-2 rounded-lg border border-[var(--accent)] bg-[var(--accent)] text-[var(--text-on-accent)] font-medium cursor-pointer hover:bg-[var(--accent-hover)]\"\n          (click)=\"confirm()\"\n        >\n          {{ confirmText || \"Confirm\" }}\n        </button>\n      </footer>\n    </div>\n  </div>\n}\n" }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], message: [{
                type: Input
            }], confirmText: [{
                type: Input
            }], cancelText: [{
                type: Input
            }], confirmed: [{
                type: Output
            }], cancelled: [{
                type: Output
            }], onEscape: [{
                type: HostListener,
                args: ["window:keydown.escape"]
            }] } });
registerSchemaComponent("app-confirm-dialog", ConfirmDialogComponent);

class LoadingComponent {
    size = "md";
    color = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LoadingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: LoadingComponent, isStandalone: true, selector: "app-loading", inputs: { size: "size", color: "color" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-loading\"\n  class=\"border-2 rounded-full animate-spin border-[var(--border-color)] border-t-[var(--accent)]\"\n  [class]=\"'spinner-' + size\"\n></div>\n", styles: ["@keyframes spin{to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-loading", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-loading\"\n  class=\"border-2 rounded-full animate-spin border-[var(--border-color)] border-t-[var(--accent)]\"\n  [class]=\"'spinner-' + size\"\n></div>\n", styles: ["@keyframes spin{to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], color: [{
                type: Input
            }] } });
registerSchemaComponent("app-loading", LoadingComponent);

class RadioComponent {
    name = "";
    value = "";
    checked = false;
    disabled = false;
    changed = new EventEmitter();
    label = "";
    handleChange(e) {
        this.checked = true;
        this.changed.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RadioComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: RadioComponent, isStandalone: true, selector: "app-radio", inputs: { name: "name", value: "value", checked: "checked", disabled: "disabled", label: "label" }, outputs: { changed: "changed" }, ngImport: i0, template: "<label appApplyTheme=\"app-radio\" class=\"flex items-center gap-2 cursor-pointer\">\n  <input\n    type=\"radio\"\n    class=\"w-4 h-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50\"\n    [style.accentColor]=\"'var(--accent)'\"\n    [name]=\"name\"\n    [value]=\"value\"\n    [checked]=\"checked\"\n    [disabled]=\"disabled\"\n    (change)=\"handleChange($event)\"\n  />\n  <span class=\"text-sm select-none text-[var(--text-primary)]\"\n    ><ng-content></ng-content\n  ></span>\n</label>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RadioComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-radio", standalone: true, imports: [ApplyThemeDirective], template: "<label appApplyTheme=\"app-radio\" class=\"flex items-center gap-2 cursor-pointer\">\n  <input\n    type=\"radio\"\n    class=\"w-4 h-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50\"\n    [style.accentColor]=\"'var(--accent)'\"\n    [name]=\"name\"\n    [value]=\"value\"\n    [checked]=\"checked\"\n    [disabled]=\"disabled\"\n    (change)=\"handleChange($event)\"\n  />\n  <span class=\"text-sm select-none text-[var(--text-primary)]\"\n    ><ng-content></ng-content\n  ></span>\n</label>\n" }]
        }], propDecorators: { name: [{
                type: Input
            }], value: [{
                type: Input
            }], checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }], label: [{
                type: Input
            }] } });
registerSchemaComponent("app-radio", RadioComponent);

class SliderComponent {
    min = 0;
    max = 100;
    value = 0;
    step = 1;
    disabled = false;
    input = new EventEmitter();
    handleInput(e) {
        this.value = Number(e.target.value);
        this.input.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SliderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: SliderComponent, isStandalone: true, selector: "app-slider", inputs: { min: "min", max: "max", value: "value", step: "step", disabled: "disabled" }, outputs: { input: "input" }, ngImport: i0, template: "<div appApplyTheme=\"app-slider\" class=\"w-full\">\n  <input\n    type=\"range\"\n    class=\"w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed\"\n    [style.accentColor]=\"'var(--accent)'\"\n    [value]=\"value\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [disabled]=\"disabled\"\n    (input)=\"handleInput($event)\"\n  />\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SliderComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-slider", standalone: true, imports: [ApplyThemeDirective], template: "<div appApplyTheme=\"app-slider\" class=\"w-full\">\n  <input\n    type=\"range\"\n    class=\"w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed\"\n    [style.accentColor]=\"'var(--accent)'\"\n    [value]=\"value\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [disabled]=\"disabled\"\n    (input)=\"handleInput($event)\"\n  />\n</div>\n" }]
        }], propDecorators: { min: [{
                type: Input
            }], max: [{
                type: Input
            }], value: [{
                type: Input
            }], step: [{
                type: Input
            }], disabled: [{
                type: Input
            }], input: [{
                type: Output
            }] } });
registerSchemaComponent("app-slider", SliderComponent);

class SwitchComponent {
    checked = false;
    label = "";
    disabled = false;
    changed = new EventEmitter();
    handleChange(e) {
        this.changed.emit(e.target.checked);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SwitchComponent, isStandalone: true, selector: "app-switch", inputs: { checked: "checked", label: "label", disabled: "disabled" }, outputs: { changed: "changed" }, ngImport: i0, template: "<label\n  appApplyTheme=\"app-switch\"\n  class=\"switch flex items-center gap-2 cursor-pointer relative\"\n  [class.switch-checked]=\"checked\"\n  [class.bg-[var(--accent)]]=\"checked\"\n>\n  <input\n    type=\"checkbox\"\n    [checked]=\"checked\"\n    [disabled]=\"disabled\"\n    (change)=\"handleChange($event)\"\n    class=\"absolute opacity-0 w-0 h-0\"\n  />\n  <span\n    class=\"slider w-10 h-5 rounded-full transition-colors relative\"\n    style=\"background-color: var(--border-color)\"\n  ></span>\n  @if (label) {\n    <span class=\"switch-label text-sm select-none text-[var(--text-primary)]\">{{\n      label\n    }}</span>\n  }\n</label>\n", styles: [":host{display:inline-flex;align-items:center}.slider:before{content:\"\";position:absolute;width:1rem;height:1rem;left:2px;top:2px;background-color:#fff;border-radius:50%;transition:transform .2s}.switch-checked .slider:before{transform:translate(1.25rem)}input:disabled~.slider{opacity:.5;cursor:not-allowed}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-switch", standalone: true, imports: [ApplyThemeDirective], template: "<label\n  appApplyTheme=\"app-switch\"\n  class=\"switch flex items-center gap-2 cursor-pointer relative\"\n  [class.switch-checked]=\"checked\"\n  [class.bg-[var(--accent)]]=\"checked\"\n>\n  <input\n    type=\"checkbox\"\n    [checked]=\"checked\"\n    [disabled]=\"disabled\"\n    (change)=\"handleChange($event)\"\n    class=\"absolute opacity-0 w-0 h-0\"\n  />\n  <span\n    class=\"slider w-10 h-5 rounded-full transition-colors relative\"\n    style=\"background-color: var(--border-color)\"\n  ></span>\n  @if (label) {\n    <span class=\"switch-label text-sm select-none text-[var(--text-primary)]\">{{\n      label\n    }}</span>\n  }\n</label>\n", styles: [":host{display:inline-flex;align-items:center}.slider:before{content:\"\";position:absolute;width:1rem;height:1rem;left:2px;top:2px;background-color:#fff;border-radius:50%;transition:transform .2s}.switch-checked .slider:before{transform:translate(1.25rem)}input:disabled~.slider{opacity:.5;cursor:not-allowed}\n"] }]
        }], propDecorators: { checked: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-switch", SwitchComponent);

class TextareaComponent {
    label = "";
    placeholder = "";
    disabled = false;
    value = "";
    flexGrow = false;
    input = new EventEmitter();
    handleInput(e) {
        this.value = e.target.value;
        this.input.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TextareaComponent, isStandalone: true, selector: "app-textarea", inputs: { label: "label", placeholder: "placeholder", disabled: "disabled", value: "value", flexGrow: "flexGrow" }, outputs: { input: "input" }, ngImport: i0, template: "@if (label) {\n  <label class=\"block text-sm font-medium mb-1 text-[var(--text-primary)]\">{{\n    label\n  }}</label>\n}\n<textarea\n  appApplyTheme=\"app-textarea\"\n  class=\"w-full px-3 py-2 rounded-lg border outline-none resize-y min-h-20 font-inherit focus:border-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]\"\n  [style.flexGrow]=\"flexGrow ? 1 : null\"\n  [placeholder]=\"placeholder\"\n  [disabled]=\"disabled\"\n  (input)=\"handleInput($event)\"\n></textarea>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-textarea", standalone: true, imports: [ApplyThemeDirective], template: "@if (label) {\n  <label class=\"block text-sm font-medium mb-1 text-[var(--text-primary)]\">{{\n    label\n  }}</label>\n}\n<textarea\n  appApplyTheme=\"app-textarea\"\n  class=\"w-full px-3 py-2 rounded-lg border outline-none resize-y min-h-20 font-inherit focus:border-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)]\"\n  [style.flexGrow]=\"flexGrow ? 1 : null\"\n  [placeholder]=\"placeholder\"\n  [disabled]=\"disabled\"\n  (input)=\"handleInput($event)\"\n></textarea>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], flexGrow: [{
                type: Input
            }], input: [{
                type: Output
            }] } });
registerSchemaComponent("app-textarea", TextareaComponent);

class BadgeComponent {
    variant = "default";
    size = "md";
    label = "";
    get badgeSizeClass() {
        const sizeClasses = {
            sm: "px-1 py-0.5 text-xs",
            md: "px-2 py-1 text-sm",
            lg: "px-3 py-1.5 text-base",
        };
        return sizeClasses[this.size] || sizeClasses["md"];
    }
    get badgeVariantClass() {
        const variantClasses = {
            default: "bg-[var(--bg-elevated)] text-[var(--text-primary)] border-[var(--border-color)]",
            primary: "bg-[var(--accent)] text-[var(--text-on-accent)]",
            success: "bg-[var(--success)] text-[var(--text-on-success)]",
            warning: "bg-[var(--warning)] text-[var(--text-on-warning)]",
            danger: "bg-[var(--error)] text-[var(--text-on-error)]",
        };
        return variantClasses[this.variant] || variantClasses["default"];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: BadgeComponent, isStandalone: true, selector: "app-badge", inputs: { variant: "variant", size: "size", label: "label" }, ngImport: i0, template: "<span\n  appApplyTheme=\"app-badge\"\n  [themedVariant]=\"variant\"\n  [themedSize]=\"size\"\n  [class]=\"\n    'inline-flex items-center rounded border font-medium ' +\n    badgeSizeClass +\n    ' ' +\n    badgeVariantClass\n  \"\n  >{{ label }}</span\n>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-badge", standalone: true, imports: [ApplyThemeDirective], template: "<span\n  appApplyTheme=\"app-badge\"\n  [themedVariant]=\"variant\"\n  [themedSize]=\"size\"\n  [class]=\"\n    'inline-flex items-center rounded border font-medium ' +\n    badgeSizeClass +\n    ' ' +\n    badgeVariantClass\n  \"\n  >{{ label }}</span\n>\n" }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], label: [{
                type: Input
            }] } });
registerSchemaComponent("app-badge", BadgeComponent);

/**
 * Safe JSON parser with fallback for array types.
 * Replaces 22+ duplicate patterns across the codebase.
 */
function parseJsonOrDefault(json, defaultValue = []) {
    if (Array.isArray(json))
        return json;
    try {
        return JSON.parse(json);
    }
    catch {
        return defaultValue;
    }
}

class SelectComponent {
    options = "[]";
    value = "";
    placeholder = "Select an option";
    disabled = false;
    changed = new EventEmitter();
    get parsedOptions() {
        return parseJsonOrDefault(this.options);
    }
    handleChange(e) {
        this.value = e.target.value;
        this.changed.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SelectComponent, isStandalone: true, selector: "app-select", inputs: { options: "options", value: "value", placeholder: "placeholder", disabled: "disabled" }, outputs: { changed: "changed" }, ngImport: i0, template: "<select\n  appApplyTheme=\"app-select\"\n  class=\"inline-flex items-center px-4 py-2 rounded-lg border text-base font-medium cursor-pointer transition-all min-w-36 hover:bg-[var(--bg-hover)] disabled:opacity-50 disabled:cursor-not-allowed border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)]\"\n  [style.--tw-border-color]=\"'var(--border-color)'\"\n  [disabled]=\"disabled\"\n  (change)=\"handleChange($event)\"\n>\n  <option value=\"\" disabled selected hidden>{{ placeholder }}</option>\n  @for (opt of parsedOptions; track opt) {\n    <option [value]=\"opt\" [selected]=\"opt === value\">{{ opt }}</option>\n  }\n</select>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SelectComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-select", standalone: true, imports: [ApplyThemeDirective], template: "<select\n  appApplyTheme=\"app-select\"\n  class=\"inline-flex items-center px-4 py-2 rounded-lg border text-base font-medium cursor-pointer transition-all min-w-36 hover:bg-[var(--bg-hover)] disabled:opacity-50 disabled:cursor-not-allowed border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)]\"\n  [style.--tw-border-color]=\"'var(--border-color)'\"\n  [disabled]=\"disabled\"\n  (change)=\"handleChange($event)\"\n>\n  <option value=\"\" disabled selected hidden>{{ placeholder }}</option>\n  @for (opt of parsedOptions; track opt) {\n    <option [value]=\"opt\" [selected]=\"opt === value\">{{ opt }}</option>\n  }\n</select>\n" }]
        }], propDecorators: { options: [{
                type: Input
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-select", SelectComponent);

/**
 * Centralized logging utility.
 * Allows silencing in production and redirecting to external loggers.
 */
const logger = {
    log: (message, ...args) => console.log(`[SCHEMA] ${message}`, ...args),
    warn: (message, ...args) => console.warn(`[SCHEMA] ${message}`, ...args),
    error: (message, ...args) => console.error(`[SCHEMA] ${message}`, ...args),
};

class SignalStoreService {
    _state = signal({}, ...(ngDevMode ? [{ debugName: "_state" }] : []));
    state = computed(() => this._state(), ...(ngDevMode ? [{ debugName: "state" }] : []));
    set(key, value) {
        this._state.update((state) => ({
            ...state,
            [key]: value,
        }));
    }
    get(key) {
        return this._state()[key];
    }
    update(key, fn) {
        const current = this.get(key);
        this.set(key, fn(current));
    }
    delete(key) {
        this._state.update((state) => {
            const { [key]: _, ...rest } = state;
            return rest;
        });
    }
    keys() {
        return Object.keys(this._state());
    }
    has(key) {
        return key in this._state();
    }
    clear() {
        this._state.set({});
    }
    toJSON() {
        return this._state();
    }
    fromJSON(json) {
        this._state.set(json);
    }
    patch(patch) {
        this._state.update((state) => ({
            ...state,
            ...patch,
        }));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalStoreService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalStoreService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalStoreService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

let CrudService$1 = class CrudService {
    storage = signal(null, ...(ngDevMode ? [{ debugName: "storage" }] : []));
    init(storage) {
        this.storage.set(storage);
    }
    getStorage() {
        const s = this.storage();
        if (!s)
            throw new Error("CrudService not initialized");
        return s;
    }
    getCollection(collection) {
        const data = this.getStorage().get(collection);
        return data || [];
    }
    saveCollection(collection, data) {
        this.getStorage().set(collection, data);
    }
    create(collection, item) {
        const data = this.getCollection(collection);
        const timestamp = Date.now();
        const entity = {
            ...item,
            created_at: timestamp,
            updated_at: timestamp,
        };
        data.push(entity);
        this.saveCollection(collection, data);
        this.addPending({
            _op: "create",
            _ts: timestamp,
            id: entity.id,
        });
    }
    read(collection, id) {
        const data = this.getCollection(collection);
        return (data.find((item) => item.id === id) || null);
    }
    update(collection, id, changes) {
        const data = this.getCollection(collection);
        const index = data.findIndex((item) => item.id === id);
        if (index === -1)
            return;
        const timestamp = Date.now();
        const updated = {
            ...data[index],
            ...changes,
            updated_at: timestamp,
        };
        data[index] = updated;
        this.saveCollection(collection, data);
        this.addPending({
            _op: "update",
            _ts: timestamp,
            id,
            data: changes,
        });
    }
    delete(collection, id) {
        const data = this.getCollection(collection);
        const filtered = data.filter((item) => item.id !== id);
        this.saveCollection(collection, filtered);
        this.addPending({
            _op: "delete",
            _ts: Date.now(),
            id,
        });
    }
    query(collection, q) {
        let data = this.getCollection(collection);
        if (q.filters) {
            for (const filter of q.filters) {
                data = this.applyFilter(data, filter);
            }
        }
        if (q.sortBy) {
            data = this.applySort(data, q.sortBy, q.sortAsc ?? true);
        }
        if (q.offset) {
            data = data.slice(q.offset);
        }
        if (q.limit) {
            data = data.slice(0, q.limit);
        }
        return data;
    }
    applyFilter(data, filter) {
        return data.filter((item) => {
            const value = item[filter.field];
            switch (filter.operator) {
                case "eq":
                    return value === filter.value;
                case "ne":
                    return value !== filter.value;
                case "gt":
                    return value > filter.value;
                case "gte":
                    return value >= filter.value;
                case "lt":
                    return value < filter.value;
                case "lte":
                    return value <= filter.value;
                case "contains":
                    return String(value)
                        .toLowerCase()
                        .includes(String(filter.value).toLowerCase());
                case "startsWith":
                    return String(value)
                        .toLowerCase()
                        .startsWith(String(filter.value).toLowerCase());
                case "endsWith":
                    return String(value)
                        .toLowerCase()
                        .endsWith(String(filter.value).toLowerCase());
                default:
                    return true;
            }
        });
    }
    applySort(data, sortBy, asc) {
        return [...data].sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            if (aVal == null)
                return 1;
            if (bVal == null)
                return -1;
            const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return asc ? cmp : -cmp;
        });
    }
    addPending(op) {
        const pending = this.getStorage().get("_pending_ops") || [];
        pending.push(op);
        this.getStorage().set("_pending_ops", pending);
    }
    batchCreate(collection, items) {
        const data = this.getCollection(collection);
        const timestamp = Date.now();
        for (const item of items) {
            const entity = {
                ...item,
                created_at: timestamp,
                updated_at: timestamp,
            };
            data.push(entity);
        }
        this.saveCollection(collection, data);
    }
    batchDelete(collection, ids) {
        const data = this.getCollection(collection);
        const filtered = data.filter((item) => !ids.includes(item.id));
        this.saveCollection(collection, filtered);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, providedIn: "root" });
};
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService$1, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class EventBusService {
    handlers = new Map();
    toasts = signal([], ...(ngDevMode ? [{ debugName: "toasts" }] : []));
    pendingToasts = this.toasts.asReadonly();
    hasToasts = () => this.toasts().length > 0;
    emit(event, data) {
        const eventHandlers = this.handlers.get(event);
        if (eventHandlers) {
            eventHandlers.forEach((handler) => handler(data));
        }
    }
    on(event, handler, context) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }
        const eventHandlers = this.handlers.get(event);
        const wrapped = context ? handler.bind(context) : handler;
        eventHandlers.add(wrapped);
        return () => this.off(event, wrapped);
    }
    once(event, handler, context) {
        const wrapped = (...args) => {
            this.off(event, wrapped);
            handler.apply(context, args);
        };
        return this.on(event, wrapped);
    }
    off(event, handler) {
        if (!handler) {
            this.handlers.delete(event);
            return;
        }
        const eventHandlers = this.handlers.get(event);
        if (eventHandlers) {
            eventHandlers.delete(handler);
            if (eventHandlers.size === 0) {
                this.handlers.delete(event);
            }
        }
    }
    offAll(event) {
        if (event) {
            this.handlers.delete(event);
        }
        else {
            this.handlers.clear();
        }
    }
    hasListeners(event) {
        const handlers = this.handlers.get(event);
        return handlers !== undefined && handlers.size > 0;
    }
    getListenerCount(event) {
        return this.handlers.get(event)?.size ?? 0;
    }
    generateId() {
        return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }
    showToast(message, type, duration = 3000) {
        const notification = {
            id: this.generateId(),
            message,
            type: type ?? "info",
            duration,
        };
        this.toasts.update((t) => [...t, notification]);
        if (duration > 0) {
            setTimeout(() => this.dismissToast(notification.id), duration);
        }
        return notification.id;
    }
    success(message, duration = 3000) {
        return this.showToast(message, "success", duration);
    }
    error(message, duration = 3000) {
        return this.showToast(message, "error", duration);
    }
    warning(message, duration = 3000) {
        return this.showToast(message, "warning", duration);
    }
    info(message, duration = 3000) {
        return this.showToast(message, "info", duration);
    }
    dismissToast(id) {
        this.toasts.update((t) => t.filter((n) => n.id !== id));
    }
    dismissAllToasts() {
        this.toasts.set([]);
    }
    notify(notification) {
        const id = notification.id ?? this.generateId();
        this.toasts.update((t) => [...t, { ...notification, id }]);
        if (notification.duration > 0) {
            setTimeout(() => this.dismissToast(id), notification.duration);
        }
        return id;
    }
    getToast(id) {
        return this.toasts().find((t) => t.id === id);
    }
    clearHistory() {
        this.toasts.set([]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: EventBusService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ComponentRegistryService {
    registry = new Map();
    componentManifest = {};
    _schemaComponents = new Map();
    _componentModules = new Map();
    constructor() {
        this.registerBuiltInComponents();
        this.loadComponentManifest();
    }
    registerBuiltInComponents() {
        // Built-in UI components
        const components = {
            // Layout
            header: { selector: "app-header" },
            footer: { selector: "app-footer" },
            sidebar: { selector: "app-sidebar" },
            "page-container": { selector: "app-page-container" },
            "page-toolbar": { selector: "app-page-toolbar" },
            "split-view": { selector: "app-split-view" },
            "main-editor": { selector: "app-main-editor" },
            // UI
            button: { selector: "app-button" },
            input: { selector: "app-input" },
            textarea: { selector: "app-textarea" },
            select: { selector: "app-select" },
            checkbox: { selector: "app-checkbox" },
            radio: { selector: "app-radio" },
            switch: { selector: "app-switch" },
            slider: { selector: "app-slider" },
            badge: { selector: "app-badge" },
            avatar: { selector: "app-avatar" },
            chip: { selector: "app-chip" },
            tabs: { selector: "app-tabs" },
            "empty-state": { selector: "app-empty-state" },
            loading: { selector: "app-loading" },
            "progress-bar": { selector: "app-progress-bar" },
            pagination: { selector: "app-pagination" },
            tooltip: { selector: "app-tooltip" },
            // Data
            card: { selector: "app-card" },
            "stats-card": { selector: "app-stats-card" },
            "table-view": { selector: "app-table-view" },
            "data-table": { selector: "app-data-table" },
            "json-view": { selector: "app-json-view" },
            "segment-selector": { selector: "app-segment-selector" },
            // Feedback
            dialog: { selector: "app-dialog" },
            "confirm-dialog": { selector: "app-confirm-dialog" },
            toast: { selector: "app-toast" },
            snackbar: { selector: "app-snackbar" },
            modal: { selector: "app-modal" },
            "command-palette": { selector: "app-command-palette" },
            // Grid
            "grid-container": { selector: "app-grid-container" },
            "grid-item": { selector: "app-grid-item" },
            "grid-area": { selector: "app-grid-area" },
            // Designer
            "designer-sidebar": { selector: "app-designer-sidebar" },
            "component-palette": { selector: "app-component-palette" },
            canvas: { selector: "app-canvas" },
            "canvas-toolbar": { selector: "app-canvas-toolbar" },
            "properties-panel": { selector: "app-properties-panel" },
            "bottom-panel": { selector: "app-bottom-panel" },
        };
        Object.entries(components).forEach(([id, def]) => {
            this.register(id, def);
        });
    }
    async loadComponentManifest() {
        try {
            const response = await fetch("/assets/component-manifest.json");
            if (response.ok) {
                this.componentManifest = await response.json();
            }
        }
        catch {
            // Manifest not found, use built-in registry only
        }
    }
    register(componentId, definition) {
        this.registry.set(componentId, definition);
    }
    unregister(componentId) {
        this.registry.delete(componentId);
    }
    get(componentId) {
        return this.registry.get(componentId);
    }
    getSelector(componentId) {
        const def = this.registry.get(componentId);
        if (!def) {
            console.warn(`ComponentRegistry: Unknown component "${componentId}", using fallback selector`);
            return `app-${componentId}`;
        }
        return def.selector;
    }
    has(componentId) {
        return this.registry.has(componentId);
    }
    resolveBehavior(componentId) {
        const def = this.registry.get(componentId);
        return def?.behaviors;
    }
    mergeBehavior(componentId, schemaBehavior) {
        const registered = this.resolveBehavior(componentId) ?? {};
        if (!schemaBehavior)
            return registered;
        return {
            selfMethods: { ...registered.selfMethods, ...schemaBehavior.selfMethods },
            classSetters: {
                ...registered.classSetters,
                ...schemaBehavior.classSetters,
            },
            eventHandlers: this.mergeEventHandlers(registered.eventHandlers, schemaBehavior.eventHandlers),
        };
    }
    mergeEventHandlers(base, override) {
        if (!base && !override)
            return undefined;
        if (!base)
            return override;
        if (!override)
            return base;
        const merged = { ...base };
        Object.entries(override).forEach(([event, handlers]) => {
            const existing = merged[event] ?? [];
            merged[event] = [...existing, ...handlers];
        });
        return merged;
    }
    getAllComponentIds() {
        return Array.from(this.registry.keys());
    }
    getComponentsByCategory(category) {
        // Filter components by category from manifest
        const manifest = this.componentManifest[category];
        if (!manifest)
            return [];
        return Object.keys(manifest);
    }
    // Schema-based component registration (delegated from schema-renderer/component-registry.ts)
    registerComponent(def) {
        this._schemaComponents.set(def.selector, def);
    }
    registerComponents(defs) {
        for (const def of defs) {
            this.registerComponent(def);
        }
    }
    getComponent(selector) {
        return this._schemaComponents.get(selector);
    }
    registerComponentModule(selector, module) {
        const modules = new Map(this._componentModules);
        modules.set(selector, module);
        this._componentModules = modules;
    }
    async loadComponentModule(selector) {
        const cached = this._componentModules.get(selector);
        if (cached) {
            const constructor = cached["default"];
            if (constructor)
                return constructor;
        }
        const def = this._schemaComponents.get(selector);
        if (!def) {
            throw new Error(`Component not found: ${selector}`);
        }
        const module = (await import(/* @vite-ignore */ def.selector));
        this.registerComponentModule(selector, module);
        const constructor = module["default"];
        if (!constructor) {
            throw new Error(`Module ${selector} does not export a default CustomElementConstructor`);
        }
        return constructor;
    }
    getComponentModules() {
        return this._componentModules;
    }
    loadComponentsFromSchema(pages) {
        const registry = new Map();
        for (const page of pages) {
            for (const comp of page.components || []) {
                registry.set(comp.selector, comp);
            }
        }
        this._schemaComponents = registry;
    }
    hasComponent(selector) {
        return this._schemaComponents.has(selector);
    }
    getRegisteredSelectors() {
        return Array.from(this._schemaComponents.keys());
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentRegistryService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class DataBindingResolverService {
    signalStore;
    crudService;
    _params = {};
    _functions = {};
    constructor(signalStore, crudService) {
        this.signalStore = signalStore;
        this.crudService = crudService;
    }
    setParams(params) {
        this._params = params;
    }
    registerFunction(name, fn) {
        this._functions[name] = fn;
    }
    registerFunctions(fns) {
        this._functions = { ...this._functions, ...fns };
    }
    resolveDataBinding(binding) {
        if (typeof binding === "string") {
            // Resolve {{functions.name(args)}} pattern
            const fnPattern = /\{\{functions\.([^}]+)\}\}/g;
            const fnResult = binding.replace(fnPattern, (_, callExpr) => {
                const value = this.resolveFunctionCall(callExpr);
                return value !== undefined ? String(value) : binding;
            });
            if (fnResult !== binding)
                return fnResult;
            // Resolve {{params.*}} pattern
            const paramsPattern = /\{\{params\.([^}]+)\}\}/g;
            const paramsResult = binding.replace(paramsPattern, (_, path) => {
                const value = this.resolveParamsPath(path);
                return value !== undefined ? String(value) : binding;
            });
            if (paramsResult !== binding)
                return paramsResult;
            // Resolve {{data.*}} pattern
            const dataPattern = /\{\{data\.([^}]+)\}\}/g;
            const dataResult = binding.replace(dataPattern, (_, path) => {
                const value = this.getDataBindingValue(path);
                return value !== undefined ? String(value) : binding;
            });
            return dataResult;
        }
        if (binding && typeof binding === "object" && "entity" in binding) {
            const db = binding;
            if (db.operation) {
                return this.executeCrudOperation(db);
            }
            const entityValue = this.signalStore.get(db.entity);
            if (db.field !== undefined) {
                return this.getNestedValue(entityValue, db.field);
            }
            return entityValue;
        }
        return binding;
    }
    resolveFunctionCall(callExpr) {
        // Parse "name(arg1, arg2)" or "name(arg1, 'string', key: value)"
        const match = callExpr.match(/^(\w+)\((.*)\)$/);
        if (!match) {
            // No args — treat as property access on functions registry
            return this._functions[callExpr];
        }
        const [, fnName, argsStr] = match;
        const fn = this._functions[fnName];
        if (typeof fn !== "function")
            return undefined;
        const args = this.parseCallArgs(argsStr);
        // Resolve each argument (may contain nested bindings)
        const resolvedArgs = args.map((arg) => this.resolveDataBinding(arg));
        return fn(...resolvedArgs);
    }
    parseCallArgs(argsStr) {
        if (!argsStr.trim())
            return [];
        const result = [];
        let current = "";
        let depth = 0;
        let inString = false;
        let stringChar = "";
        for (const char of argsStr) {
            if ((char === '"' || char === "'") && !inString) {
                inString = true;
                stringChar = char;
                current += char;
            }
            else if (char === stringChar && inString) {
                inString = false;
                stringChar = "";
                current += char;
            }
            else if (char === "(" && !inString) {
                depth++;
                current += char;
            }
            else if (char === ")" && !inString) {
                depth--;
                current += char;
            }
            else if (char === "," && depth === 0 && !inString) {
                result.push(current.trim());
                current = "";
            }
            else {
                current += char;
            }
        }
        if (current.trim())
            result.push(current.trim());
        return result;
    }
    resolveParamsPath(path) {
        return this.getNestedValue(this._params, path);
    }
    resolveProps(props, _componentId) {
        const resolved = {};
        for (const [key, value] of Object.entries(props)) {
            resolved[key] = this.resolveDataBinding(value);
        }
        return resolved;
    }
    executeCrudOperation(binding) {
        const { entity, operation, params } = binding;
        const resolvedParams = this.resolveParams(params || {});
        switch (operation) {
            case "find": {
                const query = this.buildCrudQuery(resolvedParams);
                return this.crudService.query(entity, query);
            }
            case "create": {
                const item = resolvedParams;
                this.crudService.create(entity, item);
                return;
            }
            case "update": {
                const id = params["id"];
                this.crudService.update(entity, id, resolvedParams);
                return;
            }
            case "delete": {
                const id = params["id"];
                this.crudService.delete(entity, id);
                return;
            }
            default:
                return this.signalStore.get(entity);
        }
    }
    resolveParams(params) {
        const resolved = {};
        for (const [key, value] of Object.entries(params)) {
            resolved[key] = this.resolveDataBinding(value);
        }
        return resolved;
    }
    buildCrudQuery(params) {
        const query = {};
        if (params["filter"]) {
            query.filters = this.buildFilters(params["filter"]);
        }
        if (params["sortBy"]) {
            query.sortBy = params["sortBy"];
            query.sortAsc = params["sortAsc"] !== false;
        }
        if (params["limit"]) {
            query.limit = params["limit"];
        }
        if (params["offset"]) {
            query.offset = params["offset"];
        }
        return query;
    }
    buildFilters(filterObj) {
        const filters = [];
        for (const [field, value] of Object.entries(filterObj)) {
            filters.push({ field, operator: "eq", value });
        }
        return filters;
    }
    getDataBindingValue(path) {
        const parts = this.parseBindingPath(path);
        let current = this.signalStore.get(parts[0]);
        for (let i = 1; i < parts.length; i++) {
            if (current === null || current === undefined)
                return undefined;
            const part = parts[i];
            const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
            if (arrayMatch) {
                const [, arrayKey, indexStr] = arrayMatch;
                const arr = this.getNestedValue(current, arrayKey);
                if (Array.isArray(arr)) {
                    const index = parseInt(indexStr, 10);
                    current = arr[index];
                }
                else {
                    current = undefined;
                }
            }
            else {
                current = this.getNestedValue(current, part);
            }
        }
        return current;
    }
    parseBindingPath(path) {
        const result = [];
        const regex = /([^\.]+)\[(\d+)\]|([^\.\[\]]+)/g;
        let match;
        while ((match = regex.exec(path)) !== null) {
            if (match[1] && match[2]) {
                result.push(`${match[1]}[${match[2]}]`);
            }
            else if (match[3]) {
                result.push(match[3]);
            }
        }
        return result;
    }
    getNestedValue(obj, key) {
        if (obj === null || obj === undefined)
            return undefined;
        if (typeof obj !== "object")
            return undefined;
        return obj[key];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolverService, deps: [{ token: SignalStoreService }, { token: CrudService$1 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolverService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataBindingResolverService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: SignalStoreService }, { type: CrudService$1 }] });

class LayoutEngineService {
    injector = inject(Injector);
    resolveClass(layout) {
        if (layout.class)
            return layout.class;
        const classes = [];
        if (layout.type === "grid") {
            classes.push("grid");
            if (layout.direction === "row")
                classes.push("grid-flow-col");
            else
                classes.push("grid-flow-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            if (layout.rowGap)
                classes.push(`gap-y-${layout.rowGap}`);
            if (layout.colGap)
                classes.push(`gap-x-${layout.colGap}`);
            if (layout.alignItems) {
                const map = {
                    start: "items-start",
                    center: "items-center",
                    end: "items-end",
                    stretch: "items-stretch",
                    baseline: "items-baseline",
                };
                if (map[layout.alignItems])
                    classes.push(map[layout.alignItems]);
            }
            if (layout.justifyItems) {
                const map = {
                    start: "justify-items-start",
                    center: "justify-items-center",
                    end: "justify-items-end",
                    stretch: "justify-items-stretch",
                };
                if (map[layout.justifyItems])
                    classes.push(map[layout.justifyItems]);
            }
        }
        else if (layout.type === "flex") {
            classes.push("flex");
            if (layout.direction === "column")
                classes.push("flex-col");
            else
                classes.push("flex-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            if (layout.rowGap)
                classes.push(`gap-y-${layout.rowGap}`);
            if (layout.colGap)
                classes.push(`gap-x-${layout.colGap}`);
            if (layout.flexWrap === "wrap")
                classes.push("flex-wrap");
            else if (layout.flexWrap === "nowrap")
                classes.push("flex-nowrap");
            else if (layout.flexWrap === "wrap-reverse")
                classes.push("flex-wrap-reverse");
            if (layout.flexGrow === true)
                classes.push("flex-grow");
            else if (layout.flexGrow === false)
                classes.push("flex-grow-0");
            if (layout.flexShrink === true)
                classes.push("flex-shrink");
            else if (layout.flexShrink === false)
                classes.push("flex-shrink-0");
            if (layout.alignItems) {
                const map = {
                    start: "items-start",
                    center: "items-center",
                    end: "items-end",
                    stretch: "items-stretch",
                    baseline: "items-baseline",
                };
                if (map[layout.alignItems])
                    classes.push(map[layout.alignItems]);
            }
            if (layout.alignContent) {
                const map = {
                    start: "content-start",
                    center: "content-center",
                    end: "content-end",
                    between: "content-between",
                    around: "content-around",
                    evenly: "content-evenly",
                };
                if (map[layout.alignContent])
                    classes.push(map[layout.alignContent]);
            }
        }
        else if (layout.type === "stack") {
            classes.push("flex");
            classes.push("flex-col");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            if (layout.rowGap)
                classes.push(`gap-y-${layout.rowGap}`);
        }
        // Common sizing
        if (layout.width === "full")
            classes.push("w-full");
        else if (layout.width === "auto")
            classes.push("w-auto");
        if (layout.height === "full")
            classes.push("h-full");
        else if (layout.height === "auto")
            classes.push("h-auto");
        // Margin X (auto for centering)
        if (layout.marginX === "auto")
            classes.push("mx-auto");
        return classes.join(" ");
    }
    /**
     * Applies theme CSS custom properties to a layout container element.
     * Uses ThemeService to get the current accent color and computed shades,
     * then sets them as inline CSS variables on the container.
     */
    applyThemeVariables(container) {
        const ts = this.injector.get(StyleThemeService, null);
        if (!ts)
            return;
        const root = document.documentElement;
        const accent = ts.accentColor();
        // Copy theme CSS variables from root to the container
        // This ensures layout containers have explicit theme values even if
        // they are inside shadow DOM or have custom styling contexts
        const themeVars = [
            "--text-primary",
            "--text-secondary",
            "--text-muted",
            "--bg-primary",
            "--bg-elevated",
            "--bg-hover",
            "--bg-tertiary",
            "--border-color",
            "--error",
            "--warning",
            "--success",
            "--info",
            "--accent",
        ];
        for (const varName of themeVars) {
            const value = root.style.getPropertyValue(varName);
            if (value) {
                container.style.setProperty(varName, value);
            }
        }
        // Apply accent shades if available
        const shades = ts?.accentShades?.();
        if (shades) {
            for (const [key, value] of Object.entries(shades)) {
                container.style.setProperty(`--accent-${key}`, value);
            }
        }
    }
    renderGridLayout(container, layout) {
        container.style.display = "grid";
        const layoutClasses = this.resolveClass(layout);
        if (layoutClasses) {
            container.className = layoutClasses;
        }
        else {
            const classes = ["grid"];
            if (layout.direction === "row")
                classes.push("grid-flow-col");
            else
                classes.push("grid-flow-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            container.className = classes.join(" ");
        }
        if (layout.gridTemplateColumns) {
            container.style.gridTemplateColumns = layout.gridTemplateColumns;
        }
        if (layout.gridTemplateRows) {
            container.style.gridTemplateRows = layout.gridTemplateRows;
        }
        this.applyThemeVariables(container);
        if (layout.style) {
            Object.assign(container.style, layout.style);
        }
        container.innerHTML = "";
    }
    renderFlexLayout(container, layout) {
        container.style.display = "flex";
        const layoutClasses = this.resolveClass(layout);
        if (layoutClasses) {
            container.className = layoutClasses;
        }
        else {
            const classes = ["flex"];
            if (layout.direction === "column")
                classes.push("flex-col");
            else
                classes.push("flex-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
            container.className = classes.join(" ");
        }
        this.applyThemeVariables(container);
        if (layout.style) {
            Object.assign(container.style, layout.style);
        }
        container.innerHTML = "";
    }
    resolveGridPosition(layout, componentId) {
        if (!layout || !layout.positions)
            return null;
        const pos = layout.positions.find((p) => p[componentId] !== undefined);
        if (!pos)
            return null;
        const position = pos;
        return {
            column: position.column || 1,
            row: position.row || 1,
            colSpan: position.colSpan || 1,
            rowSpan: position.rowSpan || 1,
        };
    }
    resolveGridPositionFromPositions(positions, componentId) {
        if (!positions)
            return null;
        const pos = positions.find((p) => p[componentId] !== undefined);
        if (!pos)
            return null;
        const position = pos;
        return {
            column: position.column || 1,
            row: position.row || 1,
            colSpan: position.colSpan || 1,
            rowSpan: position.rowSpan || 1,
        };
    }
    calculateGridSpan(colSpan, rowSpan) {
        return {
            gridColumn: `1 / span ${colSpan || 1}`,
            gridRow: `1 / span ${rowSpan || 1}`,
        };
    }
    async applyLayoutStyles(container, layout, children, getComponentById, resolvePosition) {
        if (layout.children) {
            for (const childId of layout.children) {
                const component = getComponentById(childId);
                if (component) {
                    const selector = component.selector;
                    // Wait for custom element to be defined if it's a custom element
                    if (selector.includes("-")) {
                        try {
                            await Promise.race([
                                customElements.whenDefined(selector),
                                new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout: ${selector}`)), 2000)),
                            ]);
                        }
                        catch (e) {
                            console.warn(`[LayoutEngine] Element not ready: ${selector}`, e);
                        }
                    }
                    const el = document.createElement(selector);
                    const position = resolvePosition(layout, childId);
                    if (position) {
                        el.style.gridColumn = `${position.column} / span ${position.colSpan || 1}`;
                        el.style.gridRow = `${position.row} / span ${position.rowSpan || 1}`;
                    }
                    container.appendChild(el);
                }
            }
        }
    }
    createGridTemplateString(columns, rows) {
        return {
            gridTemplateColumns: columns.join(" "),
            gridTemplateRows: rows.join(" "),
        };
    }
    parseGridTemplate(template) {
        return {
            gridTemplateColumns: template.columns.join(" "),
            gridTemplateRows: template.rows.join(" "),
            gap: template.gap,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LayoutEngineService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LayoutEngineService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LayoutEngineService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaRendererService {
    dataStore;
    crudService;
    eventBus;
    componentRegistry;
    dataBindingResolver;
    layoutEngine;
    i18n;
    _pages = signal([], ...(ngDevMode ? [{ debugName: "_pages" }] : []));
    _currentPageId = signal(null, ...(ngDevMode ? [{ debugName: "_currentPageId" }] : []));
    _navigationStack = signal([], ...(ngDevMode ? [{ debugName: "_navigationStack" }] : []));
    _appConfig = {};
    constructor(dataStore, crudService, eventBus, componentRegistry, dataBindingResolver, layoutEngine, i18n) {
        this.dataStore = dataStore;
        this.crudService = crudService;
        this.eventBus = eventBus;
        this.componentRegistry = componentRegistry;
        this.dataBindingResolver = dataBindingResolver;
        this.layoutEngine = layoutEngine;
        this.i18n = i18n;
    }
    componentResolver = null;
    routeResolver = null;
    // Schema-level handlers and stores
    _handlers = {};
    _stores = {};
    _layoutRegions = signal([], ...(ngDevMode ? [{ debugName: "_layoutRegions" }] : []));
    _currentRoute = signal("", ...(ngDevMode ? [{ debugName: "_currentRoute" }] : []));
    pages = this._pages.asReadonly();
    currentPageId = this._currentPageId.asReadonly();
    layoutRegions = this._layoutRegions.asReadonly();
    registerComponent(def) {
        this.componentRegistry.registerComponent(def);
    }
    registerComponents(defs) {
        this.componentRegistry.registerComponents(defs);
    }
    getComponent(selector) {
        return this.componentRegistry.getComponent(selector);
    }
    loadSchema(schema) {
        logger.log("[SchemaRenderer] loadSchema() called, pages:", schema?.pages?.length ?? 0);
        // Support both AppSchema and legacy Page[] format
        const pages = schema.pages;
        this._pages.set(pages || []);
        this.componentRegistry.loadComponentsFromSchema(pages || []);
        // Extract app config
        const appConfig = "app" in schema
            ? schema.app
            : "app" in schema
                ? schema.app
                : undefined;
        this._appConfig = {
            variant: appConfig?.variant,
            size: appConfig?.size,
        };
        // Initialize locale from schema settings
        const settings = appConfig && "settings" in appConfig
            ? appConfig.settings
            : undefined;
        if (settings?.defaultLocale) {
            this.i18n.setLocale(settings.defaultLocale);
        }
        // Extract layout regions (AppSchema only)
        if ("layoutRegions" in schema && Array.isArray(schema.layoutRegions)) {
            this._layoutRegions.set(schema.layoutRegions);
        }
        else {
            this._layoutRegions.set([]);
        }
        // Extract handlers (AppSchema only)
        if ("handlers" in schema && schema.handlers) {
            this._handlers = schema.handlers;
        }
        // Extract stores (AppSchema only)
        if ("stores" in schema && schema.stores) {
            this._stores = schema.stores;
            // Register stores in data store
            for (const [key, value] of Object.entries(schema.stores)) {
                this.dataStore.set(key, value);
            }
        }
    }
    setCurrentRoute(route) {
        this._currentRoute.set(route);
        this.dataBindingResolver.setParams({});
    }
    setParams(params) {
        this.dataBindingResolver.setParams(params);
    }
    registerFunction(name, fn) {
        this.dataBindingResolver.registerFunction(name, fn);
    }
    registerFunctions(fns) {
        this.dataBindingResolver.registerFunctions(fns);
    }
    getLayoutRegions() {
        return this._layoutRegions();
    }
    isElementVisible(element) {
        const route = this._currentRoute();
        // Check explicit visible prop
        if (element.visible !== undefined) {
            if (typeof element.visible === "boolean") {
                return element.visible;
            }
            // visible: { when: "{{role}}", equals: "admin" }
            if (typeof element.visible === "object" && element.visible.when) {
                // Simple equality check for now
                const binding = element.visible.when;
                const expected = element.visible.equals;
                // TODO: Implement proper data binding resolution
                const current = this.dataBindingResolver.resolveProps({ value: binding }, "");
                return current["value"] === expected;
            }
        }
        // Check route visibility
        if (element.routes) {
            const { include, exclude } = element.routes;
            // If include is set and doesn't contain "*" or current route, hide
            if (include &&
                include.length > 0 &&
                !include.includes("*") &&
                !include.some((r) => route.match(new RegExp(r.replace("*", ".*"))))) {
                return false;
            }
            // If exclude contains current route, hide
            if (exclude &&
                exclude.some((r) => route.match(new RegExp(r.replace("*", ".*"))))) {
                return false;
            }
        }
        return true;
    }
    getCurrentPage() {
        const id = this._currentPageId();
        if (!id)
            return null;
        return this._pages().find((p) => p.id === id) || null;
    }
    setCurrentPage(pageId) {
        this._currentPageId.set(pageId);
        const stack = [...this._navigationStack()];
        if (stack[stack.length - 1] !== pageId) {
            stack.push(pageId);
            this._navigationStack.set(stack);
        }
    }
    navigateToPage(route) {
        const resolvedPageId = this.routeResolver
            ? this.routeResolver(route)
            : null;
        if (resolvedPageId) {
            this.setCurrentPage(resolvedPageId);
        }
    }
    getNavigationStack() {
        return [...this._navigationStack()];
    }
    setRouteResolver(resolver) {
        this.routeResolver = resolver;
    }
    async renderGridLayout(container, layout) {
        this.layoutEngine.renderGridLayout(container, layout);
        await this.layoutEngine.applyLayoutStyles(container, layout, layout.children || [], (childId) => this.getCurrentPage()?.components?.find((c) => c.id === childId), (l, childId) => this.layoutEngine.resolveGridPosition(l, childId));
    }
    async renderFlexLayout(container, layout) {
        this.layoutEngine.renderFlexLayout(container, layout);
        container.innerHTML = "";
        if (layout.children) {
            for (const childId of layout.children) {
                const component = this.getCurrentPage()?.components?.find((c) => c.id === childId);
                if (component) {
                    const selector = component.selector;
                    // Wait for custom element to be defined if it's a custom element
                    if (selector.includes("-")) {
                        try {
                            await Promise.race([
                                customElements.whenDefined(selector),
                                new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout: ${selector}`)), 2000)),
                            ]);
                        }
                        catch (e) {
                            logger.warn(`[SchemaRenderer] Element not ready: ${selector}`, e);
                        }
                    }
                    const el = document.createElement(selector);
                    container.appendChild(el);
                }
            }
        }
    }
    async loadComponentModule(selector) {
        return this.componentRegistry.loadComponentModule(selector);
    }
    registerComponentModule(selector, module) {
        this.componentRegistry.registerComponentModule(selector, module);
    }
    resolveGridPosition(layoutId, componentId) {
        const page = this.getCurrentPage();
        if (!page)
            return null;
        const layout = page.layouts.find((l) => l.id === layoutId);
        return this.layoutEngine.resolveGridPosition(layout, componentId);
    }
    resolveClass(layout) {
        return this.layoutEngine.resolveClass(layout);
    }
    /**
     * Resolves responsive grid position based on current window width.
     * Merges breakpoint overrides (sm, md, lg) into base position.
     */
    resolveResponsiveGridPosition(pos) {
        if (!pos.sm && !pos.md && !pos.lg)
            return pos;
        const width = window.innerWidth;
        if (width < 640 && pos.sm)
            return { ...pos, ...pos.sm };
        if (width < 1024 && pos.md)
            return { ...pos, ...pos.md };
        if (pos.lg)
            return { ...pos, ...pos.lg };
        return pos;
    }
    getComponentProps(componentId) {
        const page = this.getCurrentPage();
        if (!page)
            return {};
        const component = (page.components ?? []).find((c) => c.id === componentId);
        return component?.props || {};
    }
    generatePage(pageId) {
        const page = this._pages().find((p) => p.id === pageId);
        if (!page)
            return { layouts: [], components: [] };
        return {
            layouts: page.layouts,
            components: page.components || [],
        };
    }
    setComponentResolver(resolver) {
        this.componentResolver = resolver;
    }
    async createElement(data) {
        const selector = data.componentId;
        // Try to get component definition from registry
        const def = this.componentResolver
            ? this.componentResolver(selector)
            : this.getComponent(selector);
        // Determine final selector (use def.selector if available, otherwise use selector)
        const finalSelector = def?.selector ?? selector;
        // Wait for custom element to be defined if it's a custom element
        if (finalSelector.includes("-")) {
            try {
                await Promise.race([
                    customElements.whenDefined(finalSelector),
                    new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout: ${finalSelector}`)), 2000)),
                ]);
            }
            catch (e) {
                logger.warn(`[SchemaRenderer] Element not ready: ${finalSelector}`, e);
            }
        }
        // Create the element
        const el = document.createElement(finalSelector);
        // Apply grid position
        if (data.gridPosition) {
            const resolved = this.resolveResponsiveGridPosition(data.gridPosition);
            el.style.gridColumn = `${resolved.column} / span ${resolved.colSpan || 1}`;
            el.style.gridRow = `${resolved.row} / span ${resolved.rowSpan || 1}`;
        }
        else if (data.position) {
            el.style.position = "absolute";
            el.style.left = `${data.position.x}px`;
            el.style.top = `${data.position.y}px`;
            el.style.width = `${data.position.width}px`;
            el.style.height = `${data.position.height}px`;
        }
        if (data.zIndex) {
            el.style.zIndex = `${data.zIndex}`;
        }
        // Get mapped classes from props (variant, size, etc.)
        const theme = getCurrentStyle();
        const globalContext = {
            variant: this._appConfig.variant || theme,
            size: this._appConfig.size,
        };
        const explicitVariant = data.props?.["variant"];
        const explicitSize = data.props?.["size"];
        const mappedClasses = this.mapPropsToClasses(data.componentId, data.props ?? {}, theme, explicitVariant, explicitSize, globalContext);
        const mappedClassStr = mappedClasses.join(" ");
        const resolvedClasses = this.resolveClasses(data.classes ?? "", def?.defaultClasses || "");
        const finalClasses = mappedClassStr
            ? this.resolveClasses(resolvedClasses, mappedClassStr)
            : resolvedClasses;
        // Use setAttribute instead of className for Lit shadow DOM compatibility
        if (finalClasses) {
            el.setAttribute("class", finalClasses);
        }
        // Merge default values, then def.props, then data.props (data.props wins)
        const mergedProps = {
            ...(data.defaults || {}),
            ...(def?.props || {}),
            ...data.props,
        };
        const resolvedProps = this.dataBindingResolver.resolveProps(mergedProps, data.id);
        // Handle text / i18nKey / label props
        // i18nKey takes precedence over text, text takes precedence over label
        const i18nKey = resolvedProps["i18nKey"];
        const textValue = resolvedProps["text"];
        const labelValue = resolvedProps["label"];
        if (i18nKey !== undefined) {
            el["label"] = this.i18n.t(String(i18nKey));
        }
        else if (textValue !== undefined) {
            // Native HTML elements get textContent; custom elements get label property
            const isCustom = el.tagName.includes("-");
            if (isCustom) {
                el["label"] = String(textValue);
            }
            else {
                el.textContent = String(textValue);
            }
        }
        else if (labelValue !== undefined) {
            el["label"] = String(labelValue);
        }
        // Handle placeholder_i18n prop: resolve via I18nService and set as placeholder
        const placeholderI18n = resolvedProps["placeholder_i18n"];
        if (placeholderI18n !== undefined) {
            el["placeholder"] = this.i18n.t(String(placeholderI18n));
        }
        for (const [key, value] of Object.entries(resolvedProps)) {
            if (key === "class" ||
                key === "style" ||
                key === "id" ||
                key === "label" ||
                key === "text" ||
                key === "i18nKey" ||
                key === "placeholder_i18n")
                continue;
            if (key.startsWith("on") && typeof value === "function") {
                const eventName = key[2].toLowerCase() + key.slice(3);
                el.addEventListener(eventName, value);
            }
            else if (key === "disabled" ||
                key === "checked" ||
                key === "readonly") {
                // Boolean properties: set as property for Lit compatibility
                el[key] = value === true || value === "true" || value === key;
            }
            else {
                // Use property assignment for component inputs
                // Skip props that don't exist as inputs to avoid NG0303 errors
                if (el[key] === undefined) {
                    continue;
                }
                let finalValue = value;
                if (value !== null &&
                    typeof value === "object" &&
                    !Array.isArray(value)) {
                    finalValue = JSON.stringify(value);
                }
                else if (Array.isArray(value)) {
                    finalValue = JSON.stringify(value);
                }
                try {
                    el[key] = finalValue;
                }
                catch (e) {
                    // Skip properties that can't be set
                }
            }
        }
        el.dataset["elementId"] = data.id;
        el.dataset["componentId"] = data.componentId;
        if (data.dataBinding) {
            el.dataset["dataEntity"] = data.dataBinding.entity;
            if (data.dataBinding.field) {
                el.dataset["dataField"] = data.dataBinding.field;
            }
        }
        if (data.events) {
            for (const [eventName, handlers] of Object.entries(data.events)) {
                el.addEventListener(eventName, (e) => {
                    // handlers can be string, function, or array of {handler, params?}
                    const handlerList = Array.isArray(handlers) ? handlers : [handlers];
                    for (const h of handlerList) {
                        if (typeof h === "function") {
                            this.eventBus.emit(eventName, { elementId: data.id, event: e });
                        }
                        else if (typeof h === "string") {
                            // Emit a descriptive event name: "elementId:eventName"
                            this.eventBus.emit(`${data.id}:${eventName}`, {
                                elementId: data.id,
                                event: e,
                            });
                        }
                        else if (typeof h === "object" && h !== null && "handler" in h) {
                            // Schema format: { handler: "onShortcutsOpen", params?: ... }
                            this.eventBus.emit(`${data.id}:${h.handler}`, {
                                elementId: data.id,
                                event: e,
                            });
                        }
                    }
                });
            }
        }
        return el;
    }
    async render(container, pageSchema, currentRoute) {
        logger.log(`[SchemaRenderer] render() called: page="${pageSchema?.name}", elements=${pageSchema?.elements?.length ?? 0}, currentRoute="${currentRoute}"`);
        container.innerHTML = "";
        // Update current route for visibility checks
        if (currentRoute) {
            this.setCurrentRoute(currentRoute);
        }
        if (pageSchema.gridTemplate) {
            const template = this.layoutEngine.parseGridTemplate(pageSchema.gridTemplate);
            container.style.display = "grid";
            container.style.gridTemplateColumns = template.gridTemplateColumns;
            container.style.gridTemplateRows = template.gridTemplateRows;
            container.style.gap = template.gap;
        }
        // Render root elements with their nested children
        for (const element of pageSchema.elements) {
            if (this.isElementVisible(element)) {
                const el = await this.createElement(element);
                if (el) {
                    // Recursively render nested children
                    await this.renderNestedChildren(el, element);
                    container.appendChild(el);
                }
            }
        }
    }
    async renderNestedChildren(parent, element) {
        if (!element.children || element.children.length === 0)
            return;
        for (const child of element.children) {
            if (this.isElementVisible(child)) {
                const childEl = await this.createElement(child);
                if (childEl) {
                    // Recursively render nested children
                    await this.renderNestedChildren(childEl, child);
                    parent.appendChild(childEl);
                }
            }
        }
    }
    // Render layout regions (header, footer, sidebar) to shell containers
    async renderLayoutRegion(container, regionId, currentRoute) {
        container.innerHTML = "";
        if (currentRoute) {
            this.setCurrentRoute(currentRoute);
        }
        const region = this._layoutRegions().find((r) => r.id === regionId);
        if (!region) {
            logger.warn(`Layout region not found: ${regionId}`);
            return;
        }
        // Check visibility
        if (!this.isElementVisible(region)) {
            container.style.display = "none";
            return;
        }
        // Create the region element
        const el = await this.createElement(region);
        if (!el)
            return;
        // Render nested children directly
        if (region.children && region.children.length > 0) {
            for (const child of region.children) {
                if (this.isElementVisible(child)) {
                    const childEl = await this.createElement(child);
                    if (childEl) {
                        // Recursively render nested children
                        await this.renderNestedChildren(childEl, child);
                        el.appendChild(childEl);
                    }
                }
            }
        }
        container.appendChild(el);
    }
    bindEvents(el, events, elementId) {
        for (const [eventName, handler] of Object.entries(events)) {
            if (typeof handler === "function") {
                el.addEventListener(eventName, handler);
            }
            else if (typeof handler === "string") {
                const resolvedHandler = this.dataBindingResolver.resolveDataBinding(handler);
                if (typeof resolvedHandler === "string" &&
                    resolvedHandler.startsWith("{{data.")) {
                    const dataPath = resolvedHandler
                        .replace(/\{\{|\}\}/g, "")
                        .replace("data.", "");
                    const dataValue = this.getDataBindingValue(dataPath);
                    if (typeof dataValue === "function") {
                        el.addEventListener(eventName, dataValue);
                    }
                }
            }
        }
    }
    // Maps semantic props to theme CSS classes using global style registry
    // Supports:
    //   - styleName: named style lookup in componentStyles registry
    //   - layout: "flex" | "grid" → Tailwind flex/grid classes
    //   - direction: "row" | "col" → flex-direction
    //   - gap: "xs"|"sm"|"md"|"lg"|"xl" → gap spacing
    //   - align: "start"|"center"|"end"|"stretch" → align-items
    //   - justify: "start"|"center"|"end"|"between"|"around" → justify-content
    //   - padding: "none"|"xs"|"sm"|"md"|"lg"|"xl" → padding
    //   - marginTop|marginBottom: "none"|"xs"|"sm"|"md"|"lg"|"xl"
    //   - maxWidth: "sm"|"md"|"lg"|"xl"|"2xl"|... → max-width
    //   - mx: "auto" → mx-auto
    //   - fullHeight: true → h-full
    //   - rounded: true → rounded-lg
    //   - elevation: "low"|"medium"|"high" → elevation classes (theme-specific)
    mapPropsToClasses(componentId, props, theme, explicitVariant, explicitSize, globalContext) {
        const classes = [];
        if (!props)
            return classes;
        // 1. Named style from variant/size (explicit props OR globalContext fallback)
        const hasStyle = explicitVariant ||
            explicitSize ||
            globalContext?.variant ||
            globalContext?.size;
        if (hasStyle) {
            const classesStr = getComponentStyleClasses(theme, componentId, explicitVariant, explicitSize, globalContext);
            if (classesStr) {
                classes.push(...classesStr.split(" ").filter((c) => c.trim()));
            }
        }
        // 2. Layout type (flex/grid)
        const layout = props["layout"];
        if (layout === "flex")
            classes.push("flex");
        else if (layout === "grid")
            classes.push("grid");
        else if (layout === "stack")
            classes.push("flex", "flex-col");
        // 3. Flex direction
        const direction = props["direction"];
        if (direction === "row")
            classes.push("flex-row");
        else if (direction === "col")
            classes.push("flex-col");
        else if (direction === "row-reverse")
            classes.push("flex-row-reverse");
        else if (direction === "col-reverse")
            classes.push("flex-col-reverse");
        // 4. Gap spacing (supports both string tokens and numeric values)
        const gap = props["gap"];
        if (gap === "xs" || gap === 1)
            classes.push("gap-1");
        else if (gap === "sm" || gap === 2)
            classes.push("gap-2");
        else if (gap === "md" || gap === 3)
            classes.push("gap-3");
        else if (gap === "lg" || gap === 4)
            classes.push("gap-4");
        else if (gap === "xl" || gap === 6)
            classes.push("gap-6");
        else if (gap === "2xl" || gap === 8)
            classes.push("gap-8");
        // 5. Align items
        const align = props["align"];
        if (align === "start")
            classes.push("items-start");
        else if (align === "center")
            classes.push("items-center");
        else if (align === "end")
            classes.push("items-end");
        else if (align === "stretch")
            classes.push("items-stretch");
        // 6. Justify content
        const justify = props["justify"];
        if (justify === "start")
            classes.push("justify-start");
        else if (justify === "center")
            classes.push("justify-center");
        else if (justify === "end")
            classes.push("justify-end");
        else if (justify === "between")
            classes.push("justify-between");
        else if (justify === "around")
            classes.push("justify-around");
        // 7. Padding
        const padding = props["padding"];
        if (padding === "xs")
            classes.push("p-1");
        else if (padding === "sm")
            classes.push("p-2");
        else if (padding === "md")
            classes.push("p-4");
        else if (padding === "lg")
            classes.push("p-6");
        else if (padding === "xl")
            classes.push("p-8");
        // 8. Margin top/bottom
        const marginTop = props["marginTop"];
        if (marginTop === "xs")
            classes.push("mt-1");
        else if (marginTop === "sm")
            classes.push("mt-2");
        else if (marginTop === "md")
            classes.push("mt-4");
        else if (marginTop === "lg")
            classes.push("mt-6");
        else if (marginTop === "xl")
            classes.push("mt-8");
        const marginBottom = props["marginBottom"];
        if (marginBottom === "xs")
            classes.push("mb-1");
        else if (marginBottom === "sm")
            classes.push("mb-2");
        else if (marginBottom === "md")
            classes.push("mb-4");
        else if (marginBottom === "lg")
            classes.push("mb-6");
        else if (marginBottom === "xl")
            classes.push("mb-8");
        // 9. Max width
        const maxWidth = props["maxWidth"];
        if (maxWidth === "sm")
            classes.push("max-w-sm");
        else if (maxWidth === "md")
            classes.push("max-w-md");
        else if (maxWidth === "lg")
            classes.push("max-w-lg");
        else if (maxWidth === "xl")
            classes.push("max-w-xl");
        else if (maxWidth === "2xl")
            classes.push("max-w-2xl");
        else if (maxWidth === "3xl")
            classes.push("max-w-3xl");
        else if (maxWidth === "6xl")
            classes.push("max-w-6xl");
        else if (maxWidth === "7xl")
            classes.push("max-w-7xl");
        // 10. MX auto
        const mx = props["mx"];
        if (mx === "auto")
            classes.push("mx-auto");
        // 11. Full height
        const fullHeight = props["fullHeight"];
        if (fullHeight)
            classes.push("h-full");
        // 12. Rounded
        const rounded = props["rounded"];
        if (rounded)
            classes.push("rounded-lg");
        // 13. Columns (grid)
        const columns = props["columns"];
        if (columns) {
            // Support CSS grid column strings like "1fr auto 1fr"
            classes.push(`grid-cols-${columns.replace(/\s+/g, "-")}`);
        }
        // 14. Flex wrap
        const flexWrap = props["flexWrap"];
        if (flexWrap === "wrap")
            classes.push("flex-wrap");
        else if (flexWrap === "nowrap")
            classes.push("flex-nowrap");
        else if (flexWrap === "wrap-reverse")
            classes.push("flex-wrap-reverse");
        // 15. Flex grow
        const flexGrow = props["flexGrow"];
        if (flexGrow === true)
            classes.push("flex-grow");
        else if (flexGrow === false)
            classes.push("flex-grow-0");
        // 16. Flex shrink
        const flexShrink = props["flexShrink"];
        if (flexShrink === true)
            classes.push("flex-shrink");
        else if (flexShrink === false)
            classes.push("flex-shrink-0");
        // 17. Flex basis
        const flexBasis = props["flexBasis"];
        if (flexBasis === "auto")
            classes.push("basis-auto");
        else if (flexBasis === "full")
            classes.push("basis-full");
        else if (flexBasis === "half")
            classes.push("basis-1/2");
        else if (flexBasis === "third")
            classes.push("basis-1/3");
        else if (flexBasis === "quarter")
            classes.push("basis-1/4");
        // 18. Align items (container-level)
        const alignItems = props["alignItems"];
        if (alignItems === "start")
            classes.push("items-start");
        else if (alignItems === "center")
            classes.push("items-center");
        else if (alignItems === "end")
            classes.push("items-end");
        else if (alignItems === "stretch")
            classes.push("items-stretch");
        else if (alignItems === "baseline")
            classes.push("items-baseline");
        // 19. Align content (container-level, multi-row)
        const alignContent = props["alignContent"];
        if (alignContent === "start")
            classes.push("content-start");
        else if (alignContent === "center")
            classes.push("content-center");
        else if (alignContent === "end")
            classes.push("content-end");
        else if (alignContent === "between")
            classes.push("content-between");
        else if (alignContent === "around")
            classes.push("content-around");
        else if (alignContent === "evenly")
            classes.push("content-evenly");
        // 20. Justify items
        const justifyItems = props["justifyItems"];
        if (justifyItems === "start")
            classes.push("justify-items-start");
        else if (justifyItems === "center")
            classes.push("justify-items-center");
        else if (justifyItems === "end")
            classes.push("justify-items-end");
        else if (justifyItems === "stretch")
            classes.push("justify-items-stretch");
        // 21. Justify self (item-level)
        const justifySelf = props["justifySelf"];
        if (justifySelf === "start")
            classes.push("justify-self-start");
        else if (justifySelf === "center")
            classes.push("justify-self-center");
        else if (justifySelf === "end")
            classes.push("justify-self-end");
        else if (justifySelf === "stretch")
            classes.push("justify-self-stretch");
        else if (justifySelf === "auto")
            classes.push("justify-self-auto");
        // 22. Align self (item-level)
        const alignSelf = props["alignSelf"];
        if (alignSelf === "start")
            classes.push("self-start");
        else if (alignSelf === "center")
            classes.push("self-center");
        else if (alignSelf === "end")
            classes.push("self-end");
        else if (alignSelf === "stretch")
            classes.push("self-stretch");
        else if (alignSelf === "auto")
            classes.push("self-auto");
        // 23. Row gap (gap-y)
        const rowGap = props["rowGap"];
        if (rowGap === "xs")
            classes.push("gap-y-1");
        else if (rowGap === "sm")
            classes.push("gap-y-2");
        else if (rowGap === "md")
            classes.push("gap-y-4");
        else if (rowGap === "lg")
            classes.push("gap-y-6");
        else if (rowGap === "xl")
            classes.push("gap-y-8");
        // 24. Column gap (gap-x)
        const colGap = props["colGap"];
        if (colGap === "xs")
            classes.push("gap-x-1");
        else if (colGap === "sm")
            classes.push("gap-x-2");
        else if (colGap === "md")
            classes.push("gap-x-4");
        else if (colGap === "lg")
            classes.push("gap-x-6");
        else if (colGap === "xl")
            classes.push("gap-x-8");
        // 25. Width
        const width = props["width"];
        if (width === "full")
            classes.push("w-full");
        else if (width === "auto")
            classes.push("w-auto");
        else if (width === "screen")
            classes.push("w-screen");
        else if (width === "fit")
            classes.push("w-fit");
        // 26. Height
        const height = props["height"];
        if (height === "full")
            classes.push("h-full");
        else if (height === "auto")
            classes.push("h-auto");
        else if (height === "screen")
            classes.push("h-screen");
        else if (height === "fit")
            classes.push("h-fit");
        // 27. Margin X (mx)
        const marginX = props["marginX"];
        if (marginX === "auto")
            classes.push("mx-auto");
        else if (marginX === "xs")
            classes.push("mx-1");
        else if (marginX === "sm")
            classes.push("mx-2");
        else if (marginX === "md")
            classes.push("mx-4");
        else if (marginX === "lg")
            classes.push("mx-6");
        else if (marginX === "xl")
            classes.push("mx-8");
        // 28. Margin Y (my)
        const marginY = props["marginY"];
        if (marginY === "xs")
            classes.push("my-1");
        else if (marginY === "sm")
            classes.push("my-2");
        else if (marginY === "md")
            classes.push("my-4");
        else if (marginY === "lg")
            classes.push("my-6");
        else if (marginY === "xl")
            classes.push("my-8");
        // 29. Padding X (px)
        const paddingX = props["paddingX"];
        if (paddingX === "xs")
            classes.push("px-1");
        else if (paddingX === "sm")
            classes.push("px-2");
        else if (paddingX === "md")
            classes.push("px-4");
        else if (paddingX === "lg")
            classes.push("px-6");
        else if (paddingX === "xl")
            classes.push("px-8");
        // 30. Padding Y (py)
        const paddingY = props["paddingY"];
        if (paddingY === "xs")
            classes.push("py-1");
        else if (paddingY === "sm")
            classes.push("py-2");
        else if (paddingY === "md")
            classes.push("py-4");
        else if (paddingY === "lg")
            classes.push("py-6");
        else if (paddingY === "xl")
            classes.push("py-8");
        // 31. Responsive breakpoints (sm:, md:, lg:)
        const responsive = props["responsive"];
        if (responsive) {
            const gapMap = {
                xs: "1",
                sm: "2",
                md: "4",
                lg: "6",
                xl: "8",
            };
            // sm: breakpoint (640px+)
            if (responsive["sm"]) {
                const sm = responsive["sm"];
                if (sm["layout"] === "flex")
                    classes.push("sm:flex");
                if (sm["layout"] === "grid")
                    classes.push("sm:grid");
                if (sm["direction"] === "row")
                    classes.push("sm:flex-row");
                if (sm["direction"] === "col")
                    classes.push("sm:flex-col");
                if (sm["gap"] && gapMap[sm["gap"]])
                    classes.push(`sm:gap-${gapMap[sm["gap"]]}`);
                if (sm["align"] === "center")
                    classes.push("sm:items-center");
                if (sm["align"] === "start")
                    classes.push("sm:items-start");
                if (sm["align"] === "end")
                    classes.push("sm:items-end");
                if (sm["justify"] === "center")
                    classes.push("sm:justify-center");
                if (sm["justify"] === "start")
                    classes.push("sm:justify-start");
                if (sm["justify"] === "end")
                    classes.push("sm:justify-end");
                if (sm["flexWrap"] === "wrap")
                    classes.push("sm:flex-wrap");
                if (sm["padding"] === "md")
                    classes.push("sm:p-4");
                if (sm["padding"] === "lg")
                    classes.push("sm:p-6");
            }
            // md: breakpoint (768px+)
            if (responsive["md"]) {
                const md = responsive["md"];
                if (md["layout"] === "flex")
                    classes.push("md:flex");
                if (md["layout"] === "grid")
                    classes.push("md:grid");
                if (md["direction"] === "row")
                    classes.push("md:flex-row");
                if (md["direction"] === "col")
                    classes.push("md:flex-col");
                if (md["gap"] && gapMap[md["gap"]])
                    classes.push(`md:gap-${gapMap[md["gap"]]}`);
                if (md["align"] === "center")
                    classes.push("md:items-center");
                if (md["align"] === "start")
                    classes.push("md:items-start");
                if (md["align"] === "end")
                    classes.push("md:items-end");
                if (md["justify"] === "center")
                    classes.push("md:justify-center");
                if (md["justify"] === "start")
                    classes.push("md:justify-start");
                if (md["justify"] === "end")
                    classes.push("md:justify-end");
                if (md["justify"] === "between")
                    classes.push("md:justify-between");
                if (md["flexWrap"] === "wrap")
                    classes.push("md:flex-wrap");
                if (md["padding"] === "md")
                    classes.push("md:p-4");
                if (md["padding"] === "lg")
                    classes.push("md:p-6");
            }
            // lg: breakpoint (1024px+)
            if (responsive["lg"]) {
                const lg = responsive["lg"];
                if (lg["layout"] === "flex")
                    classes.push("lg:flex");
                if (lg["layout"] === "grid")
                    classes.push("lg:grid");
                if (lg["direction"] === "row")
                    classes.push("lg:flex-row");
                if (lg["direction"] === "col")
                    classes.push("lg:flex-col");
                if (lg["gap"] && gapMap[lg["gap"]])
                    classes.push(`lg:gap-${gapMap[lg["gap"]]}`);
                if (lg["align"] === "center")
                    classes.push("lg:items-center");
                if (lg["justify"] === "center")
                    classes.push("lg:justify-center");
                if (lg["justify"] === "between")
                    classes.push("lg:justify-between");
                if (lg["padding"] === "md")
                    classes.push("lg:p-4");
                if (lg["padding"] === "lg")
                    classes.push("lg:p-6");
            }
        }
        // 32. Text size
        const textSize = props["textSize"];
        if (textSize === "xs")
            classes.push("text-xs");
        else if (textSize === "sm")
            classes.push("text-sm");
        else if (textSize === "base")
            classes.push("text-base");
        else if (textSize === "lg")
            classes.push("text-lg");
        else if (textSize === "xl")
            classes.push("text-xl");
        else if (textSize === "2xl")
            classes.push("text-2xl");
        else if (textSize === "3xl")
            classes.push("text-3xl");
        // 33. Font weight
        const fontWeight = props["fontWeight"];
        if (fontWeight === "light")
            classes.push("font-light");
        else if (fontWeight === "normal")
            classes.push("font-normal");
        else if (fontWeight === "medium")
            classes.push("font-medium");
        else if (fontWeight === "semibold")
            classes.push("font-semibold");
        else if (fontWeight === "bold")
            classes.push("font-bold");
        // 34. Position
        const position = props["position"];
        if (position === "relative")
            classes.push("relative");
        else if (position === "absolute")
            classes.push("absolute");
        else if (position === "fixed")
            classes.push("fixed");
        else if (position === "sticky")
            classes.push("sticky");
        // 35. Z-index
        const zIndex = props["zIndex"];
        if (zIndex === 10 || zIndex === "10")
            classes.push("z-10");
        else if (zIndex === 20 || zIndex === "20")
            classes.push("z-20");
        else if (zIndex === 30 || zIndex === "30")
            classes.push("z-30");
        else if (zIndex === 40 || zIndex === "40")
            classes.push("z-40");
        else if (zIndex === 50 || zIndex === "50")
            classes.push("z-50");
        return classes;
    }
    resolveClasses(elementClasses, defaultClasses) {
        const classes = new Set();
        if (defaultClasses) {
            defaultClasses.split(" ").forEach((c) => classes.add(c));
        }
        if (elementClasses) {
            elementClasses
                .split(" ")
                .filter((c) => c.trim())
                .forEach((c) => classes.add(c));
        }
        return Array.from(classes).join(" ");
    }
    resolveDataBinding(binding) {
        return this.dataBindingResolver.resolveDataBinding(binding);
    }
    getDataBindingValue(path) {
        const parts = this.parseBindingPath(path);
        let current = this.dataStore.get(parts[0]);
        for (let i = 1; i < parts.length; i++) {
            if (current === null || current === undefined)
                return undefined;
            const part = parts[i];
            const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
            if (arrayMatch) {
                const [, arrayKey, indexStr] = arrayMatch;
                const arr = this.getNestedValue(current, arrayKey);
                if (Array.isArray(arr)) {
                    const index = parseInt(indexStr, 10);
                    current = arr[index];
                }
                else {
                    current = undefined;
                }
            }
            else {
                current = this.getNestedValue(current, part);
            }
        }
        return current;
    }
    parseBindingPath(path) {
        const result = [];
        const regex = /([^\.]+)\[(\d+)\]|([^\.\[\]]+)/g;
        let match;
        while ((match = regex.exec(path)) !== null) {
            if (match[1] && match[2]) {
                result.push(`${match[1]}[${match[2]}]`);
            }
            else if (match[3]) {
                result.push(match[3]);
            }
        }
        return result;
    }
    getNestedValue(obj, key) {
        if (obj === null || obj === undefined)
            return undefined;
        if (typeof obj !== "object")
            return undefined;
        return obj[key];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, deps: [{ token: SignalStoreService }, { token: CrudService$1 }, { token: EventBusService }, { token: ComponentRegistryService }, { token: DataBindingResolverService }, { token: LayoutEngineService }, { token: I18nService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: SignalStoreService }, { type: CrudService$1 }, { type: EventBusService }, { type: ComponentRegistryService }, { type: DataBindingResolverService }, { type: LayoutEngineService }, { type: I18nService }] });

class SchemaElementComponent {
    renderer = inject(SchemaRendererService);
    element;
    elements = [];
    get componentType() {
        const type = SCHEMA_COMPONENT_MAP.get(this.tag);
        return type ?? null;
    }
    get tag() {
        return this.element.componentId;
    }
    get classes() {
        const base = this.element.classes ?? "";
        if (!this.element.props)
            return base;
        const theme = getCurrentStyle();
        const mapped = this.renderer.mapPropsToClasses(this.element.componentId, this.element.props, theme);
        const mappedStr = mapped.join(" ").trim();
        return mappedStr ? `${base} ${mappedStr}` : base;
    }
    get childElements() {
        return this.element.children ?? [];
    }
    get props() {
        return this.element.props ?? {};
    }
    get gridStyle() {
        const gp = this.element.gridPosition;
        if (!gp)
            return {};
        const col = `${gp.column} / span ${gp.colSpan || 1}`;
        const row = `${gp.row} / span ${gp.rowSpan || 1}`;
        return { gridColumn: col, gridRow: row };
    }
    get elementStyles() {
        return {};
    }
    get isNativeHtml() {
        return [
            "div",
            "span",
            "h1",
            "h2",
            "h3",
            "p",
            "footer",
            "header",
            "section",
            "article",
            "main",
            "aside",
            "nav",
            "ul",
            "li",
            "a",
            "img",
            "label",
            "small",
            "strong",
            "em",
            "i",
            "b",
            "code",
            "pre",
            "blockquote",
            "figure",
            "figcaption",
        ].includes(this.tag);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaElementComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SchemaElementComponent, isStandalone: true, selector: "app-schema-element", inputs: { element: "element", elements: "elements" }, ngImport: i0, template: "<div\n  [id]=\"element.id\"\n  [class]=\"classes\"\n  [style]=\"gridStyle\"\n  [attr.data-element-id]=\"element.id\"\n  [ngStyle]=\"elementStyles\"\n>\n  @if (isNativeHtml && props[\"text\"]) {\n    <ng-container [ngSwitch]=\"tag\">\n      <h1 *ngSwitchCase=\"'h1'\">{{ props[\"text\"] }}</h1>\n      <h2 *ngSwitchCase=\"'h2'\">{{ props[\"text\"] }}</h2>\n      <p *ngSwitchCase=\"'p'\">{{ props[\"text\"] }}</p>\n      <footer *ngSwitchCase=\"'footer'\">{{ props[\"text\"] }}</footer>\n      <span *ngSwitchDefault>{{ props[\"text\"] }}</span>\n    </ng-container>\n  } @else if (componentType) {\n    <ng-container #dynamicHost></ng-container>\n  }\n  @if (isNativeHtml) {\n    @for (child of childElements; track $index) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"elements\"\n      ></app-schema-element>\n    }\n  }\n</div>\n", styles: [":host{display:contents}\n"], dependencies: [{ kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaElementComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-schema-element", standalone: true, imports: [CommonModule], template: "<div\n  [id]=\"element.id\"\n  [class]=\"classes\"\n  [style]=\"gridStyle\"\n  [attr.data-element-id]=\"element.id\"\n  [ngStyle]=\"elementStyles\"\n>\n  @if (isNativeHtml && props[\"text\"]) {\n    <ng-container [ngSwitch]=\"tag\">\n      <h1 *ngSwitchCase=\"'h1'\">{{ props[\"text\"] }}</h1>\n      <h2 *ngSwitchCase=\"'h2'\">{{ props[\"text\"] }}</h2>\n      <p *ngSwitchCase=\"'p'\">{{ props[\"text\"] }}</p>\n      <footer *ngSwitchCase=\"'footer'\">{{ props[\"text\"] }}</footer>\n      <span *ngSwitchDefault>{{ props[\"text\"] }}</span>\n    </ng-container>\n  } @else if (componentType) {\n    <ng-container #dynamicHost></ng-container>\n  }\n  @if (isNativeHtml) {\n    @for (child of childElements; track $index) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"elements\"\n      ></app-schema-element>\n    }\n  }\n</div>\n", styles: [":host{display:contents}\n"] }]
        }], propDecorators: { element: [{
                type: Input,
                args: [{ required: true }]
            }], elements: [{
                type: Input,
                args: [{ required: true }]
            }] } });

class CardComponent {
    title = "";
    subtitle = "";
    content = "";
    elevated = false;
    borderRadius = 8;
    padding = 16;
    children = [];
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: CardComponent, isStandalone: true, selector: "app-card", inputs: { title: "title", subtitle: "subtitle", content: "content", elevated: "elevated", borderRadius: "borderRadius", padding: "padding", children: "children" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-card\"\n  class=\"overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--bg-elevated)]\"\n  [class.shadow-md]=\"elevated\"\n  [style.borderRadius.px]=\"borderRadius\"\n>\n  @if (title) {\n    <div class=\"p-4 border-b border-[var(--border-color)]\">\n      <h3 class=\"m-0 text-base font-semibold text-[var(--text-primary)]\">\n        {{ title }}\n      </h3>\n      @if (subtitle) {\n        <p class=\"m-0 mt-1 text-sm text-[var(--text-secondary)]\">\n          {{ subtitle }}\n        </p>\n      }\n    </div>\n  }\n  <div\n    class=\"p-4 text-sm leading-relaxed text-[var(--text-secondary)]\"\n    [style.padding.px]=\"padding\"\n  >\n    @if (content) {\n      {{ content }}\n    }\n    @for (child of children; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"children\"\n      ></app-schema-element>\n    }\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CardComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-card", standalone: true, imports: [CommonModule, SchemaElementComponent, ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-card\"\n  class=\"overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--bg-elevated)]\"\n  [class.shadow-md]=\"elevated\"\n  [style.borderRadius.px]=\"borderRadius\"\n>\n  @if (title) {\n    <div class=\"p-4 border-b border-[var(--border-color)]\">\n      <h3 class=\"m-0 text-base font-semibold text-[var(--text-primary)]\">\n        {{ title }}\n      </h3>\n      @if (subtitle) {\n        <p class=\"m-0 mt-1 text-sm text-[var(--text-secondary)]\">\n          {{ subtitle }}\n        </p>\n      }\n    </div>\n  }\n  <div\n    class=\"p-4 text-sm leading-relaxed text-[var(--text-secondary)]\"\n    [style.padding.px]=\"padding\"\n  >\n    @if (content) {\n      {{ content }}\n    }\n    @for (child of children; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"children\"\n      ></app-schema-element>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { title: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], content: [{
                type: Input
            }], elevated: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], padding: [{
                type: Input
            }], children: [{
                type: Input
            }] } });
registerSchemaComponent("app-card", CardComponent);

class StatsCardComponent {
    label = "";
    value = "";
    unit = "";
    icon = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StatsCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: StatsCardComponent, isStandalone: true, selector: "app-stats-card", inputs: { label: "label", value: "value", unit: "unit", icon: "icon" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-stats-card\"\n  class=\"flex flex-col gap-2 p-6 rounded-xl border bg-[color:var(--bg-elevated)] border-[color:var(--border-color)]\"\n>\n  @if (icon) {\n    <div class=\"text-2xl text-[color:var(--accent)]\">{{ icon }}</div>\n  }\n  <div class=\"text-2xl font-bold leading-none text-[color:var(--text-primary)]\">\n    {{ value }}{{ unit }}\n  </div>\n  @if (label) {\n    <div class=\"text-sm text-[color:var(--text-secondary)]\">{{ label }}</div>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StatsCardComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-stats-card", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-stats-card\"\n  class=\"flex flex-col gap-2 p-6 rounded-xl border bg-[color:var(--bg-elevated)] border-[color:var(--border-color)]\"\n>\n  @if (icon) {\n    <div class=\"text-2xl text-[color:var(--accent)]\">{{ icon }}</div>\n  }\n  <div class=\"text-2xl font-bold leading-none text-[color:var(--text-primary)]\">\n    {{ value }}{{ unit }}\n  </div>\n  @if (label) {\n    <div class=\"text-sm text-[color:var(--text-secondary)]\">{{ label }}</div>\n  }\n</div>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], value: [{
                type: Input
            }], unit: [{
                type: Input
            }], icon: [{
                type: Input
            }] } });
registerSchemaComponent("app-stats-card", StatsCardComponent);

class TableViewComponent {
    columns = "[]";
    data = "[]";
    get parsedColumns() {
        return parseJsonOrDefault(this.columns);
    }
    get parsedData() {
        return parseJsonOrDefault(this.data);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TableViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TableViewComponent, isStandalone: true, selector: "app-table-view", inputs: { columns: "columns", data: "data" }, ngImport: i0, template: "<table appApplyTheme=\"app-table-view\" class=\"w-full border-collapse text-sm\">\n  <thead>\n    <tr>\n      @for (col of parsedColumns; track col.key) {\n        <th\n          class=\"text-left p-3 bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)] font-semibold border-b border-[color:var(--border-color)]\"\n        >\n          {{ col.name }}\n        </th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for (row of parsedData; track row) {\n      <tr class=\"hover:bg-[color:var(--bg-hover)]\">\n        @for (col of parsedColumns; track col.key) {\n          <td\n            class=\"p-3 text-[color:var(--text-primary)] border-b border-[color:var(--border-color)]\"\n          >\n            {{ row[col.key] }}\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TableViewComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-table-view", standalone: true, imports: [ApplyThemeDirective], template: "<table appApplyTheme=\"app-table-view\" class=\"w-full border-collapse text-sm\">\n  <thead>\n    <tr>\n      @for (col of parsedColumns; track col.key) {\n        <th\n          class=\"text-left p-3 bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)] font-semibold border-b border-[color:var(--border-color)]\"\n        >\n          {{ col.name }}\n        </th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for (row of parsedData; track row) {\n      <tr class=\"hover:bg-[color:var(--bg-hover)]\">\n        @for (col of parsedColumns; track col.key) {\n          <td\n            class=\"p-3 text-[color:var(--text-primary)] border-b border-[color:var(--border-color)]\"\n          >\n            {{ row[col.key] }}\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" }]
        }], propDecorators: { columns: [{
                type: Input
            }], data: [{
                type: Input
            }] } });
registerSchemaComponent("app-table-view", TableViewComponent);

class DataTableComponent {
    columns = "[]";
    data = "[]";
    selectable = false;
    rowSelected = new EventEmitter();
    selectedIndex = -1;
    get parsedColumns() {
        return parseJsonOrDefault(this.columns);
    }
    get parsedData() {
        return parseJsonOrDefault(this.data);
    }
    selectRow(index) {
        if (!this.selectable)
            return;
        this.selectedIndex = index;
        this.rowSelected.emit(index);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: DataTableComponent, isStandalone: true, selector: "app-data-table", inputs: { columns: "columns", data: "data", selectable: "selectable" }, outputs: { rowSelected: "rowSelected" }, ngImport: i0, template: "<table appApplyTheme=\"app-data-table\" class=\"w-full border-collapse text-sm\">\n  <thead>\n    <tr>\n      @if (selectable) {\n        <th class=\"w-8\"></th>\n      }\n      @for (col of parsedColumns; track col.key) {\n        <th\n          class=\"text-left p-3 font-semibold border-b bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-color)]\"\n        >\n          {{ col.name }}\n        </th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for (row of parsedData; track row; let idx = $index) {\n      <tr\n        class=\"cursor-default\"\n        [class.cursor-pointer]=\"selectable\"\n        [class.bg-[var(--accent)]]=\"selectedIndex === idx\"\n        [class.text-[var(--text-on-accent)]]=\"selectedIndex === idx\"\n        (click)=\"selectRow(idx)\"\n      >\n        @if (selectable) {\n          <td class=\"p-3 border-b border-[var(--border-color)]\">\n            <span\n              class=\"inline-block w-4 h-4 rounded-full border-2\"\n              [class.border-[var(--text-on-accent)]]=\"selectedIndex === idx\"\n              [class.border-[var(--border-color)]]=\"selectedIndex !== idx\"\n              [class.bg-[var(--text-on-accent)]]=\"selectedIndex === idx\"\n              [class.bg-transparent]=\"selectedIndex !== idx\"\n            ></span>\n          </td>\n        }\n        @for (col of parsedColumns; track col.key) {\n          <td\n            class=\"p-3 border-b text-[var(--text-primary)] border-[var(--border-color)]\"\n          >\n            {{ row[col.key] }}\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DataTableComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-data-table", standalone: true, imports: [ApplyThemeDirective], template: "<table appApplyTheme=\"app-data-table\" class=\"w-full border-collapse text-sm\">\n  <thead>\n    <tr>\n      @if (selectable) {\n        <th class=\"w-8\"></th>\n      }\n      @for (col of parsedColumns; track col.key) {\n        <th\n          class=\"text-left p-3 font-semibold border-b bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-color)]\"\n        >\n          {{ col.name }}\n        </th>\n      }\n    </tr>\n  </thead>\n  <tbody>\n    @for (row of parsedData; track row; let idx = $index) {\n      <tr\n        class=\"cursor-default\"\n        [class.cursor-pointer]=\"selectable\"\n        [class.bg-[var(--accent)]]=\"selectedIndex === idx\"\n        [class.text-[var(--text-on-accent)]]=\"selectedIndex === idx\"\n        (click)=\"selectRow(idx)\"\n      >\n        @if (selectable) {\n          <td class=\"p-3 border-b border-[var(--border-color)]\">\n            <span\n              class=\"inline-block w-4 h-4 rounded-full border-2\"\n              [class.border-[var(--text-on-accent)]]=\"selectedIndex === idx\"\n              [class.border-[var(--border-color)]]=\"selectedIndex !== idx\"\n              [class.bg-[var(--text-on-accent)]]=\"selectedIndex === idx\"\n              [class.bg-transparent]=\"selectedIndex !== idx\"\n            ></span>\n          </td>\n        }\n        @for (col of parsedColumns; track col.key) {\n          <td\n            class=\"p-3 border-b text-[var(--text-primary)] border-[var(--border-color)]\"\n          >\n            {{ row[col.key] }}\n          </td>\n        }\n      </tr>\n    }\n  </tbody>\n</table>\n" }]
        }], propDecorators: { columns: [{
                type: Input
            }], data: [{
                type: Input
            }], selectable: [{
                type: Input
            }], rowSelected: [{
                type: Output
            }] } });
registerSchemaComponent("app-data-table", DataTableComponent);

class JsonViewComponent {
    data = {};
    sanitizer = inject(DomSanitizer);
    get safeHtml() {
        return this.sanitizer.bypassSecurityTrustHtml(this.formattedHtml);
    }
    get formattedHtml() {
        const formatted = JSON.stringify(this.data, null, 2);
        return this.syntaxHighlight(formatted);
    }
    syntaxHighlight(json) {
        return json
            .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span class="json-key">$1</span>:')
            .replace(/"((?:[^"\\]|\\.)*)"/g, '<span class="json-string">"$1"</span>')
            .replace(/\b(-?\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g, '<span class="json-number">$1</span>')
            .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
            .replace(/\bnull\b/g, '<span class="json-null">null</span>');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: JsonViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: JsonViewComponent, isStandalone: true, selector: "app-json-view", inputs: { data: "data" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-json-view\"\n  class=\"text-sm font-mono p-4 rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-x-auto whitespace-pre-wrap break-words\"\n  [innerHTML]=\"safeHtml\"\n></div>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: JsonViewComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-json-view", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-json-view\"\n  class=\"text-sm font-mono p-4 rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-x-auto whitespace-pre-wrap break-words\"\n  [innerHTML]=\"safeHtml\"\n></div>\n" }]
        }], propDecorators: { data: [{
                type: Input
            }] } });
registerSchemaComponent("app-json-view", JsonViewComponent);

class ComponentPaletteComponent {
    categories = "[]";
    searchable = false;
    searchQuery = "";
    collapsedCategories = new Set();
    get parsedCategories() {
        return parseJsonOrDefault(this.categories);
    }
    get filteredCategories() {
        if (!this.searchQuery)
            return this.parsedCategories;
        return this.parsedCategories
            .map((cat) => ({
            ...cat,
            components: cat.components.filter((c) => c.toLowerCase().includes(this.searchQuery.toLowerCase())),
        }))
            .filter((cat) => cat.components.length > 0);
    }
    toggleCategory(name) {
        if (this.collapsedCategories.has(name)) {
            this.collapsedCategories.delete(name);
        }
        else {
            this.collapsedCategories.add(name);
        }
    }
    isCollapsed(name) {
        return this.collapsedCategories.has(name);
    }
    onSearch(e) {
        this.searchQuery = e.target.value;
    }
    onDragStart(e, componentId) {
        e.dataTransfer?.setData("text/plain", JSON.stringify({ type: "component", componentId }));
        if (e.dataTransfer)
            e.dataTransfer.effectAllowed = "copy";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentPaletteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ComponentPaletteComponent, isStandalone: true, selector: "app-component-palette", inputs: { categories: "categories", searchable: "searchable" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-component-palette\"\n  class=\"block h-full overflow-y-auto\"\n  style=\"\n    background-color: var(--bg-elevated);\n    border-right: 1px solid var(--border-color);\n  \"\n>\n  <div class=\"p-4\" style=\"border-bottom: 1px solid var(--border-color)\">\n    <div class=\"text-sm font-semibold mb-3\" style=\"color: var(--text-primary)\">\n      Components\n    </div>\n    @if (searchable) {\n      <input\n        type=\"text\"\n        class=\"w-full px-3 py-2 text-sm border rounded-lg box-border\"\n        style=\"\n          background-color: var(--bg-primary);\n          color: var(--text-primary);\n          border-color: var(--border-color);\n        \"\n        placeholder=\"Search components...\"\n        [value]=\"searchQuery\"\n        (input)=\"onSearch($event)\"\n      />\n    }\n  </div>\n  <div>\n    @for (cat of filteredCategories; track cat.name) {\n      <div style=\"border-bottom: 1px solid var(--border-color)\">\n        <div\n          class=\"flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium\"\n          style=\"color: var(--text-primary)\"\n          (click)=\"toggleCategory(cat.name)\"\n        >\n          <span>{{ cat.name }}</span>\n          <span\n            class=\"text-xs transition-transform duration-200\"\n            [class.rotate-180]=\"!isCollapsed(cat.name)\"\n            style=\"transform: rotate(-90deg)\"\n            >\u25BC</span\n          >\n        </div>\n        @if (!isCollapsed(cat.name)) {\n          <div class=\"px-4 pb-3 flex flex-col gap-1\">\n            @for (comp of cat.components; track comp) {\n              <div\n                class=\"px-3 py-2 rounded text-sm cursor-grab\"\n                style=\"color: var(--text-secondary)\"\n                draggable=\"true\"\n                (dragstart)=\"onDragStart($event, comp)\"\n              >\n                {{ comp }}\n              </div>\n            }\n          </div>\n        }\n      </div>\n    }\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ComponentPaletteComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-component-palette", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-component-palette\"\n  class=\"block h-full overflow-y-auto\"\n  style=\"\n    background-color: var(--bg-elevated);\n    border-right: 1px solid var(--border-color);\n  \"\n>\n  <div class=\"p-4\" style=\"border-bottom: 1px solid var(--border-color)\">\n    <div class=\"text-sm font-semibold mb-3\" style=\"color: var(--text-primary)\">\n      Components\n    </div>\n    @if (searchable) {\n      <input\n        type=\"text\"\n        class=\"w-full px-3 py-2 text-sm border rounded-lg box-border\"\n        style=\"\n          background-color: var(--bg-primary);\n          color: var(--text-primary);\n          border-color: var(--border-color);\n        \"\n        placeholder=\"Search components...\"\n        [value]=\"searchQuery\"\n        (input)=\"onSearch($event)\"\n      />\n    }\n  </div>\n  <div>\n    @for (cat of filteredCategories; track cat.name) {\n      <div style=\"border-bottom: 1px solid var(--border-color)\">\n        <div\n          class=\"flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium\"\n          style=\"color: var(--text-primary)\"\n          (click)=\"toggleCategory(cat.name)\"\n        >\n          <span>{{ cat.name }}</span>\n          <span\n            class=\"text-xs transition-transform duration-200\"\n            [class.rotate-180]=\"!isCollapsed(cat.name)\"\n            style=\"transform: rotate(-90deg)\"\n            >\u25BC</span\n          >\n        </div>\n        @if (!isCollapsed(cat.name)) {\n          <div class=\"px-4 pb-3 flex flex-col gap-1\">\n            @for (comp of cat.components; track comp) {\n              <div\n                class=\"px-3 py-2 rounded text-sm cursor-grab\"\n                style=\"color: var(--text-secondary)\"\n                draggable=\"true\"\n                (dragstart)=\"onDragStart($event, comp)\"\n              >\n                {{ comp }}\n              </div>\n            }\n          </div>\n        }\n      </div>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { categories: [{
                type: Input
            }], searchable: [{
                type: Input
            }] } });
registerSchemaComponent("app-component-palette", ComponentPaletteComponent);

class DesignerCanvasService {
    elements = signal([], ...(ngDevMode ? [{ debugName: "elements" }] : []));
    selectedId = signal(null, ...(ngDevMode ? [{ debugName: "selectedId" }] : []));
    history = signal([], ...(ngDevMode ? [{ debugName: "history" }] : []));
    historyIndex = signal(-1, ...(ngDevMode ? [{ debugName: "historyIndex" }] : []));
    showGrid = signal(false, ...(ngDevMode ? [{ debugName: "showGrid" }] : []));
    zoom = signal(100, ...(ngDevMode ? [{ debugName: "zoom" }] : []));
    gridColumns = 12;
    selectedElement = computed(() => {
        const id = this.selectedId();
        if (!id)
            return null;
        return this.findElementById(id, this.elements());
    }, ...(ngDevMode ? [{ debugName: "selectedElement" }] : []));
    canUndo = computed(() => this.historyIndex() > 0, ...(ngDevMode ? [{ debugName: "canUndo" }] : []));
    canRedo = computed(() => this.historyIndex() < this.history().length - 1, ...(ngDevMode ? [{ debugName: "canRedo" }] : []));
    findElementById(id, els) {
        for (const el of els) {
            if (el.id === id)
                return el;
            if (el.children) {
                const found = this.findElementById(id, el.children);
                if (found)
                    return found;
            }
        }
        return null;
    }
    pushHistory(label) {
        const history = this.history();
        const idx = this.historyIndex();
        const newHistory = history.slice(0, idx + 1);
        newHistory.push({
            elements: JSON.parse(JSON.stringify(this.elements())),
            label,
        });
        this.history.set(newHistory);
        this.historyIndex.set(newHistory.length - 1);
    }
    setElements(els) {
        this.elements.set(els);
        this.pushHistory("Load");
    }
    addElement(componentId, parentId) {
        const newEl = {
            id: `${componentId}-${Date.now()}`,
            componentId,
            gridPosition: { column: 1, row: 1, colSpan: 12, rowSpan: 1 },
            props: {},
        };
        if (parentId) {
            const parent = this.findElementById(parentId, this.elements());
            if (parent) {
                parent.children = [...(parent.children ?? []), newEl];
                this.elements.set([...this.elements()]);
                this.pushHistory(`Add ${componentId} in ${parentId}`);
                return;
            }
        }
        this.elements.set([...this.elements(), newEl]);
        this.pushHistory(`Add ${componentId}`);
    }
    deleteElement(id) {
        const remove = (els) => els.filter((el) => {
            if (el.id === id)
                return false;
            if (el.children)
                el.children = remove(el.children);
            return true;
        });
        this.elements.set(remove(this.elements()));
        if (this.selectedId() === id)
            this.selectedId.set(null);
        this.pushHistory(`Delete ${id}`);
    }
    updateElement(id, patch) {
        const update = (els) => els.some((el) => {
            if (el.id === id) {
                Object.assign(el, patch);
                return true;
            }
            if (el.children)
                return update(el.children);
            return false;
        });
        update(this.elements());
        this.elements.set([...this.elements()]);
        this.pushHistory(`Update ${id}`);
    }
    moveElement(id, toParentId, index) {
        const findAndRemove = (els) => {
            for (let i = 0; i < els.length; i++) {
                if (els[i].id === id)
                    return els.splice(i, 1)[0];
                if (els[i].children) {
                    const found = findAndRemove(els[i].children);
                    if (found)
                        return found;
                }
            }
            return null;
        };
        const el = findAndRemove([...this.elements()]);
        if (!el)
            return;
        const current = [...this.elements()];
        const insertAt = (els) => {
            if (index !== undefined) {
                els.splice(index, 0, el);
            }
            else {
                els.push(el);
            }
        };
        if (toParentId) {
            const parent = this.findElementById(toParentId, current);
            if (parent) {
                parent.children = [...(parent.children ?? [])];
                insertAt(parent.children);
            }
        }
        else {
            insertAt(current);
        }
        this.elements.set(current);
        this.pushHistory(`Move ${id}`);
    }
    selectElement(id) {
        this.selectedId.set(id);
    }
    undo() {
        const idx = this.historyIndex();
        if (idx <= 0)
            return;
        this.historyIndex.set(idx - 1);
        this.elements.set(JSON.parse(JSON.stringify(this.history()[idx - 1].elements)));
    }
    redo() {
        const idx = this.historyIndex();
        if (idx >= this.history().length - 1)
            return;
        this.historyIndex.set(idx + 1);
        this.elements.set(JSON.parse(JSON.stringify(this.history()[idx + 1].elements)));
    }
    toggleGrid() {
        this.showGrid.update((v) => !v);
    }
    setZoom(z) {
        this.zoom.set(Math.max(25, Math.min(200, z)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerCanvasService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerCanvasService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerCanvasService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class CanvasComponent {
    designer = inject(DesignerCanvasService);
    get elements() {
        return this.designer.elements();
    }
    get gridCells() {
        return Array(this.designer.gridColumns * 6).fill(0);
    }
    dropIndicator = null;
    getGridColumn(el) {
        const gp = el.gridPosition;
        if (!gp)
            return "auto";
        return `${gp.column || 1} / span ${gp.colSpan || 1}`;
    }
    getGridRow(el) {
        const gp = el.gridPosition;
        if (!gp)
            return "auto";
        return `${gp.row || 1} / span ${gp.rowSpan || 1}`;
    }
    getIcon(_el) {
        const icons = {
            "app-button": "▣",
            "app-text": "A",
            "app-block": "⊞",
            "app-icon": "◇",
            "app-text-input": "✎",
            "app-translation-output": "📄",
            "app-language-selector": "🌐",
        };
        return icons[_el.componentId] || "⊡";
    }
    deleteElement(e, id) {
        e.stopPropagation();
        this.designer.deleteElement(id);
    }
    editElement(el) {
        this.designer.selectElement(el.id);
    }
    onElementDragStart(e, el) {
        e.dataTransfer?.setData("text/plain", JSON.stringify({ type: "move", id: el.id }));
        if (e.dataTransfer)
            e.dataTransfer.effectAllowed = "move";
    }
    onDragOver(e) {
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = "move";
    }
    onDragLeave() {
        this.dropIndicator = null;
    }
    onElementDragOver(e, el) {
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const index = y > rect.height / 2 ? 1 : 0;
        this.dropIndicator = { parentId: el.id, index, y: 0 };
    }
    onElementDragLeave(_el) {
        if (this.dropIndicator?.parentId === _el.id) {
            this.dropIndicator = null;
        }
    }
    onDrop(e) {
        e.preventDefault();
        const raw = e.dataTransfer?.getData("text/plain");
        if (!raw)
            return;
        try {
            const data = JSON.parse(raw);
            if (data.type === "component") {
                this.designer.addElement(data.componentId, this.dropIndicator?.parentId ?? null);
            }
            else if (data.type === "move" && data.id) {
                this.designer.moveElement(data.id, this.dropIndicator?.parentId ?? null, this.dropIndicator?.index);
            }
        }
        catch {
            /* ignore parse errors */
        }
        this.dropIndicator = null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CanvasComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: CanvasComponent, isStandalone: true, selector: "app-canvas", ngImport: i0, template: "<div\n  appApplyTheme=\"app-canvas\"\n  class=\"min-w-full min-h-full relative grid bg-[var(--bg-primary)]\"\n  [style.--grid-cols]=\"designer.gridColumns.toString()\"\n  [style.zoom]=\"designer.zoom() / 100\"\n  (dragover)=\"onDragOver($event)\"\n  (dragleave)=\"onDragLeave()\"\n  (drop)=\"onDrop($event)\"\n>\n  @if (designer.showGrid()) {\n    <div\n      class=\"absolute inset-0 pointer-events-none grid grid-cols-[repeat(var(--grid-cols),1fr)]\"\n    >\n      @for (cell of gridCells; track cell) {\n        <div\n          class=\"border-r border-b min-h-16 border-[var(--border-color)]\"\n        ></div>\n      }\n    </div>\n  }\n  @if (elements.length > 0) {\n    @for (el of elements; track el.id) {\n      <div\n        class=\"border-2 border-dashed rounded-lg p-2 cursor-move flex items-center gap-2 relative z-10 min-h-12 transition-colors duration-150 bg-[var(--bg-elevated)]\"\n        [ngClass]=\"\n          designer.selectedId() === el.id || dropIndicator?.parentId === el.id\n            ? 'border-[var(--accent)]'\n            : 'border-transparent'\n        \"\n        [class.ring-2]=\"designer.selectedId() === el.id\"\n        [class.drop-target]=\"dropIndicator?.parentId === el.id\"\n        [style.box-shadow]=\"\n          designer.selectedId() === el.id\n            ? '0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent))'\n            : dropIndicator?.parentId === el.id\n              ? 'none'\n              : 'none'\n        \"\n        [style.gridColumn]=\"getGridColumn(el)\"\n        [style.gridRow]=\"getGridRow(el)\"\n        (click)=\"designer.selectElement(el.id)\"\n        (dblclick)=\"editElement(el)\"\n        draggable=\"true\"\n        (dragstart)=\"onElementDragStart($event, el)\"\n        (dragover)=\"onElementDragOver($event, el)\"\n        (dragleave)=\"onElementDragLeave(el)\"\n      >\n        <span class=\"text-sm text-[var(--text-secondary)]\">{{\n          getIcon(el)\n        }}</span>\n        <span class=\"text-sm font-medium text-[var(--text-primary)]\">{{\n          el.componentId\n        }}</span>\n        <span class=\"text-xs font-mono ml-auto text-[var(--text-muted)]\">{{\n          el.id\n        }}</span>\n        <button\n          class=\"w-5 h-5 rounded-full border-0 bg-transparent cursor-pointer text-sm leading-none flex items-center justify-center p-0 opacity-0 transition-opacity duration-150 hover:opacity-100 text-[var(--text-muted)] bg-[var(--error)]\"\n          [style.--tw-text-opacity]=\"'1'\"\n          (click)=\"deleteElement($event, el.id)\"\n          title=\"Delete\"\n        >\n          \u00D7\n        </button>\n        @if (el.children?.length) {\n          <div\n            class=\"text-xs px-1.5 py-0.5 rounded text-[var(--accent)] bg-[color-mix(in_srgb,_var(--accent)_15%,_transparent)]\"\n          >\n            {{ el.children!.length }} children\n          </div>\n        }\n      </div>\n    }\n  } @else {\n    <div\n      class=\"border-2 border-dashed rounded-lg bg-secondary flex items-center justify-center grid-column-1/-1 min-h-[200px] border-[var(--border-color)]\"\n    >\n      <div class=\"text-sm text-[var(--text-muted)]\">Drag components here</div>\n    </div>\n  }\n  @if (dropIndicator && !dropIndicator.parentId) {\n    <div\n      class=\"absolute left-0 right-0 h-0.5 z-20 pointer-events-none bg-[var(--accent)]\"\n      [style.top.px]=\"dropIndicator.y\"\n    ></div>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CanvasComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-canvas", standalone: true, imports: [CommonModule, ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-canvas\"\n  class=\"min-w-full min-h-full relative grid bg-[var(--bg-primary)]\"\n  [style.--grid-cols]=\"designer.gridColumns.toString()\"\n  [style.zoom]=\"designer.zoom() / 100\"\n  (dragover)=\"onDragOver($event)\"\n  (dragleave)=\"onDragLeave()\"\n  (drop)=\"onDrop($event)\"\n>\n  @if (designer.showGrid()) {\n    <div\n      class=\"absolute inset-0 pointer-events-none grid grid-cols-[repeat(var(--grid-cols),1fr)]\"\n    >\n      @for (cell of gridCells; track cell) {\n        <div\n          class=\"border-r border-b min-h-16 border-[var(--border-color)]\"\n        ></div>\n      }\n    </div>\n  }\n  @if (elements.length > 0) {\n    @for (el of elements; track el.id) {\n      <div\n        class=\"border-2 border-dashed rounded-lg p-2 cursor-move flex items-center gap-2 relative z-10 min-h-12 transition-colors duration-150 bg-[var(--bg-elevated)]\"\n        [ngClass]=\"\n          designer.selectedId() === el.id || dropIndicator?.parentId === el.id\n            ? 'border-[var(--accent)]'\n            : 'border-transparent'\n        \"\n        [class.ring-2]=\"designer.selectedId() === el.id\"\n        [class.drop-target]=\"dropIndicator?.parentId === el.id\"\n        [style.box-shadow]=\"\n          designer.selectedId() === el.id\n            ? '0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent))'\n            : dropIndicator?.parentId === el.id\n              ? 'none'\n              : 'none'\n        \"\n        [style.gridColumn]=\"getGridColumn(el)\"\n        [style.gridRow]=\"getGridRow(el)\"\n        (click)=\"designer.selectElement(el.id)\"\n        (dblclick)=\"editElement(el)\"\n        draggable=\"true\"\n        (dragstart)=\"onElementDragStart($event, el)\"\n        (dragover)=\"onElementDragOver($event, el)\"\n        (dragleave)=\"onElementDragLeave(el)\"\n      >\n        <span class=\"text-sm text-[var(--text-secondary)]\">{{\n          getIcon(el)\n        }}</span>\n        <span class=\"text-sm font-medium text-[var(--text-primary)]\">{{\n          el.componentId\n        }}</span>\n        <span class=\"text-xs font-mono ml-auto text-[var(--text-muted)]\">{{\n          el.id\n        }}</span>\n        <button\n          class=\"w-5 h-5 rounded-full border-0 bg-transparent cursor-pointer text-sm leading-none flex items-center justify-center p-0 opacity-0 transition-opacity duration-150 hover:opacity-100 text-[var(--text-muted)] bg-[var(--error)]\"\n          [style.--tw-text-opacity]=\"'1'\"\n          (click)=\"deleteElement($event, el.id)\"\n          title=\"Delete\"\n        >\n          \u00D7\n        </button>\n        @if (el.children?.length) {\n          <div\n            class=\"text-xs px-1.5 py-0.5 rounded text-[var(--accent)] bg-[color-mix(in_srgb,_var(--accent)_15%,_transparent)]\"\n          >\n            {{ el.children!.length }} children\n          </div>\n        }\n      </div>\n    }\n  } @else {\n    <div\n      class=\"border-2 border-dashed rounded-lg bg-secondary flex items-center justify-center grid-column-1/-1 min-h-[200px] border-[var(--border-color)]\"\n    >\n      <div class=\"text-sm text-[var(--text-muted)]\">Drag components here</div>\n    </div>\n  }\n  @if (dropIndicator && !dropIndicator.parentId) {\n    <div\n      class=\"absolute left-0 right-0 h-0.5 z-20 pointer-events-none bg-[var(--accent)]\"\n      [style.top.px]=\"dropIndicator.y\"\n    ></div>\n  }\n</div>\n" }]
        }] });
registerSchemaComponent("app-canvas", CanvasComponent);

class PropertiesPanelComponent {
    designer = inject(DesignerCanvasService);
    activeTab = "props";
    tabs = ["props", "style", "events"];
    tabLabels = {
        props: "Props",
        style: "Style",
        events: "Events",
    };
    availableStates = ["hover", "focus", "disabled"];
    el = computed(() => this.designer.selectedElement(), ...(ngDevMode ? [{ debugName: "el" }] : []));
    get propEntries() {
        const el = this.el();
        if (!el?.props)
            return [];
        return Object.entries(el.props).map(([key, value]) => ({ key, value }));
    }
    asString(value) {
        return value != null ? String(value) : "";
    }
    get styleEntries() {
        const styles = this.el()?.styles?.custom;
        if (!styles)
            return [];
        return Object.entries(styles).map(([key, value]) => ({ key, value }));
    }
    get stateKeys() {
        const states = this.el()?.styles?.states;
        if (!states)
            return [];
        return Object.keys(states);
    }
    getStateRules(state) {
        const el = this.el();
        const states = el?.styles?.states;
        if (!states)
            return [];
        const rules = states[state];
        if (!rules)
            return [];
        return Object.entries(rules).map(([key, value]) => ({
            key,
            value: String(value ?? ""),
        }));
    }
    get eventEntries() {
        const events = this.el()?.events;
        if (!events)
            return [];
        return Object.entries(events).map(([event, handler]) => ({
            event,
            handler,
        }));
    }
    updateField(key, value) {
        const id = this.designer.selectedId();
        if (!id)
            return;
        this.designer.updateElement(id, { [key]: value });
    }
    updateProp(key, value) {
        const id = this.designer.selectedId();
        if (!id)
            return;
        const el = this.designer.selectedElement();
        if (!el)
            return;
        const props = { ...(el.props ?? {}), [key]: value };
        this.designer.updateElement(id, { props });
    }
    addStyle() {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el)
            return;
        const custom = { ...(el.styles?.custom ?? {}), "": "" };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), custom },
        });
    }
    updateStyleKey(index, key) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.custom)
            return;
        const entries = Object.entries(el.styles.custom);
        if (index >= entries.length)
            return;
        const [oldKey, val] = entries[index];
        const newCustom = {};
        for (const [k, v] of Object.entries(el.styles.custom)) {
            newCustom[k === oldKey ? key : k] = k === oldKey ? val : v;
        }
        if (oldKey !== key)
            delete newCustom[oldKey];
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), custom: newCustom },
        });
    }
    updateStyleVal(index, value) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.custom)
            return;
        const entries = Object.entries(el.styles.custom);
        if (index >= entries.length)
            return;
        const [key] = entries[index];
        const newCustom = { ...el.styles.custom, [key]: value };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), custom: newCustom },
        });
    }
    removeStyle(index) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.custom)
            return;
        const entries = Object.entries(el.styles.custom);
        if (index >= entries.length)
            return;
        const [key] = entries[index];
        const newCustom = { ...el.styles.custom };
        delete newCustom[key];
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), custom: newCustom },
        });
    }
    addState(state) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el)
            return;
        const states = { ...(el.styles?.states ?? {}), [state]: {} };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), states },
        });
    }
    addStateRule(state) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.states)
            return;
        const stateRules = {
            ...el.styles.states[state],
            "": "",
        };
        const states = { ...el.styles.states, [state]: stateRules };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), states },
        });
    }
    updateStateRule(state, index, target, value) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.states)
            return;
        const stateKey = state;
        const rules = el.styles.states[stateKey];
        if (!rules)
            return;
        const entries = Object.entries(rules);
        if (index >= entries.length)
            return;
        const [oldKey, oldVal] = entries[index];
        const newRules = {};
        for (const [k, v] of Object.entries(rules)) {
            if (target === "key") {
                newRules[k === oldKey ? value : k] = k === oldKey ? oldVal : v;
            }
            else {
                newRules[k === oldKey ? k : k] = k === oldKey ? value : v;
            }
        }
        if (target === "key" && oldKey !== value)
            delete newRules[oldKey];
        const states = { ...el.styles.states, [stateKey]: newRules };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), states },
        });
    }
    removeStateRule(state, index) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.styles?.states)
            return;
        const stateKey = state;
        const rules = el.styles.states[stateKey];
        if (!rules)
            return;
        const entries = Object.entries(rules);
        if (index >= entries.length)
            return;
        const [key] = entries[index];
        const newRules = { ...rules };
        delete newRules[key];
        const states = { ...el.styles.states, [stateKey]: newRules };
        this.designer.updateElement(id, {
            styles: { ...(el.styles ?? {}), states },
        });
    }
    addEvent() {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el)
            return;
        const events = { ...(el.events ?? {}), "": "" };
        this.designer.updateElement(id, { events });
    }
    updateEventName(index, event) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.events)
            return;
        const entries = Object.entries(el.events);
        if (index >= entries.length)
            return;
        const [oldEvent, handler] = entries[index];
        const newEvents = {};
        for (const [k, v] of Object.entries(el.events)) {
            newEvents[k === oldEvent ? event : k] = k === oldEvent ? handler : v;
        }
        if (oldEvent !== event)
            delete newEvents[oldEvent];
        this.designer.updateElement(id, { events: newEvents });
    }
    updateEventHandler(index, handler) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.events)
            return;
        const entries = Object.entries(el.events);
        if (index >= entries.length)
            return;
        const [event] = entries[index];
        const newEvents = { ...el.events, [event]: handler };
        this.designer.updateElement(id, { events: newEvents });
    }
    removeEvent(index) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el?.events)
            return;
        const entries = Object.entries(el.events);
        if (index >= entries.length)
            return;
        const [event] = entries[index];
        const newEvents = { ...el.events };
        delete newEvents[event];
        this.designer.updateElement(id, { events: newEvents });
    }
    updateBind(key, value) {
        const id = this.designer.selectedId();
        const el = this.designer.selectedElement();
        if (!id || !el)
            return;
        const bind = { ...(el.bind ?? {}), [key]: value };
        this.designer.updateElement(id, { bind });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PropertiesPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: PropertiesPanelComponent, isStandalone: true, selector: "app-properties-panel", ngImport: i0, template: "<div\n  appApplyTheme=\"app-properties-panel\"\n  class=\"block h-full overflow-y-auto bg-[var(--bg-elevated)] border-l border-[var(--border-color)] text-[13px]\"\n>\n  <div class=\"p-4 border-b border-[var(--border-color)]\">\n    <div class=\"text-sm font-semibold text-[var(--text-primary)]\">\n      Properties\n    </div>\n    @if (el(); as el) {\n      <div class=\"text-[11px] mt-1 font-mono text-[var(--text-muted)]\">\n        {{ el.id }}\n      </div>\n    }\n  </div>\n\n  <div class=\"flex border-b border-[var(--border-color)]\">\n    @for (tab of tabs; track tab) {\n      <button\n        class=\"flex-1 py-2 px-2 border-none bg-transparent cursor-pointer text-xs font-medium transition-all duration-150\"\n        [class.text-[var(--accent)]]=\"activeTab === tab\"\n        [class.text-[var(--text-secondary)]]=\"activeTab !== tab\"\n        [class.font-semibold]=\"activeTab === tab\"\n        [class.border-b-2]=\"activeTab === tab\"\n        [class.border-b-transparent]=\"activeTab !== tab\"\n        (click)=\"activeTab = tab\"\n      >\n        {{ tabLabels[tab] }}\n      </button>\n    }\n  </div>\n\n  @if (el(); as el) {\n    <div class=\"p-3\">\n      @switch (activeTab) {\n        @case (\"props\") {\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              Component\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >Type</label\n              >\n              <input\n                [value]=\"el.componentId\"\n                readonly\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >ID</label\n              >\n              <input\n                [value]=\"el.id\"\n                (input)=\"updateField('id', $any($event.target).value)\"\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >Classes</label\n              >\n              <input\n                [value]=\"el.classes || ''\"\n                (input)=\"updateField('classes', $any($event.target).value)\"\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n            @for (prop of propEntries; track prop.key) {\n              <div class=\"flex flex-col gap-1 mb-2\">\n                <label\n                  class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                  >{{ prop.key }}</label\n                >\n                <input\n                  [value]=\"'' + (prop.value ?? '')\"\n                  (input)=\"updateProp(prop.key, $any($event.target).value)\"\n                  class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n                />\n              </div>\n            }\n          </div>\n        }\n        @case (\"style\") {\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              Inline Styles\n            </div>\n            <div class=\"text-[11px] mb-2 text-[var(--text-muted)]\">\n              CSS custom properties and inline styles\n            </div>\n            @for (style of styleEntries; track $index) {\n              <div class=\"flex gap-1.5 mb-1.5 items-center\">\n                <input\n                  class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                  [value]=\"style.key\"\n                  placeholder=\"property\"\n                  (input)=\"updateStyleKey($index, $any($event.target).value)\"\n                />\n                <input\n                  class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                  [value]=\"style.value\"\n                  placeholder=\"value\"\n                  (input)=\"updateStyleVal($index, $any($event.target).value)\"\n                />\n                <button\n                  class=\"w-5 h-5 rounded-full border-none bg-transparent flex items-center justify-center p-0 flex-shrink-0 text-sm text-[var(--text-muted)] cursor-pointer\"\n                  (click)=\"removeStyle($index)\"\n                >\n                  \u00D7\n                </button>\n              </div>\n            }\n            <button\n              class=\"py-1 px-2 border border-dashed rounded w-full text-xs transition-all duration-150 border-[var(--border-color)] text-[var(--accent)] cursor-pointer\"\n              (click)=\"addStyle()\"\n            >\n              + Add style\n            </button>\n          </div>\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              States\n            </div>\n            @for (state of stateKeys; track state) {\n              <div class=\"p-2 rounded-md mb-3 bg-[var(--bg-primary)]\">\n                <label\n                  class=\"text-[11px] font-semibold uppercase mb-1.5 block text-[var(--accent)]\"\n                  >{{ state }}</label\n                >\n                @for (rule of getStateRules(state); track $index) {\n                  <div class=\"flex gap-1.5 mb-1.5 items-center\">\n                    <input\n                      class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                      [value]=\"rule.key\"\n                      placeholder=\"property\"\n                      (input)=\"\n                        updateStateRule(\n                          state,\n                          $index,\n                          'key',\n                          $any($event.target).value\n                        )\n                      \"\n                    />\n                    <input\n                      class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                      [value]=\"rule.value\"\n                      placeholder=\"value\"\n                      (input)=\"\n                        updateStateRule(\n                          state,\n                          $index,\n                          'val',\n                          $any($event.target).value\n                        )\n                      \"\n                    />\n                    <button\n                      class=\"w-5 h-5 rounded-full border-none bg-transparent flex items-center justify-center p-0 flex-shrink-0 text-sm text-[var(--text-muted)] cursor-pointer\"\n                      (click)=\"removeStateRule(state, $index)\"\n                    >\n                      \u00D7\n                    </button>\n                  </div>\n                }\n                <button\n                  class=\"py-1 px-2 border border-dashed rounded text-xs border-[var(--border-color)] text-[var(--text-secondary)] cursor-pointer\"\n                  (click)=\"addStateRule(state)\"\n                >\n                  + Add rule\n                </button>\n              </div>\n            }\n            <div class=\"flex gap-1.5 flex-wrap\">\n              @for (s of availableStates; track s) {\n                @if (!stateKeys.includes(s)) {\n                  <button\n                    class=\"py-1 px-2 border border-dashed rounded text-xs border-[var(--border-color)] text-[var(--text-secondary)] cursor-pointer\"\n                    (click)=\"addState(s)\"\n                  >\n                    + {{ s }}\n                  </button>\n                }\n              }\n            </div>\n          </div>\n        }\n        @case (\"events\") {\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              Event Handlers\n            </div>\n            <div class=\"text-[11px] mb-2 text-[var(--text-muted)]\">\n              Map component @Output() events to schema handlers\n            </div>\n            @for (evt of eventEntries; track $index) {\n              <div class=\"flex gap-1.5 mb-1.5 items-center\">\n                <input\n                  class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                  [value]=\"evt.event\"\n                  placeholder=\"event name\"\n                  (input)=\"updateEventName($index, $any($event.target).value)\"\n                />\n                <input\n                  class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                  [value]=\"evt.handler\"\n                  placeholder=\"handler name\"\n                  (input)=\"\n                    updateEventHandler($index, $any($event.target).value)\n                  \"\n                />\n                <button\n                  class=\"w-5 h-5 rounded-full border-none bg-transparent flex items-center justify-center p-0 flex-shrink-0 text-sm text-[var(--text-muted)] cursor-pointer\"\n                  (click)=\"removeEvent($index)\"\n                >\n                  \u00D7\n                </button>\n              </div>\n            }\n            <button\n              class=\"py-1 px-2 border border-dashed rounded w-full text-xs transition-all duration-150 border-[var(--border-color)] text-[var(--accent)] cursor-pointer\"\n              (click)=\"addEvent()\"\n            >\n              + Add handler\n            </button>\n          </div>\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              Data Binding\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >Store</label\n              >\n              <input\n                [value]=\"el.bind?.store || ''\"\n                (input)=\"updateBind('store', $any($event.target).value)\"\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >Field</label\n              >\n              <input\n                [value]=\"el.bind?.field || ''\"\n                (input)=\"updateBind('field', $any($event.target).value)\"\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n          </div>\n        }\n      }\n    </div>\n  } @else {\n    <div class=\"p-8 text-center text-sm text-[var(--text-muted)]\">\n      No element selected\n    </div>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PropertiesPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-properties-panel", standalone: true, imports: [CommonModule, ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-properties-panel\"\n  class=\"block h-full overflow-y-auto bg-[var(--bg-elevated)] border-l border-[var(--border-color)] text-[13px]\"\n>\n  <div class=\"p-4 border-b border-[var(--border-color)]\">\n    <div class=\"text-sm font-semibold text-[var(--text-primary)]\">\n      Properties\n    </div>\n    @if (el(); as el) {\n      <div class=\"text-[11px] mt-1 font-mono text-[var(--text-muted)]\">\n        {{ el.id }}\n      </div>\n    }\n  </div>\n\n  <div class=\"flex border-b border-[var(--border-color)]\">\n    @for (tab of tabs; track tab) {\n      <button\n        class=\"flex-1 py-2 px-2 border-none bg-transparent cursor-pointer text-xs font-medium transition-all duration-150\"\n        [class.text-[var(--accent)]]=\"activeTab === tab\"\n        [class.text-[var(--text-secondary)]]=\"activeTab !== tab\"\n        [class.font-semibold]=\"activeTab === tab\"\n        [class.border-b-2]=\"activeTab === tab\"\n        [class.border-b-transparent]=\"activeTab !== tab\"\n        (click)=\"activeTab = tab\"\n      >\n        {{ tabLabels[tab] }}\n      </button>\n    }\n  </div>\n\n  @if (el(); as el) {\n    <div class=\"p-3\">\n      @switch (activeTab) {\n        @case (\"props\") {\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              Component\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >Type</label\n              >\n              <input\n                [value]=\"el.componentId\"\n                readonly\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >ID</label\n              >\n              <input\n                [value]=\"el.id\"\n                (input)=\"updateField('id', $any($event.target).value)\"\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >Classes</label\n              >\n              <input\n                [value]=\"el.classes || ''\"\n                (input)=\"updateField('classes', $any($event.target).value)\"\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n            @for (prop of propEntries; track prop.key) {\n              <div class=\"flex flex-col gap-1 mb-2\">\n                <label\n                  class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                  >{{ prop.key }}</label\n                >\n                <input\n                  [value]=\"'' + (prop.value ?? '')\"\n                  (input)=\"updateProp(prop.key, $any($event.target).value)\"\n                  class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n                />\n              </div>\n            }\n          </div>\n        }\n        @case (\"style\") {\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              Inline Styles\n            </div>\n            <div class=\"text-[11px] mb-2 text-[var(--text-muted)]\">\n              CSS custom properties and inline styles\n            </div>\n            @for (style of styleEntries; track $index) {\n              <div class=\"flex gap-1.5 mb-1.5 items-center\">\n                <input\n                  class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                  [value]=\"style.key\"\n                  placeholder=\"property\"\n                  (input)=\"updateStyleKey($index, $any($event.target).value)\"\n                />\n                <input\n                  class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                  [value]=\"style.value\"\n                  placeholder=\"value\"\n                  (input)=\"updateStyleVal($index, $any($event.target).value)\"\n                />\n                <button\n                  class=\"w-5 h-5 rounded-full border-none bg-transparent flex items-center justify-center p-0 flex-shrink-0 text-sm text-[var(--text-muted)] cursor-pointer\"\n                  (click)=\"removeStyle($index)\"\n                >\n                  \u00D7\n                </button>\n              </div>\n            }\n            <button\n              class=\"py-1 px-2 border border-dashed rounded w-full text-xs transition-all duration-150 border-[var(--border-color)] text-[var(--accent)] cursor-pointer\"\n              (click)=\"addStyle()\"\n            >\n              + Add style\n            </button>\n          </div>\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              States\n            </div>\n            @for (state of stateKeys; track state) {\n              <div class=\"p-2 rounded-md mb-3 bg-[var(--bg-primary)]\">\n                <label\n                  class=\"text-[11px] font-semibold uppercase mb-1.5 block text-[var(--accent)]\"\n                  >{{ state }}</label\n                >\n                @for (rule of getStateRules(state); track $index) {\n                  <div class=\"flex gap-1.5 mb-1.5 items-center\">\n                    <input\n                      class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                      [value]=\"rule.key\"\n                      placeholder=\"property\"\n                      (input)=\"\n                        updateStateRule(\n                          state,\n                          $index,\n                          'key',\n                          $any($event.target).value\n                        )\n                      \"\n                    />\n                    <input\n                      class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                      [value]=\"rule.value\"\n                      placeholder=\"value\"\n                      (input)=\"\n                        updateStateRule(\n                          state,\n                          $index,\n                          'val',\n                          $any($event.target).value\n                        )\n                      \"\n                    />\n                    <button\n                      class=\"w-5 h-5 rounded-full border-none bg-transparent flex items-center justify-center p-0 flex-shrink-0 text-sm text-[var(--text-muted)] cursor-pointer\"\n                      (click)=\"removeStateRule(state, $index)\"\n                    >\n                      \u00D7\n                    </button>\n                  </div>\n                }\n                <button\n                  class=\"py-1 px-2 border border-dashed rounded text-xs border-[var(--border-color)] text-[var(--text-secondary)] cursor-pointer\"\n                  (click)=\"addStateRule(state)\"\n                >\n                  + Add rule\n                </button>\n              </div>\n            }\n            <div class=\"flex gap-1.5 flex-wrap\">\n              @for (s of availableStates; track s) {\n                @if (!stateKeys.includes(s)) {\n                  <button\n                    class=\"py-1 px-2 border border-dashed rounded text-xs border-[var(--border-color)] text-[var(--text-secondary)] cursor-pointer\"\n                    (click)=\"addState(s)\"\n                  >\n                    + {{ s }}\n                  </button>\n                }\n              }\n            </div>\n          </div>\n        }\n        @case (\"events\") {\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              Event Handlers\n            </div>\n            <div class=\"text-[11px] mb-2 text-[var(--text-muted)]\">\n              Map component @Output() events to schema handlers\n            </div>\n            @for (evt of eventEntries; track $index) {\n              <div class=\"flex gap-1.5 mb-1.5 items-center\">\n                <input\n                  class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                  [value]=\"evt.event\"\n                  placeholder=\"event name\"\n                  (input)=\"updateEventName($index, $any($event.target).value)\"\n                />\n                <input\n                  class=\"flex-1 px-1 py-1 border rounded text-xs bg-transparent min-w-0 border-[var(--border-color)] text-[var(--text-primary)]\"\n                  [value]=\"evt.handler\"\n                  placeholder=\"handler name\"\n                  (input)=\"\n                    updateEventHandler($index, $any($event.target).value)\n                  \"\n                />\n                <button\n                  class=\"w-5 h-5 rounded-full border-none bg-transparent flex items-center justify-center p-0 flex-shrink-0 text-sm text-[var(--text-muted)] cursor-pointer\"\n                  (click)=\"removeEvent($index)\"\n                >\n                  \u00D7\n                </button>\n              </div>\n            }\n            <button\n              class=\"py-1 px-2 border border-dashed rounded w-full text-xs transition-all duration-150 border-[var(--border-color)] text-[var(--accent)] cursor-pointer\"\n              (click)=\"addEvent()\"\n            >\n              + Add handler\n            </button>\n          </div>\n          <div class=\"pb-4 mb-4 border-b border-[var(--border-color)]\">\n            <div\n              class=\"text-[11px] font-semibold uppercase tracking-wide mb-2 text-[var(--text-secondary)]\"\n            >\n              Data Binding\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >Store</label\n              >\n              <input\n                [value]=\"el.bind?.store || ''\"\n                (input)=\"updateBind('store', $any($event.target).value)\"\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n            <div class=\"flex flex-col gap-1 mb-2\">\n              <label\n                class=\"text-[11px] font-medium text-[var(--text-secondary)]\"\n                >Field</label\n              >\n              <input\n                [value]=\"el.bind?.field || ''\"\n                (input)=\"updateBind('field', $any($event.target).value)\"\n                class=\"px-[6px] py-1.5 border rounded-md text-sm bg-transparent border-[var(--border-color)] text-[var(--text-primary)]\"\n              />\n            </div>\n          </div>\n        }\n      }\n    </div>\n  } @else {\n    <div class=\"p-8 text-center text-sm text-[var(--text-muted)]\">\n      No element selected\n    </div>\n  }\n</div>\n" }]
        }] });
registerSchemaComponent("app-properties-panel", PropertiesPanelComponent);

class BottomPanelComponent {
    tabs = "[]";
    activeTab = "";
    position = "bottom";
    fullWidth = false;
    floating = false;
    borderRadius = 0;
    tabChange = new EventEmitter();
    get parsedTabs() {
        return parseJsonOrDefault(this.tabs);
    }
    handleTabClick(tabId) {
        this.activeTab = tabId;
        this.tabChange.emit(tabId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BottomPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: BottomPanelComponent, isStandalone: true, selector: "app-bottom-panel", inputs: { tabs: "tabs", activeTab: "activeTab", position: "position", fullWidth: "fullWidth", floating: "floating", borderRadius: "borderRadius" }, outputs: { tabChange: "tabChange" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-bottom-panel\"\n  class=\"flex flex-col h-full border-t bg-[var(--bg-elevated)] border-[var(--border-color)]\"\n>\n  <div class=\"flex gap-0 pb-px border-b border-[var(--border-color)]\">\n    @for (tab of parsedTabs; track tab.id) {\n      <div\n        class=\"px-4 py-3 text-sm font-medium cursor-pointer border-b-2 -mb-px transition-all duration-150\"\n        [class.text-[var(--accent)]]]=\"activeTab === tab.id\"\n        [class.text-[var(--text-secondary)]]]=\"activeTab !== tab.id\"\n        [class.border-b-[var(--accent)]]]=\"activeTab === tab.id\"\n        [class.border-b-transparent]=\"activeTab !== tab.id\"\n        (click)=\"handleTabClick(tab.id)\"\n      >\n        {{ tab.label }}\n      </div>\n    }\n  </div>\n  <div class=\"flex-1 overflow-auto p-4\">\n    <ng-content></ng-content>\n    @if (!parsedTabs.length) {\n      <div class=\"text-center text-sm text-[var(--text-muted)] py-8\">\n        No tabs available\n      </div>\n    }\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BottomPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-bottom-panel", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-bottom-panel\"\n  class=\"flex flex-col h-full border-t bg-[var(--bg-elevated)] border-[var(--border-color)]\"\n>\n  <div class=\"flex gap-0 pb-px border-b border-[var(--border-color)]\">\n    @for (tab of parsedTabs; track tab.id) {\n      <div\n        class=\"px-4 py-3 text-sm font-medium cursor-pointer border-b-2 -mb-px transition-all duration-150\"\n        [class.text-[var(--accent)]]]=\"activeTab === tab.id\"\n        [class.text-[var(--text-secondary)]]]=\"activeTab !== tab.id\"\n        [class.border-b-[var(--accent)]]]=\"activeTab === tab.id\"\n        [class.border-b-transparent]=\"activeTab !== tab.id\"\n        (click)=\"handleTabClick(tab.id)\"\n      >\n        {{ tab.label }}\n      </div>\n    }\n  </div>\n  <div class=\"flex-1 overflow-auto p-4\">\n    <ng-content></ng-content>\n    @if (!parsedTabs.length) {\n      <div class=\"text-center text-sm text-[var(--text-muted)] py-8\">\n        No tabs available\n      </div>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { tabs: [{
                type: Input
            }], activeTab: [{
                type: Input
            }], position: [{
                type: Input
            }], fullWidth: [{
                type: Input
            }], floating: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], tabChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-bottom-panel", BottomPanelComponent);

class HeaderComponent {
    title = "";
    subtitle = "";
    icon = "";
    showBack = false;
    breadcrumbs = "[]";
    navigateBack = new EventEmitter();
    get parsedBreadcrumbs() {
        return parseJsonOrDefault(this.breadcrumbs);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: HeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: HeaderComponent, isStandalone: true, selector: "app-header", inputs: { title: "title", subtitle: "subtitle", icon: "icon", showBack: "showBack", breadcrumbs: "breadcrumbs" }, outputs: { navigateBack: "navigateBack" }, ngImport: i0, template: "<header\n  appApplyTheme=\"app-header\"\n  class=\"flex items-center gap-4 p-4 border-b min-h-[56px] border-[var(--border-color)]\"\n  [style.background]=\"'var(--bg-header, var(--bg-elevated))'\"\n>\n  @if (showBack) {\n    <button\n      class=\"flex items-center justify-center w-9 h-9 rounded-lg border p-0 text-xl transition-all cursor-pointer hover:bg-[var(--bg-hover)] bg-[var(--bg-elevated)] border-[var(--border-color)] text-[var(--text-primary)]\"\n      (click)=\"navigateBack.emit()\"\n      aria-label=\"Back\"\n    >\n      &larr;\n    </button>\n  }\n  <div class=\"flex-1 flex flex-col gap-1\">\n    <h1 class=\"m-0 text-xl font-semibold text-[var(--text-primary)]\">\n      {{ title }}\n    </h1>\n    @if (parsedBreadcrumbs.length) {\n      <div class=\"flex items-center gap-2 text-sm text-[var(--text-secondary)]\">\n        @for (crumb of parsedBreadcrumbs; track crumb.label; let last = $last) {\n          @if (!last && crumb.href) {\n            <a [href]=\"crumb.href\">{{ crumb.label }}</a>\n          } @else {\n            <span>{{ crumb.label }}</span>\n          }\n          @if (!last) {\n            <span class=\"opacity-50\">/</span>\n          }\n        }\n      </div>\n    }\n  </div>\n  <ng-content></ng-content>\n</header>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-header", standalone: true, imports: [ApplyThemeDirective], template: "<header\n  appApplyTheme=\"app-header\"\n  class=\"flex items-center gap-4 p-4 border-b min-h-[56px] border-[var(--border-color)]\"\n  [style.background]=\"'var(--bg-header, var(--bg-elevated))'\"\n>\n  @if (showBack) {\n    <button\n      class=\"flex items-center justify-center w-9 h-9 rounded-lg border p-0 text-xl transition-all cursor-pointer hover:bg-[var(--bg-hover)] bg-[var(--bg-elevated)] border-[var(--border-color)] text-[var(--text-primary)]\"\n      (click)=\"navigateBack.emit()\"\n      aria-label=\"Back\"\n    >\n      &larr;\n    </button>\n  }\n  <div class=\"flex-1 flex flex-col gap-1\">\n    <h1 class=\"m-0 text-xl font-semibold text-[var(--text-primary)]\">\n      {{ title }}\n    </h1>\n    @if (parsedBreadcrumbs.length) {\n      <div class=\"flex items-center gap-2 text-sm text-[var(--text-secondary)]\">\n        @for (crumb of parsedBreadcrumbs; track crumb.label; let last = $last) {\n          @if (!last && crumb.href) {\n            <a [href]=\"crumb.href\">{{ crumb.label }}</a>\n          } @else {\n            <span>{{ crumb.label }}</span>\n          }\n          @if (!last) {\n            <span class=\"opacity-50\">/</span>\n          }\n        }\n      </div>\n    }\n  </div>\n  <ng-content></ng-content>\n</header>\n" }]
        }], propDecorators: { title: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], icon: [{
                type: Input
            }], showBack: [{
                type: Input
            }], breadcrumbs: [{
                type: Input
            }], navigateBack: [{
                type: Output
            }] } });
registerSchemaComponent("app-header", HeaderComponent);

class SidebarComponent {
    collapsed = false;
    items = "[]";
    width = 240;
    collapsedWidth = 64;
    collapseChanged = new EventEmitter();
    itemClicked = new EventEmitter();
    get parsedItems() {
        return parseJsonOrDefault(this.items);
    }
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.collapseChanged.emit({ collapsed: this.collapsed });
    }
    handleItemClick(item) {
        this.itemClicked.emit(item);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SidebarComponent, isStandalone: true, selector: "app-sidebar", inputs: { collapsed: "collapsed", items: "items", width: "width", collapsedWidth: "collapsedWidth" }, outputs: { collapseChanged: "collapseChanged", itemClicked: "itemClicked" }, ngImport: i0, template: "<aside\n  appApplyTheme=\"app-sidebar\"\n  class=\"flex flex-col h-full border-r transition-[width,min-width] duration-200 overflow-hidden bg-[var(--bg-elevated)] border-[var(--border-color)]\"\n  [class.w-16]=\"collapsed\"\n  [class.min-w-16]=\"collapsed\"\n  [style.width.px]=\"width\"\n  [style.min-width.px]=\"width\"\n>\n  <div\n    class=\"flex items-center justify-between px-4 py-3 border-b min-h-14 border-[var(--border-color)]\"\n  >\n    <button\n      class=\"flex items-center justify-center w-8 h-8 border rounded-lg bg-transparent cursor-pointer text-xl transition-all duration-150 p-0 border-[var(--border-color)] text-[var(--text-secondary)]\"\n      (click)=\"toggleCollapse()\"\n      aria-label=\"Toggle sidebar\"\n    >\n      {{ collapsed ? \"\u2192\" : \"\u2190\" }}\n    </button>\n  </div>\n  <nav class=\"flex-1 overflow-y-auto overflow-x-hidden p-2\">\n    <ul class=\"list-none m-0 p-0\">\n      @for (item of parsedItems; track item.label) {\n        <li class=\"m-0\">\n          <div\n            class=\"flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 whitespace-nowrap overflow-hidden text-[var(--text-secondary)]\"\n            (click)=\"handleItemClick(item)\"\n          >\n            @if (item.icon) {\n              <span\n                class=\"flex items-center justify-center w-5 h-5 text-xl flex-shrink-0\"\n                >{{ item.icon }}</span\n              >\n            }\n            <span class=\"flex-1 overflow-hidden text-ellipsis\">{{\n              item.label\n            }}</span>\n          </div>\n          @if (item.children?.length) {\n            <ul class=\"ml-5 border-l pl-2\">\n              @for (child of item.children; track child.label) {\n                <li>\n                  <div\n                    class=\"flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 whitespace-nowrap overflow-hidden text-[var(--text-secondary)]\"\n                    (click)=\"handleItemClick(child)\"\n                  >\n                    @if (child.icon) {\n                      <span\n                        class=\"flex items-center justify-center w-5 h-5 text-xl flex-shrink-0\"\n                        >{{ child.icon }}</span\n                      >\n                    }\n                    <span class=\"flex-1 overflow-hidden text-ellipsis\">{{\n                      child.label\n                    }}</span>\n                  </div>\n                </li>\n              }\n            </ul>\n          }\n        </li>\n      }\n    </ul>\n  </nav>\n  <ng-content></ng-content>\n</aside>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-sidebar", standalone: true, imports: [ApplyThemeDirective], template: "<aside\n  appApplyTheme=\"app-sidebar\"\n  class=\"flex flex-col h-full border-r transition-[width,min-width] duration-200 overflow-hidden bg-[var(--bg-elevated)] border-[var(--border-color)]\"\n  [class.w-16]=\"collapsed\"\n  [class.min-w-16]=\"collapsed\"\n  [style.width.px]=\"width\"\n  [style.min-width.px]=\"width\"\n>\n  <div\n    class=\"flex items-center justify-between px-4 py-3 border-b min-h-14 border-[var(--border-color)]\"\n  >\n    <button\n      class=\"flex items-center justify-center w-8 h-8 border rounded-lg bg-transparent cursor-pointer text-xl transition-all duration-150 p-0 border-[var(--border-color)] text-[var(--text-secondary)]\"\n      (click)=\"toggleCollapse()\"\n      aria-label=\"Toggle sidebar\"\n    >\n      {{ collapsed ? \"\u2192\" : \"\u2190\" }}\n    </button>\n  </div>\n  <nav class=\"flex-1 overflow-y-auto overflow-x-hidden p-2\">\n    <ul class=\"list-none m-0 p-0\">\n      @for (item of parsedItems; track item.label) {\n        <li class=\"m-0\">\n          <div\n            class=\"flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 whitespace-nowrap overflow-hidden text-[var(--text-secondary)]\"\n            (click)=\"handleItemClick(item)\"\n          >\n            @if (item.icon) {\n              <span\n                class=\"flex items-center justify-center w-5 h-5 text-xl flex-shrink-0\"\n                >{{ item.icon }}</span\n              >\n            }\n            <span class=\"flex-1 overflow-hidden text-ellipsis\">{{\n              item.label\n            }}</span>\n          </div>\n          @if (item.children?.length) {\n            <ul class=\"ml-5 border-l pl-2\">\n              @for (child of item.children; track child.label) {\n                <li>\n                  <div\n                    class=\"flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 whitespace-nowrap overflow-hidden text-[var(--text-secondary)]\"\n                    (click)=\"handleItemClick(child)\"\n                  >\n                    @if (child.icon) {\n                      <span\n                        class=\"flex items-center justify-center w-5 h-5 text-xl flex-shrink-0\"\n                        >{{ child.icon }}</span\n                      >\n                    }\n                    <span class=\"flex-1 overflow-hidden text-ellipsis\">{{\n                      child.label\n                    }}</span>\n                  </div>\n                </li>\n              }\n            </ul>\n          }\n        </li>\n      }\n    </ul>\n  </nav>\n  <ng-content></ng-content>\n</aside>\n" }]
        }], propDecorators: { collapsed: [{
                type: Input
            }], items: [{
                type: Input
            }], width: [{
                type: Input
            }], collapsedWidth: [{
                type: Input
            }], collapseChanged: [{
                type: Output
            }], itemClicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-sidebar", SidebarComponent);

class FooterComponent {
    text = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: FooterComponent, isStandalone: true, selector: "app-footer", inputs: { text: "text" }, ngImport: i0, template: "<footer\n  appApplyTheme=\"app-footer\"\n  class=\"flex items-center justify-center px-4 py-4 min-h-[48px] border-t border-[var(--border-color)] bg-[var(--bg-elevated)]\"\n>\n  @if (text) {\n    <p class=\"text-sm text-center m-0 text-[var(--text-secondary)]\">\n      {{ text }}\n    </p>\n  }\n  <ng-content></ng-content>\n</footer>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FooterComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-footer", standalone: true, imports: [ApplyThemeDirective], template: "<footer\n  appApplyTheme=\"app-footer\"\n  class=\"flex items-center justify-center px-4 py-4 min-h-[48px] border-t border-[var(--border-color)] bg-[var(--bg-elevated)]\"\n>\n  @if (text) {\n    <p class=\"text-sm text-center m-0 text-[var(--text-secondary)]\">\n      {{ text }}\n    </p>\n  }\n  <ng-content></ng-content>\n</footer>\n" }]
        }], propDecorators: { text: [{
                type: Input
            }] } });
registerSchemaComponent("app-footer", FooterComponent);

class PageContainerComponent {
    title = "";
    padding = 24;
    maxWidth = 0;
    width = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PageContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: PageContainerComponent, isStandalone: true, selector: "app-page-container", inputs: { title: "title", padding: "padding", maxWidth: "maxWidth", width: "width" }, ngImport: i0, template: "@if (title) {\n  <div\n    class=\"flex items-center px-6 py-4 gap-4 border-b border-[var(--border-color)] min-h-[56px] bg-[var(--bg-elevated)]\"\n  >\n    <h1 class=\"text-xl font-semibold m-0 text-[var(--text-primary)]\">\n      {{ title }}\n    </h1>\n    <ng-content select=\"[slot=header-actions]\"></ng-content>\n  </div>\n}\n<div\n  appApplyTheme=\"app-page-container\"\n  class=\"flex-1 overflow-auto\"\n  [style.padding.px]=\"padding\"\n  [style.maxWidth]=\"maxWidth ? maxWidth + 'px' : null\"\n>\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:flex;flex-direction:column;height:100%}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PageContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-page-container", standalone: true, imports: [ApplyThemeDirective], template: "@if (title) {\n  <div\n    class=\"flex items-center px-6 py-4 gap-4 border-b border-[var(--border-color)] min-h-[56px] bg-[var(--bg-elevated)]\"\n  >\n    <h1 class=\"text-xl font-semibold m-0 text-[var(--text-primary)]\">\n      {{ title }}\n    </h1>\n    <ng-content select=\"[slot=header-actions]\"></ng-content>\n  </div>\n}\n<div\n  appApplyTheme=\"app-page-container\"\n  class=\"flex-1 overflow-auto\"\n  [style.padding.px]=\"padding\"\n  [style.maxWidth]=\"maxWidth ? maxWidth + 'px' : null\"\n>\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:flex;flex-direction:column;height:100%}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], padding: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], width: [{
                type: Input
            }] } });
registerSchemaComponent("app-page-container", PageContainerComponent);

class PageToolbarComponent {
    title = "";
    actions = "[]";
    actionClicked = new EventEmitter();
    get parsedActions() {
        return parseJsonOrDefault(this.actions);
    }
    handleAction(action) {
        this.actionClicked.emit(action.action || action.label);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PageToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: PageToolbarComponent, isStandalone: true, selector: "app-page-toolbar", inputs: { title: "title", actions: "actions" }, outputs: { actionClicked: "actionClicked" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-page-toolbar\"\n  class=\"flex items-center px-6 py-4 gap-4 flex-wrap border-b border-[var(--border-color)] bg-[var(--bg-elevated)]\"\n>\n  <div class=\"flex-1 flex flex-col gap-1 min-w-[200px]\">\n    <h2 class=\"text-lg font-semibold m-0 text-[var(--text-primary)]\">\n      {{ title }}\n    </h2>\n    <ng-content select=\"[slot=subtitle]\"></ng-content>\n  </div>\n  <div class=\"flex items-center gap-2 flex-wrap\">\n    @for (action of parsedActions; track action.label) {\n      <button\n        class=\"inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer transition-all duration-150\"\n        [style.border-color]=\"\n          action.variant === 'primary'\n            ? 'var(--accent)'\n            : action.variant === 'danger'\n              ? 'var(--error)'\n              : action.variant === 'ghost'\n                ? 'transparent'\n                : 'var(--border-color)'\n        \"\n        [style.background]=\"\n          action.variant === 'primary'\n            ? 'var(--accent)'\n            : action.variant === 'danger'\n              ? 'var(--error)'\n              : action.variant === 'ghost'\n                ? 'transparent'\n                : 'var(--bg-elevated)'\n        \"\n        [style.color]=\"\n          action.variant === 'primary'\n            ? 'var(--text-on-accent)'\n            : action.variant === 'danger'\n              ? 'var(--text-on-error)'\n              : action.variant === 'ghost'\n                ? 'var(--text-secondary)'\n                : 'var(--text-primary)'\n        \"\n        (mouseenter)=\"$any($event.target).style.background = 'var(--bg-hover)'\"\n        (mouseleave)=\"\n          $any($event.target).style.background =\n            action.variant === 'primary'\n              ? 'var(--accent)'\n              : action.variant === 'danger'\n                ? 'var(--error)'\n                : action.variant === 'ghost'\n                  ? 'transparent'\n                  : 'var(--bg-elevated)'\n        \"\n        (click)=\"handleAction(action)\"\n      >\n        @if (action.icon) {\n          <app-icon class=\"text-lg\" [icon]=\"action.icon\" [size]=\"18\" />\n        }\n        {{ action.label }}\n      </button>\n    }\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PageToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-page-toolbar", standalone: true, imports: [IconComponent, ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-page-toolbar\"\n  class=\"flex items-center px-6 py-4 gap-4 flex-wrap border-b border-[var(--border-color)] bg-[var(--bg-elevated)]\"\n>\n  <div class=\"flex-1 flex flex-col gap-1 min-w-[200px]\">\n    <h2 class=\"text-lg font-semibold m-0 text-[var(--text-primary)]\">\n      {{ title }}\n    </h2>\n    <ng-content select=\"[slot=subtitle]\"></ng-content>\n  </div>\n  <div class=\"flex items-center gap-2 flex-wrap\">\n    @for (action of parsedActions; track action.label) {\n      <button\n        class=\"inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer transition-all duration-150\"\n        [style.border-color]=\"\n          action.variant === 'primary'\n            ? 'var(--accent)'\n            : action.variant === 'danger'\n              ? 'var(--error)'\n              : action.variant === 'ghost'\n                ? 'transparent'\n                : 'var(--border-color)'\n        \"\n        [style.background]=\"\n          action.variant === 'primary'\n            ? 'var(--accent)'\n            : action.variant === 'danger'\n              ? 'var(--error)'\n              : action.variant === 'ghost'\n                ? 'transparent'\n                : 'var(--bg-elevated)'\n        \"\n        [style.color]=\"\n          action.variant === 'primary'\n            ? 'var(--text-on-accent)'\n            : action.variant === 'danger'\n              ? 'var(--text-on-error)'\n              : action.variant === 'ghost'\n                ? 'var(--text-secondary)'\n                : 'var(--text-primary)'\n        \"\n        (mouseenter)=\"$any($event.target).style.background = 'var(--bg-hover)'\"\n        (mouseleave)=\"\n          $any($event.target).style.background =\n            action.variant === 'primary'\n              ? 'var(--accent)'\n              : action.variant === 'danger'\n                ? 'var(--error)'\n                : action.variant === 'ghost'\n                  ? 'transparent'\n                  : 'var(--bg-elevated)'\n        \"\n        (click)=\"handleAction(action)\"\n      >\n        @if (action.icon) {\n          <app-icon class=\"text-lg\" [icon]=\"action.icon\" [size]=\"18\" />\n        }\n        {{ action.label }}\n      </button>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { title: [{
                type: Input
            }], actions: [{
                type: Input
            }], actionClicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-page-toolbar", PageToolbarComponent);

class SplitViewComponent {
    containerEl;
    direction = "horizontal";
    split = 50;
    minFirst = 20;
    minSecond = 20;
    splitChanged = new EventEmitter();
    isDragging = false;
    onMouseMove = null;
    onMouseUp = null;
    onDividerMouseDown(e) {
        e.preventDefault();
        this.isDragging = true;
        this.onMouseMove = (moveEvent) => {
            if (!this.isDragging)
                return;
            const container = this.containerEl?.nativeElement;
            if (!container)
                return;
            const rect = container.getBoundingClientRect();
            let percentage;
            if (this.direction === "horizontal") {
                percentage = ((moveEvent.clientX - rect.left) / rect.width) * 100;
            }
            else {
                percentage = ((moveEvent.clientY - rect.top) / rect.height) * 100;
            }
            this.split = Math.max(this.minFirst, Math.min(100 - this.minSecond, percentage));
            this.splitChanged.emit(this.split);
        };
        this.onMouseUp = () => {
            this.isDragging = false;
            document.removeEventListener("mousemove", this.onMouseMove);
            document.removeEventListener("mouseup", this.onMouseUp);
            this.onMouseMove = null;
            this.onMouseUp = null;
        };
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mouseup", this.onMouseUp);
    }
    ngOnDestroy() {
        if (this.onMouseMove)
            document.removeEventListener("mousemove", this.onMouseMove);
        if (this.onMouseUp)
            document.removeEventListener("mouseup", this.onMouseUp);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SplitViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: SplitViewComponent, isStandalone: true, selector: "app-split-view", inputs: { direction: "direction", split: "split", minFirst: "minFirst", minSecond: "minSecond" }, outputs: { splitChanged: "splitChanged" }, viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }], ngImport: i0, template: "<div\n  appApplyTheme=\"app-split-view\"\n  #container\n  [class]=\"\n    'flex h-full w-full overflow-hidden ' +\n    (direction === 'vertical' ? 'flex-col' : '')\n  \"\n>\n  <div\n    class=\"split-pane first overflow-auto shrink-0\"\n    [style]=\"\n      direction === 'horizontal'\n        ? 'height: 100%; width: ' + split + '%; flex-grow: 0'\n        : 'width: 100%; height: ' + split + '%; flex-grow: 0'\n    \"\n  >\n    <ng-content select=\"[slot=first]\"></ng-content>\n  </div>\n  <div\n    class=\"split-divider shrink-0 relative z-10 transition-colors duration-150 bg-[color:var(--border-color)]\"\n    [class.dragging]=\"isDragging\"\n    [class.cursor-col-resize]=\"direction === 'horizontal'\"\n    [class.cursor-row-resize]=\"direction === 'vertical'\"\n    [class.w-1.5]=\"direction === 'horizontal'\"\n    [class.h-full]=\"direction === 'horizontal'\"\n    [class.w-full]=\"direction === 'vertical'\"\n    [class.h-1.5]=\"direction === 'vertical'\"\n    (mousedown)=\"onDividerMouseDown($event)\"\n  ></div>\n  <div\n    class=\"split-pane second overflow-auto\"\n    [style]=\"\n      direction === 'horizontal'\n        ? 'flex: 1; height: 100%'\n        : 'flex: 1; width: 100%'\n    \"\n  >\n    <ng-content select=\"[slot=second]\"></ng-content>\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SplitViewComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-split-view", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-split-view\"\n  #container\n  [class]=\"\n    'flex h-full w-full overflow-hidden ' +\n    (direction === 'vertical' ? 'flex-col' : '')\n  \"\n>\n  <div\n    class=\"split-pane first overflow-auto shrink-0\"\n    [style]=\"\n      direction === 'horizontal'\n        ? 'height: 100%; width: ' + split + '%; flex-grow: 0'\n        : 'width: 100%; height: ' + split + '%; flex-grow: 0'\n    \"\n  >\n    <ng-content select=\"[slot=first]\"></ng-content>\n  </div>\n  <div\n    class=\"split-divider shrink-0 relative z-10 transition-colors duration-150 bg-[color:var(--border-color)]\"\n    [class.dragging]=\"isDragging\"\n    [class.cursor-col-resize]=\"direction === 'horizontal'\"\n    [class.cursor-row-resize]=\"direction === 'vertical'\"\n    [class.w-1.5]=\"direction === 'horizontal'\"\n    [class.h-full]=\"direction === 'horizontal'\"\n    [class.w-full]=\"direction === 'vertical'\"\n    [class.h-1.5]=\"direction === 'vertical'\"\n    (mousedown)=\"onDividerMouseDown($event)\"\n  ></div>\n  <div\n    class=\"split-pane second overflow-auto\"\n    [style]=\"\n      direction === 'horizontal'\n        ? 'flex: 1; height: 100%'\n        : 'flex: 1; width: 100%'\n    \"\n  >\n    <ng-content select=\"[slot=second]\"></ng-content>\n  </div>\n</div>\n" }]
        }], propDecorators: { containerEl: [{
                type: ViewChild,
                args: ["container"]
            }], direction: [{
                type: Input
            }], split: [{
                type: Input
            }], minFirst: [{
                type: Input
            }], minSecond: [{
                type: Input
            }], splitChanged: [{
                type: Output
            }] } });
registerSchemaComponent("app-split-view", SplitViewComponent);

class AvatarComponent {
    src = "";
    alt = "";
    /** Alias for `alt` - accepts a name to display initials */
    name = "";
    size = "md";
    imgError = false;
    get initials() {
        return (this.alt || this.name || "").substring(0, 2).toUpperCase();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: AvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: AvatarComponent, isStandalone: true, selector: "app-avatar", inputs: { src: "src", alt: "alt", name: "name", size: "size" }, ngImport: i0, template: "<div appApplyTheme=\"app-avatar\">\n  @if (src && !imgError) {\n    <img\n      class=\"w-full h-full object-cover\"\n      [src]=\"src\"\n      [alt]=\"alt\"\n      (error)=\"imgError = true\"\n    />\n  } @else {\n    <span class=\"font-semibold text-[var(--text-secondary)] uppercase\">{{\n      initials\n    }}</span>\n  }\n</div>\n", styles: [":host([size=\"sm\"]){width:2rem;height:2rem;font-size:.75rem}:host([size=\"md\"]){width:2.5rem;height:2.5rem;font-size:.875rem}:host([size=\"lg\"]){width:3.5rem;height:3.5rem;font-size:1.25rem}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: AvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-avatar", standalone: true, imports: [ApplyThemeDirective], template: "<div appApplyTheme=\"app-avatar\">\n  @if (src && !imgError) {\n    <img\n      class=\"w-full h-full object-cover\"\n      [src]=\"src\"\n      [alt]=\"alt\"\n      (error)=\"imgError = true\"\n    />\n  } @else {\n    <span class=\"font-semibold text-[var(--text-secondary)] uppercase\">{{\n      initials\n    }}</span>\n  }\n</div>\n", styles: [":host([size=\"sm\"]){width:2rem;height:2rem;font-size:.75rem}:host([size=\"md\"]){width:2.5rem;height:2.5rem;font-size:.875rem}:host([size=\"lg\"]){width:3.5rem;height:3.5rem;font-size:1.25rem}\n"] }]
        }], propDecorators: { src: [{
                type: Input
            }], alt: [{
                type: Input
            }], name: [{
                type: Input
            }], size: [{
                type: Input
            }] } });
registerSchemaComponent("app-avatar", AvatarComponent);

class ChipComponent {
    label = "";
    icon = "";
    removable = false;
    /** Alias for `removable` */
    closeable = false;
    removed = new EventEmitter();
    handleRemove(e) {
        e.stopPropagation();
        this.removed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ChipComponent, isStandalone: true, selector: "app-chip", inputs: { label: "label", icon: "icon", removable: "removable", closeable: "closeable" }, outputs: { removed: "removed" }, ngImport: i0, template: "<span\n  appApplyTheme=\"app-chip\"\n  class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium transition-colors hover:bg-[var(--bg-hover)] bg-[var(--bg-elevated)] border-[var(--border-color)] text-[var(--text-primary)]\"\n>\n  @if (icon) {\n    <app-icon class=\"text-base\" [icon]=\"icon\" [size]=\"16\" />\n  }\n  <span>{{ label }}</span>\n  @if (removable || closeable) {\n    <button\n      class=\"inline-flex items-center justify-center w-4 h-4 p-0 border-0 bg-transparent rounded-full transition-colors ms-0.5 hover:bg-[var(--border-color)] hover:text-[var(--text-primary)] text-[var(--text-secondary)]\"\n      (click)=\"handleRemove($event)\"\n      aria-label=\"Remove\"\n    >\n      &times;\n    </button>\n  }\n</span>\n", styles: [""], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ChipComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-chip", standalone: true, imports: [IconComponent, ApplyThemeDirective], template: "<span\n  appApplyTheme=\"app-chip\"\n  class=\"inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium transition-colors hover:bg-[var(--bg-hover)] bg-[var(--bg-elevated)] border-[var(--border-color)] text-[var(--text-primary)]\"\n>\n  @if (icon) {\n    <app-icon class=\"text-base\" [icon]=\"icon\" [size]=\"16\" />\n  }\n  <span>{{ label }}</span>\n  @if (removable || closeable) {\n    <button\n      class=\"inline-flex items-center justify-center w-4 h-4 p-0 border-0 bg-transparent rounded-full transition-colors ms-0.5 hover:bg-[var(--border-color)] hover:text-[var(--text-primary)] text-[var(--text-secondary)]\"\n      (click)=\"handleRemove($event)\"\n      aria-label=\"Remove\"\n    >\n      &times;\n    </button>\n  }\n</span>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], icon: [{
                type: Input
            }], removable: [{
                type: Input
            }], closeable: [{
                type: Input
            }], removed: [{
                type: Output
            }] } });
registerSchemaComponent("app-chip", ChipComponent);

class PaginationComponent {
    totalItems = 0;
    currentPage = 0;
    pageSize = 50;
    pageChange = new EventEmitter();
    pageSizeChange = new EventEmitter();
    get totalPages() {
        return Math.ceil(this.totalItems / this.pageSize) || 1;
    }
    get hasNextPage() {
        return this.currentPage < this.totalPages - 1;
    }
    get hasPrevPage() {
        return this.currentPage > 0;
    }
    get startIndex() {
        return this.currentPage * this.pageSize + 1;
    }
    get endIndex() {
        return Math.min((this.currentPage + 1) * this.pageSize, this.totalItems);
    }
    nextPage() {
        if (this.hasNextPage) {
            this.pageChange.emit(this.currentPage + 1);
        }
    }
    prevPage() {
        if (this.hasPrevPage) {
            this.pageChange.emit(this.currentPage - 1);
        }
    }
    firstPage() {
        this.pageChange.emit(0);
    }
    lastPage() {
        this.pageChange.emit(this.totalPages - 1);
    }
    onPageSizeChange(size) {
        this.pageSizeChange.emit(size);
        this.pageChange.emit(0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: PaginationComponent, isStandalone: true, selector: "app-pagination", inputs: { totalItems: "totalItems", currentPage: "currentPage", pageSize: "pageSize" }, outputs: { pageChange: "pageChange", pageSizeChange: "pageSizeChange" }, ngImport: i0, template: "<div\n  class=\"flex w-full items-center justify-between border-t border-[var(--border-subtle)] bg-transparent px-6 py-3\"\n>\n  <div class=\"flex items-center gap-6\">\n    <span class=\"text-sm text-[var(--text-dim)]\">\n      Showing\n      <span class=\"font-bold text-[var(--text-main)]\">{{ startIndex }}</span\n      >-<span class=\"font-bold text-[var(--text-main)]\">{{ endIndex }}</span> of\n      <span class=\"font-bold text-[var(--text-main)]\">{{ totalItems }}</span>\n    </span>\n    <div class=\"flex items-center gap-3\">\n      <span class=\"text-xs text-[var(--text-muted)]\">Rows per page:</span>\n      <select\n        class=\"cursor-pointer rounded-lg border border-[var(--border-visible)] bg-[var(--bg-card)] px-3 py-1.5 text-sm text-[var(--text-main)] focus:border-[var(--accent)] focus:outline-none\"\n        [value]=\"pageSize\"\n        (change)=\"onPageSizeChange(+$any($event.target).value)\"\n      >\n        <option value=\"10\">10</option>\n        <option value=\"25\">25</option>\n        <option value=\"50\">50</option>\n        <option value=\"100\">100</option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"flex items-center gap-2\">\n    <button\n      class=\"rounded-lg p-2 text-[var(--text-dim)] transition-all hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-30\"\n      [disabled]=\"!hasPrevPage\"\n      (click)=\"firstPage()\"\n      title=\"First page\"\n    >\n      <app-icon icon=\"first_page\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"rounded-lg p-2 text-[var(--text-dim)] transition-all hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-30\"\n      [disabled]=\"!hasPrevPage\"\n      (click)=\"prevPage()\"\n      title=\"Previous page\"\n    >\n      <app-icon icon=\"chevron_left\" [size]=\"18\" />\n    </button>\n    <span class=\"px-3 text-sm text-[var(--text-dim)]\"\n      >Page {{ currentPage + 1 }} of {{ totalPages || 1 }}</span\n    >\n    <button\n      class=\"rounded-lg p-2 text-[var(--text-dim)] transition-all hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-30\"\n      [disabled]=\"!hasNextPage\"\n      (click)=\"nextPage()\"\n      title=\"Next page\"\n    >\n      <app-icon icon=\"chevron_right\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"rounded-lg p-2 text-[var(--text-dim)] transition-all hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-30\"\n      [disabled]=\"!hasNextPage\"\n      (click)=\"lastPage()\"\n      title=\"Last page\"\n    >\n      <app-icon icon=\"last_page\" [size]=\"18\" />\n    </button>\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-pagination", standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [IconComponent, ApplyThemeDirective], template: "<div\n  class=\"flex w-full items-center justify-between border-t border-[var(--border-subtle)] bg-transparent px-6 py-3\"\n>\n  <div class=\"flex items-center gap-6\">\n    <span class=\"text-sm text-[var(--text-dim)]\">\n      Showing\n      <span class=\"font-bold text-[var(--text-main)]\">{{ startIndex }}</span\n      >-<span class=\"font-bold text-[var(--text-main)]\">{{ endIndex }}</span> of\n      <span class=\"font-bold text-[var(--text-main)]\">{{ totalItems }}</span>\n    </span>\n    <div class=\"flex items-center gap-3\">\n      <span class=\"text-xs text-[var(--text-muted)]\">Rows per page:</span>\n      <select\n        class=\"cursor-pointer rounded-lg border border-[var(--border-visible)] bg-[var(--bg-card)] px-3 py-1.5 text-sm text-[var(--text-main)] focus:border-[var(--accent)] focus:outline-none\"\n        [value]=\"pageSize\"\n        (change)=\"onPageSizeChange(+$any($event.target).value)\"\n      >\n        <option value=\"10\">10</option>\n        <option value=\"25\">25</option>\n        <option value=\"50\">50</option>\n        <option value=\"100\">100</option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"flex items-center gap-2\">\n    <button\n      class=\"rounded-lg p-2 text-[var(--text-dim)] transition-all hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-30\"\n      [disabled]=\"!hasPrevPage\"\n      (click)=\"firstPage()\"\n      title=\"First page\"\n    >\n      <app-icon icon=\"first_page\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"rounded-lg p-2 text-[var(--text-dim)] transition-all hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-30\"\n      [disabled]=\"!hasPrevPage\"\n      (click)=\"prevPage()\"\n      title=\"Previous page\"\n    >\n      <app-icon icon=\"chevron_left\" [size]=\"18\" />\n    </button>\n    <span class=\"px-3 text-sm text-[var(--text-dim)]\"\n      >Page {{ currentPage + 1 }} of {{ totalPages || 1 }}</span\n    >\n    <button\n      class=\"rounded-lg p-2 text-[var(--text-dim)] transition-all hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-30\"\n      [disabled]=\"!hasNextPage\"\n      (click)=\"nextPage()\"\n      title=\"Next page\"\n    >\n      <app-icon icon=\"chevron_right\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"rounded-lg p-2 text-[var(--text-dim)] transition-all hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] disabled:cursor-not-allowed disabled:opacity-30\"\n      [disabled]=\"!hasNextPage\"\n      (click)=\"lastPage()\"\n      title=\"Last page\"\n    >\n      <app-icon icon=\"last_page\" [size]=\"18\" />\n    </button>\n  </div>\n</div>\n" }]
        }], propDecorators: { totalItems: [{
                type: Input
            }], currentPage: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], pageSizeChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-pagination", PaginationComponent);

class TabsComponent {
    tabs = "[]";
    activeTab = "";
    tabChanged = new EventEmitter();
    get parsedTabs() {
        return parseJsonOrDefault(this.tabs);
    }
    selectTab(tab) {
        this.activeTab = tab;
        this.tabChanged.emit(tab);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TabsComponent, isStandalone: true, selector: "app-tabs", inputs: { tabs: "tabs", activeTab: "activeTab" }, outputs: { tabChanged: "tabChanged" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-tabs\"\n  class=\"flex gap-0 border-b border-[var(--border-color)]\"\n>\n  @for (tab of parsedTabs; track tab) {\n    <div\n      class=\"tab px-5 py-3 text-sm font-medium cursor-pointer -mb-px transition-all duration-150 text-[var(--text-secondary)] hover:text-[var(--text-primary)]\"\n      [class.active]=\"tab === activeTab\"\n      [class.text-[var(--accent)]]=\"tab === activeTab\"\n      [class.border-b-2]=\"tab === activeTab\"\n      [class.border-b-transparent]=\"tab !== activeTab\"\n      [style.--tw-border-color]=\"\n        tab === activeTab ? 'var(--accent)' : 'transparent'\n      \"\n      (click)=\"selectTab(tab)\"\n    >\n      {{ tab }}\n    </div>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TabsComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tabs", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-tabs\"\n  class=\"flex gap-0 border-b border-[var(--border-color)]\"\n>\n  @for (tab of parsedTabs; track tab) {\n    <div\n      class=\"tab px-5 py-3 text-sm font-medium cursor-pointer -mb-px transition-all duration-150 text-[var(--text-secondary)] hover:text-[var(--text-primary)]\"\n      [class.active]=\"tab === activeTab\"\n      [class.text-[var(--accent)]]=\"tab === activeTab\"\n      [class.border-b-2]=\"tab === activeTab\"\n      [class.border-b-transparent]=\"tab !== activeTab\"\n      [style.--tw-border-color]=\"\n        tab === activeTab ? 'var(--accent)' : 'transparent'\n      \"\n      (click)=\"selectTab(tab)\"\n    >\n      {{ tab }}\n    </div>\n  }\n</div>\n" }]
        }], propDecorators: { tabs: [{
                type: Input
            }], activeTab: [{
                type: Input
            }], tabChanged: [{
                type: Output
            }] } });
registerSchemaComponent("app-tabs", TabsComponent);

class ProgressBarComponent {
    value = 0;
    max = 100;
    get percentage() {
        return (this.value / this.max) * 100;
    }
    get fillClass() {
        const pct = this.percentage;
        if (pct < 40)
            return "low";
        if (pct < 75)
            return "medium";
        return "high";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ProgressBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: ProgressBarComponent, isStandalone: true, selector: "app-progress-bar", inputs: { value: "value", max: "max" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-progress-bar\"\n  class=\"w-full h-2 bg-[var(--bg-elevated)] rounded border border-[var(--border-color)] overflow-hidden\"\n>\n  <div\n    class=\"h-full rounded transition-all duration-300\"\n    [class.bg-[var(--warning)]]=\"fillClass === 'low'\"\n    [class.bg-[var(--accent)]]=\"fillClass === 'medium'\"\n    [class.bg-[var(--success)]]=\"fillClass === 'high'\"\n    [style.width.%]=\"percentage\"\n  ></div>\n</div>\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ProgressBarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-progress-bar", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-progress-bar\"\n  class=\"w-full h-2 bg-[var(--bg-elevated)] rounded border border-[var(--border-color)] overflow-hidden\"\n>\n  <div\n    class=\"h-full rounded transition-all duration-300\"\n    [class.bg-[var(--warning)]]=\"fillClass === 'low'\"\n    [class.bg-[var(--accent)]]=\"fillClass === 'medium'\"\n    [class.bg-[var(--success)]]=\"fillClass === 'high'\"\n    [style.width.%]=\"percentage\"\n  ></div>\n</div>\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], max: [{
                type: Input
            }] } });
registerSchemaComponent("app-progress-bar", ProgressBarComponent);

class SegmentSelectorComponent {
    options = "[]";
    selected = "";
    changed = new EventEmitter();
    get parsedOptions() {
        return parseJsonOrDefault(this.options);
    }
    selectOption(opt) {
        this.selected = opt;
        this.changed.emit(opt);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SegmentSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SegmentSelectorComponent, isStandalone: true, selector: "app-segment-selector", inputs: { options: "options", selected: "selected" }, outputs: { changed: "changed" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-segment-selector\"\n  class=\"inline-flex border border-[var(--border-color)] rounded-lg overflow-hidden bg-[var(--bg-elevated)]\"\n>\n  @for (opt of parsedOptions; track opt) {\n    <div\n      class=\"px-4 py-2 text-sm font-medium text-[var(--text-secondary)] cursor-pointer transition-colors duration-150 border-r border-[var(--border-color)] last:border-r-0 hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n      [class.bg-[var(--accent)]]=\"opt === selected\"\n      [class.text-[var(--text-on-accent)]]=\"opt === selected\"\n      (click)=\"selectOption(opt)\"\n    >\n      {{ opt }}\n    </div>\n  }\n</div>\n", styles: [":host{display:inline-flex}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SegmentSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-segment-selector", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-segment-selector\"\n  class=\"inline-flex border border-[var(--border-color)] rounded-lg overflow-hidden bg-[var(--bg-elevated)]\"\n>\n  @for (opt of parsedOptions; track opt) {\n    <div\n      class=\"px-4 py-2 text-sm font-medium text-[var(--text-secondary)] cursor-pointer transition-colors duration-150 border-r border-[var(--border-color)] last:border-r-0 hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n      [class.bg-[var(--accent)]]=\"opt === selected\"\n      [class.text-[var(--text-on-accent)]]=\"opt === selected\"\n      (click)=\"selectOption(opt)\"\n    >\n      {{ opt }}\n    </div>\n  }\n</div>\n", styles: [":host{display:inline-flex}\n"] }]
        }], propDecorators: { options: [{
                type: Input
            }], selected: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-segment-selector", SegmentSelectorComponent);

class TooltipComponent {
    text = "";
    /** Alias for `text` */
    content = "";
    position = "top";
    delay = 200;
    show = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TooltipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TooltipComponent, isStandalone: true, selector: "app-tooltip", inputs: { text: "text", content: "content", position: "position", delay: "delay" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-tooltip\"\n  class=\"inline-flex relative cursor-pointer\"\n  (mouseenter)=\"show = true\"\n  (mouseleave)=\"show = false\"\n  (focus)=\"show = true\"\n  (blur)=\"show = false\"\n  tabindex=\"0\"\n>\n  <ng-content></ng-content>\n  @if (show) {\n    <div\n      class=\"absolute z-50 px-3 py-1.5 rounded-md text-xs whitespace-nowrap shadow-md pointer-events-none tooltip-bubble bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-color)]\"\n      [class.top]=\"!position || position === 'top'\"\n      [class.bottom]=\"position === 'bottom'\"\n      [class.left]=\"position === 'left'\"\n      [class.right]=\"position === 'right'\"\n    >\n      {{ text || content }}\n    </div>\n  }\n</div>\n", styles: [":host{display:inline-flex;position:relative}.tooltip-bubble{position:absolute;z-index:50}.tooltip-bubble.top{bottom:100%;left:50%;transform:translate(-50%);margin-bottom:.5rem}.tooltip-bubble.bottom{top:100%;left:50%;transform:translate(-50%);margin-top:.5rem}.tooltip-bubble.left{right:100%;top:50%;transform:translateY(-50%);margin-right:.5rem}.tooltip-bubble.right{left:100%;top:50%;transform:translateY(-50%);margin-left:.5rem}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tooltip", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-tooltip\"\n  class=\"inline-flex relative cursor-pointer\"\n  (mouseenter)=\"show = true\"\n  (mouseleave)=\"show = false\"\n  (focus)=\"show = true\"\n  (blur)=\"show = false\"\n  tabindex=\"0\"\n>\n  <ng-content></ng-content>\n  @if (show) {\n    <div\n      class=\"absolute z-50 px-3 py-1.5 rounded-md text-xs whitespace-nowrap shadow-md pointer-events-none tooltip-bubble bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-color)]\"\n      [class.top]=\"!position || position === 'top'\"\n      [class.bottom]=\"position === 'bottom'\"\n      [class.left]=\"position === 'left'\"\n      [class.right]=\"position === 'right'\"\n    >\n      {{ text || content }}\n    </div>\n  }\n</div>\n", styles: [":host{display:inline-flex;position:relative}.tooltip-bubble{position:absolute;z-index:50}.tooltip-bubble.top{bottom:100%;left:50%;transform:translate(-50%);margin-bottom:.5rem}.tooltip-bubble.bottom{top:100%;left:50%;transform:translate(-50%);margin-top:.5rem}.tooltip-bubble.left{right:100%;top:50%;transform:translateY(-50%);margin-right:.5rem}.tooltip-bubble.right{left:100%;top:50%;transform:translateY(-50%);margin-left:.5rem}\n"] }]
        }], propDecorators: { text: [{
                type: Input
            }], content: [{
                type: Input
            }], position: [{
                type: Input
            }], delay: [{
                type: Input
            }] } });
registerSchemaComponent("app-tooltip", TooltipComponent);

class SnackbarComponent {
    message = "";
    action = "";
    duration = 4000;
    type = "default";
    open = false;
    dismissed = new EventEmitter();
    actioned = new EventEmitter();
    timer = null;
    ngOnChanges(changes) {
        if (changes["open"] && this.open) {
            this.startTimer();
        }
    }
    ngOnDestroy() {
        this.clearTimer();
    }
    startTimer() {
        this.clearTimer();
        this.timer = window.setTimeout(() => this.dismiss(), this.duration);
    }
    clearTimer() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
    dismiss() {
        this.open = false;
        this.clearTimer();
        this.dismissed.emit();
    }
    handleAction() {
        this.actioned.emit();
        this.dismiss();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SnackbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SnackbarComponent, isStandalone: true, selector: "app-snackbar", inputs: { message: "message", action: "action", duration: "duration", type: "type", open: "open" }, outputs: { dismissed: "dismissed", actioned: "actioned" }, usesOnChanges: true, ngImport: i0, template: "@if (open) {\n  <div\n    appApplyTheme=\"app-snackbar\"\n    [class]=\"'bar ' + type\"\n    class=\"fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] block inline-flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-on-accent)] text-sm shadow-xl min-w-[280px] max-w-[560px] border-l-4\"\n    [style.border-left-color]=\"'var(--' + type + '-color, var(--accent))'\"\n    role=\"status\"\n  >\n    <span class=\"message flex-1\">{{ message }}</span>\n    @if (action) {\n      <button\n        class=\"action-btn bg-transparent border-none text-[var(--accent)] font-semibold cursor-pointer px-2 py-1 rounded text-xs uppercase hover:bg-white/10\"\n        (click)=\"handleAction()\"\n      >\n        {{ action }}\n      </button>\n    }\n    <button\n      class=\"close-btn bg-transparent border-none cursor-pointer p-0.5 opacity-70 text-lg leading-none hover:opacity-100\"\n      (click)=\"dismiss()\"\n      aria-label=\"Dismiss\"\n    >\n      &times;\n    </button>\n  </div>\n}\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SnackbarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-snackbar", standalone: true, imports: [ApplyThemeDirective], template: "@if (open) {\n  <div\n    appApplyTheme=\"app-snackbar\"\n    [class]=\"'bar ' + type\"\n    class=\"fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] block inline-flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-on-accent)] text-sm shadow-xl min-w-[280px] max-w-[560px] border-l-4\"\n    [style.border-left-color]=\"'var(--' + type + '-color, var(--accent))'\"\n    role=\"status\"\n  >\n    <span class=\"message flex-1\">{{ message }}</span>\n    @if (action) {\n      <button\n        class=\"action-btn bg-transparent border-none text-[var(--accent)] font-semibold cursor-pointer px-2 py-1 rounded text-xs uppercase hover:bg-white/10\"\n        (click)=\"handleAction()\"\n      >\n        {{ action }}\n      </button>\n    }\n    <button\n      class=\"close-btn bg-transparent border-none cursor-pointer p-0.5 opacity-70 text-lg leading-none hover:opacity-100\"\n      (click)=\"dismiss()\"\n      aria-label=\"Dismiss\"\n    >\n      &times;\n    </button>\n  </div>\n}\n" }]
        }], propDecorators: { message: [{
                type: Input
            }], action: [{
                type: Input
            }], duration: [{
                type: Input
            }], type: [{
                type: Input
            }], open: [{
                type: Input
            }], dismissed: [{
                type: Output
            }], actioned: [{
                type: Output
            }] } });
registerSchemaComponent("app-snackbar", SnackbarComponent);

class SpinnerComponent {
    size = "md";
    color = "";
    label = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SpinnerComponent, isStandalone: true, selector: "app-spinner", inputs: { size: "size", color: "color", label: "label" }, ngImport: i0, template: "<div appApplyTheme=\"app-spinner\" class=\"inline-flex items-center gap-2\">\n  <div\n    class=\"border-2 rounded-full animate-spin border-[var(--border-color)]\"\n    [class]=\"'spinner-' + size\"\n    [style.borderTopColor]=\"color || 'var(--accent)'\"\n  ></div>\n  @if (label) {\n    <span class=\"text-sm text-[var(--text-secondary)]\">{{ label }}</span>\n  }\n</div>\n", styles: ["@keyframes spin{to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-spinner", standalone: true, imports: [ApplyThemeDirective], template: "<div appApplyTheme=\"app-spinner\" class=\"inline-flex items-center gap-2\">\n  <div\n    class=\"border-2 rounded-full animate-spin border-[var(--border-color)]\"\n    [class]=\"'spinner-' + size\"\n    [style.borderTopColor]=\"color || 'var(--accent)'\"\n  ></div>\n  @if (label) {\n    <span class=\"text-sm text-[var(--text-secondary)]\">{{ label }}</span>\n  }\n</div>\n", styles: ["@keyframes spin{to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], color: [{
                type: Input
            }], label: [{
                type: Input
            }] } });
registerSchemaComponent("app-spinner", SpinnerComponent);

class DividerComponent {
    orientation = "horizontal";
    spacing = "md";
    color = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: DividerComponent, isStandalone: true, selector: "app-divider", inputs: { orientation: "orientation", spacing: "spacing", color: "color" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-divider\"\n  class=\"flex items-center justify-center\"\n  [class.inline-flex]=\"orientation === 'vertical'\"\n  [class.h-full]=\"orientation === 'vertical'\"\n  role=\"separator\"\n>\n  <div\n    class=\"w-full h-px\"\n    [class.w-px]=\"orientation === 'vertical'\"\n    [class.h-full]=\"orientation === 'vertical'\"\n    [style.background]=\"color || 'var(--divider-color, var(--border-color))'\"\n  ></div>\n</div>\n", styles: [":host{display:block}:host([orientation=\"vertical\"]){display:inline-flex;height:100%}:host([spacing=\"none\"]){margin:0}:host([spacing=\"sm\"]){margin:.5rem 0}:host([spacing=\"md\"]){margin:1rem 0}:host([spacing=\"lg\"]){margin:1.5rem 0}:host([spacing=\"xl\"]){margin:2.5rem 0}:host([orientation=\"vertical\"][spacing=\"none\"]){margin:0}:host([orientation=\"vertical\"][spacing=\"sm\"]){margin:0 .5rem}:host([orientation=\"vertical\"][spacing=\"md\"]){margin:0 1rem}:host([orientation=\"vertical\"][spacing=\"lg\"]){margin:0 1.5rem}:host([orientation=\"vertical\"][spacing=\"xl\"]){margin:0 2.5rem}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DividerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-divider", standalone: true, imports: [ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-divider\"\n  class=\"flex items-center justify-center\"\n  [class.inline-flex]=\"orientation === 'vertical'\"\n  [class.h-full]=\"orientation === 'vertical'\"\n  role=\"separator\"\n>\n  <div\n    class=\"w-full h-px\"\n    [class.w-px]=\"orientation === 'vertical'\"\n    [class.h-full]=\"orientation === 'vertical'\"\n    [style.background]=\"color || 'var(--divider-color, var(--border-color))'\"\n  ></div>\n</div>\n", styles: [":host{display:block}:host([orientation=\"vertical\"]){display:inline-flex;height:100%}:host([spacing=\"none\"]){margin:0}:host([spacing=\"sm\"]){margin:.5rem 0}:host([spacing=\"md\"]){margin:1rem 0}:host([spacing=\"lg\"]){margin:1.5rem 0}:host([spacing=\"xl\"]){margin:2.5rem 0}:host([orientation=\"vertical\"][spacing=\"none\"]){margin:0}:host([orientation=\"vertical\"][spacing=\"sm\"]){margin:0 .5rem}:host([orientation=\"vertical\"][spacing=\"md\"]){margin:0 1rem}:host([orientation=\"vertical\"][spacing=\"lg\"]){margin:0 1.5rem}:host([orientation=\"vertical\"][spacing=\"xl\"]){margin:0 2.5rem}\n"] }]
        }], propDecorators: { orientation: [{
                type: Input
            }], spacing: [{
                type: Input
            }], color: [{
                type: Input
            }] } });
registerSchemaComponent("app-divider", DividerComponent);

class TreeNodeComponent {
    node;
    depth = 0;
    selected = new EventEmitter();
    toggleExpand(e) {
        e.stopPropagation();
        this.node.expanded = !this.node.expanded;
    }
    handleClick() {
        if (this.node.children?.length && this.node.expanded === undefined) {
            this.node.expanded = true;
        }
        this.selected.emit(this.node);
    }
    onChildSelected(node) {
        this.selected.emit(node);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TreeNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TreeNodeComponent, isStandalone: true, selector: "app-tree-node", inputs: { node: "node", depth: "depth" }, outputs: { selected: "selected" }, ngImport: i0, template: "<div\n  class=\"flex items-center gap-[0.375rem] px-2 py-1 cursor-pointer rounded transition-colors duration-150 tree-node\"\n  [style.paddingLeft.px]=\"depth * 20\"\n  [class.selected]=\"node.selected\"\n  [class]=\"\n    node.selected\n      ? 'bg-[var(--accent)] text-[var(--text-on-accent)]'\n      : 'bg-[var(--bg-hover)]'\n  \"\n  (click)=\"handleClick()\"\n>\n  @if (node.children?.length) {\n    <span\n      class=\"toggle text-[0.625rem] w-4 text-center shrink-0 cursor-pointer text-[var(--text-secondary)]\"\n      (click)=\"toggleExpand($event)\"\n      >{{ node.expanded ? \"\u25BC\" : \"\u25B6\" }}</span\n    >\n  } @else {\n    <span class=\"toggle-placeholder w-4 shrink-0\"></span>\n  }\n  @if (node.icon) {\n    <span class=\"node-icon text-base shrink-0 text-[var(--text-secondary)]\">{{\n      node.icon\n    }}</span>\n  }\n  <span\n    class=\"node-label flex-1 overflow-hidden text-ellipsis whitespace-nowrap\"\n    >{{ node.label }}</span\n  >\n</div>\n@if (node.expanded && node.children?.length) {\n  @for (child of node.children; track child.id) {\n    <app-tree-node\n      [node]=\"child\"\n      [depth]=\"depth + 1\"\n      (selected)=\"onChildSelected($event)\"\n    ></app-tree-node>\n  }\n}\n", styles: [""], dependencies: [{ kind: "component", type: TreeNodeComponent, selector: "app-tree-node", inputs: ["node", "depth"], outputs: ["selected"] }, { kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TreeNodeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tree-node", standalone: true, imports: [CommonModule, ApplyThemeDirective], template: "<div\n  class=\"flex items-center gap-[0.375rem] px-2 py-1 cursor-pointer rounded transition-colors duration-150 tree-node\"\n  [style.paddingLeft.px]=\"depth * 20\"\n  [class.selected]=\"node.selected\"\n  [class]=\"\n    node.selected\n      ? 'bg-[var(--accent)] text-[var(--text-on-accent)]'\n      : 'bg-[var(--bg-hover)]'\n  \"\n  (click)=\"handleClick()\"\n>\n  @if (node.children?.length) {\n    <span\n      class=\"toggle text-[0.625rem] w-4 text-center shrink-0 cursor-pointer text-[var(--text-secondary)]\"\n      (click)=\"toggleExpand($event)\"\n      >{{ node.expanded ? \"\u25BC\" : \"\u25B6\" }}</span\n    >\n  } @else {\n    <span class=\"toggle-placeholder w-4 shrink-0\"></span>\n  }\n  @if (node.icon) {\n    <span class=\"node-icon text-base shrink-0 text-[var(--text-secondary)]\">{{\n      node.icon\n    }}</span>\n  }\n  <span\n    class=\"node-label flex-1 overflow-hidden text-ellipsis whitespace-nowrap\"\n    >{{ node.label }}</span\n  >\n</div>\n@if (node.expanded && node.children?.length) {\n  @for (child of node.children; track child.id) {\n    <app-tree-node\n      [node]=\"child\"\n      [depth]=\"depth + 1\"\n      (selected)=\"onChildSelected($event)\"\n    ></app-tree-node>\n  }\n}\n" }]
        }], propDecorators: { node: [{
                type: Input
            }], depth: [{
                type: Input
            }], selected: [{
                type: Output
            }] } });
class TreeComponent {
    nodes = "[]";
    selectable = false;
    selected = new EventEmitter();
    get parsedNodes() {
        return parseJsonOrDefault(this.nodes);
    }
    onNodeSelected(node) {
        this.selected.emit(node);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TreeComponent, isStandalone: true, selector: "app-tree", inputs: { nodes: "nodes", selectable: "selectable" }, outputs: { selected: "selected" }, ngImport: i0, template: "<div appApplyTheme=\"app-tree\">\n  @for (node of parsedNodes; track node.id) {\n    <app-tree-node\n      [node]=\"node\"\n      [depth]=\"0\"\n      (selected)=\"onNodeSelected($event)\"\n      class=\"block text-sm\"\n    ></app-tree-node>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: TreeNodeComponent, selector: "app-tree-node", inputs: ["node", "depth"], outputs: ["selected"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TreeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-tree", standalone: true, imports: [CommonModule, TreeNodeComponent, ApplyThemeDirective], template: "<div appApplyTheme=\"app-tree\">\n  @for (node of parsedNodes; track node.id) {\n    <app-tree-node\n      [node]=\"node\"\n      [depth]=\"0\"\n      (selected)=\"onNodeSelected($event)\"\n      class=\"block text-sm\"\n    ></app-tree-node>\n  }\n</div>\n" }]
        }], propDecorators: { nodes: [{
                type: Input
            }], selectable: [{
                type: Input
            }], selected: [{
                type: Output
            }] } });
registerSchemaComponent("app-tree", TreeComponent);

class FormComponent {
    heading = "";
    showActions = true;
    submitText = "Submit";
    cancelText = "Cancel";
    submitted = new EventEmitter();
    cancelled = new EventEmitter();
    handleSubmit(e) {
        e.preventDefault();
        this.submitted.emit(e);
    }
    handleCancel() {
        this.cancelled.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FormComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: FormComponent, isStandalone: true, selector: "app-form", inputs: { heading: "heading", showActions: "showActions", submitText: "submitText", cancelText: "cancelText" }, outputs: { submitted: "submitted", cancelled: "cancelled" }, ngImport: i0, template: "<form appApplyTheme=\"app-form\" (submit)=\"handleSubmit($event)\">\n  @if (heading) {\n    <h3 class=\"text-lg font-semibold text-[var(--text-primary)] m-0 mb-4\">\n      {{ heading }}\n    </h3>\n  }\n  <ng-content></ng-content>\n  @if (showActions) {\n    <div class=\"flex gap-3 justify-end mt-6\">\n      <button\n        type=\"submit\"\n        class=\"px-4 py-2 rounded-lg border border-[var(--accent)] bg-[var(--accent)] text-[var(--text-on-accent)] font-medium cursor-pointer hover:bg-[var(--accent-hover)]\"\n      >\n        {{ submitText }}\n      </button>\n      <button\n        type=\"button\"\n        class=\"px-4 py-2 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] cursor-pointer hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n        (click)=\"handleCancel()\"\n      >\n        {{ cancelText }}\n      </button>\n    </div>\n  }\n</form>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FormComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-form", standalone: true, imports: [ApplyThemeDirective], template: "<form appApplyTheme=\"app-form\" (submit)=\"handleSubmit($event)\">\n  @if (heading) {\n    <h3 class=\"text-lg font-semibold text-[var(--text-primary)] m-0 mb-4\">\n      {{ heading }}\n    </h3>\n  }\n  <ng-content></ng-content>\n  @if (showActions) {\n    <div class=\"flex gap-3 justify-end mt-6\">\n      <button\n        type=\"submit\"\n        class=\"px-4 py-2 rounded-lg border border-[var(--accent)] bg-[var(--accent)] text-[var(--text-on-accent)] font-medium cursor-pointer hover:bg-[var(--accent-hover)]\"\n      >\n        {{ submitText }}\n      </button>\n      <button\n        type=\"button\"\n        class=\"px-4 py-2 rounded-lg border border-[var(--border-color)] bg-transparent text-[var(--text-secondary)] cursor-pointer hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n        (click)=\"handleCancel()\"\n      >\n        {{ cancelText }}\n      </button>\n    </div>\n  }\n</form>\n" }]
        }], propDecorators: { heading: [{
                type: Input
            }], showActions: [{
                type: Input
            }], submitText: [{
                type: Input
            }], cancelText: [{
                type: Input
            }], submitted: [{
                type: Output
            }], cancelled: [{
                type: Output
            }] } });
registerSchemaComponent("app-form", FormComponent);

class CheckboxComponent {
    checked = false;
    label = "";
    disabled = false;
    changed = new EventEmitter();
    handleChange(e) {
        this.changed.emit(e.target.checked);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: CheckboxComponent, isStandalone: true, selector: "app-checkbox", inputs: { checked: "checked", label: "label", disabled: "disabled" }, outputs: { changed: "changed" }, ngImport: i0, template: "<label\n  appApplyTheme=\"app-checkbox\"\n  class=\"flex items-center gap-2 cursor-pointer\"\n>\n  <input\n    type=\"checkbox\"\n    class=\"w-4 h-4\"\n    [style.accent-color]=\"'var(--accent)'\"\n    [checked]=\"checked\"\n    [disabled]=\"disabled\"\n    (change)=\"handleChange($event)\"\n  />\n  @if (label) {\n    <span class=\"text-sm select-none text-[var(--text-primary)]\">{{\n      label\n    }}</span>\n  }\n</label>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-checkbox", standalone: true, imports: [ApplyThemeDirective], template: "<label\n  appApplyTheme=\"app-checkbox\"\n  class=\"flex items-center gap-2 cursor-pointer\"\n>\n  <input\n    type=\"checkbox\"\n    class=\"w-4 h-4\"\n    [style.accent-color]=\"'var(--accent)'\"\n    [checked]=\"checked\"\n    [disabled]=\"disabled\"\n    (change)=\"handleChange($event)\"\n  />\n  @if (label) {\n    <span class=\"text-sm select-none text-[var(--text-primary)]\">{{\n      label\n    }}</span>\n  }\n</label>\n" }]
        }], propDecorators: { checked: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-checkbox", CheckboxComponent);

let ToastComponent$1 = class ToastComponent {
    message = "";
    visible = false;
    type = "info";
    dismissed = new EventEmitter();
    timeout = null;
    get toastClasses() {
        const classes = [
            "toast",
            `toast-${this.type || "info"}`,
            "fixed",
            "bottom-6",
            "right-6",
            "z-[9999]",
            "flex",
            "items-center",
            "gap-2",
            "p-3",
            "rounded-lg",
            "bg-[color:var(--bg-elevated)]",
            "text-[color:var(--text-primary)]",
            "border",
            "border-[color:var(--border-color)]",
            "border-l-[3px]",
            "shadow-lg",
            "text-sm",
            "max-w-96",
            "translate-y-0",
            "opacity-100",
            "transition-all",
            "duration-300",
            this.borderColorClass,
        ];
        if (!this.visible) {
            classes.push("hidden");
        }
        return classes;
    }
    get borderColorClass() {
        switch (this.type) {
            case "success":
                return "border-l-[color:var(--success)]";
            case "error":
                return "border-l-[color:var(--error)]";
            case "warning":
                return "border-l-[color:var(--warning)]";
            case "info":
                return "border-l-[color:var(--info)]";
            default:
                return "border-l-[color:var(--border-color)]";
        }
    }
    ngOnChanges(changes) {
        if (changes["visible"] && this.visible) {
            this.clearTimeout();
            this.timeout = setTimeout(() => this.handleClose(), 4000);
        }
    }
    ngOnDestroy() {
        this.clearTimeout();
    }
    clearTimeout() {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    handleClose() {
        this.visible = false;
        this.clearTimeout();
        this.dismissed.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ToastComponent, isStandalone: true, selector: "app-toast", inputs: { message: "message", visible: "visible", type: "type" }, outputs: { dismissed: "dismissed" }, usesOnChanges: true, ngImport: i0, template: "<div [class]=\"toastClasses\">\n  @if (type === \"success\") {\n  <i\n    class=\"fa fa-circle-check toast-icon flex-shrink-0\"\n    style=\"font-size: 20px\"\n  ></i>\n  } @else if (type === \"error\") {\n  <i\n    class=\"fa fa-circle-xmark toast-icon flex-shrink-0\"\n    style=\"font-size: 20px\"\n  ></i>\n  } @else if (type === \"warning\") {\n  <i\n    class=\"fa fa-triangle-exclamation toast-icon flex-shrink-0\"\n    style=\"font-size: 20px\"\n  ></i>\n  } @else {\n  <i\n    class=\"fa fa-circle-info toast-icon flex-shrink-0\"\n    style=\"font-size: 20px\"\n  ></i>\n  }\n  <span class=\"toast-message flex-1\">{{ message }}</span>\n  <button\n    class=\"close-btn inline-flex items-center justify-center w-5 h-5 bg-transparent border-none cursor-pointer p-0 flex-shrink-0 text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]\"\n    type=\"button\"\n    (click)=\"handleClose()\"\n  >\n    <i class=\"fa fa-xmark\" style=\"font-size: 12px\"></i>\n  </button>\n</div>\n", styles: [""] });
};
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastComponent$1, decorators: [{
            type: Component,
            args: [{ selector: "app-toast", standalone: true, imports: [], template: "<div [class]=\"toastClasses\">\n  @if (type === \"success\") {\n  <i\n    class=\"fa fa-circle-check toast-icon flex-shrink-0\"\n    style=\"font-size: 20px\"\n  ></i>\n  } @else if (type === \"error\") {\n  <i\n    class=\"fa fa-circle-xmark toast-icon flex-shrink-0\"\n    style=\"font-size: 20px\"\n  ></i>\n  } @else if (type === \"warning\") {\n  <i\n    class=\"fa fa-triangle-exclamation toast-icon flex-shrink-0\"\n    style=\"font-size: 20px\"\n  ></i>\n  } @else {\n  <i\n    class=\"fa fa-circle-info toast-icon flex-shrink-0\"\n    style=\"font-size: 20px\"\n  ></i>\n  }\n  <span class=\"toast-message flex-1\">{{ message }}</span>\n  <button\n    class=\"close-btn inline-flex items-center justify-center w-5 h-5 bg-transparent border-none cursor-pointer p-0 flex-shrink-0 text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]\"\n    type=\"button\"\n    (click)=\"handleClose()\"\n  >\n    <i class=\"fa fa-xmark\" style=\"font-size: 12px\"></i>\n  </button>\n</div>\n" }]
        }], propDecorators: { message: [{
                type: Input
            }], visible: [{
                type: Input
            }], type: [{
                type: Input
            }], dismissed: [{
                type: Output
            }] } });
registerSchemaComponent("app-toast", ToastComponent$1);

// Use internal registry to avoid circular dependency with schema-component.registry
class NavItemComponent {
    icon = "";
    label = "";
    active = false;
    disabled = false;
    clicked = new EventEmitter();
    handleClick() {
        if (!this.disabled) {
            this.clicked.emit();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: NavItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: NavItemComponent, isStandalone: true, selector: "app-nav-item", inputs: { icon: "icon", label: "label", active: "active", disabled: "disabled" }, outputs: { clicked: "clicked" }, ngImport: i0, template: "<a\n  class=\"nav-item\"\n  [class.active]=\"active\"\n  [class.disabled]=\"disabled\"\n  (click)=\"handleClick()\"\n>\n  @if (icon) {\n    <span class=\"nav-icon\">{{ icon }}</span>\n  }\n  <span class=\"nav-label\"><ng-content></ng-content></span>\n</a>\n", styles: [":host{display:block}.nav-item{display:flex;align-items:center;gap:.75rem;padding:.5rem .75rem;border-radius:.375rem;color:var(--text-secondary);text-decoration:none;cursor:pointer;transition:all .15s}.nav-item:hover{background:var(--bg-hover);color:var(--text-primary)}.nav-item.active{background:var(--accent);color:var(--text-on-accent)}.nav-item.disabled{opacity:.4;cursor:not-allowed}.nav-icon{display:flex;align-items:center;font-size:1.25rem}.nav-label{flex:1}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: NavItemComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-nav-item", standalone: true, template: "<a\n  class=\"nav-item\"\n  [class.active]=\"active\"\n  [class.disabled]=\"disabled\"\n  (click)=\"handleClick()\"\n>\n  @if (icon) {\n    <span class=\"nav-icon\">{{ icon }}</span>\n  }\n  <span class=\"nav-label\"><ng-content></ng-content></span>\n</a>\n", styles: [":host{display:block}.nav-item{display:flex;align-items:center;gap:.75rem;padding:.5rem .75rem;border-radius:.375rem;color:var(--text-secondary);text-decoration:none;cursor:pointer;transition:all .15s}.nav-item:hover{background:var(--bg-hover);color:var(--text-primary)}.nav-item.active{background:var(--accent);color:var(--text-on-accent)}.nav-item.disabled{opacity:.4;cursor:not-allowed}.nav-icon{display:flex;align-items:center;font-size:1.25rem}.nav-label{flex:1}\n"] }]
        }], propDecorators: { icon: [{
                type: Input
            }], label: [{
                type: Input
            }], active: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-nav-item", NavItemComponent);

class NavGroupComponent {
    label = "";
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: NavGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: NavGroupComponent, isStandalone: true, selector: "app-nav-group", inputs: { label: "label" }, ngImport: i0, template: "<div class=\"nav-group\">\n  @if (label) {\n    <div class=\"nav-group-title\">{{ label }}</div>\n  }\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:block}.nav-group{margin-bottom:.5rem}.nav-group-title{padding:.5rem .75rem;font-size:.75rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: NavGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-nav-group", standalone: true, template: "<div class=\"nav-group\">\n  @if (label) {\n    <div class=\"nav-group-title\">{{ label }}</div>\n  }\n  <ng-content></ng-content>\n</div>\n", styles: [":host{display:block}.nav-group{margin-bottom:.5rem}.nav-group-title{padding:.5rem .75rem;font-size:.75rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.05em}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }] } });
registerSchemaComponent("app-nav-group", NavGroupComponent);

class CanvasToolbarComponent {
    zoomLevel = 100;
    showGrid = false;
    canUndo = false;
    canRedo = false;
    action = new EventEmitter();
    emit(name) {
        this.action.emit(name);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CanvasToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: CanvasToolbarComponent, isStandalone: true, selector: "app-canvas-toolbar", inputs: { zoomLevel: "zoomLevel", showGrid: "showGrid", canUndo: "canUndo", canRedo: "canRedo" }, outputs: { action: "action" }, ngImport: i0, template: "<div appApplyTheme=\"app-canvas-toolbar\" class=\"inline-flex items-center gap-1\">\n  <div class=\"flex items-center gap-0.5 px-1 toolbar-group\">\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 text-[var(--text-secondary)]\"\n      [disabled]=\"!canUndo\"\n      (click)=\"emit('undo')\"\n      title=\"Undo\"\n    >\n      <span class=\"text-lg leading-none\">\u21A9</span>\n    </button>\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 text-[var(--text-secondary)]\"\n      [disabled]=\"!canRedo\"\n      (click)=\"emit('redo')\"\n      title=\"Redo\"\n    >\n      <span class=\"text-lg leading-none\">\u21AA</span>\n    </button>\n  </div>\n  <div class=\"flex items-center gap-0.5 px-1 toolbar-group\">\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-100 text-[var(--text-secondary)]\"\n      (click)=\"emit('zoom-out')\"\n      title=\"Zoom Out\"\n    >\n      <span class=\"text-lg leading-none\">\u2212</span>\n    </button>\n    <span class=\"text-xs min-w-12 text-center text-[var(--text-secondary)]\"\n      >{{ zoomLevel }}%</span\n    >\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-100 text-[var(--text-secondary)]\"\n      (click)=\"emit('zoom-in')\"\n      title=\"Zoom In\"\n    >\n      <span class=\"text-lg leading-none\">+</span>\n    </button>\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-100 text-[var(--text-secondary)]\"\n      (click)=\"emit('zoom-reset')\"\n      title=\"Reset Zoom\"\n    >\n      <span class=\"text-lg leading-none\">\u22A1</span>\n    </button>\n  </div>\n  <div class=\"flex items-center gap-0.5 px-1 toolbar-group\">\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150\"\n      [class.bg-[var(--accent)]]=\"showGrid\"\n      [class.text-white]=\"showGrid\"\n      [class.text-[var(--text-secondary)]]=\"!showGrid\"\n      (click)=\"emit('toggle-grid')\"\n      title=\"Toggle Grid\"\n    >\n      <span class=\"text-lg leading-none\">\u25A6</span>\n    </button>\n  </div>\n</div>\n", styles: [":host{display:inline-flex;align-items:center;gap:4px}.toolbar-group:not(:last-child){border-right:1px solid var(--border-color)}.toolbar-btn[disabled]{opacity:.4;cursor:not-allowed}\n"], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CanvasToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-canvas-toolbar", standalone: true, imports: [ApplyThemeDirective], template: "<div appApplyTheme=\"app-canvas-toolbar\" class=\"inline-flex items-center gap-1\">\n  <div class=\"flex items-center gap-0.5 px-1 toolbar-group\">\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 text-[var(--text-secondary)]\"\n      [disabled]=\"!canUndo\"\n      (click)=\"emit('undo')\"\n      title=\"Undo\"\n    >\n      <span class=\"text-lg leading-none\">\u21A9</span>\n    </button>\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 text-[var(--text-secondary)]\"\n      [disabled]=\"!canRedo\"\n      (click)=\"emit('redo')\"\n      title=\"Redo\"\n    >\n      <span class=\"text-lg leading-none\">\u21AA</span>\n    </button>\n  </div>\n  <div class=\"flex items-center gap-0.5 px-1 toolbar-group\">\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-100 text-[var(--text-secondary)]\"\n      (click)=\"emit('zoom-out')\"\n      title=\"Zoom Out\"\n    >\n      <span class=\"text-lg leading-none\">\u2212</span>\n    </button>\n    <span class=\"text-xs min-w-12 text-center text-[var(--text-secondary)]\"\n      >{{ zoomLevel }}%</span\n    >\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-100 text-[var(--text-secondary)]\"\n      (click)=\"emit('zoom-in')\"\n      title=\"Zoom In\"\n    >\n      <span class=\"text-lg leading-none\">+</span>\n    </button>\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-100 text-[var(--text-secondary)]\"\n      (click)=\"emit('zoom-reset')\"\n      title=\"Reset Zoom\"\n    >\n      <span class=\"text-lg leading-none\">\u22A1</span>\n    </button>\n  </div>\n  <div class=\"flex items-center gap-0.5 px-1 toolbar-group\">\n    <button\n      class=\"inline-flex items-center justify-center w-8 h-8 border-none bg-transparent rounded-md cursor-pointer transition-colors duration-150\"\n      [class.bg-[var(--accent)]]=\"showGrid\"\n      [class.text-white]=\"showGrid\"\n      [class.text-[var(--text-secondary)]]=\"!showGrid\"\n      (click)=\"emit('toggle-grid')\"\n      title=\"Toggle Grid\"\n    >\n      <span class=\"text-lg leading-none\">\u25A6</span>\n    </button>\n  </div>\n</div>\n", styles: [":host{display:inline-flex;align-items:center;gap:4px}.toolbar-group:not(:last-child){border-right:1px solid var(--border-color)}.toolbar-btn[disabled]{opacity:.4;cursor:not-allowed}\n"] }]
        }], propDecorators: { zoomLevel: [{
                type: Input
            }], showGrid: [{
                type: Input
            }], canUndo: [{
                type: Input
            }], canRedo: [{
                type: Input
            }], action: [{
                type: Output
            }] } });
registerSchemaComponent("app-canvas-toolbar", CanvasToolbarComponent);

class DesignerSidebarComponent {
    position = "left";
    collapsed = false;
    header = "";
    collapsedChange = new EventEmitter();
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerSidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: DesignerSidebarComponent, isStandalone: true, selector: "app-designer-sidebar", inputs: { position: "position", collapsed: "collapsed", header: "header" }, outputs: { collapsedChange: "collapsedChange" }, ngImport: i0, template: "<div appApplyTheme=\"app-designer-sidebar\" class=\"relative h-full flex\">\n  <aside\n    class=\"flex flex-col h-full flex-shrink-0 transition-all duration-200 bg-[var(--bg-secondary)]\"\n    [class.w-0]=\"collapsed\"\n    [class.w-64]=\"!collapsed\"\n    [class.invisible]=\"collapsed\"\n    [class.overflow-hidden]=\"collapsed\"\n    [style.border-right]=\"\n      position === 'left' ? '1px solid var(--border-color)' : 'none'\n    \"\n    [style.border-left]=\"\n      position === 'right' ? '1px solid var(--border-color)' : 'none'\n    \"\n  >\n    <div\n      class=\"flex items-center justify-between px-4 py-3 flex-shrink-0 min-h-12 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]\"\n      [style.flex-direction]=\"position === 'right' ? 'row-reverse' : 'row'\"\n    >\n      <span class=\"text-sm font-semibold truncate text-[var(--text-primary)]\">{{\n        header\n      }}</span>\n    </div>\n    <div class=\"flex-1 overflow-auto min-h-0\">\n      <ng-content select=\"[slot=content]\"></ng-content>\n    </div>\n    <div class=\"px-4 py-3 flex-shrink-0 border-t border-[var(--border-color)]\">\n      <ng-content select=\"[slot=footer]\"></ng-content>\n    </div>\n  </aside>\n  <div\n    class=\"absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-12 rounded cursor-pointer transition-all duration-150 bg-[var(--bg-secondary)] border border-[var(--border-color)]\"\n    [style.right]=\"position === 'left' ? '-12px' : 'auto'\"\n    [style.left]=\"position === 'right' ? '-12px' : 'auto'\"\n  >\n    <button\n      class=\"flex items-center justify-center w-6 h-7 p-0 bg-transparent border-none rounded cursor-pointer transition-all duration-150 text-[var(--text-secondary)]\"\n      (click)=\"toggleCollapse()\"\n    >\n      {{\n        collapsed\n          ? position === \"left\"\n            ? \"\u25B6\"\n            : \"\u25C0\"\n          : position === \"left\"\n            ? \"\u25C0\"\n            : \"\u25B6\"\n      }}\n    </button>\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerSidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-designer-sidebar", standalone: true, imports: [ApplyThemeDirective], template: "<div appApplyTheme=\"app-designer-sidebar\" class=\"relative h-full flex\">\n  <aside\n    class=\"flex flex-col h-full flex-shrink-0 transition-all duration-200 bg-[var(--bg-secondary)]\"\n    [class.w-0]=\"collapsed\"\n    [class.w-64]=\"!collapsed\"\n    [class.invisible]=\"collapsed\"\n    [class.overflow-hidden]=\"collapsed\"\n    [style.border-right]=\"\n      position === 'left' ? '1px solid var(--border-color)' : 'none'\n    \"\n    [style.border-left]=\"\n      position === 'right' ? '1px solid var(--border-color)' : 'none'\n    \"\n  >\n    <div\n      class=\"flex items-center justify-between px-4 py-3 flex-shrink-0 min-h-12 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]\"\n      [style.flex-direction]=\"position === 'right' ? 'row-reverse' : 'row'\"\n    >\n      <span class=\"text-sm font-semibold truncate text-[var(--text-primary)]\">{{\n        header\n      }}</span>\n    </div>\n    <div class=\"flex-1 overflow-auto min-h-0\">\n      <ng-content select=\"[slot=content]\"></ng-content>\n    </div>\n    <div class=\"px-4 py-3 flex-shrink-0 border-t border-[var(--border-color)]\">\n      <ng-content select=\"[slot=footer]\"></ng-content>\n    </div>\n  </aside>\n  <div\n    class=\"absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-12 rounded cursor-pointer transition-all duration-150 bg-[var(--bg-secondary)] border border-[var(--border-color)]\"\n    [style.right]=\"position === 'left' ? '-12px' : 'auto'\"\n    [style.left]=\"position === 'right' ? '-12px' : 'auto'\"\n  >\n    <button\n      class=\"flex items-center justify-center w-6 h-7 p-0 bg-transparent border-none rounded cursor-pointer transition-all duration-150 text-[var(--text-secondary)]\"\n      (click)=\"toggleCollapse()\"\n    >\n      {{\n        collapsed\n          ? position === \"left\"\n            ? \"\u25B6\"\n            : \"\u25C0\"\n          : position === \"left\"\n            ? \"\u25C0\"\n            : \"\u25B6\"\n      }}\n    </button>\n  </div>\n</div>\n" }]
        }], propDecorators: { position: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], header: [{
                type: Input
            }], collapsedChange: [{
                type: Output
            }] } });
registerSchemaComponent("app-designer-sidebar", DesignerSidebarComponent);

class MainEditorComponent {
    designer = inject(DesignerCanvasService);
    zoomIn() {
        this.designer.setZoom(this.designer.zoom() + 10);
    }
    zoomOut() {
        this.designer.setZoom(this.designer.zoom() - 10);
    }
    deleteSelected() {
        const id = this.designer.selectedId();
        if (id)
            this.designer.deleteElement(id);
    }
    onCanvasClick(e) {
        const target = e.target;
        if (target.closest(".canvas-element"))
            return;
        this.designer.selectElement(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: MainEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: MainEditorComponent, isStandalone: true, selector: "app-main-editor", ngImport: i0, template: "<div\n  appApplyTheme=\"app-main-editor\"\n  class=\"flex flex-col h-full bg-[var(--bg-primary)]\"\n>\n  <div\n    class=\"flex items-center gap-1 py-[6px] px-3 bg-[var(--bg-elevated)] border-b border-[var(--border-color)] min-h-[2.5rem]\"\n  >\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 hover:disabled:opacity-30 text-[var(--text-secondary)] cursor-pointer\"\n      [disabled]=\"!designer.canUndo()\"\n      (click)=\"designer.undo()\"\n      title=\"Undo\"\n    >\n      <app-icon icon=\"undo\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 hover:disabled:opacity-30 text-[var(--text-secondary)] cursor-pointer\"\n      [disabled]=\"!designer.canRedo()\"\n      (click)=\"designer.redo()\"\n      title=\"Redo\"\n    >\n      <app-icon icon=\"redo\" [size]=\"18\" />\n    </button>\n    <div class=\"w-px h-5 mx-1 bg-[var(--border-color)]\"></div>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 text-[var(--text-secondary)]\"\n      [class.text-[var(--accent)]]]=\"designer.showGrid()\"\n      [class.text-[var(--text-secondary)]]]=\"!designer.showGrid()\"\n      [class.bg-[color-mix(in_srgb,_var(--accent)_15%,_transparent)]]]=\"\n        designer.showGrid()\n      \"\n      [class.bg-transparent]=\"!designer.showGrid()\"\n      (click)=\"designer.toggleGrid()\"\n      title=\"Toggle grid\"\n    >\n      <app-icon icon=\"grid\" [size]=\"18\" />\n    </button>\n    <div class=\"w-px h-5 mx-1 bg-[var(--border-color)]\"></div>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 text-[var(--text-secondary)]\"\n      (click)=\"zoomOut()\"\n      title=\"Zoom out\"\n    >\n      <app-icon icon=\"zoom_out\" [size]=\"18\" />\n    </button>\n    <span class=\"text-xs min-w-10 text-center text-[var(--text-secondary)]\"\n      >{{ designer.zoom() }}%</span\n    >\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 text-[var(--text-secondary)]\"\n      (click)=\"zoomIn()\"\n      title=\"Zoom in\"\n    >\n      <app-icon icon=\"zoom_in\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 text-[var(--text-secondary)]\"\n      (click)=\"designer.setZoom(100)\"\n      title=\"Reset zoom\"\n    >\n      <app-icon icon=\"fit_screen\" [size]=\"18\" />\n    </button>\n    <div class=\"flex-1\"></div>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 hover:disabled:opacity-30 text-[var(--text-secondary)] cursor-pointer\"\n      [disabled]=\"!designer.selectedId()\"\n      (click)=\"deleteSelected()\"\n      title=\"Delete selected\"\n    >\n      <app-icon icon=\"delete\" [size]=\"18\" />\n    </button>\n  </div>\n  <div class=\"flex-1 overflow-auto relative\" (click)=\"onCanvasClick($event)\">\n    <app-canvas></app-canvas>\n  </div>\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: CanvasComponent, selector: "app-canvas" }, { kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: MainEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-main-editor", standalone: true, schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [CommonModule, CanvasComponent, IconComponent, ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-main-editor\"\n  class=\"flex flex-col h-full bg-[var(--bg-primary)]\"\n>\n  <div\n    class=\"flex items-center gap-1 py-[6px] px-3 bg-[var(--bg-elevated)] border-b border-[var(--border-color)] min-h-[2.5rem]\"\n  >\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 hover:disabled:opacity-30 text-[var(--text-secondary)] cursor-pointer\"\n      [disabled]=\"!designer.canUndo()\"\n      (click)=\"designer.undo()\"\n      title=\"Undo\"\n    >\n      <app-icon icon=\"undo\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 hover:disabled:opacity-30 text-[var(--text-secondary)] cursor-pointer\"\n      [disabled]=\"!designer.canRedo()\"\n      (click)=\"designer.redo()\"\n      title=\"Redo\"\n    >\n      <app-icon icon=\"redo\" [size]=\"18\" />\n    </button>\n    <div class=\"w-px h-5 mx-1 bg-[var(--border-color)]\"></div>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 text-[var(--text-secondary)]\"\n      [class.text-[var(--accent)]]]=\"designer.showGrid()\"\n      [class.text-[var(--text-secondary)]]]=\"!designer.showGrid()\"\n      [class.bg-[color-mix(in_srgb,_var(--accent)_15%,_transparent)]]]=\"\n        designer.showGrid()\n      \"\n      [class.bg-transparent]=\"!designer.showGrid()\"\n      (click)=\"designer.toggleGrid()\"\n      title=\"Toggle grid\"\n    >\n      <app-icon icon=\"grid\" [size]=\"18\" />\n    </button>\n    <div class=\"w-px h-5 mx-1 bg-[var(--border-color)]\"></div>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 text-[var(--text-secondary)]\"\n      (click)=\"zoomOut()\"\n      title=\"Zoom out\"\n    >\n      <app-icon icon=\"zoom_out\" [size]=\"18\" />\n    </button>\n    <span class=\"text-xs min-w-10 text-center text-[var(--text-secondary)]\"\n      >{{ designer.zoom() }}%</span\n    >\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 text-[var(--text-secondary)]\"\n      (click)=\"zoomIn()\"\n      title=\"Zoom in\"\n    >\n      <app-icon icon=\"zoom_in\" [size]=\"18\" />\n    </button>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 text-[var(--text-secondary)]\"\n      (click)=\"designer.setZoom(100)\"\n      title=\"Reset zoom\"\n    >\n      <app-icon icon=\"fit_screen\" [size]=\"18\" />\n    </button>\n    <div class=\"flex-1\"></div>\n    <button\n      class=\"flex items-center justify-center w-8 h-8 rounded-md border-none bg-transparent text-base transition-all duration-150 hover:disabled:opacity-30 text-[var(--text-secondary)] cursor-pointer\"\n      [disabled]=\"!designer.selectedId()\"\n      (click)=\"deleteSelected()\"\n      title=\"Delete selected\"\n    >\n      <app-icon icon=\"delete\" [size]=\"18\" />\n    </button>\n  </div>\n  <div class=\"flex-1 overflow-auto relative\" (click)=\"onCanvasClick($event)\">\n    <app-canvas></app-canvas>\n  </div>\n</div>\n" }]
        }] });
registerSchemaComponent("app-main-editor", MainEditorComponent);

class CommandPaletteComponent {
    commands = [];
    placeholder = "Search commands...";
    triggerShortcut = "Ctrl+K";
    commandSelected = new EventEmitter();
    closed = new EventEmitter();
    isOpen = signal(false, ...(ngDevMode ? [{ debugName: "isOpen" }] : []));
    searchQuery = signal("", ...(ngDevMode ? [{ debugName: "searchQuery" }] : []));
    selectedIndex = signal(0, ...(ngDevMode ? [{ debugName: "selectedIndex" }] : []));
    onKeyDown(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === "k") {
            event.preventDefault();
            this.toggle();
            return;
        }
        if (!this.isOpen())
            return;
        switch (event.key) {
            case "Escape":
                event.preventDefault();
                this.close();
                break;
            case "ArrowDown":
                event.preventDefault();
                this.moveSelection(1);
                break;
            case "ArrowUp":
                event.preventDefault();
                this.moveSelection(-1);
                break;
            case "Enter":
                event.preventDefault();
                this.selectCurrent();
                break;
        }
    }
    toggle() {
        this.isOpen() ? this.close() : this.open();
    }
    open() {
        this.isOpen.set(true);
        this.searchQuery.set("");
        this.selectedIndex.set(0);
        document.body.style.overflow = "hidden";
    }
    close() {
        this.isOpen.set(false);
        this.searchQuery.set("");
        this.selectedIndex.set(0);
        document.body.style.overflow = "";
        this.closed.emit();
    }
    onSearchChange(query) {
        this.searchQuery.set(query);
        this.selectedIndex.set(0);
    }
    selectCommand(command) {
        if (command.disabled)
            return;
        this.commandSelected.emit(command);
        this.close();
    }
    moveSelection(delta) {
        const filtered = this.filteredCommands();
        if (filtered.length === 0)
            return;
        let idx = this.selectedIndex() + delta;
        if (idx < 0)
            idx = filtered.length - 1;
        if (idx >= filtered.length)
            idx = 0;
        if (filtered[idx]?.disabled) {
            idx += delta > 0 ? 1 : -1;
            if (idx < 0)
                idx = filtered.length - 1;
            if (idx >= filtered.length)
                idx = 0;
        }
        this.selectedIndex.set(idx);
    }
    selectCurrent() {
        const filtered = this.filteredCommands();
        const cmd = filtered[this.selectedIndex()];
        if (cmd && !cmd.disabled)
            this.selectCommand(cmd);
    }
    isSelected(command) {
        return this.filteredCommands()[this.selectedIndex()]?.id === command.id;
    }
    filteredCommands = () => {
        const q = this.searchQuery().toLowerCase().trim();
        if (!q)
            return this.commands;
        return this.commands.filter((c) => c.label.toLowerCase().includes(q) ||
            c.category?.toLowerCase().includes(q));
    };
    groupedCommands = () => {
        const map = new Map();
        for (const cmd of this.filteredCommands()) {
            const cat = cmd.category || "General";
            if (!map.has(cat))
                map.set(cat, []);
            map.get(cat).push(cmd);
        }
        return [...map.entries()].map(([key, value]) => ({ key, value }));
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CommandPaletteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: CommandPaletteComponent, isStandalone: true, selector: "app-command-palette", inputs: { commands: "commands", placeholder: "placeholder", triggerShortcut: "triggerShortcut" }, outputs: { commandSelected: "commandSelected", closed: "closed" }, host: { listeners: { "document:keydown": "onKeyDown($event)" } }, ngImport: i0, template: "@if (isOpen()) {\n  <div\n    appApplyTheme=\"app-command-palette\"\n    class=\"fixed inset-0 flex items-start justify-center pt-[15vh] z-[9999] animate-fade-in bg-[var(--bg-overlay,rgba(0,0,0,0.5))] backdrop-blur-[4px]\"\n    (click)=\"close()\"\n  >\n    <div\n      class=\"w-full max-w-[560px] rounded-xl overflow-hidden animate-slide-down bg-[var(--bg-elevated)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-[var(--border-subtle)]\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <div\n        class=\"flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]\"\n      >\n        <app-icon\n          class=\"text-xl text-gray-500 flex-shrink-0\"\n          icon=\"search\"\n          [size]=\"20\"\n        />\n        <input\n          type=\"text\"\n          class=\"flex-1 bg-transparent border-none outline-none text-base text-[var(--text-primary)]\"\n          [placeholder]=\"placeholder\"\n          [value]=\"searchQuery()\"\n          (input)=\"onSearchChange($any($event.target).value)\"\n          autofocus\n        />\n        <kbd\n          class=\"px-2 py-1 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-subtle)]\"\n          >Esc</kbd\n        >\n      </div>\n      <div class=\"max-h-[320px] overflow-y-auto\">\n        @if (filteredCommands().length === 0) {\n          <div\n            class=\"flex flex-col items-center justify-center gap-2 py-12 text-[var(--text-muted)]\"\n          >\n            <app-icon class=\"text-4xl\" icon=\"search\" [size]=\"40\" />\n            <span>No commands found</span>\n          </div>\n        } @else {\n          @for (group of groupedCommands(); track group.key) {\n            <div class=\"py-2\">\n              <div\n                class=\"px-4 py-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]\"\n              >\n                {{ group.key }}\n              </div>\n              @for (command of group.value; track command.id) {\n                <button\n                  type=\"button\"\n                  class=\"w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm border-none cursor-pointer transition-colors duration-100\"\n                  [class]=\"\n                    isSelected(command)\n                      ? 'bg-blue-50 hover:bg-blue-100'\n                      : 'hover:bg-gray-100'\n                  \"\n                  [class.opacity-50]=\"command.disabled\"\n                  [class.cursor-not-allowed]=\"command.disabled\"\n                  [class.text-[var(--text-primary)]]=\"!command.disabled\"\n                  [disabled]=\"command.disabled\"\n                  (click)=\"selectCommand(command)\"\n                >\n                  @if (command.icon) {\n                    <app-icon\n                      class=\"text-xl text-gray-500 flex-shrink-0\"\n                      [icon]=\"command.icon\"\n                      [size]=\"20\"\n                    />\n                  }\n                  <span class=\"flex-1\">{{ command.label }}</span>\n                  @if (command.shortcut) {\n                    <kbd\n                      class=\"px-1.5 py-0.5 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-subtle)]\"\n                      >{{ command.shortcut }}</kbd\n                    >\n                  }\n                </button>\n              }\n            </div>\n          }\n        }\n      </div>\n      <div\n        class=\"flex items-center gap-4 px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]\"\n      >\n        <span class=\"flex items-center gap-1 text-xs text-[var(--text-muted)]\"\n          ><kbd\n            class=\"px-1 py-0.5 text-[10px] rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]\"\n            >\u2191\u2193</kbd\n          >\n          Navigate</span\n        >\n        <span class=\"flex items-center gap-1 text-xs text-[var(--text-muted)]\"\n          ><kbd\n            class=\"px-1 py-0.5 text-[10px] rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]\"\n            >\u21B5</kbd\n          >\n          Select</span\n        >\n        <span class=\"flex items-center gap-1 text-xs text-[var(--text-muted)]\"\n          ><kbd\n            class=\"px-1 py-0.5 text-[10px] rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]\"\n            >Esc</kbd\n          >\n          Close</span\n        >\n      </div>\n    </div>\n  </div>\n}\n", styles: ["@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideDown{0%{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}.animate-fade-in{animation:fadeIn .15s ease-out}.animate-slide-down{animation:slideDown .15s ease-out}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CommandPaletteComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-command-palette", standalone: true, imports: [IconComponent, ApplyThemeDirective], template: "@if (isOpen()) {\n  <div\n    appApplyTheme=\"app-command-palette\"\n    class=\"fixed inset-0 flex items-start justify-center pt-[15vh] z-[9999] animate-fade-in bg-[var(--bg-overlay,rgba(0,0,0,0.5))] backdrop-blur-[4px]\"\n    (click)=\"close()\"\n  >\n    <div\n      class=\"w-full max-w-[560px] rounded-xl overflow-hidden animate-slide-down bg-[var(--bg-elevated)] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-[var(--border-subtle)]\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <div\n        class=\"flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]\"\n      >\n        <app-icon\n          class=\"text-xl text-gray-500 flex-shrink-0\"\n          icon=\"search\"\n          [size]=\"20\"\n        />\n        <input\n          type=\"text\"\n          class=\"flex-1 bg-transparent border-none outline-none text-base text-[var(--text-primary)]\"\n          [placeholder]=\"placeholder\"\n          [value]=\"searchQuery()\"\n          (input)=\"onSearchChange($any($event.target).value)\"\n          autofocus\n        />\n        <kbd\n          class=\"px-2 py-1 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-subtle)]\"\n          >Esc</kbd\n        >\n      </div>\n      <div class=\"max-h-[320px] overflow-y-auto\">\n        @if (filteredCommands().length === 0) {\n          <div\n            class=\"flex flex-col items-center justify-center gap-2 py-12 text-[var(--text-muted)]\"\n          >\n            <app-icon class=\"text-4xl\" icon=\"search\" [size]=\"40\" />\n            <span>No commands found</span>\n          </div>\n        } @else {\n          @for (group of groupedCommands(); track group.key) {\n            <div class=\"py-2\">\n              <div\n                class=\"px-4 py-1 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]\"\n              >\n                {{ group.key }}\n              </div>\n              @for (command of group.value; track command.id) {\n                <button\n                  type=\"button\"\n                  class=\"w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm border-none cursor-pointer transition-colors duration-100\"\n                  [class]=\"\n                    isSelected(command)\n                      ? 'bg-blue-50 hover:bg-blue-100'\n                      : 'hover:bg-gray-100'\n                  \"\n                  [class.opacity-50]=\"command.disabled\"\n                  [class.cursor-not-allowed]=\"command.disabled\"\n                  [class.text-[var(--text-primary)]]=\"!command.disabled\"\n                  [disabled]=\"command.disabled\"\n                  (click)=\"selectCommand(command)\"\n                >\n                  @if (command.icon) {\n                    <app-icon\n                      class=\"text-xl text-gray-500 flex-shrink-0\"\n                      [icon]=\"command.icon\"\n                      [size]=\"20\"\n                    />\n                  }\n                  <span class=\"flex-1\">{{ command.label }}</span>\n                  @if (command.shortcut) {\n                    <kbd\n                      class=\"px-1.5 py-0.5 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-subtle)]\"\n                      >{{ command.shortcut }}</kbd\n                    >\n                  }\n                </button>\n              }\n            </div>\n          }\n        }\n      </div>\n      <div\n        class=\"flex items-center gap-4 px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]\"\n      >\n        <span class=\"flex items-center gap-1 text-xs text-[var(--text-muted)]\"\n          ><kbd\n            class=\"px-1 py-0.5 text-[10px] rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]\"\n            >\u2191\u2193</kbd\n          >\n          Navigate</span\n        >\n        <span class=\"flex items-center gap-1 text-xs text-[var(--text-muted)]\"\n          ><kbd\n            class=\"px-1 py-0.5 text-[10px] rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]\"\n            >\u21B5</kbd\n          >\n          Select</span\n        >\n        <span class=\"flex items-center gap-1 text-xs text-[var(--text-muted)]\"\n          ><kbd\n            class=\"px-1 py-0.5 text-[10px] rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]\"\n            >Esc</kbd\n          >\n          Close</span\n        >\n      </div>\n    </div>\n  </div>\n}\n", styles: ["@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideDown{0%{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}.animate-fade-in{animation:fadeIn .15s ease-out}.animate-slide-down{animation:slideDown .15s ease-out}\n"] }]
        }], propDecorators: { commands: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], triggerShortcut: [{
                type: Input
            }], commandSelected: [{
                type: Output
            }], closed: [{
                type: Output
            }], onKeyDown: [{
                type: HostListener,
                args: ["document:keydown", ["$event"]]
            }] } });
registerSchemaComponent("app-command-palette", CommandPaletteComponent);

class DesignerTreeNodeComponent {
    node;
    depth = 0;
    select = new EventEmitter();
    toggle(e) {
        e.stopPropagation();
        this.node.expanded = !this.node.expanded;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerTreeNodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: DesignerTreeNodeComponent, isStandalone: true, selector: "app-designer-tree-node", inputs: { node: "node", depth: "depth" }, outputs: { select: "select" }, ngImport: i0, template: "<div\n  class=\"flex items-center gap-2 px-2 py-1 cursor-pointer rounded transition-colors duration-100\"\n  [style.paddingLeft.px]=\"depth * 16 + 8\"\n  [class.bg-[color-mix(in_srgb,_var(--accent)_20%,_transparent)]]]=\"\n    node.selected\n  \"\n  [class.bg-transparent]=\"!node.selected\"\n  [class.text-[var(--accent)]]=\"node.selected\"\n  [style.color]=\"node.selected ? 'var(--accent)' : 'inherit'\"\n  (click)=\"select.emit(node)\"\n>\n  <span\n    class=\"w-3 text-center flex-shrink-0 cursor-pointer text-xs text-[var(--text-muted)]\"\n    (click)=\"toggle($event)\"\n  >\n    @if (node.children?.length) {\n      {{ node.expanded ? \"\u25BC\" : \"\u25B6\" }}\n    }\n  </span>\n  <span class=\"text-sm flex-shrink-0 text-[var(--text-secondary)]\">{{\n    node.icon\n  }}</span>\n  <span\n    class=\"text-sm flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[var(--text-primary)]\"\n    >{{ node.label }}</span\n  >\n  <span class=\"text-xs font-mono text-[var(--text-muted)]\">{{ node.id }}</span>\n</div>\n@if (node.expanded && node.children?.length) {\n  @for (child of node.children; track child.id) {\n    <app-designer-tree-node\n      [node]=\"child\"\n      [depth]=\"depth + 1\"\n      (select)=\"select.emit($event)\"\n    ></app-designer-tree-node>\n  }\n}\n", dependencies: [{ kind: "component", type: DesignerTreeNodeComponent, selector: "app-designer-tree-node", inputs: ["node", "depth"], outputs: ["select"] }, { kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerTreeNodeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-designer-tree-node", standalone: true, imports: [CommonModule], template: "<div\n  class=\"flex items-center gap-2 px-2 py-1 cursor-pointer rounded transition-colors duration-100\"\n  [style.paddingLeft.px]=\"depth * 16 + 8\"\n  [class.bg-[color-mix(in_srgb,_var(--accent)_20%,_transparent)]]]=\"\n    node.selected\n  \"\n  [class.bg-transparent]=\"!node.selected\"\n  [class.text-[var(--accent)]]=\"node.selected\"\n  [style.color]=\"node.selected ? 'var(--accent)' : 'inherit'\"\n  (click)=\"select.emit(node)\"\n>\n  <span\n    class=\"w-3 text-center flex-shrink-0 cursor-pointer text-xs text-[var(--text-muted)]\"\n    (click)=\"toggle($event)\"\n  >\n    @if (node.children?.length) {\n      {{ node.expanded ? \"\u25BC\" : \"\u25B6\" }}\n    }\n  </span>\n  <span class=\"text-sm flex-shrink-0 text-[var(--text-secondary)]\">{{\n    node.icon\n  }}</span>\n  <span\n    class=\"text-sm flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[var(--text-primary)]\"\n    >{{ node.label }}</span\n  >\n  <span class=\"text-xs font-mono text-[var(--text-muted)]\">{{ node.id }}</span>\n</div>\n@if (node.expanded && node.children?.length) {\n  @for (child of node.children; track child.id) {\n    <app-designer-tree-node\n      [node]=\"child\"\n      [depth]=\"depth + 1\"\n      (select)=\"select.emit($event)\"\n    ></app-designer-tree-node>\n  }\n}\n" }]
        }], propDecorators: { node: [{
                type: Input,
                args: [{ required: true }]
            }], depth: [{
                type: Input
            }], select: [{
                type: Output
            }] } });

class DesignerTreeComponent {
    designer = inject(DesignerCanvasService);
    treeNodes = computed(() => this.elementsToTree(this.designer.elements(), this.designer.selectedId()), ...(ngDevMode ? [{ debugName: "treeNodes" }] : []));
    elementsToTree(els, selectedId) {
        return els.map((el) => ({
            id: el.id,
            label: el.componentId,
            icon: this.getIcon(el.componentId),
            expanded: true,
            selected: el.id === selectedId,
            children: el.children
                ? this.elementsToTree(el.children, selectedId)
                : undefined,
        }));
    }
    selectNode(node) {
        this.designer.selectElement(node.id);
    }
    getIcon(componentId) {
        const icons = {
            "app-button": "▣",
            "app-text": "A",
            "app-block": "⊞",
            "app-icon": "◇",
            "app-text-input": "✎",
            "app-translation-output": "📄",
            "app-language-selector": "🌐",
        };
        return icons[componentId] || "⊡";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerTreeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: DesignerTreeComponent, isStandalone: true, selector: "app-designer-tree", ngImport: i0, template: "<div\n  appApplyTheme=\"app-designer-tree\"\n  class=\"flex flex-col h-full bg-[var(--bg-elevated)]\"\n>\n  <div\n    class=\"px-4 py-3 text-xs font-semibold uppercase tracking-wide border-b text-[var(--text-secondary)] border-[var(--border-color)]\"\n  >\n    Layers\n  </div>\n  <div class=\"flex-1 overflow-y-auto py-1 text-sm\">\n    @for (node of treeNodes(); track node.id) {\n      <app-designer-tree-node\n        [node]=\"node\"\n        [depth]=\"0\"\n        (select)=\"selectNode($event)\"\n      ></app-designer-tree-node>\n    }\n    @if (treeNodes().length === 0) {\n      <div class=\"px-4 py-3 text-center text-[var(--text-muted)]\">\n        No elements\n      </div>\n    }\n  </div>\n</div>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: DesignerTreeNodeComponent, selector: "app-designer-tree-node", inputs: ["node", "depth"], outputs: ["select"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: DesignerTreeComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-designer-tree", standalone: true, imports: [CommonModule, DesignerTreeNodeComponent, ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-designer-tree\"\n  class=\"flex flex-col h-full bg-[var(--bg-elevated)]\"\n>\n  <div\n    class=\"px-4 py-3 text-xs font-semibold uppercase tracking-wide border-b text-[var(--text-secondary)] border-[var(--border-color)]\"\n  >\n    Layers\n  </div>\n  <div class=\"flex-1 overflow-y-auto py-1 text-sm\">\n    @for (node of treeNodes(); track node.id) {\n      <app-designer-tree-node\n        [node]=\"node\"\n        [depth]=\"0\"\n        (select)=\"selectNode($event)\"\n      ></app-designer-tree-node>\n    }\n    @if (treeNodes().length === 0) {\n      <div class=\"px-4 py-3 text-center text-[var(--text-muted)]\">\n        No elements\n      </div>\n    }\n  </div>\n</div>\n" }]
        }] });
registerSchemaComponent("app-designer-tree", DesignerTreeComponent);

class LanguageSelectorComponent {
    label = "";
    labelId = "";
    value = "";
    languages = [];
    placeholder = "";
    width = "";
    changed = new EventEmitter();
    get parsedLanguages() {
        return parseJsonOrDefault(this.languages).map((lang) => ({
            value: lang.value ?? lang.code ?? "",
            label: lang.label ?? lang.name ?? lang.code ?? "",
        }));
    }
    handleChange(e) {
        this.value = e.target.value;
        this.changed.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LanguageSelectorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: LanguageSelectorComponent, isStandalone: true, selector: "app-language-selector", inputs: { label: "label", labelId: "labelId", value: "value", languages: "languages", placeholder: "placeholder", width: "width" }, outputs: { changed: "changed" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-language-selector\"\n  class=\"relative inline-flex items-center gap-2\"\n>\n  @if (label) {\n    <label\n      [attr.id]=\"labelId\"\n      class=\"text-sm text-[var(--text-secondary)] whitespace-nowrap\"\n      >{{ label }}</label\n    >\n  }\n  <select\n    [value]=\"value\"\n    (change)=\"handleChange($event)\"\n    [attr.aria-labelledby]=\"labelId || null\"\n    class=\"p-1.5 pr-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-sm cursor-pointer appearance-none min-w-28\"\n  >\n    @for (lang of parsedLanguages; track lang.value) {\n      <option [value]=\"lang.value\" [selected]=\"lang.value === value\">\n        {{ lang.label }}\n      </option>\n    }\n  </select>\n  <app-icon\n    class=\"absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none\"\n    icon=\"chevron-down\"\n    [size]=\"16\"\n  />\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LanguageSelectorComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-language-selector", standalone: true, imports: [IconComponent, ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-language-selector\"\n  class=\"relative inline-flex items-center gap-2\"\n>\n  @if (label) {\n    <label\n      [attr.id]=\"labelId\"\n      class=\"text-sm text-[var(--text-secondary)] whitespace-nowrap\"\n      >{{ label }}</label\n    >\n  }\n  <select\n    [value]=\"value\"\n    (change)=\"handleChange($event)\"\n    [attr.aria-labelledby]=\"labelId || null\"\n    class=\"p-1.5 pr-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-sm cursor-pointer appearance-none min-w-28\"\n  >\n    @for (lang of parsedLanguages; track lang.value) {\n      <option [value]=\"lang.value\" [selected]=\"lang.value === value\">\n        {{ lang.label }}\n      </option>\n    }\n  </select>\n  <app-icon\n    class=\"absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none\"\n    icon=\"chevron-down\"\n    [size]=\"16\"\n  />\n</div>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], labelId: [{
                type: Input
            }], value: [{
                type: Input
            }], languages: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], width: [{
                type: Input
            }], changed: [{
                type: Output
            }] } });
registerSchemaComponent("app-language-selector", LanguageSelectorComponent);

class SwapButtonComponent {
    ariaLabel = "";
    align = "";
    direction = "";
    height = "";
    justify = "";
    layout = "";
    width = "";
    clicked = new EventEmitter();
    hovered = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SwapButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: SwapButtonComponent, isStandalone: true, selector: "app-swap-button", inputs: { ariaLabel: "ariaLabel", align: "align", direction: "direction", height: "height", justify: "justify", layout: "layout", width: "width" }, outputs: { clicked: "clicked" }, ngImport: i0, template: "<button\n  appApplyTheme=\"app-swap-button\"\n  class=\"inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] cursor-pointer transition-all p-0 text-[var(--text-secondary)]\"\n  (mouseenter)=\"hovered = true\"\n  (mouseleave)=\"hovered = false\"\n  [class.bg-[var(--bg-hover)]]]=\"hovered\"\n  [class.bg-[var(--bg-elevated)]]]=\"!hovered\"\n  [class.text-[var(--text-primary)]]]=\"hovered\"\n  [class.text-[var(--text-secondary)]]]=\"!hovered\"\n  (click)=\"clicked.emit($event)\"\n  aria-label=\"Swap\"\n>\n  <app-icon icon=\"chevron-down\" [size]=\"20\" style=\"transform: rotate(90deg)\" />\n</button>\n", dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SwapButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-swap-button", standalone: true, imports: [IconComponent, ApplyThemeDirective], template: "<button\n  appApplyTheme=\"app-swap-button\"\n  class=\"inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-elevated)] cursor-pointer transition-all p-0 text-[var(--text-secondary)]\"\n  (mouseenter)=\"hovered = true\"\n  (mouseleave)=\"hovered = false\"\n  [class.bg-[var(--bg-hover)]]]=\"hovered\"\n  [class.bg-[var(--bg-elevated)]]]=\"!hovered\"\n  [class.text-[var(--text-primary)]]]=\"hovered\"\n  [class.text-[var(--text-secondary)]]]=\"!hovered\"\n  (click)=\"clicked.emit($event)\"\n  aria-label=\"Swap\"\n>\n  <app-icon icon=\"chevron-down\" [size]=\"20\" style=\"transform: rotate(90deg)\" />\n</button>\n" }]
        }], propDecorators: { ariaLabel: [{
                type: Input
            }], align: [{
                type: Input
            }], direction: [{
                type: Input
            }], height: [{
                type: Input
            }], justify: [{
                type: Input
            }], layout: [{
                type: Input
            }], width: [{
                type: Input
            }], clicked: [{
                type: Output
            }] } });
registerSchemaComponent("app-swap-button", SwapButtonComponent);

class TextInputComponent {
    textareaEl;
    value = "";
    placeholder = "";
    clearable = false;
    maxChars = 0;
    autofocus = false;
    height = "";
    label = "";
    multiline = true;
    rows = 3;
    width = "";
    input = new EventEmitter();
    focused = false;
    hovered = false;
    ngAfterViewInit() {
        if (this.autofocus) {
            setTimeout(() => this.textareaEl.nativeElement.focus());
        }
    }
    handleInput(e) {
        this.value = e.target.value;
        this.input.emit(this.value);
        this.autoResize();
    }
    autoResize() {
        if (this.textareaEl) {
            const el = this.textareaEl.nativeElement;
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
        }
    }
    clear() {
        this.value = "";
        this.input.emit("");
        if (this.textareaEl) {
            this.textareaEl.nativeElement.style.height = "auto";
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TextInputComponent, isStandalone: true, selector: "app-text-input", inputs: { value: "value", placeholder: "placeholder", clearable: "clearable", maxChars: "maxChars", autofocus: "autofocus", height: "height", label: "label", multiline: "multiline", rows: "rows", width: "width" }, outputs: { input: "input" }, viewQueries: [{ propertyName: "textareaEl", first: true, predicate: ["textareaEl"], descendants: true }], ngImport: i0, template: "<div appApplyTheme=\"app-text-input\" class=\"relative\">\n  <textarea\n    #textareaEl\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxChars || null\"\n    (input)=\"handleInput($event)\"\n    (focus)=\"focused = true\"\n    (blur)=\"focused = false\"\n    [style.--tw-border-color]=\"\n      focused ? 'var(--accent)' : 'var(--border-color)'\n    \"\n    class=\"w-full p-2 px-3 rounded-lg border box-border outline-none resize-none min-h-10 font-inherit text-base bg-[var(--bg-primary)] text-[var(--text-primary)]\"\n    [class.focused]=\"focused\"\n  ></textarea>\n  @if (clearable && value) {\n    <button\n      class=\"absolute right-2 top-2 bg-transparent border-none cursor-pointer p-0 leading-none text-xl text-[var(--text-secondary)]\"\n      (mouseenter)=\"hovered = true\"\n      (mouseleave)=\"hovered = false\"\n      [style.color]=\"hovered ? 'var(--text-primary)' : 'var(--text-secondary)'\"\n      (click)=\"clear()\"\n      aria-label=\"Clear\"\n    >\n      &times;\n    </button>\n  }\n  @if (maxChars) {\n    <span class=\"absolute right-2 bottom-1 text-xs text-[var(--text-muted)]\"\n      >{{ value.length }}/{{ maxChars }}</span\n    >\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextInputComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-text-input", standalone: true, imports: [ApplyThemeDirective], template: "<div appApplyTheme=\"app-text-input\" class=\"relative\">\n  <textarea\n    #textareaEl\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxChars || null\"\n    (input)=\"handleInput($event)\"\n    (focus)=\"focused = true\"\n    (blur)=\"focused = false\"\n    [style.--tw-border-color]=\"\n      focused ? 'var(--accent)' : 'var(--border-color)'\n    \"\n    class=\"w-full p-2 px-3 rounded-lg border box-border outline-none resize-none min-h-10 font-inherit text-base bg-[var(--bg-primary)] text-[var(--text-primary)]\"\n    [class.focused]=\"focused\"\n  ></textarea>\n  @if (clearable && value) {\n    <button\n      class=\"absolute right-2 top-2 bg-transparent border-none cursor-pointer p-0 leading-none text-xl text-[var(--text-secondary)]\"\n      (mouseenter)=\"hovered = true\"\n      (mouseleave)=\"hovered = false\"\n      [style.color]=\"hovered ? 'var(--text-primary)' : 'var(--text-secondary)'\"\n      (click)=\"clear()\"\n      aria-label=\"Clear\"\n    >\n      &times;\n    </button>\n  }\n  @if (maxChars) {\n    <span class=\"absolute right-2 bottom-1 text-xs text-[var(--text-muted)]\"\n      >{{ value.length }}/{{ maxChars }}</span\n    >\n  }\n</div>\n" }]
        }], propDecorators: { textareaEl: [{
                type: ViewChild,
                args: ["textareaEl"]
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], clearable: [{
                type: Input
            }], maxChars: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], height: [{
                type: Input
            }], label: [{
                type: Input
            }], multiline: [{
                type: Input
            }], rows: [{
                type: Input
            }], width: [{
                type: Input
            }], input: [{
                type: Output
            }] } });
registerSchemaComponent("app-text-input", TextInputComponent);

class TranslationOutputComponent {
    value = "";
    placeholder = "";
    loading = false;
    showConfidence = false;
    showCopyButton = true;
    confidence = 0;
    height = "";
    width = "";
    copied = new EventEmitter();
    isCopied = false;
    hovered = false;
    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.value);
            this.isCopied = true;
            this.copied.emit();
            setTimeout(() => (this.isCopied = false), 2000);
        }
        catch {
            /* clipboard not available */
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TranslationOutputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TranslationOutputComponent, isStandalone: true, selector: "app-translation-output", inputs: { value: "value", placeholder: "placeholder", loading: "loading", showConfidence: "showConfidence", showCopyButton: "showCopyButton", confidence: "confidence", height: "height", width: "width" }, outputs: { copied: "copied" }, ngImport: i0, template: "<div appApplyTheme=\"app-translation-output\" class=\"relative\">\n  <textarea\n    #outputEl\n    class=\"w-full p-3 rounded-lg border box-border resize-none min-h-20 cursor-default font-inherit text-base bg-[var(--bg-primary)] text-[var(--text-primary)]\"\n    [value]=\"value\"\n    [placeholder]=\"placeholder || 'Translation will appear here...'\"\n    readonly\n  ></textarea>\n  @if (showCopyButton && value) {\n    <button\n      class=\"absolute right-2 top-2 flex items-center gap-1 p-1.5 rounded-md border cursor-pointer transition-all text-xs border-[var(--border-color)]\"\n      [style.background-color]=\"\n        hovered ? 'var(--bg-hover)' : 'var(--bg-elevated)'\n      \"\n      [style.color]=\"hovered ? 'var(--text-primary)' : 'var(--text-secondary)'\"\n      (mouseenter)=\"hovered = true\"\n      (mouseleave)=\"hovered = false\"\n      (click)=\"copyToClipboard()\"\n      aria-label=\"Copy\"\n    >\n      @if (isCopied) {\n        <span class=\"text-[var(--success)]\">Copied!</span>\n      } @else {\n        <app-icon icon=\"copy\" [size]=\"14\" />\n      }\n    </button>\n  }\n</div>\n", styles: [""], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TranslationOutputComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-translation-output", standalone: true, imports: [IconComponent, ApplyThemeDirective], template: "<div appApplyTheme=\"app-translation-output\" class=\"relative\">\n  <textarea\n    #outputEl\n    class=\"w-full p-3 rounded-lg border box-border resize-none min-h-20 cursor-default font-inherit text-base bg-[var(--bg-primary)] text-[var(--text-primary)]\"\n    [value]=\"value\"\n    [placeholder]=\"placeholder || 'Translation will appear here...'\"\n    readonly\n  ></textarea>\n  @if (showCopyButton && value) {\n    <button\n      class=\"absolute right-2 top-2 flex items-center gap-1 p-1.5 rounded-md border cursor-pointer transition-all text-xs border-[var(--border-color)]\"\n      [style.background-color]=\"\n        hovered ? 'var(--bg-hover)' : 'var(--bg-elevated)'\n      \"\n      [style.color]=\"hovered ? 'var(--text-primary)' : 'var(--text-secondary)'\"\n      (mouseenter)=\"hovered = true\"\n      (mouseleave)=\"hovered = false\"\n      (click)=\"copyToClipboard()\"\n      aria-label=\"Copy\"\n    >\n      @if (isCopied) {\n        <span class=\"text-[var(--success)]\">Copied!</span>\n      } @else {\n        <app-icon icon=\"copy\" [size]=\"14\" />\n      }\n    </button>\n  }\n</div>\n" }]
        }], propDecorators: { value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], loading: [{
                type: Input
            }], showConfidence: [{
                type: Input
            }], showCopyButton: [{
                type: Input
            }], confidence: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], copied: [{
                type: Output
            }] } });
registerSchemaComponent("app-translation-output", TranslationOutputComponent);

class ThemeToggleComponent {
    themeService = inject(StyleThemeService);
    subscription;
    isDark = false;
    hovered = false;
    ngOnInit() {
        this.isDark = this.themeService.isDarkMode();
        this.subscription = this.themeService.themeChanged$.subscribe((state) => {
            this.isDark = state.isDark;
        });
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    toggle() {
        this.themeService.toggleDarkMode();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ThemeToggleComponent, isStandalone: true, selector: "app-theme-toggle", ngImport: i0, template: "<button\n  appApplyTheme=\"app-theme-toggle\"\n  class=\"inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] bg-transparent cursor-pointer transition-all p-0 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n  (mouseenter)=\"hovered = true\"\n  (mouseleave)=\"hovered = false\"\n  (click)=\"toggle()\"\n  aria-label=\"Toggle theme\"\n>\n  @if (isDark) {\n    <app-icon icon=\"moon\" [size]=\"20\" />\n  } @else {\n    <app-icon icon=\"sun\" [size]=\"20\" />\n  }\n</button>\n", styles: [""], dependencies: [{ kind: "component", type: IconComponent, selector: "app-icon", inputs: ["icon", "size"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-theme-toggle", standalone: true, imports: [IconComponent, ApplyThemeDirective], template: "<button\n  appApplyTheme=\"app-theme-toggle\"\n  class=\"inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] bg-transparent cursor-pointer transition-all p-0 text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]\"\n  (mouseenter)=\"hovered = true\"\n  (mouseleave)=\"hovered = false\"\n  (click)=\"toggle()\"\n  aria-label=\"Toggle theme\"\n>\n  @if (isDark) {\n    <app-icon icon=\"moon\" [size]=\"20\" />\n  } @else {\n    <app-icon icon=\"sun\" [size]=\"20\" />\n  }\n</button>\n" }]
        }] });
registerSchemaComponent("app-theme-toggle", ThemeToggleComponent);

class ShortcutsOverlayComponent {
    visible = false;
    title = "Keyboard Shortcuts";
    shortcuts = "[]";
    closed = new EventEmitter();
    trigger = "";
    hovered = false;
    get parsedShortcuts() {
        return parseJsonOrDefault(this.shortcuts);
    }
    close() {
        this.visible = false;
        this.closed.emit();
    }
    onEscape() {
        if (this.visible)
            this.close();
    }
    open() {
        this.visible = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutsOverlayComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ShortcutsOverlayComponent, isStandalone: true, selector: "app-shortcuts-overlay", inputs: { visible: "visible", title: "title", shortcuts: "shortcuts", trigger: "trigger" }, outputs: { closed: "closed" }, host: { listeners: { "window:keydown.escape": "onEscape()" } }, ngImport: i0, template: "@if (visible) {\n  <div\n    appApplyTheme=\"app-shortcuts-overlay\"\n    class=\"fixed inset-0 bg-[var(--bg-overlay,rgba(0,0,0,0.5))] flex items-center justify-center z-50\"\n    (click)=\"close()\"\n  >\n    <div\n      class=\"bg-[var(--bg-elevated)] border rounded-3xl w-[480px] max-w-[90vw] max-h-[80vh] overflow-y-auto shadow-2xl\"\n      [style.--tw-border-color]=\"'var(--border-color)'\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <div class=\"flex items-center justify-between p-5 border-b\">\n        <h3 class=\"m-0 text-lg font-semibold text-[var(--text-primary)]\">\n          {{ title || \"Keyboard Shortcuts\" }}\n        </h3>\n        <button\n          class=\"bg-transparent border-none cursor-pointer p-1 rounded text-2xl leading-none\"\n          [style.color]=\"\n            hovered ? 'var(--text-primary)' : 'var(--text-secondary)'\n          \"\n          (mouseenter)=\"hovered = true\"\n          (mouseleave)=\"hovered = false\"\n          (click)=\"close()\"\n          aria-label=\"Close\"\n        >\n          &times;\n        </button>\n      </div>\n      <div class=\"p-4\">\n        @for (shortcut of parsedShortcuts; track shortcut.key) {\n          <div class=\"flex items-center gap-4 py-2\">\n            <kbd\n              class=\"px-2 py-1 rounded border text-[var(--text-primary)] font-mono text-sm min-w-[60px] text-center border-[var(--border-color)] bg-[var(--bg-primary)]\"\n              [style.--tw-border-color]=\"'var(--border-color)'\"\n              >{{ shortcut.key }}</kbd\n            >\n            <span class=\"text-[var(--text-secondary)] text-sm\">{{\n              shortcut.description\n            }}</span>\n          </div>\n        }\n      </div>\n    </div>\n  </div>\n}\n", styles: [""], dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutsOverlayComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-shortcuts-overlay", standalone: true, imports: [ApplyThemeDirective], template: "@if (visible) {\n  <div\n    appApplyTheme=\"app-shortcuts-overlay\"\n    class=\"fixed inset-0 bg-[var(--bg-overlay,rgba(0,0,0,0.5))] flex items-center justify-center z-50\"\n    (click)=\"close()\"\n  >\n    <div\n      class=\"bg-[var(--bg-elevated)] border rounded-3xl w-[480px] max-w-[90vw] max-h-[80vh] overflow-y-auto shadow-2xl\"\n      [style.--tw-border-color]=\"'var(--border-color)'\"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <div class=\"flex items-center justify-between p-5 border-b\">\n        <h3 class=\"m-0 text-lg font-semibold text-[var(--text-primary)]\">\n          {{ title || \"Keyboard Shortcuts\" }}\n        </h3>\n        <button\n          class=\"bg-transparent border-none cursor-pointer p-1 rounded text-2xl leading-none\"\n          [style.color]=\"\n            hovered ? 'var(--text-primary)' : 'var(--text-secondary)'\n          \"\n          (mouseenter)=\"hovered = true\"\n          (mouseleave)=\"hovered = false\"\n          (click)=\"close()\"\n          aria-label=\"Close\"\n        >\n          &times;\n        </button>\n      </div>\n      <div class=\"p-4\">\n        @for (shortcut of parsedShortcuts; track shortcut.key) {\n          <div class=\"flex items-center gap-4 py-2\">\n            <kbd\n              class=\"px-2 py-1 rounded border text-[var(--text-primary)] font-mono text-sm min-w-[60px] text-center border-[var(--border-color)] bg-[var(--bg-primary)]\"\n              [style.--tw-border-color]=\"'var(--border-color)'\"\n              >{{ shortcut.key }}</kbd\n            >\n            <span class=\"text-[var(--text-secondary)] text-sm\">{{\n              shortcut.description\n            }}</span>\n          </div>\n        }\n      </div>\n    </div>\n  </div>\n}\n" }]
        }], propDecorators: { visible: [{
                type: Input
            }], title: [{
                type: Input
            }], shortcuts: [{
                type: Input
            }], closed: [{
                type: Output
            }], trigger: [{
                type: Input
            }], onEscape: [{
                type: HostListener,
                args: ["window:keydown.escape"]
            }] } });
registerSchemaComponent("app-shortcuts-overlay", ShortcutsOverlayComponent);

class BlockComponent {
    display = "flex";
    direction = "column";
    align = "stretch";
    justify = "start";
    wrap = "nowrap";
    gap = "";
    padding = "";
    width = "";
    height = "";
    flex = "";
    overflow = "";
    inline = false;
    children = [];
    get alignCss() {
        const map = {
            start: "flex-start",
            center: "center",
            end: "flex-end",
            stretch: "stretch",
            baseline: "baseline",
        };
        return map[this.align] || "stretch";
    }
    get justifyCss() {
        const map = {
            start: "flex-start",
            center: "center",
            end: "flex-end",
            between: "space-between",
            around: "space-around",
            evenly: "space-evenly",
        };
        return map[this.justify] || "flex-start";
    }
    get gapCss() {
        if (!this.gap)
            return "";
        if (/^\d+$/.test(this.gap))
            return `${this.gap}px`;
        return this.gap;
    }
    get paddingCss() {
        if (!this.padding)
            return "";
        if (/^\d+$/.test(this.padding))
            return `${this.padding}px`;
        return this.padding;
    }
    get widthCss() {
        if (!this.width)
            return "";
        if (this.width === "full")
            return "100%";
        if (this.width === "screen")
            return "100vw";
        if (/^\d+$/.test(this.width))
            return `${this.width}px`;
        return this.width;
    }
    get heightCss() {
        if (!this.height)
            return "";
        if (this.height === "full")
            return "100%";
        if (this.height === "screen")
            return "100vh";
        if (/^\d+$/.test(this.height))
            return `${this.height}px`;
        return this.height;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BlockComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: BlockComponent, isStandalone: true, selector: "app-block", inputs: { display: "display", direction: "direction", align: "align", justify: "justify", wrap: "wrap", gap: "gap", padding: "padding", width: "width", height: "height", flex: "flex", overflow: "overflow", inline: "inline", children: "children" }, ngImport: i0, template: "<div\n  appApplyTheme=\"app-block\"\n  class=\"box-border min-w-0 inline-flex\"\n  [style.flexDirection]=\"direction\"\n  [style.alignItems]=\"alignCss\"\n  [style.justifyContent]=\"justifyCss\"\n  [style.flexWrap]=\"wrap\"\n  [style.gap]=\"gapCss\"\n  [style.padding]=\"paddingCss\"\n  [style.width]=\"widthCss\"\n  [style.height]=\"heightCss\"\n  [style.flex]=\"flex\"\n  [style.overflow]=\"overflow\"\n>\n  @for (child of children; track child.id) {\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  }\n</div>\n", styles: [":host{display:contents}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }, { kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BlockComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-block", standalone: true, imports: [CommonModule, SchemaElementComponent, ApplyThemeDirective], template: "<div\n  appApplyTheme=\"app-block\"\n  class=\"box-border min-w-0 inline-flex\"\n  [style.flexDirection]=\"direction\"\n  [style.alignItems]=\"alignCss\"\n  [style.justifyContent]=\"justifyCss\"\n  [style.flexWrap]=\"wrap\"\n  [style.gap]=\"gapCss\"\n  [style.padding]=\"paddingCss\"\n  [style.width]=\"widthCss\"\n  [style.height]=\"heightCss\"\n  [style.flex]=\"flex\"\n  [style.overflow]=\"overflow\"\n>\n  @for (child of children; track child.id) {\n    <app-schema-element\n      [element]=\"child\"\n      [elements]=\"children\"\n    ></app-schema-element>\n  }\n</div>\n", styles: [":host{display:contents}\n"] }]
        }], propDecorators: { display: [{
                type: Input
            }], direction: [{
                type: Input
            }], align: [{
                type: Input
            }], justify: [{
                type: Input
            }], wrap: [{
                type: Input
            }], gap: [{
                type: Input
            }], padding: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], flex: [{
                type: Input
            }], overflow: [{
                type: Input
            }], inline: [{
                type: Input
            }], children: [{
                type: Input
            }] } });
registerSchemaComponent("app-block", BlockComponent);

const FONT_SIZE_MAP = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
};
const FONT_WEIGHT_MAP = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
};
const COLOR_MAP = {
    primary: "text-[color:var(--text-primary)]",
    secondary: "text-[color:var(--text-secondary)]",
    muted: "text-[color:var(--text-muted)]",
    accent: "text-[color:var(--accent)]",
    error: "text-[color:var(--error)]",
    success: "text-[color:var(--success)]",
    warning: "text-[color:var(--warning)]",
    info: "text-[color:var(--info)]",
};
const TEXT_ALIGN_MAP = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
};
const TEXT_TRANSFORM_MAP = {
    none: "normal-case",
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
};
class TextComponent {
    text = "";
    tag = "span";
    size = "md";
    weight = "normal";
    color = "";
    textAlign = "left";
    textTransform = "none";
    lineHeight = "";
    letterSpacing = "";
    whiteSpace = "";
    truncate = false;
    get fontSizeClass() {
        return FONT_SIZE_MAP[this.size] || "text-base";
    }
    get fontWeightClass() {
        return FONT_WEIGHT_MAP[this.weight] || "font-normal";
    }
    get colorClass() {
        if (this.color && COLOR_MAP[this.color])
            return COLOR_MAP[this.color];
        return "";
    }
    get textAlignClass() {
        return TEXT_ALIGN_MAP[this.textAlign] || "text-left";
    }
    get textTransformClass() {
        return TEXT_TRANSFORM_MAP[this.textTransform] || "normal-case";
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: TextComponent, isStandalone: true, selector: "app-text", inputs: { text: "text", tag: "tag", size: "size", weight: "weight", color: "color", textAlign: "textAlign", textTransform: "textTransform", lineHeight: "lineHeight", letterSpacing: "letterSpacing", whiteSpace: "whiteSpace", truncate: "truncate" }, ngImport: i0, template: "@if (tag === \"p\") {\n  <p\n    appApplyTheme=\"app-text\"\n    class=\"app-text m-0\"\n    [class]=\"\n      fontSizeClass +\n      ' ' +\n      fontWeightClass +\n      ' ' +\n      colorClass +\n      ' ' +\n      textAlignClass +\n      ' ' +\n      textTransformClass\n    \"\n    [style.lineHeight]=\"lineHeight || null\"\n    [style.letterSpacing]=\"letterSpacing || null\"\n    [style.whiteSpace]=\"whiteSpace || null\"\n    [class.truncate]=\"truncate\"\n    [class.overflow-hidden]=\"truncate\"\n    [class.text-ellipsis]=\"truncate\"\n    [title]=\"truncate && text ? text : ''\"\n  >\n    {{ text }}\n    <ng-content></ng-content>\n  </p>\n} @else {\n  <span\n    appApplyTheme=\"app-text\"\n    class=\"app-text m-0\"\n    [class]=\"\n      fontSizeClass +\n      ' ' +\n      fontWeightClass +\n      ' ' +\n      colorClass +\n      ' ' +\n      textAlignClass +\n      ' ' +\n      textTransformClass\n    \"\n    [style.lineHeight]=\"lineHeight || null\"\n    [style.letterSpacing]=\"letterSpacing || null\"\n    [style.whiteSpace]=\"whiteSpace || null\"\n    [class.truncate]=\"truncate\"\n    [class.overflow-hidden]=\"truncate\"\n    [class.text-ellipsis]=\"truncate\"\n    [title]=\"truncate && text ? text : ''\"\n  >\n    {{ text }}\n    <ng-content></ng-content>\n  </span>\n}\n", dependencies: [{ kind: "directive", type: ApplyThemeDirective, selector: "[appApplyTheme]", inputs: ["appApplyTheme", "themedVariant", "themedSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: TextComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-text", standalone: true, imports: [ApplyThemeDirective], template: "@if (tag === \"p\") {\n  <p\n    appApplyTheme=\"app-text\"\n    class=\"app-text m-0\"\n    [class]=\"\n      fontSizeClass +\n      ' ' +\n      fontWeightClass +\n      ' ' +\n      colorClass +\n      ' ' +\n      textAlignClass +\n      ' ' +\n      textTransformClass\n    \"\n    [style.lineHeight]=\"lineHeight || null\"\n    [style.letterSpacing]=\"letterSpacing || null\"\n    [style.whiteSpace]=\"whiteSpace || null\"\n    [class.truncate]=\"truncate\"\n    [class.overflow-hidden]=\"truncate\"\n    [class.text-ellipsis]=\"truncate\"\n    [title]=\"truncate && text ? text : ''\"\n  >\n    {{ text }}\n    <ng-content></ng-content>\n  </p>\n} @else {\n  <span\n    appApplyTheme=\"app-text\"\n    class=\"app-text m-0\"\n    [class]=\"\n      fontSizeClass +\n      ' ' +\n      fontWeightClass +\n      ' ' +\n      colorClass +\n      ' ' +\n      textAlignClass +\n      ' ' +\n      textTransformClass\n    \"\n    [style.lineHeight]=\"lineHeight || null\"\n    [style.letterSpacing]=\"letterSpacing || null\"\n    [style.whiteSpace]=\"whiteSpace || null\"\n    [class.truncate]=\"truncate\"\n    [class.overflow-hidden]=\"truncate\"\n    [class.text-ellipsis]=\"truncate\"\n    [title]=\"truncate && text ? text : ''\"\n  >\n    {{ text }}\n    <ng-content></ng-content>\n  </span>\n}\n" }]
        }], propDecorators: { text: [{
                type: Input
            }], tag: [{
                type: Input
            }], size: [{
                type: Input
            }], weight: [{
                type: Input
            }], color: [{
                type: Input
            }], textAlign: [{
                type: Input
            }], textTransform: [{
                type: Input
            }], lineHeight: [{
                type: Input
            }], letterSpacing: [{
                type: Input
            }], whiteSpace: [{
                type: Input
            }], truncate: [{
                type: Input
            }] } });
registerSchemaComponent("app-text", TextComponent);

// Side-effect import: Import ALL Angular components to trigger registerSchemaComponent()
// Each component file calls registerSchemaComponent() on module load,
// which registers the component in SCHEMA_COMPONENT_MAP for dynamic resolution.
// This file MUST be imported before any schema rendering.
// UI Components

// UI Components
const uiComponents = [
    {
        id: "avatar",
        name: "AppAvatar",
        selector: "app-avatar",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "badge",
        name: "AppBadge",
        selector: "app-badge",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "bottom-panel",
        name: "AppBottomPanel",
        selector: "app-bottom-panel",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "button",
        name: "AppButton",
        selector: "app-button",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "canvas",
        name: "AppCanvas",
        selector: "app-canvas",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "card",
        name: "AppCard",
        selector: "app-card",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "checkbox",
        name: "AppCheckbox",
        selector: "app-checkbox",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "chip",
        name: "AppChip",
        selector: "app-chip",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "component-palette",
        name: "AppComponentPalette",
        selector: "app-component-palette",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "confirm-dialog",
        name: "AppConfirmDialog",
        selector: "app-confirm-dialog",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "data-table",
        name: "AppDataTable",
        selector: "app-data-table",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "dialog",
        name: "AppDialog",
        selector: "app-dialog",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "empty-state",
        name: "AppEmptyState",
        selector: "app-empty-state",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "footer",
        name: "AppFooter",
        selector: "app-footer",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "header",
        name: "AppHeader",
        selector: "app-header",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "input",
        name: "AppInput",
        selector: "app-input",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "json-view",
        name: "AppJsonView",
        selector: "app-json-view",
        packageType: "shared",
        category: "layout",
    },
    {
        id: "loading",
        name: "AppLoading",
        selector: "app-loading",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "modal",
        name: "AppModal",
        selector: "app-modal",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "page-container",
        name: "AppPageContainer",
        selector: "app-page-container",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "page-toolbar",
        name: "AppPageToolbar",
        selector: "app-page-toolbar",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "pagination",
        name: "AppPagination",
        selector: "app-pagination",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "progress-bar",
        name: "AppProgressBar",
        selector: "app-progress-bar",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "properties-panel",
        name: "AppPropertiesPanel",
        selector: "app-properties-panel",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "radio",
        name: "AppRadio",
        selector: "app-radio",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "segment-selector",
        name: "AppSegmentSelector",
        selector: "app-segment-selector",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "select",
        name: "AppSelect",
        selector: "app-select",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "sidebar",
        name: "AppSidebar",
        selector: "app-sidebar",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "slider",
        name: "AppSlider",
        selector: "app-slider",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "split-view",
        name: "AppSplitView",
        selector: "app-split-view",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "spinner",
        name: "AppSpinner",
        selector: "app-spinner",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "stats-card",
        name: "AppStatsCard",
        selector: "app-stats-card",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "switch",
        name: "AppSwitch",
        selector: "app-switch",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "table-view",
        name: "AppTableView",
        selector: "app-table-view",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "tabs",
        name: "AppTabs",
        selector: "app-tabs",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "textarea",
        name: "AppTextarea",
        selector: "app-textarea",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "tooltip",
        name: "AppTooltip",
        selector: "app-tooltip",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "theme-toggle",
        name: "AppThemeToggle",
        selector: "app-theme-toggle",
        packageType: "shared",
        category: "layout",
    },
    {
        id: "icon",
        name: "AppIcon",
        selector: "app-icon",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "text-input",
        name: "AppTextInput",
        selector: "app-text-input",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "language-selector",
        name: "AppLanguageSelector",
        selector: "app-language-selector",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "shortcuts-overlay",
        name: "AppShortcutsOverlay",
        selector: "app-shortcuts-overlay",
        packageType: "shared",
        category: "layout",
    },
    {
        id: "translation-output",
        name: "AppTranslationOutput",
        selector: "app-translation-output",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "tree",
        name: "AppTree",
        selector: "app-tree",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "divider",
        name: "AppDivider",
        selector: "app-divider",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "form",
        name: "AppForm",
        selector: "app-form",
        packageType: "shared",
        category: "forms",
    },
];
// Layout Components
const layoutComponents = [
    {
        id: "canvas-toolbar",
        name: "CanvasToolbar",
        selector: "app-canvas-toolbar",
        packageType: "shared",
        category: "forms",
    },
    {
        id: "designer-sidebar",
        name: "DesignerSidebar",
        selector: "app-designer-sidebar",
        packageType: "shared",
        category: "forms",
    },
];
// Feedback Components
const feedbackComponents = [
    {
        id: "command-palette",
        name: "AppCommandPalette",
        selector: "app-command-palette",
        packageType: "shared",
        category: "feedback",
    },
    {
        id: "toast",
        name: "AppToast",
        selector: "app-toast",
        packageType: "shared",
        category: "feedback",
    },
    {
        id: "snackbar",
        name: "AppSnackbar",
        selector: "app-snackbar",
        packageType: "shared",
        category: "forms",
    },
];
const components = uiComponents;
// Data Components (placeholder for @tauri-front/data package)
const dataComponents = [];

/**
 * Abstract base component that provides a destroy$ Subject for subscription cleanup.
 * Extend this class instead of OnDestroy directly when you need to manage RxJS subscriptions.
 */
class BaseDestroyableComponent {
    destroy$ = new Subject();
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BaseDestroyableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: BaseDestroyableComponent, isStandalone: true, selector: "lib-base-destroyable", ngImport: i0, template: "", isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BaseDestroyableComponent, decorators: [{
            type: Component,
            args: [{
                    selector: "lib-base-destroyable",
                    standalone: true,
                    template: "",
                }]
        }] });

class SchemaRouteViewerComponent {
    router;
    renderer;
    route = "";
    /** When true, renders schema layoutRegions (header, footer, bottom-nav, overlay) */
    showLayoutRegions = false;
    page = computed(() => {
        const p = this.router.currentPage();
        if (p) {
            console.log(`[SchemaRouteViewer] page() computed: id="${p.id}", name="${p.name}", canvasElements=${p.canvasElements?.length ?? 0}, layouts=${p.layouts?.length ?? 0}`);
        }
        return p;
    }, ...(ngDevMode ? [{ debugName: "page" }] : []));
    /** CSS grid properties to apply via ngStyle */
    gridStyles = computed(() => {
        const p = this.page();
        const layout = p?.layouts?.[0];
        if (!layout)
            return {};
        // For "stack" layouts, use flex column
        if (layout.type === "stack") {
            return { display: "flex", "flex-direction": "column" };
        }
        // For "flex" layouts
        if (layout.type === "flex") {
            const styles = { display: "flex" };
            styles["flex-direction"] =
                layout.direction === "column" ? "column" : "row";
            if (layout.gap)
                styles.gap = `${layout.gap * 0.25}rem`;
            if (layout.flexWrap)
                styles["flex-wrap"] = layout.flexWrap;
            return styles;
        }
        // For "grid" layouts
        const styles = { display: "grid" };
        // Normalize gridTemplateColumns: "12" → "repeat(12, 1fr)"
        if (layout.gridTemplateColumns) {
            const val = layout.gridTemplateColumns;
            if (/^\d+$/.test(val)) {
                styles["grid-template-columns"] = `repeat(${val}, 1fr)`;
            }
            else {
                styles["grid-template-columns"] = val;
            }
        }
        // Normalize gridTemplateRows: "6" → "repeat(6, auto)"
        if (layout.gridTemplateRows) {
            const val = layout.gridTemplateRows;
            if (/^\d+$/.test(val)) {
                styles["grid-template-rows"] = `repeat(${val}, auto)`;
            }
            else {
                styles["grid-template-rows"] = val;
            }
        }
        // Gap: schema value is a Tailwind spacing token (4 = 1rem)
        const rowGap = layout.rowGap ?? layout.gap;
        const colGap = layout.colGap ?? layout.gap;
        if (rowGap !== undefined || colGap !== undefined) {
            const rg = rowGap ? `${rowGap * 0.25}rem` : "0";
            const cg = colGap ? `${colGap * 0.25}rem` : "0";
            styles.gap = `${rg} ${cg}`;
        }
        // Padding
        const px = layout.paddingX;
        const py = layout.paddingY;
        if (px !== undefined || py !== undefined) {
            styles.padding = `${py ? py * 0.25 : 0}rem ${px ? px * 0.25 : 0}rem`;
        }
        // Width
        if (layout.width === "full")
            styles.width = "100%";
        return styles;
    }, ...(ngDevMode ? [{ debugName: "gridStyles" }] : []));
    /** CSS classes: schema-page + layout class */
    containerClass = computed(() => {
        const layoutCls = this.page()?.layouts?.[0]?.class ?? "";
        return layoutCls ? `schema-page ${layoutCls}` : "schema-page";
    }, ...(ngDevMode ? [{ debugName: "containerClass" }] : []));
    // ── Layout region support ───────────────────────────────────────
    /** All layout regions from the renderer, re-computed when route changes */
    rawRegions = computed(() => {
        this.router.currentRoute();
        return this.renderer.getLayoutRegions();
    }, ...(ngDevMode ? [{ debugName: "rawRegions" }] : []));
    getRegionType(region) {
        if (region.region)
            return region.region;
        const id = region.id.toLowerCase();
        if (id.includes("header"))
            return "header";
        if (id.includes("sidebar-right"))
            return "sidebar-right";
        if (id.includes("sidebar"))
            return "sidebar";
        if (id.includes("footer"))
            return "footer";
        if (id.includes("bottom-nav") ||
            (id.includes("bottom") && !id.includes("nav")))
            return "bottom-nav";
        if (id.includes("nav"))
            return "nav";
        if (id.includes("overlay"))
            return "overlay";
        return "other";
    }
    isRegionVisible(region) {
        return this.renderer.isElementVisible(region);
    }
    regionByType(type) {
        return (this.rawRegions().find((r) => this.isRegionVisible(r) && this.getRegionType(r) === type) ?? null);
    }
    headerRegion = computed(() => this.showLayoutRegions ? this.regionByType("header") : null, ...(ngDevMode ? [{ debugName: "headerRegion" }] : []));
    footerRegion = computed(() => this.showLayoutRegions ? this.regionByType("footer") : null, ...(ngDevMode ? [{ debugName: "footerRegion" }] : []));
    bottomNavRegion = computed(() => this.showLayoutRegions ? this.regionByType("bottom-nav") : null, ...(ngDevMode ? [{ debugName: "bottomNavRegion" }] : []));
    overlayRegions = computed(() => this.showLayoutRegions
        ? this.rawRegions().filter((r) => this.isRegionVisible(r) && this.getRegionType(r) === "overlay")
        : [], ...(ngDevMode ? [{ debugName: "overlayRegions" }] : []));
    constructor(router, renderer) {
        this.router = router;
        this.renderer = renderer;
        // Sync router params to the data binding resolver when params change
        effect(() => {
            const params = this.router.params();
            if (Object.keys(params).length > 0) {
                this.renderer.setParams(params);
            }
        });
    }
    ngOnInit() {
        console.log(`[SchemaRouteViewer] ngOnInit, route="${this.route}", currentRoute="${this.router.currentRoute()}"`);
        if (this.route) {
            this.router.navigate(this.route);
        }
        else if (!this.router.currentRoute()) {
            const firstPage = this.router.schema()?.pages?.[0];
            if (firstPage?.route) {
                console.log(`[SchemaRouteViewer] auto-navigating to first page: "${firstPage.route}"`);
                this.router.navigate(firstPage.route);
            }
        }
    }
    ngOnChanges(changes) {
        if (changes["route"])
            this.router.navigate(this.route);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, deps: [{ token: SchemaRouterService }, { token: SchemaRendererService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SchemaRouteViewerComponent, isStandalone: true, selector: "lib-schema-route-viewer", inputs: { route: "route", showLayoutRegions: "showLayoutRegions" }, usesOnChanges: true, ngImport: i0, template: "@if (headerRegion(); as region) {\n  <header class=\"schema-layout-header\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </header>\n}\n\n@if (page(); as p) {\n  <div [class]=\"containerClass()\" [ngStyle]=\"gridStyles()\">\n    @for (element of p.canvasElements; track element.id) {\n      <app-schema-element\n        [element]=\"element\"\n        [elements]=\"p.canvasElements\"\n      ></app-schema-element>\n    }\n  </div>\n}\n\n@if (footerRegion(); as region) {\n  <footer class=\"schema-layout-footer\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </footer>\n}\n\n@if (bottomNavRegion(); as region) {\n  <nav class=\"schema-layout-bottom-nav\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </nav>\n}\n\n@for (region of overlayRegions(); track region.id) {\n  <div class=\"schema-layout-overlay\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </div>\n}\n", styles: [":host{display:block}.schema-page{min-height:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: "lib-schema-route-viewer", standalone: true, imports: [CommonModule, SchemaElementComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "@if (headerRegion(); as region) {\n  <header class=\"schema-layout-header\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </header>\n}\n\n@if (page(); as p) {\n  <div [class]=\"containerClass()\" [ngStyle]=\"gridStyles()\">\n    @for (element of p.canvasElements; track element.id) {\n      <app-schema-element\n        [element]=\"element\"\n        [elements]=\"p.canvasElements\"\n      ></app-schema-element>\n    }\n  </div>\n}\n\n@if (footerRegion(); as region) {\n  <footer class=\"schema-layout-footer\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </footer>\n}\n\n@if (bottomNavRegion(); as region) {\n  <nav class=\"schema-layout-bottom-nav\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </nav>\n}\n\n@for (region of overlayRegions(); track region.id) {\n  <div class=\"schema-layout-overlay\">\n    @for (child of region.children || []; track child.id) {\n      <app-schema-element\n        [element]=\"child\"\n        [elements]=\"region.children || []\"\n      />\n    }\n  </div>\n}\n", styles: [":host{display:block}.schema-page{min-height:100%}\n"] }]
        }], ctorParameters: () => [{ type: SchemaRouterService }, { type: SchemaRendererService }], propDecorators: { route: [{
                type: Input
            }], showLayoutRegions: [{
                type: Input
            }] } });

/**
 * Context-based permission levels from TaskFlow pattern.
 */
var TodoPermission;
(function (TodoPermission) {
    TodoPermission["VIEWER"] = "viewer";
    TodoPermission["EDITOR"] = "editor";
    TodoPermission["MODERATOR"] = "moderator";
    TodoPermission["OWNER"] = "owner";
})(TodoPermission || (TodoPermission = {}));
class PermissionService {
    _currentUser = signal(null, ...(ngDevMode ? [{ debugName: "_currentUser" }] : []));
    _roles = signal([], ...(ngDevMode ? [{ debugName: "_roles" }] : []));
    _isAdmin = signal(false, ...(ngDevMode ? [{ debugName: "_isAdmin" }] : []));
    currentUser = this._currentUser.asReadonly();
    roles = this._roles.asReadonly();
    isAdmin = this._isAdmin.asReadonly();
    // ═══════════════════════════════════════════════════════════════════════
    // USER & ROLE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════════
    setUser(user) {
        this._currentUser.set(user);
    }
    setRoles(roles) {
        this._roles.set(roles);
    }
    setIsAdmin(isAdmin) {
        this._isAdmin.set(isAdmin);
    }
    // ═══════════════════════════════════════════════════════════════════════
    // ROLE MANAGEMENT (CRUD)
    // ═══════════════════════════════════════════════════════════════════════
    /**
     * Load roles from backend. Subclasses or consumers should override
     * with actual TauriBridge invocation.
     */
    async loadRoles() {
        return this._roles();
    }
    /**
     * Create a new role.
     */
    async createRole(name, description, permissions) {
        const role = {
            id: crypto.randomUUID(),
            name,
            description,
            permissions,
        };
        this._roles.update((roles) => [...roles, role]);
        return role;
    }
    /**
     * Update an existing role.
     */
    async updateRole(roleId, name, description, permissions) {
        let updatedRole;
        this._roles.update((roles) => roles.map((r) => {
            if (r.id === roleId) {
                updatedRole = { ...r, name, description, permissions };
                return updatedRole;
            }
            return r;
        }));
        if (!updatedRole) {
            throw new Error(`Role ${roleId} not found`);
        }
        return updatedRole;
    }
    /**
     * Delete a role by ID.
     */
    async deleteRole(roleId) {
        this._roles.update((roles) => roles.filter((r) => r.id !== roleId));
    }
    // ═══════════════════════════════════════════════════════════════════════
    // PERMISSION CHECKING (resource-action based)
    // ═══════════════════════════════════════════════════════════════════════
    /**
     * Check if current user has permission for a resource-action pair.
     * Supports wildcard "*" permission that grants all access.
     */
    hasPermission(resource, action) {
        const user = this._currentUser();
        if (!user)
            return false;
        if (this._isAdmin())
            return true;
        const roles = this._roles();
        for (const roleId of user.roles) {
            const role = roles.find((r) => r.id === roleId || r.name === roleId);
            if (!role)
                continue;
            if (role.permissions.some((p) => (p.resource === resource || p.resource === "*") &&
                (p.action === action || p.action === "*"))) {
                return true;
            }
        }
        return false;
    }
    /**
     * Check if current user can access a resource with optional field restrictions.
     */
    canAccess(resource, action, fields) {
        if (!this.hasPermission(resource, action))
            return false;
        if (!fields || fields.length === 0)
            return true;
        const user = this._currentUser();
        if (!user)
            return false;
        const roles = this._roles();
        for (const roleId of user.roles) {
            const role = roles.find((r) => r.id === roleId || r.name === roleId);
            if (!role)
                continue;
            const permission = role.permissions.find((p) => p.resource === resource && p.action === action);
            if (permission?.fields) {
                return fields.every((f) => permission.fields.includes(f));
            }
            return true;
        }
        return false;
    }
    /**
     * Check if current user has a specific role.
     */
    hasRole(roleId) {
        const user = this._currentUser();
        if (!user)
            return false;
        return user.roles.includes(roleId);
    }
    /**
     * Check if user is authenticated.
     */
    isAuthenticated() {
        return this._currentUser() !== null;
    }
    // ═══════════════════════════════════════════════════════════════════════
    // CONTEXT-BASED PERMISSION CHECKS (from TaskFlow pattern)
    // ═══════════════════════════════════════════════════════════════════════
    /**
     * Get the effective permission level for a user on a todo.
     * Based on TaskFlow's getTodoPermission logic.
     */
    getTodoPermission(context) {
        const { userId, assigneeRoles, visibility, ownerId } = context;
        if (ownerId === userId) {
            return TodoPermission.OWNER;
        }
        const role = assigneeRoles[userId];
        if (role) {
            return this.fromStr(role);
        }
        if (visibility === "public") {
            if (this._isAdmin()) {
                return TodoPermission.MODERATOR;
            }
            return TodoPermission.VIEWER;
        }
        if (visibility === "shared") {
            if (this._isAdmin()) {
                return TodoPermission.MODERATOR;
            }
        }
        return TodoPermission.VIEWER;
    }
    /**
     * Create a todo permission context object.
     */
    createTodoPermissionContext(params) {
        const effectivePermission = this.getTodoPermission({
            ...params,
            effectivePermission: TodoPermission.VIEWER,
        });
        return { ...params, effectivePermission };
    }
    /**
     * Convert role string to TodoPermission enum.
     */
    fromStr(role) {
        switch (role.toLowerCase()) {
            case "viewer":
                return TodoPermission.VIEWER;
            case "editor":
                return TodoPermission.EDITOR;
            case "admin":
            case "moderator":
                return TodoPermission.MODERATOR;
            case "owner":
                return TodoPermission.OWNER;
            default:
                return TodoPermission.VIEWER;
        }
    }
    /**
     * Check if user can edit todo fields (moderator or owner only).
     */
    canEditTodoFields(permission) {
        return [TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission);
    }
    /**
     * Check if user can delete a todo (owner only).
     */
    canDeleteTodo(permission) {
        return permission === TodoPermission.OWNER;
    }
    /**
     * Check if user can archive a todo (owner only).
     */
    canArchiveTodo(permission) {
        return permission === TodoPermission.OWNER;
    }
    /**
     * Check if user can manage assignees (moderator or owner).
     */
    canManageAssignees(permission) {
        return [TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission);
    }
    /**
     * Check if user can create tasks/subtasks/comments (editor+ or admin).
     */
    canCreateTask(permission) {
        if (this._isAdmin())
            return true;
        return [
            TodoPermission.EDITOR,
            TodoPermission.MODERATOR,
            TodoPermission.OWNER,
        ].includes(permission);
    }
    /**
     * Full permission check result for a todo context.
     */
    checkTodoPermissions(context) {
        const perm = context.effectivePermission;
        return {
            canView: true,
            canCreate: this.canCreateTask(perm),
            canEdit: this.canEditTodoFields(perm),
            canDelete: this.canDeleteTodo(perm),
            canArchive: this.canArchiveTodo(perm),
            canManageAssignees: this.canManageAssignees(perm),
            permissionLevel: perm,
        };
    }
    /**
     * Check if user can edit a specific entity based on ownership or permission level.
     */
    canEditEntity(entityOwnerId, permission, userId) {
        if ([TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission)) {
            return true;
        }
        if (permission === TodoPermission.EDITOR) {
            return entityOwnerId === userId;
        }
        return false;
    }
    /**
     * Check if user can delete a specific entity based on ownership or permission level.
     */
    canDeleteEntity(entityOwnerId, permission, userId) {
        return this.canEditEntity(entityOwnerId, permission, userId);
    }
    // ═══════════════════════════════════════════════════════════════════════
    // UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════
    /**
     * Get available resources for permission configuration.
     */
    availableResources() {
        return [
            "users",
            "connections",
            "collections",
            "queries",
            "schemas",
            "settings",
        ];
    }
    /**
     * Get available actions for permission configuration.
     */
    availableActions() {
        return ["read", "write", "delete", "admin"];
    }
    /**
     * Clear all state (useful for logout).
     */
    clear() {
        this._currentUser.set(null);
        this._roles.set([]);
        this._isAdmin.set(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PermissionService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PermissionService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: PermissionService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class GuardService {
    permissionService;
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    canActivate() {
        return Promise.resolve(this.permissionService.isAuthenticated());
    }
    canActivateWithConfig(config) {
        let result;
        switch (config.type) {
            case "auth":
                result = this.checkAuth();
                break;
            case "role":
                result = this.checkRole(config.role);
                break;
            case "permission":
                result = this.checkPermission(config.resource, config.action);
                break;
            case "admin":
                result = this.permissionService.isAdmin();
                break;
            default:
                result = true;
        }
        return Promise.resolve(result);
    }
    checkAuth() {
        return this.permissionService.isAuthenticated();
    }
    checkRole(roleId) {
        if (!roleId)
            return false;
        return this.permissionService.hasRole(roleId);
    }
    checkPermission(resource, action) {
        if (!resource || !action)
            return false;
        return this.permissionService.hasPermission(resource, action);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, deps: [{ token: PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: PermissionService }] });

class SchemaRouterService {
    guardService;
    constructor(guardService) {
        this.guardService = guardService;
    }
    _schema = signal(null, ...(ngDevMode ? [{ debugName: "_schema" }] : []));
    _currentPage = signal(null, ...(ngDevMode ? [{ debugName: "_currentPage" }] : []));
    _currentLayout = signal(null, ...(ngDevMode ? [{ debugName: "_currentLayout" }] : []));
    _currentRoute = signal("", ...(ngDevMode ? [{ debugName: "_currentRoute" }] : []));
    _params = signal({}, ...(ngDevMode ? [{ debugName: "_params" }] : []));
    _queryParams = signal({}, ...(ngDevMode ? [{ debugName: "_queryParams" }] : []));
    _isLoading = signal(false, ...(ngDevMode ? [{ debugName: "_isLoading" }] : []));
    _error = signal(null, ...(ngDevMode ? [{ debugName: "_error" }] : []));
    schema = this._schema.asReadonly();
    currentPage = this._currentPage.asReadonly();
    currentLayout = this._currentLayout.asReadonly();
    currentRoute = this._currentRoute.asReadonly();
    params = this._params.asReadonly();
    queryParams = this._queryParams.asReadonly();
    isLoading = this._isLoading.asReadonly();
    error = this._error.asReadonly();
    hasSchema = computed(() => this._schema() !== null, ...(ngDevMode ? [{ debugName: "hasSchema" }] : []));
    currentPageId = computed(() => this._currentPage()?.id ?? null, ...(ngDevMode ? [{ debugName: "currentPageId" }] : []));
    currentPageTitle = computed(() => this._currentPage()?.meta?.title ?? "", ...(ngDevMode ? [{ debugName: "currentPageTitle" }] : []));
    setSchema(schema) {
        logger.log("[SchemaRouter] setSchema() called, pages:", schema?.pages?.length ?? 0, "layouts:", schema?.layouts?.length ?? 0);
        this._schema.set(schema);
        this._error.set(null);
    }
    clearSchema() {
        this._schema.set(null);
        this._currentPage.set(null);
        this._currentLayout.set(null);
        this._params.set({});
        this._queryParams.set({});
    }
    async navigate(route, options = {}) {
        this._isLoading.set(true);
        this._error.set(null);
        try {
            logger.log(`[SchemaRouter] navigate("${route}") attempting...`);
            let matched = this.resolveRoute(route);
            if (!matched) {
                // Fall back to /404 page if route not found
                const notFoundPage = this.findReservedRoute("/404");
                if (notFoundPage) {
                    matched = { page: notFoundPage, layout: null, params: {} };
                }
            }
            if (!matched) {
                logger.warn(`[SchemaRouter] navigate("${route}") - route NOT FOUND, falling back to /404`);
                this._error.set(`Route not found: ${route}`);
                return false;
            }
            const { page, params } = matched;
            // Run guards if configured
            if (page && this.guardService) {
                const pageGuards = page
                    .guards;
                if (pageGuards?.length) {
                    for (const guard of pageGuards) {
                        const allowed = await this.guardService.canActivateWithConfig(guard);
                        if (!allowed) {
                            this._error.set(`Navigation blocked by guard: ${guard.type}`);
                            return false;
                        }
                    }
                }
            }
            if (options.queryParams) {
                this._queryParams.set(options.queryParams);
            }
            this._currentRoute.set(route);
            this._params.set(params);
            if (page) {
                logger.log(`[SchemaRouter] navigate("${route}") - SUCCESS, page="${page.name}", id="${page.id}"`);
                this._currentPage.set(page);
                // Load layout if specified
                if (page.layout && this._schema()) {
                    const layout = this._schema().layouts.find((l) => l.id === page.layout);
                    this._currentLayout.set(layout ?? null);
                    logger.log(`[SchemaRouter] page "${page.name}" has layout="${page.layout}", found=${!!layout}`);
                }
                else {
                    this._currentLayout.set(null);
                    logger.log(`[SchemaRouter] page "${page.name}" has NO layout`);
                }
            }
            return true;
        }
        catch (err) {
            this._error.set(err instanceof Error ? err.message : "Navigation failed");
            return false;
        }
        finally {
            this._isLoading.set(false);
        }
    }
    resolveRoute(route) {
        const schema = this._schema();
        if (!schema)
            return null;
        // Exact match first
        let page = schema.pages.find((p) => p.route === route || p.id === route);
        if (page) {
            return { page, layout: null, params: {} };
        }
        // Try pattern matching with params
        for (const p of schema.pages) {
            const { match, params } = this.matchRoute(p.route, route);
            if (match) {
                const layout = p.layout
                    ? (schema.layouts.find((l) => l.id === p.layout) ?? null)
                    : null;
                return { page: p, layout, params };
            }
        }
        return null;
    }
    matchRoute(pattern, path) {
        const patternParts = pattern.split("/").filter(Boolean);
        const pathParts = path.split("/").filter(Boolean);
        const params = {};
        if (patternParts.length !== pathParts.length) {
            return { match: false, params: {} };
        }
        for (let i = 0; i < patternParts.length; i++) {
            const p = patternParts[i];
            const a = pathParts[i];
            if (p.startsWith(":")) {
                // Parameter
                params[p.slice(1)] = a;
            }
            else if (p !== a) {
                return { match: false, params: {} };
            }
        }
        return { match: true, params };
    }
    findReservedRoute(route) {
        const schema = this._schema();
        if (schema) {
            const found = schema.pages.find((p) => p.route === route);
            if (found)
                return found;
        }
        // Return a built-in fallback page so /404 and /schema-error always work
        // even when the schema doesn't define them (deduplication: library handles this)
        if (route === "/404") {
            return {
                id: "not-found",
                name: "Not Found",
                route: "/404",
                layouts: [],
                canvasElements: [
                    {
                        id: "not-found-content",
                        componentId: "app-empty-state",
                        props: {
                            title: "Page Not Found",
                            message: "The page you requested does not exist.",
                            variant: "warning",
                        },
                    },
                ],
            };
        }
        if (route === "/schema-error") {
            return {
                id: "schema-error",
                name: "Schema Error",
                route: "/schema-error",
                layouts: [],
                canvasElements: [
                    {
                        id: "schema-error-content",
                        componentId: "app-empty-state",
                        props: {
                            title: "Schema Error",
                            message: this._error() ?? "Failed to load application schema.",
                            variant: "danger",
                            actionLabel: "Retry",
                        },
                    },
                ],
            };
        }
        return null;
    }
    getPage(pageId) {
        const schema = this._schema();
        if (!schema)
            return null;
        return schema.pages.find((p) => p.id === pageId) ?? null;
    }
    getLayout(layoutId) {
        const schema = this._schema();
        if (!schema)
            return null;
        return schema.layouts.find((l) => l.id === layoutId) ?? null;
    }
    getAllPages() {
        return this._schema()?.pages ?? [];
    }
    getAllLayouts() {
        return this._schema()?.layouts ?? [];
    }
    updateQueryParams(params) {
        this._queryParams.set(params);
    }
    reset() {
        this._currentRoute.set("");
        this._currentPage.set(null);
        this._currentLayout.set(null);
        this._params.set({});
        this._queryParams.set({});
        this._isLoading.set(false);
        this._error.set(null);
    }
    // ── Auto-Routing from Schema ──────────────────────────────────
    /**
     * Convert all schema pages to Angular Routes.
     * Each route points to SchemaRouteViewerComponent with page data in route data.
     */
    toAngularRoutes() {
        const pages = this.getAllPages();
        if (pages.length === 0)
            return [];
        const routes = pages.map((page) => {
            const path = page.route?.replace(/^\//, "") || page.id;
            const paramPath = path.replace(/:(\w+)/g, (_, param) => `:${param}`);
            return {
                path: paramPath,
                component: SchemaRouteViewerComponent,
                data: { pageId: page.id, page },
            };
        });
        const firstPage = pages[0];
        const firstPath = firstPage?.route?.replace(/^\//, "") || firstPage?.id || "";
        routes.push({ path: "", redirectTo: firstPath, pathMatch: "full" });
        routes.push({ path: "**", redirectTo: firstPath });
        return routes;
    }
    /**
     * Register all schema pages with Angular Router by calling router.resetConfig().
     * Must be called AFTER setSchema().
     */
    registerAngularRoutes(router) {
        const routes = this.toAngularRoutes();
        if (routes.length === 0) {
            logger.warn("[SchemaRouter] no pages to register as Angular routes");
            return;
        }
        logger.log(`[SchemaRouter] registering ${routes.length} Angular routes from schema`);
        router.resetConfig(routes);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, deps: [{ token: GuardService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: GuardService, decorators: [{
                    type: Optional
                }] }] });

class ToastComponent {
    toast = input.required(...(ngDevMode ? [{ debugName: "toast" }] : []));
    dismiss = output();
    onDismiss() {
        this.dismiss.emit(this.toast().id);
    }
    onAction() {
        const action = this.toast().action;
        if (action) {
            action.callback();
        }
        this.dismiss.emit(this.toast().id);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ToastComponent, isStandalone: true, selector: "app-toast", inputs: { toast: { classPropertyName: "toast", publicName: "toast", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { dismiss: "dismiss" }, ngImport: i0, template: "<div\n  class=\"relative flex items-start gap-3 rounded-lg border-l-4 bg-[var(--bg-toast)] p-4 text-[var(--text-main)] shadow-lg\"\n  [class.border-[var(--color-success)]]=\"toast().type === 'success'\"\n  [class.border-[var(--color-error)]]=\"toast().type === 'error'\"\n  [class.border-[var(--color-warning)]]=\"toast().type === 'warning'\"\n  [class.border-[var(--color-info)]]=\"toast().type === 'info'\"\n  role=\"alert\"\n>\n  <div class=\"mt-0.5 flex-shrink-0\">\n    @switch (toast().type) {\n      @case (\"success\") {\n        <svg\n          class=\"h-5 w-5 text-[var(--color-success)]\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M5 13l4 4L19 7\"\n          />\n        </svg>\n      }\n      @case (\"error\") {\n        <svg\n          class=\"h-5 w-5 text-[var(--color-error)]\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M6 18L18 6M6 6l12 12\"\n          />\n        </svg>\n      }\n      @case (\"warning\") {\n        <svg\n          class=\"h-5 w-5 text-[var(--color-warning)]\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z\"\n          />\n        </svg>\n      }\n      @case (\"info\") {\n        <svg\n          class=\"h-5 w-5 text-[var(--color-info)]\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"\n          />\n        </svg>\n      }\n    }\n  </div>\n\n  <div class=\"min-w-0 flex-1\">\n    @if (toast().title) {\n      <p class=\"text-sm font-semibold\">{{ toast().title }}</p>\n    }\n    <p class=\"text-sm\" [class.font-medium]=\"!toast().title\">\n      {{ toast().message }}\n    </p>\n    @if (toast().action) {\n      <button\n        class=\"mt-2 text-sm font-medium text-[var(--color-success)] transition-colors hover:text-[var(--color-success)]\"\n        (click)=\"onAction()\"\n      >\n        {{ toast().action!.label }}\n      </button>\n    }\n  </div>\n\n  <button\n    class=\"flex-shrink-0 text-[var(--text-dim)] transition-colors hover:text-[var(--text-main)]\"\n    (click)=\"onDismiss()\"\n    aria-label=\"Dismiss\"\n  >\n    <svg class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        d=\"M6 18L18 6M6 6l12 12\"\n      />\n    </svg>\n  </button>\n\n  @if (!toast().persistent && (toast().duration ?? 0) > 0) {\n    <div\n      class=\"absolute right-0 bottom-0 left-0 h-1 overflow-hidden rounded-b-lg bg-[var(--bg-elevated)]\"\n    >\n      <div\n        class=\"h-full\"\n        [class.bg-[var(--color-success)]]=\"toast().type === 'success'\"\n        [class.bg-[var(--color-error)]]=\"toast().type === 'error'\"\n        [class.bg-[var(--color-warning)]]=\"toast().type === 'warning'\"\n        [class.bg-[var(--color-info)]]=\"toast().type === 'info'\"\n        class=\"w-full\"\n      ></div>\n    </div>\n  }\n</div>\n" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-toast", standalone: true, template: "<div\n  class=\"relative flex items-start gap-3 rounded-lg border-l-4 bg-[var(--bg-toast)] p-4 text-[var(--text-main)] shadow-lg\"\n  [class.border-[var(--color-success)]]=\"toast().type === 'success'\"\n  [class.border-[var(--color-error)]]=\"toast().type === 'error'\"\n  [class.border-[var(--color-warning)]]=\"toast().type === 'warning'\"\n  [class.border-[var(--color-info)]]=\"toast().type === 'info'\"\n  role=\"alert\"\n>\n  <div class=\"mt-0.5 flex-shrink-0\">\n    @switch (toast().type) {\n      @case (\"success\") {\n        <svg\n          class=\"h-5 w-5 text-[var(--color-success)]\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M5 13l4 4L19 7\"\n          />\n        </svg>\n      }\n      @case (\"error\") {\n        <svg\n          class=\"h-5 w-5 text-[var(--color-error)]\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M6 18L18 6M6 6l12 12\"\n          />\n        </svg>\n      }\n      @case (\"warning\") {\n        <svg\n          class=\"h-5 w-5 text-[var(--color-warning)]\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z\"\n          />\n        </svg>\n      }\n      @case (\"info\") {\n        <svg\n          class=\"h-5 w-5 text-[var(--color-info)]\"\n          fill=\"none\"\n          viewBox=\"0 0 24 24\"\n          stroke=\"currentColor\"\n        >\n          <path\n            stroke-linecap=\"round\"\n            stroke-linejoin=\"round\"\n            stroke-width=\"2\"\n            d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"\n          />\n        </svg>\n      }\n    }\n  </div>\n\n  <div class=\"min-w-0 flex-1\">\n    @if (toast().title) {\n      <p class=\"text-sm font-semibold\">{{ toast().title }}</p>\n    }\n    <p class=\"text-sm\" [class.font-medium]=\"!toast().title\">\n      {{ toast().message }}\n    </p>\n    @if (toast().action) {\n      <button\n        class=\"mt-2 text-sm font-medium text-[var(--color-success)] transition-colors hover:text-[var(--color-success)]\"\n        (click)=\"onAction()\"\n      >\n        {{ toast().action!.label }}\n      </button>\n    }\n  </div>\n\n  <button\n    class=\"flex-shrink-0 text-[var(--text-dim)] transition-colors hover:text-[var(--text-main)]\"\n    (click)=\"onDismiss()\"\n    aria-label=\"Dismiss\"\n  >\n    <svg class=\"h-4 w-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n      <path\n        stroke-linecap=\"round\"\n        stroke-linejoin=\"round\"\n        stroke-width=\"2\"\n        d=\"M6 18L18 6M6 6l12 12\"\n      />\n    </svg>\n  </button>\n\n  @if (!toast().persistent && (toast().duration ?? 0) > 0) {\n    <div\n      class=\"absolute right-0 bottom-0 left-0 h-1 overflow-hidden rounded-b-lg bg-[var(--bg-elevated)]\"\n    >\n      <div\n        class=\"h-full\"\n        [class.bg-[var(--color-success)]]=\"toast().type === 'success'\"\n        [class.bg-[var(--color-error)]]=\"toast().type === 'error'\"\n        [class.bg-[var(--color-warning)]]=\"toast().type === 'warning'\"\n        [class.bg-[var(--color-info)]]=\"toast().type === 'info'\"\n        class=\"w-full\"\n      ></div>\n    </div>\n  }\n</div>\n" }]
        }], propDecorators: { toast: [{ type: i0.Input, args: [{ isSignal: true, alias: "toast", required: true }] }], dismiss: [{ type: i0.Output, args: ["dismiss"] }] } });

const DEFAULT_DURATIONS = {
    success: 3000,
    error: 5000,
    warning: 4000,
    info: 3000,
};
class ToastService {
    toastsSignal = signal([], ...(ngDevMode ? [{ debugName: "toastsSignal" }] : []));
    counter = 0;
    autoDismissTimers = new Map();
    toasts = computed(() => this.toastsSignal(), ...(ngDevMode ? [{ debugName: "toasts" }] : []));
    generateId() {
        return `toast-${++this.counter}-${Date.now()}`;
    }
    show(options) {
        const id = options.id ?? this.generateId();
        const type = options.type;
        const duration = options.duration ?? DEFAULT_DURATIONS[type];
        const persistent = options.persistent ?? false;
        const toast = {
            ...options,
            id,
            type,
            duration,
            persistent,
        };
        this.toastsSignal.update((toasts) => {
            const updated = [toast, ...toasts];
            return updated.slice(0, 20);
        });
        if (!persistent && duration > 0) {
            const timer = setTimeout(() => {
                this.autoDismissTimers.delete(id);
                this.dismiss(id);
            }, duration);
            this.autoDismissTimers.set(id, timer);
        }
        return id;
    }
    success(message, options) {
        return this.show({ ...options, type: "success", message });
    }
    error(message, options) {
        return this.show({ ...options, type: "error", message });
    }
    warning(message, options) {
        return this.show({ ...options, type: "warning", message });
    }
    info(message, options) {
        return this.show({ ...options, type: "info", message });
    }
    dismiss(id) {
        const timer = this.autoDismissTimers.get(id);
        if (timer !== undefined) {
            clearTimeout(timer);
            this.autoDismissTimers.delete(id);
        }
        this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
    }
    dismissAll() {
        this.autoDismissTimers.forEach((timer) => clearTimeout(timer));
        this.autoDismissTimers.clear();
        this.toastsSignal.set([]);
    }
    update(id, changes) {
        this.toastsSignal.update((toasts) => toasts.map((t) => (t.id === id ? { ...t, ...changes } : t)));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root",
                }]
        }] });

class ToastContainerComponent {
    toastService;
    maxVisible = 5;
    position = "top-right";
    constructor(toastService) {
        this.toastService = toastService;
    }
    visibleToasts = computed(() => {
        return this.toastService.toasts().slice(0, this.maxVisible);
    }, ...(ngDevMode ? [{ debugName: "visibleToasts" }] : []));
    dismiss(id) {
        this.toastService.dismiss(id);
    }
    get positionClass() {
        switch (this.position) {
            case "top-left":
                return "top-4 left-4";
            case "bottom-right":
                return "bottom-4 right-4";
            case "bottom-left":
                return "bottom-4 left-4";
            case "top-center":
                return "top-4 left-1/2 -translate-x-1/2";
            case "bottom-center":
                return "bottom-4 left-1/2 -translate-x-1/2";
            default:
                return "top-4 right-4";
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastContainerComponent, deps: [{ token: ToastService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: ToastContainerComponent, isStandalone: true, selector: "app-toast-container", inputs: { position: "position" }, ngImport: i0, template: "@if (visibleToasts().length > 0) {\n  <div\n    class=\"fixed z-50 flex w-80 max-w-full flex-col gap-2 p-4\"\n    [ngClass]=\"positionClass\"\n  >\n    @for (toast of visibleToasts(); track toast.id) {\n      <app-toast [toast]=\"toast\" (dismiss)=\"dismiss($event)\"></app-toast>\n    }\n  </div>\n}\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: ToastComponent, selector: "app-toast", inputs: ["toast"], outputs: ["dismiss"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ToastContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-toast-container", standalone: true, imports: [CommonModule, ToastComponent], template: "@if (visibleToasts().length > 0) {\n  <div\n    class=\"fixed z-50 flex w-80 max-w-full flex-col gap-2 p-4\"\n    [ngClass]=\"positionClass\"\n  >\n    @for (toast of visibleToasts(); track toast.id) {\n      <app-toast [toast]=\"toast\" (dismiss)=\"dismiss($event)\"></app-toast>\n    }\n  </div>\n}\n" }]
        }], ctorParameters: () => [{ type: ToastService }], propDecorators: { position: [{
                type: Input
            }] } });

async function invokeWithRetry(fn, options) {
    const { maxAttempts, initialDelayMs, maxDelayMs } = options;
    let lastError;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt < maxAttempts - 1) {
                const delay = Math.min(initialDelayMs * Math.pow(2, attempt), maxDelayMs);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
    throw lastError;
}

class InvokeWrapperService {
    async invoke(cmd, args, options) {
        try {
            return await invoke(cmd, args);
        }
        catch (err) {
            if (options?.suppressError) {
                return undefined;
            }
            throw err;
        }
    }
    async invokeWithRetry(cmd, args, retryOptions = {
        maxAttempts: 3,
        initialDelayMs: 1000,
        maxDelayMs: 30000,
    }) {
        return invokeWithRetry(() => this.invokeWithTimeout(cmd, args, retryOptions.maxDelayMs), retryOptions);
    }
    async timeout(ms, cmd, args, options) {
        const { signal } = options ?? {};
        const doTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error(`Invoke ${cmd} timed out after ${ms}ms`)), ms));
        if (signal) {
            const doAbort = new Promise((_, reject) => {
                if (signal.aborted) {
                    reject(signal.reason);
                    return;
                }
                signal.addEventListener("abort", () => reject(signal.reason), {
                    once: true,
                });
            });
            return Promise.race([invoke(cmd, args), doTimeout, doAbort]);
        }
        return Promise.race([invoke(cmd, args), doTimeout]);
    }
    async invokeWithTimeout(cmd, args, timeoutMs) {
        return Promise.race([
            this.invoke(cmd, args),
            new Promise((_, reject) => setTimeout(() => reject(new Error(`Invoke ${cmd} timed out after ${timeoutMs}ms`)), timeoutMs)),
        ]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InvokeWrapperService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InvokeWrapperService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: InvokeWrapperService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class ThemeToggleService {
    themeService = inject(StyleThemeService);
    mediaQuery = null;
    init() {
        if (typeof window === "undefined")
            return;
        this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        if (!this.themeService.isDarkMode()) {
            const prefersDark = this.mediaQuery.matches;
            if (prefersDark) {
                this.themeService.setDarkMode(true);
            }
        }
        this.mediaQuery.addEventListener("change", this._onSystemThemeChange);
    }
    _onSystemThemeChange = (e) => {
        if (!this.themeService.isDarkMode()) {
            this.themeService.setDarkMode(e.matches);
        }
    };
    isDark() {
        return this.themeService.isDarkMode();
    }
    enable() {
        this.themeService.setDarkMode(true);
    }
    disable() {
        this.themeService.setDarkMode(false);
    }
    toggle() {
        this.themeService.toggleDarkMode();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeToggleService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class FallbackService {
    parseSchemaWithFallback(jsonString) {
        try {
            const schema = JSON.parse(jsonString);
            return { schema, isFallback: false };
        }
        catch (error) {
            return {
                schema: this.getFallbackSchema(error instanceof Error ? error.message : "Parse error"),
                isFallback: true,
                error: error instanceof Error ? error.message : "Failed to parse schema",
            };
        }
    }
    getFallbackSchema(errorMessage) {
        return {
            version: "1.0.0",
            pages: [
                {
                    id: "error-page",
                    name: "Schema Error",
                    route: "/schema-error",
                    meta: { title: "Schema Error", icon: null },
                    layouts: [],
                    canvasElements: [],
                },
            ],
            layouts: [],
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FallbackService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FallbackService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: FallbackService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class HandlerExecutorService {
    invokeWrapper = inject(InvokeWrapperService);
    signalStore = inject(SignalStoreService);
    eventBus = inject(EventBusService);
    dataBindingResolver = inject(DataBindingResolverService);
    router = null;
    handlers = {};
    registeredFunctions = {};
    pendingListeners = [];
    setRouter(router) {
        this.router = router;
    }
    setHandlers(handlers) {
        this.handlers = handlers;
    }
    registerFunction(name, fn) {
        this.registeredFunctions[name] = fn;
    }
    async execute(handlerName, eventData) {
        const def = this.handlers[handlerName];
        if (!def) {
            console.warn(`[HandlerExecutor] Handler not found: "${handlerName}"`);
            return;
        }
        await this.executeHandler(def, eventData);
    }
    async executeHandler(def, eventData) {
        if (def.invoke) {
            await this.handleInvoke(def, eventData);
        }
        else if (def.set) {
            this.handleSet(def.set, eventData);
        }
        else if (def.setMany) {
            this.handleSetMany(def.setMany, eventData);
        }
        else if (def.swap) {
            this.handleSwap(def.swap);
        }
        else if (def.navigate) {
            this.handleNavigate(def.navigate);
        }
        else if (def.call) {
            this.handleCall(def.call);
        }
        else if (def.guard) {
            await this.handleGuard(def, eventData);
        }
        else if (def.openOverlay) {
            this.handleOpenOverlay(def.openOverlay);
        }
        else {
            console.warn("[HandlerExecutor] Unknown handler type", def);
        }
    }
    resolveValue(value, eventData) {
        if (typeof value === "string") {
            if (value.startsWith("$store.")) {
                const path = value.slice(7);
                return this.getStorePath(path);
            }
            if (value.startsWith("$event.detail.")) {
                const path = value.slice(14);
                return this.getNestedValue(eventData, path);
            }
            if (value.startsWith("$event.")) {
                const path = value.slice(7);
                return this.getNestedValue(eventData, path);
            }
            const resolved = this.dataBindingResolver.resolveDataBinding(value);
            return resolved !== value ? resolved : value;
        }
        return value;
    }
    getStorePath(path) {
        const parts = path.split(".");
        let current = this.signalStore.get(parts[0]);
        for (let i = 1; i < parts.length; i++) {
            if (current === null || current === undefined)
                return undefined;
            current = this.getNestedValue(current, parts[i]);
        }
        return current;
    }
    setStorePath(path, value) {
        const parts = path.split(".");
        if (parts.length === 1) {
            this.signalStore.set(parts[0], value);
            return;
        }
        const storeName = parts[0];
        const field = parts.slice(1).join(".");
        const current = this.signalStore.get(storeName);
        if (current && typeof current === "object") {
            current[field] = value;
            this.signalStore.set(storeName, current);
        }
    }
    getNestedValue(obj, path) {
        const parts = path.split(".");
        let current = obj;
        for (const part of parts) {
            if (current === null || current === undefined)
                return undefined;
            current = current[part];
        }
        return current;
    }
    async handleInvoke(def, eventData) {
        const command = def.invoke;
        const rawArgs = def.args || [];
        const resolvedArgs = {};
        for (const raw of rawArgs) {
            if (typeof raw === "string" && raw.startsWith("$")) {
                resolvedArgs[raw] = this.resolveValue(raw, eventData);
            }
            else if (typeof raw === "object" && raw !== null) {
                const entries = Object.entries(raw);
                for (const [k, v] of entries) {
                    resolvedArgs[k] = this.resolveValue(v, eventData);
                }
            }
        }
        if (def.awaitEvent) {
            const result = await new Promise((resolve) => {
                const unlisten = listen(def.awaitEvent, (event) => {
                    resolve(event.payload);
                    unlisten.then((fn) => fn());
                });
                this.invokeWrapper.invoke(command, resolvedArgs).catch((err) => {
                    console.error(`[HandlerExecutor] Invoke failed: ${command}`, err);
                    resolve(null);
                });
            });
            if (result && def.resultTo) {
                this.setStorePath(def.resultTo, result);
            }
        }
        else {
            try {
                const result = await this.invokeWrapper.invoke(command, resolvedArgs);
                if (result !== undefined && def.resultTo) {
                    this.setStorePath(def.resultTo, result);
                }
            }
            catch (err) {
                console.error(`[HandlerExecutor] Invoke failed: ${command}`, err);
            }
        }
    }
    handleSet(setDef, eventData) {
        const value = setDef.from
            ? this.resolveValue(setDef.from, eventData)
            : undefined;
        if (setDef.store && setDef.field) {
            this.setStorePath(`${setDef.store}.${setDef.field}`, value);
        }
    }
    handleSetMany(setManyDef, eventData) {
        for (const [path, rawValue] of Object.entries(setManyDef)) {
            const resolved = this.resolveValue(rawValue, eventData);
            if (path.startsWith("$store.")) {
                this.setStorePath(path.slice(7), resolved);
            }
        }
    }
    handleSwap(swapDef) {
        if (swapDef.length < 2)
            return;
        const valA = this.resolveValue(swapDef[0]);
        const valB = this.resolveValue(swapDef[1]);
        if (swapDef[0].startsWith("$store.")) {
            this.setStorePath(swapDef[0].slice(7), valB);
        }
        if (swapDef[1].startsWith("$store.")) {
            this.setStorePath(swapDef[1].slice(7), valA);
        }
    }
    handleNavigate(path) {
        if (this.router) {
            this.router.navigate(path);
        }
    }
    handleCall(name) {
        const fn = this.registeredFunctions[name];
        if (fn) {
            fn();
        }
        else {
            const resolved = this.dataBindingResolver.resolveDataBinding(`{{functions.${name}}}`);
            if (typeof resolved === "function") {
                resolved();
            }
        }
    }
    async handleGuard(def, eventData) {
        const condition = this.resolveValue(def.guard, eventData);
        if (condition && def.then) {
            const thenDef = this.handlers[def.then];
            if (thenDef) {
                await this.executeHandler(thenDef, eventData);
            }
        }
    }
    handleOpenOverlay(regionId) {
        this.eventBus.emit("open-overlay", { regionId });
    }
    destroy() {
        this.pendingListeners.forEach((fn) => fn());
        this.pendingListeners = [];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: HandlerExecutorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: HandlerExecutorService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: HandlerExecutorService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaShellComponent {
    invokeWrapper;
    schemaRouter;
    renderer;
    themeService;
    themeToggle;
    fallbackService;
    handlerExecutor;
    signalStore;
    appId = "";
    commandName = "get_ui_schema";
    defaultTheme = "material-design-v3";
    initialRoute = "";
    errorFallbackCommandName = "";
    /** When true, auto-renders app-toast-container and a full-screen loading overlay */
    includeOverlays = true;
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    error = signal(null, ...(ngDevMode ? [{ debugName: "error" }] : []));
    themeSubscription;
    /** All raw layout regions from the renderer (unfiltered) */
    rawRegions = computed(() => {
        this.schemaRouter.currentRoute();
        return this.renderer.getLayoutRegions();
    }, ...(ngDevMode ? [{ debugName: "rawRegions" }] : []));
    /** Infer region type from explicit `region` property or fall back to ID pattern matching */
    getRegionType(region) {
        if (region.region)
            return region.region;
        const id = region.id.toLowerCase();
        if (id.includes("header"))
            return "header";
        if (id.includes("sidebar-right"))
            return "sidebar-right";
        if (id.includes("sidebar"))
            return "sidebar";
        if (id.includes("footer"))
            return "footer";
        if (id.includes("bottom-nav") ||
            (id.includes("bottom") && !id.includes("nav")))
            return "bottom-nav";
        if (id.includes("nav"))
            return "nav";
        if (id.includes("overlay"))
            return "overlay";
        return "other";
    }
    isRegionVisible(region) {
        return this.renderer.isElementVisible(region);
    }
    regionByType(type) {
        return (this.rawRegions().find((r) => this.isRegionVisible(r) && this.getRegionType(r) === type) ?? null);
    }
    regionsByType(type) {
        return this.rawRegions().filter((r) => this.isRegionVisible(r) && this.getRegionType(r) === type);
    }
    headerRegion = computed(() => this.regionByType("header"), ...(ngDevMode ? [{ debugName: "headerRegion" }] : []));
    sidebarLeftRegion = computed(() => this.regionByType("sidebar") ?? this.regionByType("sidebar-left"), ...(ngDevMode ? [{ debugName: "sidebarLeftRegion" }] : []));
    sidebarRightRegion = computed(() => this.regionByType("sidebar-right"), ...(ngDevMode ? [{ debugName: "sidebarRightRegion" }] : []));
    footerRegion = computed(() => this.regionByType("footer"), ...(ngDevMode ? [{ debugName: "footerRegion" }] : []));
    bottomNavRegion = computed(() => this.regionByType("bottom-nav"), ...(ngDevMode ? [{ debugName: "bottomNavRegion" }] : []));
    overlayRegions = computed(() => this.regionsByType("overlay"), ...(ngDevMode ? [{ debugName: "overlayRegions" }] : []));
    /** Unrecognized regions rendered in an extra row below the main layout */
    otherRegions = computed(() => {
        return this.rawRegions().filter((r) => this.isRegionVisible(r) && this.getRegionType(r) === "other");
    }, ...(ngDevMode ? [{ debugName: "otherRegions" }] : []));
    /** CSS grid-template-columns — always 3 columns, hidden sidebars get 0px */
    gridColumns = computed(() => {
        const leftWidth = this.sidebarLeftRegion() ? "auto" : "0px";
        const rightWidth = this.sidebarRightRegion() ? "auto" : "0px";
        return `${leftWidth} 1fr ${rightWidth}`;
    }, ...(ngDevMode ? [{ debugName: "gridColumns" }] : []));
    /** CSS grid-template-rows — hidden regions get 0px */
    gridRows = computed(() => {
        const headerH = this.headerRegion() ? "auto" : "0px";
        const footerH = this.footerRegion() ? "auto" : "0px";
        const bottomH = this.bottomNavRegion() ? "auto" : "0px";
        const otherH = this.otherRegions().length ? "auto" : "0px";
        return `${headerH} 1fr ${footerH} ${bottomH} ${otherH}`;
    }, ...(ngDevMode ? [{ debugName: "gridRows" }] : []));
    /** CSS grid-template-areas — always 5 rows with 3 columns */
    gridAreas = computed(() => {
        const header = this.headerRegion() ? '"header header header"' : '". . ."';
        const left = this.sidebarLeftRegion() ? "sidebar-left" : ".";
        const right = this.sidebarRightRegion() ? "sidebar-right" : ".";
        const middle = `"${left} content ${right}"`;
        const footer = this.footerRegion() ? '"footer footer footer"' : '". . ."';
        const bottom = this.bottomNavRegion()
            ? '"bottom-nav bottom-nav bottom-nav"'
            : '". . ."';
        const other = this.otherRegions().length
            ? '"other other other"'
            : '". . ."';
        return `${header} ${middle} ${footer} ${bottom} ${other}`;
    }, ...(ngDevMode ? [{ debugName: "gridAreas" }] : []));
    constructor(invokeWrapper, schemaRouter, renderer, themeService, themeToggle, fallbackService, handlerExecutor, signalStore) {
        this.invokeWrapper = invokeWrapper;
        this.schemaRouter = schemaRouter;
        this.renderer = renderer;
        this.themeService = themeService;
        this.themeToggle = themeToggle;
        this.fallbackService = fallbackService;
        this.handlerExecutor = handlerExecutor;
        this.signalStore = signalStore;
        this.handlerExecutor.setRouter(this.schemaRouter);
        effect(() => {
            const route = this.schemaRouter.currentRoute();
            if (route)
                this.renderer.setCurrentRoute(route);
        });
    }
    async ngOnInit() {
        if (!this.appId)
            return;
        this.setupThemeStoreSync();
        this.themeService.loadTheme(this.defaultTheme);
        this.themeToggle.init();
        await this.loadSchema();
    }
    setupThemeStoreSync() {
        this.themeSubscription = this.themeService.themeChanged$.subscribe(({ isDark }) => {
            const settings = this.signalStore.get("translator-settings");
            if (settings && settings["darkMode"] !== isDark) {
                settings["darkMode"] = isDark;
                this.signalStore.set("translator-settings", settings);
            }
        });
    }
    ngOnDestroy() {
        this.themeSubscription?.unsubscribe();
    }
    onWindowToggleDark(event) {
        const e = event;
        if (e.detail?.isDark !== undefined) {
            this.themeService.setDarkMode(e.detail.isDark);
        }
    }
    async loadSchema() {
        logger.log(`[SchemaShell] loadSchema() starting, appId="${this.appId}", command="${this.commandName}"`);
        this.loading.set(true);
        this.error.set(null);
        try {
            const response = await this.invokeWrapper.invoke(this.commandName, {
                id: this.appId,
            });
            logger.log(`[SchemaShell] invoke("${this.commandName}") response:`, response ? `data.pages=${response?.data?.pages?.length}` : "null");
            const schema = response?.data;
            if (!schema?.pages?.length) {
                logger.warn(`[SchemaShell] schema has no pages, schema=`, schema);
                this.error.set("Schema not found. Create it in the Designer and sync.");
                return;
            }
            logger.log(`[SchemaShell] setSchema() pages=${schema.pages.length}, loadSchema() pages=${schema.pages.length}`);
            this.schemaRouter.setSchema(schema);
            this.renderer.loadSchema(schema);
            this.renderer.registerFunction("toggleThemeDark", () => {
                this.themeService.toggleDarkMode();
            });
            if (schema.handlers) {
                this.handlerExecutor.setHandlers(schema.handlers);
            }
            this.renderer.registerFunction("reloadSchema", () => void this.loadSchema());
            this.themeService.loadTheme(schema.app?.style ?? this.defaultTheme);
            // Load the variant CSS into <head> so CSS variables and class selectors are available
            const variant = schema.app?.style ?? this.defaultTheme;
            await loadStyleVariant(variant);
            // Re-inject dark mode CSS for the newly loaded variant if dark mode is active
            if (this.themeService.isDarkMode()) {
                this.themeService.setDarkMode(true);
            }
            const route = this.initialRoute || schema.pages[0].route || `/${schema.pages[0].id}`;
            logger.log(`[SchemaShell] navigate("${route}")`);
            await this.schemaRouter.navigate(route);
        }
        catch (err) {
            const originalMessage = err instanceof Error
                ? err.message
                : typeof err === "object" && err
                    ? String(err["message"] ??
                        Object.values(err)[0] ??
                        String(err))
                    : String(err);
            if (this.errorFallbackCommandName) {
                try {
                    const fallbackResponse = await this.invokeWrapper.invoke(this.errorFallbackCommandName, { id: this.appId });
                    const fallbackSchema = fallbackResponse?.data;
                    if (fallbackSchema?.pages?.length) {
                        logger.warn("[SchemaShell] Primary schema failed, using fallback schema");
                        this.schemaRouter.setSchema(fallbackSchema);
                        this.renderer.loadSchema(fallbackSchema);
                        await this.schemaRouter.navigate("/schema-error");
                        this.loading.set(false);
                        return;
                    }
                }
                catch (fallbackErr) {
                    logger.error("[SchemaShell] Fallback schema also failed:", fallbackErr);
                }
            }
            logger.warn(`[SchemaShell] All schema loading failed, using fallback error schema. Original error: ${originalMessage}`);
            const fallbackSchema = this.fallbackService.getFallbackSchema(originalMessage);
            this.schemaRouter.setSchema(fallbackSchema);
            this.renderer.loadSchema(fallbackSchema);
            await this.schemaRouter.navigate("/schema-error");
        }
        finally {
            this.loading.set(false);
        }
    }
    retry() {
        this.loadSchema();
    }
    /**
     * Returns CSS classes for a region container by mapping its props to Tailwind-style classes.
     * Uses the same mapPropsToClasses() logic as schema elements for consistent styling.
     */
    getRegionClasses(region) {
        if (!region?.props)
            return "";
        const theme = getCurrentStyle();
        return this.renderer
            .mapPropsToClasses(region.componentId || "div", region.props, theme)
            .join(" ");
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaShellComponent, deps: [{ token: InvokeWrapperService }, { token: SchemaRouterService }, { token: SchemaRendererService }, { token: StyleThemeService }, { token: ThemeToggleService }, { token: FallbackService }, { token: HandlerExecutorService }, { token: SignalStoreService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: SchemaShellComponent, isStandalone: true, selector: "lib-schema-shell", inputs: { appId: "appId", commandName: "commandName", defaultTheme: "defaultTheme", initialRoute: "initialRoute", errorFallbackCommandName: "errorFallbackCommandName", includeOverlays: "includeOverlays" }, host: { listeners: { "window:toggle-dark": "onWindowToggleDark($event)" } }, ngImport: i0, template: "@if (loading()) {\n  <div class=\"flex flex-col items-center justify-center gap-4 min-h-screen\">\n    <div class=\"w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin\"></div>\n    <p class=\"text-base-content/70 text-lg\">Loading application...</p>\n  </div>\n} @else if (error(); as err) {\n  <div class=\"flex flex-col items-center justify-center min-h-screen p-8\">\n    <div class=\"w-20 h-20 flex items-center justify-center rounded-full bg-warning/10 text-warning text-4xl mb-4\">&#9888;</div>\n    <h2 class=\"text-2xl font-bold text-base-content mb-2\">Application Not Available</h2>\n    <p class=\"text-base-content/70 text-center max-w-md mb-6\">{{ err }}</p>\n    <button\n      class=\"btn btn-primary\"\n      (click)=\"retry()\"\n    >\n      Retry\n    </button>\n  </div>\n} @else {\n  <div\n    class=\"app-layout\"\n    [style.grid-template-columns]=\"gridColumns()\"\n    [style.grid-template-rows]=\"gridRows()\"\n    [style.grid-template-areas]=\"gridAreas()\"\n  >\n    @if (headerRegion(); as region) {\n      <div\n        data-region=\"header\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: header\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (sidebarLeftRegion(); as region) {\n      <div\n        data-region=\"sidebar-left\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: sidebar-left\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    <div data-region=\"content\" style=\"grid-area: content\">\n      <lib-schema-route-viewer />\n    </div>\n\n    @if (sidebarRightRegion(); as region) {\n      <div\n        data-region=\"sidebar-right\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: sidebar-right\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (footerRegion(); as region) {\n      <div\n        data-region=\"footer\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: footer\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (bottomNavRegion(); as region) {\n      <div\n        data-region=\"bottom-nav\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: bottom-nav\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @for (region of otherRegions(); track region.id) {\n      <div\n        data-region=\"other\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: other\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n  </div>\n\n  @for (region of overlayRegions(); track region.id) {\n    <div class=\"layout-overlay\" data-region=\"overlay\">\n      @for (child of region.children || []; track child.id) {\n        <app-schema-element\n          [element]=\"child\"\n          [elements]=\"region.children || []\"\n        />\n      }\n    </div>\n  }\n}\n\n@if (includeOverlays) {\n  <app-toast-container position=\"top-right\" />\n}\n", styles: [":host{display:block;height:100%}.app-layout{display:grid;min-height:100vh}[data-region=content],[data-region=sidebar-left],[data-region=sidebar-right]{overflow:auto}.layout-overlay{position:fixed;inset:0;z-index:50;pointer-events:none}.layout-overlay>*{pointer-events:auto}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: SchemaRouteViewerComponent, selector: "lib-schema-route-viewer", inputs: ["route", "showLayoutRegions"] }, { kind: "component", type: SchemaElementComponent, selector: "app-schema-element", inputs: ["element", "elements"] }, { kind: "component", type: ToastContainerComponent, selector: "app-toast-container", inputs: ["position"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaShellComponent, decorators: [{
            type: Component,
            args: [{ selector: "lib-schema-shell", standalone: true, imports: [
                        CommonModule,
                        SchemaRouteViewerComponent,
                        SchemaElementComponent,
                        ToastContainerComponent,
                    ], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: "@if (loading()) {\n  <div class=\"flex flex-col items-center justify-center gap-4 min-h-screen\">\n    <div class=\"w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin\"></div>\n    <p class=\"text-base-content/70 text-lg\">Loading application...</p>\n  </div>\n} @else if (error(); as err) {\n  <div class=\"flex flex-col items-center justify-center min-h-screen p-8\">\n    <div class=\"w-20 h-20 flex items-center justify-center rounded-full bg-warning/10 text-warning text-4xl mb-4\">&#9888;</div>\n    <h2 class=\"text-2xl font-bold text-base-content mb-2\">Application Not Available</h2>\n    <p class=\"text-base-content/70 text-center max-w-md mb-6\">{{ err }}</p>\n    <button\n      class=\"btn btn-primary\"\n      (click)=\"retry()\"\n    >\n      Retry\n    </button>\n  </div>\n} @else {\n  <div\n    class=\"app-layout\"\n    [style.grid-template-columns]=\"gridColumns()\"\n    [style.grid-template-rows]=\"gridRows()\"\n    [style.grid-template-areas]=\"gridAreas()\"\n  >\n    @if (headerRegion(); as region) {\n      <div\n        data-region=\"header\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: header\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (sidebarLeftRegion(); as region) {\n      <div\n        data-region=\"sidebar-left\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: sidebar-left\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    <div data-region=\"content\" style=\"grid-area: content\">\n      <lib-schema-route-viewer />\n    </div>\n\n    @if (sidebarRightRegion(); as region) {\n      <div\n        data-region=\"sidebar-right\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: sidebar-right\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (footerRegion(); as region) {\n      <div\n        data-region=\"footer\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: footer\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @if (bottomNavRegion(); as region) {\n      <div\n        data-region=\"bottom-nav\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: bottom-nav\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n\n    @for (region of otherRegions(); track region.id) {\n      <div\n        data-region=\"other\"\n        [class]=\"getRegionClasses(region)\"\n        style=\"grid-area: other\"\n      >\n        @for (child of region.children || []; track child.id) {\n          <app-schema-element\n            [element]=\"child\"\n            [elements]=\"region.children || []\"\n          />\n        }\n      </div>\n    }\n  </div>\n\n  @for (region of overlayRegions(); track region.id) {\n    <div class=\"layout-overlay\" data-region=\"overlay\">\n      @for (child of region.children || []; track child.id) {\n        <app-schema-element\n          [element]=\"child\"\n          [elements]=\"region.children || []\"\n        />\n      }\n    </div>\n  }\n}\n\n@if (includeOverlays) {\n  <app-toast-container position=\"top-right\" />\n}\n", styles: [":host{display:block;height:100%}.app-layout{display:grid;min-height:100vh}[data-region=content],[data-region=sidebar-left],[data-region=sidebar-right]{overflow:auto}.layout-overlay{position:fixed;inset:0;z-index:50;pointer-events:none}.layout-overlay>*{pointer-events:auto}\n"] }]
        }], ctorParameters: () => [{ type: InvokeWrapperService }, { type: SchemaRouterService }, { type: SchemaRendererService }, { type: StyleThemeService }, { type: ThemeToggleService }, { type: FallbackService }, { type: HandlerExecutorService }, { type: SignalStoreService }], propDecorators: { appId: [{
                type: Input
            }], commandName: [{
                type: Input
            }], defaultTheme: [{
                type: Input
            }], initialRoute: [{
                type: Input
            }], errorFallbackCommandName: [{
                type: Input
            }], includeOverlays: [{
                type: Input
            }], onWindowToggleDark: [{
                type: HostListener,
                args: ["window:toggle-dark", ["$event"]]
            }] } });

var ErrorType;
(function (ErrorType) {
    ErrorType["NotFound"] = "notFound";
    ErrorType["ValidationError"] = "validationError";
    ErrorType["Duplicate"] = "duplicate";
    ErrorType["Unauthorized"] = "unauthorized";
    ErrorType["Forbidden"] = "forbidden";
    ErrorType["Internal"] = "internal";
    ErrorType["Database"] = "database";
    ErrorType["Network"] = "network";
})(ErrorType || (ErrorType = {}));
function isNotFoundError(error) {
    return error.type === ErrorType.NotFound;
}
function isValidationError(error) {
    return error.type === ErrorType.ValidationError;
}
function isDuplicateError(error) {
    return error.type === ErrorType.Duplicate;
}
function isUnauthorizedError(error) {
    return error.type === ErrorType.Unauthorized;
}
function isForbiddenError(error) {
    return error.type === ErrorType.Forbidden;
}
function isInternalError(error) {
    return error.type === ErrorType.Internal;
}
function isDatabaseError(error) {
    return error.type === ErrorType.Database;
}
function isNetworkError(error) {
    return error.type === ErrorType.Network;
}
function parseError(error) {
    if (error &&
        typeof error === "object" &&
        "type" in error &&
        "message" in error) {
        return error;
    }
    if (error instanceof Error) {
        return {
            type: ErrorType.Internal,
            message: error.message,
        };
    }
    return {
        type: ErrorType.Internal,
        message: String(error),
    };
}
function formatError(error) {
    switch (error.type) {
        case ErrorType.NotFound:
            return error.entity ? `${error.entity} not found` : error.message;
        case ErrorType.ValidationError:
            return `Validation error: ${error.message}`;
        case ErrorType.Duplicate:
            return error.entity ? `${error.entity} already exists` : error.message;
        case ErrorType.Unauthorized:
            return "Unauthorized access";
        case ErrorType.Forbidden:
            return "Access forbidden";
        case ErrorType.Internal:
            return `Internal error: ${error.message}`;
        case ErrorType.Database:
            return `Database error: ${error.message}`;
        case ErrorType.Network:
            return `Network error: ${error.message}`;
        default:
            return error.message;
    }
}

const DEFAULT_RETRY_CONFIG = {
    maxAttempts: 3,
    initialDelayMs: 1000,
    maxDelayMs: 30000,
};
const MAX_ERROR_LOG_ENTRIES = 100;
class ErrorHandlerService {
    toastService;
    errorLogSignal = signal([], ...(ngDevMode ? [{ debugName: "errorLogSignal" }] : []));
    onlineSignal = signal(navigator.onLine, ...(ngDevMode ? [{ debugName: "onlineSignal" }] : []));
    retryCounter = 0;
    errorLog = computed(() => this.errorLogSignal(), ...(ngDevMode ? [{ debugName: "errorLog" }] : []));
    isOnline = computed(() => this.onlineSignal(), ...(ngDevMode ? [{ debugName: "isOnline" }] : []));
    errorCount = computed(() => this.errorLogSignal().filter((e) => !e.dismissed).length, ...(ngDevMode ? [{ debugName: "errorCount" }] : []));
    constructor(toastService) {
        this.toastService = toastService;
        this.setupOnlineOfflineListeners();
    }
    setupOnlineOfflineListeners() {
        window.addEventListener("online", () => this.onlineSignal.set(true));
        window.addEventListener("offline", () => this.onlineSignal.set(false));
    }
    handleError(error, context) {
        const appError = this.normalizeError(error);
        const message = formatError(appError);
        const fullMessage = context ? `[${context}] ${message}` : message;
        console.error(`Error${context ? ` [${context}]` : ""}: ${message}`, error);
        this.addToErrorLog(appError, fullMessage, context);
        this.showToast(fullMessage, "error");
        return appError;
    }
    normalizeError(error) {
        if (this.isHttpError(error)) {
            return this.convertHttpError(error);
        }
        return parseError(error);
    }
    isHttpError(error) {
        return (typeof error === "object" &&
            error !== null &&
            "status" in error &&
            typeof error.status === "number");
    }
    convertHttpError(httpError) {
        const status = httpError.status ?? 0;
        const message = httpError.message || httpError.statusText || "HTTP error";
        switch (status) {
            case 400:
                return { type: ErrorType.ValidationError, message };
            case 401:
                return { type: ErrorType.Unauthorized, message };
            case 403:
                return { type: ErrorType.Forbidden, message };
            case 404:
                return { type: ErrorType.NotFound, message };
            case 409:
                return { type: ErrorType.Duplicate, message };
            case 500:
            case 502:
            case 503:
            case 504:
                return { type: ErrorType.Internal, message };
            default:
                if (status >= 500) {
                    return { type: ErrorType.Internal, message };
                }
                if (status >= 400) {
                    return { type: ErrorType.ValidationError, message };
                }
                return { type: ErrorType.Network, message };
        }
    }
    showToast(message, type = "error") {
        this.toastService.show({ type, message });
    }
    addToErrorLog(error, message, context) {
        const entry = {
            id: `error-${++this.retryCounter}-${Date.now()}`,
            timestamp: new Date(),
            message,
            context,
            error,
            dismissed: false,
        };
        this.errorLogSignal.update((log) => {
            const updated = [entry, ...log];
            return updated.slice(0, MAX_ERROR_LOG_ENTRIES);
        });
    }
    dismissError(id) {
        this.errorLogSignal.update((log) => log.map((entry) => entry.id === id ? { ...entry, dismissed: true } : entry));
    }
    clearErrorLog() {
        this.errorLogSignal.set([]);
    }
    getActiveErrors() {
        return this.errorLogSignal().filter((entry) => !entry.dismissed);
    }
    async retryWithBackoff(fn, config = {}) {
        const { maxAttempts, initialDelayMs, maxDelayMs } = {
            ...DEFAULT_RETRY_CONFIG,
            ...config,
        };
        let lastError;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                return await fn();
            }
            catch (error) {
                lastError = error;
                if (attempt < maxAttempts - 1) {
                    const delay = Math.min(initialDelayMs * Math.pow(2, attempt), maxDelayMs);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }
        throw lastError;
    }
    handleAndRetry(fn, context, retryConfig) {
        return this.retryWithBackoff(fn, retryConfig).catch((error) => {
            this.handleError(error, context);
            throw error;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ErrorHandlerService, deps: [{ token: ToastService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ErrorHandlerService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ErrorHandlerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: ToastService }] });

class ApiException extends Error {
    code;
    details;
    constructor(message, code, details) {
        super(message);
        this.code = code;
        this.details = details;
        this.name = "ApiException";
    }
}

class SignalLoggerService {
    _entries = signal([], ...(ngDevMode ? [{ debugName: "_entries" }] : []));
    _minLevel = signal("info", ...(ngDevMode ? [{ debugName: "_minLevel" }] : []));
    _maxEntries = signal(1000, ...(ngDevMode ? [{ debugName: "_maxEntries" }] : []));
    entries = computed(() => this._entries(), ...(ngDevMode ? [{ debugName: "entries" }] : []));
    filteredEntries = computed(() => {
        const level = this._minLevel();
        const levels = ["debug", "info", "warn", "error"];
        const minIndex = levels.indexOf(level);
        return this._entries().filter((e) => levels.indexOf(e.level) >= minIndex);
    }, ...(ngDevMode ? [{ debugName: "filteredEntries" }] : []));
    setMinLevel(level) {
        this._minLevel.set(level);
    }
    getMinLevel() {
        return this._minLevel();
    }
    setMaxEntries(max) {
        this._maxEntries.set(max);
    }
    addEntry(entry) {
        this._entries.update((entries) => {
            const newEntries = [...entries, entry];
            if (newEntries.length > this._maxEntries()) {
                return newEntries.slice(-this._maxEntries());
            }
            return newEntries;
        });
    }
    debug(message, source, metadata) {
        this.addEntry({
            level: "debug",
            message,
            timestamp: new Date().toISOString(),
            source,
            metadata,
        });
    }
    info(message, source, metadata) {
        this.addEntry({
            level: "info",
            message,
            timestamp: new Date().toISOString(),
            source,
            metadata,
        });
    }
    warn(message, source, metadata) {
        this.addEntry({
            level: "warn",
            message,
            timestamp: new Date().toISOString(),
            source,
            metadata,
        });
    }
    error(message, source, metadata) {
        this.addEntry({
            level: "error",
            message,
            timestamp: new Date().toISOString(),
            source,
            metadata,
        });
    }
    clear() {
        this._entries.set([]);
    }
    getEntriesByLevel(level) {
        return this._entries().filter((e) => e.level === level);
    }
    exportToJson() {
        return JSON.stringify(this._entries(), null, 2);
    }
    importFromJson(json) {
        try {
            const entries = JSON.parse(json);
            this._entries.set(entries);
        }
        catch {
            this.error("Failed to import log entries from JSON");
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalLoggerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalLoggerService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalLoggerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SignalSyncService {
    http = inject(HttpClient);
    _syncStatus = signal("idle", ...(ngDevMode ? [{ debugName: "_syncStatus" }] : []));
    _lastSyncTime = signal(null, ...(ngDevMode ? [{ debugName: "_lastSyncTime" }] : []));
    _pendingChanges = signal(0, ...(ngDevMode ? [{ debugName: "_pendingChanges" }] : []));
    _syncEndpoint = signal("", ...(ngDevMode ? [{ debugName: "_syncEndpoint" }] : []));
    syncStatus = computed(() => this._syncStatus(), ...(ngDevMode ? [{ debugName: "syncStatus" }] : []));
    lastSyncTime = computed(() => this._lastSyncTime(), ...(ngDevMode ? [{ debugName: "lastSyncTime" }] : []));
    pendingChanges = computed(() => this._pendingChanges(), ...(ngDevMode ? [{ debugName: "pendingChanges" }] : []));
    syncEndpoint = computed(() => this._syncEndpoint(), ...(ngDevMode ? [{ debugName: "syncEndpoint" }] : []));
    setEndpoint(endpoint) {
        this._syncEndpoint.set(endpoint);
    }
    setStatus(status) {
        this._syncStatus.set(status);
    }
    incrementPending() {
        this._pendingChanges.update((n) => n + 1);
    }
    decrementPending() {
        this._pendingChanges.update((n) => Math.max(0, n - 1));
    }
    markSynced() {
        this._lastSyncTime.set(new Date());
        this._pendingChanges.set(0);
        this._syncStatus.set("idle");
    }
    markError() {
        this._syncStatus.set("error");
    }
    markOffline() {
        this._syncStatus.set("offline");
    }
    async syncToCloud() {
        if (this._syncStatus() === "syncing")
            return;
        if (!this._syncEndpoint()) {
            this.markOffline();
            return;
        }
        this._syncStatus.set("syncing");
        try {
            const state = this._pendingChanges();
            if (state > 0) {
                await this.performSync();
            }
            this.markSynced();
        }
        catch (error) {
            this.markError();
            throw error;
        }
    }
    async performSync() {
        const endpoint = this._syncEndpoint();
        if (!endpoint)
            return;
        try {
            await this.http
                .post(`${endpoint}/sync`, { timestamp: new Date().toISOString() })
                .toPromise();
        }
        catch (error) {
            console.error("Sync failed:", error);
            throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SignalSyncService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class StorageService {
}

class LocalStorageService {
    prefix = "";
    /**
     * Configure a prefix for namespacing keys.
     * Call before using get/set/remove/has with prefixed keys.
     */
    setPrefix(prefix) {
        this.prefix = prefix;
    }
    makeKey(key) {
        return `${this.prefix}${key}`;
    }
    get(key, defaultValue, validator) {
        const item = localStorage.getItem(this.makeKey(key));
        if (!item)
            return defaultValue ?? null;
        try {
            const parsed = JSON.parse(item);
            if (validator && validator(parsed)) {
                return parsed;
            }
            if (!validator) {
                return parsed;
            }
            return defaultValue ?? null;
        }
        catch {
            return defaultValue ?? null;
        }
    }
    set(key, value) {
        localStorage.setItem(this.makeKey(key), JSON.stringify(value));
    }
    remove(key) {
        localStorage.removeItem(this.makeKey(key));
    }
    clear() {
        if (!this.prefix) {
            localStorage.clear();
        }
        else {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k?.startsWith(this.prefix)) {
                    keysToRemove.push(k);
                }
            }
            keysToRemove.forEach((k) => localStorage.removeItem(k));
        }
    }
    keys() {
        if (!this.prefix) {
            return Object.keys(localStorage);
        }
        const result = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k?.startsWith(this.prefix)) {
                result.push(k.substring(this.prefix.length));
            }
        }
        return result;
    }
    has(key) {
        return localStorage.getItem(this.makeKey(key)) !== null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LocalStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LocalStorageService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: LocalStorageService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class IndexedDbService {
    dbName;
    storeName;
    db = null;
    constructor(dbName = "tauri-app-db", storeName = "key-value-store") {
        this.dbName = dbName;
        this.storeName = storeName;
        this.initDb();
    }
    initDb() {
        if (typeof indexedDB === "undefined")
            return;
        const request = indexedDB.open(this.dbName, 1);
        request.onerror = () => {
            console.error("IndexedDB error:", request.error);
        };
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(this.storeName)) {
                db.createObjectStore(this.storeName, { keyPath: "key" });
            }
        };
        this.db = request.result;
    }
    getStore() {
        if (!this.db)
            return null;
        const transaction = this.db.transaction(this.storeName, "readwrite");
        return transaction.objectStore(this.storeName);
    }
    get(key) {
        if (typeof indexedDB === "undefined")
            return null;
        const store = this.getStore();
        if (!store)
            return null;
        const request = store.get(key);
        return new Promise((resolve) => {
            request.onsuccess = () => {
                resolve(request.result?.value ?? null);
            };
            request.onerror = () => {
                resolve(null);
            };
        });
    }
    set(key, value) {
        if (typeof indexedDB === "undefined")
            return;
        const store = this.getStore();
        if (!store)
            return;
        store.put({ key, value });
    }
    remove(key) {
        if (typeof indexedDB === "undefined")
            return;
        const store = this.getStore();
        if (!store)
            return;
        store.delete(key);
    }
    clear() {
        if (typeof indexedDB === "undefined")
            return;
        const store = this.getStore();
        if (!store)
            return;
        store.clear();
    }
    keys() {
        return [];
    }
    async keysAsync() {
        if (typeof indexedDB === "undefined")
            return [];
        const store = this.getStore();
        if (!store)
            return [];
        return new Promise((resolve) => {
            const request = store.getAllKeys();
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onerror = () => {
                resolve([]);
            };
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: IndexedDbService, deps: "invalid", target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: IndexedDbService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: IndexedDbService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [{ type: undefined }, { type: undefined }] });

class SignalStore {
    store = new Map();
    subscribers = new Set();
    set(key, value) {
        this.store.set(key, value);
        this.notify(key, value);
    }
    get(key) {
        return this.store.get(key);
    }
    update(key, fn) {
        const current = this.store.get(key);
        const updated = fn(current);
        this.store.set(key, updated);
        this.notify(key, updated);
    }
    delete(key) {
        this.store.delete(key);
        this.notify(key, undefined);
    }
    keys() {
        return Array.from(this.store.keys());
    }
    toJSON() {
        const result = {};
        for (const [key, value] of this.store) {
            result[key] = value;
        }
        return result;
    }
    fromJSON(json) {
        this.store.clear();
        for (const [key, value] of Object.entries(json)) {
            this.store.set(key, value);
        }
        this.notifyAll();
    }
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => {
            this.subscribers.delete(callback);
        };
    }
    /** Creates an Angular-signal-compatible callable for a store key */
    signal(key, initialValue) {
        if (!this.store.has(key)) {
            this.store.set(key, initialValue);
        }
        const self = this;
        const fn = function () {
            return self.get(key);
        };
        fn.set = function (value) {
            self.set(key, value);
        };
        fn.update = function (updater) {
            self.update(key, updater);
        };
        return fn;
    }
    notify(key, value) {
        for (const callback of this.subscribers) {
            callback(key, value);
        }
    }
    notifyAll() {
        for (const [key, value] of this.store) {
            this.notify(key, value);
        }
    }
}
function createSignalStore() {
    return new SignalStore();
}

const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 100;
class StorageCacheService {
    shared;
    namespace;
    defaultTtl = DEFAULT_CACHE_TTL_MS;
    cacheInvalidated = signal(false, ...(ngDevMode ? [{ debugName: "cacheInvalidated" }] : []));
    constructor() {
        this.shared = {
            cache: new Map(),
            reactiveCache: new Map(),
            cacheTimestamps: new Map(),
            inFlightRequests: new Map(),
        };
        this.namespace = "";
    }
    ns(key) {
        return this.namespace ? `${this.namespace}:${key}` : key;
    }
    // ─── Basic TTL cache ────────────────────────────────────────────────
    get(key) {
        const k = this.ns(key);
        const entry = this.shared.cache.get(k);
        if (!entry)
            return null;
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.shared.cache.delete(k);
            return null;
        }
        return entry.value;
    }
    set(key, value, ttl) {
        const k = this.ns(key);
        this.shared.cache.set(k, {
            value,
            timestamp: Date.now(),
            ttl: ttl ?? this.defaultTtl,
        });
    }
    setDefaultTtl(ttl) {
        this.defaultTtl = ttl;
    }
    invalidate(key) {
        this.shared.cache.delete(this.ns(key));
    }
    invalidateAll() {
        if (this.namespace) {
            const prefix = `${this.namespace}:`;
            for (const key of this.shared.cache.keys()) {
                if (key.startsWith(prefix))
                    this.shared.cache.delete(key);
            }
        }
        else {
            this.shared.cache.clear();
        }
    }
    has(key) {
        const k = this.ns(key);
        const entry = this.shared.cache.get(k);
        if (!entry)
            return false;
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
            this.shared.cache.delete(k);
            return false;
        }
        return true;
    }
    delete(key) {
        this.shared.cache.delete(this.ns(key));
    }
    clear() {
        if (this.namespace) {
            const prefix = `${this.namespace}:`;
            for (const key of this.shared.cache.keys()) {
                if (key.startsWith(prefix))
                    this.shared.cache.delete(key);
            }
        }
        else {
            this.shared.cache.clear();
        }
    }
    clearPattern(pattern) {
        const nsPrefix = this.namespace ? `^${this.namespace}:` : "";
        const regex = new RegExp(nsPrefix + pattern);
        for (const key of this.shared.cache.keys()) {
            if (regex.test(key)) {
                this.shared.cache.delete(key);
            }
        }
    }
    // ─── Reactive cache ──────────────────────────────────────────────────
    hasCachedData(key) {
        return this.shared.reactiveCache.has(this.ns(key));
    }
    getReactiveCache(key) {
        return this.shared.reactiveCache.get(this.ns(key));
    }
    setReactiveCache(key, value) {
        this.shared.reactiveCache.set(this.ns(key), value);
    }
    // ─── Timestamp tracking ─────────────────────────────────────────────
    getCacheTimestamp(key) {
        return this.shared.cacheTimestamps.get(this.ns(key));
    }
    setCacheTimestamp(key, timestamp) {
        this.shared.cacheTimestamps.set(this.ns(key), timestamp);
    }
    isCacheValid(key, ttlMs = DEFAULT_CACHE_TTL_MS) {
        const timestamp = this.shared.cacheTimestamps.get(this.ns(key));
        if (!timestamp)
            return false;
        return Date.now() - timestamp < ttlMs;
    }
    // ─── Cache size management ──────────────────────────────────────────
    isCacheFull() {
        return this.shared.reactiveCache.size >= MAX_CACHE_SIZE;
    }
    evictOldestCache() {
        const entries = Array.from(this.shared.cacheTimestamps.entries());
        const nsPrefix = this.namespace ? `${this.namespace}:` : "";
        const filtered = nsPrefix
            ? entries.filter(([key]) => key.startsWith(nsPrefix))
            : entries;
        const sortedKeys = filtered
            .sort((a, b) => a[1] - b[1])
            .slice(0, 10)
            .map(([key]) => key);
        for (const key of sortedKeys) {
            this.shared.reactiveCache.delete(key);
            this.shared.cacheTimestamps.delete(key);
        }
    }
    // ─── Invalidation ───────────────────────────────────────────────────
    invalidateCache() {
        if (this.namespace) {
            const prefix = `${this.namespace}:`;
            for (const key of this.shared.reactiveCache.keys()) {
                if (key.startsWith(prefix))
                    this.shared.reactiveCache.delete(key);
            }
            for (const key of this.shared.cacheTimestamps.keys()) {
                if (key.startsWith(prefix))
                    this.shared.cacheTimestamps.delete(key);
            }
        }
        else {
            this.shared.reactiveCache.clear();
            this.shared.cacheTimestamps.clear();
        }
        this.cacheInvalidated.set(true);
        setTimeout(() => this.cacheInvalidated.set(false), 0);
    }
    clearAll() {
        if (this.namespace) {
            const prefix = `${this.namespace}:`;
            for (const key of this.shared.reactiveCache.keys()) {
                if (key.startsWith(prefix))
                    this.shared.reactiveCache.delete(key);
            }
            for (const key of this.shared.cacheTimestamps.keys()) {
                if (key.startsWith(prefix))
                    this.shared.cacheTimestamps.delete(key);
            }
        }
        else {
            this.shared.reactiveCache.clear();
            this.shared.cacheTimestamps.clear();
        }
        this.cacheInvalidated.set(true);
        setTimeout(() => this.cacheInvalidated.set(false), 0);
    }
    // ─── Request deduplication ───────────────────────────────────────────
    getOrFetch(key, fetchFn, ttl = DEFAULT_CACHE_TTL_MS) {
        const k = this.ns(key);
        const existing = this.shared.inFlightRequests.get(k);
        if (existing)
            return existing;
        const requestPromise = (async () => {
            try {
                const result = await fetchFn();
                this.setCacheTimestamp(key, Date.now());
                return result;
            }
            finally {
                this.shared.inFlightRequests.delete(k);
            }
        })();
        this.shared.inFlightRequests.set(k, requestPromise);
        return requestPromise;
    }
    hasInFlightRequest(key) {
        return this.shared.inFlightRequests.has(this.ns(key));
    }
    getInFlightRequest(key) {
        return this.shared.inFlightRequests.get(this.ns(key));
    }
    // ─── Sub-cache namespacing ───────────────────────────────────────────
    /**
     * Returns a sub-cache that shares the same underlying storage as this cache
     * but isolates keys under the given namespace.
     *
     * Usage:
     *   const tasksCache = cache.getSubCache('tasks');
     *   const chatsCache = cache.getSubCache('chats');
     *   tasksCache.set('todo:1', data);   // stored as 'tasks:todo:1'
     *   chatsCache.set('msg:1', data);    // stored as 'chats:msg:1'
     */
    getSubCache(name) {
        const subNamespace = this.namespace
            ? `${this.namespace}:${name}`
            : name;
        const sub = new StorageCacheService();
        sub.shared = this.shared;
        sub.namespace = subNamespace;
        return sub;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StorageCacheService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StorageCacheService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: StorageCacheService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class StorageQueryService {
    query(items, filter) {
        return items.filter((item) => {
            return filter.every((f) => {
                const value = item[f.field];
                switch (f.operator) {
                    case "eq":
                        return value === f.value;
                    case "ne":
                        return value !== f.value;
                    case "gt":
                        return value > f.value;
                    case "gte":
                        return value >= f.value;
                    case "lt":
                        return value < f.value;
                    case "lte":
                        return value <= f.value;
                    case "contains":
                        return String(value).includes(String(f.value));
                    case "in":
                        return f.value.includes(value);
                    default:
                        return true;
                }
            });
        });
    }
    sortBy(items, field, direction = "asc") {
        return [...items].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return direction === "asc" ? cmp : -cmp;
        });
    }
    paginate(items, page, pageSize) {
        const start = (page - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }
}

class UnifiedStorageService {
    signalStore;
    cache;
    query;
    constructor() {
        this.signalStore = new SignalStore();
        this.cache = new StorageCacheService();
        this.query = new StorageQueryService();
    }
    async get(key) {
        const cached = this.cache.get(key);
        if (cached !== null)
            return cached;
        const value = this.signalStore.get(key);
        if (value !== null) {
            this.cache.set(key, value);
        }
        return value;
    }
    async set(key, value) {
        this.signalStore.set(key, value);
        this.cache.set(key, value);
    }
    async find(filter) {
        const all = this.signalStore
            .keys()
            .map((k) => this.signalStore.get(k));
        return this.query.query(all, filter);
    }
    async remove(key) {
        this.signalStore.delete(key);
        this.cache.invalidate(key);
    }
}

class CrudService {
    async find(entity, id) {
        const result = await this.execute("find", entity, {
            filter: { id },
        });
        return result.data ?? null;
    }
    async findAll(entity, filter) {
        const result = await this.execute("find", entity, {
            filter: filter,
        });
        return result.data ?? [];
    }
    async create(entity, data) {
        const result = await this.execute("create", entity, { data });
        return result.data;
    }
    async update(entity, id, data) {
        const result = await this.execute("update", entity, {
            id,
            data,
        });
        return result.data;
    }
    async patch(entity, id, data) {
        const result = await this.execute("patch", entity, {
            id,
            data,
        });
        return result.data;
    }
    async delete(entity, id) {
        await this.execute("delete", entity, { id });
    }
    async count(entity) {
        const result = await this.execute("count", entity);
        return result.count;
    }
    async exists(entity, id) {
        const result = await this.execute("exists", entity, {
            id,
        });
        return result.exists;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: CrudService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

/**
 * Unified CRUD service that maps to Rust define_crud_routes! commands.
 *
 * Naming convention: entity "connection" → Rust command `connection_get`, `connection_get_all`, etc.
 * Custom commands: call `.custom('my_command', { arg: value })` for app-specific Tauri commands.
 */
class ApiCrudService {
    invoke = inject(InvokeWrapperService);
    /** Get a single entity by ID — calls `{entity}_get` */
    async get(entity, id, options) {
        return this.invoke.invoke(`${entity}_get`, { id }, options);
    }
    /** Get all entities with optional filtering/pagination — calls `{entity}_get_all` */
    async getAll(entity, filter, skip, limit, sortBy, sortAsc) {
        return this.invoke.invoke(`${entity}_get_all`, {
            filter,
            skip,
            limit,
            sort_by: sortBy,
            sort_asc: sortAsc,
        });
    }
    /** Create a new entity — calls `{entity}_create` */
    async create(entity, data) {
        return this.invoke.invoke(`${entity}_create`, { data });
    }
    /** Full update of an entity — calls `{entity}_update` */
    async update(entity, id, data) {
        return this.invoke.invoke(`${entity}_update`, { id, data });
    }
    /** Partial update of an entity — calls `{entity}_patch` */
    async patch(entity, id, patch) {
        return this.invoke.invoke(`${entity}_patch`, { id, patch });
    }
    /** Delete an entity — calls `{entity}_delete` */
    async delete(entity, id) {
        return this.invoke.invoke(`${entity}_delete`, { id });
    }
    /**
     * Call any custom Tauri command not covered by standard CRUD.
     * Use for app-specific commands that don't follow the `{entity}_{operation}` pattern.
     */
    async custom(command, args) {
        return this.invoke.invoke(command, args);
    }
    // Retry variants for unreliable operations
    /** Get with automatic retry on failure */
    async getWithRetry(entity, id, retryOptions) {
        return invokeWithRetry(() => this.invoke.invoke(`${entity}_get`, { id }), retryOptions ?? {
            maxAttempts: 3,
            initialDelayMs: 1000,
            maxDelayMs: 30000,
        });
    }
    /** Custom command with automatic retry on failure */
    async customWithRetry(command, args, retryOptions) {
        return invokeWithRetry(() => this.invoke.invoke(command, args), retryOptions ?? {
            maxAttempts: 3,
            initialDelayMs: 1000,
            maxDelayMs: 30000,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ApiCrudService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ApiCrudService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ApiCrudService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

class SchemaSetupService {
    invokeWrapper = inject(InvokeWrapperService);
    schemaRouter = inject(SchemaRouterService);
    renderer = inject(SchemaRendererService);
    themeService = inject(StyleThemeService);
    fallbackService = inject(FallbackService);
    handlerExecutor = inject(HandlerExecutorService);
    router = null;
    schemaLoaded = signal(false, ...(ngDevMode ? [{ debugName: "schemaLoaded" }] : []));
    setupError = signal(null, ...(ngDevMode ? [{ debugName: "setupError" }] : []));
    /**
     * Complete schema setup: load, validate, register, navigate.
     * This replaces per-app schema loading boilerplate.
     */
    async setup(appId, options) {
        this.schemaLoaded.set(false);
        this.setupError.set(null);
        this.handlerExecutor.setRouter(this.schemaRouter);
        const commandName = options?.commandName ?? "get_ui_schema";
        const themeVariant = options?.themeVariant ?? "material-design-v3";
        try {
            this.themeService.loadTheme(themeVariant);
            const schema = await this.loadSchema(appId, commandName, options);
            if (!schema)
                return null;
            this.registerFunctions(options);
            this.applyTheme(schema, themeVariant, options);
            const route = options?.initialRoute ||
                schema.pages?.[0]?.route ||
                `/${schema.pages?.[0]?.id || ""}`;
            logger.log(`[SchemaSetup] navigating to "${route}"`);
            await this.schemaRouter.navigate(route);
            if (options?.autoRegisterRoutes === true) {
                this.registerRouter();
            }
            options?.onSchemaLoaded?.(schema);
            this.schemaLoaded.set(true);
            return schema;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.setupError.set(message);
            options?.onError?.(err instanceof Error ? err : new Error(message));
            if (options?.errorFallbackCommandName) {
                return this.tryFallback(appId, options);
            }
            return null;
        }
    }
    /**
     * Set the Angular Router instance for route registration.
     * Called automatically if Router is available via DI.
     */
    setRouter(router) {
        this.router = router;
    }
    /**
     * Register all schema pages as Angular Routes pointing to SchemaRouteViewerComponent.
     * Must be called AFTER schema is loaded.
     */
    registerRouter() {
        const activeRouter = this.router ?? inject(Router, { optional: true });
        if (!activeRouter) {
            logger.warn("[SchemaSetup] Router not available for route registration");
            return;
        }
        const routes = this.toAngularRoutes();
        if (routes.length === 0)
            return;
        logger.log(`[SchemaSetup] registering ${routes.length} Angular routes from schema`);
        activeRouter.resetConfig(routes);
    }
    /**
     * Convert all schema pages to Angular Routes.
     * Each route points to SchemaRouteViewerComponent with page data in route data.
     */
    toAngularRoutes() {
        const pages = this.schemaRouter.getAllPages();
        if (pages.length === 0)
            return [];
        const routes = pages.map((page) => {
            const path = page.route?.replace(/^\//, "") || page.id;
            const paramPath = path.replace(/:(\w+)/g, (_, param) => `:${param}`);
            return {
                path: paramPath,
                component: SchemaRouteViewerComponent,
                data: { pageId: page.id, page },
            };
        });
        const firstPage = pages[0];
        const firstPath = firstPage?.route?.replace(/^\//, "") || firstPage?.id || "";
        routes.push({ path: "", redirectTo: firstPath, pathMatch: "full" });
        routes.push({ path: "**", redirectTo: firstPath });
        return routes;
    }
    async loadSchema(appId, commandName, options) {
        const response = await this.invokeWrapper.invoke(commandName, {
            id: appId,
        });
        logger.log(`[SchemaSetup] invoke("${commandName}") response:`, response ? `pages=${response?.data?.pages?.length}` : "null");
        const schema = response?.data ?? response;
        if (!schema?.pages?.length) {
            this.setupError.set("Schema has no pages. Create it in Designer and sync.");
            return null;
        }
        this.schemaRouter.setSchema(schema);
        this.renderer.loadSchema(schema);
        if (schema.handlers) {
            this.handlerExecutor.setHandlers(schema.handlers);
        }
        return schema;
    }
    async tryFallback(appId, options) {
        try {
            const fallbackResponse = await this.invokeWrapper.invoke(options.errorFallbackCommandName, { id: appId });
            const fallbackSchema = fallbackResponse?.data ?? fallbackResponse;
            if (fallbackSchema?.pages?.length) {
                logger.warn("[SchemaSetup] Primary schema failed, using fallback schema");
                this.schemaRouter.setSchema(fallbackSchema);
                this.renderer.loadSchema(fallbackSchema);
                await this.schemaRouter.navigate("/schema-error");
                this.schemaLoaded.set(true);
                return fallbackSchema;
            }
        }
        catch (fallbackErr) {
            logger.error("[SchemaSetup] Fallback schema also failed:", fallbackErr);
        }
        logger.warn("[SchemaSetup] All schema loading failed, using fallback error schema");
        const fallbackSchema = this.fallbackService.getFallbackSchema(this.setupError() ?? "Unknown error");
        this.schemaRouter.setSchema(fallbackSchema);
        this.renderer.loadSchema(fallbackSchema);
        await this.schemaRouter.navigate("/schema-error");
        this.schemaLoaded.set(true);
        return fallbackSchema;
    }
    registerFunctions(options) {
        this.renderer.registerFunction("toggleThemeDark", () => {
            this.themeService.toggleDarkMode();
        });
        this.renderer.registerFunction("reloadSchema", () => {
            this.setupError.set(null);
        });
        if (options?.handlers) {
            this.handlerExecutor.setHandlers(options.handlers);
        }
    }
    applyTheme(schema, defaultVariant, options) {
        const variant = schema.app?.style ?? defaultVariant;
        this.themeService.loadTheme(variant);
        loadStyleVariant(variant).then(() => {
            if (this.themeService.isDarkMode()) {
                this.themeService.setDarkMode(true);
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaSetupService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaSetupService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaSetupService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }] });

const DEFAULT_CONFIG = {
    enableAnimations: false,
    enableHttpClient: false,
    enableBrowserErrorListeners: true,
    enableZoneChangeDetection: true,
};
/**
 * Standardized Angular providers for all Tauri apps.
 *
 * Usage:
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     ...provideUnifiedApp({ appId: 'my-app' }),
 *     // App-specific providers only
 *   ],
 * };
 * ```
 */
function provideUnifiedApp(config) {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    const providers = [];
    if (cfg.enableBrowserErrorListeners) {
        providers.push(provideBrowserGlobalErrorListeners());
    }
    if (cfg.enableAnimations) {
        providers.push(provideAnimationsAsync());
    }
    if (cfg.enableHttpClient) {
        providers.push(provideHttpClient());
    }
    if (cfg.enableZoneChangeDetection) {
        providers.push(provideZoneChangeDetection({ eventCoalescing: true }));
    }
    if (cfg.extraProviders?.length) {
        providers.push(...cfg.extraProviders);
    }
    return providers;
}

class BaseCrudService {
    config;
    mainService;
    cacheService;
    queryService;
    entitiesSignal;
    activeEntitySignal;
    activeEntityIdSignal;
    /** Call as a function: entities() returns T[] */
    entities;
    activeEntity;
    activeEntityId;
    constructor(config, mainService, cacheService, queryService) {
        this.config = {
            showNotifications: true,
            defaultFilter: {},
            ...config,
        };
        this.mainService = mainService;
        this.cacheService = cacheService;
        this.queryService = queryService;
        const store = new SignalStore();
        this.entitiesSignal = store.signal("entities", []);
        this.activeEntitySignal = store.signal("activeEntity", null);
        this.activeEntityIdSignal = store.signal("activeEntityId", null);
        this.entities = this.entitiesSignal;
        this.activeEntity = this.activeEntitySignal;
        this.activeEntityId = this.activeEntityIdSignal;
    }
    getEntityName() {
        return this.config.entityName.toLowerCase();
    }
    getEndpoint() {
        return this.config.endpoint;
    }
    async load(filter) {
        const effectiveFilter = { ...this.config.defaultFilter, ...filter };
        const cacheKey = `${this.config.endpoint}_list`;
        if (this.cacheService.isCacheValid(cacheKey)) {
            const cached = this.cacheService.getReactiveCache(cacheKey);
            if (cached) {
                return cached();
            }
        }
        try {
            const entities = await this.mainService.getAll(this.config.endpoint, effectiveFilter);
            this.setEntities(entities || []);
            this.cacheService.setCacheTimestamp(cacheKey, Date.now());
            return entities || [];
        }
        catch (error) {
            return [];
        }
    }
    async get(filter) {
        try {
            const entity = await this.mainService.get(this.config.endpoint, filter);
            return entity || null;
        }
        catch (error) {
            return null;
        }
    }
    async create(data, showSuccess) {
        try {
            const entity = await this.mainService.create(this.config.endpoint, data);
            if (entity) {
                this.addEntity(entity);
                this.invalidateEndpointCache();
            }
            return entity || null;
        }
        catch (error) {
            return null;
        }
    }
    async update(id, updates, showSuccess) {
        try {
            const entity = await this.mainService.update(this.config.endpoint, id, updates);
            if (entity) {
                this.updateEntity(entity);
                this.invalidateEndpointCache();
            }
            return entity || null;
        }
        catch (error) {
            return null;
        }
    }
    async patch(id, updates, showSuccess) {
        try {
            const entity = await this.mainService.patch(this.config.endpoint, id, updates);
            if (entity) {
                this.updateEntity(entity);
                this.invalidateEndpointCache();
            }
            return entity || null;
        }
        catch (error) {
            return null;
        }
    }
    async delete(id, showSuccess) {
        try {
            await this.mainService.delete(this.config.endpoint, id);
            this.removeEntity(id);
            this.invalidateEndpointCache();
            if (this.activeEntityId() === id) {
                this.setActiveEntityId(null);
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    setActiveEntityId(id) {
        this.activeEntityIdSignal.set(id);
        if (id) {
            const entity = this.entities().find((e) => e.id === id) || null;
            this.setActiveEntity(entity);
        }
        else {
            this.setActiveEntity(null);
        }
    }
    invalidateEndpointCache() {
        this.cacheService.invalidateCache();
    }
    setEntities(entities) {
        this.entitiesSignal.set(entities);
    }
    addEntity(entity) {
        this.entitiesSignal.update((current) => [...current, entity]);
    }
    updateEntity(entity) {
        this.entitiesSignal.update((current) => {
            const index = current.findIndex((e) => e.id === entity.id);
            if (index !== -1) {
                const updated = [...current];
                updated[index] = entity;
                return updated;
            }
            return current;
        });
        if (this.activeEntity()?.id === entity.id) {
            this.setActiveEntity(entity);
        }
    }
    removeEntity(id) {
        this.entitiesSignal.update((current) => current.filter((e) => e.id !== id));
    }
    setActiveEntity(entity) {
        this.activeEntitySignal.set(entity);
    }
    async updateOrder(items) {
        const data = items.map((item, index) => ({
            id: item.id,
            positionIndex: items.length - 1 - index,
        }));
        try {
            await this.mainService.invoke(`${this.config.endpoint}_update_order`, {
                data,
            });
            await this.load();
        }
        catch (error) { }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BaseCrudService, deps: "invalid", target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BaseCrudService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: BaseCrudService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined }, { type: undefined }, { type: undefined }, { type: undefined }] });

// Note: Response.data uses T | null (not Option<T>).
// Rust's Option<T> serializes as null in JSON for None values,
// which TypeScript correctly interprets as T | null.
// This avoids breaking changes for TypeScript consumers.
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["Success"] = "success";
    ResponseStatus["Created"] = "created";
    ResponseStatus["Updated"] = "updated";
    ResponseStatus["Deleted"] = "deleted";
    ResponseStatus["Error"] = "error";
    ResponseStatus["ValidationError"] = "validationError";
    ResponseStatus["NotFound"] = "notFound";
    ResponseStatus["Unauthorized"] = "unauthorized";
    ResponseStatus["Forbidden"] = "forbidden";
    ResponseStatus["Info"] = "info";
    ResponseStatus["Warning"] = "warning";
    ResponseStatus["Duplicate"] = "duplicate";
})(ResponseStatus || (ResponseStatus = {}));
function isSuccess(response) {
    return (response.status === ResponseStatus.Success ||
        response.status === ResponseStatus.Created ||
        response.status === ResponseStatus.Updated ||
        response.status === ResponseStatus.Deleted);
}
function isError(response) {
    return (response.status === ResponseStatus.Error ||
        response.status === ResponseStatus.ValidationError ||
        response.status === ResponseStatus.NotFound ||
        response.status === ResponseStatus.Unauthorized ||
        response.status === ResponseStatus.Forbidden);
}
function getErrorMessage(response) {
    if (isError(response)) {
        return response.message;
    }
    return null;
}
function unwrapResponse(response) {
    if (isError(response)) {
        throw new Error(response.message || "Unknown error");
    }
    if (response.data === null) {
        throw new Error("No data in response");
    }
    return response.data;
}
function mapResponse(response, mapper) {
    return {
        ...response,
        data: response.data !== null ? mapper(response.data) : null,
    };
}

function parseErrorFromInvoke(error) {
    if (error && typeof error === "object") {
        const e = error;
        if ("type" in e && "message" in e) {
            return e;
        }
        if ("message" in e) {
            return {
                type: ErrorType.Internal,
                message: String(e.message),
            };
        }
    }
    if (error instanceof Error) {
        return {
            type: ErrorType.Internal,
            message: error.message,
        };
    }
    return {
        type: ErrorType.Internal,
        message: String(error),
    };
}
async function invokeCommand(command, args, options) {
    const { retryCount = 0, retryDelay = 1000 } = options || {};
    if (retryCount === 0) {
        try {
            const result = await invoke(command, args);
            return {
                success: true,
                data: result,
                error: null,
            };
        }
        catch (error) {
            return {
                success: false,
                data: null,
                error: parseErrorFromInvoke(error),
            };
        }
    }
    try {
        const result = await invokeWithRetry(() => invoke(command, args), {
            maxAttempts: retryCount + 1,
            initialDelayMs: retryDelay,
            maxDelayMs: 60000,
        });
        return {
            success: true,
            data: result,
            error: null,
        };
    }
    catch (error) {
        return {
            success: false,
            data: null,
            error: parseErrorFromInvoke(error),
        };
    }
}
async function invokeCommandWithResponse(command, args, options) {
    const { retryCount = 0, retryDelay = 1000 } = options || {};
    let lastResponse = {
        status: ResponseStatus.Error,
        message: "Unknown error",
        data: null,
    };
    for (let attempt = 0; attempt <= retryCount; attempt++) {
        try {
            const result = await invoke(command, args);
            lastResponse = result;
            if (result.status !== ResponseStatus.Error &&
                result.status !== ResponseStatus.ValidationError) {
                return result;
            }
            if (attempt < retryCount) {
                await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
            }
        }
        catch (error) {
            lastResponse = {
                status: ResponseStatus.Error,
                message: error instanceof Error ? error.message : String(error),
                data: null,
            };
            if (attempt < retryCount) {
                await new Promise((resolve) => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
            }
        }
    }
    return lastResponse;
}
async function invokeVoid(command, args, options) {
    const result = await invokeCommand(command, args, options);
    if (!result.success) {
        throw new Error(result.error?.message || "Command failed");
    }
}
async function invokeWithError(command, args, options) {
    const result = await invokeCommand(command, args, options);
    if (!result.success || result.data === null) {
        const errorMsg = result.error?.message || "Command failed";
        throw new Error(errorMsg);
    }
    return result.data;
}

/**
 * Sort array of objects by property and order
 * @param arr - Array to sort
 * @param key - Property name to sort by
 * @param order - "asc" or "desc"
 */
function sortBy(arr, key, order = "asc") {
    return [...arr].sort((a, b) => {
        const aVal = typeof key === "number" ? a[key] : a[key];
        const bVal = typeof key === "number" ? b[key] : b[key];
        if (aVal < bVal)
            return order === "asc" ? -1 : 1;
        if (aVal > bVal)
            return order === "asc" ? 1 : -1;
        return 0;
    });
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
function lerp(start, end, t) {
    return start + (end - start) * t;
}
function isClose(pos1, pos2, threshold) {
    const dx = pos1.x - pos2.x;
    const dz = pos1.z - pos2.z;
    return dx * dx + dz * dz < threshold * threshold;
}
function calculateDistance3D(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
function easeOutQuad(t) {
    return t * (2 - t);
}
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function formatTime$1(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
function randomInterval(min, max) {
    return Math.floor(randomRange(min, max));
}
function weightedRandom(items) {
    const totalWeight = items.reduce((sum, i) => sum + i.weight, 0);
    let random = Math.random() * totalWeight;
    for (const { item, weight } of items) {
        random -= weight;
        if (random <= 0) {
            return item;
        }
    }
    return items[items.length - 1].item;
}
function randomPitchVariation(variation) {
    return 1 + (Math.random() - 0.5) * variation;
}
function generatePeerId() {
    return Math.floor(Math.random() * 1000000);
}
function lerpVector3D(a, b, t) {
    return [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t,
    ];
}
function lerpAngle(a, b, t) {
    let diff = b - a;
    while (diff > Math.PI)
        diff -= 2 * Math.PI;
    while (diff < -Math.PI)
        diff += 2 * Math.PI;
    return a + diff * t;
}

function truncate(str, maxLength, suffix = "…") {
    if (str.length <= maxLength)
        return str;
    return str.slice(0, maxLength - suffix.length) + suffix;
}
function capitalize(str) {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function convertLocalToUtc(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}
function convertUtcToLocal(date, timezone) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const values = {};
    for (const part of parts) {
        values[part.type] = part.value;
    }
    return new Date(parseInt(values.year), parseInt(values.month) - 1, parseInt(values.day), parseInt(values.hour), parseInt(values.minute), parseInt(values.second));
}
function normalizeDateFields(obj, dateFieldNames = ["start_date", "end_date"]) {
    const normalizedValue = { ...obj };
    for (const fieldName of dateFieldNames) {
        if (fieldName in normalizedValue) {
            const fieldValue = normalizedValue[fieldName];
            if (fieldValue === null || fieldValue === undefined) {
                normalizedValue[fieldName] = "";
            }
        }
    }
    return normalizedValue;
}
function formatDateRelative(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const curDate = new Date();
    const curYear = curDate.getFullYear();
    const curMonth = curDate.getMonth();
    const curDay = curDate.getDate();
    if (day === curDay && month === curMonth && year === curYear) {
        return formatTime(date);
    }
    const yesterday = new Date(curDate);
    yesterday.setDate(curDate.getDate() - 1);
    if (day === yesterday.getDate() &&
        month === yesterday.getMonth() &&
        year === yesterday.getFullYear()) {
        return `Yesterday ${formatTime(date)}`;
    }
    return formatLocaleDate(date);
}
function formatTime(date) {
    if (typeof date === "string") {
        date = new Date(date);
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}
function formatLocaleDate(date) {
    if (typeof date === "string" && date === "") {
        date = new Date();
    }
    if (typeof date === "string") {
        date = new Date(date);
    }
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
function generateCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const days = [];
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        days.push(new Date(date));
    }
    return days;
}
function isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString();
}
/**
 * Compare two entities by their created_at timestamp (descending - newest first)
 */
function compareByTimestamp(a, b) {
    const aTime = getLatestTimestamp(a);
    const bTime = getLatestTimestamp(b);
    return bTime - aTime;
}
/**
 * Get the latest timestamp from created_at/updated_at
 */
function getLatestTimestamp(entity) {
    const created = entity.created_at ? new Date(entity.created_at).getTime() : 0;
    const updated = entity.updated_at ? new Date(entity.updated_at).getTime() : 0;
    return Math.max(created, updated);
}

function findById(items, id) {
    return items.find((item) => item.id === id);
}
function findByIdOrThrow(items, id) {
    const item = items.find((item) => item.id === id);
    if (!item)
        throw new Error(`Item ${id} not found`);
    return item;
}
function upsertEntity(items, entity) {
    const index = items.findIndex((item) => item.id === entity.id);
    if (index >= 0) {
        const updated = [...items];
        updated[index] = entity;
        return updated;
    }
    return [...items, entity];
}
function deduplicateById(items) {
    const seen = new Set();
    return items.filter((item) => {
        if (seen.has(item.id))
            return false;
        seen.add(item.id);
        return true;
    });
}
function groupByField(items, field) {
    return items.reduce((groups, item) => {
        const key = String(item[field]);
        if (!groups[key])
            groups[key] = [];
        groups[key].push(item);
        return groups;
    }, {});
}

function trackByRow(index, row) {
    return String(row["_id"] || row["id"] || index);
}
function trackByIndex(index) {
    return index;
}
/**
 * Group entities by a key function, returning Map
 */
function groupByKey(entities, keyFn) {
    const map = new Map();
    for (const entity of entities) {
        const key = keyFn(entity);
        const list = map.get(key) || [];
        list.push(entity);
        map.set(key, list);
    }
    return map;
}

function evictLRU(cache, maxSize) {
    if (cache.size <= maxSize)
        return cache;
    const sorted = Array.from(cache.entries()).sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    const toRemove = sorted.slice(0, cache.size - maxSize);
    const newCache = new Map(cache);
    for (const [key] of toRemove) {
        newCache.delete(key);
    }
    return newCache;
}
function evictLRUInPlace(map, maxSize) {
    if (map.size <= maxSize)
        return;
    const entries = Array.from(map.entries());
    entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    const toEvict = entries.slice(0, map.size - maxSize);
    for (const [evictKey] of toEvict) {
        map.delete(evictKey);
    }
}
function isStale(timestamp, ttlMs) {
    return Date.now() - timestamp > ttlMs;
}

function generateId(prefix) {
    const id = crypto.randomUUID();
    return prefix ? `${prefix}_${id}` : id;
}
const generateTransactionId = () => generateId("tx");
const generateBatchId = () => generateId("batch");
const generateLogId = () => generateId("log");
const generateQueryId = () => generateId("query");
const generateTabId = () => generateId("tab");

function formatBytes(bytes) {
    if (bytes === 0)
        return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
function formatCompactNumber(num) {
    if (num >= 1_000_000)
        return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000)
        return (num / 1_000).toFixed(1) + "K";
    return num.toString();
}

function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
function isPresent(value) {
    return value !== null && value !== undefined;
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidBase64Image(data) {
    if (!data.startsWith("data:image/"))
        return false;
    const parts = data.split(",");
    if (parts.length !== 2)
        return false;
    const mimePart = parts[0];
    const base64Part = parts[1];
    const mimeMatch = mimePart.match(/^data:image\/(\w+);base64$/);
    if (!mimeMatch)
        return false;
    const validMimes = ["png", "jpeg", "gif", "webp", "svg+xml", "bmp"];
    if (!validMimes.includes(mimeMatch[1]))
        return false;
    try {
        atob(base64Part);
        return true;
    }
    catch {
        return false;
    }
}

function escapeSqlValue(value) {
    if (value === null || value === undefined)
        return "NULL";
    if (typeof value === "number")
        return String(value);
    if (typeof value === "boolean")
        return value ? "1" : "0";
    return `'${String(value).replace(/'/g, "''")}'`;
}
function escapeCsvValue(value) {
    if (value === null || value === undefined)
        return "";
    const str = String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

function deepClone(obj) {
    if (obj === null || typeof obj !== "object")
        return obj;
    if (obj instanceof Date)
        return new Date(obj.getTime());
    if (obj instanceof Array)
        return obj.map((item) => deepClone(item));
    if (obj instanceof Map) {
        const cloned = new Map();
        obj.forEach((value, key) => cloned.set(key, deepClone(value)));
        return cloned;
    }
    if (obj instanceof Set) {
        const cloned = new Set();
        obj.forEach((value) => cloned.add(deepClone(value)));
        return cloned;
    }
    const cloned = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}
function getNestedValue$1(obj, path) {
    if (!path)
        return obj;
    const parts = path.split(".");
    let current = obj;
    for (const part of parts) {
        if (current === null || current === undefined)
            return undefined;
        if (typeof current !== "object")
            return undefined;
        current = current[part];
    }
    return current;
}
function applyUpdate(target, update) {
    return { ...target, ...update };
}

function debounce(fn, delayMs) {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId)
            clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
            timeoutId = null;
        }, delayMs);
    };
}
function throttle(fn, delayMs) {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delayMs) {
            lastCall = now;
            fn(...args);
        }
    };
}
function withLoading(fn, setLoading) {
    return async (...args) => {
        try {
            setLoading(true);
            return await fn(...args);
        }
        finally {
            setLoading(false);
        }
    };
}

function createState(initialValue) {
    const subject = new BehaviorSubject(initialValue);
    const signalFn = () => subject.getValue();
    signalFn.set = (value) => subject.next(value);
    signalFn.update = (fn) => subject.next(fn(subject.getValue()));
    return signalFn;
}
function createStateSubject(initialValue) {
    const subject = new BehaviorSubject(initialValue);
    return {
        state$: subject.asObservable(),
        set: (value) => subject.next(value),
        update: (fn) => subject.next(fn(subject.getValue())),
    };
}
function createDerivedState(state$, derive) {
    return state$.pipe(map((state) => derive(state)), distinctUntilChanged());
}

class EventListenerManager {
    listeners = new Map();
    add(element, event, handler) {
        element.addEventListener(event, handler);
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(handler);
    }
    remove(element, event, handler) {
        element.removeEventListener(event, handler);
        this.listeners.get(event)?.delete(handler);
    }
    removeAll() {
        this.listeners.forEach((handlers) => {
            handlers.clear();
        });
        this.listeners.clear();
    }
}
function createResizeObserver(callback) {
    if (typeof ResizeObserver === "undefined")
        return null;
    return new ResizeObserver(callback);
}
function observeElement(observer, element) {
    observer.observe(element);
}
function unobserveElement(observer, element) {
    observer.unobserve(element);
}

/**
 * Filter array items by search query across multiple fields
 */
function filterBySearch(items, query, fields) {
    if (!query.trim())
        return items;
    const lowerQuery = query.toLowerCase();
    return items.filter((item) => fields.some((field) => {
        const value = getNestedValue(item, field);
        return (typeof value === "string" && value.toLowerCase().includes(lowerQuery));
    }));
}
function getNestedValue(obj, path) {
    if (typeof path === "string" && path.includes(".")) {
        return path.split(".").reduce((o, k) => o?.[k], obj);
    }
    return obj[path];
}

/**
 * Route guard that checks resource-action permissions.
 *
 * Usage in route config:
 * {
 *   path: 'admin',
 *   canActivate: [rbacGuard],
 *   data: {
 *     permissions: ['users.read', 'settings.write'],
 *     requireAll: false  // OR logic (default), true = AND logic
 *   }
 * }
 */
const rbacGuard = (route, _state) => {
    const injector = inject(Injector);
    const permissionService = injector.get(PermissionService);
    const router = injector.get(Router);
    if (!permissionService.isAuthenticated()) {
        router.navigate(["/login"]);
        return false;
    }
    const requiredPermissions = route.data?.["permissions"];
    const requireAll = route.data?.["requireAll"] ?? false;
    if (requiredPermissions && requiredPermissions.length > 0) {
        const results = requiredPermissions.map((perm) => {
            const [resource, action] = perm.split(".");
            return permissionService.hasPermission(resource, action);
        });
        if (requireAll) {
            if (!results.every((r) => r)) {
                router.navigate(["/unauthorized"]);
                return false;
            }
        }
        else {
            if (!results.some((r) => r)) {
                router.navigate(["/unauthorized"]);
                return false;
            }
        }
    }
    return true;
};
/**
 * Guard that checks for specific roles.
 *
 * Usage in route config:
 * {
 *   path: 'admin',
 *   canActivate: [rbacRoleGuard],
 *   data: {
 *     roles: ['admin', 'moderator']
 *   }
 * }
 */
const rbacRoleGuard = (route, _state) => {
    const injector = inject(Injector);
    const permissionService = injector.get(PermissionService);
    const router = injector.get(Router);
    if (!permissionService.isAuthenticated()) {
        router.navigate(["/login"]);
        return false;
    }
    const requiredRoles = route.data?.["roles"];
    if (requiredRoles && requiredRoles.length > 0) {
        const hasRole = requiredRoles.some((role) => permissionService.hasRole(role));
        if (!hasRole) {
            router.navigate(["/unauthorized"]);
            return false;
        }
    }
    return true;
};

/**
 * Structural directive that shows/hides content based on permission.
 *
 * Usage:
 * <button *rbacHasPermission="'users.write'">Edit Users</button>
 * <div *rbacHasPermission="'users.delete'; else noPerm">Delete</div>
 * <ng-template #noPerm>No permission</ng-template>
 *
 * Supports AND logic with multiple permissions:
 * <button *rbacHasPermission="['users.write', 'users.admin']">Admin Action</button>
 */
class RbacHasPermissionDirective {
    permissionService;
    templateRef;
    viewContainer;
    permission = "";
    constructor(permissionService, templateRef, viewContainer) {
        this.permissionService = permissionService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        this.updateView();
    }
    updateView() {
        const hasPermission = this.checkPermission();
        this.viewContainer.clear();
        if (hasPermission) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
    checkPermission() {
        if (Array.isArray(this.permission)) {
            return this.permission.every((perm) => {
                const [resource, action] = perm.split(".");
                return resource && action
                    ? this.permissionService.hasPermission(resource, action)
                    : false;
            });
        }
        const [resource, action] = this.permission.split(".");
        return resource && action
            ? this.permissionService.hasPermission(resource, action)
            : false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacHasPermissionDirective, deps: [{ token: PermissionService }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.25", type: RbacHasPermissionDirective, isStandalone: true, selector: "[rbacHasPermission]", inputs: { permission: ["rbacHasPermission", "permission"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacHasPermissionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[rbacHasPermission]",
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: PermissionService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }], propDecorators: { permission: [{
                type: Input,
                args: ["rbacHasPermission"]
            }] } });
/**
 * Structural directive that shows/hides content based on role membership.
 *
 * Usage:
 * <button *rbacHasRole="'admin'">Admin Panel</button>
 * <div *rbacHasRole="['editor', 'moderator']">Can Edit</div>
 */
class RbacHasRoleDirective {
    permissionService;
    templateRef;
    viewContainer;
    role = "";
    constructor(permissionService, templateRef, viewContainer) {
        this.permissionService = permissionService;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        this.updateView();
    }
    updateView() {
        const hasRole = this.checkRole();
        this.viewContainer.clear();
        if (hasRole) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
    checkRole() {
        if (Array.isArray(this.role)) {
            return this.role.some((r) => this.permissionService.hasRole(r));
        }
        return this.permissionService.hasRole(this.role);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacHasRoleDirective, deps: [{ token: PermissionService }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.25", type: RbacHasRoleDirective, isStandalone: true, selector: "[rbacHasRole]", inputs: { role: ["rbacHasRole", "role"] }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: RbacHasRoleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[rbacHasRole]",
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: PermissionService }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }], propDecorators: { role: [{
                type: Input,
                args: ["rbacHasRole"]
            }] } });

/**
 * Update service for checking, downloading, and installing app updates via Tauri backend.
 */
class UpdateService {
    /**
     * Check for available updates.
     * Returns UpdateInfo if an update is available, null otherwise.
     */
    async checkForUpdates() {
        try {
            const result = await invoke("check_for_update");
            return result;
        }
        catch {
            return null;
        }
    }
    /**
     * Download an update with optional progress callback.
     * Returns the path to the downloaded installer.
     */
    async downloadUpdate(info, onProgress) {
        if (onProgress) {
            // Subscribe to download progress events if the backend supports them
            const unlisten = await invoke("subscribe_download_progress", {});
            // The Rust backend should emit progress events that the frontend listens to
            // For now, we invoke the download command which may stream progress
            const path = await invoke("download_update", {
                url: info.download_url,
                assetName: info.asset_name,
            });
            return path;
        }
        return invoke("download_update", {
            url: info.download_url,
            assetName: info.asset_name,
        });
    }
    /**
     * Install the update from the given installer path.
     */
    async installUpdate(path) {
        await invoke("install_update", { installerPath: path });
    }
    /**
     * Get the current app version.
     */
    async getCurrentVersion() {
        return invoke("get_current_version");
    }
}

/**
 * Reusable about/check-update pattern for apps that distribute via GitHub Releases.
 * Fetches release info from GitHub API and uses UpdateService for download/install.
 */
class AboutService {
    appName;
    owner;
    repo;
    updateService;
    constructor(appName, owner, repo) {
        this.appName = appName;
        this.owner = owner;
        this.repo = repo;
        this.updateService = new UpdateService();
    }
    /**
     * Check for updates by fetching the latest GitHub release.
     * Returns UpdateInfo if a newer version is available, null otherwise.
     */
    async checkUpdate() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/releases/latest`);
            if (!response.ok) {
                return null;
            }
            const release = await response.json();
            const latestVersion = release.tag_name.startsWith("v")
                ? release.tag_name.slice(1)
                : release.tag_name;
            const currentVersion = await this.updateService.getCurrentVersion();
            // Compare versions - simple semver comparison
            if (this.isNewerVersion(latestVersion, currentVersion)) {
                // Find the primary asset (first non-source asset)
                const asset = release.assets.find((a) => !a.name.endsWith(".tar.gz") && !a.name.endsWith(".zip"));
                const downloadUrl = asset?.browser_download_url ??
                    `https://github.com/${this.owner}/${this.repo}/releases/download/${release.tag_name}/${asset?.name ?? ""}`;
                const assetSize = asset?.size ?? 0;
                return {
                    current_version: currentVersion,
                    latest_version: latestVersion,
                    download_url: downloadUrl,
                    asset_name: asset?.name ?? "",
                    asset_size: assetSize,
                    release_notes: release.body ?? undefined,
                };
            }
            return null;
        }
        catch {
            return null;
        }
    }
    /**
     * Download and install the latest update.
     * Requires checkUpdate() to have been called first to populate cached info.
     */
    async downloadAndInstall(onProgress) {
        const info = await this.checkUpdate();
        if (!info) {
            throw new Error("No update available");
        }
        const path = await this.updateService.downloadUpdate(info, onProgress);
        await this.updateService.installUpdate(path);
    }
    isNewerVersion(latest, current) {
        const latestParts = latest.split(".").map(Number);
        const currentParts = current.split(".").map(Number);
        for (let i = 0; i < Math.max(latestParts.length, currentParts.length); i++) {
            const l = latestParts[i] ?? 0;
            const c = currentParts[i] ?? 0;
            if (l > c)
                return true;
            if (l < c)
                return false;
        }
        return false;
    }
}

// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions
// Side-effect import: registers ALL Angular components in SCHEMA_COMPONENT_MAP
// MUST be imported before any schema rendering

/**
 * Generated bundle index. Do not edit.
 */

export { AboutService, ApiCrudService, ApiException, BaseCrudService, BaseDestroyableComponent, ComponentRegistryService, DataBindingResolverService, ErrorHandlerService, ErrorType, EventBusService, EventListenerManager, GuardService, HandlerExecutorService, I18nService, IndexedDbService, InvokeWrapperService, LayoutEngineService, LocalStorageService, PaginationComponent, PermissionService, RbacHasPermissionDirective, RbacHasRoleDirective, CrudService as RemoteCrudService, ResponseStatus, SCHEMA_COMPONENT_MAP, SchemaElementComponent, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, SchemaSetupService, SchemaShellComponent, SignalLoggerService, SignalStore, SignalStoreService, SignalSyncService, StorageCacheService, StorageQueryService, StorageService, StyleThemeService, StyleThemeService as ThemeService, ThemeToggleService, ToastService, TodoPermission, UnifiedStorageService, UpdateService, applyUpdate, calculateDistance3D, capitalize, clamp, compareByTimestamp, createDerivedState, createResizeObserver, createSignalStore, createState, createStateSubject, dataComponents, debounce, deduplicateById, deepClone, easeInOutQuad, easeOutQuad, escapeCsvValue, escapeSqlValue, evictLRU, evictLRUInPlace, feedbackComponents, filterBySearch, findById, findByIdOrThrow, formatBytes, formatCompactNumber, formatDateRelative, formatError, formatLocaleDate, formatTime$1 as formatTime, formatTime as formatTimeFromDate, generateBatchId, generateCalendarDays, generateId, generateLogId, generatePeerId, generateQueryId, generateTabId, generateTransactionId, getAllStyleVariants, getComponentStyleClasses, getCurrentStyle, getErrorMessage, getLatestTimestamp, getNestedValue$1 as getNestedValue, getStyleClassPrefix, groupByField, groupByKey, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, isClose, isError, isNullOrUndefined, isPresent, isSameDay, isStale, isSuccess, isValidBase64Image, isValidEmail, layoutComponents, lerp, lerpAngle, lerpVector3D, loadStyleVariant, mapResponse, observeElement, parseError, parseJsonOrDefault, provideUnifiedApp, randomChoice, randomChoice as randomElement, randomInt, randomInterval, randomPitchVariation, randomRange, rbacGuard, rbacRoleGuard, registerSchemaComponent, setCurrentStyle, slugify, sortBy, throttle, trackByIndex, trackByRow, truncate, uiComponents, unobserveElement, unwrapResponse, upsertEntity, weightedRandom, withLoading };
//# sourceMappingURL=tauri-front-shared.mjs.map
