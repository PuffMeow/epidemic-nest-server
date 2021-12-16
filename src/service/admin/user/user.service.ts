import { User, UserDocument } from '@/db/schema/user/user.schema';
import { CreateUserDto } from '@/dto';
import { Logger } from '@/lib/utils/log4js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(user: CreateUserDto) {
    try {
      const createUser = await this.userModel.create(user);
      createUser.save();
      return '创建用户成功';
    } catch (e) {
      Logger.error(e);
    }
  }

  async findUser(username: string): Promise<User | undefined> {
    try {
      const res = await this.userModel
        .findOne({ username })
        .select('+password');

      return res.toJSON();
    } catch (e) {
      Logger.error(e);
    }
  }
}
