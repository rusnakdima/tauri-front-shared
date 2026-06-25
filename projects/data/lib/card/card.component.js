import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let DataCard = class DataCard extends LitElement {
    constructor() {
        super(...arguments);
        this.cardTitle = "";
        this.subtitle = "";
        this.footer = "";
        this.hoverable = false;
        this.elevated = false;
        this.gridCol = "";
        this.gridRow = "";
        this.gridColSpan = 1;
        this.gridRowSpan = 1;
    }
    static { this.styles = css `
    :host {
      display: block;
    }

    .app-card {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      height: 100%;
      box-sizing: border-box;
    }

    .app-card--elevated {
      box-shadow:
        0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    .app-card--hoverable {
      cursor: pointer;
      transition:
        background 150ms ease,
        border-color 150ms ease,
        box-shadow 150ms ease;
    }

    .app-card--hoverable:hover {
      background: var(--bg-hover);
      border-color: var(--accent);
      box-shadow: 0 4px 12px -2px rgb(0 0 0 / 0.15);
    }

    .app-card__header {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .app-card__title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .app-card__subtitle {
      margin: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .app-card__body {
      flex: 1;
    }

    .app-card__footer {
      border-top: 1px solid var(--border-subtle);
      padding-top: 0.75rem;
      margin-top: 0.25rem;
    }
  `; }
    render() {
        const style = {};
        if (this.gridCol)
            style["grid-column"] = this.gridCol;
        if (this.gridRow)
            style["grid-row"] = this.gridRow;
        if (!this.gridCol)
            style["grid-column-span"] = this.gridColSpan;
        if (!this.gridRow)
            style["grid-row-span"] = this.gridRowSpan;
        return html `
      <div
        class="app-card ${this.hoverable ? "app-card--hoverable" : ""} ${this
            .elevated
            ? "app-card--elevated"
            : ""}"
        style=${JSON.stringify(style)}
      >
        ${this.cardTitle || this.subtitle
            ? html `
              <div class="app-card__header">
                ${this.cardTitle
                ? html `<h3 class="app-card__title">${this.cardTitle}</h3>`
                : ""}
                ${this.subtitle
                ? html `<p class="app-card__subtitle">${this.subtitle}</p>`
                : ""}
              </div>
            `
            : ""}
        <div class="app-card__body">
          <slot></slot>
        </div>
        ${this.footer
            ? html `
              <div class="app-card__footer">
                <slot name="footer"></slot>
              </div>
            `
            : ""}
      </div>
    `;
    }
};
__decorate([
    property()
], DataCard.prototype, "cardTitle", void 0);
__decorate([
    property()
], DataCard.prototype, "subtitle", void 0);
__decorate([
    property()
], DataCard.prototype, "footer", void 0);
__decorate([
    property({ type: Boolean })
], DataCard.prototype, "hoverable", void 0);
__decorate([
    property({ type: Boolean })
], DataCard.prototype, "elevated", void 0);
__decorate([
    property()
], DataCard.prototype, "gridCol", void 0);
__decorate([
    property()
], DataCard.prototype, "gridRow", void 0);
__decorate([
    property({ type: Number })
], DataCard.prototype, "gridColSpan", void 0);
__decorate([
    property({ type: Number })
], DataCard.prototype, "gridRowSpan", void 0);
DataCard = __decorate([
    customElement("data-card")
], DataCard);
export { DataCard };
//# sourceMappingURL=card.component.js.map