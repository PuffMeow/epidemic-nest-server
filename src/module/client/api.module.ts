import { OCR, OCRSchema } from '@/db/schema/ocr-data';
import { EpidemicService } from '@/service/client/epidemic/epidemic.service';
import CacheService from '@/service/tools/redisService';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { EpidemicController } from './epidemic/epidemic.controller';

@Module({
  imports: [
    AdminModule,
    MongooseModule.forFeature([{ name: OCR.name, schema: OCRSchema }]),
  ],
  controllers: [EpidemicController],
  providers: [EpidemicService, CacheService],
})
export class ApiModule {}
