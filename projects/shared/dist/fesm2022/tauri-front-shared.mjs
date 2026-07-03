import { __decorate } from 'tslib';
import { LitElement, css, html } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import * as i0 from '@angular/core';
import { signal, computed, Injectable, inject, Injector, runInInjectionContext, effect, ViewChild, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { invoke } from '@tauri-apps/api/core';
import { BehaviorSubject } from 'rxjs';
import * as i1 from '@angular/forms';
import { FormsModule } from '@angular/forms';

const uiComponents = [
    {
        id: "button",
        name: "Button",
        selector: "app-button",
        packageType: "ui",
        category: "forms",
        props: [
            {
                name: "variant",
                type: "select",
                default: "primary",
                options: ["primary", "secondary", "danger"],
            },
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
            { name: "disabled", type: "boolean", default: false },
        ],
        template: "<button>Button</button>",
        css: ":host { display: inline-flex; }",
    },
    {
        id: "badge",
        name: "Badge",
        selector: "app-badge",
        packageType: "ui",
        category: "display",
        props: [
            {
                name: "variant",
                type: "select",
                default: "default",
                options: ["default", "primary", "success", "warning", "danger"],
            },
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
        ],
        template: "<span>Badge</span>",
        css: ":host { display: inline-flex; }",
    },
    {
        id: "avatar",
        name: "Avatar",
        selector: "app-avatar",
        packageType: "ui",
        category: "display",
        props: [
            { name: "src", type: "string", default: "" },
            { name: "alt", type: "string", default: "Avatar" },
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
        ],
        template: '<img alt="Avatar" />',
        css: ":host { display: inline-flex; }",
    },
    {
        id: "chip",
        name: "Chip",
        selector: "app-chip",
        packageType: "ui",
        category: "display",
        props: [
            { name: "label", type: "string", default: "" },
            { name: "removable", type: "boolean", default: false },
        ],
        template: "<span>Chip</span>",
        css: ":host { display: inline-flex; }",
    },
    {
        id: "input",
        name: "Input",
        selector: "app-input",
        packageType: "ui",
        category: "forms",
        props: [
            {
                name: "type",
                type: "select",
                default: "text",
                options: ["text", "email", "password", "number"],
            },
            { name: "placeholder", type: "string", default: "" },
            { name: "disabled", type: "boolean", default: false },
        ],
        template: '<input type="text" />',
        css: ":host { display: block; }",
    },
    {
        id: "checkbox",
        name: "Checkbox",
        selector: "app-checkbox",
        packageType: "ui",
        category: "forms",
        props: [
            { name: "checked", type: "boolean", default: false },
            { name: "label", type: "string", default: "" },
        ],
        template: '<label><input type="checkbox" /> Checkbox</label>',
        css: ":host { display: block; }",
    },
    {
        id: "radio",
        name: "Radio",
        selector: "app-radio",
        packageType: "ui",
        category: "forms",
        props: [
            { name: "name", type: "string", default: "" },
            { name: "value", type: "string", default: "" },
        ],
        template: '<label><input type="radio" /> Radio</label>',
        css: ":host { display: block; }",
    },
    {
        id: "tabs",
        name: "Tabs",
        selector: "app-tabs",
        packageType: "ui",
        category: "layout",
        props: [{ name: "tabs", type: "string", default: '["Tab 1", "Tab 2"]' }],
        template: "<div><button>Tab 1</button><button>Tab 2</button></div>",
        css: ":host { display: block; }",
    },
    {
        id: "empty-state",
        name: "Empty State",
        selector: "app-empty-state",
        packageType: "ui",
        category: "display",
        props: [
            { name: "title", type: "string", default: "No data" },
            { name: "message", type: "string", default: "" },
        ],
        template: "<div><p>No data</p></div>",
        css: ":host { display: block; }",
    },
    {
        id: "loading",
        name: "Loading",
        selector: "app-loading",
        packageType: "ui",
        category: "feedback",
        props: [
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
        ],
        template: "<div>Loading...</div>",
        css: ":host { display: block; }",
    },
    {
        id: "pagination",
        name: "Pagination",
        selector: "app-pagination",
        packageType: "ui",
        category: "navigation",
        props: [
            { name: "page", type: "number", default: 1 },
            { name: "total", type: "number", default: 10 },
        ],
        template: "<div>Pagination</div>",
        css: ":host { display: block; }",
    },
    {
        id: "tooltip",
        name: "Tooltip",
        selector: "app-tooltip",
        packageType: "ui",
        category: "feedback",
        props: [
            { name: "text", type: "string", default: "" },
            {
                name: "position",
                type: "select",
                default: "top",
                options: ["top", "bottom", "left", "right"],
            },
        ],
        template: "<span>Tooltip</span>",
        css: ":host { display: inline-flex; }",
    },
    {
        id: "progress-bar",
        name: "Progress Bar",
        selector: "app-progress-bar",
        packageType: "ui",
        category: "feedback",
        props: [
            { name: "value", type: "number", default: 0 },
            { name: "max", type: "number", default: 100 },
        ],
        template: "<div><div>Progress</div></div>",
        css: ":host { display: block; }",
    },
    {
        id: "slider",
        name: "Slider",
        selector: "app-slider",
        packageType: "ui",
        category: "forms",
        props: [
            { name: "min", type: "number", default: 0 },
            { name: "max", type: "number", default: 100 },
            { name: "value", type: "number", default: 50 },
        ],
        template: '<input type="range" />',
        css: ":host { display: block; }",
    },
    {
        id: "select",
        name: "Select",
        selector: "app-select",
        packageType: "ui",
        category: "forms",
        props: [
            { name: "options", type: "string", default: "[]" },
            { name: "placeholder", type: "string", default: "Select..." },
        ],
        template: "<select><option>Option</option></select>",
        css: ":host { display: block; }",
    },
    {
        id: "switch",
        name: "Switch",
        selector: "app-switch",
        packageType: "ui",
        category: "forms",
        props: [{ name: "checked", type: "boolean", default: false }],
        template: '<label><input type="checkbox" /> Switch</label>',
        css: ":host { display: block; }",
    },
];
const layoutComponents = [
    {
        id: "split-view",
        name: "Split View",
        selector: "app-split-view",
        packageType: "layout",
        category: "layout",
        props: [
            {
                name: "direction",
                type: "select",
                default: "horizontal",
                options: ["horizontal", "vertical"],
            },
            { name: "split", type: "number", default: 50 },
        ],
        template: "<div><div>Left</div><div>Right</div></div>",
        css: ":host { display: block; }",
    },
    {
        id: "page-container",
        name: "Page Container",
        selector: "app-page-container",
        packageType: "layout",
        category: "layout",
        props: [{ name: "title", type: "string", default: "" }],
        template: "<div><h1>Page</h1><ng-content></ng-content></div>",
        css: ":host { display: block; }",
    },
    {
        id: "page-toolbar",
        name: "Page Toolbar",
        selector: "app-page-toolbar",
        packageType: "layout",
        category: "layout",
        props: [{ name: "title", type: "string", default: "" }],
        template: "<div><span>Toolbar</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "header",
        name: "Header",
        selector: "app-header",
        packageType: "layout",
        category: "layout",
        props: [
            { name: "title", type: "string", default: "" },
            { name: "breadcrumbs", type: "string", default: "" },
        ],
        template: "<header><nav>Header</nav></header>",
        css: ":host { display: block; }",
    },
    {
        id: "sidebar",
        name: "Sidebar",
        selector: "app-sidebar",
        packageType: "layout",
        category: "layout",
        props: [
            { name: "collapsed", type: "boolean", default: false },
            { name: "items", type: "string", default: "[]" },
        ],
        template: "<nav><ul><li>Item</li></ul></nav>",
        css: ":host { display: block; }",
    },
    {
        id: "footer",
        name: "Footer",
        selector: "app-footer",
        packageType: "layout",
        category: "layout",
        props: [{ name: "text", type: "string", default: "" }],
        template: "<footer><span>Footer</span></footer>",
        css: ":host { display: block; }",
    },
    {
        id: "main-editor",
        name: "Main Editor",
        selector: "app-main-editor",
        packageType: "layout",
        category: "layout",
        props: [],
        template: "<div><span>Canvas</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "bottom-panel",
        name: "Bottom Panel",
        selector: "app-bottom-panel",
        packageType: "layout",
        category: "layout",
        props: [
            { name: "tabs", type: "string", default: "[]" },
            { name: "activeTab", type: "string", default: "pages" },
        ],
        template: "<div><span>Bottom Panel</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "designer-sidebar",
        name: "Designer Sidebar",
        selector: "app-designer-sidebar",
        packageType: "layout",
        category: "designer",
        props: [
            {
                name: "position",
                type: "select",
                default: "left",
                options: ["left", "right"],
            },
            { name: "collapsed", type: "boolean", default: false },
            { name: "header", type: "string", default: "" },
        ],
        template: '<aside><slot name="content"></slot></aside>',
        css: ":host { display: block; }",
    },
    {
        id: "component-palette",
        name: "Component Palette",
        selector: "app-component-palette",
        packageType: "layout",
        category: "designer",
        props: [
            { name: "selectedCategory", type: "string", default: "all" },
            { name: "searchable", type: "boolean", default: true },
        ],
        template: "<div><span>Palette</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "canvas",
        name: "Canvas",
        selector: "app-canvas",
        packageType: "layout",
        category: "designer",
        props: [
            { name: "gridColumns", type: "number", default: 12 },
            { name: "showGrid", type: "boolean", default: true },
            { name: "selectedId", type: "string", default: "" },
        ],
        template: "<div><span>Canvas</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "canvas-toolbar",
        name: "Canvas Toolbar",
        selector: "app-canvas-toolbar",
        packageType: "layout",
        category: "designer",
        props: [],
        template: "<div></div>",
        css: ":host { display: inline-flex; }",
    },
];
const feedbackComponents = [
    {
        id: "dialog",
        name: "Dialog",
        selector: "app-dialog",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "open", type: "boolean", default: false },
            { name: "title", type: "string", default: "" },
            {
                name: "size",
                type: "select",
                default: "md",
                options: ["sm", "md", "lg"],
            },
        ],
        template: "<div><h2>Dialog</h2><p>Content</p></div>",
        css: ":host { display: block; }",
    },
    {
        id: "confirm-dialog",
        name: "Confirm Dialog",
        selector: "app-confirm-dialog",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "open", type: "boolean", default: false },
            { name: "title", type: "string", default: "Confirm" },
            { name: "message", type: "string", default: "Are you sure?" },
        ],
        template: "<div><h2>Confirm</h2><p>Message</p></div>",
        css: ":host { display: block; }",
    },
    {
        id: "toast",
        name: "Toast",
        selector: "app-toast",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "message", type: "string", default: "" },
            {
                name: "type",
                type: "select",
                default: "info",
                options: ["info", "success", "warning", "error"],
            },
            { name: "duration", type: "number", default: 3000 },
        ],
        template: "<div>Toast</div>",
        css: ":host { display: block; }",
    },
    {
        id: "snackbar",
        name: "Snackbar",
        selector: "app-snackbar",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "message", type: "string", default: "" },
            { name: "action", type: "string", default: "" },
        ],
        template: "<div>Snackbar</div>",
        css: ":host { display: block; }",
    },
    {
        id: "command-palette",
        name: "Command Palette",
        selector: "app-command-palette",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "open", type: "boolean", default: false },
            { name: "commands", type: "string", default: "[]" },
        ],
        template: "<div>Command Palette</div>",
        css: ":host { display: block; }",
    },
    {
        id: "modal",
        name: "Modal",
        selector: "app-modal",
        packageType: "feedback",
        category: "feedback",
        props: [
            { name: "open", type: "boolean", default: false },
            { name: "title", type: "string", default: "" },
        ],
        template: "<div><h2>Modal</h2><p>Content</p></div>",
        css: ":host { display: block; }",
    },
];
const dataComponents = [
    {
        id: "card",
        name: "Card",
        selector: "app-card",
        packageType: "data",
        category: "display",
        props: [
            { name: "title", type: "string", default: "" },
            { name: "content", type: "string", default: "" },
            { name: "elevated", type: "boolean", default: false },
        ],
        template: "<div><h3>Card Title</h3><p>Card content</p></div>",
        css: ":host { display: block; }",
    },
    {
        id: "stats-card",
        name: "Stats Card",
        selector: "app-stats-card",
        packageType: "data",
        category: "display",
        props: [
            { name: "label", type: "string", default: "" },
            { name: "value", type: "string", default: "" },
            { name: "icon", type: "string", default: "" },
        ],
        template: "<div><span>0</span><span>Label</span></div>",
        css: ":host { display: block; }",
    },
    {
        id: "table-view",
        name: "Table View",
        selector: "app-table-view",
        packageType: "data",
        category: "display",
        props: [
            { name: "columns", type: "string", default: "[]" },
            { name: "data", type: "string", default: "[]" },
        ],
        template: "<table><thead></thead><tbody></tbody></table>",
        css: ":host { display: block; }",
    },
    {
        id: "data-table",
        name: "Data Table",
        selector: "app-data-table",
        packageType: "data",
        category: "display",
        props: [
            { name: "columns", type: "string", default: "[]" },
            { name: "data", type: "string", default: "[]" },
            { name: "selectable", type: "boolean", default: false },
        ],
        template: "<table><thead></thead><tbody></tbody></table>",
        css: ":host { display: block; }",
    },
    {
        id: "json-view",
        name: "JSON View",
        selector: "app-json-view",
        packageType: "data",
        category: "display",
        props: [{ name: "data", type: "string", default: "{}" }],
        template: "<pre>{}</pre>",
        css: ":host { display: block; }",
    },
    {
        id: "segment-selector",
        name: "Segment Selector",
        selector: "app-segment-selector",
        packageType: "data",
        category: "forms",
        props: [
            { name: "options", type: "string", default: "[]" },
            { name: "selected", type: "string", default: "" },
        ],
        template: "<div><button>Option</button></div>",
        css: ":host { display: block; }",
    },
];
const components = uiComponents;

