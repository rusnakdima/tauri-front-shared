import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

export type ButtonVariant =
  "primary" | "danger" | "warning" | "success" | "info" | "tonal" | "outlined";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="px-4 py-2 text-xs font-medium rounded-full transition-all"
      [class.bg-indigo-600]="variant === 'primary'"
      [class.text-white]="variant === 'primary'"
      [class.hover:bg-indigo-700]="variant === 'primary'"
      [class.bg-indigo-50]="variant === 'tonal'"
      [class.text-indigo-700]="variant === 'tonal'"
      [class.hover:bg-indigo-100]="variant === 'tonal'"
      [class.border]="variant === 'outlined'"
      [class.border-neutral-300]="variant === 'outlined'"
      [class.text-neutral-700]="variant === 'outlined'"
      [class.hover:bg-neutral-50]="variant === 'outlined'"
      [disabled]="disabled"
    >
      {{ label }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = "primary";
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon: string | null = null;
  @Input() iconPosition: "left" | "right" = "left";
  @Input() fullWidth = false;
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() label = "";
  @Input() classes = "";
  @Input() ariaLabel = "";

  @Output() clicked = new EventEmitter<MouseEvent>();

  handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.clicked.emit(e);
  }
}

registerSchemaComponent("app-button", ButtonComponent);
