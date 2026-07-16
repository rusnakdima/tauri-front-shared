import {
  Component,
  signal,
  computed,
  Output,
  EventEmitter,
  OnInit,
  Type,
  ApplicationRef,
  inject,
} from "@angular/core";
import { NgComponentOutlet } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SCHEMA_COMPONENT_MAP, loadStyleVariant } from "@tauri-front/shared";

// Static list of known component selectors — only components that call registerSchemaComponent()
const KNOWN_COMPONENTS = [
  // UI Components
  "app-avatar",
  "app-badge",
  "app-button",
  "app-card",
  "app-checkbox",
  "app-chip",
  "app-input",
  "app-textarea",
  "app-select",
  "app-slider",
  "app-switch",
  "app-radio",
  "app-tabs",
  "app-progress-bar",
  "app-loading",
  "app-spinner",
  "app-tooltip",
  "app-snackbar",
  "app-divider",
  // Data / Layout Components
  "app-tree",
  "app-form",
  "app-dialog",
  "app-json-view",
  "app-stats-card",
  "app-empty-state",
  "app-segment-selector",
  "app-data-table",
  "app-table-view",
  "app-bottom-panel",
  "app-header",
  "app-footer",
  "app-sidebar",
  "app-page-container",
  "app-page-toolbar",
  "app-split-view",
  // Designer Components
  "app-component-palette",
  "app-canvas",
  "app-properties-panel",
  "app-canvas-toolbar",
  "app-designer-sidebar",
  "app-designer-tree",
  "app-main-editor",
  "app-command-palette",
  // Navigation
  "app-nav-item",
  "app-nav-group",
  // App / Translator Components
  "app-language-selector",
  "app-swap-button",
  "app-text-input",
  "app-translation-output",
  "app-theme-toggle",
  "app-shortcuts-overlay",
  // Layout Primitives
  "app-block",
  "app-text",
  "app-locale-switcher",
  "app-menu-button",
  "app-row",
  "app-column",
  "app-stack",
  // Icon
  "app-icon",
];

export interface ShowcaseComponentDef {
  id: string;
  name: string;
  selector: string;
  category: string;
}

// Preview configuration for each component type
interface PreviewConfig {
  className: string;
  content: string;
  type:
    | "button"
    | "input"
    | "card"
    | "badge"
    | "chip"
    | "avatar"
    | "checkbox"
    | "toggle"
    | "text"
    | "tabs"
    | "progress"
    | "divider"
    | "spinner";
}

const PREVIEW_CONFIG: Record<string, PreviewConfig> = {
  "app-button": { className: "glass-btn", content: "Click Me", type: "button" },
  "app-card": { className: "glass-card", content: "Card", type: "card" },
  "app-input": {
    className: "glass-input",
    content: "Enter text...",
    type: "input",
  },
  "app-textarea": {
    className: "glass-input",
    content: "Enter description...",
    type: "input",
  },
  "app-badge": { className: "glass-badge", content: "NEW", type: "badge" },
  "app-chip": { className: "glass-chip", content: "Design", type: "chip" },
  "app-avatar": { className: "glass-avatar", content: "JS", type: "avatar" },
  "app-checkbox": {
    className: "glass-checkbox",
    content: "Remember me",
    type: "checkbox",
  },
  "app-switch": { className: "glass-toggle", content: "ON", type: "toggle" },
  "app-slider": { className: "glass-slider", content: "50%", type: "text" },
  "app-tabs": { className: "glass-tabs", content: "Tab", type: "tabs" },
  "app-progress-bar": {
    className: "glass-progress",
    content: "65%",
    type: "progress",
  },
  "app-divider": { className: "glass-divider", content: "", type: "divider" },
  "app-loading": { className: "glass-spinner", content: "", type: "spinner" },
  "app-spinner": { className: "glass-spinner", content: "", type: "spinner" },
};

