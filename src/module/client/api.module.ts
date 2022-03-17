import { EpidemicService } from '@/service/client/epidemic/epidemic.service';
import CacheService from '@/service/tools/redisService';
import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { EpidemicController } from './epidemic/epidemic.controller';

@Module({
  imports: [AdminModule],
  controllers: [EpidemicController],
  providers: [EpidemicService, CacheService],
})
export class ApiModule {}
