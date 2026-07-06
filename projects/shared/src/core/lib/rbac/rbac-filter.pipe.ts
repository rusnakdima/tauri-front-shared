import { Pipe, PipeTransform, inject } from "@angular/core";
import { RbacService, User } from "./rbac.service";

@Pipe({
  name: "rbacHasPermission",
  standalone: true,
  pure: false,
})
export class RbacHasPermissionPipe implements PipeTransform {
  private rbac = inject(RbacService);

  transform(user: User | null, permission: string): boolean {
    if (!user) return false;
    return this.rbac.hasPermission(user, permission);
  }
}
