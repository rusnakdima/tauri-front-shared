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
  @property() type: InputType = "text";
  @property() placeholder = "";
  @property() label: string | null = null;
  @property({ type: Boolean }) disabled = false;
  @property() error: string | null = null;
  @property() icon: string | null = null;

  @state() private _value = "";
  @state() private _focused = false;

  static override styles = css`
    :host {
      display: block;
    }

    .app-input-wrapper {
      @apply flex flex-col gap-1;
    }

    .app-input-label {
      @apply text-sm font-medium text-[var(--text-primary)];
    }

    .app-input-container {
      @apply relative flex items-center;
    }

    .app-input {
      @apply w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)];
      @apply placeholder:text-[var(--text-muted)];
      @apply transition-all outline-none;
      border: 1px solid var(--border-color);
      box-sizing: border-box;
    }

    .app-input:focus {
      @apply border-[var(--accent)] ring-1 ring-[var(--accent)];
    }

    .app-input-default:focus {
      @apply border-[var(--accent)] ring-1 ring-[var(--accent)];
    }

    .app-input-error {
      @apply border-[var(--error)] ring-1 ring-[var(--error)];
    }

    .app-input-with-icon {
      @apply pl-10;
    }

    .app-input-icon {
      @apply absolute left-3 text-[var(--text-muted)] text-xl;
    }

    .app-input-focused .app-input-icon {
      @apply text-[var(--accent)];
    }

    .app-input:disabled {
      @apply opacity-50 cursor-not-allowed bg-[var(--bg-tertiary)];
    }

    .app-input-error-text {
      @apply text-xs text-[var(--error)];
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
