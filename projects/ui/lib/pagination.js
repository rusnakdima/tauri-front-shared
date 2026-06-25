import { __decorate } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
let AppPagination = class AppPagination extends LitElement {
  constructor() {
    super(...arguments);
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 10;
  }
  static {
    this.styles = css`
      :host {
        display: block;
      }

      .app-pagination {
        @apply flex items-center gap-1;
      }

      .app-pagination-btn {
        @apply w-8 h-8 flex items-center justify-center rounded-lg;
        @apply text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors;
        background: transparent;
        border: none;
        cursor: pointer;
      }

      .app-pagination-btn:disabled {
        @apply opacity-50 cursor-not-allowed;
      }

      .app-pagination-btn i {
        @apply text-xl;
      }

      .app-pagination-page {
        @apply min-w-8 h-8 px-2 flex items-center justify-center rounded-lg;
        @apply text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors;
        background: transparent;
        border: none;
        cursor: pointer;
      }

      .app-pagination-page-active {
        @apply bg-[var(--accent)] text-white hover:bg-[var(--accent)];
      }

      .app-pagination-ellipsis {
        @apply px-1 text-[var(--text-muted)];
      }
    `;
  }
  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  get visiblePages() {
    const pages = [];
    const total = this.totalPages;
    const current = this.currentPage;
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push(-1);
      for (
        let i = Math.max(2, current - 1);
        i <= Math.min(total - 1, current + 1);
        i++
      ) {
        pages.push(i);
      }
      if (current < total - 2) pages.push(-1);
      pages.push(total);
    }
    return pages;
  }
  _goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: page,
        bubbles: true,
        composed: true,
      }),
    );
  }
  _previous() {
    this._goToPage(this.currentPage - 1);
  }
  _next() {
    this._goToPage(this.currentPage + 1);
  }
  _isEllipsis(page) {
    return page === -1;
  }
  render() {
    return html`
      <div class="app-pagination">
        <button
          class="app-pagination-btn"
          ?disabled="${this.currentPage === 1}"
          @click="${this._previous}"
        >
          <i class="material-icons">chevron_left</i>
        </button>

        ${this.visiblePages.map((page) =>
          this._isEllipsis(page)
            ? html`<span class="app-pagination-ellipsis">...</span>`
            : html`
                <button
                  class="app-pagination-page ${page === this.currentPage
                    ? "app-pagination-page-active"
                    : ""}"
                  @click="${() => this._goToPage(page)}"
                >
                  ${page}
                </button>
              `,
        )}

        <button
          class="app-pagination-btn"
          ?disabled="${this.currentPage === this.totalPages}"
          @click="${this._next}"
        >
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
    `;
  }
};
__decorate(
  [property({ type: Number })],
  AppPagination.prototype,
  "totalItems",
  void 0,
);
__decorate(
  [property({ type: Number })],
  AppPagination.prototype,
  "currentPage",
  void 0,
);
__decorate(
  [property({ type: Number })],
  AppPagination.prototype,
  "pageSize",
  void 0,
);
AppPagination = __decorate([customElement("app-pagination")], AppPagination);
export { AppPagination };
//# sourceMappingURL=pagination.js.map