let AppButton = class AppButton extends LitElement {
    constructor() {
        super();
        for (const key of ["variant", "buttonStyle", "size", "disabled", "loading", "icon", "iconPosition", "fullWidth", "type", "label"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["variant", "buttonStyle", "size", "disabled", "loading", "icon", "iconPosition", "fullWidth", "type", "label"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid;
      padding: 0.5rem 1rem;
      text-align: center;
      font-weight: 500;
      transition: all 0.15s;
      cursor: pointer;
      border-width: 1px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ========================================
       SOLID VARIANT (default) - Filled background
       ======================================== */
    .app-btn-solid {
      border-color: var(--accent);
      background-color: var(--accent);
      color: var(--text-on-accent);
    }
    .app-btn-solid:hover {
      background-color: var(--accent-hover);
      border-color: var(--accent-hover);
    }

    .app-btn-solid-danger {
      border-color: var(--error);
      background-color: var(--error);
      color: var(--text-on-error);
    }
    .app-btn-solid-danger:hover {
      opacity: 0.9;
    }

    .app-btn-solid-warning {
      border-color: var(--warning);
      background-color: var(--warning);
      color: var(--text-on-warning);
    }
    .app-btn-solid-warning:hover {
      opacity: 0.9;
    }

    .app-btn-solid-success {
      border-color: var(--success);
      background-color: var(--success);
      color: var(--text-on-success);
    }
    .app-btn-solid-success:hover {
      opacity: 0.9;
    }

    .app-btn-solid-info {
      border-color: var(--info);
      background-color: var(--info);
      color: var(--text-on-info);
    }
    .app-btn-solid-info:hover {
      opacity: 0.9;
    }

    /* ========================================
       OUTLINE VARIANT - Border only, transparent bg
       ======================================== */
    .app-btn-outline {
      border-color: var(--accent);
      background-color: transparent;
      color: var(--accent);
    }
    .app-btn-outline:hover {
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
    }

    .app-btn-outline-danger {
      border-color: var(--error);
      background-color: transparent;
      color: var(--error);
    }
    .app-btn-outline-danger:hover {
      background-color: color-mix(in srgb, var(--error) 10%, transparent);
    }

    .app-btn-outline-warning {
      border-color: var(--warning);
      background-color: transparent;
      color: var(--warning);
    }
    .app-btn-outline-warning:hover {
      background-color: color-mix(in srgb, var(--warning) 10%, transparent);
    }

    .app-btn-outline-success {
      border-color: var(--success);
      background-color: transparent;
      color: var(--success);
    }
    .app-btn-outline-success:hover {
      background-color: color-mix(in srgb, var(--success) 10%, transparent);
    }

    .app-btn-outline-info {
      border-color: var(--info);
      background-color: transparent;
      color: var(--info);
    }
    .app-btn-outline-info:hover {
      background-color: color-mix(in srgb, var(--info) 10%, transparent);
    }

    /* ========================================
       SOFT VARIANT - Light background tint
       ======================================== */
    .app-btn-soft {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
      color: var(--accent);
    }
    .app-btn-soft:hover {
      background-color: color-mix(in srgb, var(--accent) 20%, transparent);
    }

    .app-btn-soft-danger {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--error) 10%, transparent);
      color: var(--error);
    }
    .app-btn-soft-danger:hover {
      background-color: color-mix(in srgb, var(--error) 20%, transparent);
    }

    .app-btn-soft-warning {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--warning) 10%, transparent);
      color: var(--warning);
    }
    .app-btn-soft-warning:hover {
      background-color: color-mix(in srgb, var(--warning) 20%, transparent);
    }

    .app-btn-soft-success {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--success) 10%, transparent);
      color: var(--success);
    }
    .app-btn-soft-success:hover {
      background-color: color-mix(in srgb, var(--success) 20%, transparent);
    }

    .app-btn-soft-info {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--info) 10%, transparent);
      color: var(--info);
    }
    .app-btn-soft-info:hover {
      background-color: color-mix(in srgb, var(--info) 20%, transparent);
    }

    /* ========================================
       GHOST VARIANT - No border, transparent bg
       ======================================== */
    .app-btn-ghost {
      border-color: transparent;
      background-color: transparent;
      color: var(--accent);
    }
    .app-btn-ghost:hover {
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
    }

    .app-btn-ghost-danger {
      border-color: transparent;
      background-color: transparent;
      color: var(--error);
    }
    .app-btn-ghost-danger:hover {
      background-color: color-mix(in srgb, var(--error) 10%, transparent);
    }

    .app-btn-ghost-warning {
      border-color: transparent;
      background-color: transparent;
      color: var(--warning);
    }
    .app-btn-ghost-warning:hover {
      background-color: color-mix(in srgb, var(--warning) 10%, transparent);
    }

    .app-btn-ghost-success {
      border-color: transparent;
      background-color: transparent;
      color: var(--success);
    }
    .app-btn-ghost-success:hover {
      background-color: color-mix(in srgb, var(--success) 10%, transparent);
    }

    .app-btn-ghost-info {
      border-color: transparent;
      background-color: transparent;
      color: var(--info);
    }
    .app-btn-ghost-info:hover {
      background-color: color-mix(in srgb, var(--info) 10%, transparent);
    }

    /* ========================================
       SIZE VARIANTS
       ======================================== */
    .app-btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }

    .app-btn-md {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    .app-btn-lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    }

    .app-btn-full {
      width: 100%;
    }

    .app-btn-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .app-btn-icon {
      font-size: 1.25rem;
    }

    .app-btn-spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* ========================================
       LEGACY SUPPORT
       ======================================== */
    .app-btn-primary {
      border-color: var(--accent);
      background-color: var(--accent);
      color: var(--text-on-accent);
    }
    .app-btn-primary:hover {
      background-color: var(--accent-hover);
      border-color: var(--accent-hover);
    }

    .app-btn-secondary {
      border-color: var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
    }
    .app-btn-secondary:hover {
      background-color: var(--bg-hover);
    }
  `;
    _handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.dispatchEvent(new CustomEvent("click", { detail: e, bubbles: true, composed: true }));
    }
    getButtonClass() {
        const style = this.buttonStyle || "solid";
        const variant = this.variant || "primary";
        const styleVariant = style === "solid" && variant === "primary"
            ? "app-btn-solid"
            : `app-btn-${style}${variant !== "primary" ? `-${variant}` : ""}`;
        const classes = [
            "app-btn",
            styleVariant,
            `app-btn-${this.size || "md"}`,
            this.fullWidth ? "app-btn-full" : "",
            this.disabled || this.loading ? "app-btn-disabled" : "",
        ]
            .filter(Boolean)
            .join(" ");
        return classes;
    }
    render() {
        return html `
      <button
        type="${this.type || "button"}"
        class="${this.getButtonClass()}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading
            ? html `<span class="app-btn-spinner"></span>`
            : html `
              ${this.icon && this.iconPosition === "left"
                ? html `<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
              ${this.label ? html `<span>${this.label}</span>` : html `<slot></slot>`}
              ${this.icon && this.iconPosition === "right"
                ? html `<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
            `}
      </button>
    `;
    }
};
__decorate([
    property()
], AppButton.prototype, "variant", void 0);
__decorate([
    property()
], AppButton.prototype, "buttonStyle", void 0);
__decorate([
    property()
], AppButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], AppButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], AppButton.prototype, "loading", void 0);
__decorate([
    property()
], AppButton.prototype, "icon", void 0);
__decorate([
    property()
], AppButton.prototype, "iconPosition", void 0);
__decorate([
    property({ type: Boolean })
], AppButton.prototype, "fullWidth", void 0);
__decorate([
    property()
], AppButton.prototype, "type", void 0);
__decorate([
    property()
], AppButton.prototype, "label", void 0);
AppButton = __decorate([
    customElement("app-button")
], AppButton);

let AppInput = class AppInput extends LitElement {
    constructor() {
        super();
        for (const key of ["type", "placeholder", "label", "disabled", "error", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["type", "placeholder", "label", "disabled", "error", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _value = "";
    _focused = false;
    static styles = css `
    :host {
      display: block;
    }

    .app-input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .app-input-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .app-input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .app-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      box-sizing: border-box;
      transition: all 0.15s;
      outline: none;
    }

    .app-input::placeholder {
      color: var(--text-muted);
    }

    .app-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    .app-input-default:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    .app-input-error {
      border-color: var(--error);
      box-shadow: 0 0 0 1px var(--error);
    }

    .app-input-with-icon {
      padding-left: 2.5rem;
    }

    .app-input-icon {
      position: absolute;
      left: 0.75rem;
      font-size: 1.25rem;
      color: var(--text-muted);
    }

    .app-input-focused .app-input-icon {
      color: var(--accent);
    }

    .app-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--bg-tertiary);
    }

    .app-input-error-text {
      font-size: 0.75rem;
      color: var(--error);
    }
  `;
    _handleInput(e) {
        const target = e.target;
        this._value = target.value;
        this.dispatchEvent(new CustomEvent("input", {
            detail: this._value,
            bubbles: true,
            composed: true,
        }));
    }
    _handleFocus() {
        this._focused = true;
    }
    _handleBlur() {
        this._focused = false;
        this.dispatchEvent(new CustomEvent("blur", { bubbles: true, composed: true }));
    }
    render() {
        const stateClass = this.error ? "app-input-error" : "app-input-default";
        const classes = [
            "app-input",
            stateClass,
            this.icon ? "app-input-with-icon" : "",
        ]
            .filter(Boolean)
            .join(" ");
        return html `
      <div class="app-input-wrapper">
        ${this.label
            ? html `<label class="app-input-label">${this.label}</label>`
            : ""}
        <div
          class="app-input-container ${this._focused
            ? "app-input-focused"
            : ""}"
        >
          ${this.icon
            ? html `<i class="material-icons app-input-icon">${this.icon}</i>`
            : ""}
          <input
            type="${this.type}"
            class="${classes}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            .value="${this._value}"
            @input="${this._handleInput}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />
        </div>
        ${this.error
            ? html `<span class="app-input-error-text">${this.error}</span>`
            : ""}
      </div>
    `;
    }
};
__decorate([
    property()
], AppInput.prototype, "type", void 0);
__decorate([
    property()
], AppInput.prototype, "placeholder", void 0);
__decorate([
    property()
], AppInput.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], AppInput.prototype, "disabled", void 0);
__decorate([
    property()
], AppInput.prototype, "error", void 0);
__decorate([
    property()
], AppInput.prototype, "icon", void 0);
__decorate([
    state()
], AppInput.prototype, "_value", void 0);
__decorate([
    state()
], AppInput.prototype, "_focused", void 0);
AppInput = __decorate([
    customElement("app-input")
], AppInput);

let AppEmptyState = class AppEmptyState extends LitElement {
    constructor() {
        super();
        for (const key of ["icon", "title", "message", "actionLabel", "variant"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["icon", "title", "message", "actionLabel", "variant"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      gap: 1rem;
    }

    .icon-container {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-elevated);
      border: 2px solid var(--border-color);
    }

    .icon-container.danger {
      background: var(--error);
      border-color: var(--error);
    }

    .icon-container.success {
      background: var(--success);
      border-color: var(--success);
    }

    .icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .icon-container.danger .icon,
    .icon-container.success .icon {
      color: var(--text-on-error);
    }

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .message {
      font-size: 1rem;
      color: var(--text-secondary);
      margin: 0;
      max-width: 400px;
    }

    .action {
      margin-top: 0.5rem;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--accent);
      background: var(--accent);
      color: var(--text-on-accent);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    button:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }
  `;
    _handleAction() {
        this.dispatchEvent(new CustomEvent("action", { bubbles: true, composed: true }));
    }
    render() {
        return html `
      <div class="icon-container ${this.variant}">
        ${this.icon
            ? html `<span class="icon">${this.icon}</span>`
            : html `<span class="icon">📦</span>`}
      </div>
      ${this.title ? html `<h2 class="title">${this.title}</h2>` : ""}
      ${this.message ? html `<p class="message">${this.message}</p>` : ""}
      ${this.actionLabel
            ? html `
            <div class="action">
              <button @click="${this._handleAction}">
                ${this.actionLabel}
              </button>
            </div>
          `
            : ""}
    `;
    }
};
__decorate([
    property()
], AppEmptyState.prototype, "icon", void 0);
__decorate([
    property()
], AppEmptyState.prototype, "title", void 0);
__decorate([
    property()
], AppEmptyState.prototype, "message", void 0);
__decorate([
    property()
], AppEmptyState.prototype, "actionLabel", void 0);
__decorate([
    property()
], AppEmptyState.prototype, "variant", void 0);
AppEmptyState = __decorate([
    customElement("app-empty-state")
], AppEmptyState);

