import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-progress-bar",
  standalone: true,
  imports: [],
  templateUrl: "./progress-bar.component.html",
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
