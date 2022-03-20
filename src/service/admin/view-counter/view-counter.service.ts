import { ViewCounter, ViewCounterDocument } from '@/db/schema/view-counter';
import { Logger } from '@/lib/utils/log4js';
import CacheService from '@/service/tools/redisService';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { getCurrentDate } from '@/lib/utils/utils';
import { ViewCounterDTO } from '@/dto';

@Injectable()
export class ViewCounterService {
  constructor(
    @InjectModel(ViewCounter.name)
    private readonly viewCounterModel: Model<ViewCounterDocument>,
    private readonly cacheService: CacheService,
  ) {}

  async getViewCounter({ limit = 7 }: ViewCounterDTO) {
    try {
      return await this.viewCounterModel.find().limit(limit).sort({ _id: -1 });
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async writeViewCounterToDB() {
    try {
      const viewCountRecord = await this.cacheService.getAllHash('viewCounter');
      const currentDate = getCurrentDate();

      // 存在则更新，不存在则插入
      await this.viewCounterModel.findOneAndUpdate(
        { date: currentDate },
        {
          date: currentDate,
          ...viewCountRecord,

          // 存在则什么也不做，不存在则插入
          // $setOnInsert: {
          //   date: currentDate,
          //   ...viewCountRecord,
          // },
        },
        { upsert: true },
      );
    } catch (e) {
      Logger.error(e);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async flushViewCounterCache() {
    try {
      await this.cacheService.rmHash('viewCounter');
    } catch (e) {
      Logger.error(e);
    }
  }
}
