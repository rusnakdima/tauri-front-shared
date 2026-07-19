import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

export type AlertType = "info" | "success" | "warning" | "danger";
export interface AlertAction {
  label: string;
  value: any;
}

@Component({
  selector: "app-alert",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./alert.component.html",
})
export class AlertComponent {
  @Input() type: AlertType = "info";
  @Input() title = "";
  @Input() message = "";
  @Input() dismissible = false;
  @Input() actions?: AlertAction[];
  @Input() icon = "";

  @Output() dismissed = new EventEmitter<void>();
  @Output() action = new EventEmitter<any>();

  onActionClick(act: AlertAction) {
    this.action.emit(act.value);
  }

  dismiss() {
    this.dismissed.emit();
  }
}

registerSchemaComponent("app-alert", AlertComponent);
