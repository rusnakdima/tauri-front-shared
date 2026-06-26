import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type SplitViewMode = "horizontal" | "vertical";

@customElement("split-view")
export class SplitView extends LitElement {
  @property({ type: String }) mode: SplitViewMode = "horizontal";
  @property({ type: Number }) dividerPosition: number = 50;
  @property({ type: String }) minFirstSize: string = "200px";
  @property({ type: String }) minSecondSize: string = "200px";

  static override styles = css`
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
  `;

  override render() {
    return html`
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
}

declare global {
  interface HTMLElementTagNameMap {
    "split-view": SplitView;
  }
}
