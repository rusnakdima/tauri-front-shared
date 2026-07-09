import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export interface PaletteCategory {
  name: string;
  components: string[];
}

@Component({
  selector: "app-component-palette",
  standalone: true,
  template: `
    <div class="palette-header">
      <div class="palette-title">Components</div>
      @if (searchable) {
        <input
          type="text"
          class="search-input"
          placeholder="Search components..."
          [value]="searchQuery"
          (input)="onSearch($event)"
        />
      }
    </div>
    <div class="palette-content">
      @for (cat of filteredCategories; track cat.name) {
        <div class="category">
          <div class="category-header" (click)="toggleCategory(cat.name)">
            <span>{{ cat.name }}</span>
            <span
              class="category-arrow"
              [class.collapsed]="isCollapsed(cat.name)"
              >▼</span
            >
          </div>
          <div class="category-items" [class.collapsed]="isCollapsed(cat.name)">
            @for (comp of cat.components; track comp) {
              <div class="component-item" draggable="true">{{ comp }}</div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
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
    `,
  ],
})
export class ComponentPaletteComponent {
  @Input() categories: string | PaletteCategory[] = "[]";
  @Input() searchable = false;

  searchQuery = "";
  collapsedCategories = new Set<string>();

  get parsedCategories(): PaletteCategory[] {
    if (Array.isArray(this.categories)) return this.categories;
    try {
      return JSON.parse(this.categories);
    } catch {
      return [];
    }
  }

  get filteredCategories(): PaletteCategory[] {
    if (!this.searchQuery) return this.parsedCategories;
    return this.parsedCategories
      .map((cat) => ({
        ...cat,
        components: cat.components.filter((c) =>
          c.toLowerCase().includes(this.searchQuery.toLowerCase()),
        ),
      }))
      .filter((cat) => cat.components.length > 0);
  }

  toggleCategory(name: string) {
    if (this.collapsedCategories.has(name)) {
      this.collapsedCategories.delete(name);
    } else {
      this.collapsedCategories.add(name);
    }
  }

  isCollapsed(name: string): boolean {
    return this.collapsedCategories.has(name);
  }

  onSearch(e: Event) {
    this.searchQuery = (e.target as HTMLInputElement).value;
  }
}

registerSchemaComponent("app-component-palette", ComponentPaletteComponent);
