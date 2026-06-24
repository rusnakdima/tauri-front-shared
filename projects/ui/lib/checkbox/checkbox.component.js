import { __decorate } from "tslib";
import { Component, Input, forwardRef, ChangeDetectionStrategy, signal, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
const checkboxVariants = {
    unchecked: "app-checkbox-unchecked",
    checked: "app-checkbox-checked",
    indeterminate: "app-checkbox-indeterminate",
};
let CheckboxComponent = class CheckboxComponent {
    label = "";
    disabled = false;
    set checked(value) {
        this._checked.set(value);
    }
    _checked = signal(false);
    onChange = () => { };
    onTouched = () => { };
    get state() {
        const val = this._checked();
        if (val === true)
            return "checked";
        if (val === false)
            return "unchecked";
        return "indeterminate";
    }
    get checkboxClass() {
        return ["app-checkbox-box", checkboxVariants[this.state]].join(" ");
    }
    writeValue(value) {
        this._checked.set(value);
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
    toggle() {
        if (this.disabled)
            return;
        const newValue = this.state !== "checked";
        this._checked.set(newValue);
        this.onChange(newValue);
        this.onTouched();
    }
};
__decorate([
    Input()
], CheckboxComponent.prototype, "label", void 0);
__decorate([
    Input()
], CheckboxComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], CheckboxComponent.prototype, "checked", null);
CheckboxComponent = __decorate([
    Component({
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
], CheckboxComponent);
export { CheckboxComponent };
//# sourceMappingURL=checkbox.component.js.map