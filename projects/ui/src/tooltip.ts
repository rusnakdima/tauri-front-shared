import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

@customElement("app-tooltip")
export class AppTooltip extends LitElement {
  @property() declare content: string;
  @property() declare position: TooltipPosition;
  @property({ type: Boolean }) declare show: boolean;
  constructor() {
    super();
    for (const key of ["content", "position", "show"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["content", "position", "show"]) {
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
      display: inline-block;
    }

    .app-tooltip-wrapper {
      position: relative;
      display: inline-block;
    }

    .app-tooltip {
      position: absolute;
      z-index: 50;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      border-radius: 0.25rem;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      white-space: nowrap;
    }

    .app-tooltip-top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 0.5rem;
    }

    .app-tooltip-bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.5rem;
    }

    .app-tooltip-left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
    }

    .app-tooltip-right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 0.5rem;
    }
  `;

  override render() {
    return html`
      <div class="app-tooltip-wrapper">
        <slot></slot>
        ${this.show
          ? html`
              <div class="app-tooltip app-tooltip-${this.position}">
                ${this.content}
              </div>
            `
          : ""}
      </div>
    `;
  }
}
