import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

export interface FabItem {
  icon: string;
  label: string;
  value: any;
}

@Component({
  selector: "app-fab",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-center">
      @if (items && items.length) {
        <div class="flex flex-col items-center hidden mb-4 space-y-2">
          @for (item of items; track item.label) {
            <button
              class="w-12 h-12 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
              (click)="selectItem(item)"
            >
              <span
                class="material-symbols-rounded text-xl text-neutral-600 dark:text-neutral-300"
                >{{ item.icon }}</span
              >
            </button>
          }
        </div>
      }
      <button
        class="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all"
        (click)="onMainClick()"
      >
        <span class="material-symbols-rounded text-2xl">{{ icon }}</span>
      </button>
    </div>
  `,
})
export class FabComponent {
  @Input() icon = "add";
  @Input() label = "";
  @Input() position: "bottom-right" | "bottom-left" = "bottom-right";
  @Input() items?: FabItem[];

  @Output() mainClick = new EventEmitter<void>();
  @Output() actionSelected = new EventEmitter<any>();

  open = false;

  onMainClick() {
    if (this.items && this.items.length) {
      this.open = !this.open;
    }
    this.mainClick.emit();
  }

  selectItem(item: FabItem) {
    this.actionSelected.emit(item.value);
    this.open = false;
  }
}

registerSchemaComponent("app-fab", FabComponent);
