import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-rating",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-1">
      @for (i of indices; track i) {
        <span
          class="material-symbols-rounded cursor-pointer transition-colors"
          [class.text-amber-500]="i <= value"
          [class.text-neutral-300]="i > value"
          >star</span
        >
      }
      @if (showLabel) {
        <span class="text-xs text-neutral-500 ml-2"
          >({{ value }}/{{ max }})</span
        >
      }
    </div>
  `,
})
export class RatingComponent {
  @Input() value = 0;
  @Input() max = 5;
  @Input() readonly = true;
  @Input() size: "sm" | "md" | "lg" = "md";
  @Input() accentColor?: string;
  @Input() showLabel = false;

  @Output() ratingChange = new EventEmitter<number>();

  get indices(): number[] {
    return Array.from({ length: this.max }, (_, i) => i + 1);
  }

  onStarClick(idx: number) {
    if (this.readonly) return;
    this.value = idx;
    this.ratingChange.emit(idx);
  }
}

registerSchemaComponent("app-rating", RatingComponent);
