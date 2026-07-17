import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  signal,
  HostListener,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: "./command-palette.component.html",
})
export class CommandPaletteComponent {
  @Input() commands: Command[] = [];
  @Input() placeholder = "Search commands...";
  @Input() triggerShortcut = "Ctrl+K";
  @Output() commandSelected = new EventEmitter<Command>();
  @Output() closed = new EventEmitter<void>();

  isOpen = signal(false);
  searchQuery = signal("");
  selectedIndex = signal(0);

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

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
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
    const filtered = this.filteredCommands();
    if (filtered.length === 0) return;
    let idx = this.selectedIndex() + delta;
    if (idx < 0) idx = filtered.length - 1;
    if (idx >= filtered.length) idx = 0;
    if (filtered[idx]?.disabled) {
      idx += delta > 0 ? 1 : -1;
      if (idx < 0) idx = filtered.length - 1;
      if (idx >= filtered.length) idx = 0;
    }
    this.selectedIndex.set(idx);
  }

  private selectCurrent(): void {
    const filtered = this.filteredCommands();
    const cmd = filtered[this.selectedIndex()];
    if (cmd && !cmd.disabled) this.selectCommand(cmd);
  }

  isSelected(command: Command): boolean {
    return this.filteredCommands()[this.selectedIndex()]?.id === command.id;
  }

  filteredCommands = () => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.commands;
    return this.commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q),
    );
  };

  groupedCommands = () => {
    const map = new Map<string, Command[]>();
    for (const cmd of this.filteredCommands()) {
      const cat = cmd.category || "General";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(cmd);
    }
    return [...map.entries()].map(([key, value]) => ({ key, value }));
  };
}

registerSchemaComponent("app-command-palette", CommandPaletteComponent);
