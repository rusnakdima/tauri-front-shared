import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from "@angular/forms";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url";

type InputState = "default" | "error";

const inputVariants: Record<InputState, string> = {
  default: "app-input-default",
  error: "app-input-error",
};

@Component({
  selector: "app-input",
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.css",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputType = "text";
  @Input() placeholder = "";
  @Input() label: string | null = null;
  @Input() disabled = false;
  @Input() error: string | null = null;
  @Input() icon: string | null = null;

  value = "";
  focused = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get inputClass(): string {
    const state: InputState = this.error ? "error" : "default";
    const classes = ["app-input", inputVariants[state]];
    if (this.icon) classes.push("app-input-with-icon");
    return classes.join(" ");
  }

  writeValue(value: string): void {
    this.value = value || "";
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onFocus(): void {
    this.focused = true;
  }

  onBlur(): void {
    this.focused = false;
    this.onTouched();
  }
}
