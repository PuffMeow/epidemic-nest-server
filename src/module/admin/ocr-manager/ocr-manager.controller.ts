import { GetOCRDto, IdOCRDto } from '@/dto';
import { JwtGuard } from '@/guards';
import { Roles } from '@/lib/decorator/role.decorator';
import { OcrManagerService } from '@/service/admin/ocr-manager/ocr-manager.service';
import { Role } from '@/types/role';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('admin/ocrManager')
export class OcrManagerController {
  constructor(private readonly ocrManagerService: OcrManagerService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Roles(Role.Operator)
  @Post('/get')
  @ApiOperation({ summary: '获取所有ocr扫描后的数据' })
  async get(@Body() params: GetOCRDto) {
    return this.ocrManagerService.get(params);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Roles(Role.Operator)
  @Get('/getOne')
  @ApiOperation({ summary: '根据id获取一条ocr数据详情' })
  async getOne(@Query() params: IdOCRDto) {
    return this.ocrManagerService.getOne(params);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Post('/remove')
  @ApiOperation({ summary: '根据id删除一条ocr数据' })
  async remove(@Body() params: IdOCRDto) {
    return this.ocrManagerService.remove(params);
  }
}
