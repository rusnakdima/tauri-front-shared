import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, HostListener, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
let CommandPaletteComponent = class CommandPaletteComponent {
    commands = [];
    placeholder = "Search commands...";
    triggerShortcut = "Ctrl+K";
    commandSelected = new EventEmitter();
    closed = new EventEmitter();
    isOpen = signal(false);
    searchQuery = signal("");
    selectedIndex = signal(0);
    get filteredCommands() {
        const query = this.searchQuery().toLowerCase().trim();
        if (!query)
            return this.commands;
        return this.commands.filter((cmd) => cmd.label.toLowerCase().includes(query) ||
            cmd.category?.toLowerCase().includes(query));
    }
    get groupedCommands() {
        const grouped = new Map();
        for (const cmd of this.filteredCommands) {
            const category = cmd.category || "General";
            if (!grouped.has(category)) {
                grouped.set(category, []);
            }
            grouped.get(category).push(cmd);
        }
        return grouped;
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.close();
    }
    onKeyDown(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === "k") {
            event.preventDefault();
            this.toggle();
            return;
        }
        if (!this.isOpen())
            return;
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
    onEscape() {
        if (this.isOpen()) {
            this.close();
        }
    }
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    open() {
        this.isOpen.set(true);
        this.searchQuery.set("");
        this.selectedIndex.set(0);
        document.body.style.overflow = "hidden";
    }
    close() {
        this.isOpen.set(false);
        this.searchQuery.set("");
        this.selectedIndex.set(0);
        document.body.style.overflow = "";
        this.closed.emit();
    }
    onBackdropClick() {
        this.close();
    }
    onSearchChange(query) {
        this.searchQuery.set(query);
        this.selectedIndex.set(0);
    }
    selectCommand(command) {
        if (command.disabled)
            return;
        this.commandSelected.emit(command);
        this.close();
    }
    moveSelection(delta) {
        const commands = this.filteredCommands;
        if (commands.length === 0)
            return;
        let newIndex = this.selectedIndex() + delta;
        if (newIndex < 0)
            newIndex = commands.length - 1;
        if (newIndex >= commands.length)
            newIndex = 0;
        const cmd = commands[newIndex];
        if (cmd?.disabled) {
            newIndex += delta > 0 ? 1 : -1;
            if (newIndex < 0)
                newIndex = commands.length - 1;
            if (newIndex >= commands.length)
                newIndex = 0;
        }
        this.selectedIndex.set(newIndex);
    }
    selectCurrent() {
        const commands = this.filteredCommands;
        const command = commands[this.selectedIndex()];
        if (command && !command.disabled) {
            this.selectCommand(command);
        }
    }
    isSelected(command) {
        return this.filteredCommands[this.selectedIndex()]?.id === command.id;
    }
};
__decorate([
    Input()
], CommandPaletteComponent.prototype, "commands", void 0);
__decorate([
    Input()
], CommandPaletteComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], CommandPaletteComponent.prototype, "triggerShortcut", void 0);
__decorate([
    Output()
], CommandPaletteComponent.prototype, "commandSelected", void 0);
__decorate([
    Output()
], CommandPaletteComponent.prototype, "closed", void 0);
__decorate([
    HostListener("document:keydown", ["$event"])
], CommandPaletteComponent.prototype, "onKeyDown", null);
__decorate([
    HostListener("document:keydown.escape")
], CommandPaletteComponent.prototype, "onEscape", null);
CommandPaletteComponent = __decorate([
    Component({
        selector: "app-command-palette",
        standalone: true,
        imports: [CommonModule, FormsModule],
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: "./command-palette.component.html",
        styleUrl: "./command-palette.component.css",
    })
], CommandPaletteComponent);
export { CommandPaletteComponent };
//# sourceMappingURL=command-palette.component.js.map