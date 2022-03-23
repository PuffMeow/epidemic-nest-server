import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntranceConfigDocument = EntranceConfig & Document;

@Schema()
export class EntranceConfig {
  @Prop({ required: true, default: false })
  /** 是否开启入口 */
  isShowEntrance: boolean;

  @Prop()
  /** 需要对应小程序 core 目录下的入口名称 */
  id?: string;

  @Prop()
  /** 入口图标下方的标题 */
  name?: string;

  @Prop({ default: false })
  /** 禁用置灰状态 */
  disabled?: boolean;

  @Prop({ default: false })
  /** 学生身份禁用 */
  student_disabled?: boolean;

  @Prop({ default: false })
  /** 老师身份禁用 */
  teacher_disabled?: boolean;

  @Prop({ default: true })
  /** 离线状态下禁用 */
  offline_disabled?: boolean;
}

export const EntranceConfigSchema =
  SchemaFactory.createForClass(EntranceConfig);
