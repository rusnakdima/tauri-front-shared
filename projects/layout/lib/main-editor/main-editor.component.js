import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
let MainEditor = class MainEditor extends LitElement {
    static styles = css `
    :host {
      display: block;
      height: 100%;
    }
    .main-editor {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-primary, #1a1a1a);
      color: var(--text-secondary, #888);
      font-family: system-ui, sans-serif;
    }
    .placeholder {
      text-align: center;
      padding: 2rem;
    }
    .placeholder-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      opacity: 0.3;
    }
    .placeholder-text {
      font-size: 0.875rem;
    }
  `;
    render() {
        return html `
      <div class="main-editor">
        <div class="placeholder">
          <div class="placeholder-icon">⊞</div>
          <div class="placeholder-text">Canvas Area</div>
        </div>
      </div>
    `;
    }
};
MainEditor = __decorate([
    customElement("app-main-editor")
], MainEditor);
export { MainEditor };
//# sourceMappingURL=main-editor.component.js.map