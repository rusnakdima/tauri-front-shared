import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
let AvatarComponent = class AvatarComponent {
    constructor() {
        this.src = null;
        this.name = "";
        this.size = "md";
        this.shape = "circle";
    }
    get initials() {
        if (!this.name)
            return "?";
        const parts = this.name.trim().split(/\s+/);
        if (parts.length === 1)
            return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    get avatarClass() {
        const classes = [
            "app-avatar",
            `app-avatar-${this.size}`,
            `app-avatar-${this.shape}`,
        ];
        return classes.join(" ");
    }
};
__decorate([
    Input()
], AvatarComponent.prototype, "src", void 0);
__decorate([
    Input()
], AvatarComponent.prototype, "name", void 0);
__decorate([
    Input()
], AvatarComponent.prototype, "size", void 0);
__decorate([
    Input()
], AvatarComponent.prototype, "shape", void 0);
AvatarComponent = __decorate([
    Component({
        selector: "app-avatar",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./avatar.component.html",
        styleUrl: "./avatar.component.css",
    })
], AvatarComponent);
export { AvatarComponent };
//# sourceMappingURL=avatar.component.js.map