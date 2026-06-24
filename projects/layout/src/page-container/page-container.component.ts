import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("page-container")
export class PageContainer extends LitElement {
  @property({ type: String }) override title: string = "";
  @property({ type: String }) subtitle: string = "";
  @property({ type: Boolean }) responsivePadding: boolean = true;

  static override styles = css`
    :host {
      display: block;
    }

    .app-page-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .app-page-container-padding {
      padding: 1.5rem 1rem;
    }

    @media (min-width: 640px) {
      .app-page-container-padding {
        padding: 1.5rem 1.5rem;
      }
    }

    @media (min-width: 1024px) {
      .app-page-container-padding {
        padding: 1.5rem 2rem;
      }
    }

    .app-page-container-header {
      margin-bottom: 1.5rem;
    }

    .app-page-container-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .app-page-container-subtitle {
      margin-top: 0.25rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .app-page-container-content {
      flex: 1;
      overflow: auto;
    }
  `;

  override render() {
    return html`
      <div
        class="app-page-container ${this.responsivePadding
          ? "app-page-container-padding"
          : ""}"
      >
        ${this.title || this.subtitle
          ? html`
              <div class="app-page-container-header">
                ${this.title
                  ? html`<h1 class="app-page-container-title">
                      ${this.title}
                    </h1>`
                  : ""}
                ${this.subtitle
                  ? html`<p class="app-page-container-subtitle">
                      ${this.subtitle}
                    </p>`
                  : ""}
              </div>
            `
          : ""}
        <div class="app-page-container-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-container": PageContainer;
  }
}
