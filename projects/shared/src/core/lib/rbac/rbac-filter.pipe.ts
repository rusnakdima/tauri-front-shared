import { Pipe, PipeTransform } from "@angular/core";
import { RbacService, User } from "./rbac.service";

@Pipe({
  name: "rbacHasPermission",
  standalone: true,
  pure: false,
})
export class RbacHasPermissionPipe implements PipeTransform {
  constructor(private rbac: RbacService) {}

  transform(user: User | null, permission: string): boolean {
    if (!user) return false;
    return this.rbac.hasPermission(permission);
  }
}
