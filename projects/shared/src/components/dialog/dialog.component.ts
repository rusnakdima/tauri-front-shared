import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

export type DialogSize = "sm" | "md" | "lg";

@Component({
  selector: "app-dialog",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent {
  @Input() open = false;
  @Input() title = "";
  @Input() size: DialogSize = "md";
  @Input() showHeader = true;
  @Input() showFooter = false;
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

registerSchemaComponent("app-dialog", DialogComponent);
