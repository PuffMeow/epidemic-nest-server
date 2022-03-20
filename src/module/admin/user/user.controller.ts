import { RemoveUserto, CreateOrUpdateUserDto } from '@/dto/user';
import { LocalAuthGuard, JwtGuard } from '@/guards';
import { Roles } from '@/lib/decorator/role.decorator';
import { AuthService } from '@/service/admin/auth/auth.service';
import { UserService } from '@/service/admin/user/user.service';
import { Role } from '@/types/role';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('后台用户配置')
@Controller('admin/user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
  @ApiBearerAuth()
  @Roles(Role.SuperAdmin)
  @Post('/createOrUpdateUser')
  @ApiOperation({ summary: '用户创建或修改，有_id传入的时候是修改' })
  async createOrUpdateUser(@Body() user: CreateOrUpdateUserDto) {
    return this.userService.createOrUpdateUser(user);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.SuperAdmin)
  @ApiBearerAuth()
  @Get('/getAll')
  @ApiOperation({ summary: '查找所有用户' })
  async findAll() {
    return this.userService.findAllUsers();
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('/removeOne')
  @ApiOperation({ summary: '删除用户' })
  async removeUser(@Body() user: RemoveUserto) {
    return this.userService.removeUser(user);
  }
}
