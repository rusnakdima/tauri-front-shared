import { Component, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";

export interface PaletteCategory {
  name: string;
  components: string[];
}

@Component({
  selector: "app-component-palette",
  standalone: true,
  imports: [],
  templateUrl: "./component-palette.component.html",
})
export class ComponentPaletteComponent {
  @Input() categories: string | PaletteCategory[] = "[]";
  @Input() searchable = false;

  searchQuery = "";
  collapsedCategories = new Set<string>();

  get parsedCategories(): PaletteCategory[] {
    return parseJsonOrDefault<PaletteCategory>(this.categories);
  }

  get filteredCategories(): PaletteCategory[] {
    if (!this.searchQuery) return this.parsedCategories;
    return this.parsedCategories
      .map((cat) => ({
        ...cat,
        components: cat.components.filter((c) =>
          c.toLowerCase().includes(this.searchQuery.toLowerCase()),
        ),
      }))
      .filter((cat) => cat.components.length > 0);
  }

  toggleCategory(name: string) {
    if (this.collapsedCategories.has(name)) {
      this.collapsedCategories.delete(name);
    } else {
      this.collapsedCategories.add(name);
    }
  }

  isCollapsed(name: string): boolean {
    return this.collapsedCategories.has(name);
  }

  onSearch(e: Event) {
    this.searchQuery = (e.target as HTMLInputElement).value;
  }

  onDragStart(e: DragEvent, componentId: string) {
    e.dataTransfer?.setData(
      "text/plain",
      JSON.stringify({ type: "component", componentId }),
    );
    if (e.dataTransfer) e.dataTransfer.effectAllowed = "copy";
  }
}

registerSchemaComponent("app-component-palette", ComponentPaletteComponent);
