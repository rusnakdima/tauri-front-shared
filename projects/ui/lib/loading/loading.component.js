import { __decorate } from "tslib";
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
let LoadingComponent = class LoadingComponent {
  constructor() {
    this.variant = "spinner";
    this.size = "md";
  }
};
__decorate([Input()], LoadingComponent.prototype, "variant", void 0);
__decorate([Input()], LoadingComponent.prototype, "size", void 0);
LoadingComponent = __decorate(
  [
    Component({
      selector: "app-loading",
      standalone: true,
      imports: [CommonModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      templateUrl: "./loading.component.html",
      styleUrl: "./loading.component.css",
    }),
  ],
  LoadingComponent,
);
export { LoadingComponent };
//# sourceMappingURL=loading.component.js.map
