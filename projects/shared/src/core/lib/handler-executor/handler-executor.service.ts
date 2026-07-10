import { Injectable, inject } from "@angular/core";
import { InvokeWrapperService } from "../../../core-api/invoke-wrapper.service";
import { SignalStoreService } from "../signal-store/signal-store.service";
import { EventBusService } from "../events/event-bus.service";
import { SchemaRouterService } from "../schema-router/schema-router.service";
import { DataBindingResolverService } from "../schema-renderer/data-binding-resolver";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";

export interface HandlerDefinition {
  invoke?: string;
  args?: unknown[];
  awaitEvent?: string;
  resultTo?: string;
  set?: { store?: string; field?: string; from?: string };
  setMany?: Record<string, string>;
  swap?: string[];
  navigate?: string;
  call?: string;
  guard?: string;
  then?: string;
  openOverlay?: string;
}

@Injectable({ providedIn: "root" })
export class HandlerExecutorService {
  private invokeWrapper = inject(InvokeWrapperService);
  private signalStore = inject(SignalStoreService);
  private eventBus = inject(EventBusService);
  private dataBindingResolver = inject(DataBindingResolverService);

  private router: SchemaRouterService | null = null;
  private handlers: Record<string, HandlerDefinition> = {};
  private registeredFunctions: Record<string, () => void> = {};
  private pendingListeners: Array<() => void> = [];

  setRouter(router: SchemaRouterService) {
    this.router = router;
  }

  setHandlers(handlers: Record<string, HandlerDefinition>) {
    this.handlers = handlers;
  }

  registerFunction(name: string, fn: () => void) {
    this.registeredFunctions[name] = fn;
  }

  async execute(handlerName: string, eventData?: unknown) {
    const def = this.handlers[handlerName];
    if (!def) {
      console.warn(`[HandlerExecutor] Handler not found: "${handlerName}"`);
      return;
    }
    await this.executeHandler(def, eventData);
  }

  private async executeHandler(def: HandlerDefinition, eventData?: unknown) {
    if (def.invoke) {
      await this.handleInvoke(def, eventData);
    } else if (def.set) {
      this.handleSet(def.set, eventData);
    } else if (def.setMany) {
      this.handleSetMany(def.setMany, eventData);
    } else if (def.swap) {
      this.handleSwap(def.swap);
    } else if (def.navigate) {
      this.handleNavigate(def.navigate);
    } else if (def.call) {
      this.handleCall(def.call);
    } else if (def.guard) {
      await this.handleGuard(def, eventData);
    } else if (def.openOverlay) {
      this.handleOpenOverlay(def.openOverlay);
    } else {
      console.warn("[HandlerExecutor] Unknown handler type", def);
    }
  }

  private resolveValue(value: unknown, eventData?: unknown): unknown {
    if (typeof value === "string") {
      if (value.startsWith("$store.")) {
        const path = value.slice(7);
        return this.getStorePath(path);
      }
      if (value.startsWith("$event.detail.")) {
        const path = value.slice(14);
        return this.getNestedValue(eventData, path);
      }
      if (value.startsWith("$event.")) {
        const path = value.slice(7);
        return this.getNestedValue(eventData, path);
      }
      const resolved = this.dataBindingResolver.resolveDataBinding(value);
      return resolved !== value ? resolved : value;
    }
    return value;
  }

  private getStorePath(path: string): unknown {
    const parts = path.split(".");
    let current: unknown = this.signalStore.get(parts[0]);
    for (let i = 1; i < parts.length; i++) {
      if (current === null || current === undefined) return undefined;
      current = this.getNestedValue(current, parts[i]);
    }
    return current;
  }

  private setStorePath(path: string, value: unknown) {
    const parts = path.split(".");
    if (parts.length === 1) {
      this.signalStore.set(parts[0], value);
      return;
    }
    const storeName = parts[0];
    const field = parts.slice(1).join(".");
    const current = this.signalStore.get(storeName);
    if (current && typeof current === "object") {
      (current as Record<string, unknown>)[field] = value;
      this.signalStore.set(storeName, current);
    }
  }

