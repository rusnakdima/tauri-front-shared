import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-menu-button",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./menu-button.component.html",
})
export class MenuButtonComponent {
  @Input() isOpen = false;
  @Input() classes = "";
  @Output() toggle = new EventEmitter<void>();
}
registerSchemaComponent("app-menu-button", MenuButtonComponent);
