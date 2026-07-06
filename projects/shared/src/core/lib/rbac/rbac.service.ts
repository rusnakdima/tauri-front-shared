import { Injectable, signal } from "@angular/core";

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface User {
  id: string;
  username: string;
  roles: string[];
}

@Injectable({ providedIn: "root" })
export class RbacService {
  private _currentUser = signal<User | null>(null);
  private _roles = signal<Role[]>([]);

  readonly currentUser = this._currentUser.asReadonly();
  readonly roles = this._roles.asReadonly();

  setUser(user: User | null): void {
    this._currentUser.set(user);
  }

  setRoles(roles: Role[]): void {
    this._roles.set(roles);
  }

  hasPermission(permission: string): boolean {
    const user = this._currentUser();
    if (!user) return false;

    const roles = this._roles();
    for (const roleName of user.roles) {
      const role = roles.find((r) => r.id === roleName || r.name === roleName);
      if (role?.permissions.includes(permission)) {
        return true;
      }
    }

    return false;
  }

  hasRole(roleId: string): boolean {
    const user = this._currentUser();
    if (!user) return false;
    return user.roles.includes(roleId);
  }

  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }
}
