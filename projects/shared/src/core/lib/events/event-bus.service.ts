import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class EventBusService {
  private handlers = new Map<string, Set<(data: unknown) => void>>();

  emit(event: string, data?: unknown): void {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      eventHandlers.forEach((handler) => handler(data));
    }
  }

  on(
    event: string,
    handler: (data: unknown) => void,
    context?: unknown,
  ): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    const eventHandlers = this.handlers.get(event)!;
    const wrapped = context ? handler.bind(context) : handler;
    eventHandlers.add(wrapped as (data: unknown) => void);

    return () => this.off(event, wrapped);
  }

  once(
    event: string,
    handler: (data: unknown) => void,
    context?: unknown,
  ): () => void {
    const wrapped = (...args: unknown[]) => {
      this.off(event, wrapped);
      handler.apply(context, [args[0]] as [data: unknown]);
    };
    return this.on(event, wrapped as (data: unknown) => void);
  }

  off(event: string, handler?: Function): void {
    if (!handler) {
      this.handlers.delete(event);
      return;
    }
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      eventHandlers.delete(handler as (data: unknown) => void);
      if (eventHandlers.size === 0) {
        this.handlers.delete(event);
      }
    }
  }

  offAll(event?: string): void {
    if (event) {
      this.handlers.delete(event);
    } else {
      this.handlers.clear();
    }
  }

  hasListeners(event: string): boolean {
    const handlers = this.handlers.get(event);
    return handlers !== undefined && handlers.size > 0;
  }

  getListenerCount(event: string): number {
    return this.handlers.get(event)?.size ?? 0;
  }
}
