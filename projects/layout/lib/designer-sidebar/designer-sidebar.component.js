import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let DesignerSidebar = class DesignerSidebar extends LitElement {
    constructor() {
        super();
        for (const key of ["position", "collapsed", "header"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["position", "collapsed", "header"]) {
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
    static { this.styles = css `
    :host {
      display: block;
      height: 100%;
    }

    .sidebar-wrapper {
      position: relative;
      height: 100%;
      display: flex;
    }

    .sidebar-toggle-container {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 48px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      transition: all var(--transition-fast, 150ms);
    }

    .sidebar-toggle-container:hover {
      background: var(--bg-hover);
    }

    :host([position="left"]) .sidebar-toggle-container {
      right: -12px;
    }

    :host([position="right"]) .sidebar-toggle-container {
      left: -12px;
      right: auto;
    }

    .sidebar-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 28px;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 4px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast, 150ms);
    }

    .sidebar-toggle:hover {
      color: var(--text-primary);
    }

    .designer-sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      transition:
        width var(--transition-normal, 200ms) ease,
        opacity var(--transition-normal, 200ms) ease;
      overflow: hidden;
      flex-shrink: 0;
    }

    :host([position="right"]) .designer-sidebar {
      border-right: none;
      border-left: 1px solid var(--border-color);
    }

    .designer-sidebar.collapsed {
      width: 0;
      visibility: hidden;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border-color);
      min-height: 48px;
      background: var(--bg-secondary);
      flex-shrink: 0;
    }

    :host([position="right"]) .sidebar-header {
      flex-direction: row-reverse;
    }

    .sidebar-header-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-content {
      flex: 1;
      overflow: auto;
      min-height: 0;
    }

    .sidebar-footer {
      padding: 0.75rem 1rem;
      border-top: 1px solid var(--border-color);
      flex-shrink: 0;
    }
  `; }
    render() {
        return html `
      <div class="sidebar-wrapper">
        <aside class="designer-sidebar ${this.collapsed ? "collapsed" : ""}">
          <div class="sidebar-header">
            <span class="sidebar-header-title">${this.header}</span>
          </div>
          <div class="sidebar-content">
            <slot name="content"></slot>
          </div>
          <div class="sidebar-footer">
            <slot name="footer"></slot>
          </div>
        </aside>
        <div class="sidebar-toggle-container">
          <button class="sidebar-toggle" @click=${this._toggleCollapse}>
            ${this.collapsed
            ? this.position === "left"
                ? "▶"
                : "◀"
            : this.position === "left"
                ? "◀"
                : "▶"}
          </button>
        </div>
      </div>
    `;
    }
    _toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.dispatchEvent(new CustomEvent("collapsed-change", {
            detail: this.collapsed,
            bubbles: true,
            composed: true,
        }));
    }
};
__decorate([
    property({ type: String })
], DesignerSidebar.prototype, "position", void 0);
__decorate([
    property({ type: Boolean })
], DesignerSidebar.prototype, "collapsed", void 0);
__decorate([
    property({ type: String })
], DesignerSidebar.prototype, "header", void 0);
DesignerSidebar = __decorate([
    customElement("app-designer-sidebar")
], DesignerSidebar);
export { DesignerSidebar };
//# sourceMappingURL=designer-sidebar.component.js.map