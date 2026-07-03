import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-theme-toggle")
export class AppThemeToggle extends LitElement {
  @property({ type: Boolean }) declare isDark: boolean;

  constructor() {
    super();
    for (const key of ["isDark"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["isDark"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        saved[key] = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
      }
    }
    super.connectedCallback();
    for (const [key, value] of Object.entries(saved)) {
      (this as Record<string, unknown>)[key] = value;
    }
    // Initialize isDark from actual DOM state if not already set
    if (!this.isDark) {
      this.isDark = document.documentElement.classList.contains("dark");
    }
  }

  static override styles = css`
    :host {
      display: inline-flex;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background-color: var(--bg-elevated);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
    }

    button:hover {
      background-color: var(--accent);
      color: var(--text-on-accent);
      border-color: var(--accent);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  `;

  private _handleToggle() {
    this.isDark = !this.isDark;
    this.dispatchEvent(
      new CustomEvent("toggle", {
        detail: { isDark: this.isDark },
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
    return html`
      <button
        type="button"
        @click="${this._handleToggle}"
        title="${this.isDark ? "Switch to light" : "Switch to dark"}"
      >
        ${this.isDark
          ? html`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            `
          : html`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            `}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-theme-toggle": AppThemeToggle;
  }
}
