import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-slider")
export class AppSlider extends LitElement {
  @property({ type: Number }) declare min: number;
  @property({ type: Number }) declare max: number;
  @property({ type: Number }) declare step: number;
  @property({ type: Number }) declare value: number;
  constructor() {
    super();
    for (const key of ["min", "max", "step", "value"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["min", "max", "step", "value"]) {
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

    .app-slider {
      @apply relative w-full py-2;
    }

    .app-slider-input {
      @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10;
      margin: 0;
    }

    .app-slider-track {
      @apply h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden;
    }

    .app-slider-fill {
      @apply h-full rounded-full bg-[var(--accent)] transition-all;
    }

    .app-slider-input:focus + .app-slider-track {
      @apply outline-none ring-2 ring-[var(--accent)] ring-offset-2;
    }
  `;

  private get percentage(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  private _handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    this.value = newValue;
    this.dispatchEvent(
      new CustomEvent("value-change", {
        detail: newValue,
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <div class="app-slider">
        <input
          type="range"
          class="app-slider-input"
          .min="${this.min}"
          .max="${this.max}"
          .step="${this.step}"
          .value="${this.value}"
          @input="${this._handleInput}"
        />
        <div class="app-slider-track">
          <div class="app-slider-fill" style="width: ${this.percentage}%"></div>
        </div>
      </div>
    `;
  }
}
