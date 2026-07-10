import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-progress-bar",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.css"],
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() max = 100;

  get percentage(): number {
    return (this.value / this.max) * 100;
  }

  get fillClass(): string {
    const pct = this.percentage;
    if (pct < 40) return "low";
    if (pct < 75) return "medium";
    return "high";
  }
}

registerSchemaComponent("app-progress-bar", ProgressBarComponent);
