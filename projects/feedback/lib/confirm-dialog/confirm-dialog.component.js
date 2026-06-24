import { __decorate } from "tslib";
import { Component, Output, EventEmitter, ChangeDetectionStrategy, model, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogComponent } from "../dialog/dialog.component";
let ConfirmDialogComponent = class ConfirmDialogComponent {
    isOpen = model(false);
    title = "";
    message = "";
    confirmText = "Confirm";
    cancelText = "Cancel";
    confirmVariant = "danger";
    confirm = new EventEmitter();
    cancel = new EventEmitter();
    onConfirm() {
        this.confirm.emit();
        this.isOpen.set(false);
    }
    onCancel() {
        this.cancel.emit();
        this.isOpen.set(false);
    }
    open() {
        this.isOpen.set(true);
    }
    close() {
        this.isOpen.set(false);
    }
};
__decorate([
    Output()
], ConfirmDialogComponent.prototype, "confirm", void 0);
__decorate([
    Output()
], ConfirmDialogComponent.prototype, "cancel", void 0);
ConfirmDialogComponent = __decorate([
    Component({
        selector: "app-confirm-dialog",
        standalone: true,
        imports: [CommonModule, DialogComponent],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./confirm-dialog.component.html",
        styleUrl: "./confirm-dialog.component.css",
    })
], ConfirmDialogComponent);
export { ConfirmDialogComponent };
//# sourceMappingURL=confirm-dialog.component.js.map