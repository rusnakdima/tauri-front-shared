import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type SplitViewMode = "horizontal" | "vertical";

@customElement("split-view")
export class SplitView extends LitElement {
  @property({ type: String }) declare mode: SplitViewMode;
  @property({ type: Number }) declare dividerPosition: number;
  @property({ type: String }) declare minFirstSize: string;
  @property({ type: String }) declare minSecondSize: string;
  constructor() {
    super();
    for (const key of ["mode", "dividerPosition", "minFirstSize", "minSecondSize"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["mode", "dividerPosition", "minFirstSize", "minSecondSize"]) {
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
