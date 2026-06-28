import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface DataTableColumn {
  name: string;
  key: string;
}

@customElement("app-data-table")
export class AppDataTable extends LitElement {
  @property() declare columns: string;
  @property() declare data: string;
  @property({ type: Boolean }) declare selectable: boolean;
  constructor() {
    super();
    for (const key of ["columns", "data", "selectable"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  override connectedCallback(): void {
    const saved: Record<string, unknown> = {};
    for (const key of ["columns", "data", "selectable"]) {
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


  private _selectedIndex: number | null = null;

  private _getColumns(): DataTableColumn[] {
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

  private _handleRowClick(index: number) {
    if (!this.selectable) return;
    this._selectedIndex = index;
    this.dispatchEvent(
      new CustomEvent("rowSelect", {
        detail: { index },
        bubbles: true,
        composed: true,
      }),
    );
    this.requestUpdate();
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

    tr {
      cursor: default;
    }

    tr:hover td {
      background-color: var(--bg-hover);
    }

    tr.selected td {
      background-color: var(--accent);
      color: var(--text-on-accent);
    }

    tr.selectable {
      cursor: pointer;
    }

    .radio-cell {
      width: 2rem;
    }

    .radio {
      width: 1rem;
      height: 1rem;
      border: 2px solid var(--border-color);
      border-radius: 50%;
      display: inline-block;
    }

    tr.selected .radio {
      border-color: var(--text-on-accent);
      background-color: var(--text-on-accent);
    }
  `;

  override render() {
    const cols = this._getColumns();
    const rows = this._getData();

    return html`
      <table>
        <thead>
          <tr>
            ${this.selectable ? html`<th class="radio-cell"></th>` : ""}
            ${cols.map((col) => html`<th>${col.name}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${rows.map(
            (row, index) => html`
              <tr
                class="${this._selectedIndex === index
                  ? "selected"
                  : ""} ${this.selectable ? "selectable" : ""}"
                @click="${() => this._handleRowClick(index)}"
              >
                ${this.selectable
                  ? html`<td class="radio-cell"><span class="radio"></span></td>`
                  : ""}
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
    "app-data-table": AppDataTable;
  }
}