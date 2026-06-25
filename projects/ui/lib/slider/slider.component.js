import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
let SliderComponent = class SliderComponent {
    constructor() {
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.value = 0;
        this.valueChange = new EventEmitter();
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    onInput(event) {
        const target = event.target;
        const newValue = parseFloat(target.value);
        this.value = newValue;
        this.onChange(newValue);
        this.valueChange.emit(newValue);
        this.onTouched();
    }
    get percentage() {
        return ((this.value - this.min) / (this.max - this.min)) * 100;
    }
};
__decorate([
    Input()
], SliderComponent.prototype, "min", void 0);
__decorate([
    Input()
], SliderComponent.prototype, "max", void 0);
__decorate([
    Input()
], SliderComponent.prototype, "step", void 0);
__decorate([
    Input()
], SliderComponent.prototype, "value", void 0);
__decorate([
    Output()
], SliderComponent.prototype, "valueChange", void 0);
SliderComponent = __decorate([
    Component({
        selector: "app-slider",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./slider.component.html",
        styleUrl: "./slider.component.css",
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SliderComponent),
                multi: true,
            },
        ],
    })
], SliderComponent);
export { SliderComponent };
//# sourceMappingURL=slider.component.js.map