import { Component, inject, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { DesignerCanvasService } from "../../core/lib/designer/designer-canvas.service";

type Tab = "props" | "style" | "events";

@Component({
  selector: "app-properties-panel",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./properties-panel.component.html",
})
export class PropertiesPanelComponent {
  protected designer = inject(DesignerCanvasService);
  activeTab: Tab = "props";
  readonly tabs: Tab[] = ["props", "style", "events"];
  readonly tabLabels: Record<Tab, string> = {
    props: "Props",
    style: "Style",
    events: "Events",
  };
  readonly availableStates = ["hover", "focus", "disabled"];

  readonly el = computed(() => this.designer.selectedElement());

  get propEntries(): { key: string; value: unknown }[] {
    const el = this.el();
    if (!el?.props) return [];
    return Object.entries(el.props).map(([key, value]) => ({ key, value }));
  }

  asString(value: unknown): string {
    return value != null ? String(value) : "";
  }

  get styleEntries(): { key: string; value: string }[] {
    const styles = this.el()?.styles?.custom;
    if (!styles) return [];
    return Object.entries(styles).map(([key, value]) => ({ key, value }));
  }

  get stateKeys(): string[] {
    const states = this.el()?.styles?.states;
    if (!states) return [];
    return Object.keys(states);
  }

  getStateRules(state: string): { key: string; value: string }[] {
    const el = this.el();
    const states = el?.styles?.states;
    if (!states) return [];
    const rules = states[state as keyof typeof states];
    if (!rules) return [];
    return Object.entries(rules).map(([key, value]) => ({
      key,
      value: String(value ?? ""),
    }));
  }

  get eventEntries(): { event: string; handler: string }[] {
    const events = this.el()?.events;
    if (!events) return [];
    return Object.entries(events).map(([event, handler]) => ({
      event,
      handler,
    }));
  }

  updateField(key: string, value: string) {
    const id = this.designer.selectedId();
    if (!id) return;
    this.designer.updateElement(id, { [key]: value });
  }

  updateProp(key: string, value: string) {
    const id = this.designer.selectedId();
    if (!id) return;
    const el = this.designer.selectedElement();
    if (!el) return;
    const props = { ...(el.props ?? {}), [key]: value };
    this.designer.updateElement(id, { props });
  }

  addStyle() {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el) return;
    const custom = { ...(el.styles?.custom ?? {}), "": "" };
    this.designer.updateElement(id, {
      styles: { ...(el.styles ?? {}), custom },
    });
  }

  updateStyleKey(index: number, key: string) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el?.styles?.custom) return;
    const entries = Object.entries(el.styles.custom);
    if (index >= entries.length) return;
    const [oldKey, val] = entries[index];
    const newCustom: Record<string, string> = {};
    for (const [k, v] of Object.entries(el.styles.custom)) {
      newCustom[k === oldKey ? key : k] = k === oldKey ? val : v;
    }
    if (oldKey !== key) delete newCustom[oldKey];
    this.designer.updateElement(id, {
      styles: { ...(el.styles ?? {}), custom: newCustom },
    });
  }

  updateStyleVal(index: number, value: string) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el?.styles?.custom) return;
    const entries = Object.entries(el.styles.custom);
    if (index >= entries.length) return;
    const [key] = entries[index];
    const newCustom = { ...el.styles.custom, [key]: value };
    this.designer.updateElement(id, {
      styles: { ...(el.styles ?? {}), custom: newCustom },
    });
  }

  removeStyle(index: number) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el?.styles?.custom) return;
    const entries = Object.entries(el.styles.custom);
    if (index >= entries.length) return;
    const [key] = entries[index];
    const newCustom = { ...el.styles.custom };
    delete newCustom[key];
    this.designer.updateElement(id, {
      styles: { ...(el.styles ?? {}), custom: newCustom },
    });
  }

  addState(state: string) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el) return;
    const states = { ...(el.styles?.states ?? {}), [state]: {} };
    this.designer.updateElement(id, {
      styles: { ...(el.styles ?? {}), states },
    });
  }

  addStateRule(state: string) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el?.styles?.states) return;
    const stateRules = {
      ...el.styles.states[state as keyof typeof el.styles.states],
      "": "",
    };
    const states = { ...el.styles.states, [state]: stateRules };
    this.designer.updateElement(id, {
      styles: { ...(el.styles ?? {}), states },
    });
  }

  updateStateRule(
    state: string,
    index: number,
    target: "key" | "val",
    value: string,
  ) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el?.styles?.states) return;
    const stateKey = state as keyof typeof el.styles.states;
    const rules = el.styles.states[stateKey];
    if (!rules) return;
    const entries = Object.entries(rules);
    if (index >= entries.length) return;
    const [oldKey, oldVal] = entries[index];
    const newRules: Record<string, string> = {};
    for (const [k, v] of Object.entries(rules)) {
      if (target === "key") {
        newRules[k === oldKey ? value : k] = k === oldKey ? oldVal : v;
      } else {
        newRules[k === oldKey ? k : k] = k === oldKey ? value : v;
      }
    }
    if (target === "key" && oldKey !== value) delete newRules[oldKey];
    const states = { ...el.styles.states, [stateKey]: newRules };
    this.designer.updateElement(id, {
      styles: { ...(el.styles ?? {}), states },
    });
  }

  removeStateRule(state: string, index: number) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el?.styles?.states) return;
    const stateKey = state as keyof typeof el.styles.states;
    const rules = el.styles.states[stateKey];
    if (!rules) return;
    const entries = Object.entries(rules);
    if (index >= entries.length) return;
    const [key] = entries[index];
    const newRules = { ...rules };
    delete newRules[key];
    const states = { ...el.styles.states, [stateKey]: newRules };
    this.designer.updateElement(id, {
      styles: { ...(el.styles ?? {}), states },
    });
  }

  addEvent() {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el) return;
    const events = { ...(el.events ?? {}), "": "" };
    this.designer.updateElement(id, { events });
  }

  updateEventName(index: number, event: string) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el?.events) return;
    const entries = Object.entries(el.events);
    if (index >= entries.length) return;
    const [oldEvent, handler] = entries[index];
    const newEvents: Record<string, string> = {};
    for (const [k, v] of Object.entries(el.events)) {
      newEvents[k === oldEvent ? event : k] = k === oldEvent ? handler : v;
    }
    if (oldEvent !== event) delete newEvents[oldEvent];
    this.designer.updateElement(id, { events: newEvents });
  }

  updateEventHandler(index: number, handler: string) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el?.events) return;
    const entries = Object.entries(el.events);
    if (index >= entries.length) return;
    const [event] = entries[index];
    const newEvents = { ...el.events, [event]: handler };
    this.designer.updateElement(id, { events: newEvents });
  }

  removeEvent(index: number) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el?.events) return;
    const entries = Object.entries(el.events);
    if (index >= entries.length) return;
    const [event] = entries[index];
    const newEvents = { ...el.events };
    delete newEvents[event];
    this.designer.updateElement(id, { events: newEvents });
  }

  updateBind(key: "store" | "field", value: string) {
    const id = this.designer.selectedId();
    const el = this.designer.selectedElement();
    if (!id || !el) return;
    const bind = { ...(el.bind ?? {}), [key]: value };
    this.designer.updateElement(id, { bind });
  }
}

registerSchemaComponent("app-properties-panel", PropertiesPanelComponent);
