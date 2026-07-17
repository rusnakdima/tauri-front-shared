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
  template: `
    <header
      class="sticky top-0 z-40 w-full flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors"
    >
      <ng-content select="[slot=brand]" />
      <ng-content select="[slot=actions]" />
    </header>
  `,
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
