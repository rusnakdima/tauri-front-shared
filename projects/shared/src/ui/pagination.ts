import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("app-pagination")
export class AppPagination extends LitElement {
  @property({ type: Number }) totalItems = 0;
  @property({ type: Number }) currentPage = 1;
  @property({ type: Number }) pageSize = 10;

  static override styles = css`
    :host {
      display: block;
    }

    .app-pagination {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .app-pagination-btn {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      color: var(--text-secondary);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background-color 0.15s;
    }
    .app-pagination-btn:hover {
      background-color: var(--bg-hover);
    }

    .app-pagination-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .app-pagination-btn i {
      font-size: 1.25rem;
    }

    .app-pagination-page {
      min-width: 2rem;
      height: 2rem;
      padding: 0 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background-color 0.15s;
    }
    .app-pagination-page:hover {
      background-color: var(--bg-hover);
    }

    .app-pagination-page-active {
      background-color: var(--accent);
      color: var(--text-on-accent);
    }
    .app-pagination-page-active:hover {
      background-color: var(--accent);
    }

    .app-pagination-ellipsis {
      padding: 0 0.25rem;
      color: var(--text-muted);
    }
  `;

  private get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  private get visiblePages(): number[] {
    const pages: number[] = [];
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

  private _goToPage(page: number) {
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

  private _previous() {
    this._goToPage(this.currentPage - 1);
  }

  private _next() {
    this._goToPage(this.currentPage + 1);
  }

  private _isEllipsis(page: number): boolean {
    return page === -1;
  }

  override render() {
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
}
