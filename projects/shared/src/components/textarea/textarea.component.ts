import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-textarea",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label class="text-sm font-medium text-on-surface">{{ label }}</label>
      }
      <textarea
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        [rows]="rows"
        (input)="handleInput($event)"
        (focus)="focused.set(true)"
        (blur)="focused.set(false)"
        class="px-4 py-3 rounded-md bg-surface-container border transition-colors duration-200 resize-none text-on-surface placeholder:text-on-surface-variant outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        [class.border-outline]="!focused() && !error"
        [class.border-primary]="focused() && !error"
        [class.ring-primary]="focused() && !error"
        [class.error]="!!error"
      ></textarea>
      @if (error) {
        <span class="text-sm text-error">{{ error }}</span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    textarea {
      min-height: 80px;
    }
  `],
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
