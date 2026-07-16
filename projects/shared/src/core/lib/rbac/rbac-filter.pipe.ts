import { Pipe, PipeTransform } from "@angular/core";
import { PermissionService, User } from "./permission.service";

@Pipe({
  name: "rbacHasPermission",
  standalone: true,
  pure: false,
})
export class RbacHasPermissionPipe implements PipeTransform {
  constructor(private permissionService: PermissionService) {}

  transform(user: User | null, resource: string, action: string): boolean {
    if (!user) return false;
    return this.permissionService.hasPermission(resource, action);
  }
}
