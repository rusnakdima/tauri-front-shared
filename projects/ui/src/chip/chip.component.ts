import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-chip",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./chip.component.html",
  styleUrl: "./chip.component.css",
})
export class ChipComponent {
  @Input() label = "";
  @Input() icon: string | null = null;
  @Input() removable = false;
  @Input() selected = false;

  @Output() removed = new EventEmitter<void>();
  @Output() selectedChange = new EventEmitter<boolean>();

  onRemove(event: Event): void {
    event.stopPropagation();
    this.removed.emit();
  }

  onClick(): void {
    this.selectedChange.emit(!this.selected);
  }
}
