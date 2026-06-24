import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let LayoutFooter = class LayoutFooter extends LitElement {
    text = "";
    showVersion = true;
    version = "1.0.0";
    get _currentYear() {
        return new Date().getFullYear();
    }
    static styles = css `
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
    render() {
        return html `
      <footer class="app-footer">
        ${this.text
            ? html `<span class="app-footer-text">${this.text}</span>`
            : html `<span class="app-footer-text">© ${this._currentYear}</span>`}
        ${this.showVersion
            ? html `<span class="app-footer-version">v${this.version}</span>`
            : ""}
      </footer>
    `;
    }
};
__decorate([
    property({ type: String })
], LayoutFooter.prototype, "text", void 0);
__decorate([
    property({ type: Boolean })
], LayoutFooter.prototype, "showVersion", void 0);
__decorate([
    property({ type: String })
], LayoutFooter.prototype, "version", void 0);
LayoutFooter = __decorate([
    customElement("app-footer")
], LayoutFooter);
export { LayoutFooter };
//# sourceMappingURL=footer.component.js.map