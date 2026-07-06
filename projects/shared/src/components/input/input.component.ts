import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url";

@customElement("app-input")
export class AppInput extends LitElement {
  @property() declare type: InputType;
  @property() declare placeholder: string;
  @property() declare label: string | null;
  @property({ type: Boolean }) declare disabled: boolean;
  @property() declare error: string | null;
  @property() declare icon: string | null;
  constructor() {
    super();
    for (const key of ["type", "placeholder", "label", "disabled", "error", "icon", "_value", "_focused"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["type", "placeholder", "label", "disabled", "error", "icon", "_value", "_focused"]) {
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


  @state() private _value = "";
  @state() private _focused = false;

  static override styles = css`
    :host {
      display: block;
    }

    .app-input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .app-input-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .app-input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .app-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      box-sizing: border-box;
      transition: all 0.15s;
      outline: none;
    }

    .app-input::placeholder {
      color: var(--text-muted);
    }

    .app-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    .app-input-default:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    .app-input-error {
      border-color: var(--error);
      box-shadow: 0 0 0 1px var(--error);
    }

    .app-input-with-icon {
      padding-left: 2.5rem;
    }

    .app-input-icon {
      position: absolute;
      left: 0.75rem;
      font-size: 1.25rem;
      color: var(--text-muted);
    }

    .app-input-focused .app-input-icon {
      color: var(--accent);
    }

    .app-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--bg-tertiary);
    }

    .app-input-error-text {
      font-size: 0.75rem;
      color: var(--error);
    }
  `;

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this._value = target.value;
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: this._value,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleFocus() {
    this._focused = true;
  }

  private _handleBlur() {
    this._focused = false;
    this.dispatchEvent(
      new CustomEvent("blur", { bubbles: true, composed: true }),
    );
  }

  override render() {
    const stateClass = this.error ? "app-input-error" : "app-input-default";
    const classes = [
      "app-input",
      stateClass,
      this.icon ? "app-input-with-icon" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <div class="app-input-wrapper">
        ${this.label
          ? html`<label class="app-input-label">${this.label}</label>`
          : ""}
        <div
          class="app-input-container ${this._focused
            ? "app-input-focused"
            : ""}"
        >
          ${this.icon
            ? html`<i class="material-icons app-input-icon">${this.icon}</i>`
            : ""}
          <input
            type="${this.type}"
            class="${classes}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            .value="${this._value}"
            @input="${this._handleInput}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />
        </div>
        ${this.error
          ? html`<span class="app-input-error-text">${this.error}</span>`
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-input": AppInput;
  }
}
