import { invoke } from "@tauri-apps/api/core";
export class CrudService {
    constructor(entityName) {
        this.entityName = entityName;
    }
    async execute(operation, params) {
        return invoke(`crud_${operation}`, {
            entity: this.entityName,
            ...params,
        });
    }
    async find(query) {
        const result = await this.execute("find", { query });
        return result.results ?? { data: [], total: 0 };
    }
    async create(data) {
        const result = await this.execute("create", { data });
        return result.data;
    }
    async update(id, data) {
        const result = await this.execute("update", { id, data });
        return result.data;
    }
    async delete(id) {
        await this.execute("delete", { id });
    }
}
//# sourceMappingURL=crud.service.js.map