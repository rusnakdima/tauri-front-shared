import { Component, signal, computed, OnInit, inject, Type } from "@angular/core";
import { NgComponentOutlet } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  SCHEMA_COMPONENT_MAP,
  loadStyleVariant,
  getAllStyleVariants,
  StyleThemeService,
  type StyleVariant,
} from "@tauri-front/shared";

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
  "app-button": { className: "ui-btn ui-btn-primary", content: "Click Me", type: "button" },
  "app-card": { className: "ui-card ui-p-4", content: "Card", type: "card" },
  "app-input": { className: "ui-text-input", content: "Enter text...", type: "input" },
  "app-textarea": { className: "ui-textarea", content: "Enter description...", type: "input" },
  "app-badge": { className: "ui-badge ui-badge-primary", content: "NEW", type: "badge" },
  "app-chip": { className: "ui-chip", content: "Design", type: "chip" },
  "app-avatar": { className: "ui-avatar", content: "JS", type: "avatar" },
  "app-checkbox": { className: "ui-checkbox", content: "Remember me", type: "checkbox" },
  "app-switch": { className: "ui-switch", content: "ON", type: "toggle" },
  "app-slider": { className: "ui-slider", content: "50%", type: "text" },
  "app-tabs": { className: "ui-tabs", content: "Tab", type: "tabs" },
  "app-progress-bar": { className: "ui-progress-bar", content: "65%", type: "progress" },
  "app-divider": { className: "ui-divider", content: "", type: "divider" },
  "app-loading": { className: "ui-spinner", content: "", type: "spinner" },
  "app-spinner": { className: "ui-spinner", content: "", type: "spinner" },
};

