import { User, UserDocument } from '@/db/schema/user/user.schema';
import { CreateOrUpdateUserDto, RemoveUserto } from '@/dto';
import { Logger } from '@/lib/utils/log4js';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createOrUpdateUser(user: CreateOrUpdateUserDto) {
    try {
      if (!user?._id) {
        const isExitUser = await this.findUser(user.username);
        if (isExitUser) {
          return '该用户已存在';
        }
        const createUser = await this.userModel.create(user);
        createUser.save();
        return '创建用户成功';
      } else {
        const { username, role, password, newPassword } = user;
        if (password && newPassword) {
          const validated = await this.authService.validateUser(
            username,
            password,
          );

          if (!validated) {
            return '原账号或密码错误';
          }

          await this.userModel.findByIdAndUpdate(user._id, {
            username,
            role,
            password: newPassword,
          });
        } else {
          await this.userModel.findByIdAndUpdate(user._id, {
            role,
          });
        }

        return '修改成功';
      }
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

  async findAllUsers(): Promise<User[] | void> {
    try {
      return await this.userModel.find();
    } catch (e) {
      Logger.error(e);
    }
  }

  async removeUser(user: RemoveUserto): Promise<void> {
    try {
      return await this.userModel.findOneAndDelete(
        { username: user.username },
        { projection: { password: 0 } },
      );
    } catch (e) {
      Logger.error(e);
    }
  }
}
