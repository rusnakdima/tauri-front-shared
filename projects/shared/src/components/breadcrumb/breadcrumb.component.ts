import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  id?: string;
}

@Component({
  selector: "app-breadcrumb",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex items-center gap-1 text-xs text-neutral-500">
      @for (item of items; track item.label; let i = $index) {
        @if (i < items.length - 1) {
          <a
            [href]="item.href || '#'"
            class="hover:text-indigo-600 transition-colors"
            >{{ item.label }}</a
          >
          <span class="material-symbols-rounded text-sm">chevron_right</span>
        } @else {
          <span class="font-semibold text-neutral-800 dark:text-neutral-200">{{
            item.label
          }}</span>
        }
      }
    </nav>
  `,
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Output() itemClick = new EventEmitter<number>();

  onItemClick(index: number, e: Event) {
    this.itemClick.emit(index);
    if (this.items[index]?.href) {
      // allow native navigation; only prevent default when no href
    }
  }
}

registerSchemaComponent("app-breadcrumb", BreadcrumbComponent);
