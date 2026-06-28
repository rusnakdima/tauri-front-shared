import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("data-json-view")
export class DataJsonView extends LitElement {
  @property() declare data: unknown;
  @property({ type: Number }) declare indent: number;
  constructor() {
    super();
    for (const key of ["data", "indent"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["data", "indent"]) {
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


  private highlightJson(json: string): string {
    return json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"([^"]+)":/g, '<span class="jv-key">"$1"</span>:')
      .replace(/: "([^"]*)"(,?)$/gm, ': <span class="jv-string">"$1"</span>$2')
      .replace(
        /: (-?\d+\.?\d*)(,?)$/gm,
        ': <span class="jv-number">$1</span>$2',
      )
      .replace(
        /: (true|false)(,?)$/gm,
        ': <span class="jv-boolean">$1</span>$2',
      )
      .replace(/: (null)(,?)$/gm, ': <span class="jv-null">$1</span>$2');
  }

  private get formatted(): string {
    return JSON.stringify(this.data, null, this.indent);
  }

  static override styles = css`
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
  `;

  override render() {
    const highlighted = this.highlightJson(this.formatted);
    return html` <pre class="app-json-view" .innerHTML=${highlighted}></pre> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "data-json-view": DataJsonView;
  }
}
