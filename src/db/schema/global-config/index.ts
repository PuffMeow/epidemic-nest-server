import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GlobalConfigDocument = GlobalConfig & Document;

@Schema()
export class GlobalConfig {
  @Prop({ required: true, default: true })
  /** 是否显示公告条 */
  isShowNotify: boolean;

  @Prop({ required: true })
  /** 公告条内容 */
  notify: string;

  @Prop({ required: true, default: true })
  /** 是否显示疫情轨迹组件 */
  isShowTrack: boolean;

  @Prop({ required: true, default: true })
  /** 是否显示中国地图组件 */
  isShowChinaMap: boolean;

  /** 是否显示确诊趋势组件 */
  @Prop({ required: true, default: true })
  isShowConfirmTrend: boolean;

  /** 是否显示海外疫情数据页面入口 */
  @Prop({ required: true, default: true })
  isShowOverseas: boolean;
}

export const GlobalConfigSchema = SchemaFactory.createForClass(GlobalConfig);