@Component({
  selector: "app-showcase",
  standalone: true,
  imports: [FormsModule, NgComponentOutlet],
  template: `
    <div class="showcase-container">
      <div class="showcase-filters">
        <input
          type="text"
          class="search-input"
          placeholder="Search components..."
          [value]="searchQuery()"
          (input)="searchQuery.set($any($event.target).value)"
        />
      </div>
      <div class="component-grid">
        @for (comp of filteredComponents(); track comp.id) {
          <div class="component-card" (click)="openPreview(comp.selector)">
            <div class="card-header">
              <span class="component-name">{{ comp.name }}</span>
              <code class="component-selector">{{ comp.selector }}</code>
            </div>
            <div class="component-preview">
              <div
                class="preview-wrapper"
                [class]="'preview-' + getPreviewType(comp.selector)"
              >
                @if (getComponentType(comp.selector); as compType) {
                  <ng-container
                    *ngComponentOutlet="
                      compType;
                      inputs: getDefaultProps(comp.selector);
                      injector: myInjector
                    "
                  ></ng-container>
                }
              </div>
            </div>
            <div class="card-footer">
              <span class="category-badge">{{ comp.category }}</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .showcase-container {
        padding: 1.5rem;
      }
      .showcase-filters {
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .search-input {
        padding: 0.5rem 0.875rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color, #e5e7eb);
        background: var(--bg-elevated, #ffffff);
        color: var(--text-primary, #1a1a1a);
        font-size: 0.875rem;
        min-width: 240px;
        outline: none;
      }
      .search-input:focus {
        border-color: var(--accent, #3b82f6);
      }
      .component-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1rem;
      }
      .component-card {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--border-color, #e5e7eb);
        border-radius: 0.75rem;
        background: var(--bg-elevated, #ffffff);
        overflow: hidden;
        cursor: pointer;
        transition: box-shadow 0.15s;
      }
      .component-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .card-header {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--border-color, #e5e7eb);
        background: var(--bg-secondary, #f9fafb);
      }
      .component-name {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-primary, #1a1a1a);
      }
      .component-selector {
        font-size: 0.6875rem;
        color: var(--text-muted, #9ca3af);
        font-family: monospace;
      }
      .component-preview {
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: var(--bg-primary, #f9fafb);
      }
      .card-footer {
        padding: 0.5rem 1rem;
        border-top: 1px solid var(--border-color, #e5e7eb);
        background: var(--bg-secondary, #f9fafb);
      }
      .category-badge {
        font-size: 0.6875rem;
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        background: var(--bg-primary, #e5e7eb);
        color: var(--text-secondary, #6b7280);
      }
      /* Preview element styles */
      .preview-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .preview-btn {
        padding: 0.5rem 1rem;
        font-size: 0.8125rem;
        cursor: pointer;
      }
      .preview-input {
        width: 100%;
        max-width: 180px;
        padding: 0.5rem 0.75rem;
        font-size: 0.8125rem;
      }
      .preview-card {
        width: 100%;
        max-width: 200px;
        padding: 0.75rem;
        text-align: left;
      }
      .preview-card-title {
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .preview-card-desc {
        font-size: 0.75rem;
        opacity: 0.8;
      }
      .preview-badge {
        padding: 0.25rem 0.5rem;
        font-size: 0.6875rem;
        font-weight: 600;
      }
      .preview-chip {
        padding: 0.25rem 0.625rem;
        font-size: 0.6875rem;
        font-weight: 500;
      }
      .preview-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        font-weight: 700;
      }
      .preview-checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }
      .preview-checkbox input {
        display: none;
      }
      .preview-label {
        font-size: 0.75rem;
      }
      .preview-toggle {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .glass-toggle {
        width: 36px;
        height: 20px;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
      }
      .glass-toggle::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: white;
        transition: transform 0.2s;
      }
      .glass-toggle.active::after {
        transform: translateX(16px);
      }
      .preview-toggle-label {
        font-size: 0.75rem;
      }
      .preview-tabs {
        display: flex;
        gap: 0.25rem;
      }
      .preview-tab {
        padding: 0.375rem 0.75rem;
        font-size: 0.6875rem;
        cursor: pointer;
      }
      .preview-progress {
        width: 100%;
        max-width: 180px;
        height: 8px;
        border-radius: 4px;
        overflow: hidden;
      }
      .glass-progress-bar {
        height: 100%;
        background: var(--accent, #6d5dfc);
      }
      .glass-divider {
        width: 100%;
        height: 1px;
        background: var(--border-color, rgba(255, 255, 255, 0.3));
      }
      .preview-spinner {
        width: 24px;
        height: 24px;
        border: 3px solid var(--border-color, rgba(255, 255, 255, 0.2));
        border-top-color: var(--accent, #6d5dfc);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .preview-generic {
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
      }
    `,
  ],
})
export class ShowcaseComponent implements OnInit {
  @Output() componentSelected = new EventEmitter<string>();

