import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './module/client/api.module';
import { AdminModule } from './module/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards';

@Module({
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
  imports: [
    ApiModule,
    AdminModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGO_URL }),
    }),
  ],
  controllers: [],
})
export class AppModule {}
