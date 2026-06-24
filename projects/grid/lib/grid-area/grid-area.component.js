import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
let GridAreaComponent = class GridAreaComponent {
    name = '';
    colStart;
    colEnd;
    rowStart;
    rowEnd;
};
__decorate([
    Input()
], GridAreaComponent.prototype, "name", void 0);
__decorate([
    Input()
], GridAreaComponent.prototype, "colStart", void 0);
__decorate([
    Input()
], GridAreaComponent.prototype, "colEnd", void 0);
__decorate([
    Input()
], GridAreaComponent.prototype, "rowStart", void 0);
__decorate([
    Input()
], GridAreaComponent.prototype, "rowEnd", void 0);
GridAreaComponent = __decorate([
    Component({
        selector: 'app-grid-area',
        standalone: true,
        imports: [CommonModule],
        template: `<ng-content></ng-content>`,
        styles: [`:host { display: block; }`]
    })
], GridAreaComponent);
export { GridAreaComponent };
//# sourceMappingURL=grid-area.component.js.map