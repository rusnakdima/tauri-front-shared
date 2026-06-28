import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-footer")
export class LayoutFooter extends LitElement {
  @property({ type: String }) declare text: string;
  @property({ type: Boolean }) declare showVersion: boolean;
  @property({ type: String }) declare version: string;
  constructor() {
    super();
    for (const key of ["text", "showVersion", "version"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["text", "showVersion", "version"]) {
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


  private get _currentYear(): number {
    return new Date().getFullYear();
  }

  static override styles = css`
    :host {
      display: block;
    }

    .app-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
    }

    .app-footer-text {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .app-footer-version {
      font-size: 0.75rem;
      color: var(--text-muted);
      padding: 0.125rem 0.5rem;
      background: var(--bg-tertiary);
      border-radius: 0.25rem;
    }
  `;

  override render() {
    return html`
      <footer class="app-footer">
        ${this.text
          ? html`<span class="app-footer-text">${this.text}</span>`
          : html`<span class="app-footer-text">© ${this._currentYear}</span>`}
        ${this.showVersion
          ? html`<span class="app-footer-version">v${this.version}</span>`
          : ""}
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "layout-footer": LayoutFooter;
  }
}
