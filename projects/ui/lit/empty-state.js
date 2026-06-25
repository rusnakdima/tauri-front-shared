import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppEmptyState = class AppEmptyState extends LitElement {
  constructor() {
    super(...arguments);
    this.icon = null;
    this.title = "";
    this.message = "";
    this.actionLabel = null;
  }
  static {
    this.styles = css`
      :host {
        display: block;
      }

      .app-empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
      }

      .app-empty-state-icon {
        font-size: 3.75rem;
        color: var(--text-muted);
        margin-bottom: 1rem;
      }

      .app-empty-state-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      .app-empty-state-message {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin-bottom: 1rem;
        max-width: 24rem;
      }

      .app-empty-state-action {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: var(--accent);
        color: var(--text-on-accent);
        font-size: 0.875rem;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: opacity 0.15s;
      }
      .app-empty-state-action:hover {
        opacity: 0.9;
      }
    `;
  }
  _handleAction() {
    this.dispatchEvent(
      new CustomEvent("action", { bubbles: true, composed: true }),
    );
  }
  render() {
    return html`
      <div class="app-empty-state">
        ${this.icon
          ? html`<i class="material-icons app-empty-state-icon"
              >${this.icon}</i
            >`
          : ""}
        ${this.title
          ? html`<h3 class="app-empty-state-title">${this.title}</h3>`
          : ""}
        ${this.message
          ? html`<p class="app-empty-state-message">${this.message}</p>`
          : ""}
        ${this.actionLabel
          ? html`
              <button
                class="app-empty-state-action"
                @click="${this._handleAction}"
              >
                ${this.actionLabel}
              </button>
            `
          : ""}
      </div>
    `;
  }
};
__decorate([property()], AppEmptyState.prototype, "icon", void 0);
__decorate([property()], AppEmptyState.prototype, "title", void 0);
__decorate([property()], AppEmptyState.prototype, "message", void 0);
__decorate([property()], AppEmptyState.prototype, "actionLabel", void 0);
AppEmptyState = __decorate([customElement("app-empty-state")], AppEmptyState);
export { AppEmptyState };
//# sourceMappingURL=empty-state.js.map
