import { CreateUserDto } from '@/dto/user';
import { LocalAuthGuard, JWTAuthGuard } from '@/guards';
import { Roles } from '@/lib/decorator/role.decorator';
import { AuthService } from '@/service/admin/auth/auth.service';
import { UserService } from '@/service/admin/user/user.service';
import { Role } from '@/types/role';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('后台接口')
@Controller('admin')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: '管理员登录' })
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(JWTAuthGuard)
  @Post('/createAdmin')
  @ApiOperation({ summary: '管理员创建' })
  @ApiCreatedResponse({
    description: '创建完返回除了密码以外的所有用户信息',
  })
  async create(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
