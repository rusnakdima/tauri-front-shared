import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

export interface FooterLink {
  label: string;
  href?: string;
}

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer
      class="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 transition-colors"
    >
      <p>{{ text }}</p>
      <div class="flex gap-4">
        @for (link of parsedLinks; track link.label) {
          <a [href]="link.href || '#'">{{ link.label }}</a>
        }
      </div>
    </footer>
  `,
})
export class FooterComponent {
  @Input() text = "";
  @Input() links: string | FooterLink[] = "[]";

  get parsedLinks(): FooterLink[] {
    return parseJsonOrDefault<FooterLink>(this.links);
  }
}

registerSchemaComponent("app-footer", FooterComponent);
