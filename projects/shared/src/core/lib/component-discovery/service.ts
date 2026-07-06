import { Injectable } from "@angular/core";
import type { ComponentDef } from "../types";

export interface DiscoveredComponent {
  def: ComponentDef;
  selector: string;
  registered: boolean;
}

@Injectable({ providedIn: "root" })
export class ComponentDiscoveryService {
  private discovered = new Map<string, DiscoveredComponent>();

  discover(components: ComponentDef[]): DiscoveredComponent[] {
    const results: DiscoveredComponent[] = [];

    for (const def of components) {
      const selector = this.generateSelector(def);
      const discovered: DiscoveredComponent = {
        def,
        selector,
        registered: customElements.get(selector) !== undefined,
      };

      this.discovered.set(def.id, discovered);
      results.push(discovered);
    }

    return results;
  }

  getDiscovered(componentId: string): DiscoveredComponent | undefined {
    return this.discovered.get(componentId);
  }

  getAllDiscovered(): DiscoveredComponent[] {
    return Array.from(this.discovered.values());
  }

  getRegisteredComponents(): DiscoveredComponent[] {
    return Array.from(this.discovered.values()).filter((d) => d.registered);
  }

  getUnregisteredComponents(): DiscoveredComponent[] {
    return Array.from(this.discovered.values()).filter((d) => !d.registered);
  }

  private generateSelector(def: ComponentDef): string {
    const nameKebab = def.name
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
    return `sdui-${nameKebab}`;
  }
}
