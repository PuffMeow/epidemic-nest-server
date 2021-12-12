import { User, UserSchema } from '@/db/schema/user/user.schema';
import { LocalStrategy } from '@/lib/strategy/local.strategy';
import { AuthService } from '@/service/admin/auth/auth.service';
import { UserService } from '@/service/admin/user/user.service';
import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginController } from './login/login.controller';

@Global()
@Module({
  providers: [AuthService, UserService, LocalStrategy],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [LoginController],
  exports: [JwtModule],
})
export class AdminModule {}
