import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './module/client/api.module';
import { AdminModule } from './module/admin/admin.module';
import configuration from './config/configuration';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/admin/role.guard';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ApiModule,
    AdminModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        closeClient: true,
        config: {
          port: 6379, // Redis port
          host: '127.0.0.1', // Redis host
          family: 4, // 4 (IPv4) or 6 (IPv6)
          db: 0,
        },
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: configuration.mongoUrl }),
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
