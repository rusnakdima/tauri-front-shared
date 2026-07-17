import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-loading",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./loading.component.html",
})
export class LoadingComponent {
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() color = "";
}

registerSchemaComponent("app-loading", LoadingComponent);
