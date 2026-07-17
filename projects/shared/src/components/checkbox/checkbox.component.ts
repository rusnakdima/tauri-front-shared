import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-checkbox",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <label class="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        class="w-5 h-5 text-indigo-600 bg-neutral-100 border-neutral-300 rounded focus:ring-indigo-500 dark:bg-neutral-700 dark:border-neutral-600"
      />
      <span class="text-sm text-neutral-700 dark:text-neutral-300">{{
        label
      }}</span>
    </label>
  `,
})
export class CheckboxComponent {
  @Input() checked = false;
  @Input() label = "";
  @Input() disabled = false;
  @Output() changed = new EventEmitter<boolean>();

  handleChange(e: Event) {
    this.changed.emit((e.target as HTMLInputElement).checked);
  }
}

registerSchemaComponent("app-checkbox", CheckboxComponent);
