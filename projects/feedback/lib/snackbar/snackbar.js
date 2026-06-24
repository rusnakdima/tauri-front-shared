import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
let AppSnackbar = class AppSnackbar extends LitElement {
    static styles = css `
    :host {
      display: contents;
    }

    .app-snackbar {
      position: fixed;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      background-color: var(--bg-elevated, #fff);
      color: var(--text-primary, #111827);
      border: 1px solid var(--border-subtle, #e5e7eb);
      animation: fadeInUp 0.2s ease-out;
    }

    @keyframes fadeInUp {
      from {
        transform: translate(-50%, 100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }

    .app-snackbar-icon {
      font-size: 1rem;
    }

    .app-snackbar-success .app-snackbar-icon {
      color: var(--success, #22c55e);
    }
    .app-snackbar-error .app-snackbar-icon {
      color: var(--error, #ef4444);
    }
    .app-snackbar-warning .app-snackbar-icon {
      color: var(--warning, #f59e0b);
    }
    .app-snackbar-info .app-snackbar-icon {
      color: var(--info, #3b82f6);
    }

    .app-snackbar-message {
      font-size: 0.875rem;
    }

    .app-snackbar-action {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.125rem;
      border: none;
      border-radius: 9999px;
      background: transparent;
      color: var(--text-muted, #6b7280);
      cursor: pointer;
      transition:
        background-color 0.15s,
        color 0.15s;
    }

    .app-snackbar-action:hover {
      background-color: var(--bg-hover, #f3f4f6);
      color: var(--text-primary, #111827);
    }

    .app-snackbar-action i {
      font-size: 1rem;
    }
  `;
    type = "default";
    message = "";
    duration = 2500;
    autoDismiss = true;
    _isVisible = false;
    _timeoutId;
    connectedCallback() {
        super.connectedCallback();
        this._isVisible = true;
        if (this.autoDismiss && this.duration > 0) {
            this._startTimer();
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._clearTimer();
    }
    _startTimer() {
        this._timeoutId = window.setTimeout(() => this.dismiss(), this.duration);
    }
    _clearTimer() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            this._timeoutId = undefined;
        }
    }
    dismiss() {
        this._isVisible = false;
        this._clearTimer();
        setTimeout(() => this.dispatchEvent(new CustomEvent("dismissed", { bubbles: true, composed: true })), 200);
    }
    _getIcon() {
        switch (this.type) {
            case "success":
                return "check_circle";
            case "error":
                return "error";
            case "warning":
                return "warning";
            case "info":
                return "info";
            default:
                return "info";
        }
    }
    render() {
        if (!this._isVisible)
            return null;
        return html `
      <div class="app-snackbar app-snackbar-${this.type}" role="status">
        ${this.type !== "default"
            ? html `
              <i class="material-icons app-snackbar-icon">${this._getIcon()}</i>
            `
            : ""}
        <span class="app-snackbar-message">${this.message}</span>
        <button
          type="button"
          class="app-snackbar-action"
          @click="${this.dismiss}"
        >
          <i class="material-icons">close</i>
        </button>
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], AppSnackbar.prototype, "type", void 0);
__decorate([
    property({ type: String })
], AppSnackbar.prototype, "message", void 0);
__decorate([
    property({ type: Number })
], AppSnackbar.prototype, "duration", void 0);
__decorate([
    property({ type: Boolean })
], AppSnackbar.prototype, "autoDismiss", void 0);
__decorate([
    state()
], AppSnackbar.prototype, "_isVisible", void 0);
AppSnackbar = __decorate([
    customElement("app-snackbar")
], AppSnackbar);
export { AppSnackbar };
//# sourceMappingURL=snackbar.js.map