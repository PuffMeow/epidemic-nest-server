import { Module } from '@nestjs/common';

import { ApiModule } from './module/api/api.module';

@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
