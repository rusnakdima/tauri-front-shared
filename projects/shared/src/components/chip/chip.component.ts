import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-chip",
  standalone: true,
  imports: [IconComponent, ApplyThemeDirective],
  templateUrl: "./chip.component.html",
  styleUrls: ["./chip.component.css"],
})
export class ChipComponent {
  @Input() label = "";
  @Input() icon = "";
  @Input() removable = false;
  /** Alias for `removable` */
  @Input() closeable = false;
  @Output() removed = new EventEmitter<void>();

  handleRemove(e: Event) {
    e.stopPropagation();
    this.removed.emit();
  }
}

registerSchemaComponent("app-chip", ChipComponent);
