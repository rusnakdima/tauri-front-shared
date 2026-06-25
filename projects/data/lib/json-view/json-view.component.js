import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let DataJsonView = class DataJsonView extends LitElement {
    constructor() {
        super(...arguments);
        this.data = null;
        this.indent = 2;
    }
    highlightJson(json) {
        return json
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"([^"]+)":/g, '<span class="jv-key">"$1"</span>:')
            .replace(/: "([^"]*)"(,?)$/gm, ': <span class="jv-string">"$1"</span>$2')
            .replace(/: (-?\d+\.?\d*)(,?)$/gm, ': <span class="jv-number">$1</span>$2')
            .replace(/: (true|false)(,?)$/gm, ': <span class="jv-boolean">$1</span>$2')
            .replace(/: (null)(,?)$/gm, ': <span class="jv-null">$1</span>$2');
    }
    get formatted() {
        return JSON.stringify(this.data, null, this.indent);
    }
    static { this.styles = css `
    :host {
      display: block;
    }

    .app-json-view {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      padding: 1rem;
      margin: 0;
      font-family: "Fira Code", "Cascadia Code", "JetBrains Mono", monospace;
      font-size: 0.8125rem;
      line-height: 1.6;
      color: var(--text-primary);
      overflow-x: auto;
      white-space: pre;
    }

    .jv-key {
      color: #9cdcfe;
    }

    .jv-string {
      color: #ce9178;
    }

    .jv-number {
      color: #b5cea8;
    }

    .jv-boolean {
      color: #569cd6;
    }

    .jv-null {
      color: #808080;
    }
  `; }
    render() {
        const highlighted = this.highlightJson(this.formatted);
        return html ` <pre class="app-json-view" .innerHTML=${highlighted}></pre> `;
    }
};
__decorate([
    property()
], DataJsonView.prototype, "data", void 0);
__decorate([
    property({ type: Number })
], DataJsonView.prototype, "indent", void 0);
DataJsonView = __decorate([
    customElement("data-json-view")
], DataJsonView);
export { DataJsonView };
//# sourceMappingURL=json-view.component.js.map