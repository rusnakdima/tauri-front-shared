import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { SchemaElementComponent } from "../../core/lib/schema-router/schema-element.component";
import type { CanvasElement } from "../../core/lib/types";

export type CardKind = "elevated" | "outlined" | "surface" | "plain";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [SchemaElementComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="rounded-3xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm transition-colors"
      [class.bg-white]="kind === 'elevated'"
      [class.bg-transparent]="kind === 'outlined'"
      [class.bg-neutral-50]="kind === 'surface'"
      [class.border-2]="kind === 'outlined'"
      [class.shadow-md]="kind === 'elevated'"
    >
      @if (title) {
        <h3
          class="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1"
        >
          {{ title }}
        </h3>
      }
      @if (subtitle) {
        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          {{ subtitle }}
        </p>
      }
      <ng-content />
    </div>
  `,
})
export class CardComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() content = "";
  @Input() elevated: 0 | 1 | 2 | 3 = 1;
  @Input() borderRadius: "sm" | "md" | "lg" | "xl" = "lg";
  @Input() padding: "sm" | "md" | "lg" = "md";
  @Input() children: CanvasElement[] = [];
  @Input() classes = "";
  @Input() kind: CardKind = "elevated";
  @Input() sectionId = "";

  getCardClasses(): string {
    const radiusMap = {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    };

    const shadows = ["shadow-none", "shadow-1", "shadow-2", "shadow-3"];

    const base =
      "bg-surface-container border border-outline-variant overflow-hidden";
    const radius = radiusMap[this.borderRadius];
    const shadow = shadows[this.elevated];
    const kindClass = `app-card--${this.kind}`;

    return [base, radius, shadow, kindClass, this.classes]
      .filter(Boolean)
      .join(" ");
  }

  getContentClasses(): string {
    const paddingMap = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };
    return paddingMap[this.padding];
  }
}

registerSchemaComponent("app-card", CardComponent);
