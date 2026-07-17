import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-skeleton",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="animate-pulse space-y-3">
      @switch (variant) {
        @case ("circle") {
          <div
            class="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-full"
          ></div>
        }
        @case ("card") {
          <div
            class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"
          ></div>
        }
        @case ("list") {
          @for (n of linesArray; track n) {
            <div
              class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"
            ></div>
          }
        }
        @default {
          <div
            class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"
          ></div>
          <div
            class="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-5/6"
          ></div>
        }
      }
    </div>
  `,
})
export class SkeletonComponent {
  @Input() variant: "card" | "list" | "text" | "circle" = "text";
  @Input() lines?: number;
  @Input() animated = true;

  get linesArray(): number[] {
    const count = this.lines ?? (this.variant === "text" ? 1 : 3);
    return Array.from({ length: Math.max(1, count) }, (_, i) => i);
  }
}

registerSchemaComponent("app-skeleton", SkeletonComponent);
