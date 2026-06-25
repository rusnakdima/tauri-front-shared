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
  static {
    this.styles = css`
      :host {
        display: inline-flex;
      }

      button {
        @apply inline-flex items-center justify-center gap-2 rounded-lg border border-solid px-4 py-2 text-center font-medium transition-all cursor-pointer;
        @apply disabled:cursor-not-allowed;
        border-width: 1px;
      }

      button:disabled {
        @apply opacity-50 cursor-not-allowed;
      }

      .app-btn-primary {
        @apply border-[var(--accent)] bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)];
      }

      .app-btn-secondary {
        @apply border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)];
      }

      .app-btn-danger {
        @apply border-[var(--error)] bg-[var(--error)] text-white hover:opacity-90;
      }

      .app-btn-warning {
        @apply border-[var(--warning)] bg-[var(--warning)] text-white hover:opacity-90;
      }

      .app-btn-success {
        @apply border-[var(--success)] bg-[var(--success)] text-white hover:opacity-90;
      }

      .app-btn-ghost {
        @apply border-transparent bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)];
      }

      .app-btn-sm {
        @apply px-3 py-1 text-sm;
      }

      .app-btn-md {
        @apply px-4 py-2 text-base;
      }

      .app-btn-lg {
        @apply px-6 py-3 text-lg;
      }

      .app-btn-full {
        @apply w-full;
      }

      .app-btn-icon {
        @apply text-xl;
      }

      .app-btn-spinner {
        @apply w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin;
      }
    `;
  }
  _handleClick(e) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent("click", { detail: e, bubbles: true, composed: true }),
    );
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
    return html`
      <button
        type="${this.type}"
        class="${classes}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading
          ? html`<span class="app-btn-spinner"></span>`
          : html`
              ${this.icon && this.iconPosition === "left"
                ? html`<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
              <slot></slot>
              ${this.icon && this.iconPosition === "right"
                ? html`<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
            `}
      </button>
    `;
  }
};
__decorate([property()], AppButton.prototype, "variant", void 0);
__decorate([property()], AppButton.prototype, "size", void 0);
__decorate(
  [property({ type: Boolean })],
  AppButton.prototype,
  "disabled",
  void 0,
);
__decorate(
  [property({ type: Boolean })],
  AppButton.prototype,
  "loading",
  void 0,
);
__decorate([property()], AppButton.prototype, "icon", void 0);
__decorate([property()], AppButton.prototype, "iconPosition", void 0);
__decorate(
  [property({ type: Boolean })],
  AppButton.prototype,
  "fullWidth",
  void 0,
);
__decorate([property()], AppButton.prototype, "type", void 0);
AppButton = __decorate([customElement("app-button")], AppButton);
export { AppButton };
//# sourceMappingURL=button.js.map
