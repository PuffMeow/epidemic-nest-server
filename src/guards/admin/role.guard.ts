import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@/types/role';
import { ROLES_KEY } from '@/lib/decorator/role.decorator';
import { AuthService } from '@/service/admin/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-产品运营 | 3-访客（只能查看）
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    const token = context.switchToHttp().getRequest().headers.authorization;
    if (!token || !requiredRoles) {
      return true;
    }
    const varifyToken = await this.authService.verifyToken(token);

    if (varifyToken?.role > requiredRoles?.[0]) {
      throw new ForbiddenException('无操作权限');
    }

    return true;
  }
}
