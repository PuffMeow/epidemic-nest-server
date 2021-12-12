import { User, UserDocument } from '@/db/schema/user/user.schema';
import { CreateUserDto } from '@/dto/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async createUser(createUserDto: CreateUserDto) {
    const createUser = await this.userModel.create(createUserDto);
    createUser.save();
    return '创建用户成功';
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.userModel.findOne((user: User) => user.username === username);
  }
}
