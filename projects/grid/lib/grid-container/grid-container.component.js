import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
let GridContainerComponent = class GridContainerComponent {
    constructor() {
        this.cols = '1fr';
        this.rows = 'auto';
        this.gap = '16px';
    }
    get containerClasses() {
        const classes = ['grid'];
        if (this.cols.includes('fr') || this.cols === 'auto') {
            classes.push(`grid-cols-${this.cols.replace('fr', '')}`);
        }
        else if (!isNaN(Number(this.cols))) {
            classes.push(`grid-cols-${this.cols}`);
        }
        if (this.smCols)
            classes.push(`sm:grid-cols-${this.smCols}`);
        if (this.mdCols)
            classes.push(`md:grid-cols-${this.mdCols}`);
        if (this.lgCols)
            classes.push(`lg:grid-cols-${this.lgCols}`);
        if (this.xlCols)
            classes.push(`xl:grid-cols-${this.xlCols}`);
        return classes.join(' ');
    }
    get containerStyles() {
        const styles = {};
        if (this.cols.includes('fr')) {
            styles['grid-template-columns'] = this.cols;
        }
        if (this.rows.includes('fr') || this.rows === 'auto') {
            styles['grid-template-rows'] = this.rows;
        }
        const gapClass = this.gapToTailwindClass(this.gap);
        if (gapClass) {
            styles['gap'] = gapClass;
        }
        return styles;
    }
    gapToTailwindClass(gap) {
        const numericGap = parseInt(gap.replace(/[^\d]/g, ''), 10);
        const unit = gap.replace(/[\d]/g, '').trim();
        if (unit === 'px' || unit === '') {
            if (numericGap <= 4)
                return 'gap-1';
            if (numericGap <= 8)
                return 'gap-2';
            if (numericGap <= 12)
                return 'gap-3';
            if (numericGap <= 16)
                return 'gap-4';
            if (numericGap <= 20)
                return 'gap-5';
            if (numericGap <= 24)
                return 'gap-6';
            if (numericGap <= 32)
                return 'gap-8';
        }
        return gap;
    }
};
__decorate([
    Input()
], GridContainerComponent.prototype, "cols", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "rows", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "gap", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "smCols", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "mdCols", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "lgCols", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "xlCols", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "smGap", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "mdGap", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "lgGap", void 0);
__decorate([
    Input()
], GridContainerComponent.prototype, "xlGap", void 0);
GridContainerComponent = __decorate([
    Component({
        selector: 'app-grid-container',
        standalone: true,
        imports: [CommonModule],
        template: `
    <div [class]="containerClasses" [style]="containerStyles">
      <ng-content></ng-content>
    </div>
  `,
        styles: [`:host { display: block; }`]
    })
], GridContainerComponent);
export { GridContainerComponent };
//# sourceMappingURL=grid-container.component.js.map