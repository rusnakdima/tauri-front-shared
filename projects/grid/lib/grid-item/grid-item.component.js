import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
let GridItemComponent = class GridItemComponent {
    constructor() {
        this.col = "auto";
        this.row = "auto";
    }
    get gridStyles() {
        const styles = {};
        if (this.area) {
            styles["grid-area"] = this.area;
        }
        else {
            if (this.colStart)
                styles["grid-column-start"] = String(this.colStart);
            if (this.colSpan)
                styles["grid-column"] = `span ${this.colSpan}`;
            else if (this.col !== "auto")
                styles["grid-column"] = String(this.col);
            if (this.rowStart)
                styles["grid-row-start"] = String(this.rowStart);
            if (this.rowSpan)
                styles["grid-row"] = `span ${this.rowSpan}`;
            else if (this.row !== "auto")
                styles["grid-row"] = String(this.row);
        }
        return styles;
    }
};
__decorate([
    Input()
], GridItemComponent.prototype, "col", void 0);
__decorate([
    Input()
], GridItemComponent.prototype, "row", void 0);
__decorate([
    Input()
], GridItemComponent.prototype, "colSpan", void 0);
__decorate([
    Input()
], GridItemComponent.prototype, "rowSpan", void 0);
__decorate([
    Input()
], GridItemComponent.prototype, "colStart", void 0);
__decorate([
    Input()
], GridItemComponent.prototype, "rowStart", void 0);
__decorate([
    Input()
], GridItemComponent.prototype, "area", void 0);
GridItemComponent = __decorate([
    Component({
        selector: "app-grid-item",
        standalone: true,
        imports: [CommonModule],
        template: `<ng-content></ng-content>`,
        styles: [
            `
      :host {
        display: block;
      }
    `,
        ],
    })
], GridItemComponent);
export { GridItemComponent };
//# sourceMappingURL=grid-item.component.js.map