import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ViewCounterDocument = ViewCounter & Document;

@Schema()
export class ViewCounter {
  @Prop({ required: true, default: 0 })
  epidemic: number;

  @Prop({ required: true, default: 0 })
  track: number;

  @Prop({ required: true, default: 0 })
  overseas: number;

  @Prop({ required: true, default: 0 })
  date: string;
}

export const ViewCounterSchema = SchemaFactory.createForClass(ViewCounter);
