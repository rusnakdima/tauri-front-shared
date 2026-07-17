import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-empty-state",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./empty-state.component.html",
})
export class EmptyStateComponent {
  @Input() title = "";
  @Input() message = "";
  @Input() icon = "";
  @Input() variant: "default" | "danger" | "success" = "default";
  @Input() action = "";
  @Input() actionLabel = "";
  @Input() classes = "";
  @Output() actionClicked = new EventEmitter<Event>();
}

registerSchemaComponent("app-empty-state", EmptyStateComponent);
