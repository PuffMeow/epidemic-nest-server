import { EpidemicService } from '@/service/client/epidemic/epidemic.service';
import { Module } from '@nestjs/common';
import { EpidemicController } from './epidemic/epidemic.controller';

@Module({
  controllers: [EpidemicController],
  providers: [EpidemicService],
})
export class ApiModule {}
