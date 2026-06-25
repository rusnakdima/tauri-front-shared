import { __decorate } from "tslib";
import { Component, Input, forwardRef, ChangeDetectionStrategy, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
let SwitchComponent = class SwitchComponent {
    constructor() {
        this.disabled = false;
        this.checked = false;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        this.checked = value;
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
        this.checked = !this.checked;
        this.onChange(this.checked);
        this.onTouched();
    }
};
__decorate([
    Input()
], SwitchComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], SwitchComponent.prototype, "checked", void 0);
SwitchComponent = __decorate([
    Component({
        selector: "app-switch",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./switch.component.html",
        styleUrl: "./switch.component.css",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SwitchComponent),
                multi: true,
            },
        ],
    })
], SwitchComponent);
export { SwitchComponent };
//# sourceMappingURL=switch.component.js.map