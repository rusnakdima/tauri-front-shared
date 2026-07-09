import {
  Component,
  Input,
  Output,
  EventEmitter,
  computed,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-pagination",
  standalone: true,
  template: `
    <div class="pagination">
      <button [disabled]="page <= 1" (click)="goTo(page - 1)">&laquo;</button>
      @for (p of visiblePages; track p) {
        @if (p === "...") {
          <span class="ellipsis">&hellip;</span>
        } @else {
          <button [class.active]="p === page" (click)="goTo(+p)">
            {{ p }}
          </button>
        }
      }
      <button [disabled]="page >= totalPages" (click)="goTo(page + 1)">
        &raquo;
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .pagination {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        height: 2rem;
        padding: 0 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 0.375rem;
        background-color: var(--bg-elevated);
        color: var(--text-primary);
        font-size: 0.875rem;
        cursor: pointer;
        transition: background-color 0.15s;
      }
      button:hover:not(:disabled) {
        background-color: var(--bg-hover);
      }
      button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      button.active {
        background-color: var(--accent);
        border-color: var(--accent);
        color: var(--text-on-accent);
      }
      .ellipsis {
        padding: 0 0.25rem;
        color: var(--text-secondary);
      }
    `,
  ],
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() total = 1;
  @Input() pageSize = 10;
  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  get visiblePages(): (number | string)[] {
    const tp = this.totalPages;
    if (tp <= 7) return Array.from({ length: tp }, (_, i) => i + 1);
    const pages: (number | string)[] = [];
    if (this.page <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...", tp);
    } else if (this.page >= tp - 3) {
      pages.push(1, "...");
      for (let i = tp - 4; i <= tp; i++) pages.push(i);
    } else {
      pages.push(1, "...");
      for (let i = this.page - 1; i <= this.page + 1; i++) pages.push(i);
      pages.push("...", tp);
    }
    return pages;
  }

  goTo(p: number) {
    if (p < 1 || p > this.totalPages || p === this.page) return;
    this.page = p;
    this.pageChanged.emit(p);
  }
}

registerSchemaComponent("app-pagination", PaginationComponent);
