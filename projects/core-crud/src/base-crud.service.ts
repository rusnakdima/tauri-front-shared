import { SignalStore } from "@tauri-front/core-storage";

export interface CrudParams {
  filter?: Record<string, unknown>;
  sort?: { field: string; direction: "asc" | "desc" };
  pagination?: { page: number; pageSize: number };
}

export abstract class BaseCrudService<T extends { id?: string }> {
  protected entitiesStore = new SignalStore();
  protected loadingStore = new SignalStore();

  get entities(): T[] {
    return (this.entitiesStore.get("entities") as T[]) ?? [];
  }

  get loading(): boolean {
    return (this.loadingStore.get("loading") as boolean) ?? false;
  }

  abstract getProvider(): {
    invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T>;
  };

  async findAll(): Promise<T[]> {
    this.loadingStore.set("loading", true);
    try {
      const result = await this.getProvider().invoke<T[]>(
        "get_all_" + this.getEntityName(),
      );
      this.entitiesStore.set("entities", result);
      return result;
    } finally {
      this.loadingStore.set("loading", false);
    }
  }

  async findOne(id: string): Promise<T | null> {
    this.loadingStore.set("loading", true);
    try {
      return await this.getProvider().invoke<T | null>(
        `get_${this.getEntityName()}`,
        { id },
      );
    } finally {
      this.loadingStore.set("loading", false);
    }
  }

  async create(data: Partial<T>): Promise<T> {
    this.loadingStore.set("loading", true);
    try {
      const result = await this.getProvider().invoke<T>(
        `create_${this.getEntityName()}`,
        { data },
      );
      const current = this.entities;
      this.entitiesStore.set("entities", [...current, result]);
      return result;
    } finally {
      this.loadingStore.set("loading", false);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    this.loadingStore.set("loading", true);
    try {
      const result = await this.getProvider().invoke<T>(
        `update_${this.getEntityName()}`,
        { id, data },
      );
      const current = this.entities;
      this.entitiesStore.set(
        "entities",
        current.map((e: T) => (e.id === id ? result : e)),
      );
      return result;
    } finally {
      this.loadingStore.set("loading", false);
    }
  }

  async delete(id: string): Promise<void> {
    this.loadingStore.set("loading", true);
    try {
      await this.getProvider().invoke(`delete_${this.getEntityName()}`, { id });
      const current = this.entities;
      this.entitiesStore.set(
        "entities",
        current.filter((e: T) => e.id !== id),
      );
    } finally {
      this.loadingStore.set("loading", false);
    }
  }

  protected abstract getEntityName(): string;
}
