import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      @if (label) {
        <label
          class="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1"
          >{{ label }}</label
        >
      }
      <input
        class="block w-full px-4 py-3 text-sm bg-transparent rounded-2xl border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white appearance-none focus:outline-none focus:border-indigo-600 focus:ring-0 transition-colors"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (input)="valueChange.emit($any($event.target).value)"
        [disabled]="disabled"
      />
      @if (error) {
        <p
          class="mt-1 text-xs text-rose-600 dark:text-rose-500 flex items-center gap-1"
        >
          <span class="material-symbols-rounded text-sm">error</span>
          {{ error }}
        </p>
      }
    </div>
  `,
})
export class InputComponent {
  @Input() type: "text" | "email" | "password" | "number" | "tel" | "url" =
    "text";
  @Input() placeholder = "";
  @Input() label = "";
  @Input() icon = "";
  @Input() disabled = false;
  @Input() value = "";
  @Input() error = "";
  @Output() input = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();

  focused = signal(false);

  handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.input.emit(this.value);
  }
}

registerSchemaComponent("app-input", InputComponent);
