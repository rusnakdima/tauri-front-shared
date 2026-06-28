export type FilterOperator = "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";

export interface CrudFilter {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

export interface CrudQuery {
  filter?: CrudFilter[];
  sort?: { field: string; direction: "asc" | "desc" };
  limit?: number;
  offset?: number;
}

export interface CrudResult<T> {
  data: T[];
  total: number;
}