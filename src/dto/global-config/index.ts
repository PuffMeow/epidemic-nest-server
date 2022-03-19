import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GlobalConfignDto {
  @ApiProperty({ description: 'id,不带id为创建，带上id为更新' })
  _id?: string;

  @IsNotEmpty()
  @ApiProperty({ description: '是否显示顶部滑动条' })
  isShowNotify: boolean;

  @ApiProperty({ description: '滑动条内容' })
  notify?: string;

  @IsNotEmpty()
  @ApiProperty({ description: '是否显示疫情轨迹组件' })
  isShowTrack: boolean;

  @IsNotEmpty()
  @ApiProperty({ description: '是否显示中国地图组件' })
  isShowChinaMap: boolean;

  @IsNotEmpty()
  @ApiProperty({ description: '是否显示确诊趋势组件' })
  isShowConfirmTrend: boolean;

  @IsNotEmpty()
  @ApiProperty({ description: '是否显示海外疫情页面' })
  isShowOverseas: boolean;
}
