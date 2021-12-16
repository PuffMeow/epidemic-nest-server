import configuration from '@/config/configuration';
import { aliGatewayRequest } from '@/lib/requests/ali-gateway-api';
import { Logger } from '@/lib/utils/log4js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EpidemicService {
  async getEpidemicData() {
    try {
      const url =
        'https://ncovdata.market.alicloudapi.com/ncov/cityDiseaseInfoWithTrend';
      const res = await aliGatewayRequest({
        url,
        method: 'get',
        appKey: configuration.aliAppKey,
        appSecret: configuration.appSecret,
      });

      return res;
    } catch (e) {
      Logger.error(e);
    }
  }
}
