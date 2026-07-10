import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

export type ModalSize = "sm" | "md" | "lg";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = "";
  @Input() size: ModalSize = "md";
  @Output() closed = new EventEmitter<void>();

  handleOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("overlay")) {
      this.close();
    }
  }

  close() {
    this.open = false;
    this.closed.emit();
  }

  @HostListener("window:keydown.escape")
  onEscape() {
    if (this.open) this.close();
  }
}

registerSchemaComponent("app-modal", ModalComponent);
