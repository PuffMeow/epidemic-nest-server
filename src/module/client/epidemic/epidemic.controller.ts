import { OcrDto } from '@/dto';
import { EpidemicService } from '@/service/client/epidemic/epidemic.service';
import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('小程序-疫情防控')
@Controller('wechat/epidemic')
export class EpidemicController {
  constructor(private readonly epidemicService: EpidemicService) {}
  @Get('/')
  @ApiOkResponse({ description: '请求成功' })
  @ApiOperation({ summary: '获取疫情数据' })
  @Header('Cache-Control', 'public, max-age=1800')
  async index() {
    return await this.epidemicService.getEpidemicData();
  }

  @Post('ocr')
  @ApiOperation({ summary: '根据图片获取文字识别服务' })
  @ApiOkResponse({ description: '请求成功' })
  async imgOcr(@Body() ocrObj: OcrDto) {
    return await this.epidemicService.OCRService(ocrObj.image);
  }
}
