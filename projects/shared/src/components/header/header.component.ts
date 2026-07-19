import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";
import { parseJsonOrDefault } from "../../utils/json";

interface Breadcrumb {
  label: string;
  href?: string;
}

@Component({
  selector: "app-header",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() icon = "";
  @Input() classes = "";
  @Input() showBack = false;
  @Input() breadcrumbs: string | Breadcrumb[] = "[]";
  @Input() fixed = true;
  @Output() navigateBack = new EventEmitter<void>();

  get parsedBreadcrumbs(): Breadcrumb[] {
    return parseJsonOrDefault<Breadcrumb>(this.breadcrumbs);
  }
}

registerSchemaComponent("app-header", HeaderComponent);
