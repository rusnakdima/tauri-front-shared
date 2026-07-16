import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-1.5">
      @if (label) {
        <label class="text-sm font-medium text-on-surface">{{ label }}</label>
      }
      <div
        class="flex items-center gap-2 h-10 px-4 rounded-md bg-surface-container border transition-colors duration-200"
        [class.border-outline]="!focused() && !error"
        [class.border-primary]="focused() && !error"
        [class.border-error]="!!error"
        [class.ring-2]="focused()"
        [class.ring-primary]="focused() && !error"
        [class.ring-error]="focused() && error"
      >
        @if (icon) {
          <app-icon class="w-5 h-5 text-on-surface-variant flex-shrink-0" [icon]="icon" [size]="20" />
        }
        <input
          [attr.type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="handleInput($event)"
          (focus)="focused.set(true)"
          (blur)="focused.set(false); blurred.emit()"
          class="flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      @if (error) {
        <span class="text-sm text-error">{{ error }}</span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class InputComponent {
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() placeholder = "";
  @Input() label = "";
  @Input() icon = "";
  @Input() disabled = false;
  @Input() value = "";
  @Input() error = "";
  @Output() input = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();

  focused = signal(false);

  handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.input.emit(this.value);
  }
}

registerSchemaComponent("app-input", InputComponent);
