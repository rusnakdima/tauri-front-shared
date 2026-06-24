import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
let ProgressBarComponent = class ProgressBarComponent {
    percentage = 0;
    showLabel = false;
    get clampedPercentage() {
        return Math.min(100, Math.max(0, this.percentage));
    }
};
__decorate([
    Input()
], ProgressBarComponent.prototype, "percentage", void 0);
__decorate([
    Input()
], ProgressBarComponent.prototype, "showLabel", void 0);
ProgressBarComponent = __decorate([
    Component({
        selector: "app-progress-bar",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./progress-bar.component.html",
        styleUrl: "./progress-bar.component.css",
    })
], ProgressBarComponent);
export { ProgressBarComponent };
//# sourceMappingURL=progress-bar.component.js.map