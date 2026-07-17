import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from "@angular/core";
import { ToastConfig } from "./toast.service";
@Component({
  selector: "app-toast",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./toast.component.html",
})
export class ToastComponent {
  toast = input.required<ToastConfig>();
  dismiss = output<string>();
  onDismiss(): void {
    this.dismiss.emit(this.toast().id);
  }
  onAction(): void {
    const action = this.toast().action;
    if (action) {
      action.callback();
    }
    this.dismiss.emit(this.toast().id);
  }
}
