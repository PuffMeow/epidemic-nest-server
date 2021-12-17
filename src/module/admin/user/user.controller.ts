import { CreateUserDto } from '@/dto/user';
import { LocalAuthGuard, JwtGuard } from '@/guards';
import { Roles } from '@/lib/decorator/role.decorator';
import { AuthService } from '@/service/admin/auth/auth.service';
import { UserService } from '@/service/admin/user/user.service';
import { Role } from '@/types/role';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('后台接口')
@Controller('admin')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtGuard)
  @Roles(Role.User)
  @Get('/test')
  async test() {
    return 'test';
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: '管理员登录' })
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('/createUser')
  @ApiOperation({ summary: '管理员创建' })
  async create(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
