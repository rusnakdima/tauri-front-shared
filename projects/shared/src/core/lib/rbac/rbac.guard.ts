import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { PermissionService } from "./permission.service";

/**
 * Route guard that checks resource-action permissions.
 *
 * Usage in route config:
 * {
 *   path: 'admin',
 *   canActivate: [rbacGuard],
 *   data: {
 *     permissions: ['users.read', 'settings.write'],
 *     requireAll: false  // OR logic (default), true = AND logic
 *   }
 * }
 */
export const rbacGuard: CanActivateFn = (route, _state) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  if (!permissionService.isAuthenticated()) {
    router.navigate(["/login"]);
    return false;
  }

  const requiredPermissions = route.data?.["permissions"] as string[] | undefined;
  const requireAll = route.data?.["requireAll"] as boolean ?? false;

  if (requiredPermissions && requiredPermissions.length > 0) {
    const results = requiredPermissions.map((perm) => {
      const [resource, action] = perm.split(".");
      return permissionService.hasPermission(resource, action);
    });

    if (requireAll) {
      if (!results.every((r) => r)) {
        router.navigate(["/unauthorized"]);
        return false;
      }
    } else {
      if (!results.some((r) => r)) {
        router.navigate(["/unauthorized"]);
        return false;
      }
    }
  }

  return true;
};

/**
 * Guard that checks for specific roles.
 *
 * Usage in route config:
 * {
 *   path: 'admin',
 *   canActivate: [rbacRoleGuard],
 *   data: {
 *     roles: ['admin', 'moderator']
 *   }
 * }
 */
export const rbacRoleGuard: CanActivateFn = (route, _state) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  if (!permissionService.isAuthenticated()) {
    router.navigate(["/login"]);
    return false;
  }

  const requiredRoles = route.data?.["roles"] as string[] | undefined;

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRole = requiredRoles.some((role) => permissionService.hasRole(role));
    if (!hasRole) {
      router.navigate(["/unauthorized"]);
      return false;
    }
  }

  return true;
};
