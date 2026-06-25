import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppSlider = class AppSlider extends LitElement {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.value = 0;
    }
    static { this.styles = css `
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
  `; }
    get percentage() {
        return ((this.value - this.min) / (this.max - this.min)) * 100;
    }
    _handleInput(event) {
        const target = event.target;
        const newValue = parseFloat(target.value);
        this.value = newValue;
        this.dispatchEvent(new CustomEvent("value-change", {
            detail: newValue,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        return html `
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
};
__decorate([
    property({ type: Number })
], AppSlider.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], AppSlider.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], AppSlider.prototype, "step", void 0);
__decorate([
    property({ type: Number })
], AppSlider.prototype, "value", void 0);
AppSlider = __decorate([
    customElement("app-slider")
], AppSlider);
export { AppSlider };
//# sourceMappingURL=slider.js.map