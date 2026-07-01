import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type ToastType = "success" | "error" | "info" | "warning";

@customElement("app-toast")
export class AppToast extends LitElement {
  @property() declare message: string;
  @property({ type: Boolean }) declare visible: boolean;
  @property() declare type: ToastType;

  private _timeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    for (const key of ["message", "visible", "type"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["message", "visible", "type"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        saved[key] = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
      }
    }
    super.connectedCallback();
    for (const [key, value] of Object.entries(saved)) {
      (this as Record<string, unknown>)[key] = value;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  }

  static override styles = css`
    :host {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 9999;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 0.875rem;
      transform: translateY(0);
      opacity: 1;
      transition: all 0.3s ease;
      max-width: 24rem;
    }

    .toast.hidden {
      transform: translateY(1rem);
      opacity: 0;
      pointer-events: none;
    }

    .toast-success {
      border-color: var(--success);
      border-left-width: 3px;
    }

    .toast-error {
      border-color: var(--error);
      border-left-width: 3px;
    }

    .toast-info {
      border-color: var(--info);
      border-left-width: 3px;
    }

    .toast-warning {
      border-color: var(--warning);
      border-left-width: 3px;
    }

    .toast-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .toast-success .toast-icon {
      color: var(--success);
    }

    .toast-error .toast-icon {
      color: var(--error);
    }

    .toast-info .toast-icon {
      color: var(--info);
    }

    .toast-warning .toast-icon {
      color: var(--warning);
    }

    .toast-message {
      flex: 1;
    }

    .close-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
    }

    .close-btn:hover {
      color: var(--text-primary);
    }

    .close-btn svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  `;

  updated(changed: Map<string, unknown>) {
    if (changed.has("visible") && this.visible) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      this._timeout = setTimeout(() => {
        this.visible = false;
        this.dispatchEvent(
          new CustomEvent("dismiss", {
            bubbles: true,
            composed: true,
          }),
        );
      }, 4000);
    }
  }

  private _handleClose() {
    this.visible = false;
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    this.dispatchEvent(
      new CustomEvent("dismiss", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _getIcon() {
    switch (this.type) {
      case "success":
        return html`<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      case "error":
        return html`<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
      case "warning":
        return html`<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
      case "info":
      default:
        return html`<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }
  }

  override render() {
    return html`
      <div class="toast toast-${this.type || "info"} ${this.visible ? "" : "hidden"}">
        ${this._getIcon()}
        <span class="toast-message">${this.message}</span>
        <button class="close-btn" type="button" @click="${this._handleClose}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
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
