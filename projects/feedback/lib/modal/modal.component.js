import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, HostListener, } from "@angular/core";
import { CommonModule } from "@angular/common";
let ModalComponent = class ModalComponent {
    open = false;
    title = "";
    size = "md";
    closeOnBackdrop = true;
    closeOnEscape = true;
    showHeader = true;
    showFooter = true;
    zIndex = 1050;
    closed = new EventEmitter();
    modalContent;
    previousActiveElement = null;
    ngAfterViewInit() { }
    ngOnDestroy() {
        this.restoreBodyOverflow();
    }
    onEscape(event) {
        if (this.open && this.closeOnEscape) {
            event.preventDefault();
            this.close();
        }
    }
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
            case "full":
                return "100vw";
            default:
                return "480px";
        }
    }
    get isFullScreen() {
        return this.size === "full";
    }
    onBackdropClick() {
        if (this.closeOnBackdrop) {
            this.close();
        }
    }
    onClose() {
        this.close();
    }
    close() {
        this.restoreBodyOverflow();
        this.closed.emit();
    }
    trapFocus(event) {
        if (!this.modalContent || !this.open)
            return;
        const focusableElements = this.modalContent.nativeElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length === 0)
            return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        }
        else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
    handleBodyOverflow() {
        if (this.open) {
            this.previousActiveElement = document.activeElement;
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", this.trapFocus.bind(this));
        }
    }
    restoreBodyOverflow() {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", this.trapFocus.bind(this));
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
            this.previousActiveElement = null;
        }
    }
    ngOnChanges() {
        if (this.open) {
            this.handleBodyOverflow();
            setTimeout(() => {
                const firstFocusable = this.modalContent?.nativeElement?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                firstFocusable?.focus();
            }, 0);
        }
        else {
            this.restoreBodyOverflow();
        }
    }
};
__decorate([
    Input()
], ModalComponent.prototype, "open", void 0);
__decorate([
    Input()
], ModalComponent.prototype, "title", void 0);
__decorate([
    Input()
], ModalComponent.prototype, "size", void 0);
__decorate([
    Input()
], ModalComponent.prototype, "closeOnBackdrop", void 0);
__decorate([
    Input()
], ModalComponent.prototype, "closeOnEscape", void 0);
__decorate([
    Input()
], ModalComponent.prototype, "showHeader", void 0);
__decorate([
    Input()
], ModalComponent.prototype, "showFooter", void 0);
__decorate([
    Input()
], ModalComponent.prototype, "zIndex", void 0);
__decorate([
    Output()
], ModalComponent.prototype, "closed", void 0);
__decorate([
    ViewChild("modalContent")
], ModalComponent.prototype, "modalContent", void 0);
__decorate([
    HostListener("document:keydown.escape")
], ModalComponent.prototype, "onEscape", null);
ModalComponent = __decorate([
    Component({
        selector: "app-modal",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./modal.component.html",
        styleUrl: "./modal.component.css",
    })
], ModalComponent);
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map