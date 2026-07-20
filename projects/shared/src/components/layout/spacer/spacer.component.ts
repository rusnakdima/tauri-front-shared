import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { registerSchemaComponent } from "../../../core/lib/schema-component.registry";

@Component({
  selector: "app-spacer",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./spacer.component.html",
  styleUrl: "./spacer.component.css",
})
export class SpacerComponent {
  @Input() flex: number = 1;

  get spacerClasses(): string {
    return `flex flex-${this.flex}`;
  }
}

registerSchemaComponent("app-spacer", SpacerComponent);
