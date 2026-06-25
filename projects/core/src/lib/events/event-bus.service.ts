import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class EventBusService {
  private handlers = new Map<string, Set<(data: unknown) => void>>();

  emit(event: string, data: unknown): void {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      eventHandlers.forEach((handler) => handler(data));
    }
  }

  on(event: string, handler: (data: unknown) => void): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    const eventHandlers = this.handlers.get(event)!;
    eventHandlers.add(handler);

    return () => this.off(event, handler);
  }

  off(event: string, handler: Function): void {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      eventHandlers.delete(handler as (data: unknown) => void);
      if (eventHandlers.size === 0) {
        this.handlers.delete(event);
      }
    }
  }
}
