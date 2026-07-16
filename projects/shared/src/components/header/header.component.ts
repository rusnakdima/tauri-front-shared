import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
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
    <header [class]="'flex items-center gap-3 ' + classes">
      @if (showBack) {
        <button
          class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[--state-hover] active:bg-[--state-pressed] transition-colors"
          (click)="navigateBack.emit()"
          aria-label="Back"
        >
          <span class="text-xl">&#8592;</span>
        </button>
      }
      <div class="flex flex-col">
        <div class="flex items-center gap-3">
          @if (icon) {
            <app-icon [icon]="icon" class="w-6 h-6 text-primary" />
          }
          <h1 class="text-xl font-medium text-on-surface leading-tight">{{ title }}</h1>
        </div>
        @if (subtitle) {
          <p class="text-sm text-on-surface-variant">{{ subtitle }}</p>
        }
        @if (parsedBreadcrumbs.length) {
          <div class="flex items-center gap-2 text-sm text-on-surface-variant mt-1">
            @for (crumb of parsedBreadcrumbs; track crumb.label; let last = $last) {
              @if (!last && crumb.href) {
                <a [href]="crumb.href" class="hover:underline">{{ crumb.label }}</a>
              } @else {
                <span>{{ crumb.label }}</span>
              }
              @if (!last) {
                <span class="text-on-surface-variant/50">/</span>
              }
            }
          </div>
        }
      </div>
      <ng-content></ng-content>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class HeaderComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() icon = "";
  @Input() classes = '';
  @Input() showBack = false;
  @Input() breadcrumbs: string | Breadcrumb[] = "[]";
  @Output() navigateBack = new EventEmitter<void>();

  get parsedBreadcrumbs(): Breadcrumb[] {
    return parseJsonOrDefault<Breadcrumb>(this.breadcrumbs);
  }
}

registerSchemaComponent("app-header", HeaderComponent);
