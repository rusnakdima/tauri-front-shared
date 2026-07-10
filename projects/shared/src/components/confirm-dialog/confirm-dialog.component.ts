import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-confirm-dialog",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.css"],
})
export class ConfirmDialogComponent {
  @Input() open = false;
  @Input() title = "Confirm";
  @Input() message = "";
  @Input() confirmText = "Confirm";
  @Input() cancelText = "Cancel";
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirm() {
    this.open = false;
    this.confirmed.emit();
  }
  cancel() {
    this.open = false;
    this.cancelled.emit();
  }

  @HostListener("window:keydown.escape")
  onEscape() {
    if (this.open) this.cancel();
  }
}

registerSchemaComponent("app-confirm-dialog", ConfirmDialogComponent);
