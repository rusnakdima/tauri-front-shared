import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-progress-bar",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./progress-bar.component.html",
  styleUrl: "./progress-bar.component.css",
})
export class ProgressBarComponent {
  @Input() percentage = 0;
  @Input() showLabel = false;

  get clampedPercentage(): number {
    return Math.min(100, Math.max(0, this.percentage));
  }
}
