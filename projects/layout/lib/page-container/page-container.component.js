import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let PageContainer = class PageContainer extends LitElement {
    title = "";
    subtitle = "";
    responsivePadding = true;
    static styles = css `
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
    render() {
        return html `
      <div
        class="app-page-container ${this.responsivePadding
            ? "app-page-container-padding"
            : ""}"
      >
        ${this.title || this.subtitle
            ? html `
              <div class="app-page-container-header">
                ${this.title
                ? html `<h1 class="app-page-container-title">
                      ${this.title}
                    </h1>`
                : ""}
                ${this.subtitle
                ? html `<p class="app-page-container-subtitle">
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
};
__decorate([
    property({ type: String })
], PageContainer.prototype, "title", void 0);
__decorate([
    property({ type: String })
], PageContainer.prototype, "subtitle", void 0);
__decorate([
    property({ type: Boolean })
], PageContainer.prototype, "responsivePadding", void 0);
PageContainer = __decorate([
    customElement("page-container")
], PageContainer);
export { PageContainer };
//# sourceMappingURL=page-container.component.js.map