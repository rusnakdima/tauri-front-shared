import { Injectable, inject } from "@angular/core";
import {
  InvokeWrapperService,
  type InvokeOptions,
} from "./invoke-wrapper.service";
import type { Response } from "./tauri/response";
import { invokeWithRetry, type RetryOptions } from "./invoke-wrapper.service";

export type { RetryOptions, InvokeOptions };
export type { Response };

/** Standard filter for CRUD operations matching Rust CrudFilter */
export interface CrudFilter {
  field: string;
  op: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
  value: unknown;
}

/**
 * Unified CRUD service that maps to Rust define_crud_routes! commands.
 *
 * Naming convention: entity "connection" → Rust command `connection_get`, `connection_get_all`, etc.
 * Custom commands: call `.custom('my_command', { arg: value })` for app-specific Tauri commands.
 */
@Injectable({ providedIn: "root" })
export class ApiCrudService {
  private invoke = inject(InvokeWrapperService);

  /** Get a single entity by ID — calls `{entity}_get` */
  async get<T>(
    entity: string,
    id: string,
    options?: InvokeOptions,
  ): Promise<Response<T>> {
    return this.invoke.invoke<Response<T>>(`${entity}_get`, { id }, options);
  }

  /** Get all entities with optional filtering/pagination — calls `{entity}_get_all` */
  async getAll<T>(
    entity: string,
    filter?: CrudFilter[],
    skip?: number,
    limit?: number,
    sortBy?: string,
    sortAsc?: boolean,
  ): Promise<Response<T[]>> {
    return this.invoke.invoke<Response<T[]>>(`${entity}_get_all`, {
      filter,
      skip,
      limit,
      sort_by: sortBy,
      sort_asc: sortAsc,
    });
  }

  /** Create a new entity — calls `{entity}_create` */
  async create<T>(entity: string, data: unknown): Promise<Response<T>> {
    return this.invoke.invoke<Response<T>>(`${entity}_create`, { data });
  }

  /** Full update of an entity — calls `{entity}_update` */
  async update<T>(
    entity: string,
    id: string,
    data: unknown,
  ): Promise<Response<T>> {
    return this.invoke.invoke<Response<T>>(`${entity}_update`, { id, data });
  }

  /** Partial update of an entity — calls `{entity}_patch` */
  async patch<T>(
    entity: string,
    id: string,
    patch: unknown,
  ): Promise<Response<T>> {
    return this.invoke.invoke<Response<T>>(`${entity}_patch`, { id, patch });
  }

  /** Delete an entity — calls `{entity}_delete` */
  async delete(entity: string, id: string): Promise<Response<null>> {
    return this.invoke.invoke<Response<null>>(`${entity}_delete`, { id });
  }

  /**
   * Call any custom Tauri command not covered by standard CRUD.
   * Use for app-specific commands that don't follow the `{entity}_{operation}` pattern.
   */
  async custom<T>(command: string, args?: Record<string, unknown>): Promise<T> {
    return this.invoke.invoke<T>(command, args);
  }

  // Retry variants for unreliable operations

  /** Get with automatic retry on failure */
  async getWithRetry<T>(
    entity: string,
    id: string,
    retryOptions?: RetryOptions,
  ): Promise<Response<T>> {
    return invokeWithRetry(
      () => this.invoke.invoke<Response<T>>(`${entity}_get`, { id }),
      retryOptions ?? {
        maxAttempts: 3,
        initialDelayMs: 1000,
        maxDelayMs: 30000,
      },
    );
  }

  /** Custom command with automatic retry on failure */
  async customWithRetry<T>(
    command: string,
    args?: Record<string, unknown>,
    retryOptions?: RetryOptions,
  ): Promise<T> {
    return invokeWithRetry(
      () => this.invoke.invoke<T>(command, args),
      retryOptions ?? {
        maxAttempts: 3,
        initialDelayMs: 1000,
        maxDelayMs: 30000,
      },
    );
  }
}
