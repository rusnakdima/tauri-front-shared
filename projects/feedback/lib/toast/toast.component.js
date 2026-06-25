import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, } from "@angular/core";
import { CommonModule } from "@angular/common";
let ToastComponent = class ToastComponent {
    constructor() {
        this.type = "info";
        this.message = "";
        this.duration = 3000;
        this.autoDismiss = true;
        this.show = false;
        this.dismissed = new EventEmitter();
        this.isVisible = signal(false);
    }
    ngOnInit() {
        if (this.show && this.autoDismiss) {
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
        }
    }
    dismiss() {
        this.isVisible.set(false);
        this.clearTimer();
        this.dismissed.emit();
    }
    startTimer() {
        this.isVisible.set(true);
        if (this.duration > 0) {
            this.timeoutId = setTimeout(() => this.dismiss(), this.duration);
        }
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
], ToastComponent.prototype, "type", void 0);
__decorate([
    Input()
], ToastComponent.prototype, "message", void 0);
__decorate([
    Input()
], ToastComponent.prototype, "duration", void 0);
__decorate([
    Input()
], ToastComponent.prototype, "autoDismiss", void 0);
__decorate([
    Input()
], ToastComponent.prototype, "show", void 0);
__decorate([
    Output()
], ToastComponent.prototype, "dismissed", void 0);
ToastComponent = __decorate([
    Component({
        selector: "app-toast",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./toast.component.html",
        styleUrl: "./toast.component.css",
    })
], ToastComponent);
export { ToastComponent };
//# sourceMappingURL=toast.component.js.map