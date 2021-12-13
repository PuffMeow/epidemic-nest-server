import { Role } from '@/types/role';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class RoleGuard implements CanActivate {
  constructor(private readonly role: number) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest();
    if (user?.role > this.role) {
      throw new ForbiddenException('权限不足');
    }
    return true;
  }
}

export const SuperAdminGuard = new RoleGuard(Role.SuperAdmin);
export const AdminGuard = new RoleGuard(Role.Admin);
export const OperatorGuard = new RoleGuard(Role.Operator);
