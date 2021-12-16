import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './module/client/api.module';
import { AdminModule } from './module/admin/admin.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ApiModule,
    AdminModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: configuration.mongoUrl }),
    }),
  ],
  exports: [],
  controllers: [],
})
export class AppModule {}
