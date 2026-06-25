import { __decorate } from "tslib";
import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR, FormsModule } from "@angular/forms";
const inputVariants = {
  default: "app-input-default",
  error: "app-input-error",
};
let InputComponent = class InputComponent {
  constructor() {
    this.type = "text";
    this.placeholder = "";
    this.label = null;
    this.disabled = false;
    this.error = null;
    this.icon = null;
    this.value = "";
    this.focused = false;
    this.onChange = () => {};
    this.onTouched = () => {};
  }
  get inputClass() {
    const state = this.error ? "error" : "default";
    const classes = ["app-input", inputVariants[state]];
    if (this.icon) classes.push("app-input-with-icon");
    return classes.join(" ");
  }
  writeValue(value) {
    this.value = value || "";
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  onInput(event) {
    const target = event.target;
    this.value = target.value;
    this.onChange(this.value);
  }
  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
    this.onTouched();
  }
};
__decorate([Input()], InputComponent.prototype, "type", void 0);
__decorate([Input()], InputComponent.prototype, "placeholder", void 0);
__decorate([Input()], InputComponent.prototype, "label", void 0);
__decorate([Input()], InputComponent.prototype, "disabled", void 0);
__decorate([Input()], InputComponent.prototype, "error", void 0);
__decorate([Input()], InputComponent.prototype, "icon", void 0);
InputComponent = __decorate(
  [
    Component({
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
    }),
  ],
  InputComponent,
);
export { InputComponent };
//# sourceMappingURL=input.component.js.map
