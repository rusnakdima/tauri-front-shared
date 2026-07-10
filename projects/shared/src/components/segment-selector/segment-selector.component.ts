import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";
import { parseJsonOrDefault } from "../../utils/json";

@Component({
  selector: "app-segment-selector",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./segment-selector.component.html",
  styleUrls: ["./segment-selector.component.css"],
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
