import { OcrDto, RecognitionDto, TrackDetailDto } from '@/dto';
import { EpidemicService } from '@/service/client/epidemic/epidemic.service';
import * as MAO from 'multer-aliyun-oss';
import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import configuration from '@/config/configuration';

@ApiTags('小程序-疫情防控')
@Controller('wechat/epidemic')
export class EpidemicController {
  constructor(private readonly epidemicService: EpidemicService) {}
  @Get('/')
  @ApiOkResponse({ description: '请求成功' })
  @ApiOperation({ summary: '获取疫情数据' })
  @Header('Cache-Control', 'private, max-age=1800')
  async index() {
    return await this.epidemicService.getEpidemicData();
  }

  @Post('ocr')
  @ApiOperation({ summary: '根据图片获取文字识别服务' })
  @ApiOkResponse({ description: '请求成功' })
  async imgOcr(@Body() ocrObj: OcrDto) {
    return await this.epidemicService.OCRService(ocrObj.image);
  }

  @Get('map')
  @ApiOperation({ summary: '地图服务' })
  @ApiOkResponse({ description: '请求成功' })
  async map(
    @Query('longtitude') longtitude: number,
    @Query('latitude') latitude: number,
  ) {
    return await this.epidemicService.mapService({ longtitude, latitude });
  }

  @Get('track-list')
  @ApiOperation({ summary: '疫情行动轨迹' })
  @ApiOkResponse({ description: '请求成功' })
  async trackList(
    @Query('city_code') cityCode: string,
    @Query('city_name') cityName: string,
  ) {
    return await this.epidemicService.getTrackList({ cityCode, cityName });
  }

  @Post('track-detail')
  @ApiOperation({ summary: '疫情轨迹点详情' })
  @ApiOkResponse({ description: '请求成功' })
  async trackDetail(@Body() params: TrackDetailDto) {
    return await this.epidemicService.getTrackDetail(params);
  }

  @Post('scan-code')
  @ApiOperation({ summary: '健康码识别' })
  @ApiOkResponse({ description: '请求成功' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: MAO({
        config: {
          region: configuration.aliOssRegion, //地区
          accessKeyId: configuration.aliOssAccessKeyId,
          accessKeySecret: configuration.aliOssAccessKeySecret,
          bucket: configuration.aliOssBucket, //存储空间名称
        },
      }),
    }),
  )
  async scanCodeRecognizion(@UploadedFile() file: any) {
    return await this.epidemicService.codeRecognition(file);
  }
}
