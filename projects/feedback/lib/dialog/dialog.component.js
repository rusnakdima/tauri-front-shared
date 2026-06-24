import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, } from "@angular/core";
import { CommonModule } from "@angular/common";
let DialogComponent = class DialogComponent {
    show = false;
    title = "";
    size = "md";
    zIndex = 1050;
    backdropClose = true;
    showClose = true;
    showHeader = true;
    closed = new EventEmitter();
    get maxWidth() {
        switch (this.size) {
            case "sm":
                return "320px";
            case "md":
                return "480px";
            case "lg":
                return "640px";
            case "xl":
                return "800px";
            default:
                return "480px";
        }
    }
    get dialogStyle() {
        return {
            "max-width": this.maxWidth,
            "z-index": String(this.zIndex),
        };
    }
    onBackdropClick() {
        if (this.backdropClose) {
            this.close();
        }
    }
    onCloseClick() {
        this.close();
    }
    close() {
        this.closed.emit();
    }
};
__decorate([
    Input()
], DialogComponent.prototype, "show", void 0);
__decorate([
    Input()
], DialogComponent.prototype, "title", void 0);
__decorate([
    Input()
], DialogComponent.prototype, "size", void 0);
__decorate([
    Input()
], DialogComponent.prototype, "zIndex", void 0);
__decorate([
    Input()
], DialogComponent.prototype, "backdropClose", void 0);
__decorate([
    Input()
], DialogComponent.prototype, "showClose", void 0);
__decorate([
    Input()
], DialogComponent.prototype, "showHeader", void 0);
__decorate([
    Output()
], DialogComponent.prototype, "closed", void 0);
DialogComponent = __decorate([
    Component({
        selector: "app-dialog",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./dialog.component.html",
        styleUrl: "./dialog.component.css",
    })
], DialogComponent);
export { DialogComponent };
//# sourceMappingURL=dialog.component.js.map