import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface PaletteComponent {
  id: string;
  name: string;
  selector: string;
  icon?: string;
  category: string;
  packageType: string;
}

@customElement("app-component-palette")
export class ComponentPalette extends LitElement {
  @property({ type: Array }) components: PaletteComponent[] = [];
  @property({ type: String }) selectedCategory = "all";
  @property({ type: Boolean }) searchable = true;

  private _searchQuery = "";

  static override styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .palette-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0.5rem;
    }

    .palette-search {
      margin-bottom: 0.5rem;
    }

    .palette-search input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      color: var(--text-primary);
      font-size: 0.8125rem;
      outline: none;
      transition: border-color 0.15s;
    }

    .palette-search input:focus {
      border-color: var(--accent);
    }

    .palette-search input::placeholder {
      color: var(--text-muted);
    }

    .palette-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      margin-bottom: 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .category-btn {
      padding: 0.25rem 0.5rem;
      background: transparent;
      border: none;
      border-radius: 4px;
      color: var(--text-secondary);
      font-size: 0.6875rem;
      cursor: pointer;
      transition: all 0.15s;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .category-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .category-btn.active {
      background: var(--accent);
      color: white;
    }

    .palette-items {
      flex: 1;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      align-content: start;
    }

    .palette-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.75rem 0.5rem;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      cursor: grab;
      transition: all 0.15s;
      min-width: 0;
    }

    .palette-item:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(233, 69, 96, 0.15);
    }

    .palette-item:active {
      cursor: grabbing;
      transform: translateY(0);
    }

    .palette-item-icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      margin-bottom: 0.375rem;
      color: var(--accent, #e94560);
    }

    .palette-item-name {
      font-size: 0.6875rem;
      color: var(--text-primary);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .palette-item-selector {
      font-size: 0.5625rem;
      color: var(--text-muted);
      font-family: monospace;
      margin-top: 0.125rem;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 2rem 1rem;
      text-align: center;
    }

    .empty-icon {
      font-size: 2rem;
      opacity: 0.3;
      margin-bottom: 0.5rem;
    }

    .empty-text {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }
  `;

  private get _categories(): string[] {
    const cats = new Set<string>(["all"]);
    this.components.forEach((c) => cats.add(c.category));
    return Array.from(cats);
  }

  private get _filteredComponents(): PaletteComponent[] {
    let filtered = this.components;

    if (this.selectedCategory !== "all") {
      filtered = filtered.filter((c) => c.category === this.selectedCategory);
    }

    if (this._searchQuery) {
      const query = this._searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.selector.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  override render() {
    const filtered = this._filteredComponents;
    const categories = this._categories;

    return html`
      <div class="palette-container">
        ${this.searchable
          ? html`
              <div class="palette-search">
                <input
                  type="text"
                  placeholder="Search components..."
                  .value=${this._searchQuery}
                  @input=${this._onSearchInput}
                />
              </div>
            `
          : ""}

        <div class="palette-categories">
          ${categories.map(
            (cat) => html`
              <button
                class="category-btn ${this.selectedCategory === cat ? "active" : ""}"
                @click=${() => this._selectCategory(cat)}
              >
                ${cat}
              </button>
            `
          )}
        </div>

        ${filtered.length === 0
          ? html`
              <div class="empty-state">
                <div class="empty-icon">⊡</div>
                <div class="empty-text">No components found</div>
              </div>
            `
          : html`
              <div class="palette-items">
                ${filtered.map(
                  (comp) => html`
                    <div
                      class="palette-item"
                      draggable="true"
                      @dragstart=${(e: DragEvent) => this._onDragStart(e, comp)}
                      @click=${() => this._onComponentClick(comp)}
                    >
                      <div class="palette-item-icon">
                        ${comp.icon || "⊡"}
                      </div>
                      <div class="palette-item-name">${comp.name}</div>
                      <div class="palette-item-selector">${comp.selector}</div>
                    </div>
                  `
                )}
              </div>
            `}
      </div>
    `;
  }

  private _onSearchInput(e: Event) {
    this._searchQuery = (e.target as HTMLInputElement).value;
  }

  private _selectCategory(category: string) {
    this.selectedCategory = category;
    this.dispatchEvent(
      new CustomEvent("category-change", {
        detail: { category },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onDragStart(e: DragEvent, comp: PaletteComponent) {
    e.dataTransfer?.setData("application/json", JSON.stringify(comp));
    this.dispatchEvent(
      new CustomEvent("component-drag-start", {
        detail: { component: comp },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onComponentClick(comp: PaletteComponent) {
    this.dispatchEvent(
      new CustomEvent("component-select", {
        detail: { component: comp },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-component-palette": ComponentPalette;
  }
}
