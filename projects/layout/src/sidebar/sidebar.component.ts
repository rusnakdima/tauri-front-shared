import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  link?: string;
  disabled?: boolean;
}

@customElement("app-sidebar")
export class LayoutSidebar extends LitElement {
  @property({ type: Array }) items: SidebarItem[] = [];
  @property({ type: Boolean }) collapsed: boolean = false;
  @property({ type: String }) active: string = "";

  @state() private _collapsed: boolean = false;

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("collapsed")) {
      this._collapsed = this.collapsed;
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this._collapsed = this.collapsed;
  }

  private _toggleCollapse() {
    this._collapsed = !this._collapsed;
    this.dispatchEvent(
      new CustomEvent("collapsed-change", {
        detail: this._collapsed,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onItemClick(item: SidebarItem) {
    if (!item.disabled) {
      this.dispatchEvent(
        new CustomEvent("item-click", {
          detail: item,
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  private _isActive(item: SidebarItem): boolean {
    return item.id === this.active;
  }

  static override styles = css`
    :host {
      display: block;
    }

    .app-sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      transition: width 0.2s;
      width: 240px;
    }

    .app-sidebar-collapsed {
      width: 64px;
    }

    .app-sidebar-header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0.5rem;
      border-bottom: 1px solid var(--border-subtle);
    }

    .app-sidebar-toggle {
      padding: 0.5rem;
      border-radius: 0.375rem;
      color: var(--text-secondary);
      transition:
        background-color 0.15s,
        color 0.15s;
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 1.25rem;
    }

    .app-sidebar-toggle:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .app-sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem;
    }

    .app-sidebar-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      color: var(--text-secondary);
      transition:
        background-color 0.15s,
        color 0.15s;
      border: none;
      background: transparent;
      cursor: pointer;
      width: 100%;
      text-align: left;
    }

    .app-sidebar-item:hover:not(.app-sidebar-item-disabled) {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    .app-sidebar-item-active {
      background: var(--accent-100);
      color: var(--accent);
    }

    .app-sidebar-item-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .app-sidebar-item-icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .app-sidebar-collapsed .app-sidebar-item {
      justify-content: center;
      padding: 0.5rem;
    }

    .app-sidebar-item-label {
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;

  override render() {
    return html`
      <aside
        class="app-sidebar ${this._collapsed ? "app-sidebar-collapsed" : ""}"
      >
        <div class="app-sidebar-header">
          <button
            class="app-sidebar-toggle material-icons"
            @click="${this._toggleCollapse}"
          >
            ${this._collapsed ? "menu" : "menu_open"}
          </button>
        </div>
        <nav class="app-sidebar-nav">
          ${this.items.map(
            (item) => html`
              <button
                class="app-sidebar-item ${this._isActive(item)
                  ? "app-sidebar-item-active"
                  : ""} ${item.disabled ? "app-sidebar-item-disabled" : ""}"
                @click="${() => this._onItemClick(item)}"
              >
                ${item.icon
                  ? html`<span class="material-icons app-sidebar-item-icon"
                      >${item.icon}</span
                    >`
                  : ""}
                ${!this._collapsed
                  ? html`<span class="app-sidebar-item-label"
                      >${item.label}</span
                    >`
                  : ""}
              </button>
            `,
          )}
        </nav>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "layout-sidebar": LayoutSidebar;
  }
}
