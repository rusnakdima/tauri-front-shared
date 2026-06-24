import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppProgressBar = class AppProgressBar extends LitElement {
    percentage = 0;
    showLabel = false;
    static styles = css `
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
    get clampedPercentage() {
        return Math.min(100, Math.max(0, this.percentage));
    }
    render() {
        return html `
      <div class="app-progress-bar">
        <div class="app-progress-bar-track">
          <div
            class="app-progress-bar-fill"
            style="width: ${this.clampedPercentage}%"
          ></div>
        </div>
        ${this.showLabel
            ? html `<span class="app-progress-bar-label"
              >${this.clampedPercentage}%</span
            >`
            : ""}
      </div>
    `;
    }
};
__decorate([
    property({ type: Number })
], AppProgressBar.prototype, "percentage", void 0);
__decorate([
    property({ type: Boolean })
], AppProgressBar.prototype, "showLabel", void 0);
AppProgressBar = __decorate([
    customElement("app-progress-bar")
], AppProgressBar);
export { AppProgressBar };
//# sourceMappingURL=progress-bar.js.map