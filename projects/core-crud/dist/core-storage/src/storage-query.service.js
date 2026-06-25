export class StorageQueryService {
    query(items, filter) {
        return items.filter((item) => {
            return filter.every((f) => {
                const value = item[f.field];
                switch (f.operator) {
                    case "eq":
                        return value === f.value;
                    case "ne":
                        return value !== f.value;
                    case "gt":
                        return value > f.value;
                    case "gte":
                        return value >= f.value;
                    case "lt":
                        return value < f.value;
                    case "lte":
                        return value <= f.value;
                    case "contains":
                        return String(value).includes(String(f.value));
                    case "in":
                        return f.value.includes(value);
                    default:
                        return true;
                }
            });
        });
    }
    sortBy(items, field, direction = "asc") {
        return [...items].sort((a, b) => {
            const aVal = a[field];
            const bVal = b[field];
            const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return direction === "asc" ? cmp : -cmp;
        });
    }
    paginate(items, page, pageSize) {
        const start = (page - 1) * pageSize;
        return items.slice(start, start + pageSize);
    }
}
//# sourceMappingURL=storage-query.service.js.map