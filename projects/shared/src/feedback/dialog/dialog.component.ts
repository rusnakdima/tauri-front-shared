import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export type DialogSize = "sm" | "md" | "lg" | "xl";

@Component({
  selector: "app-dialog",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./dialog.component.html",
  styleUrl: "./dialog.component.css",
})
export class DialogComponent {
  @Input() show = false;
  @Input() title = "";
  @Input() size: DialogSize = "md";
  @Input() zIndex = 1050;
  @Input() backdropClose = true;
  @Input() showClose = true;
  @Input() showHeader = true;

  @Output() closed = new EventEmitter<void>();

  get maxWidth(): string {
    switch (this.size) {
      case "sm":
        return "320px";
      case "md":
        return "480px";
      case "lg":
        return "640px";
      case "xl":
        return "800px";
      default:
        return "480px";
    }
  }

  get dialogStyle(): Record<string, string> {
    return {
      "max-width": this.maxWidth,
      "z-index": String(this.zIndex),
    };
  }

  onBackdropClick(): void {
    if (this.backdropClose) {
      this.close();
    }
  }

  onCloseClick(): void {
    this.close();
  }

  private close(): void {
    this.closed.emit();
  }
}
