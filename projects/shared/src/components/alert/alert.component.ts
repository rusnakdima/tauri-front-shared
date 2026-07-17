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
  template: `
    <div
      class="flex items-start gap-3 p-4 rounded-3xl transition-colors"
      [class.bg-indigo-50]="type === 'info'"
      [class.text-indigo-800]="type === 'info'"
      [class.border]="type === 'info'"
      [class.border-indigo-100]="type === 'info'"
      [class.bg-emerald-50]="type === 'success'"
      [class.text-emerald-800]="type === 'success'"
      [class.bg-amber-50]="type === 'warning'"
      [class.text-amber-800]="type === 'warning'"
      [class.bg-rose-50]="type === 'danger'"
      [class.text-rose-800]="type === 'danger'"
    >
      @if (title) {
        <div class="font-semibold text-sm">{{ title }}</div>
      }
      @if (message) {
        <p class="text-xs mt-1 opacity-80">{{ message }}</p>
      }
      @if (dismissible) {
        <button
          class="ml-auto p-1 hover:bg-black/10 rounded-full"
          (click)="dismissed.emit()"
        >
          <span class="material-symbols-rounded text-sm">close</span>
        </button>
      }
    </div>
  `,
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
