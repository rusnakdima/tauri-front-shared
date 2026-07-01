import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-text-input")
export class AppTextInput extends LitElement {
  @property() declare value: string;
  @property() declare placeholder: string;
  @property() declare charCount: string;
  @property({ type: Number }) declare maxChars: number;
  @property() declare id: string;
  @property({ type: Boolean }) declare clearable: boolean;

  private _textarea: HTMLTextAreaElement | null = null;

  constructor() {
    super();
    for (const key of ["value", "placeholder", "charCount", "maxChars", "id", "clearable"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["value", "placeholder", "charCount", "maxChars", "id", "clearable"]) {
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
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-elevated);
      transition: border-color 0.15s;
    }

    .input-container:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    textarea {
      width: 100%;
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      border: none;
      background: transparent;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
      resize: none;
      outline: none;
      overflow: hidden;
    }

    textarea::placeholder {
      color: var(--text-muted);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.25rem 0.75rem 0.375rem;
      border-top: 1px solid var(--border-color);
    }

    .char-count {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .clear-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    .clear-btn:hover {
      background-color: var(--bg-hover);
      color: var(--text-primary);
    }

    .clear-btn svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  `;

  private _handleInput(e: Event) {
    const textarea = e.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this._autoResize(textarea);
    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value: textarea.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  private _handleClear() {
    this.value = "";
    if (this._textarea) {
      this._textarea.style.height = "auto";
    }
    this.dispatchEvent(
      new CustomEvent("clear", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has("value") && this._textarea) {
      this._autoResize(this._textarea);
    }
  }

  override render() {
    const displayCount = this.charCount || `${this.value?.length || 0}${this.maxChars ? `/${this.maxChars}` : ""}`;
    return html`
      <div class="input-container">
        <textarea
          id="${this.id || ""}"
          .value="${this.value || ""}"
          placeholder="${this.placeholder || ""}"
          @input="${this._handleInput}"
          @textarea="${(e: Event) => this._autoResize(e.target as HTMLTextAreaElement)}"
        ></textarea>
        <div class="footer">
          <span class="char-count">${displayCount}</span>
          ${this.clearable
            ? html`
                <button class="clear-btn" type="button" @click="${this._handleClear}" title="Clear">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              `
            : ""}
        </div>
      </div>
    `;
  }

  override firstUpdated() {
    this._textarea = this.shadowRoot?.querySelector("textarea") ?? null;
    if (this._textarea) {
      this._autoResize(this._textarea);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-text-input": AppTextInput;
  }
}
