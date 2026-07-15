import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-page-container",
  standalone: true,
  imports: [],
  templateUrl: "./page-container.component.html",
  styleUrls: ["./page-container.component.css"],
})
export class PageContainerComponent {
  @Input() title = "";
  @Input() padding = 24;
  @Input() maxWidth = 0;
  @Input() width = "";
}

registerSchemaComponent("app-page-container", PageContainerComponent);
