import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("app-split-view")
export class AppSplitView extends LitElement {
  @property() declare direction: "horizontal" | "vertical";
  @property({ type: Number }) declare split: number;
  @property({ type: Number }) declare minFirst: number;
  @property({ type: Number }) declare minSecond: number;
  constructor() {
    super();
    for (const key of ["direction", "split", "minFirst", "minSecond"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["direction", "split", "minFirst", "minSecond"]) {
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


  @state() private _isDragging = false;

  static override styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .split-container {
      display: flex;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    .split-container.vertical {
      flex-direction: column;
    }

    .split-pane {
      overflow: auto;
      min-width: 0;
      min-height: 0;
    }

    .split-pane.first {
      flex-shrink: 0;
    }

    .split-container.horizontal .split-pane.first {
      height: 100%;
    }

    .split-container.vertical .split-pane.first {
      width: 100%;
    }

    .split-divider {
      flex-shrink: 0;
      background: var(--border-color);
      transition: background 0.15s;
      position: relative;
      z-index: 1;
    }

    .split-container.horizontal .split-divider {
      width: 6px;
      cursor: col-resize;
    }

    .split-container.vertical .split-divider {
      height: 6px;
      cursor: row-resize;
    }

    .split-divider:hover,
    .split-divider.dragging {
      background: var(--accent);
    }

    .split-divider::after {
      content: "";
      position: absolute;
      background: transparent;
    }

    .horizontal .split-divider::after {
      top: 0;
      bottom: 0;
      left: -4px;
      right: -4px;
    }

    .vertical .split-divider::after {
      left: 0;
      right: 0;
      top: -4px;
      bottom: -4px;
    }
  `;

  private _onDividerMouseDown(e: MouseEvent) {
    e.preventDefault();
    this._isDragging = true;

    const onMouseMove = (e: MouseEvent) => {
      if (!this._isDragging) return;

      const container = this.shadowRoot?.querySelector(".split-container");
      if (!container) return;

      const rect = container.getBoundingClientRect();

      if (this.direction === "horizontal") {
        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
        const clamped = Math.max(
          this.minFirst,
          Math.min(100 - this.minSecond, percentage),
        );
        this.split = clamped;
      } else {
        const percentage = ((e.clientY - rect.top) / rect.height) * 100;
        const clamped = Math.max(
          this.minFirst,
          Math.min(100 - this.minSecond, percentage),
        );
        this.split = clamped;
      }
    };

    const onMouseUp = () => {
      this._isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  override render() {
    const firstSize = this.direction === "horizontal" ? "width" : "height";
    const secondSize = this.direction === "horizontal" ? "width" : "height";

    return html`
      <div class="split-container ${this.direction}">
        <div
          class="split-pane first"
          style="${firstSize}: ${this.split}%; flex-grow: 0;"
        >
          <slot name="first"></slot>
        </div>
        <div
          class="split-divider ${this._isDragging ? "dragging" : ""}"
          @mousedown="${this._onDividerMouseDown}"
        ></div>
        <div class="split-pane second" style="${secondSize}: auto; flex: 1;">
          <slot name="second"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-split-view": AppSplitView;
  }
}
