import { Injectable, signal } from "@angular/core";

/**
 * Permission represents a resource-action pair with optional field-level restrictions.
 * Based on ZenithDB pattern.
 */
export interface Permission {
  resource: string;
  action: string;
  fields?: string[];
}

/**
 * Role contains a set of permissions and metadata.
 * Based on ZenithDB pattern.
 */
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

/**
 * User representation with roles.
 * Based on ZenithDB pattern.
 */
export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

/**
 * Context-based permission levels from TaskFlow pattern.
 */
export enum TodoPermission {
  VIEWER = "viewer",
  EDITOR = "editor",
  MODERATOR = "moderator",
  OWNER = "owner",
}

/**
 * Result of a permission check with all available actions.
 * Based on TaskFlow pattern.
 */
export interface PermissionCheckResult {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canArchive: boolean;
  canManageAssignees: boolean;
  permissionLevel: string;
}

/**
 * Context for todo-level permission evaluation.
 */
export interface TodoPermissionContext {
  todoId: string;
  userId: string;
  assigneeRoles: Record<string, string>;
  visibility: "public" | "shared" | "private";
  ownerId: string;
  effectivePermission: TodoPermission;
}

/**
 * Context for field-level permission evaluation.
 */
export interface FieldPermissionContext {
  resource: string;
  action: string;
  fields: string[];
  userId: string;
}

