import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { SchemaElementComponent } from "../../core/lib/schema-router/schema-element.component";
import type { CanvasElement } from "../../core/lib/types";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule, SchemaElementComponent],
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() content = "";
  @Input() elevated = false;
  @Input() borderRadius = 8;
  @Input() padding = 16;
  @Input() children: CanvasElement[] = [];
  @Input() classes = "";
}

registerSchemaComponent("app-card", CardComponent);
