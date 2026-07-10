import { Component, OnInit, signal, Type, inject, AfterViewInit, ComponentRef, ViewContainerRef, Input, ViewChild, ApplicationRef, OnChanges, SimpleChanges } from "@angular/core";
import { NgIf } from "@angular/common";
import { ShowcaseComponent } from "./showcase/showcase.component";
import {
  loadStyleVariant,
  setCurrentStyle,
  getAllStyleVariants,
  StyleThemeService,
  SCHEMA_COMPONENT_MAP,
  type StyleVariant,
} from "@tauri-front/shared";

interface ModalPropDef {
  key: string;
  label: string;
  type: "text" | "number" | "boolean" | "select";
  options?: string[];
  default: any;
}

const COMPONENT_PROPS: Record<string, ModalPropDef[]> = {
  "app-card": [
    { key: "title", label: "Title", type: "text", default: "Card Title" },
    {
      key: "description",
      label: "Description",
      type: "text",
      default: "Card description text",
    },
    {
      key: "variant",
      label: "Variant",
      type: "select",
      options: ["elevated", "outlined", "flat"],
      default: "elevated",
    },
  ],
  "app-button": [
    {
      key: "variant",
      label: "Variant",
      type: "select",
      options: ["filled", "outlined", "text"],
      default: "filled",
    },
    {
      key: "size",
      label: "Size",
      type: "select",
      options: ["sm", "md", "lg"],
      default: "md",
    },
  ],
  "app-input": [
    {
      key: "placeholder",
      label: "Placeholder",
      type: "text",
      default: "Enter text...",
    },
    { key: "value", label: "Value", type: "text", default: "Sample text" },
    { key: "label", label: "Label", type: "text", default: "Input Label" },
  ],
  "app-checkbox": [
    { key: "label", label: "Label", type: "text", default: "Checkbox label" },
    { key: "checked", label: "Checked", type: "boolean", default: false },
  ],
  "app-badge": [
    { key: "text", label: "Text", type: "text", default: "Badge" },
    {
      key: "variant",
      label: "Variant",
      type: "select",
      options: ["primary", "secondary", "success", "warning", "error"],
      default: "primary",
    },
  ],
  "app-avatar": [
    { key: "alt", label: "Alt text", type: "text", default: "User Avatar" },
    {
      key: "size",
      label: "Size",
      type: "select",
      options: ["sm", "md", "lg", "xl"],
      default: "lg",
    },
  ],
};

// Wrapper component that uses createComponent (NOT NgComponentOutlet) to properly
// propagate ElementRef/Injector to deeply nested sub-components (e.g. MatIcon inside Chip).
// NgComponentOutlet with injector input does NOT propagate ElementRef correctly.
@Component({
  selector: "app-modal-preview",
  standalone: true,
  imports: [NgIf],
  template: `
    <ng-container #dynamicHost></ng-container>
  `,
})
export class ModalPreviewComponent implements AfterViewInit, OnChanges {
  // Use ApplicationRef.injector for proper ElementRef propagation to deeply nested
  // sub-components. Component-level injector does not work correctly.
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = this.appRef.injector;
  @Input() componentType: Type<any> | null = null;
  @Input() props: Record<string, any> = {};

  @ViewChild("dynamicHost", { read: ViewContainerRef })
  private dynamicHost!: ViewContainerRef;
  private componentRef: ComponentRef<any> | null = null;

  ngAfterViewInit() {
    this.createDynamicComponent();
  }

  ngOnChanges(_changes: SimpleChanges) {
    // Re-create component when inputs change (after view is initialized)
    if (this.dynamicHost) {
      this.createDynamicComponent();
    }
  }

