import { Injectable, inject } from "@angular/core";
import { InvokeWrapperService } from "../../../core-api/invoke-wrapper.service";
import { SignalStoreService } from "../signal-store/signal-store.service";
import { EventBusService } from "../events/event-bus.service";
import { SchemaRouterService } from "../schema-router/schema-router.service";
import { DataBindingResolverService } from "../schema-renderer/data-binding-resolver";
import { ToastService } from "../toast/toast.service";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import { getNestedValue } from "../../../utils/object";

/**
 * Minimal AlgorithmService interface for handler execution.
 * Full implementation lives in core/lib/algorithm/algorithm.service.ts
 */
export interface AlgorithmService {
  execute<T = unknown>(name: string, input: unknown): Promise<T>;
  list(): Promise<string[]>;
}

export interface ToastDefinition {
  message: string | { template: string; params?: Record<string, unknown> };
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

export interface ModalDefinition {
  component: string;
  props?: Record<string, unknown>;
  onClose?: string;
}

export interface OverlayDefinition {
  regionId: string;
  component?: string;
  props?: Record<string, unknown>;
}

export interface HandlerDefinition {
  // --- Invocation ---
  invoke?: string;
  args?: unknown[];
  awaitEvent?: string;
  resultTo?: string;

  // --- Routing ---
  navigate?: string;
  redirect?: string;
  historyBack?: boolean;
  historyForward?: boolean;

  // --- Store Operations ---
  set?: { store?: string; field?: string; from?: string };
  setMany?: Record<string, string>;
  swap?: string[];

  // --- Algorithms ---
  algo?: {
    name: string;
    input?: unknown;
    outputTo?: string;
  };

  // --- UI Operations ---
  toast?: ToastDefinition;
  modal?: ModalDefinition;
  overlay?: OverlayDefinition;
  closeOverlay?: string;

  // --- Control Flow ---
  guard?: string;
  then?: string;
  else?: string;
  sequence?: string[];
  parallel?: string[];

  // --- Function Calls ---
  call?: string;
  openOverlay?: string;

  // --- Clipboard ---
  copyToClipboard?: string;
}

@Injectable({ providedIn: "root" })
export class HandlerExecutorService {
  private invokeWrapper = inject(InvokeWrapperService);
  private signalStore = inject(SignalStoreService);
  private eventBus = inject(EventBusService);
  private dataBindingResolver = inject(DataBindingResolverService);
  private toastService = inject(ToastService);

  private router: SchemaRouterService | null = null;
  private handlers: Record<string, HandlerDefinition> = {};
  private registeredFunctions: Record<string, () => void> = {};
  private pendingListeners: Array<() => void> = [];
  private algorithmService: AlgorithmService | null = null;

  setRouter(router: SchemaRouterService) {
    this.router = router;
  }

