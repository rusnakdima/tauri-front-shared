import { __decorate } from "tslib";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
let BadgeComponent = class BadgeComponent {
  constructor() {
    this.label = "";
    this.variant = "default";
    this.size = "md";
    this.icon = null;
    this.removable = false;
    this.removed = new EventEmitter();
  }
  onRemove(event) {
    event.stopPropagation();
    this.removed.emit();
  }
};
__decorate([Input()], BadgeComponent.prototype, "label", void 0);
__decorate([Input()], BadgeComponent.prototype, "variant", void 0);
__decorate([Input()], BadgeComponent.prototype, "size", void 0);
__decorate([Input()], BadgeComponent.prototype, "icon", void 0);
__decorate([Input()], BadgeComponent.prototype, "removable", void 0);
__decorate([Output()], BadgeComponent.prototype, "removed", void 0);
BadgeComponent = __decorate(
  [
    Component({
      selector: "app-badge",
      standalone: true,
      imports: [CommonModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      templateUrl: "./badge.component.html",
      styleUrl: "./badge.component.css",
    }),
  ],
  BadgeComponent,
);
export { BadgeComponent };
//# sourceMappingURL=badge.component.js.map