  readonly currentVariant = signal<string>("material-design-v3");

  // Use ApplicationRef.injector instead of component's Injector to properly
  // propagate ElementRef to deeply nested sub-components (e.g. MatIcon).
  // NgComponentOutlet with component-level injector does NOT propagate ElementRef correctly.
  private readonly appRef = inject(ApplicationRef);
  readonly myInjector = this.appRef.injector;

  searchQuery = signal("");

  async ngOnInit() {
    await loadStyleVariant("material-design-v3");
    this.currentVariant.set("material-design-v3");
  }

  // Build component list from SCHEMA_COMPONENT_MAP keys
  private allComponents: ShowcaseComponentDef[] = KNOWN_COMPONENTS.filter(
    (selector) => SCHEMA_COMPONENT_MAP.has(selector),
  ).map((selector) => ({
    id: selector.replace("app-", ""),
    name: formatName(selector),
    selector,
    category: getCategory(selector),
  }));

  filteredComponents = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.allComponents;
    return this.allComponents.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query),
    );
  });

  getPreviewType(selector: string): string {
    const config = PREVIEW_CONFIG[selector];
    return config ? config.type : "text";
  }

  getPreviewContent(selector: string): string {
    const config = PREVIEW_CONFIG[selector];
    return config ? config.content : selector.replace("app-", "");
  }

  getPreviewClass(selector: string): string {
    const config = PREVIEW_CONFIG[selector];
    return config ? config.className : "glass-surface";
  }

  getComponentType(selector: string): Type<any> | null {
    return SCHEMA_COMPONENT_MAP.get(selector) || null;
  }

  getDefaultProps(selector: string): Record<string, unknown> {
    const defaults: Record<string, Record<string, unknown>> = {
      // UI Components
      "app-button": { variant: "solid", label: "Submit" },
      "app-card": { title: "Dashboard", subtitle: "Welcome back, User" },
      "app-input": { placeholder: "Enter text...", label: "Input" },
      "app-textarea": { placeholder: "Enter description...", label: "Textarea" },
      "app-badge": { label: "NEW", variant: "primary" },
      "app-chip": { label: "Design", removable: false },
      "app-avatar": { name: "User", size: "md" },
      "app-checkbox": { label: "Remember me", checked: false },
      "app-switch": { checked: false, label: "Toggle" },
      "app-slider": { value: 50, min: 0, max: 100 },
      "app-tabs": { tabs: ["Tab A", "Tab B", "Tab C"] },
      "app-progress-bar": { value: 65, max: 100 },
      "app-spinner": { size: "md" },
      "app-divider": {},
      "app-select": { placeholder: "Select...", options: ["Option A", "Option B", "Option C"] },
      "app-tooltip": { content: "Tooltip text" },
      "app-snackbar": { message: "Item saved", action: "Undo" },
      // Data / Layout Components
      "app-tree": { nodes: [{ id: "1", label: "Root", expanded: true, children: [{ id: "2", label: "Child 1" }, { id: "3", label: "Child 2" }] }] },
      "app-form": { heading: "Contact Form", submitText: "Submit", cancelText: "Cancel" },
      "app-dialog": { open: false, title: "Dialog Title" },
      "app-json-view": { data: { name: "example", value: 42, active: true } },
      "app-stats-card": { label: "Revenue", value: "$12,450" },
      "app-empty-state": { title: "No Data", message: "There is no data to display" },
      "app-segment-selector": { options: ["Day", "Week", "Month"], selected: "Week" },
      "app-data-table": { columns: [], data: [] },
      "app-table-view": {},
      "app-bottom-panel": {},
      "app-header": { title: "App Title", subtitle: "Subtitle" },
      "app-footer": { text: "© 2026 My App" },
      "app-sidebar": { collapsed: false, items: [] },
      "app-page-container": { title: "Page Title", padding: 24 },
      "app-page-toolbar": {},
      "app-split-view": { direction: "horizontal", split: 50 },
      // Designer Components
      "app-component-palette": { searchable: false },
      "app-canvas": {},
      "app-properties-panel": {},
      "app-canvas-toolbar": { zoomLevel: 100, showGrid: true },
      "app-designer-sidebar": {},
      "app-designer-tree": {},
      "app-main-editor": {},
      "app-command-palette": { placeholder: "Search commands..." },
      // Navigation
      "app-nav-item": { label: "Home", icon: "home" },
      "app-nav-group": { label: "Settings" },
      // App / Translator Components
      "app-language-selector": { placeholder: "Select language" },
      "app-swap-button": { ariaLabel: "Swap languages" },
      "app-text-input": { placeholder: "Type translation...", multiline: true, rows: 3 },
      "app-translation-output": { value: "Translated text appears here", placeholder: "Output" },
      "app-theme-toggle": {},
      "app-shortcuts-overlay": { visible: false },
      // Layout Primitives
      "app-block": { display: "flex", direction: "column", padding: "16px" },
      "app-text": { content: "Sample text content", size: "md" },
      "app-locale-switcher": { size: "sm" },
      "app-menu-button": { isOpen: false },
      "app-row": {},
      "app-column": {},
      "app-stack": {},
      // Icon
      "app-icon": { name: "star" },
      // Loading (uses size input)
      "app-loading": { size: "md" },
    };
    return defaults[selector] || {};
  }

  openPreview(selector: string) {
    this.componentSelected.emit(selector);
  }
}

