import { Injectable, inject } from "@angular/core";
import { PermissionService } from "../rbac/permission.service";

export interface GuardConfig {
  type: "auth" | "role" | "permission" | "admin";
  role?: string;
  resource?: string;
  action?: string;
}

@Injectable({ providedIn: "root" })
export class GuardService {
  private permissionService = inject(PermissionService);

  canActivate(): Promise<boolean> {
    return Promise.resolve(this.permissionService.isAuthenticated());
  }

  canActivateWithConfig(config: GuardConfig): Promise<boolean> {
    let result: boolean;
    switch (config.type) {
      case "auth":
        result = this.checkAuth();
        break;
      case "role":
        result = this.checkRole(config.role);
        break;
      case "permission":
        result = this.checkPermission(config.resource, config.action);
        break;
      case "admin":
        result = this.permissionService.isAdmin();
        break;
      default:
        result = true;
    }
    return Promise.resolve(result);
  }

  private checkAuth(): boolean {
    return this.permissionService.isAuthenticated();
  }

  private checkRole(roleId: string | undefined): boolean {
    if (!roleId) return false;
    return this.permissionService.hasRole(roleId);
  }

  private checkPermission(
    resource: string | undefined,
    action: string | undefined,
  ): boolean {
    if (!resource || !action) return false;
    return this.permissionService.hasPermission(resource, action);
  }
}