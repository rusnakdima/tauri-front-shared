import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-designer-sidebar")
export class DesignerSidebar extends LitElement {
  @property({ type: String }) position: "left" | "right" = "left";
  @property({ type: Boolean }) collapsed = false;
  @property({ type: String }) header = "";

  static override styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .designer-sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--bg-secondary, #1a1a2e);
      border-right: 1px solid var(--border-color, #0f3460);
      transition: width 0.2s ease;
      overflow: hidden;
    }

    :host([position="right"]) .designer-sidebar {
      border-right: none;
      border-left: 1px solid var(--border-color, #0f3460);
    }

    .designer-sidebar.collapsed {
      width: 64px;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border-color, #0f3460);
      min-height: 48px;
    }

    .sidebar-header-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary, #e0e0e0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 4px;
      color: var(--text-secondary, #a0a0a0);
      cursor: pointer;
      transition: all 0.15s;
      flex-shrink: 0;
    }

    .sidebar-toggle:hover {
      background: var(--bg-hover, #1e3a5f);
      color: var(--text-primary, #e0e0e0);
    }

    .sidebar-content {
      flex: 1;
      overflow: auto;
      min-height: 0;
    }

    .sidebar-footer {
      padding: 0.75rem 1rem;
      border-top: 1px solid var(--border-color, #0f3460);
    }
  `;

  override render() {
    return html`
      <aside class="designer-sidebar ${this.collapsed ? "collapsed" : ""}">
        <div class="sidebar-header">
          ${!this.collapsed ? html`<span class="sidebar-header-title">${this.header}</span>` : ""}
          <button class="sidebar-toggle" @click=${this._toggleCollapse}>
            ${this.collapsed ? "▶" : "◀"}
          </button>
        </div>
        <div class="sidebar-content">
          <slot name="content"></slot>
        </div>
        <div class="sidebar-footer">
          <slot name="footer"></slot>
        </div>
      </aside>
    `;
  }

  private _toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      new CustomEvent("collapsed-change", {
        detail: this.collapsed,
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-designer-sidebar": DesignerSidebar;
  }
}