let AppModal = class AppModal extends LitElement {
    constructor() {
        super();
        for (const key of ["open", "title", "size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["open", "title", "size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.75rem;
      min-width: 320px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .modal-sm {
      width: 320px;
    }

    .modal-md {
      width: 480px;
    }

    .modal-lg {
      width: 640px;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border-color);
    }

    header h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .close-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      color: var(--text-secondary);
      font-size: 1.25rem;
      line-height: 1;
    }

    .close-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .content {
      padding: 1.25rem;
      overflow-y: auto;
      color: var(--text-primary);
    }
  `;
    _handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this._close();
        }
    }
    _close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
    render() {
        if (!this.open)
            return html ``;
        return html `
      <div class="overlay" @click="${this._handleOverlayClick}">
        <div class="modal modal-${this.size}">
          <header>
            <h3>${this.title}</h3>
            <button class="close-btn" @click="${this._close}">×</button>
          </header>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppModal.prototype, "open", void 0);
__decorate([
    property()
], AppModal.prototype, "title", void 0);
__decorate([
    property()
], AppModal.prototype, "size", void 0);
AppModal = __decorate([
    customElement("app-modal")
], AppModal);

let AppDialog = class AppDialog extends LitElement {
    constructor() {
        super();
        for (const key of ["open", "title", "size", "showHeader", "showFooter"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["open", "title", "size", "showHeader", "showFooter"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      min-width: 360px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    }

    .dialog-sm {
      width: 360px;
    }

    .dialog-md {
      width: 520px;
    }

    .dialog-lg {
      width: 720px;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 2px solid var(--border-color);
      background: var(--bg-elevated);
      border-radius: 1rem 1rem 0 0;
    }

    header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .close-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      color: var(--text-secondary);
      font-size: 1.5rem;
      line-height: 1;
      font-weight: 300;
    }

    .close-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .content {
      padding: 1.5rem;
      overflow-y: auto;
      color: var(--text-primary);
    }
  `;
    _handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this._close();
        }
    }
    _close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
    render() {
        if (!this.open)
            return html ``;
        return html `
      <div class="overlay" @click="${this._handleOverlayClick}">
        <div class="dialog dialog-${this.size}">
          <header>
            <h2>${this.title}</h2>
            <button class="close-btn" @click="${this._close}">×</button>
          </header>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppDialog.prototype, "open", void 0);
__decorate([
    property()
], AppDialog.prototype, "title", void 0);
__decorate([
    property()
], AppDialog.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], AppDialog.prototype, "showHeader", void 0);
__decorate([
    property({ type: Boolean })
], AppDialog.prototype, "showFooter", void 0);
AppDialog = __decorate([
    customElement("app-dialog")
], AppDialog);

let AppConfirmDialog = class AppConfirmDialog extends LitElement {
    constructor() {
        super();
        for (const key of ["open", "title", "message", "confirmText", "cancelText"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["open", "title", "message", "confirmText", "cancelText"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      width: 400px;
      max-width: 90vw;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    header h2 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .close-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      color: var(--text-secondary);
      font-size: 1.25rem;
      line-height: 1;
    }

    .close-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .content {
      padding: 1.5rem;
      color: var(--text-secondary);
      font-size: 0.9375rem;
      line-height: 1.5;
    }

    footer {
      display: flex;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--border-color);
      justify-content: flex-end;
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    .cancel-btn {
      background: transparent;
      border-color: var(--border-color);
      color: var(--text-secondary);
    }

    .cancel-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .confirm-btn {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--text-on-accent);
    }

    .confirm-btn:hover {
      opacity: 0.9;
    }

    .danger-btn {
      background: var(--error);
      border-color: var(--error);
      color: var(--text-on-error);
    }

    .danger-btn:hover {
      opacity: 0.9;
    }
  `;
    _handleCancel() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("cancel", { bubbles: true, composed: true }));
    }
    _handleConfirm() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("confirm", { bubbles: true, composed: true }));
    }
    _handleOverlayClick(e) {
        if (e.target.classList.contains("overlay")) {
            this._handleCancel();
        }
    }
    render() {
        if (!this.open)
            return html ``;
        return html `
      <div class="overlay" @click="${this._handleOverlayClick}">
        <div class="dialog">
          <header>
            <h2>${this.title}</h2>
            <button class="close-btn" @click="${this._handleCancel}">×</button>
          </header>
          <div class="content">
            <slot></slot>
            ${this.message}
          </div>
          <footer>
            <button class="cancel-btn" @click="${this._handleCancel}">
              ${this.cancelText}
            </button>
            <button class="confirm-btn" @click="${this._handleConfirm}">
              ${this.confirmText}
            </button>
          </footer>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppConfirmDialog.prototype, "open", void 0);
__decorate([
    property()
], AppConfirmDialog.prototype, "title", void 0);
__decorate([
    property()
], AppConfirmDialog.prototype, "message", void 0);
__decorate([
    property()
], AppConfirmDialog.prototype, "confirmText", void 0);
__decorate([
    property()
], AppConfirmDialog.prototype, "cancelText", void 0);
AppConfirmDialog = __decorate([
    customElement("app-confirm-dialog")
], AppConfirmDialog);

let AppLoading = class AppLoading extends LitElement {
    constructor() {
        super();
        for (const key of ["size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .spinner {
      border: 2px solid var(--border-color);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    .spinner-sm {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }

    .spinner-md {
      width: 32px;
      height: 32px;
      border-width: 3px;
    }

    .spinner-lg {
      width: 48px;
      height: 48px;
      border-width: 4px;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
    render() {
        return html `<div class="spinner spinner-${this.size}"></div>`;
    }
};
__decorate([
    property()
], AppLoading.prototype, "size", void 0);
AppLoading = __decorate([
    customElement("app-loading")
], AppLoading);

let AppRadio = class AppRadio extends LitElement {
    constructor() {
        super();
        for (const key of ["name", "value", "checked", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["name", "value", "checked", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      align-items: center;
    }

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    input[type="radio"] {
      width: 1rem;
      height: 1rem;
      accent-color: var(--accent);
      cursor: pointer;
    }

    input[type="radio"]:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .radio-label {
      color: var(--text-primary);
      font-size: 0.875rem;
      user-select: none;
    }

    :host([disabled]) .radio-label {
      color: var(--text-secondary);
      cursor: not-allowed;
    }
  `;
    _handleChange(e) {
        this.checked = e.target.checked;
        this.dispatchEvent(new CustomEvent("change", {
            detail: { value: this.value, checked: this.checked },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <label>
        <input
          type="radio"
          name="${this.name}"
          value="${this.value}"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this._handleChange}"
        />
        <span class="radio-label"><slot></slot></span>
      </label>
    `;
    }
};
__decorate([
    property()
], AppRadio.prototype, "name", void 0);
__decorate([
    property()
], AppRadio.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], AppRadio.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], AppRadio.prototype, "disabled", void 0);
AppRadio = __decorate([
    customElement("app-radio")
], AppRadio);

let AppSlider = class AppSlider extends LitElement {
    constructor() {
        super();
        for (const key of ["min", "max", "value", "step", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["min", "max", "value", "step", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
      width: 100%;
    }

    .slider-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .slider-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    input[type="range"] {
      width: 100%;
      height: 0.5rem;
      border-radius: 0.25rem;
      background-color: var(--border-color);
      outline: none;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background-color: var(--accent);
      cursor: pointer;
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transition: transform 0.1s;
    }

    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }

    input[type="range"]::-moz-range-thumb {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background-color: var(--accent);
      cursor: pointer;
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    input[type="range"]:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    input[type="range"]:focus {
      outline: none;
    }

    input[type="range"]:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 2px var(--accent);
    }

    .slider-value {
      font-size: 0.75rem;
      color: var(--text-secondary);
      text-align: right;
    }
  `;
    _handleInput(e) {
        this.value = Number(e.target.value);
        this.dispatchEvent(new CustomEvent("input", {
            detail: this.value,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <div class="slider-wrapper">
        <input
          type="range"
          .value="${String(this.value)}"
          min="${String(this.min)}"
          max="${String(this.max)}"
          step="${String(this.step)}"
          ?disabled="${this.disabled}"
          @input="${this._handleInput}"
        />
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], AppSlider.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], AppSlider.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], AppSlider.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], AppSlider.prototype, "step", void 0);
__decorate([
    property({ type: Boolean })
], AppSlider.prototype, "disabled", void 0);
AppSlider = __decorate([
    customElement("app-slider")
], AppSlider);

let AppSwitch = class AppSwitch extends LitElement {
    constructor() {
        super();
        for (const key of ["checked", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["checked", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      align-items: center;
    }

    .switch-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }

    .switch-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .switch-slider {
      position: relative;
      width: 2.75rem;
      height: 1.5rem;
      background-color: var(--border-color);
      border-radius: 1rem;
      transition: background-color 0.2s;
    }

    .switch-slider::before {
      content: "";
      position: absolute;
      top: 0.125rem;
      left: 0.125rem;
      width: 1.25rem;
      height: 1.25rem;
      background-color: white;
      border-radius: 50%;
      transition: transform 0.2s;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    .switch-input:checked + .switch-slider {
      background-color: var(--accent);
    }

    .switch-input:checked + .switch-slider::before {
      transform: translateX(1.25rem);
    }

    .switch-input:disabled + .switch-slider {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .switch-input:focus + .switch-slider {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  `;
    _handleChange(e) {
        this.checked = e.target.checked;
        this.dispatchEvent(new CustomEvent("change", {
            detail: this.checked,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <label class="switch-container">
        <input
          type="checkbox"
          class="switch-input"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this._handleChange}"
          role="switch"
          aria-checked="${this.checked}"
        />
        <span class="switch-slider"></span>
      </label>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppSwitch.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], AppSwitch.prototype, "disabled", void 0);
AppSwitch = __decorate([
    customElement("app-switch")
], AppSwitch);

let AppTextarea = class AppTextarea extends LitElement {
    constructor() {
        super();
        for (const key of ["value", "placeholder", "rows", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["value", "placeholder", "rows", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .textarea-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .textarea-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    textarea {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      box-sizing: border-box;
      transition: all 0.15s;
      outline: none;
      resize: vertical;
      font-family: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    textarea::placeholder {
      color: var(--text-muted);
    }

    textarea:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    textarea:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--bg-tertiary);
    }
  `;
    _handleInput(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent("input", {
            detail: this.value,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <textarea
        .value="${this.value}"
        placeholder="${this.placeholder}"
        rows="${this.rows}"
        ?disabled="${this.disabled}"
        @input="${this._handleInput}"
      ></textarea>
    `;
    }
};
__decorate([
    property()
], AppTextarea.prototype, "value", void 0);
__decorate([
    property()
], AppTextarea.prototype, "placeholder", void 0);
__decorate([
    property({ type: Number })
], AppTextarea.prototype, "rows", void 0);
__decorate([
    property({ type: Boolean })
], AppTextarea.prototype, "disabled", void 0);
AppTextarea = __decorate([
    customElement("app-textarea")
], AppTextarea);

let AppBadge = class AppBadge extends LitElement {
    constructor() {
        super();
        for (const key of ["variant", "size", "label"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["variant", "size", "label"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      border-radius: 0.25rem;
      font-weight: 500;
      line-height: 1;
    }

    .badge-default {
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }

    .badge-primary {
      background-color: var(--accent);
      color: var(--text-on-accent);
    }

    .badge-success {
      background-color: var(--success);
      color: var(--text-on-success);
    }

    .badge-warning {
      background-color: var(--warning);
      color: var(--text-on-warning);
    }

    .badge-danger {
      background-color: var(--error);
      color: var(--text-on-error);
    }

    .badge-sm {
      padding: 0.125rem 0.25rem;
      font-size: 0.625rem;
    }

    .badge-md {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    .badge-lg {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }
  `;
    render() {
        return html `
      <span class="badge badge-${this.variant} badge-${this.size}">${this.label}</span>
    `;
    }
};
__decorate([
    property()
], AppBadge.prototype, "variant", void 0);
__decorate([
    property()
], AppBadge.prototype, "size", void 0);
__decorate([
    property()
], AppBadge.prototype, "label", void 0);
AppBadge = __decorate([
    customElement("app-badge")
], AppBadge);

let AppSelect = class AppSelect extends LitElement {
    constructor() {
        super();
        for (const key of ["options", "value", "placeholder", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["options", "value", "placeholder", "disabled"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    select {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      min-width: 150px;
    }

    select:hover:not(:disabled) {
      background-color: var(--bg-hover);
    }

    select:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    select:focus {
      outline: none;
      border-color: var(--accent);
    }
  `;
    _handleChange(e) {
        const select = e.target;
        this.dispatchEvent(new CustomEvent("change", {
            detail: { value: select.value },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        let parsedOptions = [];
        try {
            parsedOptions = JSON.parse(this.options);
        }
        catch {
            parsedOptions = [];
        }
        return html `
      <select
        .value="${this.value}"
        ?disabled="${this.disabled}"
        placeholder="${this.placeholder}"
        @change="${this._handleChange}"
      >
        <option value="" disabled selected hidden>${this.placeholder}</option>
        ${parsedOptions.map((option) => html `<option value="${option}">${option}</option>`)}
      </select>
    `;
    }
};
__decorate([
    property()
], AppSelect.prototype, "options", void 0);
__decorate([
    property()
], AppSelect.prototype, "value", void 0);
__decorate([
    property()
], AppSelect.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], AppSelect.prototype, "disabled", void 0);
AppSelect = __decorate([
    customElement("app-select")
], AppSelect);

let AppCard = class AppCard extends LitElement {
    constructor() {
        super();
        for (const key of ["title", "content", "elevated", "borderRadius", "padding"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["title", "content", "elevated", "borderRadius", "padding"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .card {
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      overflow: hidden;
      transition: box-shadow 0.15s;
    }

    .card-elevated {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .card-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .card-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .card-content {
      padding: 1rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.5;
    }
  `;
    render() {
        return html `
      <div class="card ${this.elevated ? "card-elevated" : ""}">
        ${this.title
            ? html `
              <div class="card-header">
                <h3 class="card-title">${this.title}</h3>
              </div>
            `
            : ""}
        <div class="card-content">${this.content}</div>
      </div>
    `;
    }
};
__decorate([
    property()
], AppCard.prototype, "title", void 0);
__decorate([
    property()
], AppCard.prototype, "content", void 0);
__decorate([
    property({ type: Boolean })
], AppCard.prototype, "elevated", void 0);
__decorate([
    property({ type: Number })
], AppCard.prototype, "borderRadius", void 0);
__decorate([
    property({ type: Number })
], AppCard.prototype, "padding", void 0);
AppCard = __decorate([
    customElement("app-card")
], AppCard);

let AppStatsCard = class AppStatsCard extends LitElement {
    constructor() {
        super();
        for (const key of ["label", "value", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["label", "value", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .stats-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
    }

    .stats-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-radius: 0.5rem;
      font-size: 1.5rem;
    }

    .stats-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .stats-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1;
    }

    .stats-label {
      font-size: 0.875rem;
      color: var(--text-muted);
      font-weight: 500;
    }
  `;
    render() {
        return html `
      <div class="stats-card">
        ${this.icon
            ? html `<div class="stats-icon">${this.icon}</div>`
            : ""}
        <div class="stats-info">
          <span class="stats-value">${this.value}</span>
          <span class="stats-label">${this.label}</span>
        </div>
      </div>
    `;
    }
};
__decorate([
    property()
], AppStatsCard.prototype, "label", void 0);
__decorate([
    property()
], AppStatsCard.prototype, "value", void 0);
__decorate([
    property()
], AppStatsCard.prototype, "icon", void 0);
AppStatsCard = __decorate([
    customElement("app-stats-card")
], AppStatsCard);

let AppTableView = class AppTableView extends LitElement {
    constructor() {
        super();
        for (const key of ["columns", "data"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["columns", "data"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _getColumns() {
        try {
            return JSON.parse(this.columns);
        }
        catch {
            return [];
        }
    }
    _getData() {
        try {
            return JSON.parse(this.data);
        }
        catch {
            return [];
        }
    }
    static styles = css `
    :host {
      display: block;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    th {
      text-align: left;
      padding: 0.75rem 1rem;
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      font-weight: 600;
      border-bottom: 1px solid var(--border-color);
    }

    td {
      padding: 0.75rem 1rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-color);
    }

    tr:hover td {
      background-color: var(--bg-hover);
    }
  `;
    render() {
        const cols = this._getColumns();
        const rows = this._getData();
        return html `
      <table>
        <thead>
          <tr>
            ${cols.map((col) => html `<th>${col.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => html `
              <tr>
                ${cols.map((col) => html `<td>${row[col.key] ?? ""}</td>`)}
              </tr>
            `)}
        </tbody>
      </table>
    `;
    }
};
__decorate([
    property()
], AppTableView.prototype, "columns", void 0);
__decorate([
    property()
], AppTableView.prototype, "data", void 0);
AppTableView = __decorate([
    customElement("app-table-view")
], AppTableView);

let AppDataTable = class AppDataTable extends LitElement {
    constructor() {
        super();
        for (const key of ["columns", "data", "selectable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["columns", "data", "selectable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _selectedIndex = null;
    _getColumns() {
        try {
            return JSON.parse(this.columns);
        }
        catch {
            return [];
        }
    }
    _getData() {
        try {
            return JSON.parse(this.data);
        }
        catch {
            return [];
        }
    }
    _handleRowClick(index) {
        if (!this.selectable)
            return;
        this._selectedIndex = index;
        this.dispatchEvent(new CustomEvent("rowSelect", {
            detail: { index },
            bubbles: true,
            composed: true,
        }));
        this.requestUpdate();
    }
    static styles = css `
    :host {
      display: block;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    th {
      text-align: left;
      padding: 0.75rem 1rem;
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      font-weight: 600;
      border-bottom: 1px solid var(--border-color);
    }

    td {
      padding: 0.75rem 1rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-color);
    }

    tr {
      cursor: default;
    }

    tr:hover td {
      background-color: var(--bg-hover);
    }

    tr.selected td {
      background-color: var(--accent);
      color: var(--text-on-accent);
    }

    tr.selectable {
      cursor: pointer;
    }

    .radio-cell {
      width: 2rem;
    }

    .radio {
      width: 1rem;
      height: 1rem;
      border: 2px solid var(--border-color);
      border-radius: 50%;
      display: inline-block;
    }

    tr.selected .radio {
      border-color: var(--text-on-accent);
      background-color: var(--text-on-accent);
    }
  `;
    render() {
        const cols = this._getColumns();
        const rows = this._getData();
        return html `
      <table>
        <thead>
          <tr>
            ${this.selectable ? html `<th class="radio-cell"></th>` : ""}
            ${cols.map((col) => html `<th>${col.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => html `
              <tr
                class="${this._selectedIndex === index
            ? "selected"
            : ""} ${this.selectable ? "selectable" : ""}"
                @click="${() => this._handleRowClick(index)}"
              >
                ${this.selectable
            ? html `<td class="radio-cell"><span class="radio"></span></td>`
            : ""}
                ${cols.map((col) => html `<td>${row[col.key] ?? ""}</td>`)}
              </tr>
            `)}
        </tbody>
      </table>
    `;
    }
};
__decorate([
    property()
], AppDataTable.prototype, "columns", void 0);
__decorate([
    property()
], AppDataTable.prototype, "data", void 0);
__decorate([
    property({ type: Boolean })
], AppDataTable.prototype, "selectable", void 0);
AppDataTable = __decorate([
    customElement("app-data-table")
], AppDataTable);

let AppJsonView = class AppJsonView extends LitElement {
    constructor() {
        super();
        for (const key of ["data"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["data"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _getFormattedJson() {
        try {
            const parsed = typeof this.data === "string" ? JSON.parse(this.data) : this.data;
            return JSON.stringify(parsed, null, 2);
        }
        catch {
            return String(this.data);
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .json-container {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      padding: 1rem;
      font-family: monospace;
      font-size: 0.875rem;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .json-key {
      color: var(--accent);
    }

    .json-string {
      color: var(--success);
    }

    .json-number {
      color: var(--warning);
    }

    .json-boolean {
      color: var(--error);
    }

    .json-null {
      color: var(--text-muted);
    }
  `;
    _syntaxHighlight(json) {
        const result = [];
        const lines = json.split("\n");
        lines.forEach((line, lineIndex) => {
            const processed = line.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
                let cls = "json-number";
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = "json-key";
                        return `<span class="${cls}">${match}</span>`;
                    }
                    else {
                        cls = "json-string";
                    }
                }
                else if (/true|false/.test(match)) {
                    cls = "json-boolean";
                }
                else if (/null/.test(match)) {
                    cls = "json-null";
                }
                return `<span class="${cls}">${match}</span>`;
            });
            result.push(html `${processed}${lineIndex < lines.length - 1 ? html `<br/>` : ""}`);
        });
        return result;
    }
    render() {
        const formatted = this._getFormattedJson();
        return html `
      <div class="json-container">
        ${this._syntaxHighlight(formatted)}
      </div>
    `;
    }
};
__decorate([
    property()
], AppJsonView.prototype, "data", void 0);
AppJsonView = __decorate([
    customElement("app-json-view")
], AppJsonView);

let AppComponentPalette = class AppComponentPalette extends LitElement {
    constructor() {
        super();
        for (const key of ["categories", "searchable", "_searchQuery", "_collapsedCategories"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
        if (!this._searchQuery)
            this._searchQuery = "";
        if (!this._collapsedCategories)
            this._collapsedCategories = new Set();
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["categories", "searchable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _getCategories() {
        try {
            return JSON.parse(this.categories);
        }
        catch {
            return [];
        }
    }
    _toggleCategory(name) {
        if (this._collapsedCategories.has(name)) {
            this._collapsedCategories.delete(name);
        }
        else {
            this._collapsedCategories.add(name);
        }
        this.requestUpdate();
    }
    _filterComponents(components) {
        if (!this._searchQuery)
            return components;
        return components.filter((c) => c.toLowerCase().includes(this._searchQuery.toLowerCase()));
    }
    static styles = css `
    :host {
      display: block;
      background-color: var(--bg-elevated);
      border-right: 1px solid var(--border-color);
      height: 100%;
      overflow-y: auto;
    }

    .palette-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .palette-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .search-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.875rem;
      box-sizing: border-box;
    }

    .search-input::placeholder {
      color: var(--text-muted);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .category {
      border-bottom: 1px solid var(--border-color);
    }

    .category-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      cursor: pointer;
      color: var(--text-primary);
      font-weight: 500;
      font-size: 0.875rem;
    }

    .category-header:hover {
      background-color: var(--bg-hover);
    }

    .category-arrow {
      transition: transform 0.2s;
      font-size: 0.75rem;
    }

    .category-arrow.collapsed {
      transform: rotate(-90deg);
    }

    .category-items {
      padding: 0 1rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .category-items.collapsed {
      display: none;
    }

    .component-item {
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
      cursor: grab;
    }

    .component-item:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .component-item:active {
      cursor: grabbing;
    }
  `;
    render() {
        const categories = this._getCategories();
        return html `
      <div class="palette-header">
        <div class="palette-title">Components</div>
        ${this.searchable
            ? html `
              <input
                type="text"
                class="search-input"
                placeholder="Search components..."
                .value="${this._searchQuery}"
                @input="${(e) => {
                this._searchQuery = e.target.value;
            }}"
              />
            `
            : ""}
      </div>
      <div class="palette-content">
        ${categories.map((cat) => html `
            <div class="category">
              <div
                class="category-header"
                @click="${() => this._toggleCategory(cat.name)}"
              >
                <span>${cat.name}</span>
                <span
                  class="category-arrow ${this._collapsedCategories.has(cat.name)
            ? "collapsed"
            : ""}"
                >▼</span>
              </div>
              <div
                class="category-items ${this._collapsedCategories.has(cat.name)
            ? "collapsed"
            : ""}"
              >
                ${this._filterComponents(cat.components).map((comp) => html `
                    <div class="component-item" draggable="true">${comp}</div>
                  `)}
              </div>
            </div>
          `)}
      </div>
    `;
    }
};
__decorate([
    property()
], AppComponentPalette.prototype, "categories", void 0);
__decorate([
    property({ type: Boolean })
], AppComponentPalette.prototype, "searchable", void 0);
__decorate([
    state()
], AppComponentPalette.prototype, "_searchQuery", void 0);
__decorate([
    state()
], AppComponentPalette.prototype, "_collapsedCategories", void 0);
AppComponentPalette = __decorate([
    customElement("app-component-palette")
], AppComponentPalette);

let AppCanvas = class AppCanvas extends LitElement {
    constructor() {
        super();
        for (const key of ["elements", "gridColumns", "showGrid", "selectedId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["elements", "gridColumns", "showGrid", "selectedId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background-color: var(--bg-primary);
      position: relative;
      overflow: auto;
    }

    .canvas-area {
      min-width: 100%;
      min-height: 100%;
      position: relative;
    }

    .grid {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      display: grid;
      grid-template-columns: repeat(var(--grid-cols), 1fr);
      gap: 0;
    }

    .grid-cell {
      border-right: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      min-height: 4rem;
    }

    .grid.visible {
      background-color: rgba(0, 0, 0, 0.02);
    }

    .canvas-drop-zone {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .canvas-element {
      position: absolute;
      border: 2px dashed transparent;
      border-radius: 0.5rem;
      padding: 0.5rem;
      cursor: move;
      transition: border-color 0.15s;
    }

    .canvas-element:hover {
      border-color: var(--accent);
    }

    .canvas-element.selected {
      border-color: var(--accent);
      border-style: solid;
      box-shadow: 0 0 0 2px rgba(var(--accent-rgb, 99, 102, 241), 0.2);
    }

    .canvas-placeholder {
      border: 2px dashed var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
  `;
    render() {
        const gridStyle = `--grid-cols: ${this.gridColumns}`;
        const elements = this.elements || [];
        return html `
      <div class="canvas-area" style="${gridStyle}">
        ${this.showGrid
            ? html `
              <div class="grid visible" style="${gridStyle}">
                ${Array(this.gridColumns * 6)
                .fill(0)
                .map(() => html `
                      <div class="grid-cell"></div>
                    `)}
              </div>
            `
            : ""}
        ${elements.length > 0
            ? elements.map((el) => html `
                <div
                  class="canvas-element ${this.selectedId === el.id ? "selected" : ""}"
                  style="
                    grid-column: ${el.gridPosition?.column || 1} / span ${el.gridPosition?.colSpan || 1};
                    grid-row: ${el.gridPosition?.row || 1} / span ${el.gridPosition?.rowSpan || 1};
                  "
                >
                  <span>${el.icon || "⊡"}</span>
                  <span>${el.name || el.componentId}</span>
                </div>
              `)
            : html `
              <div class="canvas-placeholder">
                <slot></slot>
              </div>
            `}
      </div>
    `;
    }
};
__decorate([
    property({ type: Array })
], AppCanvas.prototype, "elements", void 0);
__decorate([
    property({ type: Number })
], AppCanvas.prototype, "gridColumns", void 0);
__decorate([
    property({ type: Boolean })
], AppCanvas.prototype, "showGrid", void 0);
__decorate([
    property()
], AppCanvas.prototype, "selectedId", void 0);
AppCanvas = __decorate([
    customElement("app-canvas")
], AppCanvas);

let AppPropertiesPanel = class AppPropertiesPanel extends LitElement {
    constructor() {
        super();
        for (const key of ["element", "_properties", "_elementId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
        if (!this._properties)
            this._properties = [];
        if (!this._elementId)
            this._elementId = null;
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["element"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _parseElement() {
        try {
            const parsed = JSON.parse(this.element);
            this._elementId = parsed.id || null;
            this._properties = parsed.properties || [];
        }
        catch {
            this._properties = [];
            this._elementId = null;
        }
    }
    updated(changedProperties) {
        if (changedProperties.has("element")) {
            this._parseElement();
        }
    }
    _handlePropertyChange(key, value) {
        this.dispatchEvent(new CustomEvent("propertyChange", {
            detail: { key, value },
            bubbles: true,
            composed: true,
        }));
    }
    static styles = css `
    :host {
      display: block;
      background-color: var(--bg-elevated);
      border-left: 1px solid var(--border-color);
      height: 100%;
      overflow-y: auto;
    }

    .panel-header {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .panel-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .element-id {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: monospace;
    }

    .properties-section {
      padding: 1rem;
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
    }

    .property-row {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 0.75rem;
    }

    .property-label {
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .property-input {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.875rem;
    }

    .property-input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .property-input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
    }

    select.property-input {
      cursor: pointer;
    }

    .empty-state {
      padding: 2rem 1rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
  `;
    render() {
        return html `
      <div class="panel-header">
        <div class="panel-title">Properties</div>
        ${this._elementId
            ? html `<div class="element-id">${this._elementId}</div>`
            : ""}
      </div>
      ${this._properties.length > 0
            ? html `
            <div class="properties-section">
              <div class="section-title">Properties</div>
              ${this._properties.map((prop) => html `
                  <div class="property-row">
                    <label class="property-label">${prop.label}</label>
                    ${prop.type === "boolean"
                ? html `
                          <input
                            type="checkbox"
                            class="property-input"
                            ?checked="${Boolean(prop.value)}"
                            @change="${(e) => this._handlePropertyChange(prop.key, e.target.checked)}"
                          />
                        `
                : prop.type === "select"
                    ? html `
                            <select
                              class="property-input"
                              .value="${String(prop.value)}"
                              @change="${(e) => this._handlePropertyChange(prop.key, e.target.value)}"
                            >
                              ${(prop.options || []).map((opt) => html `
                                  <option value="${opt}">${opt}</option>
                                `)}
                            </select>
                          `
                    : html `
                            <input
                              type="${prop.type === "number"
                        ? "number"
                        : "text"}"
                              class="property-input"
                              .value="${String(prop.value)}"
                              @input="${(e) => this._handlePropertyChange(prop.key, prop.type === "number"
                        ? Number(e.target.value)
                        : e.target.value)}"
                            />
                          `}
                  </div>
                `)}
            </div>
          `
            : html `<div class="empty-state">No element selected</div>`}
    `;
    }
};
__decorate([
    property()
], AppPropertiesPanel.prototype, "element", void 0);
__decorate([
    state()
], AppPropertiesPanel.prototype, "_properties", void 0);
__decorate([
    state()
], AppPropertiesPanel.prototype, "_elementId", void 0);
AppPropertiesPanel = __decorate([
    customElement("app-properties-panel")
], AppPropertiesPanel);

let AppBottomPanel = class AppBottomPanel extends LitElement {
    constructor() {
        super();
        for (const key of ["tabs", "activeTab", "position", "fullWidth", "floating", "borderRadius"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["tabs", "activeTab", "position", "fullWidth", "floating", "borderRadius"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _getTabs() {
        try {
            return JSON.parse(this.tabs);
        }
        catch {
            return [];
        }
    }
    _handleTabClick(tabId) {
        this.dispatchEvent(new CustomEvent("tabChange", {
            detail: { tabId },
            bubbles: true,
            composed: true,
        }));
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      background-color: var(--bg-elevated);
      border-top: 1px solid var(--border-color);
      height: 100%;
    }

    .panel-tabs {
      display: flex;
      gap: 0;
      border-bottom: 1px solid var(--border-color);
      padding: 0 0.5rem;
    }

    .panel-tab {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: all 0.15s;
    }

    .panel-tab:hover {
      color: var(--text-primary);
    }

    .panel-tab.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }

    .panel-content {
      flex: 1;
      overflow: auto;
      padding: 1rem;
    }

    .empty-state {
      color: var(--text-muted);
      font-size: 0.875rem;
      text-align: center;
      padding: 2rem;
    }
  `;
    render() {
        const tabsList = this._getTabs();
        return html `
      <div class="panel-tabs">
        ${tabsList.map((tab) => html `
            <div
              class="panel-tab ${this.activeTab === tab.id ? "active" : ""}"
              @click="${() => this._handleTabClick(tab.id)}"
            >
              ${tab.label}
            </div>
          `)}
      </div>
      <div class="panel-content">
        <slot></slot>
      </div>
    `;
    }
};
__decorate([
    property()
], AppBottomPanel.prototype, "tabs", void 0);
__decorate([
    property()
], AppBottomPanel.prototype, "activeTab", void 0);
__decorate([
    property()
], AppBottomPanel.prototype, "position", void 0);
__decorate([
    property({ type: Boolean })
], AppBottomPanel.prototype, "fullWidth", void 0);
__decorate([
    property({ type: Boolean })
], AppBottomPanel.prototype, "floating", void 0);
__decorate([
    property({ type: Number })
], AppBottomPanel.prototype, "borderRadius", void 0);
AppBottomPanel = __decorate([
    customElement("app-bottom-panel")
], AppBottomPanel);

let AppHeader = class AppHeader extends LitElement {
    constructor() {
        super();
        for (const key of ["title", "showBack", "breadcrumbs"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["title", "showBack", "breadcrumbs"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    header {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background: var(--bg-header, var(--bg-elevated));
      border-bottom: 1px solid var(--border-color);
      min-height: 56px;
      gap: 1rem;
    }

    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background: var(--bg-elevated);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
      font-size: 1.25rem;
    }

    .back-btn:hover {
      background: var(--bg-hover);
    }

    .title-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .breadcrumb-separator {
      color: var(--text-secondary);
      opacity: 0.5;
    }
  `;
    _handleBack() {
        this.dispatchEvent(new CustomEvent("navigate-back", { bubbles: true, composed: true }));
    }
    _getBreadcrumbs() {
        try {
            return JSON.parse(this.breadcrumbs);
        }
        catch {
            return [];
        }
    }
    render() {
        const crumbs = this._getBreadcrumbs();
        return html `
      <header>
        ${this.showBack
            ? html `
              <button class="back-btn" @click="${this._handleBack}">
                ←
              </button>
            `
            : ""}
        <div class="title-area">
          <h1>${this.title}</h1>
          ${crumbs.length > 0
            ? html `
                <div class="breadcrumbs">
                  ${crumbs.map((crumb, i) => html `
                      ${i > 0
                ? html `<span class="breadcrumb-separator">/</span>`
                : ""}
                      <span>${crumb}</span>
                    `)}
                </div>
              `
            : ""}
        </div>
        <slot></slot>
      </header>
    `;
    }
};
__decorate([
    property()
], AppHeader.prototype, "title", void 0);
__decorate([
    property({ type: Boolean })
], AppHeader.prototype, "showBack", void 0);
__decorate([
    property()
], AppHeader.prototype, "breadcrumbs", void 0);
AppHeader = __decorate([
    customElement("app-header")
], AppHeader);

let AppSidebar = class AppSidebar extends LitElement {
    constructor() {
        super();
        for (const key of ["collapsed", "items", "width", "collapsedWidth"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["collapsed", "items", "width", "collapsedWidth"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    aside {
      display: flex;
      flex-direction: column;
      width: var(--sidebar-width, 240px);
      min-width: var(--sidebar-width, 240px);
      height: 100%;
      background: var(--bg-elevated);
      border-right: 1px solid var(--border-color);
      transition: width 0.2s, min-width 0.2s;
      overflow: hidden;
    }

    aside.collapsed {
      width: 64px;
      min-width: 64px;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      min-height: 56px;
    }

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
      font-size: 1.25rem;
    }

    .collapse-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    nav {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0.5rem;
    }

    .nav-section {
      margin-bottom: 0.5rem;
    }

    .nav-section-title {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      margin: 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.75rem;
      border-radius: 0.5rem;
      color: var(--text-secondary);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
      overflow: hidden;
    }

    .nav-item:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .nav-item.active {
      background: var(--accent);
      color: var(--text-on-accent);
    }

    .nav-item-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .nav-item-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nav-item-children {
      margin-left: 1.25rem;
      border-left: 1px solid var(--border-color);
      padding-left: 0.5rem;
    }
  `;
    _toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.dispatchEvent(new CustomEvent("collapse-change", {
            detail: { collapsed: this.collapsed },
            bubbles: true,
            composed: true,
        }));
    }
    _getItems() {
        try {
            return JSON.parse(this.items);
        }
        catch {
            return [];
        }
    }
    _handleItemClick(item) {
        this.dispatchEvent(new CustomEvent("item-click", {
            detail: item,
            bubbles: true,
            composed: true,
        }));
    }
    _renderItem(item, depth = 0) {
        const hasChildren = item.children && item.children.length > 0;
        return html `
      <li>
        <div
          class="nav-item ${depth > 0 ? "nav-item-child" : ""}"
          @click="${() => this._handleItemClick(item)}"
        >
          ${item.icon
            ? html `<span class="nav-item-icon">${item.icon}</span>`
            : ""}
          <span class="nav-item-label">${item.label}</span>
        </div>
        ${hasChildren
            ? html `
              <ul class="nav-item-children">
                ${item.children.map((child) => this._renderItem(child, depth + 1))}
              </ul>
            `
            : ""}
      </li>
    `;
    }
    render() {
        const menuItems = this._getItems();
        return html `
      <aside class="${this.collapsed ? "collapsed" : ""}">
        <div class="sidebar-header">
          <button class="collapse-btn" @click="${this._toggleCollapse}">
            ${this.collapsed ? "→" : "←"}
          </button>
        </div>
        <nav>
          <ul>
            ${menuItems.map((item) => this._renderItem(item))}
          </ul>
        </nav>
        <slot></slot>
      </aside>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppSidebar.prototype, "collapsed", void 0);
__decorate([
    property()
], AppSidebar.prototype, "items", void 0);
__decorate([
    property({ type: Number })
], AppSidebar.prototype, "width", void 0);
__decorate([
    property({ type: Number })
], AppSidebar.prototype, "collapsedWidth", void 0);
AppSidebar = __decorate([
    customElement("app-sidebar")
], AppSidebar);

let AppFooter = class AppFooter extends LitElement {
    constructor() {
        super();
        for (const key of ["text"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["text"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: var(--bg-elevated);
      border-top: 1px solid var(--border-color);
      min-height: 48px;
    }

    .footer-text {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
      text-align: center;
    }
  `;
    render() {
        return html `
      <footer>
        <p class="footer-text">${this.text}</p>
        <slot></slot>
      </footer>
    `;
    }
};
__decorate([
    property()
], AppFooter.prototype, "text", void 0);
AppFooter = __decorate([
    customElement("app-footer")
], AppFooter);

let AppPageContainer = class AppPageContainer extends LitElement {
    constructor() {
        super();
        for (const key of ["title"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["title"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .page-header {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-color);
      min-height: 56px;
      gap: 1rem;
    }

    .page-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .page-header-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .page-content {
      flex: 1;
      overflow: auto;
      padding: 1.5rem;
    }
  `;
    render() {
        return html `
      ${this.title
            ? html `
            <div class="page-header">
              <h1 class="page-title">${this.title}</h1>
              <div class="page-header-actions">
                <slot name="header-actions"></slot>
              </div>
            </div>
          `
            : ""}
      <div class="page-content">
        <slot></slot>
      </div>
    `;
    }
};
__decorate([
    property()
], AppPageContainer.prototype, "title", void 0);
AppPageContainer = __decorate([
    customElement("app-page-container")
], AppPageContainer);

let AppPageToolbar = class AppPageToolbar extends LitElement {
    constructor() {
        super();
        for (const key of ["title", "actions"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["title", "actions"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .toolbar {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-color);
      gap: 1rem;
      flex-wrap: wrap;
    }

    .toolbar-title-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 200px;
    }

    .toolbar-title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .toolbar-subtitle {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background: var(--bg-elevated);
      color: var(--text-primary);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      font-size: 0.875rem;
    }

    .action-btn:hover {
      background: var(--bg-hover);
    }

    .action-btn.primary {
      border-color: var(--accent);
      background: var(--accent);
      color: var(--text-on-accent);
    }

    .action-btn.primary:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }

    .action-btn.danger {
      border-color: var(--error);
      background: var(--error);
      color: var(--text-on-error);
    }

    .action-btn.ghost {
      border-color: transparent;
      background: transparent;
      color: var(--text-secondary);
    }

    .action-btn.ghost:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .action-icon {
      font-size: 1.125rem;
    }
  `;
    _getActions() {
        try {
            return JSON.parse(this.actions);
        }
        catch {
            return [];
        }
    }
    _handleActionClick(action) {
        this.dispatchEvent(new CustomEvent("action-click", {
            detail: action,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        const parsedActions = this._getActions();
        return html `
      <div class="toolbar">
        <div class="toolbar-title-area">
          <h2 class="toolbar-title">${this.title}</h2>
          <slot name="subtitle"></slot>
        </div>
        <div class="toolbar-actions">
          ${parsedActions.map((action) => html `
              <button
                class="action-btn ${action.variant || "secondary"}"
                @click="${() => this._handleActionClick(action)}"
              >
                ${action.icon
            ? html `<span class="action-icon">${action.icon}</span>`
            : ""}
                ${action.label}
              </button>
            `)}
          <slot></slot>
        </div>
      </div>
    `;
    }
};
__decorate([
    property()
], AppPageToolbar.prototype, "title", void 0);
__decorate([
    property()
], AppPageToolbar.prototype, "actions", void 0);
AppPageToolbar = __decorate([
    customElement("app-page-toolbar")
], AppPageToolbar);

let AppSplitView = class AppSplitView extends LitElement {
    constructor() {
        super();
        for (const key of ["direction", "split", "minFirst", "minSecond"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["direction", "split", "minFirst", "minSecond"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    _isDragging = false;
    static styles = css `
    :host {
      display: block;
      height: 100%;
    }

    .split-container {
      display: flex;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    .split-container.vertical {
      flex-direction: column;
    }

    .split-pane {
      overflow: auto;
      min-width: 0;
      min-height: 0;
    }

    .split-pane.first {
      flex-shrink: 0;
    }

    .split-container.horizontal .split-pane.first {
      height: 100%;
    }

    .split-container.vertical .split-pane.first {
      width: 100%;
    }

    .split-divider {
      flex-shrink: 0;
      background: var(--border-color);
      transition: background 0.15s;
      position: relative;
      z-index: 1;
    }

    .split-container.horizontal .split-divider {
      width: 6px;
      cursor: col-resize;
    }

    .split-container.vertical .split-divider {
      height: 6px;
      cursor: row-resize;
    }

    .split-divider:hover,
    .split-divider.dragging {
      background: var(--accent);
    }

    .split-divider::after {
      content: "";
      position: absolute;
      background: transparent;
    }

    .horizontal .split-divider::after {
      top: 0;
      bottom: 0;
      left: -4px;
      right: -4px;
    }

    .vertical .split-divider::after {
      left: 0;
      right: 0;
      top: -4px;
      bottom: -4px;
    }
  `;
    _onDividerMouseDown(e) {
        e.preventDefault();
        this._isDragging = true;
        const onMouseMove = (e) => {
            if (!this._isDragging)
                return;
            const container = this.shadowRoot?.querySelector(".split-container");
            if (!container)
                return;
            const rect = container.getBoundingClientRect();
            if (this.direction === "horizontal") {
                const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                const clamped = Math.max(this.minFirst, Math.min(100 - this.minSecond, percentage));
                this.split = clamped;
            }
            else {
                const percentage = ((e.clientY - rect.top) / rect.height) * 100;
                const clamped = Math.max(this.minFirst, Math.min(100 - this.minSecond, percentage));
                this.split = clamped;
            }
        };
        const onMouseUp = () => {
            this._isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
    render() {
        const firstSize = this.direction === "horizontal" ? "width" : "height";
        const secondSize = this.direction === "horizontal" ? "width" : "height";
        return html `
      <div class="split-container ${this.direction}">
        <div
          class="split-pane first"
          style="${firstSize}: ${this.split}%; flex-grow: 0;"
        >
          <slot name="first"></slot>
        </div>
        <div
          class="split-divider ${this._isDragging ? "dragging" : ""}"
          @mousedown="${this._onDividerMouseDown}"
        ></div>
        <div class="split-pane second" style="${secondSize}: auto; flex: 1;">
          <slot name="second"></slot>
        </div>
      </div>
    `;
    }
};
__decorate([
    property()
], AppSplitView.prototype, "direction", void 0);
__decorate([
    property({ type: Number })
], AppSplitView.prototype, "split", void 0);
__decorate([
    property({ type: Number })
], AppSplitView.prototype, "minFirst", void 0);
__decorate([
    property({ type: Number })
], AppSplitView.prototype, "minSecond", void 0);
__decorate([
    state()
], AppSplitView.prototype, "_isDragging", void 0);
AppSplitView = __decorate([
    customElement("app-split-view")
], AppSplitView);

let AppAvatar = class AppAvatar extends LitElement {
    constructor() {
        super();
        for (const key of ["src", "alt", "size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["src", "alt", "size"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    .avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
    }

    .avatar-sm {
      width: 2rem;
      height: 2rem;
      font-size: 0.75rem;
    }

    .avatar-md {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0.875rem;
    }

    .avatar-lg {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 1.25rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .initials {
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
    }
  `;
    _getInitials() {
        if (!this.alt)
            return "?";
        return this.alt
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2);
    }
    _handleImageError() {
        this.src = "";
    }
    render() {
        const sizeClass = `avatar-${this.size}`;
        if (this.src) {
            return html `
        <div class="avatar ${sizeClass}">
          <img src="${this.src}" alt="${this.alt}" @error="${this._handleImageError}" />
        </div>
      `;
        }
        return html `
      <div class="avatar ${sizeClass}">
        <span class="initials">${this._getInitials()}</span>
      </div>
    `;
    }
};
__decorate([
    property()
], AppAvatar.prototype, "src", void 0);
__decorate([
    property()
], AppAvatar.prototype, "alt", void 0);
__decorate([
    property()
], AppAvatar.prototype, "size", void 0);
AppAvatar = __decorate([
    customElement("app-avatar")
], AppAvatar);

let AppChip = class AppChip extends LitElement {
    constructor() {
        super();
        for (const key of ["label", "removable", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["label", "removable", "icon"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      font-size: 0.875rem;
      font-weight: 500;
      transition: background-color 0.15s;
    }

    .chip:hover {
      background-color: var(--bg-hover);
    }

    .chip-icon {
      font-size: 1rem;
    }

    .remove-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      border-radius: 50%;
      transition: background-color 0.15s;
      margin-left: 0.125rem;
    }

    .remove-btn:hover {
      background-color: var(--border-color);
      color: var(--text-primary);
    }
  `;
    _handleRemove(e) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent("remove", { bubbles: true, composed: true }));
    }
    render() {
        return html `
      <span class="chip">
        ${this.icon ? html `<i class="material-icons chip-icon">${this.icon}</i>` : ""}
        <span>${this.label}</span>
        ${this.removable
            ? html `<button class="remove-btn" @click="${this._handleRemove}" aria-label="Remove">×</button>`
            : ""}
      </span>
    `;
    }
};
__decorate([
    property()
], AppChip.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], AppChip.prototype, "removable", void 0);
__decorate([
    property()
], AppChip.prototype, "icon", void 0);
AppChip = __decorate([
    customElement("app-chip")
], AppChip);

let AppPagination = class AppPagination extends LitElement {
    constructor() {
        super();
        for (const key of ["page", "total", "pageSize"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["page", "total", "pageSize"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .pagination {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      height: 2rem;
      padding: 0 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 0.375rem;
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.15s;
    }

    button:hover:not(:disabled) {
      background-color: var(--bg-hover);
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    button.active {
      background-color: var(--accent);
      border-color: var(--accent);
      color: var(--text-on-accent);
    }

    .ellipsis {
      padding: 0 0.25rem;
      color: var(--text-secondary);
    }
  `;
    get _totalPages() {
        return Math.ceil(this.total / this.pageSize);
    }
    _goTo(page) {
        if (page < 1 || page > this._totalPages || page === this.page)
            return;
        this.dispatchEvent(new CustomEvent("pageChange", { detail: { page }, bubbles: true, composed: true }));
    }
    _getPageNumbers() {
        const total = this._totalPages;
        const current = this.page;
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        const pages = [];
        if (current <= 4) {
            for (let i = 1; i <= 5; i++)
                pages.push(i);
            pages.push("...");
            pages.push(total);
        }
        else if (current >= total - 3) {
            pages.push(1);
            pages.push("...");
            for (let i = total - 4; i <= total; i++)
                pages.push(i);
        }
        else {
            pages.push(1);
            pages.push("...");
            pages.push(current - 1);
            pages.push(current);
            pages.push(current + 1);
            pages.push("...");
            pages.push(total);
        }
        return pages;
    }
    render() {
        const total = this._totalPages;
        if (total <= 1)
            return html ``;
        return html `
      <div class="pagination">
        <button @click="${() => this._goTo(this.page - 1)}" ?disabled="${this.page === 1}">
          ‹
        </button>
        ${this._getPageNumbers().map((p) => p === "..."
            ? html `<span class="ellipsis">…</span>`
            : html `<button
                class="${p === this.page ? "active" : ""}"
                @click="${() => this._goTo(p)}"
              >
                ${p}
              </button>`)}
        <button @click="${() => this._goTo(this.page + 1)}" ?disabled="${this.page === total}">
          ›
        </button>
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], AppPagination.prototype, "page", void 0);
__decorate([
    property({ type: Number })
], AppPagination.prototype, "total", void 0);
__decorate([
    property({ type: Number })
], AppPagination.prototype, "pageSize", void 0);
AppPagination = __decorate([
    customElement("app-pagination")
], AppPagination);

let AppTabs = class AppTabs extends LitElement {
    constructor() {
        super();
        for (const key of ["tabs", "activeTab"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["tabs", "activeTab"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid var(--border-color);
    }

    .tab {
      padding: 0.75rem 1.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: color 0.15s, border-color 0.15s;
    }

    .tab:hover {
      color: var(--text-primary);
    }

    .tab.active {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }
  `;
    get _parsedTabs() {
        try {
            return JSON.parse(this.tabs);
        }
        catch {
            return [];
        }
    }
    _selectTab(tab) {
        if (tab === this.activeTab)
            return;
        this.dispatchEvent(new CustomEvent("tabChange", { detail: { tab }, bubbles: true, composed: true }));
    }
    render() {
        const tabs = this._parsedTabs;
        return html `
      <div class="tabs">
        ${tabs.map((tab) => html `
            <div
              class="tab ${tab === this.activeTab ? "active" : ""}"
              @click="${() => this._selectTab(tab)}"
            >
              ${tab}
            </div>
          `)}
      </div>
    `;
    }
};
__decorate([
    property()
], AppTabs.prototype, "tabs", void 0);
__decorate([
    property()
], AppTabs.prototype, "activeTab", void 0);
AppTabs = __decorate([
    customElement("app-tabs")
], AppTabs);

let AppProgressBar = class AppProgressBar extends LitElement {
    constructor() {
        super();
        for (const key of ["value", "max"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["value", "max"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .progress-container {
      width: 100%;
      height: 0.5rem;
      background-color: var(--bg-elevated);
      border-radius: 0.25rem;
      overflow: hidden;
      border: 1px solid var(--border-color);
    }

    .progress-fill {
      height: 100%;
      border-radius: 0.25rem;
      transition: width 0.3s ease;
    }

    .progress-fill.low {
      background-color: var(--warning);
    }

    .progress-fill.medium {
      background-color: var(--accent);
    }

    .progress-fill.high {
      background-color: var(--success);
    }
  `;
    get _percentage() {
        const pct = (this.value / this.max) * 100;
        return Math.min(100, Math.max(0, pct));
    }
    _getFillClass() {
        const pct = this._percentage;
        if (pct < 40)
            return "low";
        if (pct < 75)
            return "medium";
        return "high";
    }
    render() {
        return html `
      <div class="progress-container">
        <div
          class="progress-fill ${this._getFillClass()}"
          style="width: ${this._percentage}%"
        ></div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], AppProgressBar.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], AppProgressBar.prototype, "max", void 0);
AppProgressBar = __decorate([
    customElement("app-progress-bar")
], AppProgressBar);

let AppSegmentSelector = class AppSegmentSelector extends LitElement {
    constructor() {
        super();
        for (const key of ["options", "selected"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["options", "selected"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    .segment-container {
      display: inline-flex;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      overflow: hidden;
      background-color: var(--bg-elevated);
    }

    .segment {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      transition: background-color 0.15s, color 0.15s;
      border-right: 1px solid var(--border-color);
    }

    .segment:last-child {
      border-right: none;
    }

    .segment:hover:not(.selected) {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .segment.selected {
      background-color: var(--accent);
      color: var(--text-on-accent);
    }
  `;
    get _parsedOptions() {
        try {
            return JSON.parse(this.options);
        }
        catch {
            return [];
        }
    }
    _select(option) {
        if (option === this.selected)
            return;
        this.dispatchEvent(new CustomEvent("change", { detail: { selected: option }, bubbles: true, composed: true }));
    }
    render() {
        const options = this._parsedOptions;
        return html `
      <div class="segment-container">
        ${options.map((opt) => html `
            <div
              class="segment ${opt === this.selected ? "selected" : ""}"
              @click="${() => this._select(opt)}"
            >
              ${opt}
            </div>
          `)}
      </div>
    `;
    }
};
__decorate([
    property()
], AppSegmentSelector.prototype, "options", void 0);
__decorate([
    property()
], AppSegmentSelector.prototype, "selected", void 0);
AppSegmentSelector = __decorate([
    customElement("app-segment-selector")
], AppSegmentSelector);

const ICONS = new Map([
    [
        "clear",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`,
    ],
    [
        "copy",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>`,
    ],
    [
        "swap",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="17 1 21 5 17 9"></polyline>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
      <polyline points="7 23 3 19 7 15"></polyline>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>`,
    ],
    [
        "chevron-down",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`,
    ],
    [
        "translate",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M2 12h20"></path>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      <path d="m7 8 2 4 2-4"></path>
    </svg>`,
    ],
    [
        "spinner",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-spinner">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
    </svg>`,
    ],
    [
        "keyboard",
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
      <path d="M6 8h.001"></path>
      <path d="M10 8h.001"></path>
      <path d="M14 8h.001"></path>
      <path d="M18 8h.001"></path>
      <path d="M8 12h.001"></path>
      <path d="M12 12h.001"></path>
      <path d="M16 12h.001"></path>
      <path d="M7 16h10"></path>
    </svg>`,
    ],
]);
let AppIcon = class AppIcon extends LitElement {
    constructor() {
        super();
        for (const key of ["name", "svgClass"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["name", "svgClass"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25em;
      height: 1.25em;
    }

    svg {
      width: 100%;
      height: 100%;
      color: inherit;
    }

    .icon-spinner {
      animation: icon-spin 1s linear infinite;
    }

    @keyframes icon-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
    render() {
        const svg = ICONS.get(this.name);
        if (!svg) {
            return html ``;
        }
        return html `<div class="${this.svgClass || ""}">${svg}</div>`;
    }
};
__decorate([
    property()
], AppIcon.prototype, "name", void 0);
__decorate([
    property()
], AppIcon.prototype, "svgClass", void 0);
AppIcon = __decorate([
    customElement("app-icon")
], AppIcon);

let AppLanguageSelector = class AppLanguageSelector extends LitElement {
    constructor() {
        super();
        for (const key of ["languages", "value", "label", "labelId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["languages", "value", "label", "labelId"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .selector-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .select-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    select {
      appearance: none;
      -webkit-appearance: none;
      padding: 0.5rem 2rem 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      font-size: 0.875rem;
      font-family: inherit;
      cursor: pointer;
      outline: none;
      transition: border-color 0.15s;
    }

    select:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    .chevron-icon {
      position: absolute;
      right: 0.5rem;
      pointer-events: none;
      width: 1rem;
      height: 1rem;
      color: var(--text-muted);
    }
  `;
    _handleChange(e) {
        const select = e.target;
        this.value = select.value;
        this.dispatchEvent(new CustomEvent("change", {
            detail: { value: select.value },
            bubbles: true,
            composed: true,
        }));
    }
    _getParsedLanguages() {
        try {
            return JSON.parse(this.languages || "[]");
        }
        catch {
            return [];
        }
    }
    render() {
        const langs = this._getParsedLanguages();
        return html `
      ${this.label
            ? html `<span class="selector-label" id="${this.labelId || ""}">${this.label}</span>`
            : ""}
      <div class="select-wrapper">
        <select
          .value="${this.value || ""}"
          aria-labelledby="${this.labelId || ""}"
          @change="${this._handleChange}"
        >
          ${langs.map((lang) => html `<option value="${lang.code}">${lang.name}</option>`)}
        </select>
        <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    `;
    }
};
__decorate([
    property()
], AppLanguageSelector.prototype, "languages", void 0);
__decorate([
    property()
], AppLanguageSelector.prototype, "value", void 0);
__decorate([
    property()
], AppLanguageSelector.prototype, "label", void 0);
__decorate([
    property()
], AppLanguageSelector.prototype, "labelId", void 0);
AppLanguageSelector = __decorate([
    customElement("app-language-selector")
], AppLanguageSelector);

let AppSwapButton = class AppSwapButton extends LitElement {
    constructor() {
        super();
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    button:hover {
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-color: var(--accent);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  `;
    _handleClick() {
        this.dispatchEvent(new CustomEvent("click", {
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <button type="button" @click="${this._handleClick}" title="Swap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="17 1 21 5 17 9"></polyline>
          <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
          <polyline points="7 23 3 19 7 15"></polyline>
          <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
        </svg>
      </button>
    `;
    }
};
AppSwapButton = __decorate([
    customElement("app-swap-button")
], AppSwapButton);

let AppTextInput = class AppTextInput extends LitElement {
    _textarea = null;
    constructor() {
        super();
        for (const key of ["value", "placeholder", "charCount", "maxChars", "id", "clearable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["value", "placeholder", "charCount", "maxChars", "id", "clearable"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-elevated);
      transition: border-color 0.15s;
    }

    .input-container:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    textarea {
      width: 100%;
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      border: none;
      background: transparent;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
      resize: none;
      outline: none;
      overflow: hidden;
    }

    textarea::placeholder {
      color: var(--text-muted);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.25rem 0.75rem 0.375rem;
      border-top: 1px solid var(--border-color);
    }

    .char-count {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .clear-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    .clear-btn:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .clear-btn svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  `;
    _handleInput(e) {
        const textarea = e.target;
        this.value = textarea.value;
        this._autoResize(textarea);
        this.dispatchEvent(new CustomEvent("input", {
            detail: { value: textarea.value },
            bubbles: true,
            composed: true,
        }));
    }
    _autoResize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }
    _handleClear() {
        this.value = "";
        if (this._textarea) {
            this._textarea.style.height = "auto";
        }
        this.dispatchEvent(new CustomEvent("clear", {
            bubbles: true,
            composed: true,
        }));
    }
    updated(changed) {
        if (changed.has("value") && this._textarea) {
            this._autoResize(this._textarea);
        }
    }
    render() {
        const displayCount = this.charCount || `${this.value?.length || 0}${this.maxChars ? `/${this.maxChars}` : ""}`;
        return html `
      <div class="input-container">
        <textarea
          id="${this.id || ""}"
          .value="${this.value || ""}"
          placeholder="${this.placeholder || ""}"
          @input="${this._handleInput}"
          @textarea="${(e) => this._autoResize(e.target)}"
        ></textarea>
        <div class="footer">
          <span class="char-count">${displayCount}</span>
          ${this.clearable
            ? html `
                <button class="clear-btn" type="button" @click="${this._handleClear}" title="Clear">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              `
            : ""}
        </div>
      </div>
    `;
    }
    firstUpdated() {
        this._textarea = this.shadowRoot?.querySelector("textarea") ?? null;
        if (this._textarea) {
            this._autoResize(this._textarea);
        }
    }
};
__decorate([
    property()
], AppTextInput.prototype, "value", void 0);
__decorate([
    property()
], AppTextInput.prototype, "placeholder", void 0);
__decorate([
    property()
], AppTextInput.prototype, "charCount", void 0);
__decorate([
    property({ type: Number })
], AppTextInput.prototype, "maxChars", void 0);
__decorate([
    property()
], AppTextInput.prototype, "id", void 0);
__decorate([
    property({ type: Boolean })
], AppTextInput.prototype, "clearable", void 0);
AppTextInput = __decorate([
    customElement("app-text-input")
], AppTextInput);

let AppTranslationOutput = class AppTranslationOutput extends LitElement {
    _textarea = null;
    constructor() {
        super();
        for (const key of ["value", "placeholder", "id"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["value", "placeholder", "id"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .output-container {
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-elevated);
    }

    textarea {
      width: 100%;
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      padding-right: 2.5rem;
      border: none;
      background: transparent;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
      resize: none;
      outline: none;
      overflow: hidden;
    }

    textarea::placeholder {
      color: var(--text-muted);
    }

    .copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 0.375rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    .copy-btn:hover {
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-color: var(--accent);
    }

    .copy-btn svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  `;
    _autoResize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }
    _handleCopy() {
        if (this.value) {
            navigator.clipboard.writeText(this.value).catch(() => { });
        }
        this.dispatchEvent(new CustomEvent("copy", {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }
    updated(changed) {
        if (changed.has("value") && this._textarea) {
            this._autoResize(this._textarea);
        }
    }
    render() {
        return html `
      <div class="output-container">
        <textarea
          id="${this.id || ""}"
          .value="${this.value || ""}"
          placeholder="${this.placeholder || ""}"
          readonly
        ></textarea>
        <button class="copy-btn" type="button" @click="${this._handleCopy}" title="Copy to clipboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    `;
    }
    firstUpdated() {
        this._textarea = this.shadowRoot?.querySelector("textarea") ?? null;
        if (this._textarea) {
            this._autoResize(this._textarea);
        }
    }
};
__decorate([
    property()
], AppTranslationOutput.prototype, "value", void 0);
__decorate([
    property()
], AppTranslationOutput.prototype, "placeholder", void 0);
__decorate([
    property()
], AppTranslationOutput.prototype, "id", void 0);
AppTranslationOutput = __decorate([
    customElement("app-translation-output")
], AppTranslationOutput);

let AppToast = class AppToast extends LitElement {
    _timeout = null;
    constructor() {
        super();
        for (const key of ["message", "visible", "type"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["message", "visible", "type"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }
    static styles = css `
    :host {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 9999;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 0.875rem;
      transform: translateY(0);
      opacity: 1;
      transition: all 0.3s ease;
      max-width: 24rem;
    }

    .toast.hidden {
      transform: translateY(1rem);
      opacity: 0;
      pointer-events: none;
    }

    .toast-success {
      border-color: var(--success);
      border-left-width: 3px;
    }

    .toast-error {
      border-color: var(--error);
      border-left-width: 3px;
    }

    .toast-info {
      border-color: var(--info);
      border-left-width: 3px;
    }

    .toast-warning {
      border-color: var(--warning);
      border-left-width: 3px;
    }

    .toast-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .toast-success .toast-icon {
      color: var(--success);
    }

    .toast-error .toast-icon {
      color: var(--error);
    }

    .toast-info .toast-icon {
      color: var(--info);
    }

    .toast-warning .toast-icon {
      color: var(--warning);
    }

    .toast-message {
      flex: 1;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
    }

    .close-btn:hover {
      color: var(--text-primary);
    }

    .close-btn svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  `;
    updated(changed) {
        if (changed.has("visible") && this.visible) {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(() => {
                this.visible = false;
                this.dispatchEvent(new CustomEvent("dismiss", {
                    bubbles: true,
                    composed: true,
                }));
            }, 4000);
        }
    }
    _handleClose() {
        this.visible = false;
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        this.dispatchEvent(new CustomEvent("dismiss", {
            bubbles: true,
            composed: true,
        }));
    }
    _getIcon() {
        switch (this.type) {
            case "success":
                return html `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            case "error":
                return html `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
            case "warning":
                return html `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
            case "info":
            default:
                return html `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
        }
    }
    render() {
        return html `
      <div class="toast toast-${this.type || "info"} ${this.visible ? "" : "hidden"}">
        ${this._getIcon()}
        <span class="toast-message">${this.message}</span>
        <button class="close-btn" type="button" @click="${this._handleClose}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;
    }
};
__decorate([
    property()
], AppToast.prototype, "message", void 0);
__decorate([
    property({ type: Boolean })
], AppToast.prototype, "visible", void 0);
__decorate([
    property()
], AppToast.prototype, "type", void 0);
AppToast = __decorate([
    customElement("app-toast")
], AppToast);

let AppThemeToggle = class AppThemeToggle extends LitElement {
    constructor() {
        super();
        for (const key of ["isDark"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["isDark"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
        // Initialize isDark from actual DOM state if not already set
        if (!this.isDark) {
            this.isDark = document.documentElement.classList.contains("dark");
        }
    }
    static styles = css `
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    button:hover {
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-color: var(--accent);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  `;
    _handleToggle() {
        this.isDark = !this.isDark;
        this.dispatchEvent(new CustomEvent("toggle", {
            detail: { isDark: this.isDark },
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
      <button
        type="button"
        @click="${this._handleToggle}"
        title="${this.isDark ? "Switch to light" : "Switch to dark"}"
      >
        ${this.isDark
            ? html `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            `
            : html `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            `}
      </button>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppThemeToggle.prototype, "isDark", void 0);
AppThemeToggle = __decorate([
    customElement("app-theme-toggle")
], AppThemeToggle);

let AppShortcutsOverlay = class AppShortcutsOverlay extends LitElement {
    constructor() {
        super();
        for (const key of ["open", "shortcuts"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["open", "shortcuts"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    static styles = css `
    :host {
      display: block;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 1;
      transition: opacity 0.2s ease;
    }

    .overlay.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .modal {
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.75rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 28rem;
      max-height: 80vh;
      overflow-y: auto;
      padding: 1.5rem;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .modal-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 0.375rem;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    .close-btn:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .close-btn svg {
      width: 1rem;
      height: 1rem;
    }

    .shortcut-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .shortcut-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .shortcut-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.75rem;
      height: 1.75rem;
      padding: 0 0.375rem;
      border-radius: 0.25rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.75rem;
      font-weight: 500;
      white-space: nowrap;
    }

    .shortcut-keys {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      flex-shrink: 0;
    }

    .shortcut-plus {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
  `;
    _getParsedShortcuts() {
        try {
            return JSON.parse(this.shortcuts || "[]");
        }
        catch {
            return [];
        }
    }
    _handleBackdropClick(e) {
        if (e.target === e.currentTarget) {
            this._close();
        }
    }
    _close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("close", {
            bubbles: true,
            composed: true,
        }));
    }
    _parseKeys(key) {
        return key.split("+").map((k) => k.trim());
    }
    render() {
        const shortcuts = this._getParsedShortcuts();
        return html `
      <div class="overlay ${this.open ? "" : "hidden"}" @click="${this._handleBackdropClick}">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">Keyboard Shortcuts</h2>
            <button class="close-btn" type="button" @click="${this._close}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <ul class="shortcut-list">
            ${shortcuts.map((s) => html `
                <li class="shortcut-item">
                  <span class="shortcut-desc">${s.description}</span>
                  <span class="shortcut-keys">
                    ${this._parseKeys(s.key).map((k, i, arr) => html `
                        <kbd>${k}</kbd>
                        ${i < arr.length - 1
            ? html `<span class="shortcut-plus">+</span>`
            : ""}
                      `)}
                  </span>
                </li>
              `)}
          </ul>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], AppShortcutsOverlay.prototype, "open", void 0);
__decorate([
    property()
], AppShortcutsOverlay.prototype, "shortcuts", void 0);
AppShortcutsOverlay = __decorate([
    customElement("app-shortcuts-overlay")
], AppShortcutsOverlay);

// Side-effect import: Import ALL Lit components to trigger @customElement decorators
// The decorator calls customElements.define() when the module is executed
// This file MUST be imported before any component usage
// UI Components

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

class ComponentRegistryService {
    _componentRegistry = new Map();
    _componentModules = new Map();
    registerComponent(def) {
        this._componentRegistry.set(def.selector, def);
    }
    registerComponents(defs) {
        for (const def of defs) {
            this.registerComponent(def);
        }
    }
    getComponent(selector) {
        return this._componentRegistry.get(selector);
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
        const def = this.getComponent(selector);
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
            const comps = page.canvasElements || page.components || [];
            for (const comp of comps) {
                registry.set(comp.selector, comp);
            }
        }
        this._componentRegistry = registry;
    }
    hasComponent(selector) {
        return this._componentRegistry.has(selector);
    }
    getRegisteredSelectors() {
        return Array.from(this._componentRegistry.keys());
    }
}

class DataBindingResolverService {
    signalStore;
    crudService;
    constructor(signalStore, crudService) {
        this.signalStore = signalStore;
        this.crudService = crudService;
    }
    resolveDataBinding(binding) {
        if (typeof binding === "string") {
            const pattern = /\{\{data\.([^}]+)\}\}/g;
            const result = binding.replace(pattern, (_, path) => {
                const value = this.getDataBindingValue(path);
                return value !== undefined ? String(value) : binding;
            });
            return result;
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
}

class LayoutEngineService {
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
        }
        else if (layout.type === "flex") {
            classes.push("flex");
            if (layout.direction === "column")
                classes.push("flex-col");
            else
                classes.push("flex-row");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
        }
        else if (layout.type === "stack") {
            classes.push("flex");
            classes.push("flex-col");
            if (layout.gap)
                classes.push(`gap-${layout.gap}`);
        }
        return classes.join(" ");
    }
    renderGridLayout(container, layout) {
        container.style.display = "grid";
        if (layout.class) {
            container.className = layout.class;
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
        if (layout.style) {
            Object.assign(container.style, layout.style);
        }
        container.innerHTML = "";
    }
    renderFlexLayout(container, layout) {
        container.style.display = "flex";
        if (layout.class) {
            container.className = layout.class;
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
    applyLayoutStyles(container, layout, children, getComponentById, resolvePosition) {
        if (layout.children) {
            for (const childId of layout.children) {
                const component = getComponentById(childId);
                if (component) {
                    const el = document.createElement(component.selector);
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
/**
 * Singleton i18n service for schema-driven UI.
 * Use I18nService.instance.t('key') to translate.
 */
class I18nService {
    static _instance = null;
    static get instance() {
        if (!I18nService._instance) {
            I18nService._instance = new I18nService();
        }
        return I18nService._instance;
    }
    _locale = signal('en', ...(ngDevMode ? [{ debugName: "_locale" }] : []));
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
        return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS['en']?.[key] ?? key;
    }
    /**
     * Get all available locales.
     */
    getAvailableLocales() {
        return ['en', 'ru'];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: I18nService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: I18nService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: I18nService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

// Neumorphism CSS - inline for reliable loading
const NEUMORPHISM_CSS = `
/* Neumorphism Style System for TailwindCSS v4 */
/* Class prefix: neu- */

@theme {
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

@theme {
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

@theme {
  /* Glasmorphism color palette */
  --color-glass-bg: rgba(255, 255, 255, 0.1);
  --color-glass-bg-hover: rgba(255, 255, 255, 0.15);
  --color-glass-bg-active: rgba(255, 255, 255, 0.2);
  --color-glass-border: rgba(255, 255, 255, 0.2);
  --color-glass-border-strong: rgba(255, 255, 255, 0.3);
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

@theme {
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
const STYLE_VARIANTS = {
    claymorphism: {
        id: "claymorphism",
        name: "Claymorphism",
        cssString: CLAYMORPHISM_CSS,
        classPrefix: "clay-",
        description: "Soft raised shadows with clay-like appearance",
        componentStyles: {
            "app-button": {
                solid: "clay-btn clay-btn-solid",
                ghost: "clay-btn clay-btn-ghost",
                text: "clay-btn clay-btn-text",
                icon: "clay-btn clay-btn-icon",
                "solid-sm": "clay-btn clay-btn-solid clay-btn-sm",
                "ghost-sm": "clay-btn clay-btn-ghost clay-btn-sm",
                "text-sm": "clay-btn clay-btn-text clay-btn-sm",
                "icon-sm": "clay-btn clay-btn-icon clay-btn-sm",
            },
            "app-card": {
                elevated: "clay-card clay-card-elevated",
                filled: "clay-card clay-card-filled",
                outlined: "clay-card clay-card-outlined",
            },
            "app-theme-toggle": { default: "clay-toggle" },
            "app-swap-button": { default: "clay-swap-btn" },
            "app-language-selector": { default: "clay-lang-selector" },
            "app-text-input": { default: "clay-input" },
            "app-translation-output": { default: "clay-output" },
            "app-shortcuts-overlay": { default: "clay-overlay" },
        },
    },
    glassmorphism: {
        id: "glassmorphism",
        name: "Glasmorphism",
        cssString: GLASSMORPHISM_CSS,
        classPrefix: "glass-",
        description: "Frosted glass effect with backdrop blur",
        componentStyles: {
            "app-button": {
                solid: "glass-btn glass-btn-solid",
                ghost: "glass-btn glass-btn-ghost",
                text: "glass-btn glass-btn-text",
                icon: "glass-btn glass-btn-icon",
                "solid-sm": "glass-btn glass-btn-solid glass-btn-sm",
                "ghost-sm": "glass-btn glass-btn-ghost glass-btn-sm",
                "text-sm": "glass-btn glass-btn-text glass-btn-sm",
                "icon-sm": "glass-btn glass-btn-icon glass-btn-sm",
            },
            "app-card": {
                elevated: "glass-card glass-card-elevated",
                filled: "glass-card glass-card-filled",
                outlined: "glass-card glass-card-outlined",
            },
            "app-theme-toggle": { default: "glass-toggle" },
            "app-swap-button": { default: "glass-swap-btn" },
            "app-language-selector": { default: "glass-lang-selector" },
            "app-text-input": { default: "glass-input" },
            "app-translation-output": { default: "glass-output" },
            "app-shortcuts-overlay": { default: "glass-overlay" },
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
                solid: "neu-btn neu-btn-primary",
                ghost: "neu-btn neu-btn-primary",
                text: "neu-btn neu-btn-primary",
                icon: "neu-btn neu-btn-icon",
                "solid-sm": "neu-btn neu-btn-primary neu-btn-sm",
                "ghost-sm": "neu-btn neu-btn-primary neu-btn-sm",
                "text-sm": "neu-btn neu-btn-primary neu-btn-sm",
                "icon-sm": "neu-btn neu-btn-icon neu-btn-sm",
            },
            "app-card": {
                elevated: "neu-card neu-card-elevated",
                filled: "neu-card neu-card-filled",
                outlined: "neu-card neu-card-outlined",
            },
            "app-theme-toggle": { default: "neu-toggle" },
            "app-swap-button": { default: "neu-swap-btn" },
            "app-language-selector": { default: "neu-lang-selector" },
            "app-text-input": { default: "neu-input" },
            "app-translation-output": { default: "neu-output" },
            "app-shortcuts-overlay": { default: "neu-overlay" },
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
                solid: "m3-btn-filled",
                ghost: "m3-btn-outlined",
                text: "m3-btn-text",
                icon: "m3-btn-icon",
                "solid-sm": "m3-btn-filled m3-btn-sm",
                "ghost-sm": "m3-btn-outlined m3-btn-sm",
                "text-sm": "m3-btn-text m3-btn-sm",
                "icon-sm": "m3-btn-icon m3-btn-sm",
            },
            "app-card": {
                elevated: "m3-card-elevated",
                filled: "m3-card-filled",
                outlined: "m3-card-outlined",
            },
            "app-theme-toggle": { default: "m3-toggle" },
            "app-swap-button": { default: "m3-swap-btn" },
            "app-language-selector": { default: "m3-lang-selector" },
            "app-text-input": { default: "m3-input" },
            "app-translation-output": { default: "m3-output" },
            "app-shortcuts-overlay": { default: "m3-overlay" },
        },
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
    CURRENT_STYLE = variant;
    if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("tauri-front-style", variant);
    }
    document.dispatchEvent(new CustomEvent("style-changed", {
        detail: { variant, prefix: STYLE_VARIANTS[variant].classPrefix },
    }));
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
/**
 * Get CSS classes for a component's named style.
 * Uses the global style registry — styleName is resolved based on the theme variant.
 * Returns CSS class string or empty string if not found.
 */
function getComponentStyleClasses(variant, componentId, styleName) {
    const config = STYLE_VARIANTS[variant];
    if (!config)
        return "";
    const componentMap = config.componentStyles?.[componentId];
    if (!componentMap)
        return "";
    return componentMap[styleName] || "";
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

class SchemaRendererService {
    _pages = signal([], ...(ngDevMode ? [{ debugName: "_pages" }] : []));
    _currentPageId = signal(null, ...(ngDevMode ? [{ debugName: "_currentPageId" }] : []));
    _navigationStack = signal([], ...(ngDevMode ? [{ debugName: "_navigationStack" }] : []));
    componentRegistry;
    dataBindingResolver;
    layoutEngine;
    dataStore;
    crudService;
    eventBus;
    componentResolver = null;
    routeResolver = null;
    pages = this._pages.asReadonly();
    currentPageId = this._currentPageId.asReadonly();
    constructor() {
        this.dataStore = inject(SignalStoreService);
        this.crudService = inject(CrudService$1);
        this.eventBus = inject(EventBusService);
        this.componentRegistry = new ComponentRegistryService();
        this.dataBindingResolver = new DataBindingResolverService(this.dataStore, this.crudService);
        this.layoutEngine = new LayoutEngineService();
    }
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
        this._pages.set(schema.pages || []);
        this.componentRegistry.loadComponentsFromSchema(schema.pages || []);
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
    renderGridLayout(container, layout) {
        this.layoutEngine.renderGridLayout(container, layout);
        this.layoutEngine.applyLayoutStyles(container, layout, layout.children || [], (childId) => this.getCurrentPage()?.components.find((c) => c.id === childId), (l, childId) => this.layoutEngine.resolveGridPosition(l, childId));
    }
    renderFlexLayout(container, layout) {
        this.layoutEngine.renderFlexLayout(container, layout);
        container.innerHTML = "";
        if (layout.children) {
            for (const childId of layout.children) {
                const component = this.getCurrentPage()?.components.find((c) => c.id === childId);
                if (component) {
                    const el = document.createElement(component.selector);
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
    getComponentProps(componentId) {
        const page = this.getCurrentPage();
        if (!page)
            return {};
        const component = page.components.find((c) => c.id === componentId);
        return component?.props || {};
    }
    generatePage(pageId) {
        const page = this._pages().find((p) => p.id === pageId);
        if (!page)
            return { layouts: [], components: [] };
        return {
            layouts: page.layouts,
            // Support both canvasElements (Designer) and components (generated apps)
            components: page.canvasElements || page.components || [],
        };
    }
    setComponentResolver(resolver) {
        this.componentResolver = resolver;
    }
    async createElement(data) {
        const def = this.componentResolver
            ? this.componentResolver(data.componentId)
            : this.getComponent(data.componentId);
        if (!def) {
            console.warn(`Component not found: ${data.componentId}`);
            return null;
        }
        // Only wait for custom elements (names with hyphens), not native HTML elements like div/span/p/footer
        // Wrap in Promise.race to prevent indefinite hang if component never loads
        if (def.selector.includes('-')) {
            try {
                await Promise.race([
                    customElements.whenDefined(def.selector),
                    new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout: ${def.selector}`)), 2000))
                ]);
            }
            catch (e) {
                console.warn(`[SchemaRenderer] Element not ready: ${def.selector}`, e);
            }
        }
        const el = document.createElement(def.selector);
        if (data.gridPosition) {
            el.style.gridColumn = `${data.gridPosition.column} / span ${data.gridPosition.colSpan || 1}`;
            el.style.gridRow = `${data.gridPosition.row} / span ${data.gridPosition.rowSpan || 1}`;
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
        const mappedClasses = this.mapPropsToClasses(data.componentId, data.props, theme);
        const mappedClassStr = mappedClasses.join(" ");
        el.className = this.resolveClasses(data.classes, def.defaultClasses || "");
        if (mappedClassStr) {
            el.className = this.resolveClasses(el.className, mappedClassStr);
        }
        const resolvedProps = this.dataBindingResolver.resolveProps({
            ...def.props,
            ...data.props,
        }, data.id);
        // Handle text / i18nKey prop for native HTML elements
        // i18nKey takes precedence over text
        const i18nKey = resolvedProps["i18nKey"];
        const textValue = resolvedProps["text"];
        if (i18nKey !== undefined) {
            const translated = I18nService.instance.t(String(i18nKey));
            if (!el.shadowRoot) {
                el.textContent = translated;
            }
            else {
                el["label"] = translated;
            }
        }
        else if (textValue !== undefined) {
            if (!el.shadowRoot) {
                el.textContent = String(textValue);
            }
            else {
                el["label"] = String(textValue);
            }
        }
        // Handle placeholder_i18n prop: resolve via I18nService and set as placeholder
        const placeholderI18n = resolvedProps["placeholder_i18n"];
        if (placeholderI18n !== undefined) {
            el["placeholder"] = I18nService.instance.t(String(placeholderI18n));
        }
        for (const [key, value] of Object.entries(resolvedProps)) {
            if (key === "class" || key === "style" || key === "id" || key === "label" || key === "text" || key === "i18nKey" || key === "placeholder_i18n")
                continue;
            if (key.startsWith("on") && typeof value === "function") {
                const eventName = key[2].toLowerCase() + key.slice(3);
                el.addEventListener(eventName, value);
            }
            else if (key === "disabled" || key === "checked" || key === "readonly") {
                // Boolean properties: set as property for Lit compatibility
                el[key] = value === true || value === "true" || value === key;
            }
            else {
                // For Lit web components, use property assignment instead of setAttribute
                // This properly triggers the component's property setter
                el[key] = value;
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
                            this.eventBus.emit(`${data.id}:${eventName}`, { elementId: data.id, event: e });
                        }
                        else if (typeof h === "object" && h !== null && "handler" in h) {
                            // Schema format: { handler: "onShortcutsOpen", params?: ... }
                            this.eventBus.emit(`${data.id}:${h.handler}`, { elementId: data.id, event: e });
                        }
                    }
                });
            }
        }
        return el;
    }
    async render(container, pageSchema) {
        container.innerHTML = "";
        if (pageSchema.gridTemplate) {
            const template = this.layoutEngine.parseGridTemplate(pageSchema.gridTemplate);
            container.style.display = "grid";
            container.style.gridTemplateColumns = template.gridTemplateColumns;
            container.style.gridTemplateRows = template.gridTemplateRows;
            container.style.gap = template.gap;
        }
        // 1. Create all elements and track them by ID
        const elementMap = new Map();
        for (const element of pageSchema.elements) {
            const el = await this.createElement(element);
            if (el) {
                elementMap.set(element.id, el);
            }
        }
        // 2. Collect all child IDs to identify root elements
        const childIds = new Set(pageSchema.elements.reduce((acc, e) => acc.concat(e.children || []), []));
        // 3. Append children to parents, then append roots to container
        for (const element of pageSchema.elements) {
            const el = elementMap.get(element.id);
            if (!el)
                continue;
            // Append children to this element
            if (element.children) {
                for (const childId of element.children) {
                    const childEl = elementMap.get(childId);
                    if (childEl) {
                        el.appendChild(childEl);
                    }
                }
            }
            // Append root elements (not a child of anyone) to container
            if (!childIds.has(element.id)) {
                container.appendChild(el);
            }
        }
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
    mapPropsToClasses(componentId, props, theme) {
        const classes = [];
        if (!props)
            return classes;
        // 1. Named style from global registry
        const styleName = props["styleName"];
        if (styleName) {
            const classesStr = getComponentStyleClasses(theme, componentId, styleName);
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
        // 4. Gap spacing
        const gap = props["gap"];
        if (gap === "xs")
            classes.push("gap-1");
        else if (gap === "sm")
            classes.push("gap-2");
        else if (gap === "md")
            classes.push("gap-4");
        else if (gap === "lg")
            classes.push("gap-6");
        else if (gap === "xl")
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
        else if (maxWidth === "6xl")
            classes.push("max-w-6xl");
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRendererService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class SchemaRouterService {
    _currentRoute = signal('/dashboard', ...(ngDevMode ? [{ debugName: "_currentRoute" }] : []));
    _schema = signal(null, ...(ngDevMode ? [{ debugName: "_schema" }] : []));
    currentRoute = this._currentRoute.asReadonly();
    currentPageId = computed(() => {
        const schema = this._schema();
        const route = this._currentRoute();
        if (!schema)
            return null;
        return schema.pages.find(p => p.route === route)?.id || null;
    }, ...(ngDevMode ? [{ debugName: "currentPageId" }] : []));
    setSchema(schema) {
        this._schema.set(schema);
    }
    navigate(route) {
        this._currentRoute.set(route);
    }
    navigateToPage(pageId) {
        const schema = this._schema();
        if (!schema)
            return;
        const page = schema.pages.find(p => p.id === pageId);
        if (page?.route) {
            this._currentRoute.set(page.route);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouterService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class SchemaRouteViewerComponent {
    contentContainer;
    headerProps = {};
    sidebarProps = {};
    schemaRenderer = inject(SchemaRendererService);
    schemaRouter = inject(SchemaRouterService);
    injector = inject(Injector);
    routeEffect;
    ngOnInit() {
        // React to route changes by re-rendering when currentPageId changes
        // effect() must be called within an injection context, so use runInInjectionContext
        this.routeEffect = runInInjectionContext(this.injector, () => {
            effect(() => {
                const pageId = this.schemaRouter.currentPageId();
                if (pageId) {
                    this.schemaRenderer.setCurrentPage(pageId);
                    this.renderCurrentPage();
                }
            });
        });
    }
    ngAfterViewInit() {
        // Initial render
        const pageId = this.schemaRouter.currentPageId();
        if (pageId) {
            this.schemaRenderer.setCurrentPage(pageId);
            this.renderCurrentPage();
        }
    }
    ngOnDestroy() {
        if (this.routeEffect) {
            this.routeEffect.destroy();
        }
    }
    renderCurrentPage() {
        const page = this.schemaRenderer.getCurrentPage();
        if (!page || !this.contentContainer)
            return;
        // Clear previous content
        this.contentContainer.nativeElement.innerHTML = '';
        // Extract header and sidebar props if defined at page level
        if (page.headerProps) {
            this.headerProps = page.headerProps;
        }
        if (page.sidebarProps) {
            this.sidebarProps = page.sidebarProps;
        }
        // Render elements from canvasElements or elements
        const elements = page.canvasElements || page.elements || [];
        // Build element map and handle hierarchy
        const elementMap = new Map();
        for (const element of elements) {
            const el = this.createElementNode(element);
            if (el) {
                elementMap.set(element.id, el);
            }
        }
        // Collect child IDs to identify roots
        const childIds = new Set(elements.reduce((acc, e) => acc.concat(e.children || []), []));
        // Append children to parents, roots to container
        for (const element of elements) {
            const el = elementMap.get(element.id);
            if (!el)
                continue;
            if (element.children) {
                for (const childId of element.children) {
                    const childEl = elementMap.get(childId);
                    if (childEl) {
                        el.appendChild(childEl);
                    }
                }
            }
            if (!childIds.has(element.id)) {
                this.contentContainer.nativeElement.appendChild(el);
            }
        }
    }
    createElementNode(element) {
        const el = document.createElement(element.componentId);
        // Set properties directly (NOT attributes for Lit components)
        for (const [key, value] of Object.entries(element.props || {})) {
            el[key] = value;
        }
        // Set grid position if present (for grid-based layouts)
        if (element.gridPosition) {
            el.style.gridColumn = `${element.gridPosition.column} / span ${element.gridPosition.colSpan || 1}`;
            el.style.gridRow = `${element.gridPosition.row} / span ${element.gridPosition.rowSpan || 1}`;
        }
        else if (element.position) {
            // Fallback to absolute positioning
            el.style.position = 'absolute';
            el.style.left = `${element.position.x}px`;
            el.style.top = `${element.position.y}px`;
            el.style.width = `${element.position.width}px`;
            el.style.height = `${element.position.height}px`;
        }
        // Apply z-index if defined
        if (element.zIndex) {
            el.style.zIndex = `${element.zIndex}`;
        }
        // Apply custom classes
        if (element.classes) {
            el.className = element.classes;
        }
        // Set element ID for tracking
        el.dataset['elementId'] = element.id;
        el.dataset['componentId'] = element.componentId;
        // Handle data binding if present
        if (element.dataBinding) {
            el.dataset['dataEntity'] = element.dataBinding.entity;
            if (element.dataBinding.field) {
                el.dataset['dataField'] = element.dataBinding.field;
            }
        }
        return el;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.25", type: SchemaRouteViewerComponent, isStandalone: true, selector: "lib-schema-route-viewer", viewQueries: [{ propertyName: "contentContainer", first: true, predicate: ["contentContainer"], descendants: true }], ngImport: i0, template: `
    <div class="schema-viewer">
      <div class="header-slot">
        <app-header [attr.data]="headerProps"></app-header>
      </div>
      <div class="sidebar-slot">
        <app-sidebar [attr.data]="sidebarProps"></app-sidebar>
      </div>
      <div class="content-slot" #contentContainer>
        <!-- Content elements render here -->
      </div>
    </div>
  `, isInline: true, styles: [".schema-viewer,.header-slot,.sidebar-slot,.content-slot{display:contents}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: SchemaRouteViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-schema-route-viewer', standalone: true, imports: [CommonModule], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: `
    <div class="schema-viewer">
      <div class="header-slot">
        <app-header [attr.data]="headerProps"></app-header>
      </div>
      <div class="sidebar-slot">
        <app-sidebar [attr.data]="sidebarProps"></app-sidebar>
      </div>
      <div class="content-slot" #contentContainer>
        <!-- Content elements render here -->
      </div>
    </div>
  `, styles: [".schema-viewer,.header-slot,.sidebar-slot,.content-slot{display:contents}\n"] }]
        }], propDecorators: { contentContainer: [{
                type: ViewChild,
                args: ['contentContainer']
            }] } });

class GuardService {
    canActivate() {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GuardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

let ThemeService$1 = class ThemeService {
    _mode = signal("system", ...(ngDevMode ? [{ debugName: "_mode" }] : []));
    _accentColor = signal("#3b82f6", ...(ngDevMode ? [{ debugName: "_accentColor" }] : []));
    _accentShades = signal(null, ...(ngDevMode ? [{ debugName: "_accentShades" }] : []));
    _registeredThemes = new Map();
    mode = this._mode.asReadonly();
    accentColor = this._accentColor.asReadonly();
    accentShades = this._accentShades.asReadonly();
    effectiveColorMode = computed(() => {
        const m = this._mode();
        if (m === "system") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return m;
    }, ...(ngDevMode ? [{ debugName: "effectiveColorMode" }] : []));
    constructor() {
        effect(() => {
            this.applyTheme(this._mode(), this._accentColor());
        });
    }
    setMode(mode) {
        this._mode.set(mode);
        localStorage.setItem("theme-mode", mode);
    }
    setTheme(theme) {
        this.setMode(theme);
    }
    setAccentColor(color) {
        this._accentColor.set(color);
        localStorage.setItem("theme-accent", color);
        this.applyAccentShades(color);
    }
    registerTheme(name, colors) {
        this._registeredThemes.set(name, colors);
    }
    init() {
        const savedMode = localStorage.getItem("theme-mode");
        const savedAccent = localStorage.getItem("theme-accent");
        if (savedMode)
            this._mode.set(savedMode);
        if (savedAccent)
            this._accentColor.set(savedAccent);
        const shades = this.calculateShades(savedAccent || "#3b82f6");
        this._accentShades.set(shades);
        this.applyTheme(this._mode(), savedAccent || "#3b82f6");
    }
    toggle() {
        const current = document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";
        this.setMode(current === "dark" ? "light" : "dark");
    }
    applyTheme(mode, accent) {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        const effectiveMode = mode === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            : mode;
        root.classList.add(effectiveMode);
        this.applyThemeVariables(effectiveMode, accent);
    }
    applyThemeVariables(mode, accent) {
        const root = document.documentElement;
        // Core accent
        root.style.setProperty("--accent", accent);
        root.style.setProperty("--accent-hover", this.darkenColor(accent, 0.15));
        // Semantic text colors
        root.style.setProperty("--text-on-accent", "#ffffff");
        root.style.setProperty("--text-primary", mode === "dark" ? "#f8fafc" : "#0f172a");
        root.style.setProperty("--text-secondary", mode === "dark" ? "#94a3b8" : "#64748b");
        root.style.setProperty("--text-muted", mode === "dark" ? "#64748b" : "#94a3b8");
        root.style.setProperty("--text-on-error", "#ffffff");
        root.style.setProperty("--text-on-warning", "#ffffff");
        root.style.setProperty("--text-on-success", "#ffffff");
        root.style.setProperty("--text-on-info", "#ffffff");
        // Background colors
        root.style.setProperty("--bg-elevated", mode === "dark" ? "#1e293b" : "#ffffff");
        root.style.setProperty("--bg-hover", mode === "dark" ? "#334155" : "#f1f5f9");
        root.style.setProperty("--bg-primary", mode === "dark" ? "#0f172a" : "#ffffff");
        root.style.setProperty("--bg-tertiary", mode === "dark" ? "#0f172a" : "#f8fafc");
        // Border colors
        root.style.setProperty("--border-color", mode === "dark" ? "#334155" : "#e2e8f0");
        // Status colors
        root.style.setProperty("--error", "#ef4444");
        root.style.setProperty("--warning", "#f59e0b");
        root.style.setProperty("--success", "#22c55e");
        root.style.setProperty("--info", "#06b6d4");
        // Accent shades
        const shades = {
            50: `color-mix(in srgb, ${accent} 10%, ${mode === "dark" ? "black" : "white"})`,
            100: `color-mix(in srgb, ${accent} 20%, ${mode === "dark" ? "black" : "white"})`,
            200: `color-mix(in srgb, ${accent} 40%, ${mode === "dark" ? "black" : "white"})`,
            300: `color-mix(in srgb, ${accent} 60%, ${mode === "dark" ? "black" : "white"})`,
            400: `color-mix(in srgb, ${accent} 80%, ${mode === "dark" ? "black" : "white"})`,
            500: accent,
            600: this.darkenColor(accent, 0.15),
            700: this.darkenColor(accent, 0.25),
            800: this.darkenColor(accent, 0.35),
            900: this.darkenColor(accent, 0.45),
        };
        for (const [key, value] of Object.entries(shades)) {
            root.style.setProperty(`--accent-${key}`, value);
        }
        const computedShades = { ...shades };
        computedShades[500] = accent;
        this._accentShades.set(computedShades);
    }
    darkenColor(hex, amount) {
        const rgb = this.hexToRgb(hex);
        if (!rgb)
            return hex;
        const r = Math.round(rgb.r * (1 - amount));
        const g = Math.round(rgb.g * (1 - amount));
        const b = Math.round(rgb.b * (1 - amount));
        return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    }
    applyAccentShades(accent) {
        const root = document.documentElement;
        root.style.setProperty("--accent", accent);
        const shades = {
            50: `color-mix(in srgb, var(--accent) 10%, white)`,
            100: `color-mix(in srgb, var(--accent) 20%, white)`,
            200: `color-mix(in srgb, var(--accent) 40%, white)`,
            300: `color-mix(in srgb, var(--accent) 60%, white)`,
            400: `color-mix(in srgb, var(--accent) 80%, white)`,
            500: accent,
            600: `color-mix(in srgb, var(--accent) 80%, black)`,
            700: `color-mix(in srgb, var(--accent) 60%, black)`,
            800: `color-mix(in srgb, var(--accent) 40%, black)`,
            900: `color-mix(in srgb, var(--accent) 20%, black)`,
        };
        for (const [key, value] of Object.entries(shades)) {
            root.style.setProperty(`--accent-${key}`, value);
        }
        const computedShades = { ...shades };
        computedShades[500] = accent;
        this._accentShades.set(computedShades);
    }
    calculateShades(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) {
            return {
                50: "#f0f9ff",
                100: "#e0f2fe",
                200: "#bae6fd",
                300: "#7dd3fc",
                400: "#38bdf8",
                500: "#0ea5e9",
                600: "#0284c7",
                700: "#0369a1",
                800: "#075985",
                900: "#0c4a6e",
            };
        }
        const shades = {
            50: this.rgbToHex(Math.round(rgb.r * 0.95 + 255 * 0.05), Math.round(rgb.g * 0.95 + 255 * 0.05), Math.round(rgb.b * 0.95 + 255 * 0.05)),
            100: this.rgbToHex(Math.round(rgb.r * 0.9 + 255 * 0.1), Math.round(rgb.g * 0.9 + 255 * 0.1), Math.round(rgb.b * 0.9 + 255 * 0.1)),
            200: this.rgbToHex(Math.round(rgb.r * 0.8 + 255 * 0.2), Math.round(rgb.g * 0.8 + 255 * 0.2), Math.round(rgb.b * 0.8 + 255 * 0.2)),
            300: this.rgbToHex(Math.round(rgb.r * 0.7 + 255 * 0.3), Math.round(rgb.g * 0.7 + 255 * 0.3), Math.round(rgb.b * 0.7 + 255 * 0.3)),
            400: this.rgbToHex(Math.round(rgb.r * 0.6 + 255 * 0.4), Math.round(rgb.g * 0.6 + 255 * 0.4), Math.round(rgb.b * 0.6 + 255 * 0.4)),
            500: hex,
            600: this.rgbToHex(Math.round(rgb.r * 0.8), Math.round(rgb.g * 0.8), Math.round(rgb.b * 0.8)),
            700: this.rgbToHex(Math.round(rgb.r * 0.6), Math.round(rgb.g * 0.6), Math.round(rgb.b * 0.6)),
            800: this.rgbToHex(Math.round(rgb.r * 0.4), Math.round(rgb.g * 0.4), Math.round(rgb.b * 0.4)),
            900: this.rgbToHex(Math.round(rgb.r * 0.2), Math.round(rgb.g * 0.2), Math.round(rgb.b * 0.2)),
        };
        return shades;
    }
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    }
    rgbToHex(r, g, b) {
        return ("#" +
            [r, g, b]
                .map((x) => {
                const hex = Math.max(0, Math.min(255, x)).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
                .join(""));
    }
    hexToRgba(hex, alpha) {
        const rgb = this.hexToRgb(hex);
        if (!rgb)
            return `rgba(0, 0, 0, ${alpha})`;
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, providedIn: "root" });
};
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService$1, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class ShortcutService {
    _shortcuts = signal([], ...(ngDevMode ? [{ debugName: "_shortcuts" }] : []));
    eventBus = inject(EventBusService);
    shortcuts = this._shortcuts.asReadonly();
    constructor() {
        window.addEventListener("keydown", (e) => this._handleKeyDown(e));
    }
    register(shortcut) {
        this._shortcuts.update((s) => [...s, shortcut]);
        return () => this.unregister(shortcut.id);
    }
    unregister(id) {
        this._shortcuts.update((s) => s.filter((s) => s.id !== id));
    }
    loadFromSchema(shortcuts) {
        shortcuts.forEach((s) => this.register(s));
    }
    _handleKeyDown(e) {
        const match = this._shortcuts().find((s) => s.enabled !== false &&
            s.key.toLowerCase() === e.key.toLowerCase() &&
            this._checkModifiers(s.modifiers || [], e));
        if (match) {
            e.preventDefault();
            this.eventBus.emit(`shortcut:${match.id}`, { shortcut: match });
            this.eventBus.emit(match.handler, { shortcut: match });
        }
    }
    _checkModifiers(modifiers, e) {
        return modifiers.every((m) => {
            if (m === "ctrl")
                return e.ctrlKey;
            if (m === "shift")
                return e.shiftKey;
            if (m === "alt")
                return e.altKey;
            if (m === "meta")
                return e.metaKey;
            return false;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ShortcutService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

/**
 * Window-level global state for Translator app.
 * Exposes source/target language codes as signals so any service
 * (including TranslationService) can read them without prop-drilling.
 */
class GlobalStateService {
    static _instance = null;
    static get instance() {
        if (!GlobalStateService._instance) {
            GlobalStateService._instance = new GlobalStateService();
        }
        return GlobalStateService._instance;
    }
    _sourceLang = signal('en', ...(ngDevMode ? [{ debugName: "_sourceLang" }] : []));
    _targetLang = signal('ru', ...(ngDevMode ? [{ debugName: "_targetLang" }] : []));
    _appLocale = signal('en', ...(ngDevMode ? [{ debugName: "_appLocale" }] : []));
    get sourceLang() { return this._sourceLang.asReadonly(); }
    get targetLang() { return this._targetLang.asReadonly(); }
    get appLocale() { return this._appLocale.asReadonly(); }
    setSourceLang(code) { this._sourceLang.set(code); }
    setTargetLang(code) { this._targetLang.set(code); }
    setAppLocale(locale) { this._appLocale.set(locale); }
    swapLanguages() {
        const src = this._sourceLang();
        const tgt = this._targetLang();
        this._sourceLang.set(tgt);
        this._targetLang.set(src);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GlobalStateService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GlobalStateService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: GlobalStateService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

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
    async invoke(cmd, args) {
        return invoke(cmd, args);
    }
    async invokeWithRetry(cmd, args, options = { maxAttempts: 3, initialDelayMs: 1000, maxDelayMs: 30000 }) {
        return invokeWithRetry(() => this.invokeWithTimeout(cmd, args, options.maxDelayMs), options);
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

class CrudService {
    entityName;
    constructor(entityName) {
        this.entityName = entityName;
    }
    async execute(operation, params) {
        return invoke(`crud_${operation}`, {
            entity: this.entityName,
            ...params,
        });
    }
    async find(query) {
        const result = await this.execute("find", { query });
        return result.results ?? { data: [], total: 0 };
    }
    async create(data) {
        const result = await this.execute("create", { data });
        return result.data;
    }
    async update(id, data) {
        const result = await this.execute("update", { id, data });
        return result.data;
    }
    async delete(id) {
        await this.execute("delete", { id });
    }
}

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
        const result = await invokeWithRetry(() => invoke(command, args), { maxAttempts: retryCount + 1, initialDelayMs: retryDelay, maxDelayMs: 60000 });
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

function defaultCompare(a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}
function quickSort(arr, compareFn = defaultCompare) {
    if (arr.length <= 1) {
        return arr.slice();
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter((x) => compareFn(x, pivot) < 0);
    const middle = arr.filter((x) => compareFn(x, pivot) === 0);
    const right = arr.filter((x) => compareFn(x, pivot) > 0);
    return [...quickSort(left, compareFn), ...middle, ...quickSort(right, compareFn)];
}
function mergeSort(arr, compareFn = defaultCompare) {
    if (arr.length <= 1) {
        return arr.slice();
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), compareFn);
    const right = mergeSort(arr.slice(mid), compareFn);
    return merge(left, right, compareFn);
}
function merge(left, right, compareFn) {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) <= 0) {
            result.push(left[i]);
            i++;
        }
        else {
            result.push(right[j]);
            j++;
        }
    }
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }
    return result;
}
function bubbleSort(arr, compareFn = defaultCompare) {
    const result = arr.slice();
    const n = result.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (compareFn(result[j], result[j + 1]) > 0) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    return result;
}
function insertionSort(arr, compareFn = defaultCompare) {
    const result = arr.slice();
    for (let i = 1; i < result.length; i++) {
        const key = result[i];
        let j = i;
        while (j > 0 && compareFn(result[j - 1], key) > 0) {
            result[j] = result[j - 1];
            j--;
        }
        result[j] = key;
    }
    return result;
}

function createGraph() {
    return new Map();
}
function addNode(graph, label) {
    if (!graph.has(label)) {
        graph.set(label, []);
    }
}
function addEdge(graph, from, to, weight) {
    addNode(graph, from);
    addNode(graph, to);
    const edges = graph.get(from);
    edges.push({ node: to, weight });
}
function dijkstra(graph, start) {
    const distances = new Map();
    const visited = new Set();
    const queue = [];
    for (const node of graph.keys()) {
        distances.set(node, null);
    }
    distances.set(start, 0);
    queue.push({ node: start, distance: 0 });
    while (queue.length > 0) {
        queue.sort((a, b) => a.distance - b.distance);
        const { node: current, distance: currentDist } = queue.shift();
        if (visited.has(current))
            continue;
        visited.add(current);
        const edges = graph.get(current) || [];
        for (const edge of edges) {
            if (visited.has(edge.node))
                continue;
            const newDist = currentDist + edge.weight;
            const existing = distances.get(edge.node);
            if (existing === null || newDist < existing) {
                distances.set(edge.node, newDist);
                queue.push({ node: edge.node, distance: newDist });
            }
        }
    }
    return distances;
}

const DARK_MODE_STORAGE_KEY = "tauri-front-dark-mode";
class ThemeService {
    _themeChanged$ = new BehaviorSubject({
        variant: getCurrentStyle(),
        isDark: this.loadDarkModePreference(),
    });
    themeChanged$ = this._themeChanged$.asObservable();
    constructor() {
        this.initializeDarkMode();
    }
    async loadTheme(variant) {
        await loadStyleVariant(variant);
        setCurrentStyle(variant);
        this.injectThemeStyles(variant);
        this._themeChanged$.next({
            variant,
            isDark: this.isDarkMode(),
        });
    }
    toggleDarkMode() {
        const html = document.documentElement;
        const isCurrentlyDark = html.classList.contains("dark");
        if (isCurrentlyDark) {
            html.classList.remove("dark");
        }
        else {
            html.classList.add("dark");
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
        }
        else {
            html.classList.remove("dark");
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
    injectThemeStyles(variant) {
        let existing = document.getElementById("theme-styles");
        if (existing) {
            existing.remove();
        }
        const style = document.createElement("style");
        style.id = "theme-styles";
        style.textContent = this.getDarkModeCSS(variant);
        document.head.appendChild(style);
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
            default:
                return "";
        }
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: ThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: "root" }]
        }], ctorParameters: () => [] });

class UiShowcaseComponent {
    themeService = inject(ThemeService$1);
    colorModes = ["light", "dark", "system"];
    styleVariants = getAllStyleVariants();
    currentColorMode = signal(this.themeService.effectiveColorMode(), ...(ngDevMode ? [{ debugName: "currentColorMode" }] : []));
    currentStyleVariant = signal(getCurrentStyle(), ...(ngDevMode ? [{ debugName: "currentStyleVariant" }] : []));
    searchQuery = signal("", ...(ngDevMode ? [{ debugName: "searchQuery" }] : []));
    selectedCategory = signal("all", ...(ngDevMode ? [{ debugName: "selectedCategory" }] : []));
    allComponents = [
        ...uiComponents,
        ...layoutComponents,
        ...feedbackComponents,
        ...dataComponents,
    ];
    categories = computed(() => {
        const cats = new Set(this.allComponents.map((c) => c.category));
        return ["all", ...Array.from(cats)];
    }, ...(ngDevMode ? [{ debugName: "categories" }] : []));
    filteredComponents = computed(() => {
        let result = this.allComponents;
        const cat = this.selectedCategory();
        const query = this.searchQuery().toLowerCase();
        if (cat !== "all") {
            result = result.filter((c) => c.category === cat);
        }
        if (query) {
            result = result.filter((c) => c.name.toLowerCase().includes(query) ||
                c.selector.toLowerCase().includes(query));
        }
        return result;
    }, ...(ngDevMode ? [{ debugName: "filteredComponents" }] : []));
    setColorMode(mode) {
        this.themeService.setMode(mode);
        this.currentColorMode.set(this.themeService.effectiveColorMode());
    }
    async setStyleVariant(variant) {
        await loadStyleVariant(variant);
        setCurrentStyle(variant);
        this.currentStyleVariant.set(variant);
    }
    getComponentDemoContent(comp) {
        switch (comp.id) {
            case "button":
                return "Button";
            case "badge":
                return "Badge";
            case "avatar":
                return "";
            case "chip":
                return "Chip";
            case "input":
                return "";
            case "checkbox":
                return "";
            case "radio":
                return "";
            case "tabs":
                return "";
            case "empty-state":
                return "";
            case "loading":
                return "";
            case "pagination":
                return "";
            case "tooltip":
                return "";
            case "progress-bar":
                return "";
            case "slider":
                return "";
            case "select":
                return "";
            case "switch":
                return "";
            case "card":
                return "";
            case "stats-card":
                return "";
            case "table-view":
                return "";
            case "data-table":
                return "";
            case "json-view":
                return "";
            case "segment-selector":
                return "";
            case "dialog":
                return "";
            case "confirm-dialog":
                return "";
            case "toast":
                return "";
            case "snackbar":
                return "";
            case "command-palette":
                return "";
            case "modal":
                return "";
            case "split-view":
                return "";
            case "page-container":
                return "";
            case "page-toolbar":
                return "";
            case "header":
                return "";
            case "sidebar":
                return "";
            case "footer":
                return "";
            case "main-editor":
                return "";
            case "bottom-panel":
                return "";
            case "designer-sidebar":
                return "";
            case "component-palette":
                return "";
            case "canvas":
                return "";
            case "canvas-toolbar":
                return "";
            default:
                return "";
        }
    }
    getComponentProps(comp) {
        const props = {};
        for (const p of comp.props) {
            switch (p.name) {
                case "variant":
                    if (p.options && p.options.length > 0) {
                        props[p.name] = p.options[0];
                    }
                    break;
                case "size":
                    if (p.options && p.options.length > 0) {
                        props[p.name] = p.options[0];
                    }
                    break;
                case "checked":
                    props[p.name] = false;
                    break;
                case "disabled":
                    props[p.name] = false;
                    break;
                case "title":
                    props[p.name] = comp.name;
                    break;
                case "label":
                    props[p.name] = comp.name;
                    break;
                case "text":
                    props[p.name] = comp.name;
                    break;
                case "placeholder":
                    props[p.name] = "Enter text...";
                    break;
                case "type":
                    props[p.name] = "text";
                    break;
                case "value":
                    props[p.name] = 50;
                    break;
                case "page":
                    props[p.name] = 1;
                    break;
                case "total":
                    props[p.name] = 10;
                    break;
                case "min":
                    props[p.name] = 0;
                    break;
                case "max":
                    props[p.name] = 100;
                    break;
                case "open":
                    props[p.name] = false;
                    break;
                case "options":
                    props[p.name] = '["Option 1", "Option 2"]';
                    break;
                case "tabs":
                    props[p.name] = '["Tab 1", "Tab 2"]';
                    break;
                case "columns":
                    props[p.name] = '["Name", "Status"]';
                    break;
                case "data":
                    props[p.name] = '[]';
                    break;
                case "src":
                    props[p.name] = "";
                    break;
                case "alt":
                    props[p.name] = "Avatar";
                    break;
                default:
                    if (p.default !== undefined) {
                        props[p.name] = p.default;
                    }
            }
        }
        return props;
    }
    setComponentProps(el, props) {
        for (const [key, value] of Object.entries(props)) {
            if (value !== undefined) {
                el[key] = value;
            }
        }
    }
    async renderComponent(card, comp) {
        const container = card.querySelector(".component-preview");
        if (!container)
            return;
        container.innerHTML = "";
        try {
            await customElements.whenDefined(comp.selector);
            const el = document.createElement(comp.selector);
            const props = this.getComponentProps(comp);
            this.setComponentProps(el, props);
            container.appendChild(el);
        }
        catch (e) {
            container.textContent = comp.selector;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: UiShowcaseComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.25", type: UiShowcaseComponent, isStandalone: true, selector: "app-ui-showcase", ngImport: i0, template: "<div class=\"showcase-container\">\n  <header class=\"showcase-header\">\n    <h1 class=\"showcase-title\">UI Showcase</h1>\n\n    <div class=\"showcase-controls\">\n      <div class=\"control-group\">\n        <span class=\"control-label\">Color Mode</span>\n        <div class=\"button-group\">\n          @for (mode of colorModes; track mode) {\n            <button\n              class=\"mode-btn\"\n              [class.active]=\"currentColorMode() === mode\"\n              (click)=\"setColorMode(mode)\"\n            >\n              {{ mode }}\n            </button>\n          }\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <span class=\"control-label\">Style</span>\n        <select\n          class=\"style-select\"\n          [value]=\"currentStyleVariant()\"\n          (change)=\"setStyleVariant($any($event.target).value)\"\n        >\n          @for (v of styleVariants; track v.id) {\n            <option [value]=\"v.id\">{{ v.name }}</option>\n          }\n        </select>\n      </div>\n    </div>\n  </header>\n\n  <div class=\"showcase-filters\">\n    <input\n      type=\"text\"\n      class=\"search-input\"\n      placeholder=\"Search components...\"\n      [value]=\"searchQuery()\"\n      (input)=\"searchQuery.set($any($event.target).value)\"\n    />\n\n    <div class=\"category-tabs\">\n      @for (cat of categories(); track cat) {\n        <button\n          class=\"category-tab\"\n          [class.active]=\"selectedCategory() === cat\"\n          (click)=\"selectedCategory.set(cat)\"\n        >\n          {{ cat }}\n        </button>\n      }\n    </div>\n  </div>\n\n  <div class=\"component-grid\">\n    @for (comp of filteredComponents(); track comp.id) {\n      <div class=\"component-card\">\n        <div class=\"card-header\">\n          <span class=\"component-name\">{{ comp.name }}</span>\n          <code class=\"component-selector\">{{ comp.selector }}</code>\n        </div>\n\n        <div\n          class=\"component-preview\"\n          #card\n          [attr.data-selector]=\"comp.selector\"\n          (mouseenter)=\"renderComponent($any($event.target).closest('.component-card'), comp)\"\n        ></div>\n\n        <div class=\"card-footer\">\n          <span class=\"category-badge\">{{ comp.category }}</span>\n          <span class=\"package-badge\">{{ comp.packageType }}</span>\n        </div>\n      </div>\n    }\n  </div>\n</div>", styles: [".showcase-container{min-height:100vh;background-color:var(--color-bg-primary, #f8fafc);color:var(--color-text-primary, #1e293b)}.showcase-header{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 2rem;background-color:var(--color-bg-elevated, #ffffff);border-bottom:1px solid var(--color-border, #e2e8f0);position:sticky;top:0;z-index:10;gap:2rem;flex-wrap:wrap}.showcase-title{margin:0;font-size:1.5rem;font-weight:700;color:var(--color-text-primary, #1e293b)}.showcase-controls{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}.control-group{display:flex;align-items:center;gap:.75rem}.control-label{font-size:.875rem;font-weight:500;color:var(--color-text-secondary, #64748b)}.button-group{display:flex;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;overflow:hidden}.mode-btn{padding:.5rem 1rem;border:none;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.mode-btn:not(:last-child){border-right:1px solid var(--color-border, #e2e8f0)}.mode-btn:hover{background-color:var(--color-bg-hover, #f1f5f9)}.mode-btn.active{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.style-select{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.875rem;font-weight:500;cursor:pointer;min-width:160px}.style-select:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.showcase-filters{padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1rem;background-color:var(--color-bg-secondary, #f1f5f9);border-bottom:1px solid var(--color-border, #e2e8f0)}.search-input{padding:.75rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.9375rem;max-width:400px}.search-input::placeholder{color:var(--color-text-muted, #94a3b8)}.search-input:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.category-tabs{display:flex;gap:.5rem;flex-wrap:wrap}.category-tab{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:2rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.category-tab:hover{background-color:var(--color-bg-hover, #f1f5f9)}.category-tab.active{background-color:var(--color-accent, #8b5cf6);border-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.component-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;padding:2rem}.component-card{background-color:var(--color-bg-elevated, #ffffff);border:1px solid var(--color-border, #e2e8f0);border-radius:.75rem;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .15s}.component-card:hover{box-shadow:0 4px 12px #0000001a}.card-header{display:flex;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid var(--color-border-light, #f1f5f9);gap:.5rem}.component-name{font-size:1rem;font-weight:600;color:var(--color-text-primary, #1e293b)}.component-selector{font-size:.75rem;padding:.25rem .5rem;background-color:var(--color-bg-secondary, #f1f5f9);border-radius:.25rem;color:var(--color-text-secondary, #64748b);font-family:monospace}.component-preview{padding:2rem 1rem;min-height:100px;display:flex;align-items:center;justify-content:center;background-color:var(--color-bg-primary, #f8fafc);flex-wrap:wrap;gap:.5rem}.card-footer{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-top:1px solid var(--color-border-light, #f1f5f9)}.category-badge,.package-badge{font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;font-weight:500;text-transform:capitalize}.category-badge{background-color:var(--color-bg-secondary, #f1f5f9);color:var(--color-text-secondary, #64748b)}.package-badge{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff);opacity:.8}@media(max-width:768px){.showcase-header{flex-direction:column;align-items:flex-start}.component-grid{grid-template-columns:1fr;padding:1rem}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.25", ngImport: i0, type: UiShowcaseComponent, decorators: [{
            type: Component,
            args: [{ selector: "app-ui-showcase", standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"showcase-container\">\n  <header class=\"showcase-header\">\n    <h1 class=\"showcase-title\">UI Showcase</h1>\n\n    <div class=\"showcase-controls\">\n      <div class=\"control-group\">\n        <span class=\"control-label\">Color Mode</span>\n        <div class=\"button-group\">\n          @for (mode of colorModes; track mode) {\n            <button\n              class=\"mode-btn\"\n              [class.active]=\"currentColorMode() === mode\"\n              (click)=\"setColorMode(mode)\"\n            >\n              {{ mode }}\n            </button>\n          }\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <span class=\"control-label\">Style</span>\n        <select\n          class=\"style-select\"\n          [value]=\"currentStyleVariant()\"\n          (change)=\"setStyleVariant($any($event.target).value)\"\n        >\n          @for (v of styleVariants; track v.id) {\n            <option [value]=\"v.id\">{{ v.name }}</option>\n          }\n        </select>\n      </div>\n    </div>\n  </header>\n\n  <div class=\"showcase-filters\">\n    <input\n      type=\"text\"\n      class=\"search-input\"\n      placeholder=\"Search components...\"\n      [value]=\"searchQuery()\"\n      (input)=\"searchQuery.set($any($event.target).value)\"\n    />\n\n    <div class=\"category-tabs\">\n      @for (cat of categories(); track cat) {\n        <button\n          class=\"category-tab\"\n          [class.active]=\"selectedCategory() === cat\"\n          (click)=\"selectedCategory.set(cat)\"\n        >\n          {{ cat }}\n        </button>\n      }\n    </div>\n  </div>\n\n  <div class=\"component-grid\">\n    @for (comp of filteredComponents(); track comp.id) {\n      <div class=\"component-card\">\n        <div class=\"card-header\">\n          <span class=\"component-name\">{{ comp.name }}</span>\n          <code class=\"component-selector\">{{ comp.selector }}</code>\n        </div>\n\n        <div\n          class=\"component-preview\"\n          #card\n          [attr.data-selector]=\"comp.selector\"\n          (mouseenter)=\"renderComponent($any($event.target).closest('.component-card'), comp)\"\n        ></div>\n\n        <div class=\"card-footer\">\n          <span class=\"category-badge\">{{ comp.category }}</span>\n          <span class=\"package-badge\">{{ comp.packageType }}</span>\n        </div>\n      </div>\n    }\n  </div>\n</div>", styles: [".showcase-container{min-height:100vh;background-color:var(--color-bg-primary, #f8fafc);color:var(--color-text-primary, #1e293b)}.showcase-header{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 2rem;background-color:var(--color-bg-elevated, #ffffff);border-bottom:1px solid var(--color-border, #e2e8f0);position:sticky;top:0;z-index:10;gap:2rem;flex-wrap:wrap}.showcase-title{margin:0;font-size:1.5rem;font-weight:700;color:var(--color-text-primary, #1e293b)}.showcase-controls{display:flex;align-items:center;gap:2rem;flex-wrap:wrap}.control-group{display:flex;align-items:center;gap:.75rem}.control-label{font-size:.875rem;font-weight:500;color:var(--color-text-secondary, #64748b)}.button-group{display:flex;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;overflow:hidden}.mode-btn{padding:.5rem 1rem;border:none;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.mode-btn:not(:last-child){border-right:1px solid var(--color-border, #e2e8f0)}.mode-btn:hover{background-color:var(--color-bg-hover, #f1f5f9)}.mode-btn.active{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.style-select{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.875rem;font-weight:500;cursor:pointer;min-width:160px}.style-select:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.showcase-filters{padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1rem;background-color:var(--color-bg-secondary, #f1f5f9);border-bottom:1px solid var(--color-border, #e2e8f0)}.search-input{padding:.75rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:.5rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-primary, #1e293b);font-size:.9375rem;max-width:400px}.search-input::placeholder{color:var(--color-text-muted, #94a3b8)}.search-input:focus{outline:none;border-color:var(--color-accent, #8b5cf6)}.category-tabs{display:flex;gap:.5rem;flex-wrap:wrap}.category-tab{padding:.5rem 1rem;border:1px solid var(--color-border, #e2e8f0);border-radius:2rem;background-color:var(--color-bg-elevated, #ffffff);color:var(--color-text-secondary, #64748b);font-size:.875rem;font-weight:500;cursor:pointer;transition:all .15s;text-transform:capitalize}.category-tab:hover{background-color:var(--color-bg-hover, #f1f5f9)}.category-tab.active{background-color:var(--color-accent, #8b5cf6);border-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff)}.component-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;padding:2rem}.component-card{background-color:var(--color-bg-elevated, #ffffff);border:1px solid var(--color-border, #e2e8f0);border-radius:.75rem;overflow:hidden;display:flex;flex-direction:column;transition:box-shadow .15s}.component-card:hover{box-shadow:0 4px 12px #0000001a}.card-header{display:flex;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid var(--color-border-light, #f1f5f9);gap:.5rem}.component-name{font-size:1rem;font-weight:600;color:var(--color-text-primary, #1e293b)}.component-selector{font-size:.75rem;padding:.25rem .5rem;background-color:var(--color-bg-secondary, #f1f5f9);border-radius:.25rem;color:var(--color-text-secondary, #64748b);font-family:monospace}.component-preview{padding:2rem 1rem;min-height:100px;display:flex;align-items:center;justify-content:center;background-color:var(--color-bg-primary, #f8fafc);flex-wrap:wrap;gap:.5rem}.card-footer{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem;border-top:1px solid var(--color-border-light, #f1f5f9)}.category-badge,.package-badge{font-size:.75rem;padding:.25rem .5rem;border-radius:.25rem;font-weight:500;text-transform:capitalize}.category-badge{background-color:var(--color-bg-secondary, #f1f5f9);color:var(--color-text-secondary, #64748b)}.package-badge{background-color:var(--color-accent, #8b5cf6);color:var(--color-text-on-accent, #ffffff);opacity:.8}@media(max-width:768px){.showcase-header{flex-direction:column;align-items:flex-start}.component-grid{grid-template-columns:1fr;padding:1rem}}\n"] }]
        }] });

// @tauri-front/shared - Unified shared library
// Explicit re-exports to avoid name collisions
// Disable Lit dev mode warnings and class field shadowing errors
// Must be set before Lit imports
const global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {};
Object.defineProperty(global, 'litDevMode', { value: false, writable: true, configurable: true });
// Suppress unhandled promise rejections from Lit class field warnings
if (typeof window !== 'undefined') {
    const originalHandler = window.onunhandledrejection;
    window.onunhandledrejection = (event) => {
        const reason = event?.reason;
        if (reason?.message?.includes('class fields') || reason?.message?.includes('Lit is in dev mode')) {
            event.preventDefault();
            return;
        }
        if (originalHandler)
            originalHandler(event);
    };
}

/**
 * Generated bundle index. Do not edit.
 */

export { ComponentRegistryService, CrudService, DataBindingResolverService, ErrorType, EventBusService, GlobalStateService, GuardService, I18nService, InvokeWrapperService, LayoutEngineService, ResponseStatus, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, ShortcutService, ThemeService as StyleThemeService, ThemeService$1 as ThemeService, UiShowcaseComponent, addEdge, addNode, bubbleSort, components, createGraph, dataComponents, dijkstra, feedbackComponents, formatError, getAllStyleVariants, getComponentStyleClasses, getCurrentStyle, getErrorMessage, getStyleClassPrefix, insertionSort, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, isError, isSuccess, layoutComponents, loadStyleVariant, mapResponse, mergeSort, parseError, quickSort, setCurrentStyle, uiComponents, unwrapResponse };
//# sourceMappingURL=tauri-front-shared.mjs.map