  private getNestedValue(obj: unknown, path: string): unknown {
    const parts = path.split(".");
    let current = obj;
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      current = (current as Record<string, unknown>)[part];
    }
    return current;
  }

  private async handleInvoke(def: HandlerDefinition, eventData?: unknown) {
    const command = def.invoke!;
    const rawArgs = def.args || [];
    const resolvedArgs: Record<string, unknown> = {};

    for (const raw of rawArgs) {
      if (typeof raw === "string" && raw.startsWith("$")) {
        resolvedArgs[raw] = this.resolveValue(raw, eventData);
      } else if (typeof raw === "object" && raw !== null) {
        const entries = Object.entries(raw as Record<string, unknown>);
        for (const [k, v] of entries) {
          resolvedArgs[k] = this.resolveValue(v, eventData);
        }
      }
    }

    if (def.awaitEvent) {
      const result = await new Promise<unknown>((resolve) => {
        const unlisten: Promise<UnlistenFn> = listen(
          def.awaitEvent!,
          (event: any) => {
            resolve(event.payload);
            unlisten.then((fn) => fn());
          },
        );
        this.invokeWrapper.invoke(command, resolvedArgs).catch((err) => {
          console.error(`[HandlerExecutor] Invoke failed: ${command}`, err);
          resolve(null);
        });
      });
      if (result && def.resultTo) {
        this.setStorePath(def.resultTo, result);
      }
    } else {
      try {
        const result = await this.invokeWrapper.invoke(command, resolvedArgs);
        if (result !== undefined && def.resultTo) {
          this.setStorePath(def.resultTo, result);
        }
      } catch (err) {
        console.error(`[HandlerExecutor] Invoke failed: ${command}`, err);
      }
    }
  }

  private handleSet(
    setDef: { store?: string; field?: string; from?: string },
    eventData?: unknown,
  ) {
    const value = setDef.from
      ? this.resolveValue(setDef.from, eventData)
      : undefined;
    if (setDef.store && setDef.field) {
      this.setStorePath(`${setDef.store}.${setDef.field}`, value);
    }
  }

  private handleSetMany(
    setManyDef: Record<string, string>,
    eventData?: unknown,
  ) {
    for (const [path, rawValue] of Object.entries(setManyDef)) {
      const resolved = this.resolveValue(rawValue, eventData);
      if (path.startsWith("$store.")) {
        this.setStorePath(path.slice(7), resolved);
      }
    }
  }

  private handleSwap(swapDef: string[]) {
    if (swapDef.length < 2) return;
    const valA = this.resolveValue(swapDef[0]);
    const valB = this.resolveValue(swapDef[1]);
    if (swapDef[0].startsWith("$store.")) {
      this.setStorePath(swapDef[0].slice(7), valB);
    }
    if (swapDef[1].startsWith("$store.")) {
      this.setStorePath(swapDef[1].slice(7), valA);
    }
  }

  private handleNavigate(path: string) {
    if (this.router) {
      this.router.navigate(path);
    }
  }

  private handleCall(name: string) {
    const fn = this.registeredFunctions[name];
    if (fn) {
      fn();
    } else {
      const resolved = this.dataBindingResolver.resolveDataBinding(
        `{{functions.${name}}}`,
      );
      if (typeof resolved === "function") {
        resolved();
      }
    }
  }

  private async handleGuard(def: HandlerDefinition, eventData?: unknown) {
    const condition = this.resolveValue(def.guard, eventData);
    if (condition && def.then) {
      const thenDef = this.handlers[def.then];
      if (thenDef) {
        await this.executeHandler(thenDef, eventData);
      }
    }
  }

  private handleOpenOverlay(regionId: string) {
    this.eventBus.emit("open-overlay", { regionId });
  }

  destroy() {
    this.pendingListeners.forEach((fn) => fn());
    this.pendingListeners = [];
  }
}
