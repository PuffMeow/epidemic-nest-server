import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import configuration from '@/config/configuration';
import { UserService } from '@/service/admin/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration.jwtSecret,
    });
  }

  async validate(payload: any) {
    return {
      username: payload.username,
      userId: payload.userId,
      role: payload.role,
    };
  }
}
