import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface LanguageOption {
  code: string;
  name: string;
}

@customElement("app-language-selector")
export class AppLanguageSelector extends LitElement {
  @property() declare languages: string;
  @property() declare value: string;
  @property() declare label: string;
  @property() declare labelId: string;

  constructor() {
    super();
    for (const key of ["languages", "value", "label", "labelId"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["languages", "value", "label", "labelId"]) {
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
      flex-direction: column;
      gap: 0.25rem;
    }

    .selector-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .select-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    select {
      appearance: none;
      -webkit-appearance: none;
      padding: 0.5rem 2rem 0.5rem 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      font-size: 0.875rem;
      font-family: inherit;
      cursor: pointer;
      outline: none;
      transition: border-color 0.15s;
    }

    select:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }

    .chevron-icon {
      position: absolute;
      right: 0.5rem;
      pointer-events: none;
      width: 1rem;
      height: 1rem;
      color: var(--text-muted);
    }
  `;

  private _handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: select.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _getParsedLanguages(): LanguageOption[] {
    try {
      return JSON.parse(this.languages || "[]");
    } catch {
      return [];
    }
  }

  override render() {
    const langs = this._getParsedLanguages();
    return html`
      ${this.label
        ? html`<span class="selector-label" id="${this.labelId || ""}">${this.label}</span>`
        : ""}
      <div class="select-wrapper">
        <select
          .value="${this.value || ""}"
          aria-labelledby="${this.labelId || ""}"
          @change="${this._handleChange}"
        >
          ${langs.map(
            (lang) => html`<option value="${lang.code}">${lang.name}</option>`,
          )}
        </select>
        <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-language-selector": AppLanguageSelector;
  }
}
