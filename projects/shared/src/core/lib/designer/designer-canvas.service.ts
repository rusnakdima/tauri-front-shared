import { Injectable, signal, computed } from "@angular/core";
import type { CanvasElement } from "../types";

export interface DesignerHistoryEntry {
  elements: CanvasElement[];
  label: string;
}

@Injectable({ providedIn: "root" })
export class DesignerCanvasService {
  readonly elements = signal<CanvasElement[]>([]);
  readonly selectedId = signal<string | null>(null);
  readonly history = signal<DesignerHistoryEntry[]>([]);
  readonly historyIndex = signal(-1);
  readonly showGrid = signal(false);
  readonly zoom = signal(100);
  gridColumns = 12;

  readonly selectedElement = computed(() => {
    const id = this.selectedId();
    if (!id) return null;
    return this.findElementById(id, this.elements());
  });

  readonly canUndo = computed(() => this.historyIndex() > 0);
  readonly canRedo = computed(
    () => this.historyIndex() < this.history().length - 1,
  );

  private findElementById(
    id: string,
    els: CanvasElement[],
  ): CanvasElement | null {
    for (const el of els) {
      if (el.id === id) return el;
      if (el.children) {
        const found = this.findElementById(id, el.children);
        if (found) return found;
      }
    }
    return null;
  }

  private pushHistory(label: string) {
    const history = this.history();
    const idx = this.historyIndex();
    const newHistory = history.slice(0, idx + 1);
    newHistory.push({
      elements: JSON.parse(JSON.stringify(this.elements())),
      label,
    });
    this.history.set(newHistory);
    this.historyIndex.set(newHistory.length - 1);
  }

  setElements(els: CanvasElement[]) {
    this.elements.set(els);
    this.pushHistory("Load");
  }

  addElement(componentId: string, parentId?: string) {
    const newEl: CanvasElement = {
      id: `${componentId}-${Date.now()}`,
      componentId,
      gridPosition: { column: 1, row: 1, colSpan: 12, rowSpan: 1 },
      props: {},
    };
    if (parentId) {
      const parent = this.findElementById(parentId, this.elements());
      if (parent) {
        parent.children = [...(parent.children ?? []), newEl];
        this.elements.set([...this.elements()]);
        this.pushHistory(`Add ${componentId} in ${parentId}`);
        return;
      }
    }
    this.elements.set([...this.elements(), newEl]);
    this.pushHistory(`Add ${componentId}`);
  }

  deleteElement(id: string) {
    const remove = (els: CanvasElement[]): CanvasElement[] =>
      els.filter((el) => {
        if (el.id === id) return false;
        if (el.children) el.children = remove(el.children);
        return true;
      });
    this.elements.set(remove(this.elements()));
    if (this.selectedId() === id) this.selectedId.set(null);
    this.pushHistory(`Delete ${id}`);
  }

  updateElement(id: string, patch: Partial<CanvasElement>) {
    const update = (els: CanvasElement[]): boolean =>
      els.some((el) => {
        if (el.id === id) {
          Object.assign(el, patch);
          return true;
        }
        if (el.children) return update(el.children);
        return false;
      });
    update(this.elements());
    this.elements.set([...this.elements()]);
    this.pushHistory(`Update ${id}`);
  }

  moveElement(id: string, toParentId: string | null, index?: number) {
    const findAndRemove = (els: CanvasElement[]): CanvasElement | null => {
      for (let i = 0; i < els.length; i++) {
        if (els[i].id === id) return els.splice(i, 1)[0];
        if (els[i].children) {
          const found = findAndRemove(els[i].children!);
          if (found) return found;
        }
      }
      return null;
    };
    const el = findAndRemove([...this.elements()]);
    if (!el) return;
    const current = [...this.elements()];
    const insertAt = (els: CanvasElement[]) => {
      if (index !== undefined) {
        els.splice(index, 0, el);
      } else {
        els.push(el);
      }
    };
    if (toParentId) {
      const parent = this.findElementById(toParentId, current);
      if (parent) {
        parent.children = [...(parent.children ?? [])];
        insertAt(parent.children!);
      }
    } else {
      insertAt(current);
    }
    this.elements.set(current);
    this.pushHistory(`Move ${id}`);
  }

  selectElement(id: string | null) {
    this.selectedId.set(id);
  }

  undo() {
    const idx = this.historyIndex();
    if (idx <= 0) return;
    this.historyIndex.set(idx - 1);
    this.elements.set(
      JSON.parse(JSON.stringify(this.history()[idx - 1].elements)),
    );
  }

  redo() {
    const idx = this.historyIndex();
    if (idx >= this.history().length - 1) return;
    this.historyIndex.set(idx + 1);
    this.elements.set(
      JSON.parse(JSON.stringify(this.history()[idx + 1].elements)),
    );
  }

  toggleGrid() {
    this.showGrid.update((v) => !v);
  }

  setZoom(z: number) {
    this.zoom.set(Math.max(25, Math.min(200, z)));
  }
}
