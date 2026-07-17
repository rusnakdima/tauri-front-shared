import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

export interface ListItem {
  icon?: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
  value?: any;
}

@Component({
  selector: "app-list",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="divide-y divide-neutral-100 dark:divide-neutral-800">
      @for (item of items; track item.title) {
        <li class="flex items-start gap-3 py-3">
          @if (item.icon) {
            <div
              class="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center shrink-0"
            >
              <span
                class="material-symbols-rounded text-indigo-600 dark:text-indigo-400"
                >{{ item.icon }}</span
              >
            </div>
          }
          <div class="flex-1 min-w-0">
            <p
              class="text-xs font-bold text-neutral-800 dark:text-white truncate"
            >
              {{ item.title }}
            </p>
            @if (item.subtitle) {
              <p class="text-[10px] text-neutral-400 dark:text-neutral-500">
                {{ item.subtitle }}
              </p>
            }
          </div>
          @if (item.timestamp) {
            <span class="text-[10px] text-neutral-400">{{
              item.timestamp
            }}</span>
          }
        </li>
      }
    </ul>
  `,
})
export class ListComponent {
  @Input() items: ListItem[] = [];
  @Input() selectable = false;
  @Input() divided = true;

  @Output() itemSelected = new EventEmitter<any>();

  onItemClick(item: ListItem) {
    if (!this.selectable) return;
    this.itemSelected.emit(item.value);
  }
}

registerSchemaComponent("app-list", ListComponent);
