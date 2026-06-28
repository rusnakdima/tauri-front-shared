import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-progress-bar")
export class AppProgressBar extends LitElement {
  @property({ type: Number }) declare percentage: number;
  @property({ type: Boolean }) declare showLabel: boolean;
  constructor() {
    super();
    for (const key of ["percentage", "showLabel"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["percentage", "showLabel"]) {
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
      display: block;
    }

    .app-progress-bar {
      @apply flex items-center gap-2;
    }

    .app-progress-bar-track {
      @apply flex-1 h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden;
    }

    .app-progress-bar-fill {
      @apply h-full rounded-full bg-[var(--accent)] transition-all duration-300;
    }

    .app-progress-bar-label {
      @apply text-xs text-[var(--text-secondary)] font-medium min-w-10 text-right;
    }
  `;

  private get clampedPercentage(): number {
    return Math.min(100, Math.max(0, this.percentage));
  }

  override render() {
    return html`
      <div class="app-progress-bar">
        <div class="app-progress-bar-track">
          <div
            class="app-progress-bar-fill"
            style="width: ${this.clampedPercentage}%"
          ></div>
        </div>
        ${this.showLabel
          ? html`<span class="app-progress-bar-label"
              >${this.clampedPercentage}%</span
            >`
          : ""}
      </div>
    `;
  }
}
