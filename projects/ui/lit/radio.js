import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppRadio = class AppRadio extends LitElement {
    options = [];
    value = null;
    static styles = css `
    :host {
      display: block;
    }

    .app-radio-group {
      @apply flex flex-col gap-2;
    }

    .app-radio {
      @apply inline-flex items-center gap-2 cursor-pointer;
    }

    .app-radio-disabled {
      @apply opacity-50 cursor-not-allowed;
    }

    .app-radio-dot {
      @apply w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all;
      border-color: var(--border-color);
      box-sizing: border-box;
    }

    .app-radio-selected .app-radio-dot {
      @apply border-[var(--accent)];
    }

    .app-radio-dot-inner {
      @apply w-2.5 h-2.5 rounded-full bg-[var(--accent)];
    }

    .app-radio-label {
      @apply text-[var(--text-primary)] text-sm;
    }

    .app-radio-selected .app-radio-label {
      @apply text-[var(--accent)];
    }
  `;
    _selectOption(optionValue, disabled) {
        if (disabled)
            return;
        this.value = optionValue;
        this.dispatchEvent(new CustomEvent("value-change", {
            detail: optionValue,
            bubbles: true,
            composed: true,
        }));
    }
    _isSelected(optionValue) {
        return this.value === optionValue;
    }
    render() {
        return html `
      <div class="app-radio-group">
        ${this.options.map((option) => html `
            <label
              class="app-radio ${this._isSelected(option.value)
            ? "app-radio-selected"
            : ""} ${option.disabled ? "app-radio-disabled" : ""}"
              @click="${() => this._selectOption(option.value, option.disabled)}"
            >
              <span class="app-radio-dot">
                ${this._isSelected(option.value)
            ? html `<span class="app-radio-dot-inner"></span>`
            : ""}
              </span>
              <span class="app-radio-label">${option.label}</span>
            </label>
          `)}
      </div>
    `;
    }
};
__decorate([
    property()
], AppRadio.prototype, "options", void 0);
__decorate([
    property()
], AppRadio.prototype, "value", void 0);
AppRadio = __decorate([
    customElement("app-radio")
], AppRadio);
export { AppRadio };
//# sourceMappingURL=radio.js.map