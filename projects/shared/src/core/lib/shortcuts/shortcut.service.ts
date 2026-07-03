import { Injectable, signal, inject } from "@angular/core";
import { EventBusService } from "../events/event-bus.service";

export interface Shortcut {
  id: string;
  key: string;
  modifiers?: string[];
  label: string;
  category?: string;
  handler: string;
  enabled?: boolean;
}

@Injectable({ providedIn: "root" })
export class ShortcutService {
  private _shortcuts = signal<Shortcut[]>([]);
  private eventBus = inject(EventBusService);

  readonly shortcuts = this._shortcuts.asReadonly();

  constructor() {
    window.addEventListener("keydown", (e) => this._handleKeyDown(e));
  }

  register(shortcut: Shortcut): () => void {
    this._shortcuts.update((s) => [...s, shortcut]);
    return () => this.unregister(shortcut.id);
  }

  unregister(id: string): void {
    this._shortcuts.update((s) => s.filter((s) => s.id !== id));
  }

  loadFromSchema(shortcuts: Shortcut[]): void {
    shortcuts.forEach((s) => this.register(s));
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    const match = this._shortcuts().find(
      (s) =>
        s.enabled !== false &&
        s.key.toLowerCase() === e.key.toLowerCase() &&
        this._checkModifiers(s.modifiers || [], e),
    );
    if (match) {
      e.preventDefault();
      this.eventBus.emit(`shortcut:${match.id}`, { shortcut: match });
      this.eventBus.emit(match.handler, { shortcut: match });
    }
  }

  private _checkModifiers(modifiers: string[], e: KeyboardEvent): boolean {
    return modifiers.every((m) => {
      if (m === "ctrl") return e.ctrlKey;
      if (m === "shift") return e.shiftKey;
      if (m === "alt") return e.altKey;
      if (m === "meta") return e.metaKey;
      return false;
    });
  }
}
