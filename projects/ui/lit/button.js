import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppButton = class AppButton extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = "primary";
        this.size = "md";
        this.disabled = false;
        this.loading = false;
        this.icon = null;
        this.iconPosition = "left";
        this.fullWidth = false;
        this.type = "button";
    }
    static { this.styles = css `
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid;
      padding: 0.5rem 1rem;
      text-align: center;
      font-weight: 500;
      transition: all 0.15s;
      cursor: pointer;
      border-width: 1px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .app-btn-primary {
      border-color: var(--accent);
      background-color: var(--accent);
      color: var(--text-on-accent);
    }
    .app-btn-primary:hover {
      background-color: var(--accent-hover);
      border-color: var(--accent-hover);
    }

    .app-btn-secondary {
      border-color: var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
    }
    .app-btn-secondary:hover {
      background-color: var(--bg-hover);
    }

    .app-btn-danger {
      border-color: var(--error);
      background-color: var(--error);
      color: var(--text-on-error);
    }
    .app-btn-danger:hover {
      opacity: 0.9;
    }

    .app-btn-warning {
      border-color: var(--warning);
      background-color: var(--warning);
      color: var(--text-on-warning);
    }
    .app-btn-warning:hover {
      opacity: 0.9;
    }

    .app-btn-success {
      border-color: var(--success);
      background-color: var(--success);
      color: var(--text-on-success);
    }
    .app-btn-success:hover {
      opacity: 0.9;
    }

    .app-btn-ghost {
      border-color: transparent;
      background-color: transparent;
      color: var(--text-secondary);
    }
    .app-btn-ghost:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .app-btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }

    .app-btn-md {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    .app-btn-lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    }

    .app-btn-full {
      width: 100%;
    }

    .app-btn-icon {
      font-size: 1.25rem;
    }

    .app-btn-spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `; }
    _handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.dispatchEvent(new CustomEvent("click", { detail: e, bubbles: true, composed: true }));
    }
    render() {
        const classes = [
            "app-btn",
            `app-btn-${this.variant}`,
            `app-btn-${this.size}`,
            this.fullWidth ? "app-btn-full" : "",
            this.disabled || this.loading ? "app-btn-disabled" : "",
        ]
            .filter(Boolean)
            .join(" ");
        return html `
      <button
        type="${this.type}"
        class="${classes}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading
            ? html `<span class="app-btn-spinner"></span>`
            : html `
              ${this.icon && this.iconPosition === "left"
                ? html `<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
              <slot></slot>
              ${this.icon && this.iconPosition === "right"
                ? html `<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
            `}
      </button>
    `;
    }
};
__decorate([
    property()
], AppButton.prototype, "variant", void 0);
__decorate([
    property()
], AppButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], AppButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], AppButton.prototype, "loading", void 0);
__decorate([
    property()
], AppButton.prototype, "icon", void 0);
__decorate([
    property()
], AppButton.prototype, "iconPosition", void 0);
__decorate([
    property({ type: Boolean })
], AppButton.prototype, "fullWidth", void 0);
__decorate([
    property()
], AppButton.prototype, "type", void 0);
AppButton = __decorate([
    customElement("app-button")
], AppButton);
export { AppButton };
//# sourceMappingURL=button.js.map