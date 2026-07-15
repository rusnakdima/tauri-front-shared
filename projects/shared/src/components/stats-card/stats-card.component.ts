import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-stats-card",
  standalone: true,
  imports: [],
  templateUrl: "./stats-card.component.html",
  styleUrls: ["./stats-card.component.css"],
})
export class StatsCardComponent {
  @Input() label = "";
  @Input() value: string | number = "";
  @Input() unit = "";
  @Input() icon = "";
}

registerSchemaComponent("app-stats-card", StatsCardComponent);
