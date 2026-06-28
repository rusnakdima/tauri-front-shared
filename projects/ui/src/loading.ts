import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type LoadingVariant = "spinner" | "dots" | "pulse" | "skeleton";
export type LoadingSize = "sm" | "md" | "lg";

@customElement("app-loading")
export class AppLoading extends LitElement {
  @property() declare variant: LoadingVariant;
  @property() declare size: LoadingSize;
  constructor() {
    super();
    for (const key of ["variant", "size"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["variant", "size"]) {
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

    .app-loading-spinner {
      @apply border-2 border-current border-t-transparent rounded-full animate-spin;
    }

    .app-loading-sm {
      @apply w-4 h-4;
    }

    .app-loading-md {
      @apply w-6 h-6;
    }

    .app-loading-lg {
      @apply w-8 h-8;
    }

    .app-loading-dots {
      @apply flex items-center gap-1;
    }

    .app-loading-dot {
      @apply w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce;
    }

    .app-loading-dots .app-loading-dot:nth-child(2) {
      animation-delay: 0.1s;
    }

    .app-loading-dots .app-loading-dot:nth-child(3) {
      animation-delay: 0.2s;
    }

    .app-loading-pulse {
      @apply rounded-full bg-[var(--accent)] animate-pulse opacity-75;
    }

    .app-loading-sm.app-loading-pulse {
      @apply w-4 h-4;
    }

    .app-loading-md.app-loading-pulse {
      @apply w-6 h-6;
    }

    .app-loading-lg.app-loading-pulse {
      @apply w-8 h-8;
    }

    .app-loading-skeleton {
      @apply rounded bg-[var(--bg-tertiary)] animate-pulse;
    }

    .app-loading-sm.app-loading-skeleton {
      @apply w-16 h-4;
    }

    .app-loading-md.app-loading-skeleton {
      @apply w-24 h-5;
    }

    .app-loading-lg.app-loading-skeleton {
      @apply w-32 h-6;
    }
  `;

  override render() {
    const sizeClass = `app-loading-${this.size}`;

    if (this.variant === "spinner") {
      return html`<span class="app-loading-spinner ${sizeClass}"></span>`;
    }

    if (this.variant === "dots") {
      return html`
        <div class="app-loading-dots ${sizeClass}">
          <span class="app-loading-dot"></span>
          <span class="app-loading-dot"></span>
          <span class="app-loading-dot"></span>
        </div>
      `;
    }

    if (this.variant === "pulse") {
      return html`<div class="app-loading-pulse ${sizeClass}"></div>`;
    }

    if (this.variant === "skeleton") {
      return html`<div class="app-loading-skeleton ${sizeClass}"></div>`;
    }

    return html``;
  }
}
