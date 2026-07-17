type FilterOperator =
  "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";

export interface QueryFilter {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export class StorageQueryService {
  query<T>(items: T[], filter: QueryFilter[]): T[] {
    return items.filter((item) => {
      return filter.every((f) => {
        const value = (item as Record<string, unknown>)[f.field];
        switch (f.operator) {
          case "eq":
            return value === f.value;
          case "ne":
            return value !== f.value;
          case "gt":
            return (value as number) > (f.value as number);
          case "gte":
            return (value as number) >= (f.value as number);
          case "lt":
            return (value as number) < (f.value as number);
          case "lte":
            return (value as number) <= (f.value as number);
          case "contains":
            return String(value).includes(String(f.value));
          case "in":
            return (f.value as unknown[]).includes(value);
          default:
            return true;
        }
      });
    });
  }

  sortBy<T>(items: T[], field: string, direction: "asc" | "desc" = "asc"): T[] {
    return [...items].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[field] as string | number;
      const bVal = (b as Record<string, unknown>)[field] as string | number;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return direction === "asc" ? cmp : -cmp;
    });
  }

  paginate<T>(items: T[], page: number, pageSize: number): T[] {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }
}
