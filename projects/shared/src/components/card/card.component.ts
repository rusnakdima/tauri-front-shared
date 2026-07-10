import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { SchemaElementComponent } from "../../core/lib/schema-router/schema-element.component";
import type { CanvasElement } from "../../core/lib/types";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule, SchemaElementComponent, ApplyThemeDirective],
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() content = "";
  @Input() elevated = false;
  @Input() borderRadius = 8;
  @Input() padding = 16;
  @Input() children: CanvasElement[] = [];
}

registerSchemaComponent("app-card", CardComponent);
