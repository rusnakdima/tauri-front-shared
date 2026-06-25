import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, } from "@angular/core";
import { CommonModule } from "@angular/common";
let ChipComponent = class ChipComponent {
    constructor() {
        this.label = "";
        this.icon = null;
        this.removable = false;
        this.selected = false;
        this.removed = new EventEmitter();
        this.selectedChange = new EventEmitter();
    }
    onRemove(event) {
        event.stopPropagation();
        this.removed.emit();
    }
    onClick() {
        this.selectedChange.emit(!this.selected);
    }
};
__decorate([
    Input()
], ChipComponent.prototype, "label", void 0);
__decorate([
    Input()
], ChipComponent.prototype, "icon", void 0);
__decorate([
    Input()
], ChipComponent.prototype, "removable", void 0);
__decorate([
    Input()
], ChipComponent.prototype, "selected", void 0);
__decorate([
    Output()
], ChipComponent.prototype, "removed", void 0);
__decorate([
    Output()
], ChipComponent.prototype, "selectedChange", void 0);
ChipComponent = __decorate([
    Component({
        selector: "app-chip",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./chip.component.html",
        styleUrl: "./chip.component.css",
    })
], ChipComponent);
export { ChipComponent };
//# sourceMappingURL=chip.component.js.map