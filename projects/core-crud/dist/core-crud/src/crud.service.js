import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let CrudService = class CrudService {
  async find(entity, id) {
    const result = await this.execute("find", entity, { filter: { id } });
    return result.data ?? null;
  }
  async findAll(entity, filter) {
    const result = await this.execute("find", entity, {
      filter: filter,
    });
    return result.data ?? [];
  }
  async create(entity, data) {
    const result = await this.execute("create", entity, { data });
    return result.data;
  }
  async update(entity, id, data) {
    const result = await this.execute("update", entity, { id, data });
    return result.data;
  }
  async patch(entity, id, data) {
    const result = await this.execute("patch", entity, { id, data });
    return result.data;
  }
  async delete(entity, id) {
    await this.execute("delete", entity, { id });
  }
  async count(entity) {
    const result = await this.execute("count", entity);
    return result.count;
  }
  async exists(entity, id) {
    const result = await this.execute("exists", entity, {
      id,
    });
    return result.exists;
  }
};
CrudService = __decorate([Injectable({ providedIn: "root" })], CrudService);
export { CrudService };
//# sourceMappingURL=crud.service.js.map
