import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-stats-card",
  standalone: true,
  imports: [ApplyThemeDirective],
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
