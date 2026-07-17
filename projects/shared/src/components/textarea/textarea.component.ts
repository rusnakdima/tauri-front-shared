import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-textarea",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      @if (label) {
        <label
          class="block mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
          >{{ label }}</label
        >
      }
      <textarea
        class="block w-full p-3 text-sm text-neutral-900 dark:text-white bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-300 dark:border-neutral-700 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        [rows]="rows"
        [placeholder]="placeholder"
      ></textarea>
    </div>
  `,
})
export class TextareaComponent {
  @Input() label = "";
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() value = "";
  @Input() rows = 4;
  @Input() error = "";
  @Input() flexGrow = false;
  @Output() input = new EventEmitter<string>();

  focused = signal(false);

  handleInput(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.input.emit(this.value);
  }
}

registerSchemaComponent("app-textarea", TextareaComponent);
