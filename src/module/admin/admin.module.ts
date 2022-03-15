import configuration from '@/config/configuration';
import { GlobalConfig, GlobalConfigSchema } from '@/db/schema/global-config';
import { User, UserSchema } from '@/db/schema/user/user.schema';
import { JwtStrategy } from '@/lib/strategy/jwt.strategy';
import { LocalStrategy } from '@/lib/strategy/local.strategy';
import { AuthService } from '@/service/admin/auth/auth.service';
import { UserService } from '@/service/admin/user/user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user/user.controller';

@Module({
  providers: [UserService, LocalStrategy, JwtStrategy, AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: GlobalConfig.name, schema: GlobalConfigSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: configuration.jwtSecret,
      signOptions: { expiresIn: 7200 },
    }),
  ],
  controllers: [UserController],
  exports: [AuthService],
})
export class AdminModule {}
