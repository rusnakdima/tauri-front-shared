import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type CheckboxState = "unchecked" | "checked" | "indeterminate";

const checkboxVariants = {
  unchecked: "app-checkbox-unchecked",
  checked: "app-checkbox-checked",
  indeterminate: "app-checkbox-indeterminate",
};

@Component({
  selector: "app-checkbox",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./checkbox.component.html",
  styleUrl: "./checkbox.component.css",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = "";
  @Input() disabled = false;
  @Input() set checked(value: boolean | null) {
    this._checked.set(value);
  }

  _checked = signal<boolean | null>(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  get state(): CheckboxState {
    const val = this._checked();
    if (val === true) return "checked";
    if (val === false) return "unchecked";
    return "indeterminate";
  }

  get checkboxClass(): string {
    return ["app-checkbox-box", checkboxVariants[this.state]].join(" ");
  }

  writeValue(value: boolean): void {
    this._checked.set(value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle(): void {
    if (this.disabled) return;
    const newValue = this.state !== "checked";
    this._checked.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }
}
