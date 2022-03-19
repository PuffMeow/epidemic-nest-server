import { GlobalConfig, GlobalConfigDocument } from '@/db/schema/global-config';
import { GlobalConfignDto } from '@/dto';
import { Logger } from '@/lib/utils/log4js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GlobalConfigService {
  constructor(
    @InjectModel(GlobalConfig.name)
    private readonly globalConfigModal: Model<GlobalConfigDocument>,
  ) {}

  async getGlobalConfig() {
    try {
      const res = await this.globalConfigModal.find();
      if (res?.[0]) {
        if (!res?.[0]?.isShowNotify) {
          const {
            _id,
            isShowChinaMap,
            isShowConfirmTrend,
            isShowNotify,
            isShowTrack,
            isShowOverseas,
          } = res[0];

          return {
            _id,
            isShowTrack,
            isShowNotify,
            isShowChinaMap,
            isShowConfirmTrend,
            isShowOverseas,
          };
        } else {
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
      if (!_id) {
        const doc = await this.globalConfigModal.create(restParams);
        doc.save();

        return '创建成功';
      } else {
        await this.globalConfigModal.findByIdAndUpdate(_id, restParams);

        return '修改成功';
      }
    } catch (e) {
      Logger.error(e);
    }
  }
}
