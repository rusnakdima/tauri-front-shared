import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

@Component({
  selector: "app-segment-selector",
  standalone: true,
  imports: [],
  templateUrl: "./segment-selector.component.html",
})
export class SegmentSelectorComponent {
  @Input() options: string | string[] = "[]";
  @Input() selected = "";
  @Output() changed = new EventEmitter<string>();

  get parsedOptions(): string[] {
    return parseJsonOrDefault<string>(this.options);
  }

  selectOption(opt: string) {
    this.selected = opt;
    this.changed.emit(opt);
  }
}

registerSchemaComponent("app-segment-selector", SegmentSelectorComponent);
