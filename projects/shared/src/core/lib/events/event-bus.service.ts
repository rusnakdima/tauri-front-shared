import { Injectable, signal } from "@angular/core";

export interface ToastNotification {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration: number;
  icon?: string;
}

@Injectable({ providedIn: "root" })
export class EventBusService {
  private handlers = new Map<string, Set<(data: unknown) => void>>();
  private toasts = signal<ToastNotification[]>([]);

  readonly pendingToasts = this.toasts.asReadonly();
  readonly hasToasts = () => this.toasts().length > 0;

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
      handler.apply(context, args);
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

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  showToast(
    message: string,
    type?: ToastNotification["type"],
    duration = 3000,
  ): string {
    const notification: ToastNotification = {
      id: this.generateId(),
      message,
      type: type ?? "info",
      duration,
    };
    this.toasts.update((t) => [...t, notification]);
    if (duration > 0) {
      setTimeout(() => this.dismissToast(notification.id), duration);
    }
    return notification.id;
  }

  success(message: string, duration = 3000): string {
    return this.showToast(message, "success", duration);
  }

  error(message: string, duration = 3000): string {
    return this.showToast(message, "error", duration);
  }

  warning(message: string, duration = 3000): string {
    return this.showToast(message, "warning", duration);
  }

  info(message: string, duration = 3000): string {
    return this.showToast(message, "info", duration);
  }

  dismissToast(id: string): void {
    this.toasts.update((t) => t.filter((n) => n.id !== id));
  }

  dismissAllToasts(): void {
    this.toasts.set([]);
  }

  notify(notification: ToastNotification): string {
    const id = notification.id ?? this.generateId();
    this.toasts.update((t) => [...t, { ...notification, id }]);
    if (notification.duration > 0) {
      setTimeout(() => this.dismissToast(id), notification.duration);
    }
    return id;
  }

  getToast(id: string): ToastNotification | undefined {
    return this.toasts().find((t) => t.id === id);
  }

  clearHistory(): void {
    this.toasts.set([]);
  }
}
