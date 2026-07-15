import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-menu-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./menu-button.component.html",
  styleUrls: ["./menu-button.component.css"],
})
export class MenuButtonComponent {
  @Input() isOpen = false;
  @Input() classes = "";
  @Output() toggle = new EventEmitter<void>();
}
registerSchemaComponent("app-menu-button", MenuButtonComponent);
