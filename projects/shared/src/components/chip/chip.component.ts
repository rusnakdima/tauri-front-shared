import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-chip",
  standalone: true,
  imports: [IconComponent],
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
