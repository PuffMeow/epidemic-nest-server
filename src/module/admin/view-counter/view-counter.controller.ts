import { ViewCounterDTO } from '@/dto';
import { JwtGuard } from '@/guards';
import { Roles } from '@/lib/decorator/role.decorator';
import { ViewCounterService } from '@/service/admin/view-counter/view-counter.service';
import { Role } from '@/types/role';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('后台获取用户访问数')
@Controller('admin/viewCounter')
export class ViewCounterController {
  constructor(private readonly viewCounterService: ViewCounterService) {}

  @UseGuards(JwtGuard)
  @Roles(Role.User)
  @ApiBearerAuth()
  @Get('/get')
  @ApiOperation({ summary: '获取用户访问数' })
  async getViewCounter(@Param() params: ViewCounterDTO) {
    return this.viewCounterService.getViewCounter(params);
  }
}
