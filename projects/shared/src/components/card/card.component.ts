import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { NgIf, NgFor } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { SchemaElementComponent } from "../../core/lib/schema-router/schema-element.component";
import type { CanvasElement } from "../../core/lib/types";

export type CardKind = "elevated" | "outlined" | "surface" | "plain";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [SchemaElementComponent, NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./card.component.html",
})
export class CardComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() content = "";
  @Input() elevation: 0 | 1 | 2 | 3 = 1;
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
    const shadow = shadows[this.elevation];
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

  trackById(index: number, item: CanvasElement): string {
    return item.id;
  }
}

registerSchemaComponent("app-card", CardComponent);
