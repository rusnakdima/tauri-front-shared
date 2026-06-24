import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, } from "@angular/core";
import { CommonModule } from "@angular/common";
let TabsComponent = class TabsComponent {
    tabs = [];
    activeTab = null;
    orientation = "horizontal";
    tabChange = new EventEmitter();
    selectTab(tabId, disabled) {
        if (disabled)
            return;
        this.activeTab = tabId;
        this.tabChange.emit(tabId);
    }
    isActive(tabId) {
        return this.activeTab === tabId;
    }
};
__decorate([
    Input()
], TabsComponent.prototype, "tabs", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "activeTab", void 0);
__decorate([
    Input()
], TabsComponent.prototype, "orientation", void 0);
__decorate([
    Output()
], TabsComponent.prototype, "tabChange", void 0);
TabsComponent = __decorate([
    Component({
        selector: "app-tabs",
        standalone: true,
        imports: [CommonModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./tabs.component.html",
        styleUrl: "./tabs.component.css",
    })
], TabsComponent);
export { TabsComponent };
//# sourceMappingURL=tabs.component.js.map