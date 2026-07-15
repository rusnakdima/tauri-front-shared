import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";
import { IconComponent } from "../icons/icons.component";

interface ToolbarAction {
  label: string;
  icon?: string;
  variant?: "primary" | "danger" | "ghost";
  action?: string;
}

@Component({
  selector: "app-page-toolbar",
  standalone: true,
  imports: [IconComponent],
  templateUrl: "./page-toolbar.component.html",
  styleUrls: ["./page-toolbar.component.css"],
})
export class PageToolbarComponent {
  @Input() title = "";
  @Input() actions: string | ToolbarAction[] = "[]";
  @Output() actionClicked = new EventEmitter<string>();

  get parsedActions(): ToolbarAction[] {
    return parseJsonOrDefault<ToolbarAction>(this.actions);
  }

  handleAction(action: ToolbarAction) {
    this.actionClicked.emit(action.action || action.label);
  }
}

registerSchemaComponent("app-page-toolbar", PageToolbarComponent);
