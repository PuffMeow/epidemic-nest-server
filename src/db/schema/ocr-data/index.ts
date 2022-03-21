import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OCRDocument = OCR & Document;

@Schema()
export class OCR {
  @Prop({ required: true })
  data: string;

  @Prop({ default: +new Date() })
  create_time?: string;
}

export const OCRSchema = SchemaFactory.createForClass(OCR);
