import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

interface Shortcut {
  key: string;
  description: string;
}

@Component({
  selector: "app-shortcuts-overlay",
  standalone: true,
  imports: [],
  templateUrl: "./shortcuts-overlay.component.html",
  styleUrls: ["./shortcuts-overlay.component.css"],
})
export class ShortcutsOverlayComponent {
  @Input() visible = false;
  @Input() title = "Keyboard Shortcuts";
  @Input() shortcuts: string | Shortcut[] = "[]";
  @Output() closed = new EventEmitter<void>();
  @Input() trigger = "";
  hovered = false;

  get parsedShortcuts(): Shortcut[] {
    return parseJsonOrDefault<Shortcut>(this.shortcuts);
  }

  close() {
    this.visible = false;
    this.closed.emit();
  }

  @HostListener("window:keydown.escape")
  onEscape() {
    if (this.visible) this.close();
  }

  open() {
    this.visible = true;
  }
}

registerSchemaComponent("app-shortcuts-overlay", ShortcutsOverlayComponent);
