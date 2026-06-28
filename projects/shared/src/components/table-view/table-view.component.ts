import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface TableColumn {
  name: string;
  key: string;
}

@customElement("app-table-view")
export class AppTableView extends LitElement {
  @property() declare columns: string;
  @property() declare data: string;
  constructor() {
    super();
    for (const key of ["columns", "data"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["columns", "data"]) {
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


  private _getColumns(): TableColumn[] {
    try {
      return JSON.parse(this.columns);
    } catch {
      return [];
    }
  }

  private _getData(): Record<string, unknown>[] {
    try {
      return JSON.parse(this.data);
    } catch {
      return [];
    }
  }

  static override styles = css`
    :host {
      display: block;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    th {
      text-align: left;
      padding: 0.75rem 1rem;
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      font-weight: 600;
      border-bottom: 1px solid var(--border-color);
    }

    td {
      padding: 0.75rem 1rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-color);
    }

    tr:hover td {
      background-color: var(--bg-hover);
    }
  `;

  override render() {
    const cols = this._getColumns();
    const rows = this._getData();

    return html`
      <table>
        <thead>
          <tr>
            ${cols.map((col) => html`<th>${col.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${rows.map(
            (row) => html`
              <tr>
                ${cols.map((col) => html`<td>${row[col.key] ?? ""}</td>`)}
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-table-view": AppTableView;
  }
}