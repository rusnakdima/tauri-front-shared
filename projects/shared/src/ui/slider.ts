import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-slider")
export class AppSlider extends LitElement {
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Number }) value = 0;

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
