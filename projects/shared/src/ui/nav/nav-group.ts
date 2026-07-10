import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-nav-group",
  standalone: true,
  templateUrl: "./nav-group.component.html",
  styleUrls: ["./nav-group.component.css"],
})
export class NavGroupComponent {
  @Input() label = "";
}

registerSchemaComponent("app-nav-group", NavGroupComponent);
