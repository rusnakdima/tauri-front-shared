import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-json-view")
export class AppJsonView extends LitElement {
  @property() declare data: string | object;
  constructor() {
    super();
    for (const key of ["data"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["data"]) {
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


  private _getFormattedJson(): string {
    try {
      const parsed =
        typeof this.data === "string" ? JSON.parse(this.data) : this.data;
      return JSON.stringify(parsed, null, 2);
    } catch {
      return String(this.data);
    }
  }

  static override styles = css`
    :host {
      display: block;
    }

    .json-container {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      padding: 1rem;
      font-family: monospace;
      font-size: 0.875rem;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .json-key {
      color: var(--accent);
    }

    .json-string {
      color: var(--success);
    }

    .json-number {
      color: var(--warning);
    }

    .json-boolean {
      color: var(--error);
    }

    .json-null {
      color: var(--text-muted);
    }
  `;

  private _syntaxHighlight(json: string): ReturnType<typeof html>[] {
    const result: ReturnType<typeof html>[] = [];
    const lines = json.split("\n");

    lines.forEach((line, lineIndex) => {
      const processed = line.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
        (match) => {
          let cls = "json-number";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "json-key";
              return `<span class="${cls}">${match}</span>`;
            } else {
              cls = "json-string";
            }
          } else if (/true|false/.test(match)) {
            cls = "json-boolean";
          } else if (/null/.test(match)) {
            cls = "json-null";
          }
          return `<span class="${cls}">${match}</span>`;
        },
      );
      result.push(html`${processed}${lineIndex < lines.length - 1 ? html`<br/>` : ""}`);
    });

    return result;
  }

  override render() {
    const formatted = this._getFormattedJson();
    return html`
      <div class="json-container">
        ${this._syntaxHighlight(formatted)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-json-view": AppJsonView;
  }
}