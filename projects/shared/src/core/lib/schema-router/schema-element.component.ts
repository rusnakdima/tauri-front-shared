import { Component, Input, inject, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentRegistryService } from "../component-registry.service";
import { EventBusService } from "../events/event-bus.service";
import type { CanvasElement } from "../types";

@Component({
  selector: "app-schema-element",
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: "./schema-element.component.html",
  styleUrl: "./schema-element.component.css",
})
export class SchemaElementComponent {
  @Input({ required: true }) element!: CanvasElement;
  @Input({ required: true }) elements: CanvasElement[] = [];

  private registry = inject(ComponentRegistryService);
  private eventBus = inject(EventBusService);

  get tag(): string {
    const def = this.registry.get(this.element.componentId);
    return def?.selector ?? this.element.componentId;
  }

  get classes(): string {
    return this.element.classes ?? "";
  }

  get childElements(): CanvasElement[] {
    return this.element.children ?? [];
  }

  get props(): Record<string, unknown> {
    return this.element.props ?? {};
  }

  get isKnownComponent(): boolean {
    return this.registry.has(this.element.componentId);
  }
}
