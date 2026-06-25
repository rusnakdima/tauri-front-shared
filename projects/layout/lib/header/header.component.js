import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let LayoutHeader = class LayoutHeader extends LitElement {
    constructor() {
        super(...arguments);
        this.title = "";
        this.breadcrumbs = [];
        this.showThemeToggle = false;
        this.showCanvasControls = false;
        this.showForkButton = false;
    }
    static { this.styles = css `
    :host {
      display: block;
    }

    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 3.5rem;
      padding: 0 1rem;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
    }

    button:hover {
      background: var(--bg-hover);
    }

    .app-header-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .app-header-breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
    }

    .app-header-breadcrumb-home {
      color: var(--text-muted);
      transition: color 0.15s;
      text-decoration: none;
      font-size: 1rem;
    }

    .app-header-breadcrumb-home:hover {
      color: var(--text-primary);
    }

    .app-header-breadcrumb-separator {
      color: var(--text-muted);
    }

    .app-header-breadcrumb-link {
      color: var(--text-secondary);
      transition: color 0.15s;
      text-decoration: none;
    }

    .app-header-breadcrumb-link:hover {
      color: var(--text-primary);
    }

    .app-header-breadcrumb-current {
      color: var(--text-primary);
      font-weight: 500;
    }

    .app-header-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .app-header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .app-header-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      color: var(--text-secondary);
      transition: background-color 0.15s ease, color 0.15s ease;
    }

    .app-header-btn:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }

    mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  `; }
    _handleHomeClick(e) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("home-click", {
            bubbles: true,
            composed: true,
        }));
    }
    _handleBreadcrumbClick(e, link) {
        if (!link) {
            e.preventDefault();
        }
    }
    _emit(name) {
        this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
    }
    render() {
        return html `
      <header class="app-header">
        <div class="app-header-left">
          ${this.breadcrumbs.length > 0
            ? html `
                <nav class="app-header-breadcrumbs">
                  <a
                    href="/"
                    class="app-header-breadcrumb-home material-icons"
                    @click="${this._handleHomeClick}"
                    >home</a
                  >
                  ${this.breadcrumbs.map((crumb, index) => html `
                      <span class="app-header-breadcrumb-separator">/</span>
                      ${crumb.link && index < this.breadcrumbs.length - 1
                ? html `
                            <a
                              href="${crumb.link}"
                              class="app-header-breadcrumb-link"
                              @click="${(e) => this._handleBreadcrumbClick(e, crumb.link)}"
                              >${crumb.label}</a
                            >
                          `
                : html `<span class="app-header-breadcrumb-current"
                            >${crumb.label}</span
                          >`}
                    `)}
                </nav>
              `
            : ""}
          ${this.title
            ? html `<h1 class="app-header-title">${this.title}</h1>`
            : ""}
        </div>
        <slot name="toolbar"></slot>
        <div class="app-header-actions">
          ${this.showThemeToggle
            ? html `
                <button
                  class="app-header-btn"
                  @click="${() => this._emit("theme-toggle")}"
                  title="Toggle theme"
                >
                  <mat-icon>dark_mode</mat-icon>
                </button>
              `
            : ""}
          ${this.showForkButton
            ? html `
                <button
                  class="app-header-btn"
                  @click="${() => this._emit("fork-click")}"
                  title="Fork"
                >
                  <mat-icon>fork_right</mat-icon>
                </button>
              `
            : ""}
          <slot name="actions"></slot>
        </div>
      </header>
    `;
    }
};
__decorate([
    property({ type: String })
], LayoutHeader.prototype, "title", void 0);
__decorate([
    property({ type: Array })
], LayoutHeader.prototype, "breadcrumbs", void 0);
__decorate([
    property({ type: Boolean })
], LayoutHeader.prototype, "showThemeToggle", void 0);
__decorate([
    property({ type: Boolean })
], LayoutHeader.prototype, "showCanvasControls", void 0);
__decorate([
    property({ type: Boolean })
], LayoutHeader.prototype, "showForkButton", void 0);
LayoutHeader = __decorate([
    customElement("app-header")
], LayoutHeader);
export { LayoutHeader };
//# sourceMappingURL=header.component.js.map