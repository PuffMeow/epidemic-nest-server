import { Module } from '@nestjs/common';
import { EpidemicController } from './epidemic/epidemic.controller';

@Module({
  controllers: [EpidemicController],
})
export class ApiModule {}
