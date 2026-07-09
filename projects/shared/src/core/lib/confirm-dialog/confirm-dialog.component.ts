import { Component } from "@angular/core";
import { ModalComponent } from "../modal/modal.component";
import { ConfirmService } from "./confirm.service";
@Component({
  selector: "app-confirm-dialog",
  standalone: true,
  imports: [ModalComponent],
  templateUrl: "./confirm-dialog.component.html",
})
export class ConfirmDialogComponent {
  constructor(private confirmService: ConfirmService) {}

  get options() {
    return this.confirmService.options();
  }
  get isOpen() {
    return this.confirmService.isOpen();
  }
  onConfirm(): void {
    this.confirmService.confirmResult(true);
  }
  onCancel(): void {
    this.confirmService.confirmResult(false);
  }
}
