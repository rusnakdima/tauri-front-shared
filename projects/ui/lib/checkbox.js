import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppCheckbox = class AppCheckbox extends LitElement {
    constructor() {
        super(...arguments);
        this.label = "";
        this.disabled = false;
        this.checked = false;
        this.indeterminate = false;
    }
    static { this.styles = css `
    :host {
      display: inline-flex;
    }

    .app-checkbox {
      @apply inline-flex items-center gap-2 cursor-pointer;
    }

    .app-checkbox-disabled {
      @apply opacity-50 cursor-not-allowed;
    }

    .app-checkbox-box {
      @apply w-5 h-5 rounded border flex items-center justify-center transition-all;
      border: 2px solid var(--border-color);
      box-sizing: border-box;
    }

    .app-checkbox-unchecked {
      @apply bg-transparent border-[var(--border-color)];
    }

    .app-checkbox-checked {
      @apply bg-[var(--accent)] border-[var(--accent)] text-white;
    }

    .app-checkbox-indeterminate {
      @apply bg-[var(--accent)] border-[var(--accent)] text-white;
    }

    .app-checkbox-box i {
      @apply text-sm;
    }

    .app-checkbox-label {
      @apply text-[var(--text-primary)] text-sm;
    }
  `; }
    get state() {
        if (this.indeterminate)
            return "indeterminate";
        return this.checked ? "checked" : "unchecked";
    }
    _handleClick() {
        if (this.disabled)
            return;
        const newChecked = !this.checked;
        this.checked = newChecked;
        this.dispatchEvent(new CustomEvent("checked-change", {
            detail: newChecked,
            bubbles: true,
            composed: true,
        }));
    }
    render() {
        const classes = ["app-checkbox-box", `app-checkbox-${this.state}`].join(" ");
        return html `
      <label
        class="app-checkbox ${this.disabled ? "app-checkbox-disabled" : ""}"
      >
        <span class="${classes}" @click="${this._handleClick}">
          ${this.state === "checked"
            ? html `<i class="material-icons">check</i>`
            : this.state === "indeterminate"
                ? html `<i class="material-icons">remove</i>`
                : ""}
        </span>
        ${this.label
            ? html `<span class="app-checkbox-label">${this.label}</span>`
            : ""}
      </label>
    `;
    }
};
__decorate([
    property()
], AppCheckbox.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], AppCheckbox.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], AppCheckbox.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], AppCheckbox.prototype, "indeterminate", void 0);
AppCheckbox = __decorate([
    customElement("app-checkbox")
], AppCheckbox);
export { AppCheckbox };
//# sourceMappingURL=checkbox.js.map