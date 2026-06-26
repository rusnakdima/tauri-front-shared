import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-empty-state",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./empty-state.component.html",
  styleUrl: "./empty-state.component.css",
})
export class EmptyStateComponent {
  @Input() icon: string | null = null;
  @Input() title = "";
  @Input() message = "";
  @Input() actionLabel: string | null = null;

  @Output() action = new EventEmitter<void>();

  onAction(): void {
    this.action.emit();
  }
}
