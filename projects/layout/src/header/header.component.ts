import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface Breadcrumb {
  label: string;
  link?: string;
}

@customElement("app-header")
export class LayoutHeader extends LitElement {
  @property({ type: String }) override title: string = "";
  @property({ type: Array }) breadcrumbs: Breadcrumb[] = [];

  static override styles = css`
    :host {
      display: block;
    }

    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 3.5rem;
      padding: 0 1rem;
      background: var(--bg-elevated);
      border-bottom: 1px solid var(--border-color);
    }

    .app-header-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .app-header-breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
    }

    .app-header-breadcrumb-home {
      color: var(--text-muted);
      transition: color 0.15s;
      text-decoration: none;
      font-size: 1rem;
    }

    .app-header-breadcrumb-home:hover {
      color: var(--text-primary);
    }

    .app-header-breadcrumb-separator {
      color: var(--text-muted);
    }

    .app-header-breadcrumb-link {
      color: var(--text-secondary);
      transition: color 0.15s;
      text-decoration: none;
    }

    .app-header-breadcrumb-link:hover {
      color: var(--text-primary);
    }

    .app-header-breadcrumb-current {
      color: var(--text-primary);
      font-weight: 500;
    }

    .app-header-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .app-header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;

  private _handleHomeClick(e: Event) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent("home-click", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _handleBreadcrumbClick(e: Event, link?: string) {
    if (!link) {
      e.preventDefault();
    }
  }

  override render() {
    return html`
      <header class="app-header">
        <div class="app-header-left">
          ${this.breadcrumbs.length > 0
            ? html`
                <nav class="app-header-breadcrumbs">
                  <a
                    href="/"
                    class="app-header-breadcrumb-home material-icons"
                    @click="${this._handleHomeClick}"
                    >home</a
                  >
                  ${this.breadcrumbs.map(
                    (crumb, index) => html`
                      <span class="app-header-breadcrumb-separator">/</span>
                      ${crumb.link && index < this.breadcrumbs.length - 1
                        ? html`
                            <a
                              href="${crumb.link}"
                              class="app-header-breadcrumb-link"
                              @click="${(e: Event) =>
                                this._handleBreadcrumbClick(e, crumb.link)}"
                              >${crumb.label}</a
                            >
                          `
                        : html`<span class="app-header-breadcrumb-current"
                            >${crumb.label}</span
                          >`}
                    `,
                  )}
                </nav>
              `
            : ""}
          ${this.title
            ? html`<h1 class="app-header-title">${this.title}</h1>`
            : ""}
        </div>
        <div class="app-header-actions">
          <slot name="actions"></slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "layout-header": LayoutHeader;
  }
}
