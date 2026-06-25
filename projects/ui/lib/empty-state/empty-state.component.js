import { __decorate } from "tslib";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
let EmptyStateComponent = class EmptyStateComponent {
  constructor() {
    this.icon = null;
    this.title = "";
    this.message = "";
    this.actionLabel = null;
    this.action = new EventEmitter();
  }
  onAction() {
    this.action.emit();
  }
};
__decorate([Input()], EmptyStateComponent.prototype, "icon", void 0);
__decorate([Input()], EmptyStateComponent.prototype, "title", void 0);
__decorate([Input()], EmptyStateComponent.prototype, "message", void 0);
__decorate([Input()], EmptyStateComponent.prototype, "actionLabel", void 0);
__decorate([Output()], EmptyStateComponent.prototype, "action", void 0);
EmptyStateComponent = __decorate(
  [
    Component({
      selector: "app-empty-state",
      standalone: true,
      imports: [CommonModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      templateUrl: "./empty-state.component.html",
      styleUrl: "./empty-state.component.css",
    }),
  ],
  EmptyStateComponent,
);
export { EmptyStateComponent };
//# sourceMappingURL=empty-state.component.js.map
