import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppTooltip = class AppTooltip extends LitElement {
    content = "";
    position = "top";
    show = false;
    static styles = css `
    :host {
      display: inline-block;
    }

    .app-tooltip-wrapper {
      @apply relative inline-block;
    }

    .app-tooltip {
      @apply absolute z-50 px-2 py-1 text-xs text-white bg-[var(--bg-elevated)] rounded shadow-lg;
      @apply whitespace-nowrap;
    }

    .app-tooltip-top {
      @apply bottom-full left-1/2 -translate-x-1/2 mb-2;
    }

    .app-tooltip-bottom {
      @apply top-full left-1/2 -translate-x-1/2 mt-2;
    }

    .app-tooltip-left {
      @apply right-full top-1/2 -translate-y-1/2 mr-2;
    }

    .app-tooltip-right {
      @apply left-full top-1/2 -translate-y-1/2 ml-2;
    }
  `;
    render() {
        return html `
      <div class="app-tooltip-wrapper">
        <slot></slot>
        ${this.show
            ? html `
              <div class="app-tooltip app-tooltip-${this.position}">
                ${this.content}
              </div>
            `
            : ""}
      </div>
    `;
    }
};
__decorate([
    property()
], AppTooltip.prototype, "content", void 0);
__decorate([
    property()
], AppTooltip.prototype, "position", void 0);
__decorate([
    property({ type: Boolean })
], AppTooltip.prototype, "show", void 0);
AppTooltip = __decorate([
    customElement("app-tooltip")
], AppTooltip);
export { AppTooltip };
//# sourceMappingURL=tooltip.js.map