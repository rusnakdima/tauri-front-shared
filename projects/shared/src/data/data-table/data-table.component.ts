import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

export interface DataTableColumn {
  key: string;
  label: string;
}

@customElement("data-data-table")
export class DataDataTable<
  T extends Record<string, unknown>,
> extends LitElement {
  @property({ type: Array }) columns: DataTableColumn[] = [];
  @property({ type: Array }) data: T[] = [];
  @property({ type: Boolean }) selectable = false;
  @property() selectedKey = "";

  @state() private selectedRow: T | null = null;

  constructor() {
    super();
    // Clean up all class fields that shadow Lit reactive properties
    for (const key of ["columns", "data", "selectable", "selectedKey", "selectedRow"]) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const val = (this as Record<string, unknown>)[key];
        delete (this as Record<string, unknown>)[key];
        (this as Record<string, unknown>)[key] = val;
      }
    }
  }

  private onRowClick(row: T): void {
    if (!this.selectable) return;
    this.selectedRow = this.selectedRow === row ? null : row;
    this.dispatchEvent(
      new CustomEvent("selection-change", {
        detail: this.selectedRow,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private isSelected(row: T): boolean {
    if (!this.selectedKey) return this.selectedRow === row;
    return (
      this.selectedRow !== null &&
      this.selectedRow[this.selectedKey] === row[this.selectedKey]
    );
  }

  static override styles = css`
    :host {
      display: block;
    }

    .app-data-table {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .app-data-table__table {
      width: 100%;
      border-collapse: collapse;
    }

    .app-data-table__head {
      background: var(--bg-tertiary);
    }

    th {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-color);
    }

    .app-data-table__th-check {
      width: 2.5rem;
      color: var(--text-muted);
    }

    td {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-subtle);
    }

    .app-data-table__body tr:last-child td {
      border-bottom: none;
    }

    .app-data-table__body tr {
      cursor: default;
      transition: background 150ms ease;
    }

    .app-data-table__body tr:hover td {
      background: var(--bg-hover);
    }

    .app-data-table__row--selected td {
      background: color-mix(in srgb, var(--accent) 10%, transparent);
    }

    .app-data-table__row--selected:hover td {
      background: color-mix(in srgb, var(--accent) 15%, transparent);
    }

    .app-data-table__td-check {
      width: 2.5rem;
      padding-right: 0;
    }

    .app-data-table__check-icon {
      font-size: 1.25rem;
      color: var(--accent);
      cursor: pointer;
    }

    .app-data-table__empty {
      text-align: center;
      color: var(--text-muted);
      padding: 2rem;
    }
  `;

  override render() {
    return html`
      <div class="app-data-table">
        <table class="app-data-table__table">
          <thead class="app-data-table__head">
            <tr>
              ${this.selectable
                ? html`
                    <th class="app-data-table__th-check">
                      <span class="material-icons" style="font-size: 1rem;"
                        >check</span
                      >
                    </th>
                  `
                : ""}
              ${this.columns.map((col) => html`<th>${col.label}</th>`)}
            </tr>
          </thead>
          <tbody class="app-data-table__body">
            ${this.data.length > 0
              ? this.data.map(
                  (row) => html`
                    <tr
                      class="${this.isSelected(row)
                        ? "app-data-table__row--selected"
                        : ""}"
                      @click=${() => this.onRowClick(row)}
                    >
                      ${this.selectable
                        ? html`
                            <td class="app-data-table__td-check">
                              <span
                                class="material-icons app-data-table__check-icon"
                              >
                                ${this.isSelected(row)
                                  ? "check_box"
                                  : "check_box_outline_blank"}
                              </span>
                            </td>
                          `
                        : ""}
                      ${this.columns.map(
                        (col) => html`<td>${row[col.key]}</td>`,
                      )}
                    </tr>
                  `,
                )
              : html`
                  <tr>
                    <td
                      colspan="${this.columns.length +
                      (this.selectable ? 1 : 0)}"
                      class="app-data-table__empty"
                    >
                      No data available
                    </td>
                  </tr>
                `}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "data-data-table": DataDataTable<Record<string, unknown>>;
  }
}
