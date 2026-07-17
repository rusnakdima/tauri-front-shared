import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-avatar",
  standalone: true,
  imports: [],
  templateUrl: "./avatar.component.html",
})
export class AvatarComponent {
  @Input() src = "";
  @Input() alt = "";
  /** Alias for `alt` - accepts a name to display initials */
  @Input() name = "";
  @Input() size: "sm" | "md" | "lg" = "md";
  imgError = false;

  get initials(): string {
    return (this.alt || this.name || "").substring(0, 2).toUpperCase();
  }
}

registerSchemaComponent("app-avatar", AvatarComponent);
