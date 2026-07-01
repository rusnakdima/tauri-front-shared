import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-translation-output")
export class AppTranslationOutput extends LitElement {
  @property() declare value: string;
  @property() declare placeholder: string;
  @property() declare id: string;

  private _textarea: HTMLTextAreaElement | null = null;

  constructor() {
    super();
    for (const key of ["value", "placeholder", "id"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["value", "placeholder", "id"]) {
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

    .output-container {
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background-color: var(--bg-elevated);
    }

    textarea {
      width: 100%;
      min-height: 2.5rem;
      padding: 0.5rem 0.75rem;
      padding-right: 2.5rem;
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

    .copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 0.375rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    .copy-btn:hover {
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-color: var(--accent);
    }

    .copy-btn svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  `;

  private _autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  private _handleCopy() {
    if (this.value) {
      navigator.clipboard.writeText(this.value).catch(() => {});
    }
    this.dispatchEvent(
      new CustomEvent("copy", {
        detail: { value: this.value },
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
    return html`
      <div class="output-container">
        <textarea
          id="${this.id || ""}"
          .value="${this.value || ""}"
          placeholder="${this.placeholder || ""}"
          readonly
        ></textarea>
        <button class="copy-btn" type="button" @click="${this._handleCopy}" title="Copy to clipboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
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
    "app-translation-output": AppTranslationOutput;
  }
}
