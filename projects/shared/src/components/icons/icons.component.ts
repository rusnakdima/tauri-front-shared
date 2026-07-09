import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-icon",
  standalone: true,
  imports: [MatIconModule],
  template: `<span class="icon-wrapper"
    ><mat-icon [fontIcon]="icon" [style.fontSize.px]="size"
  /></span>`,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .icon-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
      }
    `,
  ],
})
export class IconComponent {
  @Input() icon = "";
  @Input() size = 24;
  @Input() textSize = "";
}

registerSchemaComponent("app-icon", IconComponent);