function formatName(selector: string): string {
  return selector
    .replace("app-", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getCategory(selector: string): string {
  const s = selector.replace("app-", "");
  const ui = [
    "button",
    "input",
    "textarea",
    "select",
    "checkbox",
    "radio",
    "slider",
    "switch",
    "chip",
    "badge",
    "menu-button",
  ];
  const layout = [
    "header",
    "footer",
    "sidebar",
    "page-container",
    "page-toolbar",
    "split-view",
    "bottom-panel",
    "block",
    "text",
    "row",
    "column",
    "stack",
  ];
  const data = [
    "table",
    "data-table",
    "table-view",
    "tree",
    "stats-card",
    "progress-bar",
    "json-view",
    "segment-selector",
  ];
  const feedback = [
    "snackbar",
    "tooltip",
    "loading",
    "spinner",
    "dialog",
    "empty-state",
    "divider",
  ];

  if (ui.includes(s)) return "UI";
  if (layout.includes(s)) return "Layout";
  if (data.includes(s)) return "Data";
  if (feedback.includes(s)) return "Feedback";
  if (s.includes("nav")) return "Navigation";
  if (
    s.includes("editor") ||
    s.includes("designer") ||
    s.includes("palette") ||
    s.includes("canvas")
  )
    return "Designer";
  if (
    s.includes("language") ||
    s.includes("swap") ||
    s.includes("text-input") ||
    s.includes("translation") ||
    s.includes("theme") ||
    s.includes("shortcuts") ||
    s.includes("locale")
  )
    return "App";
  return "Other";
}
