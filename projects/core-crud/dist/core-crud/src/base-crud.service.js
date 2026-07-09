import { SignalStore } from "@tauri-front/core-storage";
export class BaseCrudService {
    constructor() {
        this.entitiesStore = new SignalStore();
        this.loadingStore = new SignalStore();
    }
    get entities() {
        return this.entitiesStore.get("entities") ?? [];
    }
    get loading() {
        return this.loadingStore.get("loading") ?? false;
    }
    async findAll() {
        this.loadingStore.set("loading", true);
        try {
            const result = await this.getProvider().invoke("get_all_" + this.getEntityName());
            this.entitiesStore.set("entities", result);
            return result;
        }
        finally {
            this.loadingStore.set("loading", false);
        }
    }
    async findOne(id) {
        this.loadingStore.set("loading", true);
        try {
            return await this.getProvider().invoke(`get_${this.getEntityName()}`, { id });
        }
        finally {
            this.loadingStore.set("loading", false);
        }
    }
    async create(data) {
        this.loadingStore.set("loading", true);
        try {
            const result = await this.getProvider().invoke(`create_${this.getEntityName()}`, { data });
            const current = this.entities;
            this.entitiesStore.set("entities", [...current, result]);
            return result;
        }
        finally {
            this.loadingStore.set("loading", false);
        }
    }
    async update(id, data) {
        this.loadingStore.set("loading", true);
        try {
            const result = await this.getProvider().invoke(`update_${this.getEntityName()}`, { id, data });
            const current = this.entities;
            this.entitiesStore.set("entities", current.map((e) => (e.id === id ? result : e)));
            return result;
        }
        finally {
            this.loadingStore.set("loading", false);
        }
    }
    async delete(id) {
        this.loadingStore.set("loading", true);
        try {
            await this.getProvider().invoke(`delete_${this.getEntityName()}`, { id });
            const current = this.entities;
            this.entitiesStore.set("entities", current.filter((e) => e.id !== id));
        }
        finally {
            this.loadingStore.set("loading", false);
        }
    }
}
//# sourceMappingURL=base-crud.service.js.map