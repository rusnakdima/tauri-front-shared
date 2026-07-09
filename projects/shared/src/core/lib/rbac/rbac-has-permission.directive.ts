import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { PermissionService } from "./permission.service";

/**
 * Structural directive that shows/hides content based on permission.
 *
 * Usage:
 * <button *rbacHasPermission="'users.write'">Edit Users</button>
 * <div *rbacHasPermission="'users.delete'; else noPerm">Delete</div>
 * <ng-template #noPerm>No permission</ng-template>
 *
 * Supports AND logic with multiple permissions:
 * <button *rbacHasPermission="['users.write', 'users.admin']">Admin Action</button>
 */
@Directive({
  selector: "[rbacHasPermission]",
  standalone: true,
})
export class RbacHasPermissionDirective implements OnInit {
  @Input("rbacHasPermission") permission: string | string[] = "";

  constructor(
    private permissionService: PermissionService,
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    const hasPermission = this.checkPermission();
    this.viewContainer.clear();
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission(): boolean {
    if (Array.isArray(this.permission)) {
      return this.permission.every((perm) => {
        const [resource, action] = perm.split(".");
        return resource && action
          ? this.permissionService.hasPermission(resource, action)
          : false;
      });
    }

    const [resource, action] = this.permission.split(".");
    return resource && action
      ? this.permissionService.hasPermission(resource, action)
      : false;
  }
}

/**
 * Structural directive that shows/hides content based on role membership.
 *
 * Usage:
 * <button *rbacHasRole="'admin'">Admin Panel</button>
 * <div *rbacHasRole="['editor', 'moderator']">Can Edit</div>
 */
@Directive({
  selector: "[rbacHasRole]",
  standalone: true,
})
export class RbacHasRoleDirective implements OnInit {
  @Input("rbacHasRole") role: string | string[] = "";

  constructor(
    private permissionService: PermissionService,
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    const hasRole = this.checkRole();
    this.viewContainer.clear();
    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkRole(): boolean {
    if (Array.isArray(this.role)) {
      return this.role.some((r) => this.permissionService.hasRole(r));
    }
    return this.permissionService.hasRole(this.role);
  }
}
