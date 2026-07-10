import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-avatar",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.css"],
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