  setAlgorithmService(service: AlgorithmService) {
    this.algorithmService = service;
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
    } else if (def.redirect) {
      this.handleRedirect(def.redirect);
    } else if (def.historyBack) {
      this.handleHistoryBack();
    } else if (def.historyForward) {
      this.handleHistoryForward();
    } else if (def.algo) {
      await this.handleAlgo(def, eventData);
    } else if (def.toast) {
      await this.handleToast(def.toast);
    } else if (def.modal) {
      await this.handleModal(def.modal);
    } else if (def.overlay) {
      await this.handleOverlay(def.overlay);
    } else if (def.closeOverlay) {
      this.handleCloseOverlay(def.closeOverlay);
    } else if (def.sequence) {
      await this.handleSequence(def.sequence, eventData);
    } else if (def.parallel) {
      await this.handleParallel(def.parallel, eventData);
    } else if (def.call) {
      this.handleCall(def.call);
    } else if (def.guard) {
      await this.handleGuard(def, eventData);
    } else if (def.openOverlay) {
      this.handleOpenOverlay(def.openOverlay);
    } else if (def.copyToClipboard !== undefined) {
      this.handleCopyToClipboard(def.copyToClipboard, eventData);
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
        return getNestedValue(eventData, path);
      }
      if (value.startsWith("$event.")) {
        const path = value.slice(7);
        return getNestedValue(eventData, path);
      }
      if (value === "$event") {
        return eventData;
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
      current = getNestedValue(current, parts[i]);
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

  private async handleInvoke(def: HandlerDefinition, eventData?: unknown) {
    const command = def.invoke!;
    const rawArgs = def.args || [];
    const resolvedArgs: Record<string, unknown> = {};

    // Build positional values array and map to parameter names
    // The schema passes store paths as args, e.g. "$store.translator.sourceText"
    // We extract the value and map the field name to the command parameter name
    for (const raw of rawArgs) {
      if (typeof raw === "string" && raw.startsWith("$")) {
        const value = this.resolveValue(raw, eventData);
        if (raw.startsWith("$store.")) {
          // Extract field name from store path: "$store.translator.sourceText" -> "sourceText"
          const storePath = raw.slice(7); // remove "$store."
          const fieldName = storePath.split(".").pop() || "";

          // Map schema field names to command parameter names
          // Tauri auto-converts camelCase JS keys to snake_case Rust params (sourceLang -> source_lang)
          let paramName = fieldName;
          if (fieldName === "sourceText") {
            paramName = "text"; // sourceText is the text content to translate
          }
          // sourceLang -> sourceLang (Tauri: sourceLang -> source_lang in Rust)
          // targetLang -> targetLang (Tauri: targetLang -> target_lang in Rust)

          resolvedArgs[paramName] = value;
        } else {
          resolvedArgs[raw] = value;
        }
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
        // Extract field from event payload if resultTo matches a field in the payload
        // e.g., resultTo="$store.translator.translatedText" and event has { translatedText: "..." }
        const storeFieldMatch = def.resultTo.match(/^\$store\.(\w+)\.(\w+)$/);
        if (storeFieldMatch) {
          const [, store, field] = storeFieldMatch;
          const payload = result as Record<string, unknown>;
          if (field in payload) {
            this.setStorePath(def.resultTo, payload[field]);
          } else {
            // Fallback: try to extract from response.data for nested structures
            const data = payload['data'] as Record<string, unknown> | undefined;
            if (data && field in data) {
              this.setStorePath(def.resultTo, data[field]);
            } else {
              this.setStorePath(def.resultTo, result);
            }
          }
        } else {
          this.setStorePath(def.resultTo, result);
        }
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
    } else if (!condition && def.else) {
      const elseDef = this.handlers[def.else];
      if (elseDef) {
        await this.executeHandler(elseDef, eventData);
      }
    }
  }

  private handleOpenOverlay(regionId: string) {
    this.eventBus.emit("open-overlay", { regionId });
  }

  private async handleCopyToClipboard(valueExpr: string, eventData?: unknown): Promise<void> {
    const text = this.resolveValue(valueExpr, eventData) as string;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      this.toastService.show({ message: "Copied to clipboard", type: "success", duration: 2000 });
    } catch (err) {
      console.error("[HandlerExecutor] Clipboard write failed:", err);
    }
  }

  private handleRedirect(url: string): void {
    const resolved = this.resolveValue(url) as string;
    window.location.href = resolved;
  }

  private handleHistoryBack(): void {
    window.history.back();
  }

  private handleHistoryForward(): void {
    window.history.forward();
  }

  private async handleAlgo(def: HandlerDefinition, eventData?: unknown): Promise<void> {
    if (!this.algorithmService) {
      console.warn("[HandlerExecutor] AlgorithmService not set");
      return;
    }
    const { name, input, outputTo } = def.algo!;
    const resolvedInput = this.resolveValue(input, eventData);
    const result = await this.algorithmService.execute(name, resolvedInput);
    if (outputTo) {
      this.setStorePath(outputTo, result);
    }
  }

  private async handleToast(toast: ToastDefinition): Promise<void> {
    const message = typeof toast.message === "string"
      ? toast.message
      : this.interpolateTemplate(toast.message.template, toast.message.params);
    this.toastService.show({
      message,
      type: toast.type ?? "info",
      duration: toast.duration,
    });
  }

  private async handleModal(modal: ModalDefinition): Promise<void> {
    this.eventBus.emit("open-modal", {
      component: modal.component,
      props: modal.props,
      onClose: modal.onClose,
    });
  }

  private async handleOverlay(overlay: OverlayDefinition): Promise<void> {
    this.eventBus.emit("open-overlay", {
      regionId: overlay.regionId,
      component: overlay.component,
      props: overlay.props,
    });
  }

  private handleCloseOverlay(regionId: string): void {
    this.eventBus.emit("close-overlay", { regionId });
  }

  private async handleSequence(handlers: string[], eventData?: unknown): Promise<void> {
    for (const handlerName of handlers) {
      await this.execute(handlerName, eventData);
    }
  }

  private async handleParallel(handlers: string[], eventData?: unknown): Promise<void> {
    await Promise.all(handlers.map((h) => this.execute(h, eventData)));
  }

  private interpolateTemplate(
    template: string,
    params?: Record<string, unknown>,
  ): string {
    if (!params) return template;
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return params[key] !== undefined ? String(params[key]) : `{{${key}}}`;
    });
  }

  destroy() {
    this.pendingListeners.forEach((fn) => fn());
    this.pendingListeners = [];
  }
}
