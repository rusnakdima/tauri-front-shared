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
  static {
    this.styles = css`
      :host {
        display: inline-flex;
      }

      .app-checkbox {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }

      .app-checkbox-disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .app-checkbox-box {
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 0.25rem;
        border: 2px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s;
        box-sizing: border-box;
      }

      .app-checkbox-unchecked {
        background-color: transparent;
        border-color: var(--border-color);
      }

      .app-checkbox-checked {
        background-color: var(--accent);
        border-color: var(--accent);
        color: var(--text-on-accent);
      }

      .app-checkbox-indeterminate {
        background-color: var(--accent);
        border-color: var(--accent);
        color: var(--text-on-accent);
      }

      .app-checkbox-box i {
        font-size: 0.875rem;
      }

      .app-checkbox-label {
        color: var(--text-primary);
        font-size: 0.875rem;
      }
    `;
  }
  get state() {
    if (this.indeterminate) return "indeterminate";
    return this.checked ? "checked" : "unchecked";
  }
  _handleClick() {
    if (this.disabled) return;
    const newChecked = !this.checked;
    this.checked = newChecked;
    this.dispatchEvent(
      new CustomEvent("checked-change", {
        detail: newChecked,
        bubbles: true,
        composed: true,
      }),
    );
  }
  render() {
    const classes = ["app-checkbox-box", `app-checkbox-${this.state}`].join(
      " ",
    );
    return html`
      <label
        class="app-checkbox ${this.disabled ? "app-checkbox-disabled" : ""}"
      >
        <span class="${classes}" @click="${this._handleClick}">
          ${this.state === "checked"
            ? html`<i class="material-icons">check</i>`
            : this.state === "indeterminate"
              ? html`<i class="material-icons">remove</i>`
              : ""}
        </span>
        ${this.label
          ? html`<span class="app-checkbox-label">${this.label}</span>`
          : ""}
      </label>
    `;
  }
};
__decorate([property()], AppCheckbox.prototype, "label", void 0);
__decorate(
  [property({ type: Boolean })],
  AppCheckbox.prototype,
  "disabled",
  void 0,
);
__decorate(
  [property({ type: Boolean })],
  AppCheckbox.prototype,
  "checked",
  void 0,
);
__decorate(
  [property({ type: Boolean })],
  AppCheckbox.prototype,
  "indeterminate",
  void 0,
);
AppCheckbox = __decorate([customElement("app-checkbox")], AppCheckbox);
export { AppCheckbox };
//# sourceMappingURL=checkbox.js.map
