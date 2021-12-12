import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { Logger } from '@/lib/utils/log4js';

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
    const payload = { username: user.username, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
