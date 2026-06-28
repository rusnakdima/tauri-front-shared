import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export interface PaletteCategory {
  name: string;
  components: string[];
}

@customElement("app-component-palette")
export class AppComponentPalette extends LitElement {
  @property() declare categories: string;
  @property({ type: Boolean }) declare searchable: boolean;
  constructor() {
    super();
    for (const key of ["categories", "searchable", "_searchQuery", "_collapsedCategories"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
    if (!this._searchQuery) (this as any)._searchQuery = "";
    if (!this._collapsedCategories) (this as any)._collapsedCategories = new Set();
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["categories", "searchable"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        saved[key] = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
      }
    }
    super.connectedCallback();
    for (const [key, value] of Object.entries(saved)) {
      (this as Record<string, unknown>)[key] = value;
    }
  }


  @state() private declare _searchQuery: string;
  @state() private declare _collapsedCategories: Set<string>;

  private _getCategories(): PaletteCategory[] {
    try {
      return JSON.parse(this.categories);
    } catch {
      return [];
    }
  }

  private _toggleCategory(name: string) {
    if (this._collapsedCategories.has(name)) {
      this._collapsedCategories.delete(name);
    } else {
      this._collapsedCategories.add(name);
    }
    this.requestUpdate();
  }

  private _filterComponents(components: string[]): string[] {
    if (!this._searchQuery) return components;
    return components.filter((c) =>
      c.toLowerCase().includes(this._searchQuery.toLowerCase()),
    );
  }

  static override styles = css`
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

  override render() {
    const categories = this._getCategories();

    return html`
      <div class="palette-header">
        <div class="palette-title">Components</div>
        ${this.searchable
          ? html`
              <input
                type="text"
                class="search-input"
                placeholder="Search components..."
                .value="${this._searchQuery}"
                @input="${(e: Event) => {
                  this._searchQuery = (e.target as HTMLInputElement).value;
                }}"
              />
            `
          : ""}
      </div>
      <div class="palette-content">
        ${categories.map(
          (cat) => html`
            <div class="category">
              <div
                class="category-header"
                @click="${() => this._toggleCategory(cat.name)}"
              >
                <span>${cat.name}</span>
                <span
                  class="category-arrow ${this._collapsedCategories.has(
                    cat.name,
                  )
                    ? "collapsed"
                    : ""}"
                >▼</span>
              </div>
              <div
                class="category-items ${this._collapsedCategories.has(cat.name)
                  ? "collapsed"
                  : ""}"
              >
                ${this._filterComponents(cat.components).map(
                  (comp) => html`
                    <div class="component-item" draggable="true">${comp}</div>
                  `,
                )}
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-component-palette": AppComponentPalette;
  }
}