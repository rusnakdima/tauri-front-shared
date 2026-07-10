import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-pagination",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, ApplyThemeDirective],
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() currentPage = 0;
  @Input() pageSize = 50;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize) || 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  get hasPrevPage(): boolean {
    return this.currentPage > 0;
  }

  get startIndex(): number {
    return this.currentPage * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalItems);
  }

  nextPage() {
    if (this.hasNextPage) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.hasPrevPage) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  firstPage() {
    this.pageChange.emit(0);
  }

  lastPage() {
    this.pageChange.emit(this.totalPages - 1);
  }

  onPageSizeChange(size: number) {
    this.pageSizeChange.emit(size);
    this.pageChange.emit(0);
  }
}

registerSchemaComponent("app-pagination", PaginationComponent);
