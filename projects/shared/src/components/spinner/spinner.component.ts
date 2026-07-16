import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-spinner",
  standalone: true,
  imports: [],
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"],
})
export class SpinnerComponent {
  @Input() size: "sm" | "md" | "lg" | "xl" = "md";
  @Input() color = "";
  @Input() label = "";
}

registerSchemaComponent("app-spinner", SpinnerComponent);
