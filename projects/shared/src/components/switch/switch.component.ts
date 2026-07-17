import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-switch",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      class="inline-flex items-center justify-between w-full cursor-pointer"
    >
      <span
        class="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >{{ label }}</span
      >
      <input
        type="checkbox"
        class="sr-only peer"
        [checked]="checked"
        (change)="checkedChange.emit($any($event.target).checked)"
      />
      <div
        class="relative w-11 h-6 bg-neutral-200 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-indigo-600"
      ></div>
    </label>
  `,
})
export class SwitchComponent {
  @Input() checked = false;
  @Input() label = "";
  @Input() disabled = false;
  @Output() changed = new EventEmitter<boolean>();
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.changed.emit(this.checked);
    }
  }

  getSwitchClasses(): string {
    const base =
      "w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
    const bg = this.checked ? "bg-primary" : "bg-outline";
    return `${base} ${bg}`;
  }
}

registerSchemaComponent("app-switch", SwitchComponent);
