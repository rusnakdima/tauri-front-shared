import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "lib-role-list",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./role-list.component.html",
})
export class RoleListComponent {}
