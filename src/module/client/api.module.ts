import { EpidemicService } from '@/service/client/epidemic/epidemic.service';
import CacheService from '@/service/tools/redisService';
import { Module } from '@nestjs/common';
import { EpidemicController } from './epidemic/epidemic.controller';

@Module({
  controllers: [EpidemicController],
  providers: [EpidemicService, CacheService],
})
export class ApiModule {}
