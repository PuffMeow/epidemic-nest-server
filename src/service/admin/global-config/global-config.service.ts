import {
  EntranceConfig,
  EntranceConfigDocument,
} from '@/db/schema/entrance-config';
import { GlobalConfig, GlobalConfigDocument } from '@/db/schema/global-config';
import { EntranceConfignDto, GlobalConfignDto } from '@/dto';
import { Logger } from '@/lib/utils/log4js';
import CacheService from '@/service/tools/redisService';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GlobalConfigService {
  constructor(
    @InjectModel(GlobalConfig.name)
    private readonly globalConfigModel: Model<GlobalConfigDocument>,
    @InjectModel(EntranceConfig.name)
    private readonly entranceConfigModel: Model<EntranceConfigDocument>,
    private readonly cacheService: CacheService,
  ) {}

  async getGlobalConfig() {
    try {
      const cacheGlobalConfig = await this.cacheService.get('globalConfig');
      if (cacheGlobalConfig) {
        return cacheGlobalConfig;
      }

      const res = await this.globalConfigModel.find();
      if (res?.[0]) {
        if (!res?.[0]?.isShowNotify) {
          // 不返回 content 内容
          const {
            _id,
            isShowChinaMap,
            isShowConfirmTrend,
            isShowNotify,
            isShowTrack,
            isShowOverseas,
          } = res[0];

          const data = {
            _id,
            isShowTrack,
            isShowNotify,
            isShowChinaMap,
            isShowConfirmTrend,
            isShowOverseas,
          };

          this.cacheService.set('globalConfig', data);

          return data;
        } else {
          // 返回 content 内容
          this.cacheService.set('globalConfig', res[0]);
          return res[0];
        }
      } else {
        return null;
      }
    } catch (e) {
      Logger.error(e);
    }
  }

  async saveGlobalConfig(params: GlobalConfignDto) {
    try {
      const { _id, ...restParams } = params;
      this.cacheService.del('globalConfig');
      if (!_id) {
        await this.globalConfigModel.create(restParams);

        return '创建成功';
      } else {
        await this.globalConfigModel.findByIdAndUpdate(_id, restParams);

        return '修改成功';
      }
    } catch (e) {
      Logger.error(e);
    }
  }

  async clearCache() {
    this.cacheService.flushall();
    return '清除成功';
  }

  async getEntranceConfig() {
    try {
      // const cacheConfig = await this.cacheService.get('entranceConfig');
      // if (cacheConfig) {
      //   return cacheConfig;
      // }

      const res = await this.entranceConfigModel.find();
      if (res?.[0]) {
        if (!res?.[0]?.isShowEntrance) {
          // 不返回 content 内容
          const { isShowEntrance, _id } = res[0];

          const data = {
            _id,
            isShowEntrance,
          };

          this.cacheService.set('entranceConfig', data);

          return data;
        } else {
          this.cacheService.set('entranceConfig', res[0]);
          return res[0];
        }
      } else {
        return null;
      }
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }

  async saveEntranceConfig(params: EntranceConfignDto) {
    try {
      const { _id, ...restParams } = params;
      this.cacheService.del('entranceConfig');

      if (!_id) {
        await this.entranceConfigModel.create(restParams);

        return '创建成功';
      } else {
        await this.entranceConfigModel.findByIdAndUpdate(_id, restParams);

        return '修改成功';
      }
    } catch (e) {
      Logger.error(e);
      return null;
    }
  }
}
