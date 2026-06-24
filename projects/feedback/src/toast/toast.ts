import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export type ToastType = "success" | "error" | "warning" | "info";

@customElement("app-toast")
export class AppToast extends LitElement {
  static override styles = css`
    :host {
      display: contents;
    }

    .app-toast {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      min-width: 300px;
      max-width: 400px;
      border-radius: 0.5rem;
      box-shadow:
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
      background-color: var(--bg-elevated, #fff);
      border: 1px solid var(--border-subtle, #e5e7eb);
      border-left-width: 4px;
      animation: slideIn 0.2s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .app-toast-success {
      border-left-color: var(--success, #22c55e);
    }
    .app-toast-error {
      border-left-color: var(--error, #ef4444);
    }
    .app-toast-warning {
      border-left-color: var(--warning, #f59e0b);
    }
    .app-toast-info {
      border-left-color: var(--info, #3b82f6);
    }

    .app-toast-icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .app-toast-success .app-toast-icon {
      color: var(--success, #22c55e);
    }
    .app-toast-error .app-toast-icon {
      color: var(--error, #ef4444);
    }
    .app-toast-warning .app-toast-icon {
      color: var(--warning, #f59e0b);
    }
    .app-toast-info .app-toast-icon {
      color: var(--info, #3b82f6);
    }

    .app-toast-message {
      flex: 1;
      font-size: 0.875rem;
      color: var(--text-primary, #111827);
    }

    .app-toast-close {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
      border: none;
      border-radius: 0.25rem;
      background: transparent;
      color: var(--text-muted, #6b7280);
      cursor: pointer;
      flex-shrink: 0;
      transition:
        background-color 0.15s,
        color 0.15s;
    }

    .app-toast-close:hover {
      background-color: var(--bg-hover, #f3f4f6);
      color: var(--text-primary, #111827);
    }

    .app-toast-close i {
      font-size: 1.125rem;
    }
  `;

  @property({ type: String }) type: ToastType = "info";
  @property({ type: String }) message = "";
  @property({ type: Number }) duration = 3000;
  @property({ type: Boolean }) autoDismiss = true;
  @property({ type: Boolean }) show = false;

  @state() private _isVisible = false;
  private _timeoutId?: number;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.show && this.autoDismiss) {
      this._startTimer();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearTimer();
  }

  override updated(changedProps: Map<string, unknown>): void {
    if (changedProps.has("show") && this.show && this.autoDismiss) {
      this._startTimer();
    }
  }

  private _startTimer(): void {
    this._isVisible = true;
    if (this.duration > 0) {
      this._timeoutId = window.setTimeout(() => this.dismiss(), this.duration);
    }
  }

  private _clearTimer(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = undefined;
    }
  }

  dismiss(): void {
    this._isVisible = false;
    this._clearTimer();
    this.dispatchEvent(
      new CustomEvent("dismissed", { bubbles: true, composed: true }),
    );
  }

  private _getIcon(): string {
    switch (this.type) {
      case "success":
        return "check_circle";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
    }
  }

  override render() {
    if (!this._isVisible) return null;

    return html`
      <div class="app-toast app-toast-${this.type}" role="alert">
        <i class="material-icons app-toast-icon">${this._getIcon()}</i>
        <span class="app-toast-message">${this.message}</span>
        <button
          type="button"
          class="app-toast-close"
          @click="${this.dismiss}"
          aria-label="Dismiss"
        >
          <i class="material-icons">close</i>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-toast": AppToast;
  }
}
