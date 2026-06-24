import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  model,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-confirm-dialog",
  standalone: true,
  imports: [CommonModule, DialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./confirm-dialog.component.html",
  styleUrl: "./confirm-dialog.component.css",
})
export class ConfirmDialogComponent {
  isOpen = model(false);
  title = "";
  message = "";
  confirmText = "Confirm";
  cancelText = "Cancel";
  confirmVariant: "primary" | "danger" = "danger";

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
    this.isOpen.set(false);
  }

  onCancel(): void {
    this.cancel.emit();
    this.isOpen.set(false);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
