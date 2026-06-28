import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
let DataTableView = class DataTableView extends LitElement {
    constructor() {
        super();
        this.sortKey = "";
        this.sortDir = "asc";
        this.currentPage = 1;
        for (const key of ["columns", "data", "sortable", "pageSize", "total"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const val = this[key];
                delete this[key];
                this[key] = val;
            }
        }
    }
    connectedCallback() {
        const saved = {};
        for (const key of ["columns", "data", "sortable", "pageSize", "total"]) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                saved[key] = this[key];
                delete this[key];
            }
        }
        super.connectedCallback();
        for (const [key, value] of Object.entries(saved)) {
            this[key] = value;
        }
    }
    get totalPages() {
        return Math.ceil(this.total / this.pageSize) || 1;
    }
    get pagedData() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.data.slice(start, start + this.pageSize);
    }
    onSort(col) {
        if (!this.sortable || !col.sortable)
            return;
        if (this.sortKey === col.key) {
            this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
        }
        else {
            this.sortKey = col.key;
            this.sortDir = "asc";
        }
        this.dispatchEvent(new CustomEvent("sort-change", {
            detail: { key: this.sortKey, direction: this.sortDir },
            bubbles: true,
            composed: true,
        }));
    }
    onPage(page) {
        this.currentPage = page;
        this.dispatchEvent(new CustomEvent("page-change", {
            detail: { page, pageSize: this.pageSize },
            bubbles: true,
            composed: true,
        }));
    }
    prevPage() {
        if (this.currentPage > 1)
            this.onPage(this.currentPage - 1);
    }
    nextPage() {
        if (this.currentPage < this.totalPages)
            this.onPage(this.currentPage + 1);
    }
    getSortIcon(col) {
        if (!this.sortable || !col.sortable)
            return "";
        if (this.sortKey === col.key) {
            return this.sortDir === "asc" ? "expand_less" : "expand_more";
        }
        return "unfold_more";
    }
    static { this.styles = css `
    :host {
      display: block;
    }

    .app-table-view {
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .app-table-view__table {
      width: 100%;
      border-collapse: collapse;
    }

    .app-table-view__head {
      background: var(--bg-tertiary);
    }

    .app-table-view__head tr {
      border-bottom: 1px solid var(--border-color);
    }

    th {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-subtle);
      font-weight: 600;
    }

    .app-table-view__th--sortable {
      cursor: pointer;
      user-select: none;
    }

    .app-table-view__th--sortable:hover {
      background: var(--bg-hover);
    }

    .app-table-view__th-inner {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .app-table-view__sort-icon {
      font-size: 1rem;
      color: var(--text-muted);
    }

    td {
      text-align: left;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border-subtle);
    }

    .app-table-view__body tr:last-child td {
      border-bottom: none;
    }

    .app-table-view__body tr:hover td {
      background: var(--bg-hover);
    }

    .app-table-view__empty {
      text-align: center;
      color: var(--text-muted);
      padding: 2rem;
    }

    .app-table-view__pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-top: 1px solid var(--border-subtle);
    }

    .app-table-view__page-btn {
      background: none;
      border: 1px solid var(--border-color);
      border-radius: 0.25rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-primary);
      padding: 0;
    }

    .app-table-view__page-btn:hover:not(:disabled) {
      background: var(--bg-hover);
      border-color: var(--accent);
    }

    .app-table-view__page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .app-table-view__page-info {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
  `; }
    render() {
        return html `
      <div class="app-table-view">
        <table class="app-table-view__table">
          <thead class="app-table-view__head">
            <tr>
              ${this.columns.map((col) => html `
                  <th
                    class="${this.sortable && col.sortable
            ? "app-table-view__th--sortable"
            : ""}"
                    style="${col.width ? `width: ${col.width}` : ""}"
                    @click=${() => this.onSort(col)}
                  >
                    <span class="app-table-view__th-inner">
                      ${col.label}
                      ${this.sortable && col.sortable
            ? html `
                            <span
                              class="material-icons app-table-view__sort-icon"
                            >
                              ${this.getSortIcon(col)}
                            </span>
                          `
            : ""}
                    </span>
                  </th>
                `)}
            </tr>
          </thead>
          <tbody class="app-table-view__body">
            ${this.pagedData.length > 0
            ? this.pagedData.map((row) => html `
                    <tr>
                      ${this.columns.map((col) => html `<td>${row[col.key]}</td>`)}
                    </tr>
                  `)
            : html `
                  <tr>
                    <td
                      colspan="${this.columns.length}"
                      class="app-table-view__empty"
                    >
                      No data available
                    </td>
                  </tr>
                `}
          </tbody>
        </table>

        ${this.totalPages > 1
            ? html `
              <div class="app-table-view__pagination">
                <button
                  class="app-table-view__page-btn"
                  @click=${this.prevPage}
                  ?disabled=${this.currentPage === 1}
                >
                  <span class="material-icons">chevron_left</span>
                </button>
                <span class="app-table-view__page-info">
                  Page ${this.currentPage} of ${this.totalPages}
                </span>
                <button
                  class="app-table-view__page-btn"
                  @click=${this.nextPage}
                  ?disabled=${this.currentPage === this.totalPages}
                >
                  <span class="material-icons">chevron_right</span>
                </button>
              </div>
            `
            : ""}
      </div>
    `;
    }
};
__decorate([
    property({ type: Array })
], DataTableView.prototype, "columns", void 0);
__decorate([
    property({ type: Array })
], DataTableView.prototype, "data", void 0);
__decorate([
    property({ type: Boolean })
], DataTableView.prototype, "sortable", void 0);
__decorate([
    property({ type: Number })
], DataTableView.prototype, "pageSize", void 0);
__decorate([
    property({ type: Number })
], DataTableView.prototype, "total", void 0);
__decorate([
    state()
], DataTableView.prototype, "sortKey", void 0);
__decorate([
    state()
], DataTableView.prototype, "sortDir", void 0);
__decorate([
    state()
], DataTableView.prototype, "currentPage", void 0);
DataTableView = __decorate([
    customElement("data-table-view")
], DataTableView);
export { DataTableView };
//# sourceMappingURL=table-view.component.js.map