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
import { GlobalConfigController } from './global-config/global-config.controller';
import { GlobalConfigService } from '@/service/admin/global-config/global-config.service';
import { ViewCounter, ViewCounterSchema } from '@/db/schema/view-counter';
import CacheService from '@/service/tools/redisService';
import { ViewCounterService } from '@/service/admin/view-counter/view-counter.service';
import { ViewCounterController } from './view-counter/view-counter.controller';
import { OcrManagerController } from './ocr-manager/ocr-manager.controller';
import { OcrManagerService } from '@/service/admin/ocr-manager/ocr-manager.service';
import { OCR, OCRSchema } from '@/db/schema/ocr-data';
import {
  EntranceConfig,
  EntranceConfigSchema,
} from '@/db/schema/entrance-config';

@Module({
  providers: [
    UserService,
    LocalStrategy,
    JwtStrategy,
    AuthService,
    GlobalConfigService,
    ViewCounterService,
    CacheService,
    OcrManagerService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: GlobalConfig.name, schema: GlobalConfigSchema },
      { name: EntranceConfig.name, schema: EntranceConfigSchema },
      { name: ViewCounter.name, schema: ViewCounterSchema },
      { name: OCR.name, schema: OCRSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: configuration.jwtSecret,
      signOptions: { expiresIn: 7200 },
    }),
  ],
  controllers: [
    UserController,
    GlobalConfigController,
    ViewCounterController,
    OcrManagerController,
  ],
  exports: [AuthService, GlobalConfigService],
})
export class AdminModule {}
