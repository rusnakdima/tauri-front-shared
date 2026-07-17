import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

export interface ButtonGroupItem {
  label: string;
  value: any;
  icon?: string;
}

@Component({
  selector: "app-button-group",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-flex rounded-full shadow-sm"
      [class.rounded-none]="rounded === 'none'"
      role="group"
    >
      @for (item of items; track item.label) {
        <button
          class="px-4 py-2 text-xs font-medium border transition-colors"
          [class.bg-indigo-600]="item.value === value"
          [class.text-white]="item.value === value"
          [class.bg-white]="item.value !== value"
          [class.text-neutral-700]="item.value !== value"
          [class.border-neutral-200]="true"
          [class.first:rounded-s-full]="rounded === 'full'"
          [class.last:rounded-e-full]="rounded === 'full'"
          (click)="valueChange.emit(item.value)"
        >
          {{ item.label }}
        </button>
      }
    </div>
  `,
})
export class ButtonGroupComponent {
  @Input() items: ButtonGroupItem[] = [];
  @Input() value: any = null;
  @Input() rounded: "full" | "md" | "none" = "full";
  @Input() multiple = false;

  @Output() valueChange = new EventEmitter<any>();

  isSelected(item: ButtonGroupItem): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.includes(item.value);
    }
    return this.value === item.value;
  }

  onItemClick(item: ButtonGroupItem) {
    if (this.multiple) {
      const current: any[] = Array.isArray(this.value) ? [...this.value] : [];
      const idx = current.indexOf(item.value);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        current.push(item.value);
      }
      this.value = current;
      this.valueChange.emit(current);
    } else {
      this.value = item.value;
      this.valueChange.emit(item.value);
    }
  }
}

registerSchemaComponent("app-button-group", ButtonGroupComponent);
