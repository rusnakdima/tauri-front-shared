import { __decorate } from "tslib";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
let PaginationComponent = class PaginationComponent {
  constructor() {
    this.totalItems = 0;
    this.currentPage = 1;
    this.pageSize = 10;
    this.pageChange = new EventEmitter();
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
  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.pageChange.emit(page);
  }
  previous() {
    this.goToPage(this.currentPage - 1);
  }
  next() {
    this.goToPage(this.currentPage + 1);
  }
  isEllipsis(page) {
    return page === -1;
  }
};
__decorate([Input()], PaginationComponent.prototype, "totalItems", void 0);
__decorate([Input()], PaginationComponent.prototype, "currentPage", void 0);
__decorate([Input()], PaginationComponent.prototype, "pageSize", void 0);
__decorate([Output()], PaginationComponent.prototype, "pageChange", void 0);
PaginationComponent = __decorate(
  [
    Component({
      selector: "app-pagination",
      standalone: true,
      imports: [CommonModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      templateUrl: "./pagination.component.html",
      styleUrl: "./pagination.component.css",
    }),
  ],
  PaginationComponent,
);
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map
