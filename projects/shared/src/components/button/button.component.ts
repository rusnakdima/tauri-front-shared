import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type ButtonStyle = "solid" | "outline" | "soft" | "ghost";
export type ButtonVariant =
  | "primary"
  | "danger"
  | "warning"
  | "success"
  | "info";
export type ButtonSize = "sm" | "md" | "lg";

@customElement("app-button")
export class AppButton extends LitElement {
  @property() declare variant: ButtonVariant;
  @property() declare buttonStyle: ButtonStyle;
  @property() declare size: ButtonSize;
  @property({ type: Boolean }) declare disabled: boolean;
  @property({ type: Boolean }) declare loading: boolean;
  @property() declare icon: string | null;
  @property() declare iconPosition: "left" | "right";
  @property({ type: Boolean }) declare fullWidth: boolean;
  @property() declare type: "button" | "submit" | "reset";
  @property() declare label: string;

  constructor() {
    super();
    for (const key of ["variant", "buttonStyle", "size", "disabled", "loading", "icon", "iconPosition", "fullWidth", "type", "label"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["variant", "buttonStyle", "size", "disabled", "loading", "icon", "iconPosition", "fullWidth", "type", "label"]) {
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

  static override styles = css`
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

    /* ========================================
       SOLID VARIANT (default) - Filled background
       ======================================== */
    .app-btn-solid {
      border-color: var(--accent);
      background-color: var(--accent);
      color: var(--text-on-accent);
    }
    .app-btn-solid:hover {
      background-color: var(--accent-hover);
      border-color: var(--accent-hover);
    }

    .app-btn-solid-danger {
      border-color: var(--error);
      background-color: var(--error);
      color: var(--text-on-error);
    }
    .app-btn-solid-danger:hover {
      opacity: 0.9;
    }

    .app-btn-solid-warning {
      border-color: var(--warning);
      background-color: var(--warning);
      color: var(--text-on-warning);
    }
    .app-btn-solid-warning:hover {
      opacity: 0.9;
    }

    .app-btn-solid-success {
      border-color: var(--success);
      background-color: var(--success);
      color: var(--text-on-success);
    }
    .app-btn-solid-success:hover {
      opacity: 0.9;
    }

    .app-btn-solid-info {
      border-color: var(--info);
      background-color: var(--info);
      color: var(--text-on-info);
    }
    .app-btn-solid-info:hover {
      opacity: 0.9;
    }

    /* ========================================
       OUTLINE VARIANT - Border only, transparent bg
       ======================================== */
    .app-btn-outline {
      border-color: var(--accent);
      background-color: transparent;
      color: var(--accent);
    }
    .app-btn-outline:hover {
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
    }

    .app-btn-outline-danger {
      border-color: var(--error);
      background-color: transparent;
      color: var(--error);
    }
    .app-btn-outline-danger:hover {
      background-color: color-mix(in srgb, var(--error) 10%, transparent);
    }

    .app-btn-outline-warning {
      border-color: var(--warning);
      background-color: transparent;
      color: var(--warning);
    }
    .app-btn-outline-warning:hover {
      background-color: color-mix(in srgb, var(--warning) 10%, transparent);
    }

    .app-btn-outline-success {
      border-color: var(--success);
      background-color: transparent;
      color: var(--success);
    }
    .app-btn-outline-success:hover {
      background-color: color-mix(in srgb, var(--success) 10%, transparent);
    }

    .app-btn-outline-info {
      border-color: var(--info);
      background-color: transparent;
      color: var(--info);
    }
    .app-btn-outline-info:hover {
      background-color: color-mix(in srgb, var(--info) 10%, transparent);
    }

    /* ========================================
       SOFT VARIANT - Light background tint
       ======================================== */
    .app-btn-soft {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
      color: var(--accent);
    }
    .app-btn-soft:hover {
      background-color: color-mix(in srgb, var(--accent) 20%, transparent);
    }

    .app-btn-soft-danger {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--error) 10%, transparent);
      color: var(--error);
    }
    .app-btn-soft-danger:hover {
      background-color: color-mix(in srgb, var(--error) 20%, transparent);
    }

    .app-btn-soft-warning {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--warning) 10%, transparent);
      color: var(--warning);
    }
    .app-btn-soft-warning:hover {
      background-color: color-mix(in srgb, var(--warning) 20%, transparent);
    }

    .app-btn-soft-success {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--success) 10%, transparent);
      color: var(--success);
    }
    .app-btn-soft-success:hover {
      background-color: color-mix(in srgb, var(--success) 20%, transparent);
    }

    .app-btn-soft-info {
      border-color: transparent;
      background-color: color-mix(in srgb, var(--info) 10%, transparent);
      color: var(--info);
    }
    .app-btn-soft-info:hover {
      background-color: color-mix(in srgb, var(--info) 20%, transparent);
    }

    /* ========================================
       GHOST VARIANT - No border, transparent bg
       ======================================== */
    .app-btn-ghost {
      border-color: transparent;
      background-color: transparent;
      color: var(--accent);
    }
    .app-btn-ghost:hover {
      background-color: color-mix(in srgb, var(--accent) 10%, transparent);
    }

    .app-btn-ghost-danger {
      border-color: transparent;
      background-color: transparent;
      color: var(--error);
    }
    .app-btn-ghost-danger:hover {
      background-color: color-mix(in srgb, var(--error) 10%, transparent);
    }

    .app-btn-ghost-warning {
      border-color: transparent;
      background-color: transparent;
      color: var(--warning);
    }
    .app-btn-ghost-warning:hover {
      background-color: color-mix(in srgb, var(--warning) 10%, transparent);
    }

    .app-btn-ghost-success {
      border-color: transparent;
      background-color: transparent;
      color: var(--success);
    }
    .app-btn-ghost-success:hover {
      background-color: color-mix(in srgb, var(--success) 10%, transparent);
    }

    .app-btn-ghost-info {
      border-color: transparent;
      background-color: transparent;
      color: var(--info);
    }
    .app-btn-ghost-info:hover {
      background-color: color-mix(in srgb, var(--info) 10%, transparent);
    }

    /* ========================================
       SIZE VARIANTS
       ======================================== */
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

    .app-btn-disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
      to {
        transform: rotate(360deg);
      }
    }

    /* ========================================
       LEGACY SUPPORT
       ======================================== */
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
  `;

  private _handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent("click", { detail: e, bubbles: true, composed: true }),
    );
  }

  private getButtonClass(): string {
    const style = this.buttonStyle || "solid";
    const variant = this.variant || "primary";

    const styleVariant = style === "solid" && variant === "primary"
      ? "app-btn-solid"
      : `app-btn-${style}${variant !== "primary" ? `-${variant}` : ""}`;

    const classes = [
      "app-btn",
      styleVariant,
      `app-btn-${this.size || "md"}`,
      this.fullWidth ? "app-btn-full" : "",
      this.disabled || this.loading ? "app-btn-disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return classes;
  }

  override render() {
    return html`
      <button
        type="${this.type || "button"}"
        class="${this.getButtonClass()}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading
          ? html`<span class="app-btn-spinner"></span>`
          : html`
              ${this.icon && this.iconPosition === "left"
                ? html`<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
              ${this.label ? html`<span>${this.label}</span>` : html`<slot></slot>`}
              ${this.icon && this.iconPosition === "right"
                ? html`<i class="material-icons app-btn-icon">${this.icon}</i>`
                : ""}
            `}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-button": AppButton;
  }
}
