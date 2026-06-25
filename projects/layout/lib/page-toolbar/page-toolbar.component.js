import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let PageToolbar = class PageToolbar extends LitElement {
  constructor() {
    super(...arguments);
    this.title = "";
    this.actions = [];
    this.filters = [];
  }
  static {
    this.styles = css`
      :host {
        display: block;
      }

      .app-page-toolbar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-subtle);
      }

      .app-page-toolbar-title {
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--text-primary);
      }

      .app-page-toolbar-spacer {
        flex: 1;
      }

      .app-page-toolbar-filters {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      .app-page-toolbar-filter {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
        border-radius: 0.375rem;
        transition:
          background-color 0.15s,
          color 0.15s;
        border: none;
        background: transparent;
        cursor: pointer;
      }

      .app-page-toolbar-filter:hover {
        background: var(--bg-hover);
      }

      .app-page-toolbar-filter-active {
        background: var(--accent-100);
        color: var(--accent);
      }

      .app-page-toolbar-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .app-page-toolbar-action {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 0.375rem;
        transition:
          background-color 0.15s,
          opacity 0.15s;
        border: none;
        cursor: pointer;
      }

      .app-page-toolbar-action-primary {
        background: var(--accent);
        color: white;
      }

      .app-page-toolbar-action-primary:hover {
        opacity: 0.9;
      }

      .app-page-toolbar-action-secondary {
        background: var(--bg-tertiary);
        color: var(--text-primary);
      }

      .app-page-toolbar-action-secondary:hover {
        background: var(--bg-hover);
      }

      .app-page-toolbar-action-danger {
        background: var(--error);
        color: white;
      }

      .app-page-toolbar-action-danger:hover {
        opacity: 0.9;
      }

      .app-page-toolbar-action:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .app-page-toolbar-action-icon {
        font-size: 1rem;
      }
    `;
  }
  render() {
    return html`
      <div class="app-page-toolbar">
        ${this.title
          ? html`<h2 class="app-page-toolbar-title">${this.title}</h2>`
          : ""}
        <div class="app-page-toolbar-spacer"></div>
        ${this.filters.length > 0
          ? html`
              <div class="app-page-toolbar-filters">
                ${this.filters.map(
                  (filter) => html`
                    <button
                      class="app-page-toolbar-filter ${filter.active
                        ? "app-page-toolbar-filter-active"
                        : ""}"
                    >
                      ${filter.label}
                    </button>
                  `,
                )}
              </div>
            `
          : ""}
        ${this.actions.length > 0
          ? html`
              <div class="app-page-toolbar-actions">
                ${this.actions.map(
                  (action) => html`
                    <button
                      class="app-page-toolbar-action app-page-toolbar-action-${action.variant ||
                      "secondary"}"
                      ?disabled="${action.disabled}"
                    >
                      ${action.icon
                        ? html`<span
                            class="material-icons app-page-toolbar-action-icon"
                            >${action.icon}</span
                          >`
                        : ""}
                      ${action.label}
                    </button>
                  `,
                )}
              </div>
            `
          : ""}
      </div>
    `;
  }
};
__decorate(
  [property({ type: String })],
  PageToolbar.prototype,
  "title",
  void 0,
);
__decorate(
  [property({ type: Array })],
  PageToolbar.prototype,
  "actions",
  void 0,
);
__decorate(
  [property({ type: Array })],
  PageToolbar.prototype,
  "filters",
  void 0,
);
PageToolbar = __decorate([customElement("page-toolbar")], PageToolbar);
export { PageToolbar };
//# sourceMappingURL=page-toolbar.component.js.map