  private createDynamicComponent() {
    if (!this.dynamicHost) return;

    // Destroy previous component
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    if (!this.componentType) return;

    // Angular 20: set inputs directly on component instance after creation
    this.componentRef = this.dynamicHost.createComponent(this.componentType, {
      injector: this.injector,
    });

    // Set inputs directly on instance - must be done before detectChanges
    const instance = this.componentRef.instance;
    if (this.props) {
      Object.entries(this.props).forEach(([key, value]) => {
        (instance as any)[key] = value;
      });
    }

    this.componentRef.changeDetectorRef.detectChanges();
  }
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ShowcaseComponent, ModalPreviewComponent],
  template: `
    <div class="shell">
      <header class="header">
        <span class="header-title">&#64;tauri-front/shared Showcase</span>
        <div class="header-group">
          <span class="group-label">Theme</span>
          <div class="btn-group">
            <button
              class="theme-btn"
              [class.active]="currentMode() === 'light'"
              (click)="setColorMode('light')"
            >
              Light
            </button>
            <button
              class="theme-btn"
              [class.active]="currentMode() === 'dark'"
              (click)="setColorMode('dark')"
            >
              Dark
            </button>
            <button
              class="theme-btn"
              [class.active]="currentMode() === 'system'"
              (click)="setColorMode('system')"
            >
              System
            </button>
          </div>
          <span class="divider"></span>
          <span class="group-label">Style</span>
          <div class="btn-group">
            @for (variant of styleVariants; track variant.id) {
              <button
                class="style-btn"
                [class.active]="currentVariant() === variant.id"
                (click)="setStyleVariant(variant.id)"
              >
                {{ variant.name }}
              </button>
            }
          </div>
        </div>
      </header>
      <main class="main">
        <app-showcase (componentSelected)="openModal($event)"></app-showcase>
      </main>
    </div>

    @if (selectedComponent()) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <span class="modal-title">{{ selectedComponent() }}</span>
            <button class="modal-close" (click)="closeModal()">×</button>
          </div>
          <div class="modal-body">
            <div class="split-panel">
              <div class="preview-pane">
                <app-modal-preview
                  [componentType]="selectedComponentType()"
                  [props]="currentProps()"
                >
                </app-modal-preview>
              </div>
              <div class="properties-pane">
                <h4 class="props-title">Properties</h4>
                @for (prop of getComponentProps(); track prop.key) {
                  <div class="prop-row">
                    <label class="prop-label">{{ prop.label }}</label>
                    @if (prop.type === "text") {
                      <input
                        type="text"
                        class="prop-input"
                        [value]="getPropValue(prop.key)"
                        (input)="
                          updateProp(prop.key, $any($event.target).value)
                        "
                      />
                    } @else if (prop.type === "number") {
                      <input
                        type="number"
                        class="prop-input"
                        [value]="getPropValue(prop.key)"
                        (input)="
                          updateProp(prop.key, +$any($event.target).value)
                        "
                      />
                    } @else if (prop.type === "boolean") {
                      <input
                        type="checkbox"
                        class="prop-checkbox"
                        [checked]="getPropValue(prop.key)"
                        (change)="
                          updateProp(prop.key, $any($event.target).checked)
                        "
                      />
                    } @else if (prop.type === "select") {
                      <select
                        class="prop-select"
                        [value]="getPropValue(prop.key)"
                        (change)="
                          updateProp(prop.key, $any($event.target).value)
                        "
                      >
                        @for (opt of prop.options; track opt) {
                          <option [value]="opt">{{ opt }}</option>
                        }
                      </select>
                    }
                  </div>
                }
              </div>
            </div>
            <!-- Properties editor -->
            <div class="props-panel">
              <h4 class="props-panel-title">Properties</h4>

              <div class="prop-row">
                <label class="prop-label">variant</label>
                <select
                  class="prop-input"
                  [value]="getCurrentVariant()"
                  (change)="onVariantChange($event)"
                >
                  <option value="solid">solid</option>
                  <option value="outlined">outlined</option>
                  <option value="text">text</option>
                  <option value="tonal">tonal</option>
                </select>
              </div>

              <div class="prop-row">
                <label class="prop-label">size</label>
                <select
                  class="prop-input"
                  [value]="getCurrentSize()"
                  (change)="onSizeChange($event)"
                >
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                </select>
              </div>

              <div class="prop-row">
                <label class="prop-label">
                  <input type="checkbox" (change)="onDisabledChange($event)" />
                  disabled
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
      .shell {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
        background: var(--bg-primary, #f8f9fa);
        color: var(--text-primary, #1a1a1a);
      }
      .header {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.625rem 1.5rem;
        background: var(--bg-elevated, #ffffff);
        border-bottom: 1px solid var(--border-color, #e5e7eb);
        min-height: 52px;
        flex-shrink: 0;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .header-title {
        font-size: 0.9375rem;
        font-weight: 700;
        color: var(--text-primary, #1a1a1a);
        letter-spacing: -0.01em;
      }
      .header-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .group-label {
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--text-muted, #9ca3af);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-right: 0.25rem;
      }
      .divider {
        width: 1px;
        height: 20px;
        background: var(--border-color, #e5e7eb);
        margin: 0 0.25rem;
      }
      .btn-group {
        display: flex;
        align-items: center;
        gap: 0.125rem;
      }
      .theme-btn,
      .style-btn {
        padding: 0.3125rem 0.625rem;
        border-radius: 0.3125rem;
        border: 1px solid var(--border-color, #e5e7eb);
        background: transparent;
        color: var(--text-secondary, #6b7280);
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
      }
      .theme-btn:hover,
      .style-btn:hover {
        background: var(--bg-hover, #f3f4f6);
        color: var(--text-primary, #1a1a1a);
      }
      .theme-btn.active {
        background: #7c3aed;
        border-color: #7c3aed;
        color: #ffffff;
      }
      .style-btn.active {
        background: var(--accent, #3b82f6);
        border-color: var(--accent, #3b82f6);
        color: #ffffff;
      }
      .main {
        flex: 1;
        overflow: visible;
      }
      /* Modal overlay */
      .modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(4px);
      }
      .modal-content {
        background: var(--bg-elevated, #ffffff);
        border-radius: 1rem;
        padding: 2rem;
        max-width: 800px;
        width: 90%;
        max-height: 80vh;
        overflow: auto;
        position: relative;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
      }
      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
      }
      .modal-title {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--text-primary);
      }
      .modal-close {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 1px solid var(--border-color, #e5e7eb);
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: var(--text-secondary);
      }
      .modal-close:hover {
        background: var(--bg-hover, #f3f4f6);
      }
      .modal-body {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 120px;
      }
      /* Split panel */
      .split-panel {
        display: flex;
        gap: 2rem;
        width: 100%;
      }
      .preview-pane {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        background: var(--bg-primary, #f8f9fa);
        border-radius: 0.5rem;
        padding: 1rem;
      }
      .properties-pane {
        width: 240px;
        flex-shrink: 0;
      }
      .props-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 1rem 0;
      }
      .prop-row {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-bottom: 0.75rem;
      }
      .prop-label {
        font-size: 0.75rem;
        color: var(--text-secondary);
      }
      .prop-input,
      .prop-select {
        padding: 0.375rem 0.5rem;
        border: 1px solid var(--border-color, #e5e7eb);
        border-radius: 0.25rem;
        font-size: 0.8125rem;
        background: var(--bg-primary, #ffffff);
        color: var(--text-primary, #1a1a1a);
      }
      .prop-checkbox {
        width: 1rem;
        height: 1rem;
      }
      .props-panel {
        border-top: 1px solid var(--border-color, #e5e7eb);
        padding: 1rem;
        background: var(--bg-elevated, #f9fafb);
        margin-top: 1rem;
        border-radius: 0.5rem;
      }
      .props-panel-title {
        font-size: 0.875rem;
        font-weight: 600;
        margin: 0 0 0.75rem 0;
        color: var(--text-secondary, #6b7280);
      }
      .props-panel .prop-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .props-panel .prop-label {
        font-size: 0.75rem;
        min-width: 60px;
        color: var(--text-secondary, #6b7280);
      }
      .props-panel .prop-input {
        flex: 1;
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--border-color, #e5e7eb);
        border-radius: 0.25rem;
        font-size: 0.75rem;
        background: white;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  readonly currentMode = signal<string>("light");
  readonly currentVariant = signal<StyleVariant>("material-design-v3");
  readonly styleVariants = getAllStyleVariants();
  readonly selectedComponent = signal<string | null>(null);
  readonly selectedComponentType = signal<Type<any> | null>(null);
  readonly currentProps = signal<Record<string, any>>({});

  themeService: StyleThemeService;

  constructor() {
    this.themeService = new StyleThemeService();
  }

  async ngOnInit() {
    await loadStyleVariant("material-design-v3");
    setCurrentStyle("material-design-v3");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    this.themeService.setDarkMode(prefersDark);
    this.currentMode.set(prefersDark ? "dark" : "light");
    this.currentVariant.set("material-design-v3" as StyleVariant);
  }

  openModal(selector: string) {
    this.selectedComponent.set(selector);
    // Get component type from registry
    const componentType = SCHEMA_COMPONENT_MAP.get(selector) || null;
    this.selectedComponentType.set(componentType);
    // Initialize props for this component
    this.currentProps.set(this.getDefaultProps(selector));
  }

  closeModal() {
    this.selectedComponent.set(null);
    this.selectedComponentType.set(null);
    this.currentProps.set({});
  }

  private getDefaultProps(selector: string): Record<string, any> {
    const props = COMPONENT_PROPS[selector];
    if (!props) return {};
    return props.reduce((acc, p) => ({ ...acc, [p.key]: p.default }), {});
  }

  getComponentProps(): ModalPropDef[] {
    const selector = this.selectedComponent();
    return selector ? COMPONENT_PROPS[selector] || [] : [];
  }

  getPropValue(key: string): any {
    return this.currentProps()[key];
  }

  updateProp(key: string, value: any) {
    const props = { ...this.currentProps(), [key]: value };
    this.currentProps.set(props);
  }

  getCurrentVariant(): string {
    const props = this.currentProps();
    return (props?.["variant"] as string) || "solid";
  }

  getCurrentSize(): string {
    const props = this.currentProps();
    return (props?.["size"] as string) || "md";
  }

  onVariantChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const props = { ...this.currentProps(), variant: value };
    this.currentProps.set(props);
  }

  onSizeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const props = { ...this.currentProps(), size: value };
    this.currentProps.set(props);
  }

  onDisabledChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const props = { ...this.currentProps(), disabled: checked };
    this.currentProps.set(props);
  }

  setColorMode(mode: string) {
    if (mode === "dark") {
      this.themeService.setDarkMode(true);
    } else if (mode === "light") {
      this.themeService.setDarkMode(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      this.themeService.setDarkMode(prefersDark);
    }
    this.currentMode.set(mode);
  }

  async setStyleVariant(variant: StyleVariant) {
    await loadStyleVariant(variant);
    setCurrentStyle(variant);
    this.currentVariant.set(variant);
    // Re-inject dark mode if currently in dark mode
    if (this.themeService.isDarkMode()) {
      this.themeService.setDarkMode(true);
    }
  }

}
