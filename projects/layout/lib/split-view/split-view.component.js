import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let SplitView = class SplitView extends LitElement {
    constructor() {
        super(...arguments);
        this.mode = "horizontal";
        this.dividerPosition = 50;
        this.minFirstSize = "200px";
        this.minSecondSize = "200px";
    }
    static { this.styles = css `
    :host {
      display: block;
    }

    .app-split-view {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .app-split-view-horizontal {
      flex-direction: row;
    }

    .app-split-view-vertical {
      flex-direction: column;
    }

    .app-split-view-pane {
      overflow: hidden;
    }

    .app-split-view-divider {
      background: var(--border-color);
      flex-shrink: 0;
      cursor: col-resize;
    }

    .app-split-view-horizontal .app-split-view-divider {
      width: 8px;
      height: 100%;
      cursor: col-resize;
    }

    .app-split-view-vertical .app-split-view-divider {
      width: 100%;
      height: 8px;
      cursor: row-resize;
    }
  `; }
    render() {
        return html `
      <div
        class="app-split-view ${this.mode === "horizontal"
            ? "app-split-view-horizontal"
            : "app-split-view-vertical"}"
      >
        <div
          class="app-split-view-pane app-split-view-first"
          style="flex-basis: ${this.dividerPosition}%"
        >
          <slot name="first"></slot>
        </div>
        <div class="app-split-view-divider"></div>
        <div
          class="app-split-view-pane app-split-view-second"
          style="flex-basis: ${100 - this.dividerPosition}%"
        >
          <slot name="second"></slot>
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], SplitView.prototype, "mode", void 0);
__decorate([
    property({ type: Number })
], SplitView.prototype, "dividerPosition", void 0);
__decorate([
    property({ type: String })
], SplitView.prototype, "minFirstSize", void 0);
__decorate([
    property({ type: String })
], SplitView.prototype, "minSecondSize", void 0);
SplitView = __decorate([
    customElement("split-view")
], SplitView);
export { SplitView };
//# sourceMappingURL=split-view.component.js.map