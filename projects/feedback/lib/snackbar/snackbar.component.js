import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, } from "@angular/core";
import { CommonModule } from "@angular/common";
let SnackbarComponent = class SnackbarComponent {
    constructor() {
        this.type = "default";
        this.message = "";
        this.duration = 2500;
        this.autoDismiss = true;
        this.dismissed = new EventEmitter();
        this.isVisible = signal(false);
    }
    ngOnInit() {
        this.isVisible.set(true);
        if (this.autoDismiss && this.duration > 0) {
            this.startTimer();
        }
    }
    ngOnDestroy() {
        this.clearTimer();
    }
    get icon() {
        switch (this.type) {
            case "success":
                return "check_circle";
            case "error":
                return "error";
            case "warning":
                return "warning";
            case "info":
                return "info";
            default:
                return "info";
        }
    }
    dismiss() {
        this.isVisible.set(false);
        this.clearTimer();
        setTimeout(() => this.dismissed.emit(), 200);
    }
    startTimer() {
        this.timeoutId = setTimeout(() => this.dismiss(), this.duration);
    }
    clearTimer() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }
};
__decorate([
    Input()
], SnackbarComponent.prototype, "type", void 0);
__decorate([
    Input()
], SnackbarComponent.prototype, "message", void 0);
__decorate([
    Input()
], SnackbarComponent.prototype, "duration", void 0);
__decorate([
    Input()
], SnackbarComponent.prototype, "autoDismiss", void 0);
__decorate([
    Output()
], SnackbarComponent.prototype, "dismissed", void 0);
SnackbarComponent = __decorate([
    Component({
        selector: "app-snackbar",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./snackbar.component.html",
        styleUrl: "./snackbar.component.css",
    })
], SnackbarComponent);
export { SnackbarComponent };
//# sourceMappingURL=snackbar.component.js.map