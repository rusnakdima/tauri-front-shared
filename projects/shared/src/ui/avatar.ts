import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square" | "rounded";

@customElement("app-avatar")
export class AppAvatar extends LitElement {
  @property() src: string | null = null;
  @property() name = "";
  @property() size: AvatarSize = "md";
  @property() shape: AvatarShape = "circle";

  static override styles = css`
    :host {
      display: inline-flex;
    }

    .app-avatar {
      @apply inline-flex items-center justify-center overflow-hidden bg-[var(--bg-tertiary)] text-[var(--text-secondary)] font-medium;
    }

    .app-avatar-xs {
      @apply w-6 h-6 text-xs;
    }

    .app-avatar-sm {
      @apply w-8 h-8 text-sm;
    }

    .app-avatar-md {
      @apply w-10 h-10 text-base;
    }

    .app-avatar-lg {
      @apply w-12 h-12 text-lg;
    }

    .app-avatar-xl {
      @apply w-16 h-16 text-xl;
    }

    .app-avatar-circle {
      @apply rounded-full;
    }

    .app-avatar-square {
      border-radius: 0;
    }

    .app-avatar-rounded {
      @apply rounded-lg;
    }

    .app-avatar-img {
      @apply w-full h-full object-cover;
    }

    .app-avatar-initials {
      @apply w-full h-full flex items-center justify-center;
    }
  `;

  private get initials(): string {
    if (!this.name) return "?";
    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  }

  override render() {
    const classes = [
      "app-avatar",
      `app-avatar-${this.size}`,
      `app-avatar-${this.shape}`,
    ].join(" ");

    return html`
      <span class="${classes}">
        ${this.src
          ? html`<img
              src="${this.src}"
              alt="${this.name}"
              class="app-avatar-img"
            />`
          : html`<span class="app-avatar-initials">${this.initials}</span>`}
      </span>
    `;
  }
}
