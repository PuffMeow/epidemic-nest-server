import { GlobalConfignDto } from '@/dto';
import { JwtGuard } from '@/guards';
import { Roles } from '@/lib/decorator/role.decorator';
import { GlobalConfigService } from '@/service/admin/global-config/global-config.service';
import { Role } from '@/types/role';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('后台全局配置')
@Controller('admin/globalConfig')
export class GlobalConfigController {
  constructor(private readonly globalConfigService: GlobalConfigService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Roles(Role.User)
  @Get('/get')
  @ApiOperation({ summary: '查询全局配置' })
  async getGlobalConfig() {
    return this.globalConfigService.getGlobalConfig();
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('/save')
  @ApiOperation({ summary: '更新全局配置' })
  async saveGlobalConfig(@Body() params: GlobalConfignDto) {
    return this.globalConfigService.saveGlobalConfig(params);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('/clearCache')
  @ApiOperation({ summary: '清除所有缓存' })
  async clearCache() {
    return this.globalConfigService.clearCache();
  }
}
