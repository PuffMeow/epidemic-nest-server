import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { Logger } from '@/lib/utils/log4js';
import configuration from '@/config/configuration';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    try {
      const user = await this.userService.findUser(username);
      if (!compareSync(pass, user.password)) {
        return null;
      }

      const { password, ...result } = user;
      return result;
    } catch (e) {
      Logger.error(e);
    }
  }

  async login(user: any) {
    return {
      username: user.username,
      role: user.role,
      token: this.jwtService.sign({
        username: user.username,
        userId: user._id,
        role: user.role,
      }),
    };
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verify(token.split(' ')[1], {
        secret: configuration.jwtSecret,
      });
    } catch (e) {
      Logger.error(e);
    }
  }
}
