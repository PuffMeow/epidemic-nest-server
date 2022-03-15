import * as dayjs from 'dayjs';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashSync } from 'bcryptjs';
import { Role } from '@/types/role';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({
    set: hashSync,
    required: true,
    select: false,
    minlength: 6,
  })
  password: string;

  @Prop({ default: Role.User })
  role?: number;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop({
    default: +new Date(),
    get: (val: string) => dayjs(val).format('YYYY-DD-MM HH:mm'),
  })
  create_time?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
