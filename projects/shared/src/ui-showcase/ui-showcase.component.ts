import { Component, inject, signal, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ThemeService } from "../core/lib/theme/theme.service";
import {
  loadStyleVariant,
  setCurrentStyle,
  getAllStyleVariants,
  getCurrentStyle,
  type StyleVariant,
} from "../styles/style-registry";
import {
  uiComponents,
  layoutComponents,
  feedbackComponents,
  dataComponents,
} from "../components";
import type { SharedComponentDef } from "../core/lib/types";

@Component({
  selector: "app-ui-showcase",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./ui-showcase.component.html",
  styleUrl: "./ui-showcase.component.css",
})
export class UiShowcaseComponent {
  private themeService = inject(ThemeService);

  readonly colorModes = ["light", "dark", "system"] as const;
  readonly styleVariants = getAllStyleVariants();

  readonly currentColorMode = signal<string>(
    this.themeService.colorMode()
  );
  readonly currentStyleVariant = signal<StyleVariant>(getCurrentStyle());
  readonly searchQuery = signal("");
  readonly selectedCategory = signal("all");

  readonly allComponents: SharedComponentDef[] = [
    ...uiComponents,
    ...layoutComponents,
    ...feedbackComponents,
    ...dataComponents,
  ];

  readonly categories = computed(() => {
    const cats = new Set(this.allComponents.map((c) => c.category));
    return ["all", ...Array.from(cats)];
  });

  readonly filteredComponents = computed(() => {
    let result = this.allComponents;
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase();
    if (cat !== "all") {
      result = result.filter((c) => c.category === cat);
    }
    if (query) {
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.selector.toLowerCase().includes(query)
      );
    }
    return result;
  });

  setColorMode(mode: string) {
    this.themeService.setMode(mode as "light" | "dark" | "system");
    this.currentColorMode.set(this.themeService.colorMode());
  }

  async setStyleVariant(variant: StyleVariant) {
    await loadStyleVariant(variant);
    setCurrentStyle(variant);
    this.currentStyleVariant.set(variant);
  }

  getComponentDemoContent(comp: SharedComponentDef): string {
    switch (comp.id) {
      case "button":
        return "Button";
      case "badge":
        return "Badge";
      case "avatar":
        return "";
      case "chip":
        return "Chip";
      case "input":
        return "";
      case "checkbox":
        return "";
      case "radio":
        return "";
      case "tabs":
        return "";
      case "empty-state":
        return "";
      case "loading":
        return "";
      case "pagination":
        return "";
      case "tooltip":
        return "";
      case "progress-bar":
        return "";
      case "slider":
        return "";
      case "select":
        return "";
      case "switch":
        return "";
      case "card":
        return "";
      case "stats-card":
        return "";
      case "table-view":
        return "";
      case "data-table":
        return "";
      case "json-view":
        return "";
      case "segment-selector":
        return "";
      case "dialog":
        return "";
      case "confirm-dialog":
        return "";
      case "toast":
        return "";
      case "snackbar":
        return "";
      case "command-palette":
        return "";
      case "modal":
        return "";
      case "split-view":
        return "";
      case "page-container":
        return "";
      case "page-toolbar":
        return "";
      case "header":
        return "";
      case "sidebar":
        return "";
      case "footer":
        return "";
      case "main-editor":
        return "";
      case "bottom-panel":
        return "";
      case "designer-sidebar":
        return "";
      case "component-palette":
        return "";
      case "canvas":
        return "";
      case "canvas-toolbar":
        return "";
      default:
        return "";
    }
  }

  getComponentProps(comp: SharedComponentDef): Record<string, any> {
    const props: Record<string, any> = {};
    for (const p of comp.props) {
      switch (p.name) {
        case "variant":
          if (p.options && p.options.length > 0) {
            props[p.name] = p.options[0];
          }
          break;
        case "size":
          if (p.options && p.options.length > 0) {
            props[p.name] = p.options[0];
          }
          break;
        case "checked":
          props[p.name] = false;
          break;
        case "disabled":
          props[p.name] = false;
          break;
        case "title":
          props[p.name] = comp.name;
          break;
        case "label":
          props[p.name] = comp.name;
          break;
        case "text":
          props[p.name] = comp.name;
          break;
        case "placeholder":
          props[p.name] = "Enter text...";
          break;
        case "type":
          props[p.name] = "text";
          break;
        case "value":
          props[p.name] = 50;
          break;
        case "page":
          props[p.name] = 1;
          break;
        case "total":
          props[p.name] = 10;
          break;
        case "min":
          props[p.name] = 0;
          break;
        case "max":
          props[p.name] = 100;
          break;
        case "open":
          props[p.name] = false;
          break;
        case "options":
          props[p.name] = '["Option 1", "Option 2"]';
          break;
        case "tabs":
          props[p.name] = '["Tab 1", "Tab 2"]';
          break;
        case "columns":
          props[p.name] = '["Name", "Status"]';
          break;
        case "data":
          props[p.name] = '[]';
          break;
        case "src":
          props[p.name] = "";
          break;
        case "alt":
          props[p.name] = "Avatar";
          break;
        default:
          if (p.default !== undefined) {
            props[p.name] = p.default;
          }
      }
    }
    return props;
  }

  setComponentProps(el: HTMLElement, props: Record<string, any>) {
    for (const [key, value] of Object.entries(props)) {
      if (value !== undefined) {
        (el as any)[key] = value;
      }
    }
  }

  async renderComponent(card: HTMLElement, comp: SharedComponentDef) {
    const container = card.querySelector(".component-preview") as HTMLElement;
    if (!container) return;

    container.innerHTML = "";
    try {
      await customElements.whenDefined(comp.selector);
      const el = document.createElement(comp.selector) as HTMLElement;
      const props = this.getComponentProps(comp);
      this.setComponentProps(el, props);
      container.appendChild(el);
    } catch (e) {
      container.textContent = comp.selector;
    }
  }
}