import configuration from '@/config/configuration';
import { ROLES_KEY } from '@/lib/decorator/role.decorator';
import { AuthService } from '@/service/admin/auth/auth.service';
import { Role } from '@/types/role';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
