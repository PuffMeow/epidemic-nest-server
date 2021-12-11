import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('小程序-疫情防控')
@Controller('wechat/epidemic')
export class EpidemicController {
  @Get('/')
  @ApiOkResponse({ description: '请求成功' })
  index() {
    return '';
  }
}
