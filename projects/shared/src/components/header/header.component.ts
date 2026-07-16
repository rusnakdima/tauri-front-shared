import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

interface Breadcrumb {
  label: string;
  href?: string;
}

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() icon = "";
  @Input() showBack = false;
  @Input() breadcrumbs: string | Breadcrumb[] = "[]";
  @Output() navigateBack = new EventEmitter<void>();

  get parsedBreadcrumbs(): Breadcrumb[] {
    return parseJsonOrDefault<Breadcrumb>(this.breadcrumbs);
  }
}

registerSchemaComponent("app-header", HeaderComponent);
