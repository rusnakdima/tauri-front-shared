import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-progress-ring",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative inline-flex items-center justify-center">
      <svg class="w-full h-full" viewBox="0 0 36 36">
        <path
          class="text-neutral-200 dark:text-neutral-700"
          stroke-width="3"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          [class]="accent"
          [attr.stroke-dasharray]="(value / max) * 100 + ', 100'"
          stroke-width="3"
          stroke-linecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      @if (showLabel) {
        <span
          class="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
          >{{ value }}%</span
        >
      }
    </div>
  `,
})
export class ProgressRingComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() label?: string;
  @Input() showLabel = true;
  @Input() accent = "#6366f1";

  get diameter(): number {
    return this.size === "sm" ? 48 : this.size === "md" ? 80 : 128;
  }

  get strokeWidth(): number {
    return this.size === "sm" ? 4 : this.size === "md" ? 6 : 10;
  }

  get radius(): number {
    return (this.diameter - this.strokeWidth) / 2;
  }

  get center(): number {
    return this.diameter / 2;
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get percent(): number {
    if (!this.max) return 0;
    return Math.round((this.value / this.max) * 100);
  }

  get dashOffset(): number {
    const clamped = Math.max(0, Math.min(this.value, this.max));
    const ratio = this.max > 0 ? clamped / this.max : 0;
    return this.circumference * (1 - ratio);
  }
}

registerSchemaComponent("app-progress-ring", ProgressRingComponent);