@Injectable({ providedIn: "root" })
export class PermissionService {
  private _currentUser = signal<User | null>(null);
  private _roles = signal<Role[]>([]);
  private _isAdmin = signal<boolean>(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly roles = this._roles.asReadonly();
  readonly isAdmin = this._isAdmin.asReadonly();

  // ═══════════════════════════════════════════════════════════════════════
  // USER & ROLE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════

  setUser(user: User | null): void {
    this._currentUser.set(user);
  }

  setRoles(roles: Role[]): void {
    this._roles.set(roles);
  }

  setIsAdmin(isAdmin: boolean): void {
    this._isAdmin.set(isAdmin);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ROLE MANAGEMENT (CRUD)
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Load roles from backend. Subclasses or consumers should override
   * with actual TauriBridge invocation.
   */
  async loadRoles(): Promise<Role[]> {
    return this._roles();
  }

  /**
   * Create a new role.
   */
  async createRole(name: string, description: string, permissions: Permission[]): Promise<Role> {
    const role: Role = {
      id: crypto.randomUUID(),
      name,
      description,
      permissions,
    };
    this._roles.update((roles) => [...roles, role]);
    return role;
  }

  /**
   * Update an existing role.
   */
  async updateRole(roleId: string, name: string, description: string, permissions: Permission[]): Promise<Role> {
    let updatedRole: Role | undefined;
    this._roles.update((roles) =>
      roles.map((r) => {
        if (r.id === roleId) {
          updatedRole = { ...r, name, description, permissions };
          return updatedRole;
        }
        return r;
      })
    );
    if (!updatedRole) {
      throw new Error(`Role ${roleId} not found`);
    }
    return updatedRole;
  }

  /**
   * Delete a role by ID.
   */
  async deleteRole(roleId: string): Promise<void> {
    this._roles.update((roles) => roles.filter((r) => r.id !== roleId));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // PERMISSION CHECKING (resource-action based)
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Check if current user has permission for a resource-action pair.
   * Supports wildcard "*" permission that grants all access.
   */
  hasPermission(resource: string, action: string): boolean {
    const user = this._currentUser();
    if (!user) return false;

    if (this._isAdmin()) return true;

    const roles = this._roles();
    for (const roleId of user.roles) {
      const role = roles.find((r) => r.id === roleId || r.name === roleId);
      if (!role) continue;

      if (role.permissions.some((p) => (p.resource === resource || p.resource === "*") && (p.action === action || p.action === "*"))) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if current user can access a resource with optional field restrictions.
   */
  canAccess(resource: string, action: string, fields?: string[]): boolean {
    if (!this.hasPermission(resource, action)) return false;

    if (!fields || fields.length === 0) return true;

    const user = this._currentUser();
    if (!user) return false;

    const roles = this._roles();
    for (const roleId of user.roles) {
      const role = roles.find((r) => r.id === roleId || r.name === roleId);
      if (!role) continue;

      const permission = role.permissions.find((p) => p.resource === resource && p.action === action);
      if (permission?.fields) {
        return fields.every((f) => permission.fields!.includes(f));
      }
      return true;
    }

    return false;
  }

  /**
   * Check if current user has a specific role.
   */
  hasRole(roleId: string): boolean {
    const user = this._currentUser();
    if (!user) return false;
    return user.roles.includes(roleId);
  }

  /**
   * Check if user is authenticated.
   */
  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }

  // ═══════════════════════════════════════════════════════════════════════
  // CONTEXT-BASED PERMISSION CHECKS (from TaskFlow pattern)
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Get the effective permission level for a user on a todo.
   * Based on TaskFlow's getTodoPermission logic.
   */
  getTodoPermission(context: TodoPermissionContext): TodoPermission {
    const { userId, assigneeRoles, visibility, ownerId } = context;

    if (ownerId === userId) {
      return TodoPermission.OWNER;
    }

    const role = assigneeRoles[userId];
    if (role) {
      return this.fromStr(role);
    }

    if (visibility === "public") {
      if (this._isAdmin()) {
        return TodoPermission.MODERATOR;
      }
      return TodoPermission.VIEWER;
    }

    if (visibility === "shared") {
      if (this._isAdmin()) {
        return TodoPermission.MODERATOR;
      }
    }

    return TodoPermission.VIEWER;
  }

  /**
   * Create a todo permission context object.
   */
  createTodoPermissionContext(params: {
    todoId: string;
    userId: string;
    assigneeRoles: Record<string, string>;
    visibility: "public" | "shared" | "private";
    ownerId: string;
  }): TodoPermissionContext {
    const effectivePermission = this.getTodoPermission({
      ...params,
      effectivePermission: TodoPermission.VIEWER,
    });
    return { ...params, effectivePermission };
  }

  /**
   * Convert role string to TodoPermission enum.
   */
  fromStr(role: string): TodoPermission {
    switch (role.toLowerCase()) {
      case "viewer":
        return TodoPermission.VIEWER;
      case "editor":
        return TodoPermission.EDITOR;
      case "admin":
      case "moderator":
        return TodoPermission.MODERATOR;
      case "owner":
        return TodoPermission.OWNER;
      default:
        return TodoPermission.VIEWER;
    }
  }

  /**
   * Check if user can edit todo fields (moderator or owner only).
   */
  canEditTodoFields(permission: TodoPermission): boolean {
    return [TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission);
  }

  /**
   * Check if user can delete a todo (owner only).
   */
  canDeleteTodo(permission: TodoPermission): boolean {
    return permission === TodoPermission.OWNER;
  }

  /**
   * Check if user can archive a todo (owner only).
   */
  canArchiveTodo(permission: TodoPermission): boolean {
    return permission === TodoPermission.OWNER;
  }

  /**
   * Check if user can manage assignees (moderator or owner).
   */
  canManageAssignees(permission: TodoPermission): boolean {
    return [TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission);
  }

  /**
   * Check if user can create tasks/subtasks/comments (editor+ or admin).
   */
  canCreateTask(permission: TodoPermission): boolean {
    if (this._isAdmin()) return true;
    return [TodoPermission.EDITOR, TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission);
  }

  /**
   * Full permission check result for a todo context.
   */
  checkTodoPermissions(context: TodoPermissionContext): PermissionCheckResult {
    const perm = context.effectivePermission;
    return {
      canView: true,
      canCreate: this.canCreateTask(perm),
      canEdit: this.canEditTodoFields(perm),
      canDelete: this.canDeleteTodo(perm),
      canArchive: this.canArchiveTodo(perm),
      canManageAssignees: this.canManageAssignees(perm),
      permissionLevel: perm,
    };
  }

  /**
   * Check if user can edit a specific entity based on ownership or permission level.
   */
  canEditEntity(entityOwnerId: string, permission: TodoPermission, userId: string): boolean {
    if ([TodoPermission.MODERATOR, TodoPermission.OWNER].includes(permission)) {
      return true;
    }
    if (permission === TodoPermission.EDITOR) {
      return entityOwnerId === userId;
    }
    return false;
  }

  /**
   * Check if user can delete a specific entity based on ownership or permission level.
   */
  canDeleteEntity(entityOwnerId: string, permission: TodoPermission, userId: string): boolean {
    return this.canEditEntity(entityOwnerId, permission, userId);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // UTILITY METHODS
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * Get available resources for permission configuration.
   */
  availableResources(): string[] {
    return ["users", "connections", "collections", "queries", "schemas", "settings"];
  }

  /**
   * Get available actions for permission configuration.
   */
  availableActions(): string[] {
    return ["read", "write", "delete", "admin"];
  }

  /**
   * Clear all state (useful for logout).
   */
  clear(): void {
    this._currentUser.set(null);
    this._roles.set([]);
    this._isAdmin.set(false);
  }
}
