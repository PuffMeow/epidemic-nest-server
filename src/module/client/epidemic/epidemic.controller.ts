import { EpidemicService } from '@/service/client/epidemic/epidemic.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('小程序-疫情防控')
@Controller('wechat/epidemic')
export class EpidemicController {
  constructor(private readonly epidemicService: EpidemicService) {}
  @Get('/')
  @ApiOkResponse({ description: '请求成功' })
  async index() {
    const res = await this.epidemicService.getEpidemicData();
    return res;
  }
}
