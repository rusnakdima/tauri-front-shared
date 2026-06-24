import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  HostListener,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

export interface Command {
  id: string;
  label: string;
  icon?: string;
  category?: string;
  shortcut?: string;
  disabled?: boolean;
}

@Component({
  selector: "app-command-palette",
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./command-palette.component.html",
  styleUrl: "./command-palette.component.css",
})
export class CommandPaletteComponent implements OnInit, OnDestroy {
  @Input() commands: Command[] = [];
  @Input() placeholder = "Search commands...";
  @Input() triggerShortcut = "Ctrl+K";

  @Output() commandSelected = new EventEmitter<Command>();
  @Output() closed = new EventEmitter<void>();

  isOpen = signal(false);
  searchQuery = signal("");
  selectedIndex = signal(0);

  get filteredCommands(): Command[] {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.commands;
    return this.commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(query) ||
        cmd.category?.toLowerCase().includes(query),
    );
  }

  get groupedCommands(): Map<string, Command[]> {
    const grouped = new Map<string, Command[]>();
    for (const cmd of this.filteredCommands) {
      const category = cmd.category || "General";
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(cmd);
    }
    return grouped;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.close();
  }

  @HostListener("document:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      this.toggle();
      return;
    }

    if (!this.isOpen()) return;

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        this.close();
        break;
      case "ArrowDown":
        event.preventDefault();
        this.moveSelection(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        this.moveSelection(-1);
        break;
      case "Enter":
        event.preventDefault();
        this.selectCurrent();
        break;
    }
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    this.isOpen.set(true);
    this.searchQuery.set("");
    this.selectedIndex.set(0);
    document.body.style.overflow = "hidden";
  }

  close(): void {
    this.isOpen.set(false);
    this.searchQuery.set("");
    this.selectedIndex.set(0);
    document.body.style.overflow = "";
    this.closed.emit();
  }

  onBackdropClick(): void {
    this.close();
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.selectedIndex.set(0);
  }

  selectCommand(command: Command): void {
    if (command.disabled) return;
    this.commandSelected.emit(command);
    this.close();
  }

  moveSelection(delta: number): void {
    const commands = this.filteredCommands;
    if (commands.length === 0) return;

    let newIndex = this.selectedIndex() + delta;
    if (newIndex < 0) newIndex = commands.length - 1;
    if (newIndex >= commands.length) newIndex = 0;

    const cmd = commands[newIndex];
    if (cmd?.disabled) {
      newIndex += delta > 0 ? 1 : -1;
      if (newIndex < 0) newIndex = commands.length - 1;
      if (newIndex >= commands.length) newIndex = 0;
    }

    this.selectedIndex.set(newIndex);
  }

  private selectCurrent(): void {
    const commands = this.filteredCommands;
    const command = commands[this.selectedIndex()];
    if (command && !command.disabled) {
      this.selectCommand(command);
    }
  }

  isSelected(command: Command): boolean {
    return this.filteredCommands[this.selectedIndex()]?.id === command.id;
  }
}
