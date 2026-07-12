export class EventListenerManager {
  private listeners = new Map<string, Set<EventListener>>();

  add(element: EventTarget, event: string, handler: EventListener): void {
    element.addEventListener(event, handler);
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  remove(element: EventTarget, event: string, handler: EventListener): void {
    element.removeEventListener(event, handler);
    this.listeners.get(event)?.delete(handler);
  }

  removeAll(): void {
    this.listeners.forEach((handlers) => {
      handlers.clear();
    });
    this.listeners.clear();
  }
}

export interface ResizeObserverEntry {
  target: Element;
  contentRect: DOMRectReadOnly;
}

export type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver,
) => void;

export function createResizeObserver(
  callback: ResizeObserverCallback,
): ResizeObserver | null {
  if (typeof ResizeObserver === "undefined") return null;
  return new ResizeObserver(callback);
}

export function observeElement(
  observer: ResizeObserver,
  element: Element,
): void {
  observer.observe(element);
}

export function unobserveElement(
  observer: ResizeObserver,
  element: Element,
): void {
  observer.unobserve(element);
}
