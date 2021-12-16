import { User, UserSchema } from '@/db/schema/user/user.schema';
import { JwtStrategy } from '@/lib/strategy/jwt.strategy';
import { LocalStrategy } from '@/lib/strategy/local.strategy';
import { AuthService } from '@/service/admin/auth/auth.service';
import { UserService } from '@/service/admin/user/user.service';
import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { LoginController } from './login/login.controller';

@Module({
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: String(process.env.JWT_SECRET), // 必须保证 String 类型
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [LoginController],
  exports: [],
})
export class AdminModule {}
