import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  HostListener,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

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
  imports: [MatIconModule],
  template: `
    @if (isOpen()) {
      <div class="app-command-palette-backdrop" (click)="close()">
        <div
          class="app-command-palette-container"
          (click)="$event.stopPropagation()"
        >
          <div class="app-command-palette-header">
            <mat-icon
              class="app-command-palette-search-icon"
              fontIcon="search"
            />
            <input
              type="text"
              class="app-command-palette-input"
              [placeholder]="placeholder"
              [value]="searchQuery()"
              (input)="onSearchChange($any($event.target).value)"
              autofocus
            />
            <kbd class="app-command-palette-kbd">Esc</kbd>
          </div>
          <div class="app-command-palette-results">
            @if (filteredCommands().length === 0) {
              <div class="app-command-palette-empty">
                <mat-icon fontIcon="search_off" />
                <span>No commands found</span>
              </div>
            } @else {
              @for (group of groupedCommands(); track group.key) {
                <div class="app-command-palette-group">
                  <div class="app-command-palette-group-label">
                    {{ group.key }}
                  </div>
                  @for (command of group.value; track command.id) {
                    <button
                      type="button"
                      class="app-command-palette-item"
                      [class.app-command-palette-item-selected]="
                        isSelected(command)
                      "
                      [class.app-command-palette-item-disabled]="
                        command.disabled
                      "
                      [disabled]="command.disabled"
                      (click)="selectCommand(command)"
                    >
                      @if (command.icon) {
                        <mat-icon
                          class="app-command-palette-item-icon"
                          [fontIcon]="command.icon"
                        />
                      }
                      <span class="app-command-palette-item-label">{{
                        command.label
                      }}</span>
                      @if (command.shortcut) {
                        <kbd class="app-command-palette-item-shortcut">{{
                          command.shortcut
                        }}</kbd>
                      }
                    </button>
                  }
                </div>
              }
            }
          </div>
          <div class="app-command-palette-footer">
            <span class="app-command-palette-hint"><kbd>↑↓</kbd> Navigate</span>
            <span class="app-command-palette-hint"><kbd>↵</kbd> Select</span>
            <span class="app-command-palette-hint"><kbd>Esc</kbd> Close</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .app-command-palette-backdrop {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 15vh;
        background-color: rgb(0 0 0 / 50%);
        backdrop-filter: blur(4px);
        z-index: 9999;
        animation: fadeIn 0.15s ease-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .app-command-palette-container {
        width: 100%;
        max-width: 560px;
        background-color: var(--bg-elevated, #fff);
        border-radius: 0.75rem;
        box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
        border: 1px solid var(--border-subtle, #e5e7eb);
        overflow: hidden;
        animation: slideDown 0.15s ease-out;
      }
      @keyframes slideDown {
        from {
          transform: translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .app-command-palette-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid var(--border-subtle, #e5e7eb);
      }
      .app-command-palette-search-icon {
        font-size: 1.25rem;
        color: var(--text-muted, #6b7280);
        flex-shrink: 0;
      }
      .app-command-palette-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-size: 1rem;
        color: var(--text-primary, #111827);
      }
      .app-command-palette-input::placeholder {
        color: var(--text-muted, #6b7280);
      }
      .app-command-palette-kbd {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        border-radius: 0.25rem;
        background-color: var(--bg-tertiary, #f3f4f6);
        color: var(--text-muted, #6b7280);
        border: 1px solid var(--border-subtle, #e5e7eb);
      }
      .app-command-palette-results {
        max-height: 320px;
        overflow-y: auto;
      }
      .app-command-palette-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 0;
        gap: 0.5rem;
        color: var(--text-muted, #6b7280);
      }
      .app-command-palette-empty i {
        font-size: 2.5rem;
      }
      .app-command-palette-group {
        padding: 0.5rem 0;
      }
      .app-command-palette-group-label {
        padding: 0.25rem 1rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--text-muted, #6b7280);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .app-command-palette-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.625rem 1rem;
        text-align: left;
        font-size: 0.875rem;
        color: var(--text-primary, #111827);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: background-color 0.1s;
      }
      .app-command-palette-item:hover {
        background-color: var(--bg-hover, #f3f4f6);
      }
      .app-command-palette-item-selected {
        background-color: var(--accent-50, #eff6ff);
      }
      .app-command-palette-item-selected:hover {
        background-color: var(--accent-100, #dbeafe);
      }
      .app-command-palette-item-disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .app-command-palette-item-disabled:hover {
        background-color: transparent;
      }
      .app-command-palette-item-icon {
        font-size: 1.25rem;
        color: var(--text-muted, #6b7280);
        flex-shrink: 0;
      }
      .app-command-palette-item-label {
        flex: 1;
      }
      .app-command-palette-item-shortcut {
        padding: 0.125rem 0.5rem;
        font-size: 0.75rem;
        border-radius: 0.25rem;
        background-color: var(--bg-tertiary, #f3f4f6);
        color: var(--text-muted, #6b7280);
        border: 1px solid var(--border-subtle, #e5e7eb);
      }
      .app-command-palette-footer {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 1rem;
        border-top: 1px solid var(--border-subtle, #e5e7eb);
        background-color: var(--bg-secondary, #f9fafb);
      }
      .app-command-palette-hint {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        font-size: 0.75rem;
        color: var(--text-muted, #6b7280);
      }
      .app-command-palette-hint kbd {
        padding: 0.125rem 0.375rem;
        font-size: 0.625rem;
        border-radius: 0.25rem;
        background-color: var(--bg-tertiary, #f3f4f6);
        color: var(--text-secondary, #6b7280);
        border: 1px solid var(--border-subtle, #e5e7eb);
      }
    `,
  ],
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
