import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-stats-card",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./stats-card.component.html",
})
export class StatsCardComponent {
  @Input() label = "";
  @Input() value: string | number = "";
  @Input() unit = "";
  @Input() icon = "";
}

registerSchemaComponent("app-stats-card", StatsCardComponent);
