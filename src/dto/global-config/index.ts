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

export class EntranceConfignDto {
  @ApiProperty({ description: 'id,不带id为创建，带上id为更新' })
  _id?: string;

  @IsNotEmpty()
  @ApiProperty({ description: '是否开启入口' })
  isShowEntrance: boolean;

  @ApiProperty({ description: '需要对应小程序 core 目录下的入口名称' })
  id?: string;

  @ApiProperty({ description: '入口图标下方的标题' })
  name?: string;

  @ApiProperty({ description: '禁用置灰状态' })
  disabled?: boolean;

  @ApiProperty({ description: '学生身份禁用' })
  student_disabled?: boolean;

  @ApiProperty({ description: '老师身份禁用' })
  teacher_disabled?: boolean;

  @ApiProperty({ description: '离线状态下禁用' })
  offline_disabled?: boolean;
}
