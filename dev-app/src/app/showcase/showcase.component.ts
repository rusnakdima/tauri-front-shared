import { Component, AfterViewInit, signal, computed, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  uiComponents,
  layoutComponents,
  feedbackComponents,
  dataComponents,
  getAllStyleVariants,
} from "@tauri-front/shared";

@Component({
  selector: "app-showcase",
  standalone: true,
  imports: [FormsModule],
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
          <div class="component-card">
            <div class="card-header">
              <span class="component-name">{{ comp.name }}</span>
              <code class="component-selector">{{ comp.selector }}</code>
            </div>
            <div
              class="component-preview"
              [attr.data-selector]="comp.selector"
              (click)="openPreview(comp.selector)"
            ></div>
            <div class="card-footer">
              <span class="category-badge">{{ comp.category }}</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .showcase-container { padding: 1.5rem; }
    .showcase-filters { margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .search-input {
      padding: 0.5rem 0.875rem; border-radius: 0.5rem;
      border: 1px solid var(--border-color, #e5e7eb);
      background: var(--bg-elevated, #ffffff);
      color: var(--text-primary, #1a1a1a);
      font-size: 0.875rem; min-width: 240px; outline: none;
    }
    .search-input:focus { border-color: var(--accent, #3b82f6); }
    .component-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1rem;
    }
    .component-card {
      display: flex; flex-direction: column;
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: 0.75rem;
      background: var(--bg-elevated, #ffffff);
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow 0.15s;
    }
    .component-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .card-header {
      display: flex; flex-direction: column; gap: 0.25rem;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border-color, #e5e7eb);
      background: var(--bg-secondary, #f9fafb);
    }
    .component-name { font-size: 0.875rem; font-weight: 600; color: var(--text-primary, #1a1a1a); }
    .component-selector { font-size: 0.6875rem; color: var(--text-muted, #9ca3af); font-family: monospace; }
    .component-preview {
      display: flex; align-items: center; justify-content: center;
      min-height: 80px; padding: 1rem;
      background: var(--bg-primary, #f8f9fa);
      color: var(--text-primary, #1a1a1a);
    }
    .card-footer {
      display: flex; align-items: center; gap: 0.375rem;
      padding: 0.5rem 1rem; border-top: 1px solid var(--border-color, #e5e7eb);
    }
    .category-badge {
      font-size: 0.6875rem; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-weight: 500;
      background: var(--bg-tertiary, #f3f4f6); color: var(--text-secondary, #6b7280); text-transform: capitalize;
    }
  `],
})
export class ShowcaseComponent implements AfterViewInit {
  readonly styleVariants = getAllStyleVariants();
  @Output() componentSelected = new EventEmitter<string>();

  protected categories = signal<Record<string, any[]>>({});
  readonly searchQuery = signal("");
  readonly selectedCategory = signal("all");

  // Deduplicate by id — tooltip/snackbar appear in multiple source arrays
  readonly allComponents = [
    ...uiComponents,
    ...layoutComponents,
    ...feedbackComponents,
    ...dataComponents,
  ].reduce((acc, comp) => {
    if (!acc.find((c: any) => c.id === comp.id)) acc.push(comp);
    return acc;
  }, [] as any[]);

  readonly filteredComponents = computed(() => {
    const components = this.allComponents;
    if (!components) return [];
    const query = this.searchQuery().toLowerCase();
    if (!query) return components;
    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query) ||
        (c.category && c.category.toLowerCase().includes(query))
    );
  });

  async ngAfterViewInit() {
    // Defer to next tick so Angular finishes rendering the @for loop
    setTimeout(() => this.renderAllComponents(), 0);
  }

  private async renderAllComponents() {
    const previews = document.querySelectorAll(
      ".component-preview[data-selector]"
    ) as NodeListOf<HTMLElement>;

    for (const preview of previews) {
      const selector = preview.getAttribute("data-selector");
      if (!selector || preview.children.length > 0) continue;
      // Skip if not a registered custom element (whenDefined hangs for unregistered tags)
      if (!customElements.get(selector)) continue;
      try {
        await Promise.race([
          customElements.whenDefined(selector),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 500)
          ),
        ]);
        const el = document.createElement(selector);
        this.setDefaultProps(el, selector);
        preview.appendChild(el);
      } catch { /* ignore */ }
    }
  }

  openPreview(selector: string) {
    this.componentSelected.emit(selector);
  }

  private setDefaultProps(el: HTMLElement, selector: string) {
    // Common props for all components
    const tag = selector.replace("app-", "");
    switch (tag) {
      case "avatar":
        (el as any).alt = "User";
        (el as any).size = "md";
        break;
      case "badge":
        (el as any).variant = "primary";
        (el as any).text = "Label";
        break;
      case "button":
        (el as any).variant = "filled";
        (el as any).text = "Button";
        break;
      case "card":
        (el as any).title = "Card Title";
        break;
      case "checkbox":
        (el as any).label = "Checkbox";
        break;
      case "chip":
        (el as any).text = "Chip";
        break;
      case "input":
        (el as any).placeholder = "Enter text...";
        break;
      case "textarea":
        (el as any).placeholder = "Enter text...";
        break;
      case "select":
      case "app-select":
        (el as any).placeholder = "Select...";
        break;
      case "slider":
        (el as any).value = 50;
        break;
      case "switch":
        (el as any).checked = false;
        break;
      case "radio":
        (el as any).label = "Radio";
        break;
      case "tabs":
        (el as any).tabs = JSON.stringify([{"label":"Tab 1"},{"label":"Tab 2"}]);
        break;
      case "progress-bar":
      case "progressbar":
        (el as any).value = 60;
        break;
      case "loading":
      case "spinner":
        (el as any).size = "md";
        break;
      case "tooltip":
        (el as any).text = "Tooltip";
        break;
      case "empty-state":
        (el as any).title = "No Data";
        (el as any).description = "Nothing to show here.";
        break;
      case "stats-card":
        (el as any).title = "Stat";
        (el as any).value = "42";
        break;
      case "json-view":
        (el as any).data = JSON.stringify({"key":"value"});
        break;
      case "data-table":
      case "datatable":
        (el as any).columns = JSON.stringify(["Name","Status"]);
        (el as any).data = JSON.stringify([["Item 1","Active"],["Item 2","Inactive"]]);
        break;
      case "segment-selector":
      case "segmentselector":
        (el as any).options = JSON.stringify(["Option 1","Option 2"]);
        break;
      case "pagination":
        (el as any).page = 1;
        (el as any).total = 10;
        break;
      case "dialog":
      case "modal":
        (el as any).open = false;
        break;
      case "confirm-dialog":
        (el as any).open = false;
        break;
      case "snackbar":
        (el as any).message = "Snackbar message";
        (el as any).type = "info";
        (el as any).open = false;
        break;
      case "toast":
        (el as any).type = "info";
        (el as any).message = "Notification";
        break;
      case "bottom-panel":
        (el as any).tabs = JSON.stringify([{"label":"Tab 1"},{"label":"Tab 2"}]);
        break;
      case "component-palette":
        (el as any).categories = JSON.stringify([{"name":"Forms","components":["Input","Select"]}]);
        break;
      case "icon":
        (el as any).name = "translate";
        break;
      case "header":
        (el as any).title = "Page Title";
        break;
      case "footer":
        (el as any).text = "© 2026 tauri-front-shared";
        break;
      case "sidebar":
        (el as any).items = JSON.stringify([{"id":"home","label":"Home"},{"id":"settings","label":"Settings"}]);
        break;
      case "page-container":
        (el as any).title = "Page Container";
        break;
      case "page-toolbar":
        (el as any).title = "Toolbar";
        (el as any).actions = JSON.stringify([{"label":"Add"},{"label":"Delete"}]);
        break;
      case "split-view":
        // split-view requires slot content
        break;
      case "properties-panel":
        (el as any).element = "app-button";
        break;
      case "canvas":
        (el as any).gridColumns = 12;
        (el as any).showGrid = true;
        break;
      case "divider":
        (el as any).orientation = "horizontal";
        (el as any).spacing = "md";
        break;
      case "tree":
        (el as any).nodes = JSON.stringify([{"id":"root","label":"Root","children":[{"id":"child1","label":"Child 1"},{"id":"child2","label":"Child 2"}]}]);
        break;
      case "form":
        (el as any).heading = "Form";
        break;
      case "text-input":
        (el as any).placeholder = "Type to translate...";
        break;
      case "translation-output":
        (el as any).text = "Translation result";
        break;
      case "swap-button":
        (el as any).label = "⇄";
        break;
      case "theme-toggle":
        // auto-renders toggle
        break;
      case "language-selector":
        (el as any).languages = JSON.stringify([{"code":"en","name":"English"},{"code":"es","name":"Spanish"}]);
        break;
      case "shortcuts-overlay":
        (el as any).shortcuts = JSON.stringify([{"key":"Ctrl+K","description":"Command palette"}]);
        break;
      case "table-view":
        (el as any).columns = JSON.stringify(["Name","Status"]);
        (el as any).data = JSON.stringify([["Alice","Active"],["Bob","Inactive"]]);
        break;
      default:
        break;
    }
  }
}
