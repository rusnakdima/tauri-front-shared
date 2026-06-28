import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-header")
export class AppHeader extends LitElement {
  @property() declare title: string;
  @property({ type: Boolean }) declare showBack: boolean;
  @property() declare breadcrumbs: string;
  constructor() {
    super();
    for (const key of ["title", "showBack", "breadcrumbs"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["title", "showBack", "breadcrumbs"]) {
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
      display: block;
    }

    header {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      background: var(--bg-header, var(--bg-elevated));
      border-bottom: 1px solid var(--border-color);
      min-height: 56px;
      gap: 1rem;
    }

    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      background: var(--bg-elevated);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.15s;
      padding: 0;
      font-size: 1.25rem;
    }

    .back-btn:hover {
      background: var(--bg-hover);
    }

    .title-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .breadcrumb-separator {
      color: var(--text-secondary);
      opacity: 0.5;
    }
  `;

  private _handleBack() {
    this.dispatchEvent(
      new CustomEvent("navigate-back", { bubbles: true, composed: true }),
    );
  }

  private _getBreadcrumbs(): string[] {
    try {
      return JSON.parse(this.breadcrumbs);
    } catch {
      return [];
    }
  }

  override render() {
    const crumbs = this._getBreadcrumbs();

    return html`
      <header>
        ${this.showBack
          ? html`
              <button class="back-btn" @click="${this._handleBack}">
                ←
              </button>
            `
          : ""}
        <div class="title-area">
          <h1>${this.title}</h1>
          ${crumbs.length > 0
            ? html`
                <div class="breadcrumbs">
                  ${crumbs.map(
                    (crumb, i) => html`
                      ${i > 0
                        ? html`<span class="breadcrumb-separator">/</span>`
                        : ""}
                      <span>${crumb}</span>
                    `,
                  )}
                </div>
              `
            : ""}
        </div>
        <slot></slot>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-header": AppHeader;
  }
}
