import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";
export type BadgeSize = "sm" | "md" | "lg";

@customElement("app-badge")
export class AppBadge extends LitElement {
  @property() label = "";
  @property() variant: BadgeVariant = "default";
  @property() size: BadgeSize = "md";
  @property() icon: string | null = null;
  @property({ type: Boolean }) removable = false;

  static override styles = css`
    :host {
      display: inline-flex;
    }

    .app-badge {
      @apply inline-flex items-center gap-1 rounded-full font-medium;
    }

    .app-badge-sm {
      @apply px-2 py-0.5 text-xs;
    }

    .app-badge-md {
      @apply px-2.5 py-1 text-sm;
    }

    .app-badge-lg {
      @apply px-3 py-1.5 text-base;
    }

    .app-badge-default {
      @apply bg-[var(--bg-tertiary)] text-[var(--text-secondary)];
    }

    .app-badge-primary {
      @apply bg-[var(--accent-100)] text-[var(--accent-700)];
    }

    .app-badge-secondary {
      @apply bg-[var(--bg-secondary)] text-[var(--text-secondary)];
    }

    .app-badge-success {
      @apply bg-green-100 text-green-700;
    }

    .app-badge-warning {
      @apply bg-yellow-100 text-yellow-700;
    }

    .app-badge-error {
      @apply bg-red-100 text-red-700;
    }

    .app-badge-icon {
      @apply text-inherit;
    }

    .app-badge-label {
      @apply text-inherit;
    }

    .app-badge-remove {
      @apply ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors;
      @apply flex items-center justify-center;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .app-badge-remove i {
      @apply text-xs;
    }
  `;

  private _handleRemove(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("remove", { bubbles: true, composed: true }),
    );
  }

  override render() {
    const classes = [
      "app-badge",
      `app-badge-${this.size}`,
      `app-badge-${this.variant}`,
    ].join(" ");

    return html`
      <span class="${classes}">
        ${this.icon
          ? html`<i class="material-icons app-badge-icon">${this.icon}</i>`
          : ""}
        <span class="app-badge-label">${this.label}</span>
        ${this.removable
          ? html`
              <button class="app-badge-remove" @click="${this._handleRemove}">
                <i class="material-icons">close</i>
              </button>
            `
          : ""}
      </span>
    `;
  }
}
