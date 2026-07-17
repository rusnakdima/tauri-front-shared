import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-radio",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <label class="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        [name]="name"
        class="w-5 h-5 text-indigo-600 bg-neutral-100 border-neutral-300 focus:ring-indigo-500 dark:bg-neutral-700 dark:border-neutral-600"
      />
      <span class="text-sm text-neutral-700 dark:text-neutral-300">{{
        label
      }}</span>
    </label>
  `,
})
export class RadioComponent {
  @Input() name = "";
  @Input() value = "";
  @Input() checked = false;
  @Input() disabled = false;
  @Output() changed = new EventEmitter<string>();
  @Input() label = "";

  handleChange(_e: Event) {
    this.checked = true;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-radio", RadioComponent);
