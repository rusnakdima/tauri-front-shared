import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "lib-permission-picker",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./permission-picker.component.html",
})
export class PermissionPickerComponent {}
