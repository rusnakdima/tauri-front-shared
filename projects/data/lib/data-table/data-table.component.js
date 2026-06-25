import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
let DataDataTable = class DataDataTable extends LitElement {
  constructor() {
    super(...arguments);
    this.columns = [];
    this.data = [];
    this.selectable = false;
    this.selectedKey = "";
    this.selectedRow = null;
  }
  onRowClick(row) {
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
  isSelected(row) {
    if (!this.selectedKey) return this.selectedRow === row;
    return (
      this.selectedRow !== null &&
      this.selectedRow[this.selectedKey] === row[this.selectedKey]
    );
  }
  static {
    this.styles = css`
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
  }
  render() {
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
};
__decorate(
  [property({ type: Array })],
  DataDataTable.prototype,
  "columns",
  void 0,
);
__decorate(
  [property({ type: Array })],
  DataDataTable.prototype,
  "data",
  void 0,
);
__decorate(
  [property({ type: Boolean })],
  DataDataTable.prototype,
  "selectable",
  void 0,
);
__decorate([property()], DataDataTable.prototype, "selectedKey", void 0);
__decorate([state()], DataDataTable.prototype, "selectedRow", void 0);
DataDataTable = __decorate([customElement("data-data-table")], DataDataTable);
export { DataDataTable };
//# sourceMappingURL=data-table.component.js.map