interface ShowcaseComponentDef {
  id: string;
  name: string;
  selector: string;
  category: string;
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NgComponentOutlet, FormsModule],
  template: `
    <!-- Theme switcher bar -->
    <div class="theme-bar">
      <span class="theme-bar-title">@tauri-front/shared UI Showcase</span>
      <div class="theme-buttons">
        @for (variant of allVariants; track variant.id) {
          <button
            class="theme-btn"
            [class.active]="currentVariant() === variant.id"
            (click)="switchTheme(variant.id)"
          >{{ getVariantLabel(variant.id) }}</button>
        }
        <button class="theme-btn dark-toggle" (click)="toggleDark()">
          {{ isDark() ? '☀️ Light' : '🌙 Dark' }}
        </button>
      </div>
    </div>

    <!-- Component showcase grid -->
    <div class="showcase-container">
      <div class="showcase-filters">
        <input
          type="text"
          class="search-input"
          placeholder="Search components..."
          [value]="searchQuery()"
          (input)="searchQuery.set($any($event.target).value)"
        />
        <span class="component-count">{{ filteredComponents().length }} components</span>
      </div>
      <div class="component-grid">
        @for (comp of filteredComponents(); track comp.id) {
          <div class="component-card">
            <div class="card-header">
              <span class="component-name">{{ comp.name }}</span>
              <code class="component-selector">{{ comp.selector }}</code>
            </div>
            <div class="component-preview" [class]="'preview-' + getPreviewType(comp.selector)">
              @if (getComponentType(comp.selector); as compType) {
                <ng-container
                  *ngComponentOutlet="compType; inputs: getDefaultProps(comp.selector)"
                ></ng-container>
              } @else {
                <span class="preview-fallback">{{ comp.name }}</span>
              }
            </div>
            <div class="card-footer">
              <span class="category-badge">{{ comp.category }}</span>
            </div>
          </div>
        }
      </div>
      @if (filteredComponents().length === 0) {
        <div class="empty-state">
          <p>No components match "{{ searchQuery() }}"</p>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--sdui-surface-bg, #f5f5f5);
      color: var(--sdui-text-primary, #1a1a1a);
    }
    .theme-bar {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1.5rem;
      background: var(--sdui-surface-bg, #fff);
      border-bottom: 1px solid var(--sdui-surface-border, #e5e7eb);
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .theme-bar-title {
      font-weight: 700;
      font-size: 0.9375rem;
      color: var(--sdui-text-primary, #1a1a1a);
      white-space: nowrap;
    }
    .theme-buttons {
      display: flex;
      gap: 0.375rem;
      flex-wrap: wrap;
    }
    .theme-btn {
      padding: 0.3125rem 0.75rem;
      border-radius: 999px;
      border: 1.5px solid var(--sdui-surface-border, #e5e7eb);
      background: transparent;
      color: var(--sdui-text-secondary, #6b7280);
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }
    .theme-btn:hover {
      border-color: var(--sdui-accent, #6750a4);
      color: var(--sdui-accent, #6750a4);
    }
    .theme-btn.active {
      background: var(--sdui-accent, #6750a4);
      border-color: var(--sdui-accent, #6750a4);
      color: #fff;
    }
    .dark-toggle {
      margin-left: 0.5rem;
      border-style: dashed;
    }
    .showcase-container {
      padding: 1.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    .showcase-filters {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .search-input {
      padding: 0.5rem 0.875rem;
      border-radius: 0.5rem;
      border: 1.5px solid var(--sdui-surface-border, #e5e7eb);
      background: var(--sdui-surface-bg, #fff);
      color: var(--sdui-text-primary, #1a1a1a);
      font-size: 0.875rem;
      min-width: 240px;
      outline: none;
      transition: border-color 0.15s;
    }
    .search-input:focus {
      border-color: var(--sdui-accent, #6750a4);
    }
    .component-count {
      font-size: 0.8125rem;
      color: var(--sdui-text-muted, #9ca3af);
    }
    .component-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1rem;
    }
    .component-card {
      display: flex;
      flex-direction: column;
      border: 1.5px solid var(--sdui-surface-border, #e5e7eb);
      border-radius: 0.75rem;
      background: var(--sdui-surface-bg, #fff);
      overflow: hidden;
      transition: box-shadow 0.15s, border-color 0.15s;
    }
    .component-card:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      border-color: var(--sdui-accent, #6750a4);
    }
    .card-header {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--sdui-surface-border, #e5e7eb);
      background: var(--sdui-surface-bg, #fafafa);
    }
    .component-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--sdui-text-primary, #1a1a1a);
    }
    .component-selector {
      font-size: 0.6875rem;
      color: var(--sdui-text-muted, #9ca3af);
      font-family: ui-monospace, monospace;
    }
    .component-preview {
      min-height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: var(--sdui-surface-bg, #fff);
    }
    .card-footer {
      padding: 0.5rem 1rem;
      border-top: 1px solid var(--sdui-surface-border, #e5e7eb);
      background: var(--sdui-surface-bg, #fafafa);
    }
    .category-badge {
      font-size: 0.6875rem;
      padding: 0.125rem 0.5rem;
      border-radius: 999px;
      background: var(--sdui-surface-border, #e5e7eb);
      color: var(--sdui-text-secondary, #6b7280);
    }
    .preview-fallback {
      font-size: 0.75rem;
      color: var(--sdui-text-muted, #9ca3af);
    }
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--sdui-text-muted, #9ca3af);
    }
    /* Component-level overrides */
    .preview-button { width: 100%; }
    .preview-input { width: 100%; max-width: 180px; }
    .preview-card { width: 100%; max-width: 200px; text-align: left; }
    .preview-tabs { display: flex; gap: 0.25rem; }
    .preview-progress { width: 100%; max-width: 180px; }
    .preview-spinner { width: 24px; height: 24px; }
  `],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(StyleThemeService);

  searchQuery = signal("");
  currentVariant = signal<StyleVariant>("material-design-v3");
  isDark = signal(false);

  allVariants = getAllStyleVariants();

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

  async ngOnInit() {
    await loadStyleVariant("material-design-v3");
  }

  async switchTheme(variant: StyleVariant) {
    await loadStyleVariant(variant);
    this.currentVariant.set(variant);
  }

  async toggleDark() {
    const newDark = !this.isDark();
    this.themeService.setDarkMode(newDark);
    this.isDark.set(newDark);
  }

  getVariantLabel(variant: string): string {
    const labels: Record<string, string> = {
      "material-design-v3": "M3",
      glassmorphism: "Glass",
      neumorphism: "Neu",
      claymorphism: "Clay",
      brutalism: "Brut",
      skeuomorphism: "Skeu",
    };
    return labels[variant] ?? variant;
  }

  getPreviewType(selector: string): string {
    const config = PREVIEW_CONFIG[selector];
    return config ? config.type : "text";
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
}

function formatName(selector: string): string {
  return selector
    .replace("app-", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getCategory(selector: string): string {
  const s = selector.replace("app-", "");
  const ui = ["button","input","textarea","select","checkbox","radio","slider","switch","chip","badge","menu-button"];
  const layout = ["header","footer","sidebar","page-container","page-toolbar","split-view","bottom-panel","block","text","row","column","stack"];
  const data = ["table","data-table","table-view","tree","stats-card","progress-bar","json-view","segment-selector"];
  const feedback = ["toast","snackbar","tooltip","loading","spinner","dialog","empty-state","divider"];
  if (ui.includes(s)) return "UI";
  if (layout.includes(s)) return "Layout";
  if (data.includes(s)) return "Data";
  if (feedback.includes(s)) return "Feedback";
  if (s.includes("nav")) return "Navigation";
  if (s.includes("editor") || s.includes("designer") || s.includes("palette") || s.includes("canvas")) return "Designer";
  if (s.includes("language") || s.includes("swap") || s.includes("text-input") || s.includes("translation") || s.includes("theme") || s.includes("shortcuts") || s.includes("locale")) return "App";
  return "Other";
}
