import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type CheckboxState = "unchecked" | "checked" | "indeterminate";

@customElement("app-checkbox")
export class AppCheckbox extends LitElement {
  @property() declare label: string;
  @property({ type: Boolean }) declare disabled: boolean;
  @property({ type: Boolean }) declare checked: boolean;
  @property({ type: Boolean }) declare indeterminate: boolean;
  constructor() {
    super();
    for (const key of ["label", "disabled", "checked", "indeterminate"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["label", "disabled", "checked", "indeterminate"]) {
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

  private get state(): CheckboxState {
    if (this.indeterminate) return "indeterminate";
    return this.checked ? "checked" : "unchecked";
  }

  private _handleClick() {
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

  override render() {
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
}
