import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, } from "@angular/core";
import { CommonModule } from "@angular/common";
let ButtonComponent = class ButtonComponent {
    constructor() {
        this.variant = "primary";
        this.size = "md";
        this.disabled = false;
        this.loading = false;
        this.icon = null;
        this.iconPosition = "left";
        this.fullWidth = false;
        this.type = "button";
        this.clicked = new EventEmitter();
    }
    get buttonClass() {
        const classes = [
            "app-btn",
            `app-btn-${this.variant}`,
            `app-btn-${this.size}`,
        ];
        if (this.fullWidth)
            classes.push("app-btn-full");
        if (this.disabled || this.loading)
            classes.push("app-btn-disabled");
        return classes.join(" ");
    }
    get showSpinner() {
        return this.loading;
    }
    onClick(event) {
        if (!this.disabled && !this.loading) {
            this.clicked.emit(event);
        }
    }
};
__decorate([
    Input()
], ButtonComponent.prototype, "variant", void 0);
__decorate([
    Input()
], ButtonComponent.prototype, "size", void 0);
__decorate([
    Input()
], ButtonComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], ButtonComponent.prototype, "loading", void 0);
__decorate([
    Input()
], ButtonComponent.prototype, "icon", void 0);
__decorate([
    Input()
], ButtonComponent.prototype, "iconPosition", void 0);
__decorate([
    Input()
], ButtonComponent.prototype, "fullWidth", void 0);
__decorate([
    Input()
], ButtonComponent.prototype, "type", void 0);
__decorate([
    Output()
], ButtonComponent.prototype, "clicked", void 0);
ButtonComponent = __decorate([
    Component({
        selector: "app-button",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./button.component.html",
        styleUrl: "./button.component.css",
    })
], ButtonComponent);
export { ButtonComponent };
//# sourceMappingURL=button.component.js.map