import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";
export type BadgeSize = "sm" | "md" | "lg";

@Component({
  selector: "app-badge",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./badge.component.html",
  styleUrl: "./badge.component.css",
})
export class BadgeComponent {
  @Input() label = "";
  @Input() variant: BadgeVariant = "default";
  @Input() size: BadgeSize = "md";
  @Input() icon: string | null = null;
  @Input() removable = false;

  @Output() removed = new EventEmitter<void>();

  onRemove(event: Event): void {
    event.stopPropagation();
    this.removed.emit();
  }
}
